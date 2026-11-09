// FLAT-WEST kit: flat vector Old West illustration primitives for the "flat2d" style (scenes drawn
// entirely in code, no photos). NOT a shot. Vintage-Western-poster look: layered flat silhouettes,
// warm sunsets, brand palette. Every primitive is an SVG <g> placed inside a 1920x1080 <svg>;
// coordinates are px with the origin at the object's ground point (bottom-centre) unless noted.
// Motion comes from props (phase, flap, wave offset) that the scene derives from the frame:
// deterministic, frame-based, no state. Built for ows-camels (2026-11-09).
import React from 'react';
import { COLORS } from '../brand';

/** Seeded pseudo-random in [0, 1). */
export const srand = (seed: number) => {
  const x = Math.sin(seed * 9999.17) * 10000;
  return x - Math.floor(x);
};

/** Flat palette (brand tokens + a few scene tones derived from them). */
export const FW = {
  night: COLORS.d900, espresso: COLORS.d800, bronze: COLORS.d600, saddle: COLORS.muted, dust: COLORS.d400,
  bone: COLORS.d300, paper: COLORS.paper, cream: COLORS.cream, rust: COLORS.accent, ochre: COLORS.accent2,
  gold: COLORS.warn, blood: COLORS.danger, sage: COLORS.signal,
  sand: '#E2BE82', sandDeep: '#C9955A', adobe: '#C98B5E', adobeDark: '#A86B45', sky: '#F3D9A8',
} as const;

// ---- sky + light ---------------------------------------------------------------------

/** Full-frame vertical gradient sky. `stops` = [offset 0..1, color]. */
export const Sky: React.FC<{ id: string; stops: [number, string][] }> = ({ id, stops }) => (
  <g>
    <defs>
      <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
        {stops.map(([o, c], i) => <stop key={i} offset={o} stopColor={c} />)}
      </linearGradient>
    </defs>
    <rect width={1920} height={1080} fill={`url(#${id})`} />
  </g>
);

/** Flat sun / moon disc with concentric halo rings (poster style, no blur). */
export const Sun: React.FC<{ x: number; y: number; r: number; color: string; halo?: string; rings?: number }> = ({ x, y, r, color, halo, rings = 3 }) => (
  <g>
    {halo && Array.from({ length: rings }, (_, i) => (
      <circle key={i} cx={x} cy={y} r={r * (1 + (rings - i) * 0.35)} fill={halo} opacity={0.12 + i * 0.06} />
    ))}
    <circle cx={x} cy={y} r={r} fill={color} />
  </g>
);

/** Seeded star field in the top `h` px. */
export const Stars: React.FC<{ seed?: number; count?: number; h?: number; opacity?: number; color?: string }> = ({ seed = 1, count = 70, h = 420, opacity = 1, color = FW.cream }) => (
  <g opacity={opacity}>
    {Array.from({ length: count }, (_, i) => (
      <circle key={i} cx={srand(seed + i) * 1920} cy={srand(seed + i * 7.3) * h} r={1 + srand(seed + i * 3.1) * 2.2} fill={color} opacity={0.4 + srand(seed + i * 5.7) * 0.6} />
    ))}
  </g>
);

// ---- land ------------------------------------------------------------------------------

/** Flat silhouette band across the frame from `y` (top of the land) down. mesa = flat-topped buttes. */
export const Land: React.FC<{ y: number; color: string; seed?: number; amp?: number; mesa?: boolean; segments?: number; dx?: number }> = ({ y, color, seed = 1, amp = 60, mesa = false, segments = 9, dx = 0 }) => {
  const pts: string[] = [`${-200 + dx},1080`, `${-200 + dx},${y}`];
  const w = 2320 / segments;
  for (let i = 0; i <= segments; i++) {
    const x = -200 + dx + i * w;
    const hgt = srand(seed + i * 1.7) * amp;
    if (mesa && srand(seed + i * 4.1) > 0.45) {
      const top = y - amp * 0.6 - hgt * 0.8;
      pts.push(`${x + w * 0.15},${y}`, `${x + w * 0.28},${top}`, `${x + w * 0.72},${top}`, `${x + w * 0.85},${y}`);
    } else {
      pts.push(`${x + w * 0.5},${y - hgt * 0.5}`);
    }
  }
  pts.push(`${2120 + dx},${y}`, `${2120 + dx},1080`);
  return <polygon points={pts.join(' ')} fill={color} />;
};

/** Rolling dunes: soft sine ridge from `y`. */
export const Dunes: React.FC<{ y: number; color: string; amp?: number; len?: number; phase?: number }> = ({ y, color, amp = 30, len = 700, phase = 0 }) => {
  let d = `M -20 1080 L -20 ${y}`;
  for (let x = -20; x <= 1940; x += 40) d += ` L ${x} ${y + Math.sin((x + phase) / len * Math.PI * 2) * amp}`;
  d += ' L 1940 1080 Z';
  return <path d={d} fill={color} />;
};

/** Water: flat sea from `y` with moving wave dashes. */
export const Sea: React.FC<{ y: number; color: string; line: string; phase: number; rows?: number }> = ({ y, color, line, phase, rows = 7 }) => (
  <g>
    <rect x={0} y={y} width={1920} height={1080 - y} fill={color} />
    {Array.from({ length: rows }, (_, r) => {
      const yy = y + 24 + r * r * 9 + r * 18;
      const amp = 3 + r * 1.6;
      let d = '';
      for (let x = -40; x <= 1960; x += 30) d += `${d ? ' L' : 'M'} ${x} ${yy + Math.sin((x + phase * (1 + r * 0.3) + r * 90) / 90) * amp}`;
      return <path key={r} d={d} fill="none" stroke={line} strokeWidth={2 + r * 0.6} opacity={0.35 + r * 0.06} strokeDasharray={`${40 + r * 14} ${30 + r * 10}`} />;
    })}
  </g>
);

// ---- figures + things (origin = ground point, bottom-centre) ------------------------------

/** A person silhouette (frontier coat + hat), facing right. phase drives a walk; pose 'point' raises an arm. */
export const Person: React.FC<{ x: number; y: number; s?: number; color: string; phase?: number; pose?: 'stand' | 'walk' | 'point'; hat?: boolean; skirt?: boolean }> = ({ x, y, s = 1, color, phase = 0, pose = 'stand', hat = true, skirt = false }) => {
  const sw = pose === 'walk' ? Math.sin(phase) * 18 : 0;
  const bob = pose === 'walk' ? Math.abs(Math.cos(phase)) * 3 : 0;
  const hand: [number, number] = pose === 'point' ? [62, -168] : [6 + sw * 0.5, -96];
  return (
    <g transform={`translate(${x} ${y - bob}) scale(${s})`} stroke={color} strokeLinecap="round" fill={color}>
      {!skirt && <><line x1={-6} y1={-92} x2={-6 + sw} y2={0} strokeWidth={13} /><line x1={6} y1={-92} x2={6 - sw} y2={0} strokeWidth={13} /></>}
      {skirt
        ? <path d="M -16 -160 L 16 -160 L 34 0 L -34 0 Z" stroke="none" />
        : <path d="M -17 -162 L 17 -162 L 21 -84 L -21 -84 Z" stroke="none" />}
      <line x1={-4} y1={-150} x2={-10 - sw * 0.4} y2={-96} strokeWidth={10} />
      <line x1={8} y1={-152} x2={hand[0]} y2={hand[1]} strokeWidth={10} />
      <circle cx={0} cy={-178} r={14} stroke="none" />
      {hat && !skirt && <><rect x={-25} y={-192} width={50} height={6} rx={3} stroke="none" /><rect x={-13} y={-212} width={26} height={22} rx={5} stroke="none" /></>}
      {skirt && <ellipse cx={0} cy={-192} rx={20} ry={9} stroke="none" />}
    </g>
  );
};

/** Covered wagon, facing right. */
export const Wagon: React.FC<{ x: number; y: number; s?: number; color: string; canvas: string; turn?: number }> = ({ x, y, s = 1, color, canvas, turn = 0 }) => {
  const wheel = (cx: number, r: number) => (
    <g transform={`translate(${cx} ${-r}) rotate(${turn})`}>
      <circle r={r} fill="none" stroke={color} strokeWidth={7} />
      {Array.from({ length: 6 }, (_, i) => <line key={i} x1={0} y1={0} x2={Math.cos((i * Math.PI) / 3) * r} y2={Math.sin((i * Math.PI) / 3) * r} stroke={color} strokeWidth={4} />)}
    </g>
  );
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M -112 -84 L -102 -168 Q 0 -206 102 -168 L 112 -84 Z" fill={canvas} />
      {[-60, 0, 60].map((r) => <line key={r} x1={r} y1={-84} x2={r * 0.92} y2={-186 + Math.abs(r) * 0.25} stroke={color} strokeWidth={3} opacity={0.5} />)}
      <rect x={-124} y={-88} width={248} height={42} fill={color} />
      <line x1={124} y1={-60} x2={210} y2={-40} stroke={color} strokeWidth={6} />
      {wheel(-82, 34)}{wheel(84, 38)}
    </g>
  );
};

/** Saguaro cactus. */
export const Saguaro: React.FC<{ x: number; y: number; s?: number; color: string; flip?: boolean }> = ({ x, y, s = 1, color, flip = false }) => (
  <g transform={`translate(${x} ${y}) scale(${flip ? -s : s} ${s})`} stroke={color} strokeLinecap="round" strokeLinejoin="round" fill="none">
    <line x1={0} y1={0} x2={0} y2={-260} strokeWidth={34} />
    <polyline points="0,-112 -48,-112 -48,-188" strokeWidth={26} />
    <polyline points="0,-150 44,-150 44,-222" strokeWidth={24} />
  </g>
);

/** A dromedary (one hump), facing right. phase animates the legs + bob. ONLY use after the reveal. */
export const Camel: React.FC<{ x: number; y: number; s?: number; color: string; phase?: number }> = ({ x, y, s = 1, color, phase = 0 }) => {
  const a = Math.sin(phase) * 14;
  const bob = Math.abs(Math.sin(phase)) * 4;
  const leg = (hx: number, hy: number, dx: number, w = 12) => <path d={`M ${hx - w / 2} ${hy} L ${hx + w / 2} ${hy} L ${hx + dx + w / 2 - 2} 0 L ${hx + dx - w / 2 + 2} 0 Z`} />;
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} fill={color}>
      <g transform={`translate(-150 ${-260 - bob})`}>
        <path d="M 60 112 C 70 70, 100 40, 136 38 C 172 36, 192 72, 206 96 C 222 104, 238 118, 252 106 C 258 92, 258 74, 266 62 L 288 60 C 296 62, 300 70, 294 80 L 272 82 C 266 96, 266 120, 252 134 C 240 146, 222 146, 210 144 C 180 152, 120 154, 92 148 C 74 144, 62 132, 60 112 Z" />
        <path d="M 62 120 L 52 160 L 47 158 L 55 118 Z" />
      </g>
      {leg(-60, -116 - bob, a)}{leg(-44, -118 - bob, -a)}{leg(58, -120 - bob, -a)}{leg(74, -118 - bob, a)}
    </g>
  );
};

/** Horse skull lying on the ground, facing right. */
export const HorseSkull: React.FC<{ x: number; y: number; s?: number; color: string; shade: string }> = ({ x, y, s = 1, color, shade }) => (
  <g transform={`translate(${x} ${y}) scale(${s}) translate(-150 -100)`}>
    <path d="M 12 62 C 10 30, 60 14, 110 18 L 268 40 C 290 44, 296 62, 284 72 L 204 84 L 182 100 L 120 96 C 90 108, 40 100, 22 86 Z" fill={color} />
    <ellipse cx={92} cy={48} rx={20} ry={13} fill={shade} />
    <path d="M 200 50 L 262 54" stroke={shade} strokeWidth={4} strokeLinecap="round" />
    {[0, 1, 2, 3, 4].map((i) => <line key={i} x1={136 + i * 12} y1={92} x2={138 + i * 12} y2={100} stroke={shade} strokeWidth={4} />)}
    <ellipse cx={150} cy={104} rx={150} ry={8} fill={shade} opacity={0.35} />
  </g>
);

/** Three-masted ship, facing right; cargo deck holds covered crates (nothing alive visible). */
export const Ship: React.FC<{ x: number; y: number; s?: number; color: string; sail: string; tilt?: number }> = ({ x, y, s = 1, color, sail, tilt = 0 }) => (
  <g transform={`translate(${x} ${y}) rotate(${tilt}) scale(${s})`}>
    {[-150, 0, 150].map((m) => (
      <g key={m}>
        <line x1={m} y1={-40} x2={m} y2={-340} stroke={color} strokeWidth={7} />
        <path d={`M ${m - 70} -312 L ${m + 70} -312 L ${m + 80} -200 L ${m - 80} -200 Z`} fill={sail} />
        <path d={`M ${m - 90} -190 L ${m + 90} -190 L ${m + 100} -70 L ${m - 100} -70 Z`} fill={sail} />
      </g>
    ))}
    <path d="M 320 -42 L 170 -330 L 176 -64 Z" fill={sail} opacity={0.9} />
    {[-245, -75, 75].map((cx, i) => (
      <g key={i}>
        <rect x={cx - 42} y={-86} width={84} height={46} rx={6} fill={sail} opacity={0.75} />
        <line x1={cx - 42} y1={-66} x2={cx + 42} y2={-62} stroke={color} strokeWidth={3} />
      </g>
    ))}
    <path d="M -310 -44 L 330 -44 L 286 26 L -276 26 Z" fill={color} />
    {[-220, -110, 0, 110, 220].map((px) => <circle key={px} cx={px} cy={-14} r={7} fill={sail} opacity={0.5} />)}
  </g>
);

/** Frontier fort: log stockade + two blockhouses + flagpole. Origin = ground centre; width ~840. */
export const Fort: React.FC<{ x: number; y: number; s?: number; color: string; light?: string; wave?: number }> = ({ x, y, s = 1, color, light, wave = 0 }) => {
  const logs = Array.from({ length: 30 }, (_, i) => -300 + i * 20);
  let flag = 'M 0 -360';
  for (let k = 0; k <= 8; k++) flag += ` L ${k * 12} ${-360 + Math.sin(wave + k * 0.7) * 6}`;
  for (let k = 8; k >= 0; k--) flag += ` L ${k * 12} ${-318 + Math.sin(wave + k * 0.7) * 6}`;
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} fill={color}>
      {logs.map((lx) => <path key={lx} d={`M ${lx} 0 L ${lx} -150 L ${lx + 9} -166 L ${lx + 18} -150 L ${lx + 18} 0 Z`} />)}
      {[-420, 300].map((bx) => (
        <g key={bx}>
          <rect x={bx} y={-230} width={120} height={230} />
          <path d={`M ${bx - 14} -230 L ${bx + 60} -282 L ${bx + 134} -230 Z`} />
          {light && [24, 64].map((w) => <rect key={w} x={bx + w} y={-190} width={24} height={10} fill={light} />)}
        </g>
      ))}
      <rect x={-46} y={-118} width={92} height={118} fill={light ?? color} opacity={light ? 0.35 : 1} />
      <line x1={0} y1={-166} x2={0} y2={-366} stroke={color} strokeWidth={6} />
      <path d={flag + ' Z'} fill={light ?? color} />
    </g>
  );
};

/** Adobe building block (flat roof, vigas, door, windows). Origin = ground left corner. */
export const Adobe: React.FC<{ x: number; y: number; w: number; h: number; color: string; shade: string; door?: boolean }> = ({ x, y, w, h, color, shade, door = true }) => (
  <g transform={`translate(${x} ${y})`}>
    <rect x={0} y={-h} width={w} height={h} fill={color} />
    <rect x={0} y={-h} width={w} height={14} fill={shade} opacity={0.45} />
    {Array.from({ length: Math.floor(w / 46) }, (_, i) => <rect key={i} x={20 + i * 46} y={-h + 18} width={22} height={9} fill={shade} />)}
    {door && <rect x={w / 2 - 26} y={-104} width={52} height={104} fill={shade} />}
    {Array.from({ length: Math.max(0, Math.floor(w / 140) - 0) }, (_, i) => <rect key={i} x={24 + i * 140} y={-h + 60} width={40} height={50} fill={shade} opacity={door && Math.abs(24 + i * 140 + 20 - w / 2) < 60 ? 0 : 1} />)}
  </g>
);

/** Circling vulture (flap 0..1). */
export const Vulture: React.FC<{ x: number; y: number; s?: number; color: string; flap: number }> = ({ x, y, s = 1, color, flap }) => (
  <path transform={`translate(${x} ${y}) scale(${s})`} d={`M -46 0 Q -22 ${-18 * flap - 4} 0 0 Q 22 ${-18 * flap - 4} 46 0`} fill="none" stroke={color} strokeWidth={6} strokeLinecap="round" />
);

/** Telegraph / utility pole (for "today" scenes). */
export const Pole: React.FC<{ x: number; y: number; s?: number; color: string }> = ({ x, y, s = 1, color }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} stroke={color} strokeLinecap="round">
    <line x1={0} y1={0} x2={0} y2={-220} strokeWidth={8} />
    <line x1={-34} y1={-196} x2={34} y2={-196} strokeWidth={7} />
  </g>
);
