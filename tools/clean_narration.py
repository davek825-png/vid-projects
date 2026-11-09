#!/usr/bin/env python3
"""
clean_narration.py — remove PLOSIVES and BREATHS from a narration recording (creator rule
2026-11-09: every narration, every video). Levels and timing are untouched: nothing is cut, so
transcript word times stay valid and the cut engine still decides the pauses.

  1. Plosives (p/b pops = low-frequency bursts): a split-band de-plosive. The band below 150 Hz is
     compressed hard and fast (a pop is a short LF spike; the voice's steady low end sits under the
     threshold), the band above passes untouched; plus a 70 Hz high-pass for rumble/handling thumps.
  2. Breaths: inside every pause between transcribed words, frames that are quiet but above the
     floor (inhales, mouth noise) are muted with short ramps. Guards so speech is never touched:
       - a word's release: muting starts only once the level has fallen below RELEASE_DB after the
         word's end (+ END_GUARD);
       - a word's onset: nothing within ONSET_GUARD of a loud frame is muted, so a late ASR token
         or a soft fricative onset ("Since...") keeps its attack;
       - loud frames (> LOUD_DB) inside a gap are never muted (untranscribed speech stays).

Usage (repo root):
  python tools/clean_narration.py <in.wav> <transcript.json> <out.wav>
The transcript is the project's AssemblyAI json (words in ms; apply token-time-fixes first).
Prints how many breath regions were muted. Needs ffmpeg on PATH.
"""
import json
import math
import subprocess
import sys
import tempfile
from array import array
from pathlib import Path

SR = 48000
FRAME = 0.010            # analysis frame (s)
LOUD_DB = -38.0          # frames above this are speech, never muted
RELEASE_DB = -45.0       # muting may begin only after the level drops below this after a word
END_GUARD = 0.10         # s after a word's end before muting may begin
ONSET_GUARD = 0.12       # s kept before any loud frame (protects onsets)
RAMP = 0.015             # s fade in/out at mute edges
MIN_REGION = 0.06        # ignore mute regions shorter than this
BREATH_DB = 15.0         # a muted region louder than floor + this counts as a "breath" in the report

# Linkwitz-Riley 4th-order crossover at 150 Hz (each 2-pole filter applied twice): LR4 bands sum back
# FLAT. A plain 2-pole LP+HP pair sums with a notch at the crossover, which thinned the voice by ~1.5 LU.
DEPLOSIVE = ("highpass=f=70:poles=2,asplit=2[lo][hi];"
             # threshold -18 dB: above the voice's steady low end (p99 on ows-hickok), so only pops trip it
             "[lo]lowpass=f=150:poles=2,lowpass=f=150:poles=2,acompressor=threshold=0.126:ratio=8:attack=0.3:release=30:makeup=1[lo2];"
             "[hi]highpass=f=150:poles=2,highpass=f=150:poles=2[hi2];"
             "[lo2][hi2]amix=inputs=2:normalize=0")


def ff_f32(src: str, sr: int, af: str | None = None) -> array:
    cmd = ["ffmpeg", "-v", "error", "-i", src]
    if af:
        cmd += ["-filter_complex", af]
    cmd += ["-ac", "1", "-ar", str(sr), "-f", "f32le", "-"]
    a = array("f")
    a.frombytes(subprocess.run(cmd, capture_output=True, check=True).stdout)
    return a


def main() -> None:
    src, tjson, out = sys.argv[1], sys.argv[2], sys.argv[3]
    words = json.loads(Path(tjson).read_text(encoding="utf-8"))["words"]
    sig = ff_f32(src, SR, DEPLOSIVE)                       # 1. de-plosived signal (48 kHz)
    n = len(sig)
    fl = int(SR * FRAME)
    db = []
    for i in range(0, n, fl):
        seg = sig[i:i + fl]
        db.append(20 * math.log10(math.sqrt(sum(v * v for v in seg) / max(1, len(seg))) + 1e-12))
    floor = sorted(db)[int(len(db) * 0.10)]
    nf = len(db)
    loud = [d > LOUD_DB for d in db]
    # frames protected by an upcoming loud frame (onset guard)
    guard = int(ONSET_GUARD / FRAME)
    protect = [False] * nf
    for i in range(nf):
        if loud[i]:
            for j in range(max(0, i - guard), i + 1):
                protect[j] = True
    # gaps between words (and before the first / after the last)
    spans = [(0.0, words[0]["start"] / 1000)] if words else []
    spans += [(a["end"] / 1000, b["start"] / 1000) for a, b in zip(words, words[1:])]
    if words:
        spans.append((words[-1]["end"] / 1000, n / SR))
    mute = [False] * nf
    for gs, ge in spans:
        i = int((gs + END_GUARD) / FRAME)
        j = min(nf, int(ge / FRAME))
        while i < j and db[i] > RELEASE_DB:                 # let the word's release decay first
            i += 1
        for k in range(i, j):
            if not loud[k] and not protect[k]:
                mute[k] = True
    # regions, drop tiny ones, report breaths
    regions, k = [], 0
    while k < nf:
        if mute[k]:
            s = k
            while k < nf and mute[k]:
                k += 1
            if (k - s) * FRAME >= MIN_REGION:
                regions.append((s, k))
        else:
            k += 1
    breaths = sum(1 for s, e in regions if max(db[s:e]) > floor + BREATH_DB)
    # 2. apply mute gain with ramps (only touches samples inside regions)
    ramp = int(RAMP * SR)
    for s, e in regions:
        a, b = s * fl, min(n, e * fl)
        for x in range(a, b):
            g = 0.0
            if x - a < ramp:
                g = 1.0 - (x - a) / ramp
            elif b - x < ramp:
                g = 1.0 - (b - x) / ramp
            sig[x] *= g
    with tempfile.TemporaryDirectory() as td:
        raw = Path(td) / "clean.f32"
        raw.write_bytes(sig.tobytes())
        subprocess.run(["ffmpeg", "-v", "error", "-y", "-f", "f32le", "-ar", str(SR), "-ac", "1", "-i", str(raw),
                        "-c:a", "pcm_s24le", out], check=True)
    muted = sum(e - s for s, e in regions) * FRAME
    print(f"{Path(src).name}: floor {floor:.1f} dB · {len(regions)} gap regions muted ({muted:.1f}s) · {breaths} breaths/noises removed · plosives tamed -> {out}")


if __name__ == "__main__":
    main()
