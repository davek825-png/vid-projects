# ows-camels: edit plan (visual beats)

**Visual style: default (documentary)**. Creator decision 2026-11-07 after comparing all three
previews: the documentary version ships; cutout and claymation are dropped (shots kept in the repo,
no further work). Title confirmed: **The Army's Strangest Recruits**.

Originally built in all three styles (creator: "create one version of each"). One beat list,
three shot sets, three previews:

| Style | Shots | Timeline | Preview |
|---|---|---|---|
| default (documentary) | `remotion/src/shots/ows-camels/` `Cm*` | `work/timeline.json` | `output/ows-camels-preview.mp4` |
| cutout (paper, on threes) | `remotion/src/shots/ows-camels-cutout/` `Cut*` | `work/timeline-cutout.json` | `output/ows-camels-preview-cutout.mp4` |
| claymation (clay, on twos) | `remotion/src/shots/ows-camels-clay/` `Clay*` | `work/timeline-clay.json` | `output/ows-camels-preview-clay.mp4` |
| **all-2D / flat2d** (2026-11-09, second version) | `remotion/src/shots/ows-camels-2d/` `Flat*` | `work/timeline-2d.json` | `output/ows-camels-final-2d.mp4` (with SFX + music) |

**All-2D version (creator request 2026-11-09):** every photo and AI image replaced by a scene drawn in
code, in an Old West flat-vector poster look (creator's choice). Same beats, timing, reveal rule and
approved sound (`sfx-plan-2d.json`, `music-plan-2d.json` = the approved plans pointed at the 2D
picture). Drawn scenes: `ows-camels/_scenes2d.tsx` (keyed by the `IMG` srcs) on the reusable kit
`lib/flatwest.tsx`; the `flat2d` style lives in `lib/tristyle.tsx`. Beale is a drawn silhouette cameo,
not his photograph. Camels are drawn only in the reveal and wild-camel scenes.
Generate: `python tools/gen_camels_shots.py --only flat2d`.

**3D claymation version (creator request 2026-11-09):** real three.js claymation via `@remotion/three`
(+ `@react-three/fiber` 8, `three` 0.169). Every beat sits on a lit 3D clay set (desert with mesas for
night/storm beats; a clay paper sheet on a wooden table for ledger/map beats), and every image is a 3D
clay diorama (`ows-camels/_scenes3d.tsx` on the reusable kit `lib/clay3d.tsx`: camels, people,
wagons, fort, ship on a rolled-clay sea, adobes, saguaros, skull, vultures, a clay bust standing in
for Beale's photo). Text, ledgers, stamps and maps are the claymation slabs over the 3D set.
Stop-motion on twos with per-pose boil. Same beats, timing, reveal rule and approved sound
(`sfx-plan-3d.json`, `music-plan-3d.json`). Shots `remotion/src/shots/ows-camels-3d/Clay3d*`,
`work/timeline-3d.json`, final `output/ows-camels-final-3d.mp4`.
Generate: `python tools/gen_camels_shots.py --only clay3d`; render with
`node scripts/render-all.mjs --scale=1 --gl=angle <ids>` (WebGL on the GPU; 28 shots ≈ 9 min).

Beat timing and cue words are shared: `remotion/src/shots/ows-camels/_beats.ts` holds every span
and cue time, and all three styles read it, so a retime happens once.

Narration-only master (`output/master-natural-slow-h264.mp4`, 3:16.5, 1080p30) on a blank espresso
background, so **every second is a full-screen cutaway**: 28 beats tile 0–196.533 with no gaps.
Times are master seconds from `work/edited-transcript.json`.

## Rules for this video

- **THE REVEAL RULE (P2, the whole video hangs on it).** The word "camels" is not said until
  183.93. Before that, NO shot shows a camel, a hump, a camel silhouette, a camel track that reads
  as a camel, or the word. The animals are always hidden: under canvas, off-frame (crowds look at
  them, we see the crowd), as a "?" marker on maps, or as a count ("33", "25"). The AI image
  prompts say "no animals visible" for every pre-reveal image.
- **Narration wins** where the read differs from the script ("them" not "'em", "they'd").
  "Pacific" was cut from the master (the 1855 voyage crossed the Atlantic); no ocean is named.
- **Accuracy.** Only genuinely quoted words are legible; newspaper bodies and headlines are
  abstract strokes (no invented headlines). "3 handlers" is shown as said but nobody is named
  (the historical number was larger). Camp Verde gets a pin, not a drawn return route. AI images
  carry the ILLUSTRATION tag; real archival images do not.
- **No em-dashes** in on-screen text.

## Beats

| # | Default / Cutout / Clay | Span | Narration | Visual |
|---|---|---|---|---|
| 01 | CmFort / CutFort / ClayFort | 0.00–8.58 | summer of 1855… a decision… nobody at the fort could quite explain | Frontier fort at dusk [IMG A]; SUMMER 1855 stamp; "A decision nobody could explain." |
| 02 | CmShip / CutShip / ClayShip | 8.58–14.60 | sent men clear across the ocean… back to Texas with 33 animals | Ship at sea [IMG J], cargo under canvas; TEXAS pin; "33 ANIMALS" + "?" on "33 animals" |
| 03 | CmHandlers | 14.60–19.80 | and 3 handlers… the only ones who knew how to manage these animals | Three unnamed handler figures (silhouettes / paper / clay); "3 HANDLERS"; "the only ones who knew how" |
| 04 | CmWhy | 19.80–21.85 | Why would they do such a thing? | Question card |
| 05 | CmProblem | 21.85–31.90 | out west… a big problem… haul supplies across harsh country… chew up horses and spit out the bones | Bleached desert with a horse skull [IMG B]; "A big problem." then "chew up horses / spit out the bones" |
| 06 | CmHorses | 31.90–41.10 | Horses were valuable… wouldn't bet a whole supply train… So they got creative. | Ledger: HORSES · valuable; SUPPLY TRAIN · a whole one; SURVIVE THE JOURNEY? · not a bet worth making; "So they got creative." |
| 07 | CmTitle | 41.10–47.30 | Pull up a chair. This is Old West Stories… | Title card. **Title TBD** (must not say camels; proposal: "The Army's Strangest Recruits") |
| 08 | CmBeale | 47.30–51.48 | In 1857, Edward Beale got his orders | Real portrait of Edward F. Beale [REAL 1]; 1857 stamp; name tag |
| 09 | CmRoad | 51.48–58.95 | survey a wagon road west from what is now northeastern Arizona… to Southern California | Ink/paper/clay map of the Southwest: NE ARIZONA pin, route draws west to SOUTHERN CALIFORNIA, "WAGON ROAD" |
| 10 | CmOrders | 58.95–63.85 | an instruction that raised a few eyebrows on the frontier | Sealed orders envelope; "…raised a few eyebrows" |
| 11 | CmTwentyFive | 63.85–76.36 | handed Beale 25 unusual animals… road-building supplies… horses, mules, and oxen previously didn't survive | Ledger: 25 UNUSUAL ANIMALS (?) · CARGO road-building supplies · then HORSES ✗ MULES ✗ OXEN ✗ struck on each word |
| 12 | CmCritters | 76.36–86.61 | not sure what to expect from these critters… didn't know much about caring for them… good thing those 3 handlers came along | Expedition setting out at dawn, animals out of frame [IMG D]; "Not sure what to expect."; "3 handlers" callback |
| 13 | CmJornada | 86.61–95.87 | the Jornada del Muerto… the journey of the dead man | Bleached desert [IMG E]; "JORNADA DEL MUERTO" then "the journey of the dead man" |
| 14 | CmNinety | 95.87–103.55 | roughly 90 miles of desert with very little water… countless people and livestock had perished | Strip map: a 90 MILES bar, two lonely water marks, skull marks along it |
| 15 | CmCrossed | 103.55–109.88 | To Beale's amazement, these strange animals crossed… without a lick of trouble | Same strip: a "?" marker crosses all 90 miles; NO TROUBLE stamp |
| 16 | CmLA | 109.88–120.08 | By December… Los Angeles… drew their fair share of attention. Folks lined the streets | DECEMBER 1857 stamp; crowd on an 1857 LA street staring at something off-frame [IMG F] |
| 17 | CmPapers | 120.08–126.26 | Newspapers ran stories… the talk of the territory and the star of the show | Stack of newspapers (abstract body + headline strokes); "The talk of the territory." "The star of the show." |
| 18 | CmTrouble | 126.26–128.07 | Then trouble came. | Dark card, a storm-red rule |
| 19 | CmCampVerde | 128.07–133.50 | back to Camp Verde, the Texas post where the whole venture had started | Map: CAMP VERDE, TEXAS pin; "where it all started" |
| 20 | CmCivilWar | 133.50–141.62 | Civil War reached Texas… Camp Verde fell into Confederate hands… no idea what to do with the animals | 1861 stamp; CONFEDERATE HANDS stamp over the pin; "?" |
| 21 | CmFates | 141.62–150.91 | Most auctioned off. Some zoos. Some circuses. Others simply walked away. | Ledger, four rows on their words; the last row's tracks walk off frame (abstract hoof dots, not camel-shaped) |
| 22 | CmBooks | 150.91–155.23 | the part of the story that you won't find in the history books | A closed history book; "Not in the history books." |
| 23 | CmSightings | 155.23–163.78 | as late as the early 1900s… strange wandering creatures from Arkansas all the way to Mexico | EARLY 1900s; map of the South/Southwest, "?" sighting dots spread ARKANSAS → MEXICO |
| 24 | CmTraced | 163.78–174.81 | swore they'd seen one with their own eyes… traced back to Beale's expedition over 40 years before | Sighting notes (abstract); a line threads back to BEALE · 1857; "40+ YEARS" |
| 25 | CmSetup | 174.81–183.40 | Beale couldn't cross that harsh Southwest with horses and mules, so the Army gave him… | HORSES ✗ MULES ✗; then a tall canvas-covered shape; hold on the pause |
| 26 | CmReveal | 183.40–185.00 | camels. | REVEAL: canvas drops on the cue; Army camel caravan [IMG H] (or the real 1857 Heap engraving [REAL 2]); "CAMELS." |
| 27 | CmWildCamel | 185.00–192.20 | if you came across a wild camel roaming the Arizona desert today, what would you do? Drop your answer in the comments | A lone camel in the modern Arizona desert at sunset [IMG I]; "What would you do?"; "Drop your answer in the comments" |
| 28 | CmEndCard | 192.20–196.533 | Like, share, and subscribe… see you in the next story | End card (LIKE · SHARE · SUBSCRIBE, wordmark, sign-off). The 16 s end-screen slide is appended later in the music step. |

Shots 03–28 follow the same naming in every style (`CmX` / `CutX` / `ClayX`).

## Per-style treatment

- **Default:** ows-snowshoe kit as-is (ParchmentBg/NightBg, KenBurns + IllustrationTag, ink maps,
  LedgerRow, Stamp, Print, Envelope), smooth eased motion, dips between scenes.
- **Cutout:** CraftPaperBg with torn strips, AI images as CutoutPhoto prints (never full-bleed
  zooms), PaperLabel text, stamps as dropped PaperPieces, maps from paper (torn mountains, stitched
  route drawn in steps, paper-dot pins), "?" markers as paper tags. Stop-motion on threes, hard cuts.
- **Claymation:** ClaySet + ClayMountains, images as ClayPhotoProp framed on the set, ClayText for
  big words, ClaySlab for ledgers/labels, maps as a clay diorama (rope route, ball pins). The reveal
  is a clay tarp popping off. Stop-motion on twos, hard cuts.

## Images

Prompts: `work/image-prompts.md`. Files (git-ignored, local only):

- `media/projects/ows-camels/src/` the creator's 8 Gemini originals (.jfif, 2752x1536), realistic
  style; `web/` = 2304px jpg copies the shots load. All carry the ILLUSTRATION tag.
- `media/projects/ows-camels/real/` public-domain archival images (sources in `real/SOURCES.md`):
  `beale.jpg` (portrait, beat 08) and `heap.jpg` (Heap, "Embarkation of Camels", 1857 report; not
  used yet, available for a post-reveal beat).
- Cutout and claymation currently reuse the realistic images as torn paper prints / clay-framed
  props (allowed by the style rules). Restyled versions can be dropped in later (`IMG` in
  `_beats.tsx`).

## Build (2026-11-07)

- Beats written once in `remotion/src/shots/ows-camels/_beats.tsx` on the new reusable adapter
  `remotion/src/lib/tristyle.tsx`; props in `_props.tsx`; spans in `_spans.ts`.
- `python tools/gen_camels_shots.py` writes the 84 wrappers + 3 timelines from `_spans.ts`; then
  `cd remotion && npm run gen`.
- **Title (beat 07):** "The Army's Strangest Recruits" (`TITLE` in `_beats.tsx`), confirmed by the
  creator 2026-11-07.
