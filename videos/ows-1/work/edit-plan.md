# ows-1 — Sacagawea: edit plan (visual beats)

Narration-only master (`output/master-natural-slow-h264.mp4`, 6:29.5, 1080p30). The master picture is a
blank espresso background, so **every second is a full-screen cutaway** — beats tile the timeline
end to end with no gaps. Times are master seconds from `work/edited-transcript.json`.

**Story rule (P2):** the narration withholds her name until 6:19 ("Her name was Sacagawea"). No
visual names her, labels her, or captions an image of her before that beat. Same for "Shoshone"
(never said) and "brother" (said at 6:07).

**Creator rule (2026-11-04): NO image showing her FACE before beat 30.** Her identity is the
surprise. Allowed before the reveal: type, documents, her arm only ([14]), and the tent [6] framed on
the chief and fire (she would only be at the far right edge). Images showing her face — [15], [16],
[4] — appear only from beat 30 on. Re-cast from the first draft: 03 = type only; 18 = horses print;
27 = the 1814 account quote then the tent; 29 = tent push onto the chief; 30 = [15] behind the name;
31 = [4] the embrace behind the comment prompt.

**Accuracy rule:** on-screen quotes are the sources' actual words (Lewis 16 May 1805 and 11 Aug
1805; the 1814 Biddle account), spelling modernised; anything not verbatim is labeled PARAPHRASED
(beat 17). Journal pages are abstract strokes; only genuine quoted phrases are legible.
AI paintings carry an ILLUSTRATION tag (creator choice).

**Image legend:** `[n]` = file in `media/projects/ows-1/` (numbers from the contact sheet).
[1] 3 boats rushing supplies · [2] 3 Boats · [3] Louisiana Purchase map 1803 · [4] Hug · [5] Idaho wild
horses · [6] Inside tent · [7] Jefferson Letter · [8] Lewis and Clark (color) · [9] continental divide
pano · [10] M Lewis engraving · [11] Mallery hand signs plate · [12] color expedition map (French) ·
[13] Lewis & Clark engravings · [14] Pointing finger · [15] Sacagawea (painting, w/ baby) · [16]
Sacagawea detail, Lewis & Clark at Three Forks · [17] Shoshone camp · [18] Solo rider

Shared components → `remotion/src/lib/frontier.tsx`: KenBurns photo (slow push/pan + vignette +
grain), ChapterTitle, DateStamp, NameTag (lower third), JournalQuote (parchment + Lora + Courier
source line), LedgerCard (typed lines revealed on cue), Wordmark card.

| # | Shot id | Master span | Narration | Visual |
|---|---|---|---|---|
| 01 | OwsColdOpen | 0.00–8.60 | Welcome… one good story at a time | Espresso night, sunset glow; **Old West Stories** wordmark rises on "Welcome", tagline on "Ride with us", "One good story at a time" small |
| 02 | OwsJournalOpen | 8.60–13.00 | In Lewis and Clark's journal, one person kept appearing | TSX journal page, handwritten-style entries scroll; one recurring line glows |
| 03 | OwsRiversStorms | 13.00–17.20 | rivers, storms, hunger | [15] slow push (unnamed figure); RIVERS · STORMS · HUNGER on each word |
| 04 | OwsNoName | 17.20–28.60 | never gives her a name… "the wife of our interpreter"… "the Indian woman" | Journal page; **name blanks** `______` ; the two quoted phrases underline in rust on cue |
| 05 | OwsQuestion | 28.60–38.50 | Why would men… forget a name? Keep that question close. The answer is the story. | Dark card, the question types in (Lora); "Keep that question close" smaller; ends on a blank NAME line |
| 06 | OwsTitle | 38.50–44.20 | Pull up a chair… this one's gonna be good | Episode title card (title TBD — see Q1), sunset gradient bar |
| 07 | OwsJefferson | 44.20–53.20 | In 1803, Jefferson sent a small expedition west… | [7] Jefferson letter push; DateStamp **1803**; NameTag "President Thomas Jefferson" on his name |
| 08 | OwsLouisiana | 53.20–63.10 | The Louisiana Purchase… beyond the Mississippi… just rumor | [3] map push into the red territory; "THE LOUISIANA PURCHASE" on cue; "mostly rumor" on "rumor" |
| 09 | OwsWaterRoute | 63.10–73.30 | Railroads decades away… a water route to the Pacific | Parchment map card: dotted line draws St. Louis → west → **Pacific?**; "THE GOAL: a water route to the Pacific" |
| 10 | OwsCorps | 73.30–79.80 | left St. Louis in May 1804… Corps of Discovery | [2] boats push; DateStamp **St. Louis · May 1804**; title "The Corps of Discovery" on its words |
| 11 | OwsCaptains | 79.80–83.50 | Meriwether Lewis and William Clark led them | [8] portraits; NameTags under each on each name |
| 12 | OwsDakotas | 83.50–94.10 | By November… the Dakotas. Winter… a guide | [12] map, crop to the route; pin pulses at Fort Mandan; DateStamp **November 1804** |
| 13 | OwsCondition | 94.10–107.40 | hired an Indian man… one condition: his wife… readily agreed | LedgerCard (Courier): "HIRED: guide & interpreter" → "ONE CONDITION" → "his wife comes too" → stamp **AGREED** |
| 14 | OwsCapsize | 107.40–122.50 | May 1805, a boat tipped over… supplies, papers… the captains' records | [1] push, slight shake; DateStamp **May 1805**; "supplies · papers · the captains' own records" on cue |
| 15 | OwsFortitude | 122.50–134.60 | Lewis wrote that the Indian woman… fortitude and resolution… caught and saved… | JournalQuote with [10] Lewis engraving; quote lines reveal on cue; source "Meriwether Lewis, May 1805" |
| 16 | OwsMountains | 134.60–150.40 | Summer 1805, rivers running thin… formidable mountains… horses they didn't have | [9] panorama slow pan; DateStamp **Summer 1805**; "Horses they didn't have." on cue |
| 17 | OwsNoHorsesPlan | 150.40–171.20 | water route, horses not part of the plan… leave a great part of its supplies behind | LedgerCard: "PLAN: water route ✓ / horses ✗"; then JournalQuote "leave a great part of its supplies behind" |
| 18 | OwsSheKnew | 171.20–181.80 | The Indian woman knew where to go… would anyone trade? | [16] painting push (unnamed); question line on "The question was…" |
| 19 | OwsPointing | 181.80–193.50 | August 8th, she pointed… a place to trade… her people's summer camp | [14] pointing push, DateStamp **August 8, 1805**; crossfade to [17] camp on "her people's summer camp" |
| 20 | OwsChoice | 193.50–218.70 | Lewis faced a choice… stay together / ride faster… Lewis chose speed | Two-column card: **STAY TOGETHER** (slow, supplies dwindle) vs **RIDE AHEAD** (unknown country, unfriendly?, no horses?) revealing on cue; "Lewis chose speed" lights the right column |
| 21 | OwsSplit | 218.70–224.10 | Clark continues slowly while Lewis took 3 men ahead | Parchment route strip: main party marker crawls, "Lewis + 3 men" marker pulls ahead |
| 22 | OwsRider | 224.10–245.10 | a rider appeared… 100 paces… wheeled his horse… vanished into the willows | [18] push in ("grew as he came"), "100 PACES" on cue; image fades to dark on "vanished" |
| 23 | OwsAllHope | 245.10–254.30 | "with him went all hope of obtaining horses." Morale sank | JournalQuote, dim, slow; "Morale sank a little lower each day" small |
| 24 | OwsSigns | 254.30–289.60 | August 13th, three women… Drouillard… hand signs… hello / friends / trade… doubts | DateStamp **August 13, 1805**; NameTag "George Drouillard, hunter"; [11] hand-sign plate push; lines "hello" → "We are friends" → "we want to trade"; the two questions; "doubts" |
| 25 | OwsSentFor | 289.60–305.40 | rest of the party behind… Lewis sent for the interpreter's wife | Route strip again: messenger goes back; she comes forward to the camp |
| 26 | OwsTent | 305.40–322.50 | council tent… sat down… began to translate… stopped mid-sentence… recognized the chief | [6] slow push toward the chief; freeze + darken on "stopped"; "She had recognized the chief." |
| 27 | OwsEmbrace | 322.50–343.90 | account published in 1814… ran to him… wept… embraced her back… tent went silent… no translator needed | JournalQuote "jumped up, ran to him, threw her blanket around him and wept" (source: 1814 account) → [4] hug push from "The chief was moved"; "Nobody in it needed a translator." |
| 28 | OwsTrade | 343.90–362.10 | wary of strangers… negotiation would have failed… dozens of horses… the trade succeeded | [5] horses push; "the trade succeeded" on cue |
| 29 | OwsBrother | 362.10–377.80 | most of her family had died… two brothers alive… one sitting in front of her… sold the horses | [4] tight crop on the chief, slow; "two brothers were still alive" → "One of them was the chief." |
| 30 | OwsHerName | 377.80–381.60 | Her name… was Sacagawea | Black. "Her name" → **SACAGAWEA** in Rokkitt, rust, on the word; [16] fades in behind. Payoff of beat 04's blank |
| 31 | OwsComment | 381.60–386.90 | What do you think she felt…? Drop your answers in the comments | Comment-prompt card with the question |
| 32 | OwsEndCard | 386.90–389.53 | we'll see you again in the next story | Wordmark + signoff |

## Decisions (2026-11-04)
1. Episode title (beat 06): **The Woman With No Name**.
2. AI illustrations carry a small **ILLUSTRATION** tag; archival images don't.
3. Beats 01–06 approved by the creator. Beat 07 starts at 43.80 (not 44.20): "In 1803" begins at 43.96.
4. The table above is the FIRST draft; where it shows her face before beat 30 it is superseded by
   the creator rule at the top. The shot files' header comments describe what was actually built.
