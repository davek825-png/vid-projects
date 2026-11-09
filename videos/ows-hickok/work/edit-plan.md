# ows-hickok: edit plan (visual beats)

**Visual style: default (documentary)** (creator choice at the style gate, 2026-11-09).

Narration-only master (`output/master-natural-slow-h264.mp4`, 11:39.1, 1080p30): the standard intro
+ the cleaned narration. Every second is a full-screen cutaway: 45 beats tile 0–699.133.
Title card (beat 05): **Wild Bill's Last Hand** (proposed; the narration only names "the dead man's
hand" at 7:26, so the title doesn't).

**Build:** beats written once in `remotion/src/shots/ows-hickok/_beats.tsx`, spans in `_spans.ts`;
`python tools/gen_shots.py ows-hickok Hk videos/ows-hickok` writes the 45 `Hk*` wrappers and
`work/timeline.json`. Playing cards: reusable `remotion/src/lib/cards.tsx`.

## Take 2 (creator re-recorded hickock.wav, 2026-11-09; visuals already approved)

- New master `output/master-natural-slow-h264.mp4`: **10:25.1** (take 1 was 11:39.1, kept as
  `master-natural-slow-h264.v1.mp4`; take-1 timing in `work/edited-transcript.v1.json`).
- Cut per the channel rules: standard intro replaces the read's opening; retakes and false starts cut
  first-attempt-out (see `work/analysis/cuts.json` notes); breaths/plosives cleaned.
- **Retime without rewriting the beats:** every beat was re-found in take 2 by word alignment;
  `shots/ows-hickok/_timemap.ts` holds per-beat [take-1 s, take-2 s] anchors and `at()` in `_beats.tsx`
  maps every take-1 cue through `remap()`. `_spans.ts` is in TAKE-2 order: the gold-rush beats (Boom,
  Planks, Night) now come before McCall, as in the new read. Built by a scratch alignment script; to
  repeat for a future re-record, align the old and new `edited-transcript` words the same way.
- Text that followed the old wording was updated: letter page 2 ("I was never as well...", "write
  again in the morning"), page 4 ("finish this letter"); "He didn't get far." (was "The crowd nabbed
  him"); "From Cheyenne to Chicago" (the "News spread quickly" line is gone); the LivesOn captions
  for lines no longer read ("long gone", "a very specific hand") were removed.
- New beat 46 **HkOutro** for the read's closing "like and share... subscribe... next story".

## Rules for this video

- **Narration wins** where the read differs from the script.
- **Accuracy:** legible quotes are only the genuine ones: both letters (July 17 as read; Aug 1 in the
  creator's AI letter image / handwriting clip, which carry the source wording "never meet again"),
  and McCall's "Take that!". McCall's lie is labeled PARAPHRASED. Newspapers are abstract.
- **The fifth card is never shown as a specific card** (historians disagree). The drawn hand keeps it
  face-down; the AI image of Hickok from behind shows a jack, so it is covered with a "?".
- **Era:** the Grabill views (1888) and City Hall (1890) are not used; Deadwood scenes use the 1876
  photographs (Morrow, GeoEpoche) with honest date tags.
- AI images (saloon, angry cowboy, from-behind, desk, letter, handwriting clip) carry ILLUSTRATION.
- Not used: the Utter/Arapaho Joe grave frame (baked "to be documented" caption; the grave is never
  narrated), the Black Hills→Yankton schematic (replaced by a drawn map that also shows Laramie).
- **No shaky effects:** the shooting is told with a push, a fade to black and the quote on black.

## Beats

| # | Shot | Span | Visual |
|---|---|---|---|
| 01 | HkIntro | 0.00–7.60 | Wordmark card (standard intro) |
| 02 | HkRule | 7.60–20.20 | THE GOLDEN RULE: back to the wall / door in your sights |
| 03 | HkAug2 | 20.20–30.80 | Deadwood street 1876; AUGUST 2, 1876; "broke that rule" |
| 04 | HkLegend | 30.80–41.80 | Poker table, five cards dealt face-down on "cards" |
| 05 | HkTitle | 41.80–50.40 | Title card |
| 06 | HkArrive | 50.40–60.30 | Rockwood portrait 1873; JAMES BUTLER HICKOK / "Wild Bill" |
| 07 | HkScout | 60.30–71.50 | Hickok, Texas Jack, Buffalo Bill 1873; scout / Buffalo Bill / lawman |
| 08 | HkAging | 71.50–81.55 | Tintype c.1876; eyesight failing, frontier tamed |
| 09 | HkGold | 81.55–89.50 | Morrow street 1876; GOLD / A FRESH START / A NEW GAME |
| 10 | HkAgnes | 89.50–105.90 | Desk (AI); married; AGNES LAKE HICKOK |
| 11 | HkLetter1Intro | 105.90–115.40 | July 17, 1876, via Bob Boze Bell |
| 12 | HkLetter1 | 115.40–165.20 | The July 17 letter, four pages, lines on the words |
| 13 | HkWrong | 165.20–171.50 | Deadwood street, dimmed |
| 14 | HkPremonition | 171.50–184.90 | August 1, 1876; envelope; "A dark premonition." |
| 15 | HkLetter2 | 184.90–209.60 | AI letter image, then the handwriting clip signing "Wild Bill" on the words |
| 16 | HkMudPit | 209.60–221.90 | Morrow 1876 city view; lawless mud pit; Lakota land |
| 17 | HkNoLaw | 221.90–233.20 | Ledger: legal footing / courts / sheriff: none; LAWLESS stamp |
| 18 | HkMcCall | 233.20–250.70 | JACK McCALL poster card, traits on the words |
| 19 | HkBoom | 250.70–261.30 | Street 1876; PROSPECTORS MERCHANTS GAMBLERS DRIFTERS |
| 20 | HkPlanks | 261.30–268.80 | Street 1876; pine planks / sawmill |
| 21 | HkNight | 268.80–274.80 | Street at night (graded); lamps, fiddles, shouting |
| 22 | HkSaloon10 | 274.80–293.70 | Saloon (AI) bar side; Nuttall & Mann's Saloon No. 10 |
| 23 | HkOddJobs | 293.70–310.50 | Ledger: steady job / odd jobs / a quick buck; 1875 Deadwood note |
| 24 | HkLost | 310.50–322.80 | Chip stack drains; pockets empty |
| 25 | HkBreakfast | 322.80–349.80 | Angry cowboy (AI); breakfast money; table went quiet |
| 26 | HkInsult | 349.80–363.60 | The money, the insult, rye whiskey |
| 27 | HkAug2b | 363.60–376.30 | Street; August 2 afternoon; Saloon No. 10 |
| 28 | HkSeat | 376.30–396.80 | Saloon (AI): ring on the one open seat, THE DOOR; Charles Rich; "Rich said no." |
| 29 | HkInstinct | 396.80–420.70 | Push into the empty chair; dim; "...sat down." |
| 30 | HkTable | 420.70–449.60 | Tunnel vision; dealt; aces + eights flip on the words; fifth face-down; THE DEAD MAN'S HAND |
| 31 | HkLively | 449.60–464.40 | Saloon bar; miners, whiskey, smoke |
| 32 | HkWalkIn | 464.40–474.70 | The door, then Hickok from behind (fifth card "?") |
| 33 | HkShot | 474.70–487.30 | Push, fade to black; "Take that!" on black |
| 34 | HkChaos | 487.30–500.80 | Black text; muddy street; the crowd nabbed him |
| 35 | HkNoJudge | 500.80–516.40 | Ledger: Lakota land / laws / sheriff / judge / miners' jury |
| 36 | HkLie | 516.40–531.60 | McCall's claim (paraphrased); TURNED LOOSE |
| 37 | HkWyoming | 531.60–572.90 | Ink map: Deadwood → Laramie (Aug 29, arrested) → Yankton |
| 38 | HkTrial | 572.90–590.80 | Trial card; GUILTY; hanged March 1, 1877 |
| 39 | HkNews | 590.80–598.60 | Map: Deadwood → Cheyenne, Chicago |
| 40 | HkPapers | 598.60–604.40 | Abstract newspaper stack |
| 41 | HkLivesOn | 604.40–630.80 | Portrait c.1868-70, then the hand again (two aces, two eights) |
| 42 | HkFifth | 630.80–651.80 | Fifth card "?"; 9♦ / Q♥ / J♦ on the words; comment prompt |
| 43 | HkToday | 651.80–673.40 | Deadwood today; aces and eights dealt again |
| 44 | HkLesson | 673.40–690.40 | Money / pride / grudges chips |
| 45 | HkEnd | 690.40–699.13 | Back to the wall / avoid the dead man's hand / powder dry |
