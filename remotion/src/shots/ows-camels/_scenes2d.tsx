// ows-camels flat2d: the drawn scenes that replace every photo / AI image in the all-2D version.
// Keyed by the IMG src the beats already use, so _beats.tsx is unchanged (lib/tristyle.tsx looks the
// scene up when the style is flat2d). Built from lib/flatwest.tsx primitives.
// REVEAL RULE: only `caravan` (shown on "camels") and `wild` (after) contain a camel. Every earlier
// scene hides the animals: covered crates on the ship, a crowd pointing off-frame, no animals at dawn.
import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { FW, Sky, Sun, Stars, Land, Dunes, Sea, Person, Wagon, Saguaro, Camel, HorseSkull, Ship, Fort, Adobe, Vulture, Pole, srand } from '../../lib/flatwest';
import { IMG } from './_beats';

const Svg: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <AbsoluteFill><svg width={1920} height={1080} viewBox="0 0 1920 1080">{children}</svg></AbsoluteFill>
);

/** 01 · a frontier fort at dusk; the flag stirs, stars come out. */
const FortScene: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <Svg>
      <Sky id="fort-sky" stops={[[0, FW.night], [0.38, FW.bronze], [0.62, FW.rust], [0.8, FW.ochre], [1, FW.gold]]} />
      <Stars seed={3} count={60} h={300} opacity={Math.min(1, f / 120)} />
      <Sun x={1380} y={700 + f * 0.12} r={120} color={FW.gold} halo={FW.ochre} />
      <Land y={700} color={FW.rust} seed={11} amp={140} mesa dx={-f * 0.15} />
      <Land y={780} color={FW.bronze} seed={4} amp={70} dx={-f * 0.3} />
      <rect x={0} y={800} width={1920} height={280} fill={FW.espresso} />
      <Fort x={900} y={810} s={1.05} color={FW.night} light={FW.gold} wave={f * 0.18} />
    </Svg>
  );
};

/** 02 · a ship at sea at twilight; deck cargo is crated and covered. */
const ShipScene: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <Svg>
      <Sky id="ship-sky" stops={[[0, FW.night], [0.45, FW.bronze], [0.7, FW.rust], [0.86, FW.ochre]]} />
      <Stars seed={9} count={80} h={420} />
      <Sun x={330} y={210} r={56} color={FW.cream} halo={FW.bone} rings={2} />
      <Sea y={690} color={FW.espresso} line={FW.ochre} phase={f * 2.2} />
      <Ship x={760 + f * 0.6} y={712 + Math.sin(f / 18) * 7} s={1.1} tilt={Math.sin(f / 22) * 1.6} color={FW.night} sail={FW.bone} />
    </Svg>
  );
};

/** 05 · bleached desert at noon with a horse skull; heat shimmer on the horizon. */
const SkullScene: React.FC = () => {
  const f = useCurrentFrame();
  const shimmer = Math.sin(f / 6) * 4;
  return (
    <Svg>
      <Sky id="skull-sky" stops={[[0, FW.ochre], [0.5, FW.gold], [1, FW.sky]]} />
      <Sun x={1450} y={210} r={80} color={FW.cream} halo={FW.cream} />
      <Land y={600 + shimmer} color={FW.dust} seed={21} amp={110} mesa />
      <Dunes y={680} color={FW.sandDeep} amp={22} len={900} phase={f * 0.4} />
      <rect x={0} y={720} width={1920} height={360} fill={FW.sand} />
      {[[300, 770, 520, 790], [900, 760, 1130, 812], [1400, 800, 1720, 790], [560, 860, 820, 900]].map(([a, b, c, d], i) => (
        <polyline key={i} points={`${a},${b} ${(a + c) / 2},${(b + d) / 2 + 12} ${c},${d}`} fill="none" stroke={FW.sandDeep} strokeWidth={4} />
      ))}
      <HorseSkull x={760} y={770} s={1.25} color={FW.bone} shade={FW.saddle} />
      <g stroke={FW.saddle} strokeWidth={6} strokeLinecap="round" fill="none">
        <path d="M 1300 760 L 1300 690 M 1300 720 L 1270 680 M 1300 705 L 1335 662 M 1300 740 L 1340 712" />
      </g>
    </Svg>
  );
};

/** 08 · Edward Beale as a period silhouette cameo (a drawn stand-in for the photograph). viewBox 400x558. */
const BealeCameo: React.FC = () => (
  <AbsoluteFill>
    <svg width="100%" height="100%" viewBox="0 0 400 558" preserveAspectRatio="xMidYMid slice">
      <rect width={400} height={558} fill={FW.paper} />
      <ellipse cx={200} cy={270} rx={170} ry={235} fill={FW.cream} stroke={FW.rust} strokeWidth={6} />
      <path fill={FW.espresso} d="M 150 470 C 150 420, 165 395, 190 380 L 186 352 C 160 350, 150 330, 156 312 L 148 300 L 160 290 C 150 250, 160 190, 205 168 C 250 150, 290 180, 292 225 C 296 255, 288 275, 282 290 C 288 300, 300 318, 286 326 C 276 334, 282 350, 266 358 L 268 384 C 300 396, 330 420, 336 470 Z" />
      <path fill={FW.espresso} d="M 70 520 C 80 450, 140 410, 200 404 C 270 410, 330 450, 340 520 Z" />
      <path fill={FW.cream} d="M 186 412 L 214 412 L 206 470 L 194 470 Z" />
    </svg>
  </AbsoluteFill>
);

/** 12 · the expedition sets out at dawn: people and wagons walking out of frame (no animals shown). */
const DawnScene: React.FC = () => {
  const f = useCurrentFrame();
  const march = f * 1.1;
  return (
    <Svg>
      <Sky id="dawn-sky" stops={[[0, FW.bronze], [0.4, FW.rust], [0.7, FW.ochre], [0.9, FW.gold]]} />
      <Sun x={1560} y={770 - Math.min(80, f * 0.25)} r={130} color={FW.gold} halo={FW.cream} />
      <Land y={720} color={FW.rust} seed={31} amp={130} mesa />
      <rect x={0} y={790} width={1920} height={290} fill={FW.espresso} />
      <Wagon x={420 + march} y={800} s={0.95} color={FW.night} canvas={FW.saddle} turn={march} />
      {[0, 1, 2, 3].map((i) => <Person key={i} x={640 + i * 110 + march} y={800} s={0.9} color={FW.night} pose="walk" phase={f / 6 + i * 1.3} />)}
      <Wagon x={1150 + march} y={800} s={0.95} color={FW.night} canvas={FW.saddle} turn={march} />
      {[0, 1].map((i) => <Person key={i} x={1350 + i * 120 + march} y={800} s={0.9} color={FW.night} pose="walk" phase={f / 6 + i * 2.1} />)}
    </Svg>
  );
};

/** 13 · the Jornada del Muerto: white-hot desert, bones, circling vultures. */
const JornadaScene: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <Svg>
      <Sky id="jor-sky" stops={[[0, FW.gold], [0.55, FW.cream], [1, FW.cream]]} />
      <Sun x={960} y={330} r={150} color={FW.cream} halo={FW.gold} />
      {[0, 1, 2].map((i) => {
        const a = f / 40 + i * 2.1;
        return <Vulture key={i} x={960 + Math.cos(a) * (260 + i * 60)} y={250 + Math.sin(a) * 60} s={0.9} color={FW.espresso} flap={(Math.sin(f / 5 + i) + 1) / 2} />;
      })}
      <Dunes y={640} color={FW.dust} amp={26} len={1100} phase={f * 0.3} />
      <Dunes y={700} color={FW.sandDeep} amp={34} len={800} phase={300 + f * 0.6} />
      <Dunes y={780} color={FW.sand} amp={20} len={600} phase={120} />
      <HorseSkull x={1560} y={760} s={0.7} color={FW.bone} shade={FW.saddle} />
      {[[520, 880], [600, 868], [680, 884]].map(([x, y], i) => <rect key={i} x={x} y={y} width={60} height={9} rx={4} fill={FW.bone} transform={`rotate(${-10 + i * 12} ${x} ${y})`} />)}
    </Svg>
  );
};

/** 16 · an 1857 Los Angeles street: the crowd stares and points at something off-frame right. */
const CrowdScene: React.FC = () => {
  const f = useCurrentFrame();
  const folk = Array.from({ length: 11 }, (_, i) => ({
    x: 260 + i * 105 + srand(i) * 30, s: 0.95 + srand(i + 9) * 0.25, skirt: srand(i + 3) > 0.62,
    pose: (i % 3 === 1 ? 'point' : 'stand') as 'point' | 'stand', col: [FW.espresso, FW.bronze, FW.night][i % 3],
  }));
  return (
    <Svg>
      <Sky id="la-sky" stops={[[0, FW.ochre], [0.6, FW.gold], [1, FW.sky]]} />
      <Land y={560} color={FW.dust} seed={41} amp={120} />
      <Adobe x={-20} y={800} w={520} h={300} color={FW.adobe} shade={FW.adobeDark} />
      <Adobe x={520} y={800} w={420} h={240} color={FW.sandDeep} shade={FW.adobeDark} />
      <Adobe x={960} y={800} w={560} h={280} color={FW.adobe} shade={FW.adobeDark} />
      <rect x={0} y={800} width={1920} height={280} fill={FW.sandDeep} />
      <path d="M 0 880 L 1920 860 L 1920 1080 L 0 1080 Z" fill={FW.sand} />
      {folk.map((p, i) => (
        <Person key={i} x={p.x} y={900 + (i % 2) * 22 + Math.sin(f / 9 + i) * 2} s={p.s} color={p.col} pose={p.pose} skirt={p.skirt} />
      ))}
      <path d="M 1880 700 L 1920 690 L 1920 900 L 1870 900 Z" fill={FW.adobeDark} opacity={0.6} />
    </Svg>
  );
};

/** 26 · THE REVEAL: an Army camel caravan on a sunset ridge (appears on "camels"). */
const CaravanScene: React.FC = () => {
  const f = useCurrentFrame();
  const walk = f * 1.4;
  return (
    <Svg>
      <Sky id="car-sky" stops={[[0, FW.bronze], [0.45, FW.rust], [0.72, FW.ochre], [0.92, FW.gold]]} />
      <Sun x={980} y={600} r={210} color={FW.gold} halo={FW.cream} />
      <Land y={690} color={FW.rust} seed={51} amp={90} mesa />
      <path d="M 0 760 C 400 700, 800 690, 1100 700 C 1400 712, 1700 740, 1920 760 L 1920 1080 L 0 1080 Z" fill={FW.night} />
      {[0, 1, 2, 3, 4].map((i) => {
        const x = 260 + i * 300 + walk;
        const y = 760 - Math.sin((x / 1920) * Math.PI) * 60 + 8;
        return <Camel key={i} x={x} y={y} s={0.95} color={FW.night} phase={f / 7 + i * 1.1} />;
      })}
      {[0, 1].map((i) => {
        const x = 150 + i * 760 + walk;
        const y = 760 - Math.sin((x / 1920) * Math.PI) * 60 + 8;
        return <Person key={i} x={x} y={y} s={0.85} color={FW.night} pose="walk" phase={f / 6 + i} />;
      })}
    </Svg>
  );
};

/** 27 · today: a lone wild camel in the Arizona desert at sunset; saguaros and a power line. */
const WildScene: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <Svg>
      <Sky id="wild-sky" stops={[[0, FW.night], [0.35, FW.bronze], [0.6, FW.rust], [0.82, FW.ochre], [1, FW.gold]]} />
      <Sun x={560} y={690} r={150} color={FW.gold} halo={FW.ochre} />
      <Land y={660} color={FW.rust} seed={61} amp={170} mesa />
      <Land y={760} color={FW.bronze} seed={7} amp={50} />
      <rect x={0} y={800} width={1920} height={280} fill={FW.espresso} />
      {[0, 1, 2, 3, 4, 5].map((i) => <Pole key={i} x={180 + i * 340} y={790} s={0.5} color={FW.night} />)}
      <path d={`M 180 692 ${[1, 2, 3, 4, 5].map((i) => `Q ${10 + i * 340} 712 ${180 + i * 340} 692`).join(' ')}`} fill="none" stroke={FW.night} strokeWidth={2} />
      <Saguaro x={300} y={860} s={1.4} color={FW.night} />
      <Saguaro x={1720} y={880} s={1.7} color={FW.night} flip />
      <Saguaro x={1460} y={820} s={0.8} color={FW.night} />
      <Camel x={1010 + f * 0.8} y={860} s={1.25} color={FW.night} phase={f / 9} />
    </Svg>
  );
};

/** The scene registry the flat2d shots pass to StyleProvider (src -> drawn scene). */
export const SCENES: Record<string, React.FC> = {
  [IMG.fort]: FortScene, [IMG.ship]: ShipScene, [IMG.skull]: SkullScene, [IMG.beale]: BealeCameo,
  [IMG.dawn]: DawnScene, [IMG.jornada]: JornadaScene, [IMG.crowd]: CrowdScene,
  [IMG.caravan]: CaravanScene, [IMG.wild]: WildScene,
};
