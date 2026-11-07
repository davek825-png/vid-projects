# End screen slides (cross-video)

`OWS_endscreen_slots_1920x1080.png` is the Old West Stories end screen, appended for the last 16 s of
every video (music plan `outro.slide`). It has two empty slots, so YouTube's end-screen elements fit
without covering any text:

| Slot | Position (1920×1080) | YouTube Studio element |
|---|---|---|
| Video card (16:9, left) | x 200–1016, y 372–831 | **Video**: "Best for viewer" or a specific story |
| Circle (right) | centre (1440, 580), diameter 320 | **Subscribe** |

In Studio: Editor > End screen > + Element. Drag each element onto its slot and stretch it to the
slot's edges. Set both to run the full 16 s outro. After the first video, use **Import from video**
to copy the layout onto later uploads.

Source: `remotion/src/shots/brand/OwsEndScreen.tsx`. Re-render with
`cd remotion && node scripts/render-all.mjs --still --scale=1 OwsEndScreen`, then convert the output
to a real PNG with `ffmpeg -i out/OwsEndScreen.png <this file>`; render-all writes JPEG data under a
.png name.
