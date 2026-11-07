// Visual STYLE kits for narrated documentary videos. NOT a shot. The make-tsx style gate asks the
// creator for one of three looks per video; "default" is lib/frontier.tsx as-is, and this file
// adds the other two:
//
//   CUTOUT     paper cut-out collage: construction-paper backdrops, torn-edge paper pieces with
//              hard lifted shadows, photos as white-bordered cut prints, stop-motion on threes.
//   CLAYMATION plasticine set: rounded clay shapes with a fingerprint/bump surface, soft key light
//              and contact shadows, puffy clay lettering, squash-and-stretch, stop-motion on twos.
//
// Both are STOP-MOTION: motion is quantized (held poses) and every piece "boils" (a seeded 1-2 px
// wobble per held pose). Deterministic: everything derives from the frame + a seed, never Math.random.
// Colors/fonts still come from the brand contract, so the channel stays recognisable in every style.
import React from 'react';
import { AbsoluteFill, Img, interpolate } from 'remotion';
import { COLORS, EASINGS } from '../brand';
import { FONT_DISPLAY, FONT_BODY } from '../fonts';

const CLAMP = { extrapolateLeft: 'clamp' as const, extrapolateRight: 'clamp' as const };
export type VisualStyle = 'default' | 'cutout' | 'claymation';

// ---- stop-motion timing -----------------------------------------------------------

/** Quantize a 30 fps frame to held poses: hold=3 -> 10 poses/s ("on threes"), hold=2 -> 15/s. */
export const stepped = (frame: number, hold = 3) => Math.floor(frame / hold) * hold;

/** Deterministic pseudo-random in [-1, 1] for (seed, n). */
export const rnd = (seed: number, n: number) => {
  const x = Math.sin(seed * 127.1 + n * 311.7) * 43758.5453;
  return (x - Math.floor(x)) * 2 - 1;
};

/** Per-pose wobble: {x, y, r} that changes every `hold` frames. amp px / deg. */
export const boil = (frame: number, seed: number, amp = 1.5, hold = 3) => {
  const n = Math.floor(frame / hold);
  return { x: rnd(seed, n) * amp, y: rnd(seed + 9, n) * amp, r: rnd(seed + 17, n) * amp * 0.25 };
};

/** Stepped, eased 0..1 between frames a..b (motion snaps between held poses). */
export const stepRamp = (frame: number, a: number, b: number, hold = 3, from = 0, to = 1, easing = EASINGS.easeOut) =>
  interpolate(stepped(frame, hold), [a, Math.max(b, a + 1)], [from, to], { ...CLAMP, easing });

// ---- CUTOUT ---------------------------------------------------------------------

/** Jagged torn-paper outline as a CSS polygon (deterministic per seed). */
export const tornPolygon = (seed: number, rough = 1.2, teeth = 26) => {
  const pts: string[] = [];
  const edge = (i: number, n: number, f: (t: number, j: number) => [number, number]) => {
    for (let k = 0; k < n; k++) pts.push(f(k / n, i * 100 + k).map((v) => `${v.toFixed(2)}%`).join(' '));
  };
  const j = (n: number) => rnd(seed, n) * rough;
  edge(0, teeth, (t, n) => [t * 100, Math.abs(j(n))]); // top
  edge(1, Math.round(teeth * 0.6), (t, n) => [100 - Math.abs(j(n)), t * 100]); // right
  edge(2, teeth, (t, n) => [100 - t * 100, 100 - Math.abs(j(n))]); // bottom
  edge(3, Math.round(teeth * 0.6), (t, n) => [Math.abs(j(n)), 100 - t * 100]); // left
  return `polygon(${pts.join(', ')})`;
};

/** Construction-paper backdrop with fibre texture; optional torn horizon strips (mountains). */
export const CraftPaperBg: React.FC<{ color?: string; strips?: { color: string; top: number; seed: number }[] }> = ({ color = COLORS.paper, strips = [] }) => (
  <AbsoluteFill style={{ backgroundColor: color }}>
    <AbsoluteFill>
      <svg width="100%" height="100%">
        <filter id="craftfibre">
          <feTurbulence type="fractalNoise" baseFrequency="0.9 0.06" numOctaves={2} seed={3} />
          <feColorMatrix values="0 0 0 0 0.3  0 0 0 0 0.2  0 0 0 0 0.12  0 0 0 0.35 0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#craftfibre)" opacity={0.45} />
      </svg>
    </AbsoluteFill>
    {strips.map((s, i) => (
      <div key={i} style={{ position: 'absolute', left: -40, right: -40, top: s.top, bottom: -40, filter: 'drop-shadow(0 -6px 0 rgba(26,11,6,0.28))' }}>
        <div style={{ position: 'absolute', inset: 0, background: s.color, clipPath: mountainPolygon(s.seed) }} />
      </div>
    ))}
  </AbsoluteFill>
);

/** Torn mountain-ridge silhouette polygon (top edge jagged peaks), for CraftPaperBg strips. */
export const mountainPolygon = (seed: number, peaks = 7) => {
  // irregular peak spacing + small torn-paper teeth between the main vertices
  const pts: string[] = ['0% 100%'];
  const n = peaks * 2;
  const v = Array.from({ length: n + 1 }, (_, i) => ({
    x: Math.min(100, Math.max(0, (i / n) * 100 + (i > 0 && i < n ? rnd(seed + 3, i) * (40 / n) : 0))),
    y: i % 2 === 0 ? 40 + rnd(seed, i) * 12 : 2 + Math.abs(rnd(seed, i)) * 22,
  }));
  v.forEach((p, i) => {
    pts.push(`${p.x.toFixed(2)}% ${p.y.toFixed(2)}%`);
    const q = v[i + 1];
    if (q) for (let k = 1; k < 4; k++) {
      const t = k / 4;
      pts.push(`${(p.x + (q.x - p.x) * t).toFixed(2)}% ${(p.y + (q.y - p.y) * t + rnd(seed + 7, i * 5 + k) * 1.4).toFixed(2)}%`);
    }
  });
  pts.push('100% 100%');
  return `polygon(${pts.join(', ')})`;
};

/**
 * A paper piece: torn (or clean-cut) edges, lifted hard shadow, slight tilt, boil, and a stop-motion
 * entrance that SLIDES/DROPS in (paper never fades). `from` = entrance direction.
 */
export const PaperPiece: React.FC<{
  frame: number; at: number; seed: number; children: React.ReactNode; rotate?: number; torn?: boolean;
  color?: string; padding?: number | string; from?: 'drop' | 'left' | 'right' | 'below'; style?: React.CSSProperties; hold?: number;
}> = ({ frame, at, seed, children, rotate = 0, torn = true, color = COLORS.cream, padding = 28, from = 'drop', style, hold = 3 }) => {
  const p = stepRamp(frame, at, at + 9, hold, 0, 1, EASINGS.overshoot);
  if (frame < at) return null;
  const off = { drop: [0, -60], left: [-900, 0], right: [900, 0], below: [0, 700] }[from];
  const b = boil(frame, seed, 1.2, hold);
  return (
    <div style={{
      transform: `translate(${off[0] * (1 - p) + b.x}px, ${off[1] * (1 - p) + b.y}px) rotate(${rotate + b.r}deg) scale(${from === 'drop' ? 1.06 - 0.06 * p : 1})`,
      filter: 'drop-shadow(7px 9px 0 rgba(26,11,6,0.32))', ...style,
    }}>
      <div style={{ background: color, padding, clipPath: torn ? tornPolygon(seed) : undefined }}>{children}</div>
    </div>
  );
};

/** A photo as a cut-out print: white paper border, torn outer edge, lifted shadow. */
export const CutoutPhoto: React.FC<{ frame: number; at: number; seed: number; src: string; width: number; height: number; rotate?: number; from?: 'drop' | 'left' | 'right' | 'below'; style?: React.CSSProperties; grade?: string }> = ({ frame, at, seed, src, width, height, rotate = -2, from = 'drop', style, grade }) => (
  <PaperPiece frame={frame} at={at} seed={seed} rotate={rotate} from={from} color="#FBF6EA" padding={18} style={style}>
    <Img src={src} style={{ width, height, objectFit: 'cover', display: 'block', filter: grade ?? 'sepia(0.2) contrast(1.05)' }} />
  </PaperPiece>
);

/** Text on a torn paper strip (label). Legible first: brand fonts, solid ink on paper. */
export const PaperLabel: React.FC<{ frame: number; at: number; seed: number; text: React.ReactNode; size?: number; color?: string; ink?: string; rotate?: number; font?: 'display' | 'body'; from?: 'drop' | 'left' | 'right' | 'below'; style?: React.CSSProperties }> = ({ frame, at, seed, text, size = 56, color = COLORS.cream, ink = COLORS.ink, rotate = -1.5, font = 'display', from = 'left', style }) => (
  <PaperPiece frame={frame} at={at} seed={seed} rotate={rotate} color={color} padding="14px 30px" from={from} style={style}>
    <div style={{ fontFamily: font === 'display' ? FONT_DISPLAY : FONT_BODY, fontWeight: font === 'display' ? 800 : 500, fontStyle: font === 'body' ? 'italic' : 'normal', fontSize: size, color: ink, lineHeight: 1.1, whiteSpace: 'nowrap' }}>{text}</div>
  </PaperPiece>
);

// ---- CLAYMATION -----------------------------------------------------------------

/**
 * SVG filter defs for the clay surface (bumpy, fingerprinted, softly lit). Render ONCE per shot
 * (inside the shot's root), then reference with CSS `filter: url(#clay)` or SVG `filter="url(#clay)"`.
 */
export const ClayDefs: React.FC = () => (
  <svg width={0} height={0} style={{ position: 'absolute' }}>
    <defs>
      <filter id="clay" x="-10%" y="-10%" width="120%" height="120%">
        <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves={3} seed={5} result="noise" />
        <feDiffuseLighting in="noise" surfaceScale={2.2} lightingColor="#fff4e2" result="lit">
          <feDistantLight azimuth={235} elevation={52} />
        </feDiffuseLighting>
        <feComposite in="lit" in2="SourceGraphic" operator="in" result="litShape" />
        <feBlend in="SourceGraphic" in2="litShape" mode="multiply" result="clayed" />
        <feGaussianBlur in="SourceAlpha" stdDeviation={6} result="soft" />
        <feOffset in="soft" dx={-5} dy={-6} result="hl" />
        <feComposite in="hl" in2="SourceAlpha" operator="arithmetic" k2={-1} k3={1} result="rim" />
        <feFlood floodColor="#fff1d6" floodOpacity={0.35} />
        <feComposite in2="rim" operator="in" result="highlight" />
        <feMerge><feMergeNode in="clayed" /><feMergeNode in="highlight" /></feMerge>
      </filter>
    </defs>
  </svg>
);

/** Clay set: a rolled-clay floor + back wall with soft key light and vignette. */
export const ClaySet: React.FC<{ wall?: string; floor?: string; horizon?: number }> = ({ wall = COLORS.d600, floor = COLORS.accent2, horizon = 720 }) => (
  <AbsoluteFill>
    <AbsoluteFill style={{ background: wall }} />
    <div style={{ position: 'absolute', left: -60, right: -60, top: horizon, bottom: -60, background: floor, borderRadius: '50% 50% 0 0 / 60px 60px 0 0', filter: 'url(#clay)' }} />
    <AbsoluteFill style={{ background: 'radial-gradient(1200px 700px at 38% 30%, rgba(255,236,200,0.28), transparent 70%)' }} />
    <AbsoluteFill style={{ background: 'radial-gradient(ellipse at center, transparent 50%, rgba(26,11,6,0.55) 100%)' }} />
  </AbsoluteFill>
);

/** Clay mountain range on the set: rounded blobby peaks (clay surface), behind the floor line. */
export const ClayMountains: React.FC<{ y?: number; color?: string; snow?: string; seed?: number; count?: number }> = ({ y = 760, color = COLORS.muted, snow = COLORS.cream, seed = 2, count = 6 }) => (
  <svg width={1920} height={1080} style={{ position: 'absolute', inset: 0, filter: 'url(#clay)' }}>
    {Array.from({ length: count }, (_, i) => {
      const w = 420 + Math.abs(rnd(seed, i)) * 220; const h = 300 + Math.abs(rnd(seed + 4, i)) * 200;
      const cx = -80 + (i * 2080) / (count - 1) + rnd(seed + 8, i) * 60;
      const top = y - h;
      return (
        <g key={i}>
          <path d={`M ${cx - w / 2} ${y} C ${cx - w * 0.3} ${top + h * 0.35}, ${cx - w * 0.12} ${top}, ${cx} ${top} C ${cx + w * 0.12} ${top}, ${cx + w * 0.3} ${top + h * 0.35}, ${cx + w / 2} ${y} Z`} fill={color} />
          <path d={`M ${cx - w * 0.16} ${top + h * 0.22} C ${cx - w * 0.08} ${top + h * 0.02}, ${cx + w * 0.08} ${top + h * 0.02}, ${cx + w * 0.16} ${top + h * 0.22} C ${cx + w * 0.06} ${top + h * 0.3}, ${cx - w * 0.06} ${top + h * 0.18}, ${cx - w * 0.16} ${top + h * 0.22} Z`} fill={snow} />
        </g>
      );
    })}
  </svg>
);

/**
 * A clay prop wrapper: squash-and-stretch entrance (pops up from the floor), soft contact shadow,
 * boil, stop-motion on twos. Children are any shape/text; apply `filter: url(#clay)` inside as needed.
 */
export const ClayPiece: React.FC<{ frame: number; at: number; seed: number; children: React.ReactNode; style?: React.CSSProperties; shadow?: boolean; hold?: number }> = ({ frame, at, seed, children, style, shadow = true, hold = 2 }) => {
  if (frame < at) return null;
  const f = stepped(frame, hold);
  const t = f - at;
  // squash & stretch: stretch up, overshoot, squash, settle (all stepped)
  const sy = interpolate(t, [0, 4, 8, 12, 16], [0.2, 1.18, 0.9, 1.04, 1], CLAMP);
  const sx = interpolate(t, [0, 4, 8, 12, 16], [1.3, 0.88, 1.08, 0.98, 1], CLAMP);
  const b = boil(frame, seed, 1.0, hold);
  return (
    <div style={{ position: 'relative', ...style }}>
      {shadow && <div style={{ position: 'absolute', left: '8%', right: '8%', bottom: -18, height: 36, borderRadius: '50%', background: 'rgba(20,8,4,0.45)', filter: 'blur(10px)', transform: `scaleX(${sx})` }} />}
      <div style={{ transformOrigin: '50% 100%', transform: `translate(${b.x}px, ${b.y}px) rotate(${b.r}deg) scale(${sx}, ${sy})` }}>{children}</div>
    </div>
  );
};

/** Puffy clay lettering: heavy display face, rounded thick outline, clay surface + highlight. */
export const ClayText: React.FC<{ text: React.ReactNode; size?: number; color?: string; outline?: string; style?: React.CSSProperties }> = ({ text, size = 120, color = COLORS.warn, outline = COLORS.danger, style }) => (
  <div style={{
    fontFamily: FONT_DISPLAY, fontWeight: 900, fontSize: size, lineHeight: 1.05, color, letterSpacing: 2,
    WebkitTextStroke: `${Math.round(size / 14)}px ${outline}`, paintOrder: 'stroke fill',
    textShadow: `0 ${Math.round(size / 18)}px 0 ${outline}, 0 ${Math.round(size / 9)}px ${Math.round(size / 8)}px rgba(20,8,4,0.5)`,
    filter: 'url(#clay)', whiteSpace: 'nowrap', ...style,
  } as React.CSSProperties}>{text}</div>
);

/** A clay slab (rounded rectangle of clay) to carry readable text/labels, e.g. ledgers, signs. */
export const ClaySlab: React.FC<{ children: React.ReactNode; color?: string; width?: number | string; padding?: number | string; style?: React.CSSProperties }> = ({ children, color = COLORS.cream, width, padding = '34px 48px', style }) => (
  <div style={{ position: 'relative', width, ...style }}>
    <div style={{ position: 'absolute', inset: 0, background: color, borderRadius: 34, filter: 'url(#clay)', boxShadow: 'inset 0 -10px 0 rgba(26,11,6,0.18)' }} />
    <div style={{ position: 'relative', padding }}>{children}</div>
  </div>
);

/** A real photo shown as a PROP on the clay set: framed print propped up, so it sits in the world. */
export const ClayPhotoProp: React.FC<{ src: string; width: number; height: number; frameColor?: string; tilt?: number; grade?: string }> = ({ src, width, height, frameColor = COLORS.d800, tilt = -2, grade }) => (
  <div style={{ transform: `rotate(${tilt}deg)` }}>
    <div style={{ position: 'relative', padding: 22, borderRadius: 26 }}>
      <div style={{ position: 'absolute', inset: 0, background: frameColor, borderRadius: 26, filter: 'url(#clay)' }} />
      <Img src={src} style={{ position: 'relative', width, height, objectFit: 'cover', display: 'block', borderRadius: 10, filter: grade ?? 'sepia(0.25) contrast(1.05)' }} />
    </div>
  </div>
);

// ---- AI image prompt suffixes per style (the creator generates the images) ----------

export const IMAGE_PROMPT_SUFFIX: Record<VisualStyle, string> = {
  default: 'realistic 19th-century documentary look: aged tintype / sepia photograph or painterly oil illustration, period-accurate, no text',
  cutout: 'flat paper cut-out collage style: layered construction paper and kraft paper with torn edges, visible paper fibre, hard drop shadows between layers, limited warm palette (parchment, rust, ochre, espresso), handmade stop-motion look, no text',
  claymation: 'claymation stop-motion style: plasticine figures and a handmade miniature set, visible fingerprints and tool marks in the clay, rounded chunky forms, soft warm studio lighting, shallow depth of field, warm palette (rust, ochre, cream, espresso), no text',
};
