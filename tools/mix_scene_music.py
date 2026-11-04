#!/usr/bin/env python3
"""
Scene-mapped music mix: lays SEVERAL music tracks under a base video at the spans a
videos/<project>/work/music-plan.json gives them (each trimmed, loudness-matched to bed_lufs,
faded, high-passed, sidechain-ducked under the base audio), then appends an outro
(slide + its own music) after the base. Use it instead of mix_music.py when a video's beds
change with the story's scenes and/or come from per-project files rather than the library.

Usage (from the repo root):
  python tools/mix_scene_music.py videos/ows-1/work/music-plan.json

Schema: see videos/ows-1/work/music-plan.json (base, out, bed_lufs, duck, highpass_hz,
segments[{file, track_lufs, at_s, from_s, dur_s, fade_in, fade_out, compress?}], outro{...}).
track_lufs = the track's integrated loudness (measure: ffmpeg -i x -af ebur128 -f null -).
Needs ffmpeg/ffprobe on PATH.
"""
import json, subprocess, sys, os
P = json.load(open(sys.argv[1], encoding="utf-8"))
base, out = P["base"], P["out"]
segs, o = P["segments"], P["outro"]
dur_base = float(subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", base],
                                capture_output=True, text=True).stdout)
tmp = out.replace(".mp4", ".main.mp4")

cmd = ["ffmpeg", "-y", "-hide_banner", "-loglevel", "error", "-i", base]
for s in segs:
    cmd += ["-i", s["file"]]
fc, labels = [], []
for i, s in enumerate(segs):
    g = P["bed_lufs"] - s["track_lufs"]
    d = s["dur_s"]
    chain = (f"[{i+1}:a]aformat=sample_rates=48000:channel_layouts=stereo,"
             f"atrim=start={s['from_s']}:duration={d},asetpts=PTS-STARTPTS,")
    if s.get("compress"):
        chain += "acompressor=threshold=0.1:ratio=3:attack=50:release=800:makeup=1,"
    chain += (f"volume={g:.2f}dB,afade=t=in:st=0:d={s['fade_in']},afade=t=out:st={d - s['fade_out']:.3f}:d={s['fade_out']},"
              f"adelay={int(round(s['at_s'] * 1000))}:all=1[m{i}]")
    fc.append(chain); labels.append(f"[m{i}]")
fc.append("".join(labels) + f"amix=inputs={len(labels)}:normalize=0:dropout_transition=0,highpass=f={P['highpass_hz']},"
          f"apad,atrim=0:{dur_base:.3f}[bed]")
dk = P["duck"]
fc.append("[0:a]aformat=sample_rates=48000:channel_layouts=stereo,asplit=2[v1][v2]")
fc.append(f"[bed][v1]sidechaincompress=threshold={dk['threshold']}:ratio={dk['ratio']}:attack={dk['attack']}:release={dk['release']}[bedd]")
fc.append("[v2][bedd]amix=inputs=2:normalize=0,alimiter=limit=0.97:level=0[a]")
cmd += ["-filter_complex", ";".join(fc), "-map", "0:v", "-map", "[a]", "-c:v", "copy", "-c:a", "pcm_s16le", tmp.replace(".mp4", ".mov")]
subprocess.run(cmd, check=True)

# outro: slide + its music, fade from/to black, then concat
od = o["dur_s"]; og = o["target_lufs"] - o["music_lufs"]
outro = out.replace(".mp4", ".outro.mov")
subprocess.run(["ffmpeg", "-y", "-hide_banner", "-loglevel", "error", "-loop", "1", "-framerate", "30", "-t", f"{od}", "-i", o["slide"], "-i", o["music"],
                "-filter_complex",
                f"[0:v]scale=1920:1080,format=yuv420p,fade=t=in:st=0:d={o['fade_in']},fade=t=out:st={od - o['fade_out']:.3f}:d={o['fade_out']}[v];"
                f"[1:a]aformat=sample_rates=48000:channel_layouts=stereo,atrim=0:{od},volume={og:.2f}dB,afade=t=in:st=0:d={o['fade_in']},afade=t=out:st={od - o['fade_out']:.3f}:d={o['fade_out']}[a]",
                "-map", "[v]", "-map", "[a]", "-c:v", "libx264", "-crf", "18", "-r", "30", "-c:a", "pcm_s16le", "-t", f"{od}", outro], check=True)
main = tmp.replace(".mp4", ".mov")
subprocess.run(["ffmpeg", "-y", "-hide_banner", "-loglevel", "error", "-i", main, "-i", outro, "-filter_complex",
                "[0:v]fps=30,format=yuv420p,setsar=1[v0];[1:v]fps=30,format=yuv420p,setsar=1[v1];[v0][0:a][v1][1:a]concat=n=2:v=1:a=1[v][a]",
                "-map", "[v]", "-map", "[a]", "-c:v", "libx264", "-crf", "20", "-preset", "medium", "-c:a", "aac", "-b:a", "192k",
                "-movflags", "+faststart", out], check=True)
for f in (main, outro):
    os.remove(f)
print("done ->", out)
