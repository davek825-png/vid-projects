# Brand — Old West Stories

> Style contract for every long-form video this repo produces. Every step-2+ skill (TSX overlays,
> full-screen animations, diagrams, SFX) reads this file so all videos feel like one channel.
> Written by `/brand-setup` together with `remotion/src/brand.ts` and `remotion/src/fonts.ts` — change
> all three together. **Old West Stories:** true frontier history — sunset parchment, espresso ink,
> rust accent; slow, suspenseful, documentary motion.

## 1. Identity & voice

- **Channel:** **Old West Stories** — stories of the American frontier: true tales of outlaws, lawmen,
  the gold rush and frontier adventure, drawn from period newspapers, eyewitness diaries, court
  transcripts and territorial records. From showdowns in Tombstone and Deadwood to survival stories
  and railroad heists — the grit, danger and reality of the frontier.
- **Positioning:** a **historical documentary** look — aged parchment, wanted-poster type, sunset
  light. Intrigue, mystery, suspense. Evidence-driven: the sources (a newspaper clipping, a diary
  line, a court record) are the stars of the visuals.
- **Voice:** a storyteller's — measured, atmospheric, plain-spoken, grounded in the record. No
  hype-filler, no modern slang on screen. On-screen text **avoids em-dashes**.
- **Energy for video:** slow-burn suspense, not loud. Let moments breathe; build tension, then reveal.
  No cartoon bounce, no sticker-pop looks, no glossy tech polish.

## 2. Logo / wordmark

- **Wordmark:** `Old West Stories` — three parts `['Old ', 'West', ' Stories']`, **"West" in the rust
  accent**, Rokkitt bold. (The parts are joined with no gap, so the spaces live inside the strings.)
- **Sign-off (end card):** "We'll see ya again in the next story."
- The banner's lettering (wood-type slab, distressed infill, dark-brown outer stroke, warm glow,
  Victorian scrollwork) is the reference for title cards. Scrollwork flourishes are graphics, not
  font glyphs — put reusable ones under `media/library/logos/`.
- Drop any portrait / brand-bumper assets you want to reuse under `media/library/` and reference
  them from shots via `staticFile('library/...')`.

## 3. Color palette (exact hex)

Sampled from the channel banner (sunset over the frontier).

| Role | Name | Hex | Use in video |
|---|---|---|---|
| **Primary accent** | terracotta / rust | `#9E431B` | key words, highlights, active state, the "West" in the wordmark. **Large text only** (4.4:1 on paper) |
| Secondary accent | frontier ochre | `#D37B2B` | gradients, fills, secondary emphasis. **Never as text on parchment** (2.2:1) |
| Success / positive | sage | `#5E7344` | confirms, checkmarks, "survived", positive callouts (large text only on paper) |
| Success alt | light sage | `#7D8F5A` | sage companion |
| Warn / attention | sunset gold | `#F7BD6A` | highlight sweeps, "watch this", glow; ink on gold reads 10.4:1 |
| Danger / contrast | blood crimson | `#6E1E12` | death, danger, outlaws, "wanted", negative contrast |
| Ink (text/dark) | frontier espresso | `#2B120B` | primary text on light (12.1:1 on paper) |
| Muted text | saddle brown | `#6B4A33` | secondary text, captions (5.4:1) |
| Surface (paper) | parchment | `#ECD3A4` | light full-screen bg, documents |
| Surface 2 (cream) | light parchment | `#F5E8CC` | alt band, cards |
| Line | worn tan | `#D4B784` | 1px borders on light |

**Dark scale** (espresso night — suspense scenes, dark panels, record/telegraph mockups):
`#1A0B06` (bg) · `#2B120B` (panel) · `#4A2111` (border, burnished scroll bronze) · `#A08A73` (dim
text) · `#E3D3B8` (text). Sunset gold on espresso reads 10.4:1.

**Glow accents** (dark scenes only, never body text): sun-glare `#FFAA33` / `#FEE88D`.

**Signature gradient:** the banner sunset — rust → ochre → sunset gold
(`#9E431B → #D37B2B → #F7BD6A`). Dividers, title-card skies, full-screen backgrounds.

## 4. Typography (3-font system)

| Role | Font | Weights | Use |
|---|---|---|---|
| **Display / headlines** | **Rokkitt** | 500 / 600 / 700 / 800 / 900 | titles, big statements, chapter cards, the wordmark |
| **Body / UI** | **Lora** | 400 / 500 / 600 / 700 | subtitles, labels, quotes, lower-third detail |
| **Mono** | **Courier Prime** | 400 / 700 | telegrams, court transcripts, ledgers, dates, record citations |

All load from `@remotion/google-fonts` (see `remotion/src/fonts.ts`) — nothing to install.
- Rokkitt is a 19th-century "Egyptian" slab serif: the closest Google family to the banner's
  wood type that ships a full weight range. **Rye / Smokum** (true wood type) exist but are 400-only;
  shots request 600/700 hundreds of times, so they would render faux-bold. If a hero title card wants
  them, load one locally in that shot at weight 400 only.
- Headlines: generous size, slightly tight tracking; uppercase works for chapter cards. Courier Prime
  for anything that is literally a document, date or citation. Courier Prime has no 500/600 — ask for
  400 or 700.
- `FONT_SERIF` (Spectral) in `fonts.ts` is a utility for the Claude Code wordmark clone in the example
  shots — not a brand font.

## 5. Shape & depth

- **Radius:** small and squarer — ~8px cards/panels, ~6px windows; pills fully rounded. Documents and
  clippings can be square-cornered.
- **Depth:** warm, soft shadows in espresso (`0 8px 32px rgba(43,18,11,.18)`), 1px worn-tan borders.
  Paper texture, vignettes and light grain are welcome on full-screen beats.
- **Never:** glossy glassmorphism, neon, hard sticker offsets, bright tech blues.
- **Document chrome:** clippings, diary pages, court records and maps on parchment with a soft drop
  shadow, slight rotation (±1–2°), and a Courier Prime source line (paper, date, place).

## 6. Motion language  ← *slow, deliberate, suspenseful*

Translated to video (Remotion, 30fps):

- **Entrances:** fade + slow rise. `opacity 0→1`, `translateY 16px→0` over ~12–18 frames (0.4–0.6s),
  `EASINGS.easeOut` (long settling tail). Things *emerge*, they don't pop.
- **Exits:** slow fade ~10–12 frames; dips to espresso black between chapters.
- **Emphasis:** a rust underline or sunset-gold highlight sweep behind a key word over ~8–10 frames;
  scale max 1.03. For a reveal, hold a beat of stillness first, then reveal.
- **Stagger:** 5–8 frames between list items / lines — slower than a tech channel.
- **Camera:** slow Ken Burns push-ins on photos, maps and documents (5–10% over the beat).
- **Backgrounds:** slow drifting sunset gradient, dust/grain, gentle vignette; 10–20s loops.
- **Feel:** documentary suspense. No spins, no elastic, no bounce (`overshoot` is a faint settle).

## 7. Video delivery specs

- **Canvas:** **1920×1080, 30 fps** — matches the camera and the master cut. Every shot composition
  must be 30fps or it will drift against the narration.
- **Safe margins:** keep text ≥ 5% from edges (title-safe ~7.5%). Lower-thirds in the bottom ~12–18%
  band, left-aligned to the margin.
- **Talking head is CENTER-framed.** Overlays live in the **top and bottom bands**, or become
  **full-screen cutaways** (cut away from the presenter to a full-screen TSX beat). Never cover the
  center-framed presenter.
- **Overlay types:** lower-third (name / place / year), keyword callout, full-screen chapter card,
  newspaper clipping / document reveal, map with route or location pin, timeline, wanted poster.
- **Visual editing rules** (honored by `/make-tsx`): story beats = full-screen cutaways; overlays only
  for small persistent labels (place, date); visuals sync to narration and never pre-empt a reveal;
  show the real source (period newspaper, record) whenever a fact is cited.
- **Captions:** overlays only (not word-level captions) for long-form.

## 8. Asset & source locations

- Master (example): `videos/video-1/reference/<cut>.mp4` · edited transcript:
  `videos/video-1/work/edited-transcript.json` (word times in the master timeline).
- Reusable brand assets: `media/library/` (typed folders — `logos/ sfx/ music/ faces/` each with an
  index/catalog). Per-video generated assets: `media/projects/<video>/`, referenced from shots as
  `staticFile('projects/<video>/x')`.
- Brand tokens as code: `remotion/src/brand.ts` (keep it in sync with this file).

## 9. Locked decisions & still-open

- **Brand = Old West Stories** — parchment base, espresso ink, rust accent, sunset gradient. ✓
- **Type = Rokkitt / Lora / Courier Prime.** ✓ (Rye/Smokum per-shot for hero titles only — open.)
- **Motion = slow, deliberate, suspenseful** (§6). ✓
- **Delivery = 1920×1080 @ 30fps.** ✓
- **Framing = centered** — overlays top/bottom band or full-screen cutaway; never cover center. ✓
- **SFX + music:** subtle, always under the voice. See §10.

## 10. Sound design — SFX

Same energy as the motion: **subtle, atmospheric, felt-not-heard.** Every sound effect and the music
bed sit **under the voice** — the story is the show, sound is the seasoning. Lean on period/Western
textures (wind, wood, leather, metal, horses, distant gunfire) over modern UI sounds.

**Choose every cue by its FUNCTION** (3+1 foundational sounds do the heavy lifting; thousands of
files are a trap). Ask what the beat needs:

| Function | Sound | Its job | Our (subtle) sub-types |
|---|---|---|---|
| **Motion** | whoosh | carry one shot into the next | `whoosh-soft` (quick cut), `whoosh-wind` (prairie wind gust — the default) |
| **Tension** | riser | "something is coming"; hold before a reveal | `riser-soft` (low, slow drone / bowed string; NO cymbal-urgency riser) |
| **Emphasis** | impact / pop | "this moment matters"; lands as the new shot appears | `impact-soft`, `impact-deep-soft` (low boom, long tail — the reveal), `pop-reveal` |
| **Snap** | click | small, alive; a sequence of related shots each on a click | `ui-click-soft` → prefer period mechanics: revolver cock, typewriter key, telegraph tap, latch |

Plus brand-specific extras: `page-flip` (documents, diaries, newspapers), a distant single gunshot
(only when the narration is literally a shot), spur jingle, horse whinny/hooves, creaking door/saloon
doors. Generate missing ones with the ElevenLabs SFX API and add them to the library.

- **Taste — subtle, under the voice.** Quiet, always UNDER the voice. Silence is part of the mix and
  suits suspense; never wall-to-wall. Nothing ever plays louder than the voice.
- **Layer only the big moments (build-and-drop).** **riser → impact** on a scripted reveal (the
  verdict, the ambush, the body found), **wind → impact** so a chapter cut stands out. Reserve
  layering for the 2–3 biggest moments; keep everything else single and sparse.
- **Density — propose only what really matters.** Score the signature moment of a beat, not every
  sub-frame. A click-sequence counts as ONE gesture. **There is no optional tier**: a cue you would
  flag as deniable is a cue you don't propose.
- **What does NOT earn a cue:**
  · **clicks on decorative animation** — card cascades, chip runs, hover pops. A click-sequence earns
  its clicks only when the narration ENUMERATES the items and each click lands on the word.
  · **whooshes on secondary cutaways** — whoosh the cuts that change the story (chapter cards, a scene
  the narration pivots into), never every mid-beat panel or photo push.
  · **ambient texture under speech** — scribbles, shimmers, typing beds. (A low room-tone/wind bed
  belongs to the music/final-mix step, not the SFX pass.)
  · **a second sound inside one gesture.**
  · **gunshots as decoration** — a shot sound only when a shot happens in the story.
- **Sync — to the VISUAL beat, and often the exact word.** Time off the shot's animation frames AND
  `edited-transcript.json` word times.
- **Levels.** Library clips are loudness-normalized to **~−20 LUFS** with a −1.5 dBFS peak ceiling, so
  a plan's per-cue `gain_db` is perceptually meaningful. The voice is ~−17 LUFS. This channel sits
  quieter than default: **payoffs ~−7/−8 · transitions ~−9/−10 · bed/texture ~−11/−13.** The SFX bus
  is **lightly ducked under the voice** (gentle sidechain, ~4 dB) in the audition mix; final
  polish/ducking/loudness is the final-mix step's job.
- **Signature motif.** A single recurring cue as a sonic through-line — e.g. a wind gust + soft
  low boom on every chapter card.
- **Meme gags — off by default.** The meme effects in `remotion/src/lib/effects.tsx` (SFX category
  `meme`) clash with a suspense documentary. Use none unless the creator asks for one on a
  deliberately comic line.
- **What we deliberately do NOT do:** cymbal-urgency risers, trailer-slam impacts, a whoosh on every
  movement, comedy click+whoosh gags, modern UI blips over period footage. **No static/glitch
  textures under narration.**
- **Source.** ElevenLabs **Sound Effects API** is primary (owned, consistent, reusable); curated
  royalty-free is the fallback. Every clip's `source` + `license` is recorded in the catalog.
- **Music.** No music bed in the SFX pass. Music is the final-mix step (`tools/gen_music.py` +
  `tools/mix_music.py`, drawing from `media/library/music/`). Taste: sparse Western/Americana
  underscore (acoustic guitar, low strings, harmonica, slow percussion), **always ducked well under
  the voice.**
- **Library is the durable asset.** Shared, cross-project at **`media/library/sfx/`** (`catalog.json`
  + `clips/`), organized by function. It GROWS every video — reuse before generating (library-first).
  SFX that must live *inside* a Remotion shot go in `media/library/sfx/` via `staticFile()`.
