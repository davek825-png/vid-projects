// ows-camels clay3d: real three.js clay dioramas that replace every photo / AI image in the 3D
// claymation version. Keyed by the IMG src the beats already use (lib/tristyle.tsx looks them up when
// the style is clay3d). Built from lib/clay3d.tsx. Stop-motion on twos: every motion uses stepF(frame).
// REVEAL RULE: only `caravan` (shown on "camels") and `wild` (after) contain a camel. Earlier scenes
// hide the animals: covered crates on the ship, a crowd pointing off-frame, no animals at dawn.
import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';
import {
  ClayWorld, Prop, Camel3D, Person3D, Wagon3D, Fort3D, Ship3D, Saguaro3D, Skull3D, Mesa3D, Adobe3D, Vulture3D,
  Sun3D, Sea3D, Bust3D, Blob, Roll, Cyl, CLAY, stepF, driftCam,
} from '../../lib/clay3d';
import { IMG } from './_beats';

const useClip = () => {
  const f = stepF(useCurrentFrame());
  const { durationInFrames } = useVideoConfig();
  return { f, d: durationInFrames };
};
const Full: React.FC<{ children: React.ReactNode }> = ({ children }) => <AbsoluteFill>{children}</AbsoluteFill>;

/** 01 · the fort at dusk, flag stirring. */
const FortScene: React.FC = () => {
  const { f, d } = useClip();
  return (
    <Full>
      <ClayWorld sky={CLAY.rust} floor={CLAY.sandDeep} sun={[-8, 5, 5]} warm="#FFB878"
        cam={driftCam(f, d, { pos: [0, 3.4, 19], look: [0, 1.9, 0] }, { pos: [-0.8, 3.0, 15.5], look: [0, 1.9, 0] })}>
        <Sun3D position={[7, 2.5, -34]} r={4} color={CLAY.gold} />
        <Prop at={[0, 0, 0]} seed={1}><Fort3D wave={f / 4} /></Prop>
        {[[-13, -14, 8, 4], [12, -16, 9, 3.2], [0, -24, 12, 4.5]].map(([x, z, w, h], i) => <Prop key={i} at={[x, 0, z]} seed={10 + i}><Mesa3D w={w} h={h} seed={i} color={i % 2 ? CLAY.bronze : CLAY.rust} /></Prop>)}
        <Prop at={[-7, 0, 4]} seed={5}><Saguaro3D s={0.9} /></Prop>
      </ClayWorld>
    </Full>
  );
};

/** 02 · a ship on a rolled-clay sea at twilight; deck cargo is crated and covered. */
const ShipScene: React.FC = () => {
  const { f, d } = useClip();
  return (
    <Full>
      <ClayWorld sky={CLAY.dusk} floor={CLAY.sea} sun={[6, 6, 6]} warm="#FFD0A0"
        cam={driftCam(f, d, { pos: [-1, 3.2, 17], look: [0, 2.4, 0] }, { pos: [1.5, 3.0, 15], look: [0.5, 2.4, 0] })}>
        <Sun3D position={[-14, 11, -30]} r={2.2} color={CLAY.cream} />
        <Sea3D phase={f / 10} rows={7} z0={-5} />
        <group position={[f * 0.006, Math.sin(f / 14) * 0.12, 0]} rotation={[Math.sin(f / 18) * 0.03, 0, Math.sin(f / 16) * 0.04]}>
          <Prop at={[0, 0, 0]} seed={2}><Ship3D /></Prop>
        </group>
      </ClayWorld>
    </Full>
  );
};

/** 05 · a horse skull on bleached sand at noon. */
const SkullScene: React.FC = () => {
  const { f, d } = useClip();
  return (
    <Full>
      <ClayWorld sky={CLAY.sky} floor={CLAY.sand} sun={[3, 12, 3]} warm="#FFF2D8"
        cam={driftCam(f, d, { pos: [-1.8, 1.4, 6.5], look: [0.4, 0.5, 0] }, { pos: [-0.6, 1.1, 5.2], look: [0.4, 0.4, 0] })}>
        <Sun3D position={[8, 16, -30]} r={2.6} color={CLAY.cream} />
        <Prop at={[0, 0, 0]} seed={3}><Skull3D /></Prop>
        <Prop at={[2.6, 0, -1.4]} seed={4}>
          <Roll position={[0, 0.5, 0]} r={0.04} len={0.9} color={CLAY.saddle} />
          <Roll position={[0.2, 0.75, 0]} rotation={[0, 0, -0.7]} r={0.03} len={0.45} color={CLAY.saddle} />
          <Roll position={[-0.18, 0.7, 0]} rotation={[0, 0, 0.8]} r={0.03} len={0.4} color={CLAY.saddle} />
        </Prop>
        {[[-9, -14, 8, 2.6], [8, -18, 10, 3.2]].map(([x, z, w, h], i) => <Prop key={i} at={[x, 0, z]} seed={20 + i}><Mesa3D w={w} h={h} seed={i} color={CLAY.dust} /></Prop>)}
      </ClayWorld>
    </Full>
  );
};

/** 08 · Edward Beale as a clay bust (a stand-in for his photograph, not a likeness). 400x558. */
const BealeBust: React.FC = () => {
  const { f } = useClip();
  return (
    <Full>
      <ClayWorld w={400} h={558} sky={CLAY.paper} floor={CLAY.sandDeep} sun={[-3, 5, 6]} fog={[CLAY.paper, 30, 60]}
        cam={{ pos: [3.2 + Math.sin(f / 40) * 0.08, 1.55, 0.6], look: [0, 1.3, 0], fov: 34 }}>
        <Prop at={[0, 0, 0]} seed={8}><Bust3D /></Prop>
      </ClayWorld>
    </Full>
  );
};

/** 12 · the expedition sets out at dawn: people and wagons walk right (no animals shown). */
const DawnScene: React.FC = () => {
  const { f, d } = useClip();
  const m = f * 0.03;
  return (
    <Full>
      <ClayWorld sky={CLAY.ochre} floor={CLAY.sandDeep} sun={[-9, 3.5, 4]} warm="#FFC07A"
        cam={driftCam(f, d, { pos: [0, 2.6, 17], look: [0, 1.4, 0] }, { pos: [2.5, 2.6, 16], look: [2.5, 1.4, 0] })}>
        <Sun3D position={[-18, 4, -30]} r={4.5} color={CLAY.gold} />
        <Prop at={[-7 + m, 0, 0]} seed={30}><Wagon3D turn={-m * 2} /></Prop>
        {[0, 1, 2].map((i) => <Prop key={i} at={[-4 + i * 1.3 + m, 0, 0.8]} seed={31 + i}><Person3D pose="walk" phase={f / 6 + i * 1.5} coat={[CLAY.rust, CLAY.denim, CLAY.saddle][i]} /></Prop>)}
        <Prop at={[1.5 + m, 0, 0]} seed={35}><Wagon3D turn={-m * 2} /></Prop>
        {[0, 1].map((i) => <Prop key={i} at={[4.4 + i * 1.3 + m, 0, 0.8]} seed={36 + i}><Person3D pose="walk" phase={f / 6 + i * 2} coat={[CLAY.denim, CLAY.rust][i]} /></Prop>)}
        {[[-12, -14, 8, 3.5], [10, -16, 10, 4]].map(([x, z, w, h], i) => <Prop key={i} at={[x, 0, z]} seed={40 + i}><Mesa3D w={w} h={h} seed={i} /></Prop>)}
      </ClayWorld>
    </Full>
  );
};

/** 13 · the Jornada del Muerto: white-hot dunes, bones, circling vultures. */
const JornadaScene: React.FC = () => {
  const { f, d } = useClip();
  return (
    <Full>
      <ClayWorld sky={CLAY.gold} floor={CLAY.sand} sun={[2, 14, 4]} warm="#FFF4DC"
        cam={driftCam(f, d, { pos: [0, 3.0, 18], look: [0, 2.0, 0] }, { pos: [0, 2.6, 14], look: [0, 2.2, 0] })}>
        <Sun3D position={[0, 9, -32]} r={5.5} color={CLAY.cream} />
        {[[-8, -6, 7], [4, -9, 9], [11, -4, 6], [-2, -14, 12]].map(([x, z, w], i) => <Blob key={i} position={[x, -0.6, z]} scale={[w, 1.6, w * 0.5]} color={i % 2 ? CLAY.sandDeep : CLAY.dust} />)}
        {[0, 1, 2].map((i) => {
          const a = f / 30 + i * 2.1;
          return <Prop key={i} at={[Math.cos(a) * (5 + i * 1.5), 5.2 + i * 0.5, -12 + Math.sin(a) * 2]} seed={50 + i} rotY={-a}><Vulture3D flap={(Math.sin(f / 4 + i) + 1) / 2} /></Prop>;
        })}
        <Prop at={[-6.5, 0, -1]} seed={55} scale={0.8}><Skull3D /></Prop>
      </ClayWorld>
    </Full>
  );
};

/** 16 · an 1857 Los Angeles street: the crowd stares and points at something off-frame right. */
const CrowdScene: React.FC = () => {
  const { f, d } = useClip();
  const folk = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  return (
    <Full>
      <ClayWorld sky={CLAY.sky} floor={CLAY.sandDeep} sun={[-6, 9, 6]}
        cam={driftCam(f, d, { pos: [-3, 2.4, 12], look: [-0.5, 1.4, 0] }, { pos: [-1.5, 2.2, 10.5], look: [0, 1.4, 0] })}>
        {[[-7, -4, 4, 3], [-2.5, -4.2, 3.6, 2.4], [2.2, -4, 4.2, 2.8]].map(([x, z, w, h], i) => <Prop key={i} at={[x, 0, z]} seed={60 + i}><Adobe3D w={w} h={h} color={i % 2 ? CLAY.sandDeep : CLAY.adobe} /></Prop>)}
        {folk.map((i) => (
          <Prop key={i} at={[-6 + i * 1.05, 0, (i % 2) * 1.1]} seed={70 + i} rotY={0.15}>
            <Person3D pose={i % 3 === 1 ? 'point' : 'stand'} skirt={i === 2 || i === 6} coat={[CLAY.rust, CLAY.denim, CLAY.saddle, CLAY.sage][i % 4]} />
          </Prop>
        ))}
      </ClayWorld>
    </Full>
  );
};

/** 26 · THE REVEAL: an Army camel caravan crossing at sunset (appears on "camels"). */
const CaravanScene: React.FC = () => {
  const { f } = useClip();
  const m = f * 0.04;
  return (
    <Full>
      <ClayWorld sky={CLAY.ochre} floor={CLAY.sandDeep} sun={[-6, 4, 5]} warm="#FFB070"
        cam={{ pos: [0, 2.8, 20], look: [0, 1.8, 0] }}>
        <Sun3D position={[0, 3.5, -34]} r={7} color={CLAY.gold} />
        {[0, 1, 2, 3, 4].map((i) => <Prop key={i} at={[-9 + i * 4 + m, 0, (i % 2) * 0.6]} seed={80 + i}><Camel3D phase={f / 7 + i * 1.1} /></Prop>)}
        {[0, 1].map((i) => <Prop key={i} at={[-11 + i * 12 + m, 0, 1.4]} seed={90 + i}><Person3D pose="walk" phase={f / 6 + i} coat={CLAY.denim} /></Prop>)}
        {[[-14, -16, 9, 3.6], [13, -18, 10, 3]].map(([x, z, w, h], i) => <Prop key={i} at={[x, 0, z]} seed={95 + i}><Mesa3D w={w} h={h} seed={i} /></Prop>)}
      </ClayWorld>
    </Full>
  );
};

/** 27 · today: a lone wild camel among saguaros and a power line at sunset. */
const WildScene: React.FC = () => {
  const { f, d } = useClip();
  return (
    <Full>
      <ClayWorld sky={CLAY.rust} floor={CLAY.sandDeep} sun={[-7, 4, 4]} warm="#FFB070"
        cam={driftCam(f, d, { pos: [0, 2.6, 15], look: [0.5, 1.8, 0] }, { pos: [1.2, 2.3, 12.5], look: [1, 1.8, 0] })}>
        <Sun3D position={[-10, 4, -32]} r={5} color={CLAY.gold} />
        <Prop at={[0.5 + f * 0.012, 0, 0]} seed={100}><Camel3D phase={f / 9} /></Prop>
        {[[-6, 1, 1.2], [6.5, 1.5, 1.4], [3.8, -3, 0.8]].map(([x, z, s], i) => <Prop key={i} at={[x, 0, z]} seed={101 + i}><Saguaro3D s={s} /></Prop>)}
        {[-12, -6, 0, 6, 12].map((x, i) => (
          <Prop key={i} at={[x, 0, -7]} seed={110 + i}>
            <Cyl position={[0, 2, 0]} rt={0.08} rb={0.1} h={4} color={CLAY.wood} />
            <Cyl position={[0, 3.7, 0]} rotation={[0, 0, Math.PI / 2]} rt={0.05} rb={0.05} h={1.2} color={CLAY.wood} />
          </Prop>
        ))}
        {[[-14, -18, 10, 4], [12, -20, 12, 3.4]].map(([x, z, w, h], i) => <Prop key={i} at={[x, 0, z]} seed={120 + i}><Mesa3D w={w} h={h} seed={i} /></Prop>)}
      </ClayWorld>
    </Full>
  );
};

/** The scene registry the clay3d shots pass to StyleProvider (src -> 3D diorama). */
export const SCENES3D: Record<string, React.FC> = {
  [IMG.fort]: FortScene, [IMG.ship]: ShipScene, [IMG.skull]: SkullScene, [IMG.beale]: BealeBust,
  [IMG.dawn]: DawnScene, [IMG.jornada]: JornadaScene, [IMG.crowd]: CrowdScene,
  [IMG.caravan]: CaravanScene, [IMG.wild]: WildScene,
};
