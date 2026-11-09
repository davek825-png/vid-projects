# Voice library (cross-video)

**`ows-intro.wav`** is the STANDARD CHANNEL INTRO (creator rule, 2026-11-09): every Old West Stories
video opens with it, in place of whatever opening line the new narration has.

> "Welcome to Old West Stories. Ride with us through tales of the Old West, one good story at a time."

- `ows-intro.wav`: the original recording (48 kHz mono, 8.95 s).
- `ows-intro-clean.wav`: the same after `tools/clean_narration.py` (breaths muted, plosives tamed).
  This is the one to cut with.

How a video uses it (see the `/clean-cut` skill, "Channel narration rules"): copy
`ows-intro-clean.wav` into the project, wrap it as `Intro.mov` like the narration, add it as clip
`intro` FIRST in `cuts.json` `clip_order`, and cut the narration's own opening "Welcome to Old West
Stories..." line if the read has one. Worked example: `videos/ows-hickok/work/analysis/cuts.json`.
