// CLAY 3D kit: real three.js claymation for the "clay3d" style (via @remotion/three). NOT a shot.
// Plasticine look = matte MeshStandardMaterial + a procedural fingerprint bump map, soft warm key light
// with shadows, chunky rounded primitives. Stop-motion: callers pass a STEPPED frame (on twos) and
// every model gets a seeded per-pose "boil" wobble, so it moves like hand-animated clay.
// Remotion rules (remotion-markup/3d.md): content lives in <ThreeCanvas width height>, lights are
// explicit, and NOTHING animates by itself: no useFrame, everything derives from useCurrentFrame().
// Units: ~1 = 1 metre; ground at y = 0; models face +x. Render with `render-all.mjs --gl=angle`.
import React, { useMemo } from 'react';
import { ThreeCanvas } from '@remotion/three';
import { useThree } from '@react-three/fiber';
import { useCurrentFrame } from 'remotion';
import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
import { COLORS } from '../brand';
import { BOIL_ENABLED } from './styles';

export const CLAY = {
  espresso: COLORS.d800, bronze: COLORS.d600, saddle: COLORS.muted, dust: COLORS.d400, bone: '#EDE3CF',
  paper: COLORS.paper, cream: COLORS.cream, rust: COLORS.accent, ochre: COLORS.accent2, gold: COLORS.warn,
  blood: COLORS.danger, sage: COLORS.signal, sand: '#E2BE82', sandDeep: '#C9955A', adobe: '#C98B5E',
  sky: '#F3D9A8', dusk: '#7A3A22', sea: '#2E4A55', seaLight: '#4F6F78', camel: '#B98A57', hide: '#8A5A33',
  skin: '#C99A72', denim: '#3E4B5E', canvas: '#E6D6B4', wood: '#6B4A33',
} as const;

const rnd = (seed: number, n: number) => {
  const x = Math.sin(seed * 127.1 + n * 311.7) * 43758.5453;
  return (x - Math.floor(x)) * 2 - 1;
};
/** Quantize to held poses (stop-motion on twos by default). */
export const stepF = (frame: number, hold = 2) => Math.floor(frame / hold) * hold;
/** Per-pose wobble for a model. OFF while BOIL_ENABLED is false (creator rule: no shaky effects). */
export const boil3 = (frame: number, seed: number, amp = 0.012, hold = 2) => {
  if (!BOIL_ENABLED) return { p: [0, 0, 0] as [number, number, number], r: 0 };
  const n = Math.floor(frame / hold);
  return { p: [rnd(seed, n) * amp, rnd(seed + 3, n) * amp * 0.6, rnd(seed + 7, n) * amp] as [number, number, number], r: rnd(seed + 11, n) * amp * 1.6 };
};

// ---- clay material --------------------------------------------------------------------

let bumpTex: THREE.CanvasTexture | null = null;
/** Fingerprint/tool-mark bump texture, generated once (seeded, deterministic). */
const clayBump = () => {
  if (bumpTex) return bumpTex;
  const c = document.createElement('canvas');
  c.width = c.height = 256;
  const g = c.getContext('2d')!;
  g.fillStyle = '#808080';
  g.fillRect(0, 0, 256, 256);
  for (let i = 0; i < 420; i++) {
    const x = (rnd(1, i) * 0.5 + 0.5) * 256, y = (rnd(2, i) * 0.5 + 0.5) * 256, r = 3 + (rnd(3, i) * 0.5 + 0.5) * 14;
    g.fillStyle = `rgba(${rnd(4, i) > 0 ? 255 : 0},${rnd(4, i) > 0 ? 255 : 0},${rnd(4, i) > 0 ? 255 : 0},0.10)`;
    g.beginPath(); g.ellipse(x, y, r, r * 0.7, rnd(5, i) * 3, 0, Math.PI * 2); g.fill();
  }
  for (let i = 0; i < 60; i++) { // thumb-print arcs
    g.strokeStyle = 'rgba(40,40,40,0.18)'; g.lineWidth = 1.5;
    const x = (rnd(6, i) * 0.5 + 0.5) * 256, y = (rnd(7, i) * 0.5 + 0.5) * 256;
    for (let k = 0; k < 4; k++) { g.beginPath(); g.arc(x, y, 5 + k * 4, rnd(8, i) * 3, rnd(8, i) * 3 + 2.2); g.stroke(); }
  }
  bumpTex = new THREE.CanvasTexture(c);
  bumpTex.wrapS = bumpTex.wrapT = THREE.RepeatWrapping;
  bumpTex.repeat.set(3, 3);
  return bumpTex;
};

/** Matte plasticine material. */
export const ClayMat: React.FC<{ color: string; emissive?: string; bump?: number }> = ({ color, emissive, bump = 0.9 }) => {
  const map = useMemo(() => clayBump(), []);
  return <meshStandardMaterial color={color} roughness={0.88} metalness={0} bumpMap={map} bumpScale={bump} emissive={emissive ?? '#000000'} emissiveIntensity={emissive ? 0.9 : 0} />;
};

type V3 = [number, number, number];
type MeshP = { position?: V3; rotation?: V3; scale?: V3 | number; color: string; emissive?: string };

/** Ellipsoid blob. */
export const Blob: React.FC<MeshP> = ({ position, rotation, scale = 1, color, emissive }) => (
  <mesh position={position} rotation={rotation} scale={scale} castShadow receiveShadow>
    <sphereGeometry args={[1, 36, 24]} />
    <ClayMat color={color} emissive={emissive} />
  </mesh>
);
/** Rolled clay sausage (capsule). length = straight part. */
export const Roll: React.FC<MeshP & { r: number; len: number }> = ({ position, rotation, scale = 1, color, r, len }) => (
  <mesh position={position} rotation={rotation} scale={scale} castShadow receiveShadow>
    <capsuleGeometry args={[r, len, 8, 16]} />
    <ClayMat color={color} />
  </mesh>
);
/** Soft rounded slab. */
export const Slab: React.FC<MeshP & { size: V3; radius?: number }> = ({ position, rotation, scale = 1, color, size, radius = 0.06 }) => {
  const geo = useMemo(() => new RoundedBoxGeometry(size[0], size[1], size[2], 3, Math.min(radius, Math.min(...size) / 2.05)), [size[0], size[1], size[2], radius]);
  return (
    <mesh geometry={geo} position={position} rotation={rotation} scale={scale} castShadow receiveShadow>
      <ClayMat color={color} />
    </mesh>
  );
};
/** Cylinder / cone (radialSegs 4 = pyramid roof). */
export const Cyl: React.FC<MeshP & { rt: number; rb: number; h: number; seg?: number }> = ({ position, rotation, scale = 1, color, rt, rb, h, seg = 20 }) => (
  <mesh position={position} rotation={rotation} scale={scale} castShadow receiveShadow>
    <cylinderGeometry args={[rt, rb, h, seg]} />
    <ClayMat color={color} />
  </mesh>
);

// ---- the stage ---------------------------------------------------------------------------

export type ClayCam = { pos: V3; look: V3; fov?: number };
/**
 * A lit clay set: backdrop color, rolled-clay floor, warm key light with soft shadows. `cam` may move
 * per frame (pass stepped values). Children are models. Fills the frame.
 */
export const ClayWorld: React.FC<{ sky: string; floor: string; cam: ClayCam; children: React.ReactNode; sun?: V3; warm?: string; fog?: [string, number, number]; w?: number; h?: number }> = ({ sky, floor, cam, children, sun = [6, 9, 6], warm = '#FFE2B8', fog, w = 1920, h = 1080 }) => (
  <ThreeCanvas width={w} height={h} shadows camera={{ fov: cam.fov ?? 38, position: cam.pos }} style={{ position: 'absolute', inset: 0 }}>
    <color attach="background" args={[sky]} />
    <fog attach="fog" args={fog ?? [sky, 22, 60]} />
    <CamRig cam={cam} />
    <hemisphereLight args={['#FFF4E2', '#8A5A3A', 1.1]} />
    <directionalLight position={[-sun[0], 4, 10]} intensity={0.45} color="#FFD8B0" />
    <directionalLight position={sun} intensity={1.6} color={warm} castShadow shadow-mapSize-width={2048} shadow-mapSize-height={2048}
      shadow-camera-left={-14} shadow-camera-right={14} shadow-camera-top={10} shadow-camera-bottom={-10} shadow-bias={-0.0004} />
    <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
      <planeGeometry args={[80, 80]} />
      <ClayMat color={floor} bump={1.2} />
    </mesh>
    {children}
  </ThreeCanvas>
);

/** Applies the (frame-driven) camera every render: position, fov + lookAt on the canvas camera. */
const CamRig: React.FC<{ cam: ClayCam }> = ({ cam }) => {
  const camera = useThree((st) => st.camera) as THREE.PerspectiveCamera;
  camera.position.set(...cam.pos);
  camera.fov = cam.fov ?? 38;
  camera.lookAt(...cam.look);
  camera.updateProjectionMatrix();
  return null;
};

/** Simple frame-driven camera drift between two poses over [0, dur] frames (stepped). */
export const driftCam = (frame: number, dur: number, a: ClayCam, b: ClayCam): ClayCam => {
  const t = Math.max(0, Math.min(1, stepF(frame) / Math.max(1, dur)));
  const e = t * t * (3 - 2 * t);
  const mix = (p: V3, q: V3) => p.map((v, i) => v + (q[i] - v) * e) as V3;
  return { pos: mix(a.pos, b.pos), look: mix(a.look, b.look), fov: a.fov };
};

/**
 * Background set for text / ledger / map beats (the clay3d Stage). night + storm: a low view across a
 * clay desert with mesas against a dusky backdrop; parchment: a clay tabletop seen from above (cards
 * and maps sit "on the table"). The camera boils a little per held pose so the set feels handmade.
 */
export const ClayStage3D: React.FC<{ scene: 'night' | 'parchment' | 'storm' }> = ({ scene }) => {
  const f = stepF(useCurrentFrame());
  const b = boil3(f, 99, 0.02);
  if (scene === 'parchment') {
    return (
      <ClayWorld sky={CLAY.bronze} floor={CLAY.wood} cam={{ pos: [b.p[0], 9.5, 6.8 + b.p[2]], look: [0, 0, -0.6], fov: 44 }} sun={[-6, 9, 5]} fog={[CLAY.bronze, 26, 60]}>
        {/* the paper sheet the cards / maps lie on: raised clay slab, so its edges + shadow show depth */}
        <Prop at={[0, 0, -0.4]} seed={46}><Slab position={[0, 0.07, 0]} size={[14.6, 0.14, 8.4]} color={CLAY.paper} radius={0.06} /></Prop>
        {[[-8.6, 3.2, 0.7], [8.9, -2.6, 0.9], [-8.2, -4.2, 0.6], [8.4, 3.8, 0.5], [-6.9, 4.4, 0.35], [7.2, -4.6, 0.4]].map(([x, z, s], i) => (
          <Prop key={i} at={[x, 0, z]} seed={i + 40}><Blob position={[0, s * 0.3, 0]} scale={[s, s * 0.45, s * 0.8]} color={[CLAY.sand, CLAY.dust, CLAY.sandDeep][i % 3]} /></Prop>
        ))}
        <Prop at={[8.2, 0, 1.0]} seed={47}>
          <Cyl position={[0, 0.35, 0]} rt={0.42} rb={0.5} h={0.7} color={CLAY.espresso} />
          <Roll position={[0.25, 1.2, 0]} rotation={[0, 0, -0.35]} r={0.05} len={1.3} color={CLAY.cream} />
        </Prop>
      </ClayWorld>
    );
  }
  const sky = scene === 'storm' ? '#5A1A10' : '#3A2016';
  return (
    <ClayWorld sky={sky} floor={scene === 'storm' ? '#4A1810' : '#5A3322'} cam={{ pos: [b.p[0], 2.2 + b.p[1], 14], look: [0, 1.8, 0] }} sun={[-6, 5, 3]} warm={scene === 'storm' ? '#FF9A7A' : '#FFC890'} fog={[sky, 16, 46]}>
      <Sun3D position={[0, 3, -30]} r={4.5} color={scene === 'storm' ? '#8A2A1A' : '#7A4A2A'} />
      {[[-11, -12, 7, 3.4], [-2, -16, 9, 2.6], [9, -13, 7, 3.8], [16, -18, 8, 2.8]].map(([x, z, w, h], i) => (
        <Prop key={i} at={[x, 0, z]} seed={i + 20}><Mesa3D w={w} h={h} seed={i} color={i % 2 ? CLAY.bronze : CLAY.rust} /></Prop>
      ))}
    </ClayWorld>
  );
};

// ---- models (ground point at origin, facing +x) -----------------------------------------------

/** Boil wrapper: puts a model at `at`, with stop-motion wobble. */
export const Prop: React.FC<{ at: V3; seed: number; rotY?: number; scale?: number; children: React.ReactNode }> = ({ at, seed, rotY = 0, scale = 1, children }) => {
  const f = useCurrentFrame();
  const b = boil3(f, seed);
  return <group position={[at[0] + b.p[0], at[1] + b.p[1], at[2] + b.p[2]]} rotation={[0, rotY + b.r, b.r * 0.5]} scale={scale}>{children}</group>;
};

/** Dromedary camel. phase (stepped) swings the legs. ONLY after the reveal. */
export const Camel3D: React.FC<{ phase?: number; color?: string }> = ({ phase = 0, color = CLAY.camel }) => {
  const a = Math.sin(phase) * 0.18;
  // leg = thick thigh blob + long shin roll + knobby knee + flat foot pad
  const leg = (x: number, z: number, sw: number) => (
    <group position={[x, 1.42, z]} rotation={[0, 0, sw]}>
      <Blob position={[0, -0.12, 0]} scale={[0.2, 0.32, 0.16]} color={color} />
      <Roll position={[0, -0.86, 0]} r={0.085} len={0.98} color={color} />
      <Blob position={[0, -0.6, 0]} scale={0.11} color={color} />
      <Blob position={[0.04, -1.37, 0]} scale={[0.15, 0.05, 0.13]} color={CLAY.hide} />
    </group>
  );
  return (
    <group>
      <Blob position={[0, 1.6, 0]} scale={[1.0, 0.46, 0.44]} color={color} />
      <Blob position={[-0.1, 2.05, 0]} scale={[0.42, 0.5, 0.36]} color={color} />
      <Roll position={[0.9, 1.78, 0]} rotation={[0, 0, -1.25]} r={0.2} len={0.45} color={color} />
      <Roll position={[1.24, 2.15, 0]} rotation={[0, 0, -0.25]} r={0.16} len={0.55} color={color} />
      <Blob position={[1.5, 2.55, 0]} scale={[0.34, 0.17, 0.17]} color={color} />
      <Blob position={[1.78, 2.5, 0]} scale={[0.12, 0.1, 0.12]} color={CLAY.hide} />
      <Blob position={[1.42, 2.66, 0.12]} scale={0.04} color={CLAY.espresso} />
      <Blob position={[1.42, 2.66, -0.12]} scale={0.04} color={CLAY.espresso} />
      <Blob position={[1.3, 2.72, 0.1]} scale={[0.05, 0.09, 0.04]} color={color} />
      <Roll position={[-1.0, 1.4, 0]} rotation={[0, 0, 0.35]} r={0.045} len={0.45} color={CLAY.hide} />
      {leg(0.62, 0.2, a)}{leg(0.62, -0.2, -a)}{leg(-0.62, 0.2, -a)}{leg(-0.62, -0.2, a)}
    </group>
  );
};

/** A frontier person: hat, coat, legs that walk (phase), optional pointing arm. */
export const Person3D: React.FC<{ phase?: number; coat?: string; pants?: string; hat?: string; pose?: 'stand' | 'walk' | 'point'; skirt?: boolean }> = ({ phase = 0, coat = CLAY.rust, pants = CLAY.espresso, hat = CLAY.espresso, pose = 'stand', skirt = false }) => {
  const sw = pose === 'walk' ? Math.sin(phase) * 0.4 : 0;
  return (
    <group>
      {skirt
        ? <Cyl position={[0, 0.45, 0]} rt={0.2} rb={0.38} h={0.9} color={coat} />
        : <>
          <group position={[0, 0.82, 0.1]} rotation={[0, 0, sw]}><Roll position={[0, -0.4, 0]} r={0.09} len={0.65} color={pants} /></group>
          <group position={[0, 0.82, -0.1]} rotation={[0, 0, -sw]}><Roll position={[0, -0.4, 0]} r={0.09} len={0.65} color={pants} /></group>
        </>}
      <Roll position={[0, 1.18, 0]} r={0.22} len={0.42} color={coat} />
      <Blob position={[0.02, 1.7, 0]} scale={0.19} color={CLAY.skin} />
      <Cyl position={[0, 1.86, 0]} rt={0.3} rb={0.3} h={0.04} color={hat} />
      <Cyl position={[0, 1.96, 0]} rt={0.14} rb={0.17} h={0.2} color={hat} />
      <group position={[0, 1.35, 0.26]} rotation={pose === 'point' ? [0, 0, -1.35] : [0, 0, -sw * 0.6]}><Roll position={[0, -0.28, 0]} r={0.07} len={0.4} color={coat} /></group>
      <group position={[0, 1.35, -0.26]} rotation={[0, 0, sw * 0.6]}><Roll position={[0, -0.28, 0]} r={0.07} len={0.4} color={coat} /></group>
    </group>
  );
};

/** Covered wagon. turn = wheel rotation. */
export const Wagon3D: React.FC<{ turn?: number }> = ({ turn = 0 }) => (
  <group>
    <Slab position={[0, 0.85, 0]} size={[2.4, 0.4, 1.2]} color={CLAY.wood} />
    <mesh position={[0, 1.05, 0]} rotation={[Math.PI / 2, 0, Math.PI / 2]} castShadow>
      <cylinderGeometry args={[0.62, 0.62, 2.2, 24, 1, true, 0, Math.PI]} />
      <ClayMat color={CLAY.canvas} />
    </mesh>
    {[[-0.85, 0.62], [0.85, 0.62], [-0.85, -0.62], [0.85, -0.62]].map(([x, z], i) => (
      <mesh key={i} position={[x, 0.45, z]} rotation={[0, 0, turn]} castShadow>
        <torusGeometry args={[0.4, 0.06, 10, 24]} />
        <ClayMat color={CLAY.espresso} />
      </mesh>
    ))}
    <Roll position={[1.7, 0.6, 0]} rotation={[0, 0, Math.PI / 2 - 0.25]} r={0.04} len={1} color={CLAY.wood} />
  </group>
);

/** Frontier fort: log stockade, two blockhouses with pyramid roofs, flag (wave = stepped phase). */
export const Fort3D: React.FC<{ wave?: number }> = ({ wave = 0 }) => (
  <group>
    {Array.from({ length: 22 }, (_, i) => -3.1 + i * 0.3).map((x, i) => (
      <group key={i}>
        <Cyl position={[x, 0.85, 0]} rt={0.14} rb={0.15} h={1.7} color={i % 2 ? CLAY.wood : CLAY.saddle} />
        <Cyl position={[x, 1.85, 0]} rt={0} rb={0.14} h={0.3} seg={10} color={i % 2 ? CLAY.wood : CLAY.saddle} />
      </group>
    ))}
    {[-3.8, 3.8].map((x) => (
      <group key={x}>
        <Slab position={[x, 1.3, 0]} size={[1.3, 2.6, 1.3]} color={CLAY.bronze} />
        <Cyl position={[x, 3.0, 0]} rt={0} rb={1.1} h={0.9} seg={4} rotation={[0, Math.PI / 4, 0]} color={CLAY.rust} />
        <Slab position={[x + 0.66, 1.9, 0]} size={[0.05, 0.14, 0.5]} color={CLAY.gold} />
      </group>
    ))}
    <Cyl position={[0, 2.4, 0]} rt={0.04} rb={0.05} h={2.6} color={CLAY.espresso} />
    <Slab position={[0.45, 3.4, 0]} rotation={[0, Math.sin(wave) * 0.35, Math.sin(wave * 1.3) * 0.08]} size={[0.8, 0.5, 0.05]} color={CLAY.gold} radius={0.02} />
  </group>
);

/** Three-masted ship with crated, covered deck cargo (nothing alive visible). */
export const Ship3D: React.FC = () => (
  <group>
    <Blob position={[0, 0.5, 0]} scale={[3.6, 0.75, 0.95]} color={CLAY.espresso} />
    <Slab position={[0, 1.05, 0]} size={[6.4, 0.18, 1.5]} color={CLAY.wood} />
    {[-1.8, 0, 1.8].map((x) => (
      <group key={x}>
        <Cyl position={[x, 3.2, 0]} rt={0.06} rb={0.08} h={4.3} color={CLAY.espresso} />
        <Slab position={[x, 4.3, 0.06]} size={[1.6, 1.3, 0.08]} color={CLAY.canvas} radius={0.03} />
        <Slab position={[x, 2.75, 0.06]} size={[2.0, 1.4, 0.08]} color={CLAY.canvas} radius={0.03} />
      </group>
    ))}
    {[-2.7, -0.9, 0.9].map((x, i) => <Slab key={i} position={[x, 1.45, 0]} size={[0.8, 0.6, 0.9]} color={i % 2 ? CLAY.canvas : CLAY.sandDeep} radius={0.12} />)}
    <Cyl position={[3.5, 1.5, 0]} rotation={[0, 0, -1.1]} rt={0.04} rb={0.05} h={2.4} color={CLAY.espresso} />
  </group>
);

/** Saguaro cactus. */
export const Saguaro3D: React.FC<{ s?: number }> = ({ s = 1 }) => (
  <group scale={s}>
    <Roll position={[0, 1.5, 0]} r={0.26} len={2.6} color={CLAY.sage} />
    <Roll position={[-0.42, 1.55, 0]} rotation={[0, 0, Math.PI / 2]} r={0.18} len={0.45} color={CLAY.sage} />
    <Roll position={[-0.66, 2.1, 0]} r={0.18} len={0.9} color={CLAY.sage} />
    <Roll position={[0.4, 2.0, 0]} rotation={[0, 0, Math.PI / 2]} r={0.17} len={0.4} color={CLAY.sage} />
    <Roll position={[0.6, 2.5, 0]} r={0.17} len={0.75} color={CLAY.sage} />
  </group>
);

/** Horse skull lying on the sand. */
export const Skull3D: React.FC = () => (
  <group rotation={[0, 0, -0.12]}>
    <Blob position={[0, 0.32, 0]} scale={[0.55, 0.32, 0.38]} color={CLAY.bone} />
    <Blob position={[0.75, 0.24, 0]} scale={[0.72, 0.18, 0.22]} color={CLAY.bone} />
    <Blob position={[0.12, 0.42, 0.26]} scale={[0.15, 0.1, 0.06]} color={CLAY.saddle} />
    <Blob position={[0.12, 0.42, -0.26]} scale={[0.15, 0.1, 0.06]} color={CLAY.saddle} />
    {[0, 1, 2, 3].map((i) => <Blob key={i} position={[0.55 + i * 0.16, 0.08, 0.14]} scale={[0.05, 0.07, 0.04]} color={CLAY.cream} />)}
  </group>
);

/** Flat-topped mesa (low-poly, clay). */
export const Mesa3D: React.FC<{ w?: number; h?: number; color?: string; seed?: number }> = ({ w = 3, h = 2, color = CLAY.rust, seed = 1 }) => (
  <group>
    <Cyl position={[0, h / 2, 0]} rt={w * 0.42} rb={w * 0.55} h={h} seg={7} rotation={[0, seed, 0]} color={color} />
    <Cyl position={[0, h + 0.05, 0]} rt={w * 0.4} rb={w * 0.43} h={0.12} seg={7} rotation={[0, seed, 0]} color={CLAY.ochre} />
  </group>
);

/** Adobe building block. */
export const Adobe3D: React.FC<{ w?: number; h?: number; color?: string }> = ({ w = 3, h = 2, color = CLAY.adobe }) => (
  <group>
    <Slab position={[0, h / 2, 0]} size={[w, h, 1.6]} color={color} radius={0.12} />
    <Slab position={[0, 0.55, 0.8]} size={[0.6, 1.1, 0.08]} color={CLAY.espresso} radius={0.04} />
    {Array.from({ length: Math.floor(w / 0.6) }, (_, i) => <Cyl key={i} position={[-w / 2 + 0.3 + i * 0.6, h - 0.3, 0.85]} rotation={[Math.PI / 2, 0, 0]} rt={0.06} rb={0.06} h={0.35} color={CLAY.wood} />)}
    {[-w / 3, w / 3].map((x) => <Slab key={x} position={[x, h * 0.6, 0.8]} size={[0.45, 0.45, 0.06]} color={CLAY.bronze} radius={0.03} />)}
  </group>
);

/** Soaring vulture (flap = 0..1). */
export const Vulture3D: React.FC<{ flap?: number }> = ({ flap = 0 }) => (
  <group>
    <Blob scale={[0.3, 0.12, 0.12]} color={CLAY.espresso} />
    <Blob position={[0, 0.05, 0.55]} rotation={[0.3 + flap * 0.5, 0, 0]} scale={[0.25, 0.04, 0.55]} color={CLAY.espresso} />
    <Blob position={[0, 0.05, -0.55]} rotation={[-0.3 - flap * 0.5, 0, 0]} scale={[0.25, 0.04, 0.55]} color={CLAY.espresso} />
  </group>
);

/** Clay sun / moon (self-lit disc far away). */
export const Sun3D: React.FC<{ position: V3; r: number; color: string }> = ({ position, r, color }) => (
  <mesh position={position}>
    <sphereGeometry args={[r, 32, 24]} />
    <meshBasicMaterial color={color} />
  </mesh>
);

/** Rolled-clay sea: rows of long blue rolls that bob (phase = stepped). */
export const Sea3D: React.FC<{ phase: number; rows?: number; z0?: number }> = ({ phase, rows = 6, z0 = -2 }) => (
  <group>
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.05, 0]} receiveShadow><planeGeometry args={[80, 80]} /><ClayMat color={CLAY.sea} /></mesh>
    {Array.from({ length: rows }, (_, r) => (
      <Roll key={r} position={[Math.sin(phase + r) * 0.4, 0.12 + Math.sin(phase * 1.3 + r * 1.7) * 0.06, z0 + r * 1.6]} rotation={[0, 0, Math.PI / 2]} r={0.12} len={30} color={r % 2 ? CLAY.seaLight : CLAY.sea} />
    ))}
  </group>
);

/** A clay bust (a stand-in for a period photograph; not a likeness). */
export const Bust3D: React.FC<{ coat?: string; hair?: string }> = ({ coat = CLAY.espresso, hair = CLAY.bronze }) => (
  <group>
    <Blob position={[0, 0.55, 0]} scale={[0.95, 0.6, 0.5]} color={coat} />
    <Cyl position={[0, 1.15, 0]} rt={0.16} rb={0.2} h={0.35} color={CLAY.skin} />
    <Blob position={[0, 1.6, 0]} scale={[0.36, 0.44, 0.38]} color={CLAY.skin} />
    <Blob position={[-0.04, 1.86, 0]} scale={[0.38, 0.22, 0.4]} color={hair} />
    <Blob position={[0.3, 1.45, 0]} scale={[0.08, 0.05, 0.22]} color={hair} />
    <Blob position={[0.3, 1.66, 0.13]} scale={0.04} color={CLAY.espresso} />
    <Blob position={[0.3, 1.66, -0.13]} scale={0.04} color={CLAY.espresso} />
    <Slab position={[0.38, 0.9, 0]} size={[0.1, 0.35, 0.3]} color={CLAY.cream} radius={0.04} />
  </group>
);
