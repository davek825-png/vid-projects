// ows-hickok: the 45 visual beats (documentary style). Written once; tools/gen_shots.py wraps each in
// a HkX shot from _spans.ts. Cue times are master seconds from work/edited-transcript.json.
// Rules: narration wins; only genuine quotes are legible (the two letters, McCall's "Take that!");
// AI images carry ILLUSTRATION; the 1888-90 Grabill views are NOT used (wrong era); the fifth card
// is never shown as a specific card (historians disagree), the AI poker image's jack is covered by "?".
// No shaky effects (creator rule): drama comes from timing, pushes, dims and held frames.
import React from 'react';
import { AbsoluteFill, Img, OffthreadVideo, Sequence, staticFile, useCurrentFrame } from 'remotion';
import { BRAND, COLORS, EASINGS } from '../../brand';
import { FONT_DISPLAY, FONT_BODY, FONT_MONO } from '../../fonts';
import {
  NightBg, ParchmentBg, Grain, Dip, KenBurns, Print, IllustrationTag, DateStamp, NameTag, InkNameTag, Scrim, Caption,
  SunsetRule, DocCard, QuoteLine, DimTo, FadeIn, LedgerRow, Stamp, Envelope, Vignette, cueAt, ramp, riseAt, showBetween,
} from '../../lib/frontier';
import { PlacePin, RouteLine, MapBadge, Compass, type Pt } from '../../lib/inkmap';
import { PlayingCard, type Suit } from '../../lib/cards';
import { SPANS } from './_spans';
import { remap } from './_timemap';

const w = (n: string) => staticFile(`projects/ows-hickok/web/${n}.jpg`);
export const IMG = {
  rockwood: w('03-hickok-1873-rockwood'), trio: w('05-hickok-texas-jack-buffalo-bill-1873'), tintype: w('04-hickok-tintype-c1876-npg'),
  seated: w('01-hickok-c1868-70'), note: w('05-deadwood-bank-note-1875'),
  street1: w('dw01-deadwood-in-1876-morrow-nara-533172-preview'), city: w('loc-morrow-1876-city-of-deadwood-from-south-fullres-crop'),
  streetA: w('dw06-deadwood-1876a-geoepoche'), streetB: w('dw07-deadwood-1876b-geoepoche'),
  saloon: w('ai-empty-chair-saloon-gemini-sepia'), angry: w('angry-cowboy'), behind: w('gemini-generated-image-1'),
  desk: w('parchment-and-dip-pen-scene'), letter2: w('vintage-hickok-letter'),
};
const CLIP = staticFile('projects/ows-hickok/web/handwriting.mp4');
// Cue literals below are TAKE-1 master seconds (the first recording). TAKE 2 (re-recorded 2026-11-09)
// is reached through remap(): per-beat word-alignment anchors in _timemap.ts. New cues may be written
// in take-1 time too, or as take-2 times with atNew().
const at = (b: keyof typeof SPANS) => {
  const c0 = cueAt(SPANS[b][0]);
  return (s: number) => c0(remap(b, s));
};

// ---- shared pieces ---------------------------------------------------------------------------

/** Full-bleed image with a slow zoom about (ox, oy)% and overlays in the SAME coordinates (% of frame). */
const Focus: React.FC<{ src: string; s0?: number; s1?: number; ox?: number; oy?: number; illustration?: boolean; dim?: number; children?: React.ReactNode; scrim?: boolean; a?: number; b?: number }> = ({ src, s0 = 1.03, s1 = 1.12, ox = 50, oy = 50, illustration, dim = 0, children, scrim = true, a = 0, b = 400 }) => {
  const frame = useCurrentFrame();
  const s = ramp(frame, a, b, s0, s1, EASINGS.easeInOut);
  return (
    <AbsoluteFill style={{ overflow: 'hidden', backgroundColor: COLORS.d900 }}>
      <AbsoluteFill style={{ transform: `scale(${s})`, transformOrigin: `${ox}% ${oy}%` }}>
        <Img src={src} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        {children}
      </AbsoluteFill>
      {dim > 0 && <AbsoluteFill style={{ backgroundColor: COLORS.d900, opacity: dim }} />}
      <Vignette />
      {scrim && <Scrim height={440} />}
      {illustration && <IllustrationTag />}
    </AbsoluteFill>
  );
};

/** Bottom caption stack (left aligned). */
const Bottom: React.FC<{ children: React.ReactNode; center?: boolean }> = ({ children, center }) => (
  <div style={{ position: 'absolute', left: center ? 0 : 96, right: center ? 0 : undefined, bottom: 100, display: 'flex', flexDirection: 'column', gap: 10, alignItems: center ? 'center' : 'flex-start', textAlign: center ? 'center' : 'left' }}>{children}</div>
);

/** Title-ish line on a night card. */
const Line: React.FC<{ t: React.ReactNode; at: number; size?: number; color?: string; italic?: boolean; mono?: boolean; outAt?: number }> = ({ t, at: a, size = 64, color = COLORS.cream, italic, mono, outAt }) => {
  const frame = useCurrentFrame();
  return (
    <div style={{ opacity: showBetween(frame, a, outAt), transform: riseAt(frame, a, 14, 18).transform, fontFamily: mono ? FONT_MONO : italic ? FONT_BODY : FONT_DISPLAY, fontStyle: italic ? 'italic' : 'normal', fontWeight: mono ? 700 : italic ? 500 : 800, letterSpacing: mono ? 5 : 0, fontSize: size, color, lineHeight: 1.18, textAlign: 'center', textShadow: '0 4px 30px rgba(0,0,0,0.6)' }}>{t}</div>
  );
};
const Center: React.FC<{ children: React.ReactNode; gap?: number }> = ({ children, gap = 26 }) => (
  <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap, padding: '0 140px' }}>{children}</AbsoluteFill>
);

/** "?" disc (the unknown fifth card). */
const Q: React.FC<{ at: number; size?: number; style?: React.CSSProperties }> = ({ at: a, size = 84, style }) => {
  const frame = useCurrentFrame();
  return (
    <div style={{ width: size, height: size, borderRadius: '50%', background: COLORS.warn, border: `${Math.round(size / 14)}px solid ${COLORS.ink}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: FONT_DISPLAY, fontWeight: 900, fontSize: size * 0.62, color: COLORS.ink, opacity: ramp(frame, a, a + 8), transform: `scale(${ramp(frame, a, a + 12, 0.4, 1, EASINGS.overshoot)})`, boxShadow: '0 8px 22px rgba(0,0,0,0.5)', ...style }}>?</div>
  );
};

/** Wooden poker table seen from above + the dead man's hand row. deal: frame the five cards slide in.
 * flips: frames for A♠, A♣, 8♠, 8♣ turning face-up (the fifth card stays face-down). */
const HAND: [string, Suit][] = [['A', 'S'], ['A', 'C'], ['8', 'S'], ['8', 'C']];
const CardRow: React.FC<{ deal: number; flips: number[]; y?: number; w?: number; fifthQ?: number }> = ({ deal, flips, y = 430, w = 190, fifthQ }) => {
  const gap = w + 28;
  const x0 = 960 - (gap * 5 - 28) / 2;
  return (
    <>
      {[0, 1, 2, 3, 4].map((i) => (
        <div key={i} style={{ position: 'absolute', left: x0 + i * gap, top: y }}>
          <PlayingCard w={w} dealAt={deal + i * 4} flipAt={i < 4 ? flips[i] : undefined} rank={i < 4 ? HAND[i][0] : 'A'} suit={i < 4 ? HAND[i][1] : 'S'} rotate={(i - 2) * 1.2} from={[0, 420]} />
          {i === 4 && fifthQ !== undefined && <div style={{ position: 'absolute', left: w / 2 - 50, top: w * 0.7 - 50 }}><Q at={fifthQ} size={100} /></div>}
        </div>
      ))}
    </>
  );
};
const Felt: React.FC = () => (
  <AbsoluteFill>
    <AbsoluteFill style={{ backgroundColor: COLORS.d900 }} />
    <div style={{ position: 'absolute', left: -260, right: -260, top: 120, height: 1100, borderRadius: '50%', background: `radial-gradient(ellipse at 50% 35%, #6B4A33, ${COLORS.d600} 70%)`, boxShadow: 'inset 0 0 0 26px #3A1A0E, inset 0 0 120px rgba(0,0,0,0.6)' }} />
  </AbsoluteFill>
);

// ---- beats ------------------------------------------------------------------------------------

// 01 · standard intro: "Welcome to Old West Stories. Ride with us through tales of the Old West, one good story at a time."
export const Intro: React.FC = () => {
  const c = at('Intro');
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill>
      <NightBg glow={COLORS.accent2} glowY={108} />
      <Center gap={0}>
        <div style={{ ...riseAt(frame, c(0.26) + 2, 26, 26), fontFamily: FONT_DISPLAY, fontWeight: 800, fontSize: 150, color: COLORS.cream, textShadow: '0 6px 40px rgba(0,0,0,0.6)' }}>
          {BRAND.wordmark[0]}<span style={{ color: COLORS.warn }}>{BRAND.wordmark[1]}</span>{BRAND.wordmark[2]}
        </div>
        <div style={{ marginTop: 26 }}><SunsetRule at={c(0.26) + 18} width={560} /></div>
        <div style={{ ...riseAt(frame, c(3.59), 14, 18), fontFamily: FONT_BODY, fontStyle: 'italic', fontSize: 46, color: COLORS.d300, marginTop: 38 }}>Tales of the Old West</div>
        <div style={{ ...riseAt(frame, c(5.40), 10, 18), fontFamily: FONT_MONO, fontSize: 26, letterSpacing: 6, color: COLORS.warn, marginTop: 30 }}>ONE GOOD STORY AT A TIME</div>
      </Center>
      <Grain /><Dip inFrames={0} outFrames={10} />
    </AbsoluteFill>
  );
};

// 02 · "Every poker player... knew the golden rule: keep your back to the wall, keep the door in your sights. Give up that view and you give up your edge."
export const Rule: React.FC = () => {
  const c = at('Rule');
  return (
    <AbsoluteFill>
      <NightBg glow={COLORS.accent} glowY={100} />
      <Center gap={22}>
        <Line t="THE GOLDEN RULE" at={c(10.50)} mono size={34} color={COLORS.warn} />
        <Line t="Keep your back to the wall." at={c(11.94)} size={76} />
        <Line t="Keep the door in your sights." at={c(13.92)} size={76} />
        <div style={{ height: 20 }} />
        <Line t="Give up that view, and you give up your edge." at={c(16.40)} italic size={46} color={COLORS.d300} />
      </Center>
      <Grain /><Dip inFrames={10} />
    </AbsoluteFill>
  );
};

// 03 · "On the sweltering afternoon of August 2nd, 1876, one of the most well-known men in the Dakota Territory broke that rule."
export const Aug2: React.FC = () => {
  const c = at('Aug2');
  return (
    <AbsoluteFill>
      <KenBurns src={IMG.streetA} position="center 55%" from={{ s: 1.04, x: 0, y: 0 }} to={{ s: 1.16, x: -1, y: 1 }} grade="sepia(0.35)" />
      <Scrim height={460} />
      <DateStamp text="August 2, 1876" at={c(22.15)} />
      <Bottom>
        <Caption text="Dakota Territory" at={c(26.70)} size={60} />
        <Caption text="...broke that rule." at={c(28.23)} size={54} font="body" italic color={COLORS.warn} />
      </Bottom>
      <Grain /><Dip inFrames={10} />
    </AbsoluteFill>
  );
};

// 04 · "Before that game was over, he would be unalived, and the cards he was holding would birth a legend that still haunts poker players to this day."
export const Legend: React.FC = () => {
  const c = at('Legend');
  return (
    <AbsoluteFill>
      <Felt />
      <div style={{ position: 'absolute', top: 120, left: 0, right: 0 }}><Line t="Before that game was over..." at={c(31.25)} italic size={52} color={COLORS.d300} /></div>
      <CardRow deal={c(35.78)} flips={[]} y={380} />
      <Bottom center><Caption text="a legend that still haunts poker players" at={c(37.94)} size={50} font="body" italic color={COLORS.warn} /></Bottom>
      <Grain /><Dip inFrames={8} />
    </AbsoluteFill>
  );
};

// 05 · "Pull up a chair. This is Old West Stories, and this one is gonna be good." (title card)
export const Title: React.FC = () => {
  const c = at('Title');
  return (
    <AbsoluteFill>
      <NightBg glow={COLORS.accent2} glowY={110} />
      <Center gap={24}>
        <Line t="OLD WEST STORIES" at={c(43.73)} mono size={28} color={COLORS.warn} />
        <Line t="Wild Bill's Last Hand" at={c(42.22) + 4} size={128} />
        <SunsetRule at={c(43.73) + 8} width={640} />
      </Center>
      <Grain /><Dip inFrames={10} outFrames={10} />
    </AbsoluteFill>
  );
};

// 06 · "By the time James Butler Hickok, the man the newspapers called 'Wild Bill', rode into the Black Hills, he was already a living legend."
export const Arrive: React.FC = () => {
  const c = at('Arrive');
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill>
      <ParchmentBg />
      <Print src={IMG.rockwood} width={430} height={641} at={c(50.81)} rotate={-2} caption="Wild Bill Hickok, 1873" style={{ position: 'absolute', left: 260, top: 150 }} />
      <div style={{ position: 'absolute', left: 900, top: 300, width: 900 }}>
        <InkNameTag name="James Butler Hickok" at={c(51.47)} />
        <div style={{ ...riseAt(frame, c(55.12), 12, 16), fontFamily: FONT_DISPLAY, fontWeight: 800, fontSize: 84, color: COLORS.accent, marginTop: 30 }}>"Wild Bill"</div>
        <div style={{ ...riseAt(frame, c(56.33), 10, 16), fontFamily: FONT_MONO, fontSize: 30, letterSpacing: 4, color: COLORS.muted, marginTop: 18 }}>RIDES INTO THE BLACK HILLS</div>
        <div style={{ ...riseAt(frame, c(59.23), 10, 16), fontFamily: FONT_BODY, fontStyle: 'italic', fontSize: 46, color: COLORS.ink, marginTop: 26 }}>already a living legend</div>
      </div>
      <Grain opacity={0.05} /><Dip inFrames={8} />
    </AbsoluteFill>
  );
};

// 07 · "He had scouted for the Union Army. He rode with Buffalo Bill, and he had worn a lawman's badge in bloody Kansas boomtowns."
export const Scout: React.FC = () => {
  const c = at('Scout');
  return (
    <AbsoluteFill>
      <ParchmentBg />
      <Print src={IMG.trio} width={560} height={646} at={2} rotate={-1.5} caption="Wild Bill Hickok, Texas Jack Omohundro and Buffalo Bill Cody, 1873" style={{ position: 'absolute', left: 170, top: 130 }} />
      <div style={{ position: 'absolute', left: 900, top: 330 }}>
        <LedgerRow k="SCOUT:" v="the Union Army" at={c(60.86)} vAt={c(61.65)} keyWidth={260} />
        <LedgerRow k="RODE WITH:" v="Buffalo Bill" at={c(63.04)} vAt={c(63.51)} keyWidth={260} hot />
        <LedgerRow k="LAWMAN:" v="Kansas boomtowns" at={c(66.10)} vAt={c(68.69)} keyWidth={260} />
      </div>
      <Grain opacity={0.05} /><Dip inFrames={6} />
    </AbsoluteFill>
  );
};

// 08 · "But the summer of 1876, the years were starting to catch up to him. His eyesight was failing and the frontier was being tamed."
export const Aging: React.FC = () => {
  const c = at('Aging');
  return (
    <AbsoluteFill>
      <ParchmentBg />
      <Print src={IMG.tintype} width={470} height={622} at={2} rotate={-1.5} caption="Tintype, about 1876 (National Portrait Gallery)" style={{ position: 'absolute', left: 260, top: 160 }} />
      <DateStamp text="Summer 1876" at={c(72.16)} onDark={false} />
      <div style={{ position: 'absolute', left: 900, top: 350 }}>
        <div style={{ marginBottom: 40 }}><Caption text="the years were catching up" at={c(74.88)} size={52} font="body" italic color={COLORS.ink} /></div>
        <LedgerRow k="EYESIGHT:" v="failing" at={c(77.81)} vAt={c(78.46)} keyWidth={280} hot />
        <LedgerRow k="FRONTIER:" v="being tamed" at={c(79.41)} vAt={c(80.22)} keyWidth={280} />
      </div>
      <Grain opacity={0.05} /><Dip inFrames={6} />
    </AbsoluteFill>
  );
};

// 09 · "He came to the Dakota Territory looking for gold, a fresh start, and a new game."
export const Gold: React.FC = () => {
  const c = at('Gold');
  return (
    <AbsoluteFill>
      <KenBurns src={IMG.street1} position="center 45%" from={{ s: 1.05, x: 0, y: 0 }} to={{ s: 1.15, x: 0, y: 1 }} grade="sepia(0.4)" />
      <Scrim height={420} />
      <DateStamp text="Deadwood, 1876" at={c(82.70)} />
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 110, display: 'flex', justifyContent: 'center', gap: 60 }}>
        <Caption text="GOLD" at={c(84.30)} size={64} color={COLORS.warn} />
        <Caption text="A FRESH START" at={c(85.44)} size={64} />
        <Caption text="A NEW GAME" at={c(87.19)} size={64} />
      </div>
      <Grain /><Dip inFrames={8} />
    </AbsoluteFill>
  );
};

// 10 · "...Wild Bill was married... His sweetheart was named Agnes Lake Hickok, and he longed... to return to her and settle down..."
export const Agnes: React.FC = () => {
  const c = at('Agnes');
  return (
    <AbsoluteFill>
      <KenBurns src={IMG.desk} illustration dim={0.45} from={{ s: 1.04, x: 0, y: 0 }} to={{ s: 1.12, x: 1, y: 0 }} />
      <Scrim height={460} />
      <div style={{ position: 'absolute', top: 160, left: 0, right: 0 }}><Line t="Wild Bill was married." at={c(91.93)} size={76} /></div>
      <NameTag name="Agnes Lake Hickok" role="his wife" at={c(96.57)} bottom={200} />
      <Bottom><Caption text="he longed to return to her and settle down" at={c(98.50)} size={46} font="body" italic color={COLORS.warn} /></Bottom>
      <Grain /><Dip inFrames={8} />
    </AbsoluteFill>
  );
};

// 11 · "Historian Bob Boze Bell recounted a letter Wild Bill sent to her from Deadwood on July 17th. Just a couple of short weeks before he met his fate."
export const Letter1Intro: React.FC = () => {
  const c = at('Letter1Intro');
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill>
      <ParchmentBg />
      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center' }}>
        <DocCard at={2} width={1200} source="As recounted by historian Bob Boze Bell" sourceAt={c(107.10)}>
          <div style={{ fontFamily: FONT_MONO, fontWeight: 700, fontSize: 30, letterSpacing: 5, color: COLORS.muted }}>A LETTER FROM DEADWOOD</div>
          <div style={{ ...riseAt(frame, c(111.20), 12, 16), fontFamily: FONT_DISPLAY, fontWeight: 800, fontSize: 110, color: COLORS.accent, marginTop: 14 }}>July 17, 1876</div>
          <div style={{ ...riseAt(frame, c(112.79), 10, 16), fontFamily: FONT_BODY, fontStyle: 'italic', fontSize: 44, color: COLORS.ink, marginTop: 10 }}>a couple of short weeks before he met his fate</div>
        </DocCard>
      </AbsoluteFill>
      <Grain opacity={0.05} /><Dip inFrames={6} />
    </AbsoluteFill>
  );
};

// 12 · the July 17 letter, read in full (genuine words, as read). Pages turn on the narration.
const PAGES: { from: number; lines: [string, number][] }[] = [
  { from: 117.44, lines: [['My own darling wife Agnes,', 117.44], ['I have but a few moments left before this letter starts on its way to you.', 120.18]] },
  { from: 126.04, lines: [['I was never as well in my life, but you would laugh to see me now.', 126.04], ['Just got in from prospecting and will go away again tomorrow, and I will write again in the morning.', 131.40]] },
  { from: 138.79, lines: [["I don't expect to hear from you, but it is all the same.", 138.79], ['I know my Agnes, and I only live to love her.', 142.15], ['Never mind, pet, we will have a home yet, and then we will be so happy.', 146.98]] },
  { from: 153.32, lines: [['I am almost sure I will do well here.', 153.32], ['The man is hurrying me to finish this letter.', 156.11], ['Goodbye, my dear wife. Love to Emma.', 158.36], ['J. B. Hickok, Wild Bill', 161.42]] },
];
export const Letter1: React.FC = () => {
  const c = at('Letter1');
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill>
      <KenBurns src={IMG.desk} illustration dim={0.6} from={{ s: 1.08, x: 0, y: 0 }} to={{ s: 1.16, x: -1, y: 0 }} />
      {PAGES.map((p, i) => {
        const nxt = PAGES[i + 1]?.from;
        return (
          <AbsoluteFill key={i} style={{ alignItems: 'center', justifyContent: 'center', opacity: showBetween(frame, c(p.from) - 6, nxt !== undefined ? c(nxt) - 14 : undefined, 10) }}>
            <div style={{ width: 1320, background: COLORS.cream, padding: '60px 84px', boxShadow: '0 26px 70px rgba(0,0,0,0.55)', border: `1px solid ${COLORS.line}`, transform: 'rotate(-0.6deg)' }}>
              {p.lines.map(([t, a], j) => (
                <div key={j} style={{ marginBottom: 18 }}>
                  <QuoteLine at={c(a)} size={i === 3 && j === 3 ? 56 : 46}>{t}</QuoteLine>
                </div>
              ))}
            </div>
          </AbsoluteFill>
        );
      })}
      <div style={{ position: 'absolute', left: 96, top: 74, fontFamily: FONT_MONO, fontSize: 24, letterSpacing: 4, color: COLORS.warn, opacity: ramp(frame, 4, 18) }}>WILD BILL TO AGNES · JULY 17, 1876</div>
      <Grain /><Dip inFrames={6} />
    </AbsoluteFill>
  );
};

// 13 · "But Hickok knew something was wrong. Something about Deadwood just didn't feel right."
export const Wrong: React.FC = () => {
  const c = at('Wrong');
  return (
    <AbsoluteFill>
      <KenBurns src={IMG.streetB} position="center 50%" dim={0.35} from={{ s: 1.1, x: 0, y: 0 }} to={{ s: 1.04, x: 0, y: 0 }} grade="sepia(0.4)" />
      <Scrim height={440} />
      <Bottom><Caption text="Something about Deadwood didn't feel right." at={c(168.04)} size={60} /></Bottom>
      <Grain /><Dip inFrames={8} />
    </AbsoluteFill>
  );
};

// 14 · "Just one day before he sat down at that fatal poker table, he wrote another letter to his wife Agnes. In it, he confessed a dark premonition. He did not believe he would leave the Black Hills alive."
export const Premonition: React.FC = () => {
  const c = at('Premonition');
  return (
    <AbsoluteFill>
      <NightBg glow={COLORS.danger} glowY={100} />
      <DateStamp text="August 1, 1876" at={c(172.29)} />
      <Envelope at={c(175.37)} width={480} rotate={-5} style={{ position: 'absolute', left: 200, top: 330 }} />
      <div style={{ position: 'absolute', left: 820, top: 340, width: 980, display: 'flex', flexDirection: 'column', gap: 26 }}>
        <Caption text="another letter to Agnes" at={c(175.68)} size={46} font="body" italic color={COLORS.d300} />
        <Caption text="A dark premonition." at={c(179.17)} size={86} color={COLORS.warn} />
        <Caption text="He did not believe he would leave the Black Hills alive." at={c(181.40)} size={44} font="body" italic />
      </div>
      <Grain /><Dip inFrames={8} />
    </AbsoluteFill>
  );
};

// 15 · the August 1 letter (HistoryNet): the AI letter image (genuine wording), then the creator's clip signing "Wild Bill".
export const Letter2: React.FC = () => {
  const c = at('Letter2');
  const frame = useCurrentFrame();
  const clipIn = c(201.2);
  return (
    <AbsoluteFill>
      <KenBurns src={IMG.letter2} illustration from={{ s: 1.0, x: 0, y: 0 }} to={{ s: 1.1, x: 1, y: 0 }} end={clipIn} />
      <FadeIn a={clipIn} dur={18}>
        <Sequence from={clipIn}><OffthreadVideo src={CLIP} muted style={{ width: '100%', height: '100%', objectFit: 'cover' }} /></Sequence>
        <IllustrationTag />
      </FadeIn>
      <div style={{ position: 'absolute', left: 96, top: 74, fontFamily: FONT_MONO, fontSize: 24, letterSpacing: 4, color: COLORS.warn, background: 'rgba(26,11,6,0.55)', padding: '8px 16px', opacity: ramp(frame, c(186.06), c(186.06) + 14) }}>WILD BILL TO AGNES · AUGUST 1, 1876 · TEXT VIA HISTORYNET</div>
      <Grain /><Dip inFrames={6} />
    </AbsoluteFill>
  );
};

// 16 · "He was right to be paranoid. Deadwood was a violent, lawless mud pit. The gold rush had drawn thousands onto the land that the U.S. government had promised to give to the Lakota tribe."
export const MudPit: React.FC = () => {
  const c = at('MudPit');
  return (
    <AbsoluteFill>
      <KenBurns src={IMG.city} position="center 40%" from={{ s: 1.04, x: 0, y: 0 }} to={{ s: 1.16, x: 0, y: 2 }} grade="sepia(0.35)" />
      <Scrim height={460} />
      <DateStamp text="Deadwood, 1876" at={c(211.97)} />
      <Bottom>
        <Caption text="A violent, lawless mud pit." at={c(212.62)} size={64} />
        <Caption text="on land the U.S. had promised to the Lakota" at={c(219.11)} size={46} font="body" italic color={COLORS.warn} />
      </Bottom>
      <Grain /><Dip inFrames={8} />
    </AbsoluteFill>
  );
};

// 17 · "This meant that the settlers and prospectors had no legal footing in the area. No courts, no sheriff. Deadwood had grown faster than its laws."
export const NoLaw: React.FC = () => {
  const c = at('NoLaw');
  return (
    <AbsoluteFill>
      <ParchmentBg />
      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center' }}>
        <DocCard at={2} width={1200}>
          <div style={{ fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 42, letterSpacing: 4, color: COLORS.ink, marginBottom: 40 }}>DEADWOOD, 1876</div>
          <LedgerRow k="LEGAL FOOTING:" v="none" at={c(224.60)} vAt={c(224.90)} keyWidth={420} />
          <LedgerRow k="COURTS:" v="none" at={c(226.83)} vAt={c(227.07)} keyWidth={420} />
          <LedgerRow k="SHERIFF:" v="none" at={c(227.81)} vAt={c(227.97)} keyWidth={420} />
          <div style={{ display: 'flex', justifyContent: 'flex-end', height: 60 }}><Stamp text="LAWLESS" at={c(230.55)} size={78} rotate={-8} style={{ marginTop: -40 }} /></div>
        </DocCard>
      </AbsoluteFill>
      <Grain opacity={0.05} /><Dip inFrames={6} />
    </AbsoluteFill>
  );
};

// 18 · "Into this chaos rode Jack McCall, a drifter, a man with a loud mouth, little sense, and a massive chip on his shoulder. McCall was a terrible card player, quick to take offense. And even quicker to brag."
export const McCall: React.FC = () => {
  const c = at('McCall');
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill>
      <NightBg glow={COLORS.danger} glowY={100} />
      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ ...riseAt(frame, c(234.44), 24, 20), width: 1100, background: COLORS.paper, padding: '50px 80px 40px', boxShadow: '0 26px 70px rgba(0,0,0,0.6)', border: `6px double ${COLORS.ink}`, textAlign: 'center' }}>
          <div style={{ fontFamily: FONT_DISPLAY, fontWeight: 900, fontSize: 120, color: COLORS.ink, lineHeight: 1 }}>JACK McCALL</div>
          <div style={{ height: 3, background: COLORS.ink, margin: '22px 0 30px' }} />
          {[['a drifter', 235.96], ['a loud mouth', 237.49], ['little sense', 239.27], ['a chip on his shoulder', 240.88], ['a terrible card player', 244.31], ['quick to take offense', 246.01], ['even quicker to brag', 247.85]].map(([t, a], i) => (
            <div key={i} style={{ ...riseAt(frame, c(a as number), 8, 12), fontFamily: FONT_MONO, fontSize: 36, color: i >= 4 ? COLORS.accent : COLORS.ink, marginBottom: 8 }}>{t as string}</div>
          ))}
        </div>
      </AbsoluteFill>
      <Grain /><Dip inFrames={8} />
    </AbsoluteFill>
  );
};

// 19 · "By 1876, the Black Hills were full-blown gold rush country. Prospectors, merchants, gamblers, and drifters poured into Deadwood."
export const Boom: React.FC = () => {
  const c = at('Boom');
  return (
    <AbsoluteFill>
      <KenBurns src={IMG.streetA} position="center 40%" from={{ s: 1.16, x: 2, y: 0 }} to={{ s: 1.05, x: 0, y: 0 }} grade="sepia(0.35)" />
      <Scrim height={420} />
      <DateStamp text="The Black Hills, 1876" at={c(251.24)} />
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 110, display: 'flex', justifyContent: 'center', gap: 46 }}>
        {[['PROSPECTORS', 256.65], ['MERCHANTS', 257.58], ['GAMBLERS', 258.38], ['DRIFTERS', 259.03]].map(([t, a]) => <Caption key={t as string} text={t as string} at={c(a as number)} size={54} color={t === 'GAMBLERS' ? COLORS.warn : COLORS.cream} />)}
      </div>
      <Grain /><Dip inFrames={8} />
    </AbsoluteFill>
  );
};

// 20 · "Its buildings quickly sprang up so fast that the pine building planks still smelled of the sawmill."
export const Planks: React.FC = () => {
  const c = at('Planks');
  return (
    <AbsoluteFill>
      <KenBurns src={IMG.streetB} position="center 45%" from={{ s: 1.04, x: 0, y: 0 }} to={{ s: 1.14, x: 1, y: 0 }} grade="sepia(0.35)" />
      <Scrim height={420} />
      <Bottom><Caption text="so new, the pine planks still smelled of the sawmill" at={c(264.87)} size={50} font="body" italic /></Bottom>
      <Grain /><Dip inFrames={8} />
    </AbsoluteFill>
  );
};

// 21 · "At night, the camp glowed with lamps and rang with fiddles and drunken shouting."
export const Night: React.FC = () => {
  const c = at('Night');
  return (
    <AbsoluteFill>
      <KenBurns src={IMG.street1} position="center 55%" from={{ s: 1.12, x: 0, y: 0 }} to={{ s: 1.18, x: 0, y: 0 }} grade="sepia(0.7) brightness(0.42) contrast(1.1)" />
      <AbsoluteFill style={{ background: 'radial-gradient(900px 500px at 50% 62%, rgba(247,189,106,0.22), transparent 70%)' }} />
      <Scrim height={420} />
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 110, display: 'flex', justifyContent: 'center', gap: 60 }}>
        {[['lamps', 270.54], ['fiddles', 271.85], ['drunken shouting', 272.53]].map(([t, a]) => <Caption key={t as string} text={t as string} at={c(a as number)} size={54} font="body" italic color={COLORS.warn} />)}
      </div>
      <Grain /><Dip inFrames={8} />
    </AbsoluteFill>
  );
};

// 22 · "On the night of August 1st, 1876, the same day he penned his final letter..., the air in Nuttall and Mann's Saloon Number 10 was thick with smells of whiskey and tobacco, while sounds of drunken laughter and coins... filled the room."
export const Saloon10: React.FC = () => {
  const c = at('Saloon10');
  return (
    <AbsoluteFill>
      <Focus src={IMG.saloon} illustration s0={1.5} s1={1.3} ox={12} oy={40} b={c(293.7)} />
      <DateStamp text="August 1, 1876 · night" at={c(276.38)} />
      <NameTag name="Nuttall & Mann's Saloon No. 10" role="Deadwood" at={c(282.89)} outAt={c(286.0)} bottom={130} />
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 110, display: 'flex', justifyContent: 'center', gap: 50 }}>
        {[['whiskey', 286.36], ['tobacco', 286.83], ['laughter', 288.71], ['coins on the tables', 289.68]].map(([t, a]) => <Caption key={t as string} text={t as string} at={c(a as number)} size={50} font="body" italic color={COLORS.warn} />)}
      </div>
      <Grain /><Dip inFrames={8} />
    </AbsoluteFill>
  );
};

// 23 · "McCall was a drifter who... had a hard time holding down a steady job. So he did odd jobs around Saloon 10... But on this night, he strolled into the 10, looking to make a quick buck."
export const OddJobs: React.FC = () => {
  const c = at('OddJobs');
  return (
    <AbsoluteFill>
      <ParchmentBg />
      <div style={{ position: 'absolute', left: 160, top: 300 }}>
        <div style={{ marginBottom: 40 }}><Caption text="Jack McCall" at={c(294.2)} size={72} color={COLORS.ink} /></div>
        <LedgerRow k="STEADY JOB:" v="none" at={c(297.83)} vAt={c(298.71)} keyWidth={320} />
        <LedgerRow k="ODD JOBS:" v="around Saloon No. 10" at={c(300.60)} vAt={c(301.74)} keyWidth={320} />
        <LedgerRow k="THIS NIGHT:" v="a quick buck" at={c(304.68)} vAt={c(308.78)} keyWidth={320} hot />
      </div>
      <Print src={IMG.note} width={700} height={319} at={c(308.08)} rotate={3} caption="A Deadwood five-dollar note, 1875" style={{ position: 'absolute', left: 1060, top: 560 }} />
      <Grain opacity={0.05} /><Dip inFrames={6} />
    </AbsoluteFill>
  );
};

// 24 · "He sat down at a poker table, the same table Bill sat, and he lost. By the end of the night, McCall's pockets were completely empty."
export const Lost: React.FC = () => {
  const c = at('Lost');
  const frame = useCurrentFrame();
  const left = Math.round(ramp(frame, c(315.6), c(320.3), 14, 0, EASINGS.easeInOut));
  return (
    <AbsoluteFill>
      <Felt />
      <div style={{ position: 'absolute', top: 140, left: 0, right: 0 }}><Line t="the same table as Wild Bill" at={c(313.24)} italic size={52} color={COLORS.d300} /></div>
      <div style={{ position: 'absolute', left: 960 - 90, top: 560, width: 180, height: 330 }}>
        {Array.from({ length: 14 }, (_, i) => (
          <div key={i} style={{ position: 'absolute', left: 0, bottom: i * 20, width: 180, height: 40, borderRadius: '50%', background: i % 2 ? COLORS.warn : '#D9A24E', border: `3px solid ${COLORS.d800}`, opacity: i < left ? 1 : 0 }} />
        ))}
      </div>
      <Bottom center>
        <Caption text="He lost." at={c(315.42)} size={66} />
        <Caption text="pockets completely empty" at={c(319.28)} size={46} font="body" italic color={COLORS.warn} />
      </Bottom>
      <Grain /><Dip inFrames={8} />
    </AbsoluteFill>
  );
};

// 25 · "Hickok had been taking the drifter's money all night, and McCall's face was flush with anger. Bill pushed a few coins back... this was breakfast money and to stay away from the tables... The table went quiet..."
export const Breakfast: React.FC = () => {
  const c = at('Breakfast');
  return (
    <AbsoluteFill>
      <Focus src={IMG.angry} illustration s0={1.04} s1={1.14} ox={60} oy={40} b={c(349.8)} />
      <DimTo a={c(341.84)} b={c(343.6)} to={0.55} />
      <div style={{ position: 'absolute', left: 96, bottom: 110, display: 'flex', flexDirection: 'column', gap: 10 }}>
        <Caption text="face flush with anger" at={c(326.63)} outAt={c(333.9)} size={54} font="body" italic color={COLORS.warn} />
        <Caption text="Breakfast money." at={c(334.76)} outAt={c(341.6)} size={74} />
        <Caption text="Stay away from the tables until you can afford to play." at={c(336.17)} outAt={c(341.6)} size={40} font="body" italic />
      </div>
      <div style={{ position: 'absolute', left: 0, right: 0, top: 440 }}><Line t="The table went quiet." at={c(342.34)} size={80} /></div>
      <Grain /><Dip inFrames={8} />
    </AbsoluteFill>
  );
};

// 26 · "Glaring at Hickok, McCall didn't take the advice. He took the breakfast money. And the insult, and the insult burned in his gut like cheap rye whiskey on a cold night."
export const Insult: React.FC = () => {
  const c = at('Insult');
  return (
    <AbsoluteFill>
      <NightBg glow={COLORS.danger} glowY={95} />
      <Center gap={20}>
        <Line t="He took the breakfast money." at={c(353.94)} size={70} />
        <Line t="And the insult." at={c(355.75)} size={90} color={COLORS.warn} />
        <div style={{ height: 16 }} />
        <Line t="It burned in his gut like cheap rye whiskey on a cold night." at={c(357.77)} italic size={44} color={COLORS.d300} />
      </Center>
      <Grain /><Dip inFrames={8} />
    </AbsoluteFill>
  );
};

// 27 · "The next afternoon, August 2nd, Hickok was itching for another game. He stepped onto the boardwalk, knocked the thick Deadwood mud from his boots, and pushed through the doors of Saloon No. 10."
export const Aug2b: React.FC = () => {
  const c = at('Aug2b');
  return (
    <AbsoluteFill>
      <KenBurns src={IMG.streetA} position="70% 60%" from={{ s: 1.2, x: 0, y: 0 }} to={{ s: 1.08, x: 0, y: 0 }} grade="sepia(0.35)" />
      <Scrim height={420} />
      <DateStamp text="August 2, 1876 · afternoon" at={c(365.20)} />
      <Bottom>
        <Caption text="the boardwalk, the mud, the saloon doors" at={c(369.37)} size={46} font="body" italic />
        <Caption text="Saloon No. 10" at={c(374.07)} size={70} color={COLORS.warn} />
      </Bottom>
      <Grain /><Dip inFrames={8} />
    </AbsoluteFill>
  );
};

// 28 · "Charles Rich... inviting him to join his poker game. But there was only one open seat, and it faced away from the door. He asked Rich to trade places... Rich said no."
const CHAIR = { x: 51, y: 55 }; const DOOR = { x: 72, y: 26 };
export const Seat: React.FC = () => {
  const c = at('Seat');
  const frame = useCurrentFrame();
  const ring = ramp(frame, c(384.38), c(384.38) + 14);
  return (
    <AbsoluteFill>
      <Focus src={IMG.saloon} illustration s0={1.02} s1={1.14} ox={CHAIR.x} oy={CHAIR.y} b={c(396.8)}>
        <div style={{ position: 'absolute', left: `${CHAIR.x}%`, top: `${CHAIR.y}%`, width: 230, height: 230, marginLeft: -115, marginTop: -115, borderRadius: '50%', border: `6px solid ${COLORS.warn}`, opacity: ring, transform: `scale(${0.8 + ring * 0.2})`, boxShadow: '0 0 30px rgba(247,189,106,0.5)' }} />
        <div style={{ position: 'absolute', left: `${DOOR.x}%`, top: `${DOOR.y}%`, transform: 'translate(-50%, -50%)', opacity: showBetween(frame, c(386.66)), fontFamily: FONT_MONO, fontWeight: 700, fontSize: 30, letterSpacing: 5, color: COLORS.ink, background: COLORS.warn, padding: '8px 18px' }}>THE DOOR</div>
      </Focus>
      <NameTag name="Charles Rich" role="a regular at the 10" at={c(376.72)} outAt={c(383.3)} bottom={130} />
      <Bottom>
        <Caption text="one open seat, facing away from the door" at={c(384.13)} outAt={c(394.3)} size={50} font="body" italic />
        <Caption text="Rich said no." at={c(394.59)} size={66} color={COLORS.warn} />
      </Bottom>
      <Grain /><Dip inFrames={8} />
    </AbsoluteFill>
  );
};

// 29 · "Every survival instinct... screamed at him, urging him not to sit with his back to the door. Hickok paused and gazed long and hard at the one empty chair. Then, the man who predicted his own death sat down."
export const Instinct: React.FC = () => {
  const c = at('Instinct');
  return (
    <AbsoluteFill>
      <Focus src={IMG.saloon} illustration s0={1.25} s1={1.75} ox={CHAIR.x} oy={CHAIR.y} b={c(418.5)} />
      <DimTo a={c(414.27)} b={c(418.52)} to={0.82} />
      <Bottom>
        <Caption text="not with his back to the door" at={c(404.72)} outAt={c(409.0)} size={54} font="body" italic color={COLORS.warn} />
        <Caption text="the one empty chair" at={c(411.94)} outAt={c(414.2)} size={54} font="body" italic />
      </Bottom>
      <div style={{ position: 'absolute', left: 0, right: 0, top: 430 }}><Line t="The man who predicted his own death sat down." at={c(415.26)} size={64} /></div>
      <Grain /><Dip inFrames={6} />
    </AbsoluteFill>
  );
};

// 30 · "Hickok settled into the game... tunnel vision slowly closed around him... A few hands later, he was dealt the last hand... Two black pairs, aces and eights. People have been calling it the dead man's hand ever since."
export const Table: React.FC = () => {
  const c = at('Table');
  const frame = useCurrentFrame();
  const tunnel = ramp(frame, c(427.89), c(434.0), 0, 1, EASINGS.easeInOut);
  return (
    <AbsoluteFill>
      <Felt />
      <CardRow deal={c(436.95)} flips={[c(441.82), c(441.82) + 6, c(443.03), c(443.03) + 6]} y={360} />
      <AbsoluteFill style={{ background: `radial-gradient(ellipse ${1400 - tunnel * 700}px ${900 - tunnel * 420}px at 50% 52%, transparent 40%, rgba(10,4,2,${0.35 + tunnel * 0.6}) 100%)` }} />
      <div style={{ position: 'absolute', top: 120, left: 0, right: 0 }}>
        <Line t="tunnel vision" at={c(427.89)} outAt={c(435.3)} italic size={50} color={COLORS.d300} />
      </div>
      <div style={{ position: 'absolute', top: 120, left: 0, right: 0 }}>
        <Line t="ACES AND EIGHTS" at={c(441.82)} mono size={40} color={COLORS.warn} />
      </div>
      <Bottom center><Caption text="The Dead Man's Hand" at={c(446.12)} size={96} /></Bottom>
      <Grain /><Dip inFrames={8} />
    </AbsoluteFill>
  );
};

// 31 · "The saloon was lively that afternoon. Miners were bellied up to the bar... Whiskey bottles clinked against rims of glasses. Tobacco smoke hung in layers under the rafters, and somebody laughed at a bad joke."
export const Lively: React.FC = () => {
  const c = at('Lively');
  return (
    <AbsoluteFill>
      <Focus src={IMG.saloon} illustration s0={1.35} s1={1.55} ox={8} oy={30} b={c(464.4)} />
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 110, display: 'flex', justifyContent: 'center', gap: 50 }}>
        {[['miners at the bar', 452.40], ['whiskey bottles clinked', 456.51], ['tobacco smoke', 458.83]].map(([t, a]) => <Caption key={t as string} text={t as string} at={c(a as number)} size={46} font="body" italic color={COLORS.warn} />)}
      </div>
      <Grain /><Dip inFrames={8} />
    </AbsoluteFill>
  );
};

// 32 · "Nobody paid much attention when Jack McCall walked through the saloon door. He spotted Hickok from behind. He crossed the wooden floor."
const FIFTH = { x: 45.6, y: 66.5 };
export const WalkIn: React.FC = () => {
  const c = at('WalkIn');
  return (
    <AbsoluteFill>
      <Focus src={IMG.saloon} illustration s0={1.6} s1={1.75} ox={DOOR.x} oy={DOOR.y + 10} b={c(469.0)} />
      <FadeIn a={c(469.0)} dur={16}>
        <Focus src={IMG.behind} illustration s0={1.02} s1={1.1} ox={40} oy={60} a={c(469.0)} b={c(474.7)}>
          <div style={{ position: 'absolute', left: `${FIFTH.x}%`, top: `${FIFTH.y}%`, transform: 'translate(-50%, -50%)' }}><Q at={c(469.0)} size={72} /></div>
        </Focus>
      </FadeIn>
      <Bottom>
        <Caption text="Jack McCall walked through the saloon door." at={c(466.36)} outAt={c(468.9)} size={52} />
        <Caption text="He spotted Hickok from behind." at={c(469.16)} size={56} />
      </Bottom>
      <Grain /><Dip inFrames={8} />
    </AbsoluteFill>
  );
};

// 33 · "He stepped right up behind the legendary gunfighter and drew his revolver. 'Take that!' McCall screamed, firing a single bullet at point-blank range into the back of Wild Bill's head."
export const Shot: React.FC = () => {
  const c = at('Shot');
  return (
    <AbsoluteFill>
      <Focus src={IMG.behind} illustration s0={1.1} s1={1.3} ox={30} oy={45} b={c(480.9)}>
        <div style={{ position: 'absolute', left: `${FIFTH.x}%`, top: `${FIFTH.y}%`, transform: 'translate(-50%, -50%)' }}><Q at={0} size={72} /></div>
      </Focus>
      <DimTo a={c(478.19)} b={c(480.9)} to={1} />
      <Center gap={24}>
        <Line t="&quot;Take that!&quot;" at={c(480.95)} size={130} color={COLORS.warn} />
        <Line t="JACK McCALL" at={c(481.63)} mono size={30} color={COLORS.d300} />
        <Line t="point-blank range" at={c(484.04)} italic size={46} color={COLORS.d300} />
      </Center>
      <Grain /><Dip inFrames={6} />
    </AbsoluteFill>
  );
};

// 34 · "Hickok instantly slumped over. The saloon erupted into absolute chaos. McCall bolted out the back door, but his horse slipped in the mud... He didn't get far before the crowd nabbed him."
export const Chaos: React.FC = () => {
  const c = at('Chaos');
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ backgroundColor: COLORS.d900 }} />
      <Center gap={20}>
        <Line t="Hickok slumped over." at={c(487.67)} outAt={c(492.3)} size={80} />
        <Line t="The saloon erupted into chaos." at={c(489.86)} outAt={c(492.3)} italic size={50} color={COLORS.warn} />
      </Center>
      <FadeIn a={c(492.5)} dur={14}>
        <KenBurns src={IMG.street1} position="center 70%" start={c(492.5)} from={{ s: 1.08, x: 0, y: 0 }} to={{ s: 1.18, x: 0, y: 1 }} grade="sepia(0.45)" />
        <Scrim height={440} />
        <Bottom>
          <Caption text="out the back door" at={c(493.15)} size={50} font="body" italic />
          <Caption text="his horse slipped in the mud" at={c(494.69)} size={50} font="body" italic />
          <Caption text="He didn't get far." at={c(497.93)} size={62} color={COLORS.warn} />
        </Bottom>
      </FadeIn>
      <Grain /><Dip inFrames={6} />
    </AbsoluteFill>
  );
};

// 35 · "Since Deadwood was on Lakota land, it had very few documented laws. It had no sheriff and no real judge. That night, an informal miner's jury gathered to hear the case."
export const NoJudge: React.FC = () => {
  const c = at('NoJudge');
  return (
    <AbsoluteFill>
      <ParchmentBg />
      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center' }}>
        <DocCard at={2} width={1200}>
          <div style={{ fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 42, letterSpacing: 4, color: COLORS.ink, marginBottom: 40 }}>JUSTICE IN DEADWOOD</div>
          <LedgerRow k="THE LAND:" v="Lakota" at={c(505.12)} vAt={c(505.28)} keyWidth={360} />
          <LedgerRow k="LAWS:" v="very few" at={c(506.84)} vAt={c(507.14)} keyWidth={360} />
          <LedgerRow k="SHERIFF:" v="none" at={c(509.33)} vAt={c(509.43)} keyWidth={360} />
          <LedgerRow k="JUDGE:" v="none" at={c(510.14)} vAt={c(510.38)} keyWidth={360} />
          <LedgerRow k="THAT NIGHT:" v="a miners' jury" at={c(511.85)} vAt={c(513.09)} keyWidth={360} hot />
        </DocCard>
      </AbsoluteFill>
      <Grain opacity={0.05} /><Dip inFrames={6} />
    </AbsoluteFill>
  );
};

// 36 · "McCall spun a desperate lie, claiming Hickok had murdered his brother back in Kansas... Incredibly, the miner's jury bought the story and turned him loose."
export const Lie: React.FC = () => {
  const c = at('Lie');
  return (
    <AbsoluteFill>
      <ParchmentBg />
      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center' }}>
        <DocCard at={2} width={1260} source="McCALL'S CLAIM · PARAPHRASED" sourceAt={c(519.03)}>
          <div style={{ fontFamily: FONT_MONO, fontWeight: 700, fontSize: 30, letterSpacing: 5, color: COLORS.muted }}>A DESPERATE LIE</div>
          <div style={{ marginTop: 22 }}><QuoteLine at={c(519.03)} size={58}>Hickok murdered my brother back in Kansas.</QuoteLine></div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', height: 90, marginTop: 20 }}><Stamp text="TURNED LOOSE" at={c(529.18)} size={74} rotate={-8} /></div>
        </DocCard>
      </AbsoluteFill>
      <Grain opacity={0.05} /><Dip inFrames={6} />
    </AbsoluteFill>
  );
};

// 37 · map: fled to Wyoming, bragging; August 29 the law caught up in Laramie; dragged back to Yankton for a real trial.
// Projection: x = 420 + (lon + 108) * 91, y = 150 + (46 - lat) * 125.
const P = { deadwood: [809, 354] as Pt, laramie: [639, 736] as Pt, yankton: [1385, 541] as Pt };
export const Wyoming: React.FC = () => {
  const c = at('Wyoming');
  const frame = useCurrentFrame();
  const lbl = (t: string, x: number, y: number) => <div style={{ position: 'absolute', left: x, top: y, transform: 'translate(-50%, -50%)', fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 30, letterSpacing: 10, color: COLORS.muted, opacity: 0.75 * ramp(frame, 4, 20), whiteSpace: 'nowrap' }}>{t}</div>;
  return (
    <AbsoluteFill>
      <ParchmentBg />
      <svg width={1920} height={1080} style={{ position: 'absolute', inset: 0, opacity: ramp(frame, 2, 18) }}>
        <polyline points="780,150 780,775 420,775" fill="none" stroke={COLORS.muted} strokeWidth={3} strokeDasharray="14 12" opacity={0.6} />
        <polyline points="780,525 1470,525" fill="none" stroke={COLORS.muted} strokeWidth={3} strokeDasharray="14 12" opacity={0.6} />
        <ellipse cx={790} cy={380} rx={70} ry={95} fill="rgba(94,115,68,0.22)" stroke={COLORS.muted} strokeWidth={2} />
      </svg>
      {lbl('DAKOTA TERRITORY', 1150, 330)}{lbl('WYOMING TERRITORY', 590, 560)}{lbl('NEBRASKA', 1150, 690)}
      <PlacePin label="DEADWOOD" sub="the Black Hills" x={P.deadwood[0]} y={P.deadwood[1]} at={4} above />
      <RouteLine pts={[P.deadwood, [760, 480], [700, 620], P.laramie]} at={c(538.01)} dur={c(538.80) - c(538.01) + 8} color={COLORS.ink} width={6} />
      <MapBadge text="bragging in every saloon" x={470} y={460} at={c(540.66)} size={30} color={COLORS.muted} />
      <DateStamp text="August 29, 1876" at={c(546.67)} onDark={false} />
      <PlacePin label="LARAMIE" sub="Wyoming" x={P.laramie[0]} y={P.laramie[1]} at={c(549.90)} hot />
      <MapBadge text="U.S. DEPUTY MARSHAL" x={400} y={905} at={c(552.22)} size={34} />
      <MapBadge text="ARRESTED" x={1000} y={905} at={c(557.90)} stamp size={60} color={COLORS.danger} rotate={-6} />
      <RouteLine pts={[P.laramie, [900, 690], [1150, 610], P.yankton]} at={c(567.79)} dur={c(570.05) - c(567.79)} color={COLORS.accent} width={8} />
      <PlacePin label="YANKTON" sub="for a real trial" x={P.yankton[0]} y={P.yankton[1]} at={c(570.05)} hot />
      <Compass at={6} />
      <Grain opacity={0.05} /><Dip inFrames={6} />
    </AbsoluteFill>
  );
};

// 38 · "This time, the jury didn't buy the lies. On March 1st, 1877, the man who sought revenge with a coward's bullet met his demise at the end of a rope on Yankton's gallows."
export const Trial: React.FC = () => {
  const c = at('Trial');
  return (
    <AbsoluteFill>
      <ParchmentBg />
      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center' }}>
        <DocCard at={2} width={1260}>
          <div style={{ fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 42, letterSpacing: 4, color: COLORS.ink, marginBottom: 40 }}>THE TRIAL · YANKTON, DAKOTA TERRITORY</div>
          <LedgerRow k="DEFENDANT:" v="Jack McCall" at={c(573.38)} vAt={c(573.56)} keyWidth={360} />
          <LedgerRow k="THE LIE:" v="not believed" at={c(575.03)} vAt={c(575.61)} keyWidth={360} />
          <LedgerRow k="HANGED:" v="March 1, 1877" at={c(578.44)} vAt={c(578.94)} keyWidth={360} hot />
          <div style={{ display: 'flex', justifyContent: 'flex-end', height: 60 }}><Stamp text="GUILTY" at={c(576.18)} size={84} rotate={-9} style={{ marginTop: -50 }} /></div>
        </DocCard>
      </AbsoluteFill>
      <Grain opacity={0.05} /><Dip inFrames={6} />
    </AbsoluteFill>
  );
};

// 39 · "News spread surprisingly quickly in those days, over breakfast tables from Cheyenne to Chicago."
// Wide projection: x = 210 + (lon + 105) * 83, y = 300 + (45 - lat) * 110.
const W2 = { deadwood: [315, 369] as Pt, cheyenne: [225, 725] as Pt, chicago: [1652, 643] as Pt };
export const News: React.FC = () => {
  const c = at('News');
  return (
    <AbsoluteFill>
      <ParchmentBg />
      <PlacePin label="DEADWOOD" x={W2.deadwood[0]} y={W2.deadwood[1]} at={4} hot above />
      <RouteLine pts={[W2.deadwood, [280, 560], W2.cheyenne]} at={c(596.2)} dur={14} color={COLORS.accent} width={6} />
      <PlacePin label="CHEYENNE" x={W2.cheyenne[0]} y={W2.cheyenne[1]} at={c(596.78)} />
      <RouteLine pts={[W2.deadwood, [700, 420], [1200, 520], W2.chicago]} at={c(596.9)} dur={20} color={COLORS.accent} width={6} />
      <PlacePin label="CHICAGO" x={W2.chicago[0]} y={W2.chicago[1]} at={c(597.57)} />
      <div style={{ position: 'absolute', top: 110, left: 0, right: 0 }}><Line t="From Cheyenne to Chicago" at={c(595.41)} size={70} color={COLORS.ink} /></div>
      <Grain opacity={0.05} /><Dip inFrames={6} />
    </AbsoluteFill>
  );
};

// 40 · "The nation read newspaper stories about the gunfighter who died at a card table." (newspapers: abstract text, no invented headlines)
export const Papers: React.FC = () => {
  const c = at('Papers');
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill>
      <NightBg glow={COLORS.accent2} glowY={100} />
      {[0, 1, 2].map((i) => (
        <div key={i} style={{ position: 'absolute', left: 520 + i * 150, top: 110 + i * 36, width: 520, height: 600, background: COLORS.cream, transform: `rotate(${(i - 1) * 4}deg) translateY(${ramp(frame, 2 + i * 5, 16 + i * 5, 60, 0)}px)`, opacity: ramp(frame, 2 + i * 5, 14 + i * 5), boxShadow: '0 20px 50px rgba(0,0,0,0.55)', padding: 34, boxSizing: 'border-box' }}>
          <div style={{ height: 34, background: COLORS.ink, opacity: 0.75, marginBottom: 14 }} />
          <div style={{ height: 3, background: COLORS.ink, marginBottom: 20 }} />
          {Array.from({ length: 18 }, (_, k) => <div key={k} style={{ height: 9, width: `${66 + ((k * 37 + i * 11) % 30)}%`, borderRadius: 4, background: COLORS.ink, opacity: 0.2, marginBottom: 16 }} />)}
        </div>
      ))}
      <Bottom center><Caption text="the gunfighter who died at a card table" at={c(600.68)} size={56} font="body" italic /></Bottom>
      <Grain /><Dip inFrames={6} />
    </AbsoluteFill>
  );
};

// 41 · "Although the newspaper stories and dime store novels are long gone, the story lives on through the poker cards... when Hickok was shot, his lifeless fingers were clutching a very specific hand: two black aces. Two black eights. It is known as the dead man's hand."
export const LivesOn: React.FC = () => {
  const c = at('LivesOn');
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill>
      <Felt />
      <div style={{ opacity: 1 - ramp(frame, c(616.3), c(617.4)) }}>
        <Print src={IMG.seated} width={420} height={695} at={4} rotate={-1.5} caption="Wild Bill Hickok, about 1868-70" style={{ position: 'absolute', left: 300, top: 150 }} />
        <div style={{ position: 'absolute', left: 860, top: 420, width: 900 }}>
          <Caption text="the story lives on" at={c(609.74)} size={76} />
        </div>
      </div>
      <CardRow deal={c(617.61)} flips={[c(624.16), c(624.16) + 6, c(625.70), c(625.70) + 6]} y={360} />
      <Bottom center><Caption text="The Dead Man's Hand" at={c(628.36)} size={96} /></Bottom>
      <Grain /><Dip inFrames={8} />
    </AbsoluteFill>
  );
};

// 42 · "But here's the mystery: historians cannot agree on what Hickok's fifth card was. Some say... nine of diamonds, others... queen of hearts, others... jack of diamonds. I suppose we'll never know for sure. What do you think the fifth card was? Drop your theory in the comments below."
export const Fifth: React.FC = () => {
  const c = at('Fifth');
  const cand: [string, Suit, number][] = [['9', 'D', 637.49], ['Q', 'H', 639.44], ['J', 'D', 641.92]];
  return (
    <AbsoluteFill>
      <Felt />
      <CardRow deal={-40} flips={[-30, -30, -30, -30]} y={470} w={170} fifthQ={c(635.18)} />
      <div style={{ position: 'absolute', top: 90, left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: 70 }}>
        {cand.map(([r, s, a]) => <PlayingCard key={r} rank={r} suit={s} w={130} dealAt={c(a)} flipAt={c(a)} from={[0, -200]} />)}
      </div>
      <div style={{ position: 'absolute', top: 30, left: 0, right: 0 }}><Line t="THE FIFTH CARD?" at={c(631.49)} mono size={34} color={COLORS.warn} outAt={c(637.2)} /></div>
      <Bottom center>
        <Caption text="We'll never know for sure." at={c(644.23)} outAt={c(646.6)} size={56} font="body" italic />
        <Caption text="What do you think the fifth card was?" at={c(646.88)} size={62} />
        <Caption text="DROP YOUR THEORY IN THE COMMENTS" at={c(648.83)} size={34} color={COLORS.warn} />
      </Bottom>
      <Grain /><Dip inFrames={6} />
    </AbsoluteFill>
  );
};

// 43 · "If you visit Deadwood today, you'll find that poker rooms are still alive and running strong. ...gamblers... feel their blood run cold... when they are dealt pairs of aces and eights."
export const Today: React.FC = () => {
  const c = at('Today');
  return (
    <AbsoluteFill>
      <Felt />
      <div style={{ position: 'absolute', top: 120, left: 0, right: 0, display: 'flex', flexDirection: 'column', gap: 16 }}>
        <Line t="Deadwood, today" at={c(653.30)} size={90} />
        <Line t="the poker rooms are still running" at={c(655.15)} italic size={46} color={COLORS.d300} />
      </div>
      <CardRow deal={c(669.0)} flips={[c(670.91), c(670.91) + 4, c(671.56), c(671.56) + 4]} y={470} w={170} />
      <Bottom center><Caption text="a chill up the spine" at={c(667.31)} size={52} font="body" italic color={COLORS.warn} /></Bottom>
      <Grain /><Dip inFrames={8} />
    </AbsoluteFill>
  );
};

// 44 · "The lesson from Deadwood is simple: a high-stakes game is never just about the cards. Money, pride, and grudges usually sit at the same table, and holding a grudge rarely ends well for anybody."
export const Lesson: React.FC = () => {
  const c = at('Lesson');
  const frame = useCurrentFrame();
  const chip = (t: string, a: number, col: string) => (
    <div style={{ ...riseAt(frame, c(a), 16, 16), width: 260, height: 260, borderRadius: '50%', background: col, border: `14px dashed ${COLORS.cream}`, boxSizing: 'border-box', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: FONT_DISPLAY, fontWeight: 900, fontSize: 40, letterSpacing: 2, color: COLORS.cream, boxShadow: '0 14px 30px rgba(0,0,0,0.5)' }}>{t}</div>
  );
  return (
    <AbsoluteFill>
      <Felt />
      <div style={{ position: 'absolute', top: 100, left: 0, right: 0, display: 'flex', flexDirection: 'column', gap: 14 }}>
        <Line t="THE LESSON FROM DEADWOOD" at={c(674.29)} mono size={34} color={COLORS.warn} />
        <Line t="It's never just about the cards." at={c(676.13)} size={70} />
      </div>
      <div style={{ position: 'absolute', top: 430, left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: 80 }}>
        {chip('MONEY', 679.55, COLORS.signal)}{chip('PRIDE', 680.60, COLORS.accent)}{chip('GRUDGES', 681.71, COLORS.danger)}
      </div>
      <Bottom center><Caption text="Holding a grudge rarely ends well." at={c(685.10)} size={52} font="body" italic /></Bottom>
      <Grain /><Dip inFrames={8} />
    </AbsoluteFill>
  );
};

// 45 · "So if you ever find yourself in an Old West saloon, keep your back to the wall, avoid the dead man's hand, and keep your powder dry."
export const End: React.FC = () => {
  const c = at('End');
  return (
    <AbsoluteFill>
      <NightBg glow={COLORS.accent2} glowY={108} />
      <Center gap={24}>
        <Line t="Keep your back to the wall." at={c(693.78)} size={72} />
        <Line t="Avoid the dead man's hand." at={c(695.61)} size={72} />
        <Line t="Keep your powder dry." at={c(697.72)} size={72} color={COLORS.warn} />
      </Center>
      <Grain /><Dip inFrames={8} />
    </AbsoluteFill>
  );
};

// 46 · (take 2) "Don't forget to like and share this video. Be sure to subscribe, and we'll see you at the next story."
// Cues are TAKE-2 master seconds (this line has no take-1 counterpart), so this beat uses cueAt directly.
export const Outro: React.FC = () => {
  const c = cueAt(SPANS.Outro[0]);
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill>
      <NightBg glow={COLORS.accent2} glowY={108} />
      <Center gap={0}>
        <div style={{ display: 'flex', gap: 46 }}>
          {[['LIKE', 620.10], ['SHARE', 620.42], ['SUBSCRIBE', 622.18]].map(([t, a]) => (
            <div key={t as string} style={{ ...riseAt(frame, c(a as number), 10, 14), fontFamily: FONT_MONO, fontWeight: 700, fontSize: 34, letterSpacing: 8, color: COLORS.warn }}>{t as string}</div>
          ))}
        </div>
        <div style={{ ...riseAt(frame, c(622.18) + 4, 20, 20), fontFamily: FONT_DISPLAY, fontWeight: 800, fontSize: 130, color: COLORS.cream, marginTop: 30 }}>
          {BRAND.wordmark[0]}<span style={{ color: COLORS.warn }}>{BRAND.wordmark[1]}</span>{BRAND.wordmark[2]}
        </div>
        <div style={{ marginTop: 24 }}><SunsetRule at={c(622.18) + 14} width={520} /></div>
        <div style={{ ...riseAt(frame, c(623.08), 12, 16), fontFamily: FONT_BODY, fontStyle: 'italic', fontSize: 46, color: COLORS.d300, marginTop: 34 }}>We'll see you at the next story.</div>
      </Center>
      <Grain /><Dip inFrames={8} outFrames={12} />
    </AbsoluteFill>
  );
};
