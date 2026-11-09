# CLAUDE.md — claude-youtube-editor

**You record the talking head. Claude Code does the rest.** Every screen moment — UI walkthroughs,
full-screen statements, diagrams, terminal mockups — is built as Remotion TSX and composited over
your cut. No screen recording, no video editor. The right skill is picked from the request:

| The user asks to… | Skill | Output |
|---|---|---|
| set up / change their brand, colors, fonts, wordmark | `/brand-setup` | `brand.md` + `remotion/src/{brand.ts,fonts.ts}` + a proof render |
| cut the raw footage / tighten pacing / remove fillers | `/clean-cut` | master cut + `videos/<project>/work/{analysis/cuts.json, edited-transcript.json}` |
| build the visual beats / add overlays | `/make-tsx` (+ `/fake-screencast`) — first asks: **default, cutout or claymation** style | shots in `remotion/src/shots/<project>/` + a baked preview |
| write a crash-free TSX shot | `/vidtsx-2d-generator` | the low-level Remotion authoring rules |
| remove background noise / isolate voice | `/clean-audio` | a cleaned master (levels preserved) |
| add SFX / sound-design a beat | `/suggest-sfx` | `videos/<project>/work/sfx-plan.json` + an audition mix |
| package a video / titles + thumbnails | `/packaging` | `videos/<project>/packaging/` (1 title × 3 thumbnail options with copy-paste Nano Banana prompts you render yourself) |
| make / iterate thumbnails only | `/thumbnail` | 3 options + complete Nano Banana prompts in `videos/<project>/packaging/` (asks which style elements you want; verifies the images you bring back) |
| upload it | `tools/yt_upload.py` | a private draft on YouTube |
| track it / put it in Notion | `tools/notion_sync.py` | the video's row in the Notion content tracker |

The pipeline order is: **cut → visuals → voice → SFX → packaging → upload.**

`brand.md` is the style contract every step-2+ skill reads (palette, motion, delivery specs, SFX
taste). `remotion/src/brand.ts` + `fonts.ts` are the same contract as code — **`/brand-setup` owns all
three together; they drift silently if you hand-edit one.**

## Remotion's official skills (reference, the pipeline wins)

`.claude/skills/remotion-*` are the 13 official Remotion Agent Skills (router:
`remotion-best-practices`; also markup, captions, maps, render, studio, docs, multimedia,
interactivity, create, saas, license, upgrade), copied from `remotion-dev/remotion`
`packages/skills/skills/` at commit `ba0fbf0` (skills v4.0.542; Remotion packages also 4.0.542, upgraded 2026-11-09).
Use them as **API and technique reference** inside the pipeline above. Where they disagree with this
repo, this repo wins:
- "Make / create a video" means this pipeline (`/clean-cut` → `/make-tsx` → …), never
  `remotion-create`: the Remotion project already exists in `remotion/`. Don't scaffold another.
- Shots follow `/make-tsx` + `/vidtsx-2d-generator` conventions (one shot per file under
  `src/shots/<project>/`, `compositionConfig`, generated registry), not a hand-edited `Root.tsx`.
- The QA rule overrides their "don't render unless asked": render frames to verify every shot.
  Opening Remotion Studio is optional, not required, before building.
- Don't upgrade Remotion (`remotion-upgrade`) without the creator's go-ahead. On Windows `npx remotion
  upgrade` crashes spawning `npm` (ENOENT): run the `npm i --save-exact ...` line it prints yourself,
  then `npx remotion versions`. Render a few shots before and after and compare frames.
- Snapshot install: to refresh, re-copy that folder from the repo (repoint the router's `./remotion-*`
  links to `../remotion-*`, since the upstream symlinks are dropped on Windows) and update the commit
  above.

## Layout

```
tools/            Python tools (see requirements.txt); the cut-editor UI in tools/editor/;
                  RNNoise models in tools/models/rnnoise/
remotion/         the Remotion project — src/lib/ (kit, browser, screencast, vscode),
                  src/shots/<project>/; registry is GENERATED (npm run gen)
media/            Remotion's public root: library/ (reusable: sfx, music, logos, faces)
                  + projects/<project>/ (media for ONE video — via staticFile('projects/<p>/x'))
videos/           per-video project data — EMPTY until you make one. See videos/README.md
brand.md          the style contract
```

## The example

`remotion/src/shots/example/` is **37 real shots** from a published video — the worked example of the
kit. They render standalone with no footage: `cd remotion && npm run studio`. Read a few before
authoring new ones; that's the fastest way to learn `remotion/src/lib/`.

`remotion/src/shots/brand/BrandProof.tsx` is not a video beat — it's a utility shot that renders the
current brand (wordmark, palette, type) so you can see it. `/brand-setup` uses it.

## Conventions (hard rules)

- **Run everything from the repo root.** Tools resolve *engine* paths (media/library, catalogs,
  remotion/out) against their own location, but *project* paths against the CWD — so pass the project
  as `videos/video-1` and run from the repo root. Example: `python tools/render_cuts.py videos/video-1
  --style natural --mode preview`.

- **Python: use a venv at the repo root.** These tools have real dependencies. Create it once:
  ```
  python -m venv venv
  venv/Scripts/python -m pip install -r requirements.txt     # Windows
  ./venv/bin/pip install -r requirements.txt                 # macOS/Linux
  ```
  Then either activate the venv or call `venv/Scripts/python tools/<tool>.py`. A bare `python` that
  resolves to a system interpreter will hit `ModuleNotFoundError` (requests, Pillow, google-*) — that
  error means you're not on the venv. `ffmpeg`/`ffprobe` and `node`/`npx` must be on PATH (not pip).

- **API keys** live in `.env` at the repo root (copy `.env.example`). Never commit `.env`.
  `ASSEMBLYAI_API_KEY` = transcription · `ELEVENLABS_API_KEY` = voice-isolate + SFX + music ·
  `GEMINI_API_KEY` = thumbnails · `NOTION_TOKEN` + `NOTION_LONGS_PAGE_ID` = the content tracker.
  **YouTube uses OAuth, not a key**: `tools/yt_upload.py` (upload) and
  `tools/yt_stats.py` (stats) authorize via a browser and cache tokens under `.youtube/`
  (git-ignored). One-time setup: see `tools/yt_upload_SETUP.md`, then `python tools/yt_upload.py auth`.

- **Notion is the tracker, the repo is the source of truth.** `python tools/notion_sync.py
  videos/<project> --apply` pushes a project's row: properties from `videos/<project>/notion.json`
  (committed) and the page body from its `script/script.md`. It is a **dry run without `--apply`**,
  and it **matches an existing row before creating one** — ideas get parked in that database months
  early under a rough working name, so a blind create makes a duplicate. Never hand-edit the script
  in Notion; edit the repo and re-run with `--resync`. `--list` shows every row and its stage.

- **The Remotion registry is generated:** after adding/renaming a shot, `cd remotion && npm run gen`
  (the render/frames scripts do NOT run it themselves). `npm run gen` discovers `src/shots/**` and
  writes `src/registry.gen.tsx` + `src/shots.manifest.json` (both git-ignored).

- **Media rules:** `media/library/` is for CROSS-VIDEO reusable assets only (each with a catalog).
  Anything generated FOR ONE video (screen-caps, example art) goes in `media/projects/<project>/`,
  referenced as `staticFile('projects/<project>/x')`. Reuse before you generate — check the catalogs.
  The face-reference kit for thumbnails is `media/library/faces/` — **you supply your own** images
  (git-ignored; see its README). No face kit, no face thumbnails.

- **Music + SFX sources (creator rule, 2026-11-07):** background music = any track in
  `media/library/music/`, SFX = any clip in `media/library/sfx/`, each used **only where it matches
  the scene** (else silence). Every video's outro scene uses `media/library/music/clips/mus_outro.mp3`
  under the end-screen slide. **If no library track suits a scene, tell the creator what music is
  needed** (span, scenes, mood, instrumentation, tempo, length) instead of substituting. Full rules:
  `brand.md` §10.

- **Committed vs git-ignored:** the repo carries the *reproducible pipeline* — `cuts.json`, edit
  plans, `timeline.json`, transcripts, TSX shots, SFX/music plans, catalogs. **Raw footage and master
  cuts NEVER go to git** (`videos/*/*.MP4`, `videos/*/reference/`), and neither do rendered
  previews/outputs, audio work files, or rendered face thumbnails (`.gitignore` covers all of it). The
  SFX/music library `clips/*.mp3` ARE committed (there is deliberately no blanket `*.mp3` ignore).

- **QA is not optional:** render frames and READ them before declaring a shot done; run
  `verify_cut.py` on every cut render (it catches ghost speech + A/V drift); audit the SFX cue sheet
  before mixing. Scratch renders/frames go in a scratch dir, not the project.

- **The brand contract is three files.** `brand.md`, `remotion/src/brand.ts`, `remotion/src/fonts.ts`.
  Nothing errors when they disagree — the docs just stop describing the videos. Change them together,
  or run `/brand-setup`.
