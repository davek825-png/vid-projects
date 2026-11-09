// ows-camels: the 28 visual beats, written ONCE against lib/tristyle.tsx. Each style's shot files
// (ows-camels/Cm*, ows-camels-cutout/Cut*, ows-camels-clay/Clay*) wrap one of these in a
// StyleProvider. Cue times are master seconds from work/edited-transcript.json.
//
// REVEAL RULE: "camels" is said at 183.93. Before beat Reveal, no camel, hump, silhouette or the
// word appears; the animals are hidden ("?" markers, counts, canvas, off-frame crowds).
// Accuracy: newspaper text is abstract; "3 handlers" as said, unnamed; Camp Verde pinned, no return
// route; no ocean named (Pacific was cut from the narration).
import React from 'react';
import { AbsoluteFill, staticFile, useCurrentFrame } from 'remotion';
import { BRAND, COLORS } from '../../brand';
import { FONT_DISPLAY, FONT_MONO } from '../../fonts';
import { cueAt } from '../../lib/frontier';
import { Compass } from '../../lib/inkmap';
import {
  Stage, Picture, Photo, Label, Hero, StampT, DateTag, Rule, Card, Row, Strike, Mat, Ridge, Pin, Route,
  Mystery, Center, Bottom, Slot, Pop, useTri, useProg, smooth, clay } from '../../lib/tristyle';
import { SPANS } from './_spans';
import { Handler, EnvelopeArt, BookArt, PaperArt, HorseArt, TarpArt, SkullArt, DropArt, EyeArt, NoteArt } from './_props';

const web = (n: string) => staticFile(`projects/ows-camels/web/${n}.jpg`);
const real = (n: string) => staticFile(`projects/ows-camels/real/${n}.jpg`);
export const IMG = {
  fort: web('A-fort'), ship: web('J-ship'), skull: web('B-skull'), dawn: web('D-dawn'), jornada: web('E-jornada'),
  crowd: web('F-crowd'), caravan: web('H-caravan'), wild: web('I-wildcamel'), beale: real('beale'), heap: real('heap'),
};
const at = (b: keyof typeof SPANS) => cueAt(SPANS[b][0]);

// 01 · "summer of 1855… a decision made by the US Army that nobody at the fort could quite explain"
export const Fort: React.FC = () => {
  const c = at('Fort');
  return (
    <Stage scene="night" dipIn={14}>
      <Picture src={IMG.fort} illustration from={{ s: 1.03, x: 0, y: 0 }} to={{ s: 1.14, x: -1, y: 1 }} />
      <DateTag text="Summer 1855" at={c(1.06)} />
      <Bottom>
        <Label at={c(3.22)} size={52} font="mono" seed={3}>A DECISION BY THE U.S. ARMY</Label>
        <Label at={c(5.96)} size={58} seed={4}>nobody at the fort could quite explain</Label>
      </Bottom>
    </Stage>
  );
};

// 02 · "sent men clear across the ocean. They came back to Texas with 33 animals"
export const Ship: React.FC = () => {
  const c = at('Ship');
  return (
    <Stage scene="night" dipIn={0}>
      <Picture src={IMG.ship} illustration from={{ s: 1.05, x: 1, y: 0 }} to={{ s: 1.12, x: -2, y: 0 }} />
      <div style={{ position: 'absolute', right: 120, top: 110, display: 'flex', alignItems: 'center', gap: 24 }}>
        <StampT text="33 ANIMALS" at={c(13.25)} color={COLORS.danger} rotate={-8} size={70} seed={12} />
      </div>
      <Mystery x={1700} y={250} at={c(13.88)} size={84} />
      <Bottom>
        <Slot height={96}>
          <Label at={c(10.03)} outAt={c(12.29)} size={58} seed={5}>clear across the ocean</Label>
          <Label at={c(12.29)} size={52} font="mono" seed={6}>BACK TO TEXAS</Label>
        </Slot>
      </Bottom>
    </Stage>
  );
};

// 03 · "and 3 handlers who were the only ones who knew how to manage these animals"
export const Handlers: React.FC = () => {
  const c = at('Handlers');
  const cols = [COLORS.accent, COLORS.muted, COLORS.accent2];
  return (
    <Stage scene="night" dipIn={8}>
      <div style={{ position: 'absolute', left: 0, right: 0, top: 150, display: 'flex', justifyContent: 'center', gap: 70 }}>
        {cols.map((col, i) => (
          <Mat key={i} at={c(15.34) + i * 4} seed={80 + i}><Handler color={col} h={400} /></Mat>
        ))}
      </div>
      <Bottom gap={18}>
        <Hero at={c(15.64)} size={96} seed={9}>3 handlers</Hero>
        <Label at={c(16.52)} size={50} seed={10}>the only ones who knew how to manage these animals</Label>
      </Bottom>
    </Stage>
  );
};

// 04 · "Why would they do such a thing?"
export const Why: React.FC = () => {
  const c = at('Why');
  return (
    <Stage scene="night" dipIn={6}>
      <Center gap={30}>
        <Hero at={c(20.22)} size={210} seed={14}>Why?</Hero>
        <Label at={c(20.7)} size={54} seed={15}>would they do such a thing</Label>
      </Center>
    </Stage>
  );
};

// 05 · "out west, the Army had a big problem… haul supplies across harsh country… chew up horses and spit out the bones"
export const Problem: React.FC = () => {
  const c = at('Problem');
  return (
    <Stage scene="night" dipIn={8}>
      <Picture src={IMG.skull} illustration from={{ s: 1.12, x: 2, y: 2 }} to={{ s: 1.03, x: 0, y: 0 }} />
      <DateTag text="Out West" at={c(23.17)} />
      <Bottom>
        <Slot height={100}>
          <Label at={c(24.47)} outAt={c(26.3)} size={64} font="display" seed={16}>A big problem.</Label>
          <Label at={c(26.54)} outAt={c(29.1)} size={56} seed={17}>haul supplies across harsh country</Label>
          <div style={{ display: 'flex', gap: 30 }}>
            <Label at={c(29.26)} size={56} seed={18}>chew up horses</Label>
            <Label at={c(30.39)} size={56} seed={19}>spit out the bones</Label>
          </div>
        </Slot>
      </Bottom>
    </Stage>
  );
};

// 06 · "Horses were valuable… wasn't willing to bet a whole supply train… So they got creative."
export const Horses: React.FC = () => {
  const c = at('Horses');
  return (
    <Stage scene="parchment" dipIn={8}>
      <Center top={120} gap={40}>
        <Card at={c(31.95)} width={1360}>
          <Row k="HORSES" v="valuable" at={c(32.31)} vAt={c(32.89)} seed={31} />
          <Row k="THE BET" v="a whole supply train" at={c(35.13)} vAt={c(35.71)} seed={33} />
          <Row k="THE JOURNEY" v="survive it?" at={c(37.68)} vAt={c(38.34)} hot seed={35} />
        </Card>
        <Label at={c(39.78)} size={64} font="display" seed={37}>So they got creative.</Label>
      </Center>
      <StampT text="NO BET" at={c(38.73)} rotate={-12} size={84} style={{ position: 'absolute', left: 1240, top: 330 }} />
    </Stage>
  );
};

// 07 · "Pull up a chair. This is Old West Stories, and this one is gonna be good."
// TITLE: confirmed by the creator 2026-11-07. Must not mention camels.
export const TITLE = ["The Army's", 'Strangest Recruits'];
export const Title: React.FC = () => {
  const c = at('Title');
  return (
    <Stage scene="night" dipIn={10} dipOut={10}>
      <Center gap={26}>
        <Label at={c(42.98)} size={30} font="mono" ink={COLORS.warn} color={COLORS.d800} seed={20}>OLD WEST STORIES</Label>
        <Hero at={c(41.85)} size={118} seed={21}>{TITLE[0]}<br />{TITLE[1]}</Hero>
        <Rule at={c(43.49)} width={620} />
      </Center>
    </Stage>
  );
};

// 08 · "In 1857, Edward Beale got his orders."
export const Beale: React.FC = () => {
  const c = at('Beale');
  return (
    <Stage scene="night" dipIn={10}>
      <DateTag text="1857" at={c(48.0)} />
      <Photo src={IMG.beale} w={400} h={558} at={c(47.5)} rotate={-2} style={{ position: 'absolute', left: 300, top: 230 }} />
      <div style={{ position: 'absolute', left: 860, top: 400, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 26 }}>
        <Hero at={c(49.63)} size={104} seed={22}>Edward Beale</Hero>
        <Label at={c(50.91)} size={56} seed={23}>got his orders</Label>
      </div>
    </Stage>
  );
};

// 09 · "survey a wagon road west from what is now northeastern Arizona all the way to Southern California"
const ROAD = [[1420, 430], [1270, 450], [1110, 455], [950, 470], [790, 480], [640, 525], [490, 590], [350, 640]] as [number, number][];
export const Road: React.FC = () => {
  const c = at('Road');
  const s = useTri();
  return (
    <Stage scene="parchment" dipIn={8}>
      <Ridge x0={980} x1={1240} y={600} at={c(51.9)} seed={4} />
      <Ridge x0={560} x1={760} y={420} at={c(52.1)} seed={7} />
      <Center top={70}><Label at={c(52.77)} size={44} font="mono" seed={24}>SURVEY A WAGON ROAD</Label></Center>
      <Pin x={1420} y={430} label="NORTHEASTERN ARIZONA" sub="as it is now" at={c(54.94)} above hot seed={61} />
      <Route pts={ROAD} at={c(55.81)} dur={Math.round((57.75 - 55.81) * 30)} />
      <Pin x={350} y={640} label="SOUTHERN CALIFORNIA" at={c(57.27)} seed={63} />
      <Center top={850}><Label at={c(53.5)} size={34} font="mono" seed={25} ink={COLORS.muted}>← WEST</Label></Center>
      {smooth(s) && <Compass at={c(52)} />}
    </Stage>
  );
};

// 10 · "Along with that assignment came an instruction that raised a few eyebrows on the frontier."
export const Orders: React.FC = () => {
  const c = at('Orders');
  return (
    <Stage scene="night" dipIn={8}>
      <Center top={150}>
        <div style={{ position: 'relative' }}>
          <Mat at={c(59.5)} seed={26}><div style={{ transform: 'rotate(-3deg)' }}><EnvelopeArt w={680} /></div></Mat>
          <StampT text="ORDERS" at={c(60.08)} rotate={-14} size={74} style={{ position: 'absolute', left: 60, top: 40 }} />
        </div>
      </Center>
      <Bottom>
        <Label at={c(60.8)} size={54} seed={27}>an instruction that raised a few eyebrows</Label>
      </Bottom>
    </Stage>
  );
};

// 11 · "handed Beale 25 unusual animals… haul road-building supplies across harsh countries that horses, mules, and oxen previously didn't survive"
export const TwentyFive: React.FC = () => {
  const c = at('TwentyFive');
  const word = (t: string, a: number, seed: number) => (
    <Pop at={a} seed={seed} from="left" dist={40}>
      <div style={{ position: 'relative', fontFamily: FONT_MONO, fontSize: 54, color: COLORS.ink }}>{t}<Strike at={c(75.0) + (seed % 3) * 3} /></div>
    </Pop>
  );
  return (
    <Stage scene="parchment" dipIn={8}>
      <Center top={130}>
        <Card at={c(64.31)} width={1420}>
          <Row k="HANDED TO BEALE" v={<span>25 unusual animals</span>} at={c(64.73)} vAt={c(65.29)} hot keyWidth={470} seed={41} />
          <Row k="THE JOB" v="haul road-building supplies" at={c(69.2)} vAt={c(69.53)} keyWidth={470} seed={43} />
          <Row k="ACROSS" v="harsh country" at={c(70.6)} vAt={c(70.99)} keyWidth={470} seed={45} />
          <div style={{ display: 'flex', gap: 30, alignItems: 'baseline', marginBottom: 30 }}>
            <Pop at={c(72.0)} seed={47} from="left" dist={40} style={{ width: 470, flexShrink: 0 }}>
              <div style={{ fontFamily: FONT_MONO, fontWeight: 700, fontSize: 39, letterSpacing: 3, color: COLORS.muted }}>DIDN'T SURVIVE</div>
            </Pop>
            <div style={{ display: 'flex', gap: 46 }}>
              {word('horses', c(72.51), 48)}{word('mules', c(73.23), 49)}{word('oxen', c(73.78), 50)}
            </div>
          </div>
        </Card>
      </Center>
      <Mystery x={1640} y={222} at={c(66.24)} size={78} />
    </Stage>
  );
};

// 12 · "not sure what to expect from these critters… didn't know much about caring for them… good thing those 3 handlers came along"
export const Critters: React.FC = () => {
  const c = at('Critters');
  return (
    <Stage scene="night" dipIn={8}>
      <Picture src={IMG.dawn} illustration from={{ s: 1.04, x: 0, y: 0 }} to={{ s: 1.15, x: -3, y: 1 }} />
      <Bottom>
        <Slot height={100}>
          <Label at={c(77.79)} outAt={c(80.4)} size={58} seed={51}>not sure what to expect</Label>
          <Label at={c(81.69)} outAt={c(84.0)} size={56} seed={52}>didn't know much about caring for them</Label>
          <Label at={c(84.23)} size={56} seed={53}>good thing those 3 handlers came along</Label>
        </Slot>
      </Bottom>
    </Stage>
  );
};

// 13 · "Up ahead lay the Jornada del Muerto. In Spanish, that means the journey of the dead man"
export const Jornada: React.FC = () => {
  const c = at('Jornada');
  return (
    <Stage scene="night" dipIn={8}>
      <Picture src={IMG.jornada} illustration from={{ s: 1.03, x: 0, y: 0 }} to={{ s: 1.16, x: 0, y: 2 }} />
      <Bottom gap={16}>
        <Hero at={c(87.84)} size={92} seed={54}>Jornada del Muerto</Hero>
        <Label at={c(91.69)} size={52} seed={55}>"the journey of the dead man"</Label>
      </Bottom>
    </Stage>
  );
};

// 14-15 · strip map of the 90-mile crossing (shared layout; beat 15 continues it)
const SX0 = 260, SX1 = 1660, SY = 560;
const SKULLS = [420, 590, 880, 1090, 1400, 1540];
const StripMap: React.FC<{ reveal: boolean; c: (s: number) => number }> = ({ reveal, c }) => {
  const s = useTri();
  const a = (t: number, i = 0) => (reveal ? c(t) + i * 4 : 0);
  const bar = useProg(a(96.35), 20);
  const barW = (SX1 - SX0) * (reveal ? bar : 1);
  const surfaceFilter = clay(s) ? 'url(#clay)' : s === 'cutout' ? 'drop-shadow(6px 8px 0 rgba(26,11,6,0.3))' : 'drop-shadow(0 10px 24px rgba(26,11,6,0.3))';
  return (
    <>
      <Center top={80}><Label at={reveal ? c(96.0) : 0} size={40} font="mono" seed={56}>JORNADA DEL MUERTO</Label></Center>
      <div style={{ position: 'absolute', left: SX0, top: SY - 70, width: barW, height: 140, background: '#E2C48C', borderRadius: clay(s) ? 40 : 6, border: smooth(s) ? `3px dashed ${COLORS.muted}` : 'none', filter: surfaceFilter }} />
      <div style={{ position: 'absolute', left: SX0, top: SY + 100, width: SX1 - SX0, display: 'flex', justifyContent: 'center' }}>
        <Label at={a(96.99)} size={46} font="mono" seed={57} color={COLORS.warn}>90 MILES</Label>
      </div>
      {[[700, 'a'], [1250, 'b']].map(([x], i) => (
        <Mat key={i} at={a(98.74, i * 2)} seed={90 + i} style={{ position: 'absolute', left: (x as number) - 22, top: SY - 150 }}><DropArt s={44} /></Mat>
      ))}
      {SKULLS.map((x, i) => (
        <Mat key={x} at={a(100.59, i)} seed={100 + i} style={{ position: 'absolute', left: x - 23, top: SY - 23 }}><SkullArt s={46} /></Mat>
      ))}
    </>
  );
};

export const Ninety: React.FC = () => {
  const c = at('Ninety');
  return (
    <Stage scene="parchment" dipIn={8}>
      <StripMap reveal c={c} />
      <Bottom><Label at={c(100.59)} size={50} seed={58}>countless people and livestock had perished</Label></Bottom>
    </Stage>
  );
};

// 15 · "To Beale's amazement, these strange animals crossed the Jornada del Muerto without a lick of trouble."
export const Crossed: React.FC = () => {
  const c = at('Crossed');
  const p = useProg(c(106.79), Math.round((109.12 - 106.79) * 30));
  const x = SX0 + 40 + (SX1 - SX0 - 80) * p;
  return (
    <Stage scene="parchment" dipIn={0}>
      <StripMap reveal={false} c={c} />
      <Mystery x={x} y={SY} at={c(105.5)} size={90} />
      <StampT text="NO TROUBLE" at={c(108.86)} color={COLORS.signal} rotate={-8} size={80} style={{ position: 'absolute', left: 1180, top: 250 }} />
      <Bottom>
        <Slot height={96}>
          <Label at={c(104.14)} outAt={c(105.39)} size={56} seed={59}>to Beale's amazement</Label>
          <Label at={c(105.39)} size={56} seed={60}>these strange animals crossed</Label>
        </Slot>
      </Bottom>
    </Stage>
  );
};

// 16 · "By December… Los Angeles… drew their fair share of attention. Folks lined the streets to get a good look."
export const LA: React.FC = () => {
  const c = at('LA');
  return (
    <Stage scene="night" dipIn={8}>
      <Picture src={IMG.crowd} illustration from={{ s: 1.04, x: 0, y: 0 }} to={{ s: 1.14, x: 2, y: 0 }} />
      <DateTag text="December 1857" at={c(110.48)} />
      <Bottom>
        <Slot height={110}>
          <Hero at={c(112.88)} outAt={c(117.4)} size={86} seed={61}>Los Angeles</Hero>
          <Label at={c(117.86)} size={56} seed={62}>folks lined the streets to get a good look</Label>
        </Slot>
      </Bottom>
    </Stage>
  );
};

// 17 · "Newspapers ran stories. Those critters were the talk of the territory and the star of the show."
export const Papers: React.FC = () => {
  const c = at('Papers');
  return (
    <Stage scene="parchment" dipIn={8}>
      {[{ x: 150, y: 170, r: -8 }, { x: 420, y: 130, r: 4 }, { x: 650, y: 200, r: -3 }].map((p, i) => (
        <Mat key={i} at={c(120.44) + i * 6} seed={110 + i} style={{ position: 'absolute', left: p.x, top: p.y }}>
          <div style={{ transform: `rotate(${p.r}deg)` }}><PaperArt w={440} seed={i + 1} /></div>
        </Mat>
      ))}
      <div style={{ position: 'absolute', left: 1180, top: 330, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 40 }}>
        <Label at={c(123.73)} size={58} font="display" seed={63} boxed>The talk of the territory.</Label>
        <Label at={c(124.95)} size={58} font="display" seed={64} boxed>The star of the show.</Label>
      </div>
    </Stage>
  );
};

// 18 · "Then trouble came."
export const Trouble: React.FC = () => {
  const c = at('Trouble');
  return (
    <Stage scene="storm" dipIn={6}>
      <Center gap={30}>
        <Hero at={c(126.69)} size={130} seed={65} color={undefined}>Then trouble came.</Hero>
      </Center>
    </Stage>
  );
};

// 19-20 · Texas map (shared)
const CV = { x: 1060, y: 560 };
const TexasMap: React.FC<{ reveal: boolean; c: (s: number) => number }> = ({ reveal, c }) => (
  <>
    <div style={{ position: 'absolute', left: 0, right: 0, top: 210, textAlign: 'center' }}>
      <Pop at={reveal ? c(130.72) : 0} seed={66} from="none">
        <div style={{ fontFamily: FONT_DISPLAY, fontWeight: 800, fontSize: 210, letterSpacing: 70, color: COLORS.muted, opacity: 0.22 }}>TEXAS</div>
      </Pop>
    </div>
    <Ridge x0={380} x1={640} y={430} at={reveal ? c(128.3) : 0} seed={9} />
    <Pin x={CV.x} y={CV.y} label="CAMP VERDE" sub="Texas" at={reveal ? c(129.66) : 0} hot seed={67} />
  </>
);

export const CampVerde: React.FC = () => {
  const c = at('CampVerde');
  return (
    <Stage scene="parchment" dipIn={8}>
      <TexasMap reveal c={c} />
      <Bottom><Label at={c(131.59)} size={54} seed={68}>where the whole venture had started</Label></Bottom>
    </Stage>
  );
};

// 20 · "Before long, the Civil War reached Texas, and Camp Verde fell into Confederate hands… no idea what to do with the animals."
export const CivilWar: React.FC = () => {
  const c = at('CivilWar');
  return (
    <Stage scene="parchment" dipIn={0}>
      <TexasMap reveal={false} c={c} />
      <DateTag text="1861 · Civil War" at={c(134.91)} />
      <StampT text="CONFEDERATE HANDS" at={c(137.87)} rotate={-9} size={72} style={{ position: 'absolute', left: 760, top: 330 }} />
      <Mystery x={CV.x - 150} y={CV.y + 120} at={c(140.34)} size={64} seed={71} />
      <Mystery x={CV.x + 10} y={CV.y + 160} at={c(140.34) + 4} size={64} seed={72} />
      <Mystery x={CV.x + 170} y={CV.y + 110} at={c(140.34) + 8} size={64} seed={73} />
      <Bottom><Label at={c(139.54)} size={52} seed={69}>no idea what to do with the animals</Label></Bottom>
    </Stage>
  );
};

// 21 · "Most were auctioned off. Some went to zoos. Some went to circuses. Others simply walked away."
export const Fates: React.FC = () => {
  const c = at('Fates');
  const frame = useCurrentFrame();
  const s = useTri();
  const start = c(149.49);
  const steps = 14;
  return (
    <Stage scene="parchment" dipIn={8}>
      <Center top={150}>
        <Card at={c(141.8)} width={1180}>
          <Row k="MOST" v="auctioned off" at={c(142.04)} vAt={c(142.51)} seed={121} keyWidth={300} />
          <Row k="SOME" v="zoos" at={c(143.87)} vAt={c(144.45)} seed={123} keyWidth={300} />
          <Row k="SOME" v="circuses" at={c(145.56)} vAt={c(146.44)} seed={125} keyWidth={300} />
          <Row k="OTHERS" v="simply walked away" at={c(147.97)} vAt={c(149.49)} hot seed={127} keyWidth={300} />
        </Card>
      </Center>
      {Array.from({ length: steps }, (_, i) => {
        const a = start + 6 + i * 4;
        if (frame < a) return null;
        const x = 1220 + i * 52;
        const y = 690 + (i % 2) * 26;
        return <div key={i} style={{ position: 'absolute', left: x, top: y, width: 16, height: 20, borderRadius: '50%', background: COLORS.muted, opacity: smooth(s) ? 0.75 : 1, filter: clay(s) ? 'url(#clay)' : undefined }} />;
      })}
    </Stage>
  );
};

// 22 · "And here's the part of the story that you won't find in the history books."
export const Books: React.FC = () => {
  const c = at('Books');
  return (
    <Stage scene="night" dipIn={8}>
      <Center top={120}>
        <Mat at={c(151.66)} seed={130}><div style={{ transform: 'rotate(-4deg)' }}><BookArt w={420} /></div></Mat>
      </Center>
      <Bottom><Label at={c(152.96)} size={56} seed={131}>you won't find this in the history books</Label></Bottom>
    </Stage>
  );
};

// 23 · "As late as the early 1900s, folks were still spotting strange wandering creatures from Arkansas all the way to Mexico."
const SIGHT = [[1380, 380], [1240, 460], [1310, 560], [1120, 520], [1000, 640], [1150, 690], [880, 720], [780, 800], [960, 820], [700, 870]];
export const Sightings: React.FC = () => {
  const c = at('Sightings');
  return (
    <Stage scene="parchment" dipIn={8}>
      <DateTag text="Early 1900s" at={c(156.64)} />
      <Center top={70}><Label at={c(159.53)} size={46} seed={140}>strange wandering creatures</Label></Center>
      <Pin x={1460} y={300} label="ARKANSAS" at={c(161.47)} above seed={141} />
      <Pin x={640} y={930} label="MEXICO" at={c(162.84)} above seed={143} />
      {SIGHT.map(([x, y], i) => <Mystery key={i} x={x} y={y} at={c(158.92) + i * 6} size={50} seed={150 + i} />)}
    </Stage>
  );
};

// 24 · "Plenty of folks swore they'd seen one with their own eyes… traced back to Beale's expedition over 40 years before."
const NOTES = [{ x: 170, y: 170 }, { x: 230, y: 430 }, { x: 150, y: 690 }];
const BADGE = { x: 1420, y: 470 };
export const Traced: React.FC = () => {
  const c = at('Traced');
  return (
    <Stage scene="parchment" dipIn={8}>
      {NOTES.map((n, i) => (
        <Mat key={i} at={c(164.6) + i * 8} seed={160 + i} style={{ position: 'absolute', left: n.x, top: n.y }}>
          <div style={{ transform: `rotate(${[-4, 3, -2][i]}deg)`, position: 'relative' }}>
            <NoteArt w={330} seed={i + 2} />
            <div style={{ position: 'absolute', right: -30, top: -26 }}><EyeArt s={74} /></div>
          </div>
        </Mat>
      ))}
      {NOTES.map((n, i) => (
        <Route key={i} pts={[[n.x + 340, n.y + 100], [(n.x + 340 + BADGE.x) / 2, n.y + 100 + (BADGE.y - n.y - 100) * 0.4], [BADGE.x - 40, BADGE.y + 40]]} at={c(169.72) + i * 5} dur={24} color={COLORS.accent} width={6} />
      ))}
      <div style={{ position: 'absolute', left: BADGE.x - 40, top: BADGE.y - 20 }}>
        <Label at={c(170.62)} size={52} font="mono" seed={170} color={COLORS.warn} boxed>BEALE · 1857</Label>
      </div>
      <StampT text="40+ YEARS" at={c(173.09)} rotate={-8} size={76} style={{ position: 'absolute', left: 1330, top: 640 }} />
      <Bottom><Label at={c(165.58)} size={48} seed={171}>seen with their own eyes</Label></Bottom>
    </Stage>
  );
};

// 25 · "You see, Beale couldn't cross that harsh Southwest with horses and mules, so the Army gave him…"
export const Setup: React.FC = () => {
  const c = at('Setup');
  const swap = c(181.22);
  const frame = useCurrentFrame();
  return (
    <Stage scene="night" dipIn={8}>
      <div style={{ position: 'absolute', left: 0, right: 0, top: 240, display: 'flex', justifyContent: 'center', gap: 160 }}>
        {[{ mule: false, a: c(179.36), t: 'HORSES' }, { mule: true, a: c(180.0), t: 'MULES' }].map((h, i) => (
          <div key={i} style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>
            <Mat at={h.a} outAt={swap} seed={180 + i}><HorseArt w={360} mule={h.mule} color={COLORS.d400} /></Mat>
            <div style={{ position: 'relative' }}>
              <Label at={h.a} outAt={swap} size={40} font="mono" seed={182 + i}>{h.t}</Label>
            </div>
            <div style={{ position: 'absolute', left: 20, right: 20, top: 140, height: 0 }}>
              {frame < swap && <Strike at={h.a + 8} thick={16} />}
            </div>
          </div>
        ))}
      </div>
      <Center top={130}>
        <Mat at={c(181.67)} seed={190}><TarpArt w={480} /></Mat>
      </Center>
      <Mystery x={960} y={360} at={c(182.49)} size={110} seed={191} />
      <Bottom>
        <Slot height={100}>
          <Label at={c(176.79)} outAt={swap} size={54} seed={192}>couldn't cross that harsh Southwest</Label>
          <Label at={swap} size={60} seed={193}>so the Army gave him…</Label>
        </Slot>
      </Bottom>
    </Stage>
  );
};

// 26 · "camels." THE REVEAL (183.93): the canvas is gone, the caravan is there.
export const Reveal: React.FC = () => {
  const c = at('Reveal');
  const hit = c(183.93);
  const frame = useCurrentFrame();
  return (
    <Stage scene="night" dipIn={0}>
      {frame < hit && (
        <>
          <Center top={130}><TarpArt w={480} /></Center>
          <Mystery x={960} y={360} at={0} size={110} seed={191} />
        </>
      )}
      <Picture src={IMG.caravan} at={hit} illustration from={{ s: 1.16, x: 0, y: 0 }} to={{ s: 1.06, x: 0, y: 0 }} />
      <Bottom><Hero at={hit} size={150} seed={200}>CAMELS.</Hero></Bottom>
    </Stage>
  );
};

// 27 · "if you came across a wild camel roaming the Arizona desert today, what would you do? Drop your answer in the comments below."
export const WildCamel: React.FC = () => {
  const c = at('WildCamel');
  return (
    <Stage scene="night" dipIn={6}>
      <Picture src={IMG.wild} illustration from={{ s: 1.03, x: 0, y: 0 }} to={{ s: 1.12, x: 1, y: 0 }} />
      <Bottom>
        <Slot height={120}>
          <Label at={c(186.48)} outAt={c(188.7)} size={54} seed={210}>a wild camel in the Arizona desert, today</Label>
          <Hero at={c(188.88)} size={100} seed={211}>What would you do?</Hero>
        </Slot>
        <Label at={c(190.02)} size={36} font="mono" seed={212} color={COLORS.warn}>DROP YOUR ANSWER IN THE COMMENTS</Label>
      </Bottom>
    </Stage>
  );
};

// 28 · "Like, share, and subscribe, and we'll see you in the next story."
export const EndCard: React.FC = () => {
  const c = at('EndCard');
  return (
    <Stage scene="night" dipIn={8} dipOut={12}>
      <Center gap={34}>
        <div style={{ display: 'flex', gap: 40 }}>
          <Label at={c(192.69)} size={34} font="mono" seed={220} color={COLORS.warn} ink={smooth(useTri()) ? COLORS.warn : undefined}>LIKE</Label>
          <Label at={c(193.09)} size={34} font="mono" seed={221} color={COLORS.warn} ink={smooth(useTri()) ? COLORS.warn : undefined}>SHARE</Label>
          <Label at={c(193.56)} size={34} font="mono" seed={222} color={COLORS.warn} ink={smooth(useTri()) ? COLORS.warn : undefined}>SUBSCRIBE</Label>
        </div>
        <Hero at={c(194.3)} size={128} seed={223}>{BRAND.wordmark.join('')}</Hero>
        <Rule at={c(194.55)} width={520} />
        <Label at={c(194.71)} size={46} seed={224}>We'll see you in the next story.</Label>
      </Center>
    </Stage>
  );
};

export const BEATS = {
  Fort, Ship, Handlers, Why, Problem, Horses, Title, Beale, Road, Orders, TwentyFive, Critters, Jornada,
  Ninety, Crossed, LA, Papers, Trouble, CampVerde, CivilWar, Fates, Books, Sightings, Traced, Setup,
  Reveal, WildCamel, EndCard,
};
