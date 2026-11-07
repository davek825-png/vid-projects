// TRI-STYLE adapter: write a beat ONCE, render it as default (documentary), cutout (paper,
// stop-motion on threes) or claymation (clay, stop-motion on twos). NOT a shot.
//
// A beat component uses only the primitives below; a shot file wraps it in <StyleProvider>.
// Each primitive maps to the matching style kit: lib/frontier.tsx + lib/inkmap.tsx (default) and
// lib/styles.tsx (cutout, claymation). Built for ows-camels (2026-11-07), when the creator asked for
// one version of each style. Reuse it for any narrated beat that should exist in several styles.
//
// Rules kept per style (see make-tsx "Visual styles"): default = smooth eased fades/rises, dips;
// cutout = stepped slides/drops, boil, NO fades, hard cuts; claymation = stepped squash-and-stretch,
// boil, clay surface filter, hard cuts. Layout never jumps: hidden pieces keep their space.
import React, { createContext, useContext } from 'react';
import { AbsoluteFill, Img, interpolate, useCurrentFrame } from 'remotion';
import { COLORS, EASINGS, GRADIENT } from '../brand';
import { FONT_DISPLAY, FONT_BODY, FONT_MONO } from '../fonts';
import { NightBg, ParchmentBg, Grain, Dip, KenBurns, Scrim, IllustrationTag, ramp, Stamp as InkStamp, SunsetRule } from './frontier';
import { MountainRange, PlacePin, RouteLine, routeLength, type Pt } from './inkmap';
import { CraftPaperBg, ClayDefs, ClaySet, ClayText, tornPolygon, boil, stepped, rnd } from './styles';

export type TriStyle = 'default' | 'cutout' | 'claymation';
const CLAMP = { extrapolateLeft: 'clamp' as const, extrapolateRight: 'clamp' as const };
const HOLD: Record<TriStyle, number> = { default: 1, cutout: 3, claymation: 2 };

const StyleCtx = createContext<TriStyle>('default');
const DarkCtx = createContext<boolean>(true);
export const StyleProvider: React.FC<{ value: TriStyle; children: React.ReactNode }> = ({ value, children }) => (
  <StyleCtx.Provider value={value}>{children}</StyleCtx.Provider>
);
export const useTri = () => useContext(StyleCtx);

/** Frame as the style sees it (stop-motion styles hold poses). */
export const useStyledFrame = () => {
  const s = useTri();
  const frame = useCurrentFrame();
  return s === 'default' ? frame : stepped(frame, HOLD[s]);
};

/** 0..1 progress from `at` over `dur` frames, quantized for stop-motion styles. */
export const useProg = (at: number, dur: number, easing = EASINGS.easeInOut) => {
  const f = useStyledFrame();
  return interpolate(f, [at, at + Math.max(1, dur)], [0, 1], { ...CLAMP, easing });
};

// ---- motion ------------------------------------------------------------------------

type From = 'left' | 'right' | 'below' | 'drop' | 'none';

/** Entrance (and optional exit) for any piece, in the current style. Keeps layout space while hidden. */
export const Pop: React.FC<{ at: number; outAt?: number; seed?: number; from?: From; dist?: number; children: React.ReactNode; style?: React.CSSProperties }> = ({ at, outAt, seed = 1, from = 'below', dist, children, style }) => {
  const s = useTri();
  const frame = useCurrentFrame();
  if (s === 'default') {
    const d = from === 'none' ? 0 : dist ?? 18;
    // the exit FINISHES at outAt, so a caption replacing this one (same slot, at = outAt) never overlaps it
    const o = outAt === undefined ? ramp(frame, at, at + 16) : Math.min(ramp(frame, at, at + 16), ramp(frame, outAt - 8, outAt, 1, 0, EASINGS.easeIn));
    const off = ramp(frame, at, at + 16, d, 0);
    const [dx, dy] = from === 'left' ? [-off, 0] : from === 'right' ? [off, 0] : from === 'drop' ? [0, -off] : [0, off];
    return <div style={{ opacity: o, transform: `translate(${dx}px, ${dy}px)`, ...style }}>{children}</div>;
  }
  const hold = HOLD[s];
  const visible = frame >= at && (outAt === undefined || frame < outAt);
  const b = boil(frame, seed, s === 'cutout' ? 1.2 : 1.0, hold);
  if (s === 'cutout') {
    const p = interpolate(stepped(frame, hold), [at, at + 9], [0, 1], { ...CLAMP, easing: EASINGS.overshoot });
    const D = from === 'none' ? 0 : dist ?? 140;
    const [ox, oy] = from === 'left' ? [-D, 0] : from === 'right' ? [D, 0] : from === 'drop' ? [0, -D * 0.45] : [0, D];
    return (
      <div style={{ visibility: visible ? 'visible' : 'hidden', transform: `translate(${ox * (1 - p) + b.x}px, ${oy * (1 - p) + b.y}px) rotate(${b.r}deg)`, ...style }}>{children}</div>
    );
  }
  const t = stepped(frame, hold) - at;
  const sy = interpolate(t, [0, 4, 8, 12, 16], [0.2, 1.18, 0.9, 1.04, 1], CLAMP);
  const sx = interpolate(t, [0, 4, 8, 12, 16], [1.3, 0.88, 1.08, 0.98, 1], CLAMP);
  return (
    <div style={{ visibility: visible ? 'visible' : 'hidden', transformOrigin: '50% 100%', transform: `translate(${b.x}px, ${b.y}px) rotate(${b.r}deg) scale(${sx}, ${sy})`, ...style }}>{children}</div>
  );
};

// ---- stage ---------------------------------------------------------------------------

export type Scene = 'night' | 'parchment' | 'storm';

/** Scene background + finish (grain/dips for default; hard cuts for stop-motion styles). */
export const Stage: React.FC<{ scene: Scene; children: React.ReactNode; dipIn?: number; dipOut?: number }> = ({ scene, children, dipIn = 8, dipOut = 0 }) => {
  const s = useTri();
  const dark = scene !== 'parchment';
  let bg: React.ReactNode;
  if (s === 'default') {
    bg = scene === 'parchment' ? <ParchmentBg /> : <NightBg glow={scene === 'storm' ? COLORS.danger : COLORS.accent2} />;
  } else if (s === 'cutout') {
    const color = { night: '#3B1A0E', parchment: '#E9C98F', storm: '#4A160D' }[scene];
    const strips = scene === 'night' ? [{ color: '#2B120B', top: 840, seed: 5 }] : scene === 'storm' ? [{ color: '#2B0D07', top: 820, seed: 8 }] : [];
    bg = <CraftPaperBg color={color} strips={strips} />;
  } else {
    const set = { night: ['#3A2016', '#5A3322'], parchment: ['#C79E6A', '#E3CFA8'], storm: ['#4A1810', '#3A1A10'] }[scene];
    bg = <><ClayDefs /><ClaySet wall={set[0]} floor={set[1]} horizon={860} /></>;
  }
  return (
    <DarkCtx.Provider value={dark}>
      <AbsoluteFill style={{ overflow: 'hidden' }}>
        {bg}
        {children}
        {s === 'default' && <Grain opacity={0.06} />}
        {s === 'default' && <Dip inFrames={dipIn} outFrames={dipOut} />}
      </AbsoluteFill>
    </DarkCtx.Provider>
  );
};

// ---- surfaces + text ---------------------------------------------------------------------

/** A material box: card (default), torn paper (cutout), clay slab (claymation). */
export const Surface: React.FC<{ color?: string; padding?: number | string; seed?: number; width?: number | string; children: React.ReactNode; style?: React.CSSProperties; round?: boolean }> = ({ color = COLORS.cream, padding = '18px 34px', seed = 3, width, children, style, round = false }) => {
  const s = useTri();
  if (s === 'default') {
    return <div style={{ background: color, padding, width, borderRadius: round ? 999 : 4, boxShadow: '0 18px 50px rgba(26,11,6,0.45)', border: `1px solid ${COLORS.line}`, ...style }}>{children}</div>;
  }
  if (s === 'cutout') {
    return (
      <div style={{ width, filter: 'drop-shadow(7px 9px 0 rgba(26,11,6,0.32))', ...style }}>
        <div style={{ background: color, padding, borderRadius: round ? 999 : 0, clipPath: round ? undefined : tornPolygon(seed) }}>{children}</div>
      </div>
    );
  }
  return (
    <div style={{ position: 'relative', width, ...style }}>
      <div style={{ position: 'absolute', inset: 0, background: color, borderRadius: round ? 999 : 30, filter: 'url(#clay)', boxShadow: 'inset 0 -10px 0 rgba(26,11,6,0.18)' }} />
      <div style={{ position: 'absolute', left: '6%', right: '6%', bottom: -14, height: 26, borderRadius: '50%', background: 'rgba(20,8,4,0.4)', filter: 'blur(9px)', zIndex: -1 }} />
      <div style={{ position: 'relative', padding }}>{children}</div>
    </div>
  );
};

type Font = 'display' | 'body' | 'mono';
const fontCss = (font: Font, size: number): React.CSSProperties => ({
  fontFamily: font === 'display' ? FONT_DISPLAY : font === 'mono' ? FONT_MONO : FONT_BODY,
  fontWeight: font === 'display' ? 800 : font === 'mono' ? 700 : 500,
  fontStyle: font === 'body' ? 'italic' : 'normal',
  letterSpacing: font === 'mono' ? Math.round(size / 9) : 0,
  fontSize: size, lineHeight: 1.15,
});

/** A caption / label line. Default: bare text (cream on dark, ink on parchment); cutout/clay: on a paper strip or clay slab. */
export const Label: React.FC<{
  children: React.ReactNode; at: number; outAt?: number; size?: number; font?: Font; seed?: number;
  color?: string; ink?: string; from?: From; rotate?: number; style?: React.CSSProperties; boxed?: boolean;
}> = ({ children, at, outAt, size = 56, font = 'body', seed = 5, color, ink, from = 'left', rotate, style, boxed = false }) => {
  const s = useTri();
  const dark = useContext(DarkCtx);
  const rot = rotate ?? (s === 'default' ? 0 : rnd(seed, 1) * 1.8);
  if (s === 'default' && !boxed) {
    const c = ink ?? (dark ? COLORS.cream : COLORS.ink);
    return (
      <Pop at={at} outAt={outAt} seed={seed} from={from === 'left' ? 'below' : from} style={style}>
        <div style={{ ...fontCss(font, size), color: c, textShadow: dark ? '0 3px 24px rgba(26,11,6,0.85)' : 'none', textAlign: 'center' }}>{children}</div>
      </Pop>
    );
  }
  return (
    <Pop at={at} outAt={outAt} seed={seed} from={s === 'claymation' ? 'below' : from} style={style}>
      <div style={{ transform: `rotate(${rot}deg)` }}>
        <Surface color={color ?? COLORS.cream} seed={seed} padding={`${Math.round(size * 0.24)}px ${Math.round(size * 0.55)}px`}>
          <div style={{ ...fontCss(font, size), color: ink ?? COLORS.ink, whiteSpace: 'nowrap', textAlign: 'center' }}>{children}</div>
        </Surface>
      </div>
    </Pop>
  );
};

/** Hero words (titles, the reveal, questions). */
export const Hero: React.FC<{ children: React.ReactNode; at: number; outAt?: number; size?: number; seed?: number; color?: string; style?: React.CSSProperties }> = ({ children, at, outAt, size = 120, seed = 7, color, style }) => {
  const s = useTri();
  const dark = useContext(DarkCtx);
  if (s === 'default') {
    return (
      <Pop at={at} outAt={outAt} seed={seed} dist={30} style={style}>
        <div style={{ fontFamily: FONT_DISPLAY, fontWeight: 800, fontSize: size, lineHeight: 1.04, color: color ?? (dark ? COLORS.cream : COLORS.ink), textAlign: 'center', textShadow: dark ? '0 6px 40px rgba(0,0,0,0.6)' : 'none' }}>{children}</div>
      </Pop>
    );
  }
  if (s === 'cutout') {
    return (
      <Pop at={at} outAt={outAt} seed={seed} from="drop" style={style}>
        <div style={{ transform: `rotate(${rnd(seed, 2) * 1.6}deg)` }}>
          <Surface color={color ?? COLORS.cream} seed={seed} padding={`${Math.round(size * 0.2)}px ${Math.round(size * 0.45)}px`}>
            <div style={{ fontFamily: FONT_DISPLAY, fontWeight: 800, fontSize: size, lineHeight: 1.04, color: COLORS.ink, textAlign: 'center', whiteSpace: 'nowrap' }}>{children}</div>
          </Surface>
        </div>
      </Pop>
    );
  }
  return (
    <Pop at={at} outAt={outAt} seed={seed} style={style}>
      <ClayText text={children} size={size} color={color ?? COLORS.warn} style={{ textAlign: 'center' }} />
    </Pop>
  );
};

/** Rubber stamp (default) / dropped colored paper (cutout) / colored clay slab (claymation). */
export const StampT: React.FC<{ text: string; at: number; color?: string; rotate?: number; size?: number; seed?: number; style?: React.CSSProperties }> = ({ text, at, color = COLORS.danger, rotate = -10, size = 80, seed = 11, style }) => {
  const s = useTri();
  if (s === 'default') return <div style={style}><InkStamp text={text} at={at} color={color} rotate={rotate} size={size} /></div>;
  return (
    <Pop at={at} seed={seed} from={s === 'cutout' ? 'drop' : 'below'} style={style}>
      <div style={{ transform: `rotate(${rotate * 0.6}deg)` }}>
        <Surface color={color} seed={seed} padding={`${Math.round(size * 0.12)}px ${Math.round(size * 0.4)}px`}>
          <div style={{ fontFamily: FONT_DISPLAY, fontWeight: 900, fontSize: size, letterSpacing: 6, color: COLORS.cream, whiteSpace: 'nowrap' }}>{text}</div>
        </Surface>
      </div>
    </Pop>
  );
};

/** Date / place tag, top-left. */
export const DateTag: React.FC<{ text: string; at: number; outAt?: number }> = ({ text, at, outAt }) => {
  const s = useTri();
  const dark = useContext(DarkCtx);
  const pos: React.CSSProperties = { position: 'absolute', left: 90, top: 74 };
  if (s === 'default') {
    const c = dark ? COLORS.warn : COLORS.accent;
    return (
      <Pop at={at} outAt={outAt} from="below" dist={10} style={pos}>
        <div style={{ fontFamily: FONT_MONO, fontWeight: 700, fontSize: 30, letterSpacing: 5, color: c, textTransform: 'uppercase', border: `2px solid ${c}`, padding: '10px 20px', background: dark ? 'rgba(26,11,6,0.55)' : 'transparent' }}>{text}</div>
      </Pop>
    );
  }
  return <Label at={at} outAt={outAt} font="mono" size={32} color={COLORS.warn} seed={41} rotate={-2} style={pos}>{text}</Label>;
};

/** A rule under titles: sunset bar (default), torn rust strip (cutout), clay rope (claymation). */
export const Rule: React.FC<{ at: number; width?: number }> = ({ at, width = 520 }) => {
  const s = useTri();
  const p = useProg(at, 18, EASINGS.easeOut);
  if (s === 'default') return <SunsetRule at={at} width={width} />;
  if (s === 'cutout') return <div style={{ width, height: 14, background: GRADIENT, clipPath: tornPolygon(19, 8), transform: `scaleX(${p})`, filter: 'drop-shadow(4px 5px 0 rgba(26,11,6,0.3))' }} />;
  return <div style={{ width, height: 22, borderRadius: 999, background: COLORS.accent2, filter: 'url(#clay)', transform: `scaleX(${p})` }} />;
};

/** Strike-through across its parent (position: relative parent). */
export const Strike: React.FC<{ at: number; color?: string; thick?: number }> = ({ at, color = COLORS.danger, thick }) => {
  const s = useTri();
  const p = useProg(at, s === 'default' ? 10 : 6, EASINGS.easeOut);
  const h = thick ?? (s === 'claymation' ? 14 : s === 'cutout' ? 10 : 7);
  const base: React.CSSProperties = { position: 'absolute', left: -12, right: -12, top: '52%', height: h, background: color, transformOrigin: 'left center', transform: `translateY(-50%) rotate(-4deg) scaleX(${p})` };
  if (s === 'cutout') return <div style={{ ...base, clipPath: tornPolygon(23, 10), filter: 'drop-shadow(3px 4px 0 rgba(26,11,6,0.3))' }} />;
  if (s === 'claymation') return <div style={{ ...base, borderRadius: 999, filter: 'url(#clay)' }} />;
  return <div style={{ ...base, borderRadius: 4 }} />;
};

/** A ledger card (key/value rows). */
export const Card: React.FC<{ at: number; width?: number; children: React.ReactNode; seed?: number; style?: React.CSSProperties }> = ({ at, width = 1300, children, seed = 13, style }) => (
  <Pop at={at} seed={seed} from={useTri() === 'cutout' ? 'drop' : 'below'} dist={30} style={style}>
    <Surface width={width} seed={seed} padding="54px 72px 30px">{children}</Surface>
  </Pop>
);

/** One ledger row: key (muted mono) then value, each on its cue. */
export const Row: React.FC<{ k: string; v: React.ReactNode; at: number; vAt?: number; hot?: boolean; size?: number; keyWidth?: number; strikeAt?: number; seed?: number }> = ({ k, v, at, vAt, hot, size = 54, keyWidth = 420, strikeAt, seed = 30 }) => (
  <div style={{ display: 'flex', gap: 30, alignItems: 'baseline', marginBottom: 34 }}>
    <Pop at={at} seed={seed} from="left" dist={40} style={{ width: keyWidth, flexShrink: 0 }}>
      <div style={{ fontFamily: FONT_MONO, fontWeight: 700, fontSize: size * 0.72, letterSpacing: 3, color: COLORS.muted }}>{k}</div>
    </Pop>
    <Pop at={vAt ?? at + 6} seed={seed + 1} from="left" dist={40}>
      <div style={{ position: 'relative', fontFamily: FONT_MONO, fontSize: size, color: hot ? COLORS.accent : COLORS.ink, fontWeight: hot ? 700 : 400 }}>
        {v}
        {strikeAt !== undefined && <Strike at={strikeAt} />}
      </div>
    </Pop>
  </div>
);

// ---- images ------------------------------------------------------------------------------

/**
 * A scene image. Default: full-bleed Ken Burns + bottom scrim. Cutout: a torn-edge print on craft paper
 * (stepped drift, never a smooth zoom). Claymation: a framed print propped on the clay set.
 * All styles leave the bottom band (y > 790) for captions.
 */
export const Picture: React.FC<{ src: string; at?: number; illustration?: boolean; from?: { s: number; x: number; y: number }; to?: { s: number; x: number; y: number }; seed?: number; grade?: string }> = ({ src, at = 0, illustration = false, from = { s: 1.04, x: 0, y: 0 }, to = { s: 1.13, x: 0, y: 0 }, seed = 17, grade }) => {
  const s = useTri();
  const frame = useCurrentFrame();
  const W = 1240, H = 692;
  if (s === 'default') {
    return (
      <AbsoluteFill style={{ opacity: at > 0 ? ramp(frame, at, at + 6) : 1 }}>
        <KenBurns src={src} from={from} to={to} grade={grade} />
        <Scrim height={460} strength={0.8} />
        {illustration && <IllustrationTag />}
      </AbsoluteFill>
    );
  }
  const drift = interpolate(stepped(frame, HOLD[s]), [0, 600], [0, -26], CLAMP);
  const tag = illustration && (
    <div style={{ position: 'absolute', right: 26, bottom: 22, fontFamily: FONT_MONO, fontSize: 17, letterSpacing: 3, color: COLORS.cream, background: 'rgba(26,11,6,0.6)', padding: '4px 10px', borderRadius: s === 'claymation' ? 8 : 0 }}>ILLUSTRATION</div>
  );
  if (s === 'cutout') {
    return (
      <Pop at={at} seed={seed} from="drop" style={{ position: 'absolute', left: (1920 - W - 36) / 2 + drift, top: 56 }}>
        <div style={{ transform: `rotate(${rnd(seed, 3) * 1.2}deg)`, filter: 'drop-shadow(9px 12px 0 rgba(26,11,6,0.34))' }}>
          <div style={{ background: '#FBF6EA', padding: 18, clipPath: tornPolygon(seed, 0.8) }}>
            <div style={{ position: 'relative' }}>
              <Img src={src} style={{ width: W, height: H, objectFit: 'cover', display: 'block', filter: grade ?? 'sepia(0.15) contrast(1.05) saturate(0.9)' }} />
              {tag}
            </div>
          </div>
        </div>
      </Pop>
    );
  }
  return (
    <Pop at={at} seed={seed} style={{ position: 'absolute', left: (1920 - W - 44) / 2, top: 40 }}>
      <div style={{ position: 'relative', padding: 22, transform: `rotate(${rnd(seed, 3)}deg)` }}>
        <div style={{ position: 'absolute', inset: 0, background: COLORS.d800, borderRadius: 26, filter: 'url(#clay)' }} />
        <div style={{ position: 'relative' }}>
          <Img src={src} style={{ width: W, height: H, objectFit: 'cover', display: 'block', borderRadius: 10, filter: grade ?? 'sepia(0.15) contrast(1.05) saturate(0.95)' }} />
          {tag}
        </div>
      </div>
    </Pop>
  );
};

/** A smaller photo (portraits, engravings): framed print / torn print / clay-framed prop. */
export const Photo: React.FC<{ src: string; w: number; h: number; at: number; seed?: number; rotate?: number; style?: React.CSSProperties; grade?: string }> = ({ src, w, h, at, seed = 21, rotate = -2, style, grade }) => {
  const s = useTri();
  const img = <Img src={src} style={{ width: w, height: h, objectFit: 'cover', display: 'block', borderRadius: s === 'claymation' ? 10 : 0, filter: grade ?? 'sepia(0.2) contrast(1.05)' }} />;
  if (s === 'default') {
    return (
      <Pop at={at} dist={24} style={style}>
        <div style={{ transform: `rotate(${rotate}deg)`, background: COLORS.cream, padding: 16, boxShadow: '0 18px 50px rgba(26,11,6,0.5)', border: `1px solid ${COLORS.line}` }}>{img}</div>
      </Pop>
    );
  }
  if (s === 'cutout') {
    return (
      <Pop at={at} seed={seed} from="drop" style={style}>
        <div style={{ transform: `rotate(${rotate}deg)`, filter: 'drop-shadow(8px 10px 0 rgba(26,11,6,0.32))' }}>
          <div style={{ background: '#FBF6EA', padding: 16, clipPath: tornPolygon(seed, 1) }}>{img}</div>
        </div>
      </Pop>
    );
  }
  return (
    <Pop at={at} seed={seed} style={style}>
      <div style={{ position: 'relative', padding: 22, transform: `rotate(${rotate}deg)` }}>
        <div style={{ position: 'absolute', inset: 0, background: COLORS.d800, borderRadius: 26, filter: 'url(#clay)' }} />
        <div style={{ position: 'relative' }}>{img}</div>
      </div>
    </Pop>
  );
};

/** Material wrapper for hand-drawn SVG props (figures, envelope, book, newspapers, icons). */
export const Mat: React.FC<{ at: number; outAt?: number; seed?: number; from?: From; children: React.ReactNode; style?: React.CSSProperties }> = ({ at, outAt, seed = 9, from = 'below', children, style }) => {
  const s = useTri();
  const filter = s === 'default' ? 'drop-shadow(0 14px 30px rgba(26,11,6,0.45))' : s === 'cutout' ? 'drop-shadow(7px 9px 0 rgba(26,11,6,0.34))' : 'url(#clay) drop-shadow(0 14px 14px rgba(20,8,4,0.4))';
  return (
    <Pop at={at} outAt={outAt} seed={seed} from={s === 'cutout' && from === 'below' ? 'drop' : from} style={style}>
      <div style={{ filter }}>{children}</div>
    </Pop>
  );
};

// ---- maps --------------------------------------------------------------------------------

/** Mountain ridge: inked peaks / torn paper triangles / clay blobs. */
export const Ridge: React.FC<{ x0: number; x1: number; y: number; at: number; label?: string; seed?: number }> = ({ x0, x1, y, at, label, seed = 4 }) => {
  const s = useTri();
  const frame = useCurrentFrame();
  if (s === 'default') return <MountainRange x0={x0} x1={x1} y={y} at={at} label={label} />;
  const n = Math.max(3, Math.round((x1 - x0) / 60));
  const peaks = Array.from({ length: n }, (_, i) => ({
    x: x0 + ((x1 - x0) * i) / (n - 1), h: 60 + Math.abs(rnd(seed, i)) * 50, a: at + i * HOLD[s] * 2,
  }));
  return (
    <>
      <svg width={1920} height={1080} style={{ position: 'absolute', inset: 0, filter: s === 'cutout' ? 'drop-shadow(5px 6px 0 rgba(26,11,6,0.3))' : 'url(#clay)' }}>
        {peaks.map((p, i) => frame >= p.a && (
          s === 'cutout'
            ? <polygon key={i} points={`${p.x - p.h * 0.8},${y} ${p.x + rnd(seed + 2, i) * 8},${y - p.h} ${p.x + p.h * 0.8},${y}`} fill={i % 2 ? COLORS.muted : COLORS.d400} />
            : <path key={i} d={`M ${p.x - p.h * 0.85} ${y} C ${p.x - p.h * 0.5} ${y - p.h * 0.7}, ${p.x - p.h * 0.2} ${y - p.h}, ${p.x} ${y - p.h} C ${p.x + p.h * 0.2} ${y - p.h}, ${p.x + p.h * 0.5} ${y - p.h * 0.7}, ${p.x + p.h * 0.85} ${y} Z`} fill={i % 2 ? COLORS.muted : COLORS.d400} />
        ))}
      </svg>
      {label && <Label at={at + 12} font="mono" size={26} seed={seed + 50} style={{ position: 'absolute', left: (x0 + x1) / 2 - 160, top: y + 24 }}>{label}</Label>}
    </>
  );
};

/** A town pin with a label. */
export const Pin: React.FC<{ x: number; y: number; label: string; sub?: string; at: number; hot?: boolean; above?: boolean; seed?: number }> = ({ x, y, label, sub, at, hot = false, above = false, seed = 60 }) => {
  const s = useTri();
  if (s === 'default') return <PlacePin x={x} y={y} label={label} sub={sub} at={at} hot={hot} above={above} />;
  const col = hot ? COLORS.accent : COLORS.ink;
  const d = s === 'claymation' ? 40 : 32;
  const dot = s === 'cutout'
    ? <div style={{ width: d, height: d, borderRadius: '50%', background: col, filter: 'drop-shadow(4px 5px 0 rgba(26,11,6,0.35))' }} />
    : <div style={{ width: d, height: d, borderRadius: '50%', background: col, filter: 'url(#clay)', boxShadow: 'inset -5px -6px 0 rgba(0,0,0,0.25)' }} />;
  return (
    <div style={{ position: 'absolute', left: x, top: y }}>
      <Pop at={at} seed={seed} from="drop" dist={50} style={{ position: 'absolute', left: -d / 2, top: -d / 2 }}>{dot}</Pop>
      <div style={{ position: 'absolute', left: 0, transform: 'translateX(-50%)', [above ? 'bottom' : 'top']: d / 2 + 10 } as React.CSSProperties}>
        <Pop at={at + 3} seed={seed + 1} from="drop" dist={30}>
          <Surface color={hot ? COLORS.warn : COLORS.cream} seed={seed} padding="6px 18px">
            <div style={{ fontFamily: FONT_MONO, fontWeight: 700, fontSize: 26, letterSpacing: 3, color: COLORS.ink, whiteSpace: 'nowrap', textAlign: 'center' }}>{label}</div>
            {sub && <div style={{ fontFamily: FONT_BODY, fontStyle: 'italic', fontSize: 22, color: COLORS.muted, whiteSpace: 'nowrap', textAlign: 'center' }}>{sub}</div>}
          </Surface>
        </Pop>
      </div>
    </div>
  );
};

/** A route that draws itself: inked line / stitched paper thread / rolled clay rope. */
export const Route: React.FC<{ pts: Pt[]; at: number; dur: number; color?: string; width?: number }> = ({ pts, at, dur, color = COLORS.accent, width }) => {
  const s = useTri();
  const p = useProg(at, dur);
  if (s === 'default') return <RouteLine pts={pts} at={at} dur={dur} color={color} width={width ?? 7} />;
  const len = routeLength(pts);
  const id = `rt${Math.round(pts[0][0])}${Math.round(pts[0][1])}${at}`;
  const pl = pts.map((q) => q.join(',')).join(' ');
  if (s === 'cutout') {
    return (
      <svg width={1920} height={1080} style={{ position: 'absolute', inset: 0, filter: 'drop-shadow(3px 4px 0 rgba(26,11,6,0.3))' }}>
        <mask id={id}><polyline points={pl} fill="none" stroke="#fff" strokeWidth={30} strokeLinecap="round" strokeLinejoin="round" strokeDasharray={len} strokeDashoffset={len * (1 - p)} /></mask>
        <polyline points={pl} fill="none" stroke={color} strokeWidth={width ?? 8} strokeLinecap="round" strokeLinejoin="round" strokeDasharray="20 14" mask={`url(#${id})`} />
      </svg>
    );
  }
  return (
    <svg width={1920} height={1080} style={{ position: 'absolute', inset: 0, filter: 'url(#clay)' }}>
      <polyline points={pl} fill="none" stroke={color} strokeWidth={width ?? 18} strokeLinecap="round" strokeLinejoin="round" strokeDasharray={len} strokeDashoffset={len * (1 - p)} />
    </svg>
  );
};

/** The mystery marker for the hidden animals: "?" in a disc / paper tag / clay ball. Centered on x,y. */
export const Mystery: React.FC<{ x: number; y: number; at: number; size?: number; seed?: number; outAt?: number }> = ({ x, y, at, size = 70, seed = 70, outAt }) => {
  const s = useTri();
  const frame = useCurrentFrame();
  const sc = s === 'default' ? ramp(frame, at, at + 12, 0.3, 1, EASINGS.overshoot) : 1;
  const disc: React.CSSProperties = {
    width: size, height: size, borderRadius: '50%', background: COLORS.warn, display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontFamily: FONT_DISPLAY, fontWeight: 900, fontSize: size * 0.66, color: COLORS.ink, transform: `scale(${sc})`,
  };
  const look: React.CSSProperties = s === 'default'
    ? { border: `${Math.max(3, size / 16)}px solid ${COLORS.ink}`, boxShadow: '0 6px 18px rgba(26,11,6,0.4)' }
    : s === 'cutout' ? { filter: 'drop-shadow(5px 6px 0 rgba(26,11,6,0.35))' } : { boxShadow: 'inset -6px -8px 0 rgba(0,0,0,0.2)' };
  return (
    <div style={{ position: 'absolute', left: x - size / 2, top: y - size / 2 }}>
      <Pop at={at} outAt={outAt} seed={seed} from="drop" dist={40}>
        <div style={{ position: 'relative', width: size, height: size }}>
          {s === 'claymation' && <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: COLORS.warn, filter: 'url(#clay)' }} />}
          <div style={{ ...disc, ...look, position: 'relative', background: s === 'claymation' ? 'transparent' : COLORS.warn }}>?</div>
        </div>
      </Pop>
    </div>
  );
};

// ---- layout helpers -----------------------------------------------------------------------

/** Full-frame centered column. */
export const Center: React.FC<{ children: React.ReactNode; gap?: number; top?: number; style?: React.CSSProperties }> = ({ children, gap = 26, top, style }) => (
  <AbsoluteFill style={{ alignItems: 'center', justifyContent: top === undefined ? 'center' : 'flex-start', paddingTop: top, flexDirection: 'column', gap, ...style }}>{children}</AbsoluteFill>
);

/** Caption band at the bottom (below Picture prints in cutout/claymation). Children stack. */
export const Bottom: React.FC<{ children: React.ReactNode; gap?: number }> = ({ children, gap = 14 }) => {
  const s = useTri();
  const pos: React.CSSProperties = s === 'default' ? { bottom: 92 } : { top: 790, bottom: 14, justifyContent: 'center' };
  return <div style={{ position: 'absolute', left: 0, right: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', gap, ...pos }}>{children}</div>;
};

/** Stack children on top of each other in one slot (for captions that replace each other). */
export const Slot: React.FC<{ children: React.ReactNode; height: number }> = ({ children, height }) => (
  <div style={{ position: 'relative', width: '100%', height }}>
    {React.Children.map(children, (c) => <div style={{ position: 'absolute', inset: 0, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>{c}</div>)}
  </div>
);
