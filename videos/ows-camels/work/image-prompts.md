# ows-camels: image list

Drop finished files in `media/projects/ows-camels/<style>/` using the file names below
(`default/`, `cutout/`, `claymation/`). Any format (jpg/png/jfif); 16:9 unless noted.

**Reveal rule:** every image before beat 26 must show **no animals at all** (no humps, no
silhouettes, no tracks). If a generation sneaks an animal in, regenerate it.

## AI images (generate one per style)

Add the style's suffix to each base prompt:

- **default:** `realistic 19th-century documentary look: aged tintype / sepia photograph or painterly oil illustration, period-accurate, no text`
- **cutout:** `flat paper cut-out collage style: layered construction paper and kraft paper with torn edges, visible paper fibre, hard drop shadows between layers, limited warm palette (parchment, rust, ochre, espresso), handmade stop-motion look, no text`
- **claymation:** `claymation stop-motion style: plasticine figures and a handmade miniature set, visible fingerprints and tool marks in the clay, rounded chunky forms, soft warm studio lighting, shallow depth of field, warm palette (rust, ochre, cream, espresso), no text`

| File | Beat | Base prompt |
|---|---|---|
| `A-fort` | 01 | A remote U.S. Army frontier fort in Texas at dusk, 1855: low adobe and timber buildings, a flagpole, a few soldiers in the yard, wide empty plains and a red sunset sky. No animals visible. |
| `J-ship` | 02 | A three-masted U.S. Navy sailing supply ship on the open ocean in 1855, seen from the side, heavy cargo lashed on deck under large canvas tarps with tall hidden shapes beneath them. Rolling waves, overcast light. No animals visible. |
| `B-skull` | 05 | A bleached horse skull and scattered bones on cracked desert ground in the American Southwest, harsh midday sun, heat haze, distant mesas. No living animals. |
| `D-dawn` | 12 | An 1857 U.S. Army survey expedition setting out at dawn in the Texas brush country: covered wagons, mounted officers, soldiers on foot, and three handlers in Middle Eastern dress walking ahead, viewed from behind. Long shadows. No animals visible besides the officers' horses. |
| `E-jornada` | 13 | A vast bleached desert basin with no water, cracked salt flats, scattered dry brush, distant bare mountains, white-hot sky. Desolate and empty. No animals, no people. |
| `F-crowd` | 16 | An 1857 dusty Los Angeles street lined with adobe buildings, a crowd of townsfolk (Californios, settlers, children) crowded along both sides staring in amazement at something just out of frame toward the camera. No animals visible. |
| `H-caravan` | 26 | **REVEAL:** an 1857 U.S. Army camel caravan crossing the Arizona desert: a long line of camels loaded with supply packs, led by handlers in Middle Eastern dress and soldiers in blue uniforms, mesas behind, golden light. |
| `I-wildcamel` | 27 | A lone wild camel standing among saguaro cacti in the Arizona Sonoran Desert at sunset, present day, vast empty landscape. (Default style: a modern color photograph look instead of the 19th-century suffix.) |

## Real archival images (one copy, used by all three styles)

Put these in `media/projects/ows-camels/real/`.

| File | Beat | What to find |
|---|---|---|
| `beale` | 08 | Portrait of Edward Fitzgerald Beale (public domain; Wikimedia Commons has several). |
| `heap` (optional) | 26 | One of the camel engravings from the 1857 *Report of the Secretary of War… Purchase of Camels* (Gwinn Harris Heap's illustrations, public domain). Used as a second image at the reveal if you like it. |

Should I fetch the two public-domain archival images from Wikimedia Commons myself? Say so and I'll
download them and check the licenses.
