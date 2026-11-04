// Frontier documentary kit — reusable building blocks for narrated history videos
// (Old West Stories). NOT a shot (lives outside src/shots, no compositionConfig).
// Frame-based only; every interpolate goes through ramp() so input ranges stay
// strictly increasing and clamped. Colors/fonts come from the brand contract.
import React from 'react';
import { AbsoluteFill, Img, interpolate, useCurrentFrame, useVideoConfig } from 'remotion';
import { COLORS, EASINGS, GRADIENT, SHADOW } from '../brand';
import { FONT_DISPLAY, FONT_BODY, FONT_MONO } from '../fonts';

const CLAMP = { extrapolateLeft: 'clamp' as const, extrapolateRight: 'clamp' as const };
export const FPS = 30;

/** Seconds on the master timeline -> local frame of a shot that starts at masterIn. */
export const cueAt = (masterIn: number) => (s: number) => Math.max(0, Math.round((s - masterIn) * FPS));

/** Clamped, eased 0..1 (or from..to) ramp between frames a and b. Guarantees a < b. */
export const ramp = (
  frame: number, a: number, b: number, from = 0, to = 1, easing = EASINGS.easeOut,
) => interpolate(frame, [a, Math.max(b, a + 1)], [from, to], { ...CLAMP, easing });

/** Fade + rise style object, starting at frame `at`. */
export const riseAt = (frame: number, at: number, dist = 16, dur = 16) => ({
  opacity: ramp(frame, at, at + dur),
  transform: `translateY(${ramp(frame, at, at + dur, dist, 0)}px)`,
});

/** Opacity for an element visible from `inAt`, optionally fading out at `outAt`. */
export const showBetween = (frame: number, inAt: number, outAt?: number, dur = 14) =>
  outAt === undefined
    ? ramp(frame, inAt, inAt + dur)
    : Math.min(ramp(frame, inAt, inAt + dur), ramp(frame, outAt, outAt + dur, 1, 0, EASINGS.easeIn));

// ---- backgrounds -------------------------------------------------------------

/** Espresso night with a low sunset glow. For title cards, questions, reveals. */
export const NightBg: React.FC<{ glow?: string; glowY?: number }> = ({ glow = COLORS.accent2, glowY = 115 }) => (
  <>
    <AbsoluteFill style={{ backgroundColor: COLORS.d900 }} />
    <AbsoluteFill style={{ background: `radial-gradient(1400px 620px at 50% ${glowY}%, ${glow}38, transparent 70%)` }} />
    <Vignette strength={0.7} />
  </>
);

/** Aged parchment: paper + fibre noise + burnt edges. For documents, ledgers, maps. */
export const ParchmentBg: React.FC = () => (
  <>
    <AbsoluteFill style={{ backgroundColor: COLORS.paper }} />
    <AbsoluteFill>
      <svg width="100%" height="100%">
        <filter id="parch">
          <feTurbulence type="fractalNoise" baseFrequency="0.012 0.03" numOctaves={4} seed={7} />
          <feColorMatrix values="0 0 0 0 0.42  0 0 0 0 0.29  0 0 0 0 0.2  0 0 0 0.55 0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#parch)" opacity={0.28} />
      </svg>
    </AbsoluteFill>
    <AbsoluteFill style={{ background: 'radial-gradient(ellipse at center, transparent 55%, rgba(110,30,18,0.28) 100%)' }} />
  </>
);

export const Vignette: React.FC<{ strength?: number }> = ({ strength = 0.55 }) => (
  <AbsoluteFill style={{ background: `radial-gradient(ellipse at center, transparent 48%, rgba(26,11,6,${strength}) 100%)`, pointerEvents: 'none' }} />
);

/** Subtle animated film grain (seed steps every 2 frames). */
export const Grain: React.FC<{ opacity?: number }> = ({ opacity = 0.07 }) => {
  const frame = useCurrentFrame();
  const seed = Math.floor(frame / 2) % 9;
  return (
    <AbsoluteFill style={{ mixBlendMode: 'overlay', opacity, pointerEvents: 'none' }}>
      <svg width="100%" height="100%">
        <filter id={`grain${seed}`}>
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves={2} seed={seed} />
        </filter>
        <rect width="100%" height="100%" filter={`url(#grain${seed})`} />
      </svg>
    </AbsoluteFill>
  );
};

/** Dip from / to espresso black at the shot's edges (frames). */
export const Dip: React.FC<{ inFrames?: number; outFrames?: number }> = ({ inFrames = 8, outFrames = 0 }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const a = inFrames > 0 ? ramp(frame, 0, inFrames, 1, 0, EASINGS.easeInOut) : 0;
  const b = outFrames > 0 ? ramp(frame, durationInFrames - outFrames, durationInFrames - 1, 0, 1, EASINGS.easeInOut) : 0;
  const o = Math.max(a, b);
  return o > 0 ? <AbsoluteFill style={{ backgroundColor: COLORS.d900, opacity: o }} /> : null;
};

// ---- images ------------------------------------------------------------------

type Cam = { s: number; x: number; y: number }; // scale, translate % of frame

/** Full-bleed image with a slow camera move from `from` to `to` over [start, end] frames. */
export const KenBurns: React.FC<{
  src: string; from?: Cam; to?: Cam; start?: number; end?: number;
  position?: string; dim?: number; illustration?: boolean;
  /** pan the cropped area of a wide image: objectPosition x% from -> to (panoramas) */
  panFrom?: number; panTo?: number;
}> = ({ src, from = { s: 1.04, x: 0, y: 0 }, to = { s: 1.12, x: 0, y: 0 }, start = 0, end, position = 'center', dim = 0, illustration = false, panFrom, panTo }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const e = end ?? durationInFrames;
  const t = (k: keyof Cam) => ramp(frame, start, e, from[k], to[k], EASINGS.easeInOut);
  const objPos = panFrom !== undefined && panTo !== undefined
    ? `${ramp(frame, start, e, panFrom, panTo, EASINGS.easeInOut)}% 50%` : position;
  return (
    <AbsoluteFill style={{ overflow: 'hidden', backgroundColor: COLORS.d900 }}>
      <Img src={src} style={{
        width: '100%', height: '100%', objectFit: 'cover', objectPosition: objPos,
        transform: `translate(${t('x')}%, ${t('y')}%) scale(${t('s')})`,
      }} />
      {dim > 0 && <AbsoluteFill style={{ backgroundColor: COLORS.d900, opacity: dim }} />}
      <Vignette />
      {illustration && <IllustrationTag />}
    </AbsoluteFill>
  );
};

/** A framed archival print on the page (for small/low-res originals). */
export const Print: React.FC<{
  src: string; width: number; height: number; at?: number; rotate?: number;
  caption?: string; style?: React.CSSProperties; zoomTo?: number;
}> = ({ src, width, height, at = 0, rotate = -1.2, caption, style, zoomTo = 1.03 }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const z = ramp(frame, at, durationInFrames, 1, zoomTo, EASINGS.easeInOut);
  return (
    <div style={{ ...riseAt(frame, at, 24, 20), ...style }}>
      <div style={{
        transform: `rotate(${rotate}deg) scale(${z})`, background: COLORS.cream, padding: 16, paddingBottom: caption ? 12 : 16,
        boxShadow: '0 18px 50px rgba(26,11,6,0.45)', border: `1px solid ${COLORS.line}`,
      }}>
        <Img src={src} style={{ width, height, objectFit: 'cover', display: 'block', filter: 'sepia(0.25) contrast(1.02)' }} />
        {caption && <div style={{ fontFamily: FONT_MONO, fontSize: 17, color: COLORS.muted, marginTop: 10, letterSpacing: 1 }}>{caption}</div>}
      </div>
    </div>
  );
};

/** Small corner tag marking AI-generated paintings (channel promise: records, not inventions). */
export const IllustrationTag: React.FC = () => (
  <div style={{
    position: 'absolute', right: 34, bottom: 28, fontFamily: FONT_MONO, fontSize: 17, letterSpacing: 3,
    color: 'rgba(236,211,164,0.78)', background: 'rgba(26,11,6,0.45)', padding: '5px 12px', borderRadius: 4,
  }}>ILLUSTRATION</div>
);

// ---- type --------------------------------------------------------------------

/** Courier date / place stamp, top-left. */
export const DateStamp: React.FC<{ text: string; at: number; onDark?: boolean; outAt?: number }> = ({ text, at, onDark = true, outAt }) => {
  const frame = useCurrentFrame();
  const c = onDark ? COLORS.warn : COLORS.accent;
  return (
    <div style={{
      position: 'absolute', left: 96, top: 80, opacity: showBetween(frame, at, outAt), transform: riseAt(frame, at, 10).transform,
      fontFamily: FONT_MONO, fontWeight: 700, fontSize: 30, letterSpacing: 5, color: c, textTransform: 'uppercase',
      border: `2px solid ${c}`, padding: '10px 20px', background: onDark ? 'rgba(26,11,6,0.55)' : 'transparent',
    }}>{text}</div>
  );
};

/** Lower-third name tag. */
export const NameTag: React.FC<{ name: string; role?: string; at: number; outAt?: number; left?: number; bottom?: number }> = ({ name, role, at, outAt, left = 96, bottom = 110 }) => {
  const frame = useCurrentFrame();
  const bar = ramp(frame, at, at + 14);
  return (
    <div style={{ position: 'absolute', left, bottom, opacity: showBetween(frame, at, outAt), display: 'flex', gap: 20, alignItems: 'stretch' }}>
      <div style={{ width: 6, background: COLORS.warn, transform: `scaleY(${bar})`, transformOrigin: 'bottom' }} />
      <div style={{ transform: riseAt(frame, at + 3, 12).transform }}>
        <div style={{ fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 54, color: COLORS.cream, textShadow: '0 2px 18px rgba(26,11,6,0.9)' }}>{name}</div>
        {role && <div style={{ fontFamily: FONT_BODY, fontStyle: 'italic', fontSize: 30, color: COLORS.d300, textShadow: '0 2px 14px rgba(26,11,6,0.9)' }}>{role}</div>}
      </div>
    </div>
  );
};

/** Dark bottom scrim so captions read over photos. */
export const Scrim: React.FC<{ height?: number; strength?: number }> = ({ height = 480, strength = 0.82 }) => (
  <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height, background: `linear-gradient(to top, rgba(26,11,6,${strength}), transparent)` }} />
);

/** Caption line over imagery or on a card. */
export const Caption: React.FC<{
  text: React.ReactNode; at: number; outAt?: number; size?: number; color?: string;
  font?: 'display' | 'body'; italic?: boolean; style?: React.CSSProperties; weight?: number;
}> = ({ text, at, outAt, size = 64, color = COLORS.cream, font = 'display', italic = false, style, weight = 700 }) => {
  const frame = useCurrentFrame();
  return (
    <div style={{
      opacity: showBetween(frame, at, outAt), transform: riseAt(frame, at, 14, 18).transform,
      fontFamily: font === 'display' ? FONT_DISPLAY : FONT_BODY, fontWeight: font === 'display' ? weight : 500,
      fontStyle: italic ? 'italic' : 'normal', fontSize: size, color, lineHeight: 1.18,
      textShadow: color === COLORS.ink ? 'none' : '0 3px 24px rgba(26,11,6,0.85)', ...style,
    }}>{text}</div>
  );
};

/** Typewriter reveal of a string starting at frame `at` (chars per second). */
export const TypeText: React.FC<{ text: string; at: number; cps?: number; cursor?: boolean }> = ({ text, at, cps = 30, cursor = false }) => {
  const frame = useCurrentFrame();
  const n = Math.max(0, Math.min(text.length, Math.floor(((frame - at) / FPS) * cps)));
  const blink = cursor && n < text.length && frame >= at && Math.floor(frame / 8) % 2 === 0;
  return <span>{text.slice(0, n)}<span style={{ opacity: blink ? 1 : 0 }}>|</span></span>;
};

/** Text with a rust underline that sweeps in at frame `at`. */
export const Mark: React.FC<{ children: React.ReactNode; at: number; color?: string; fill?: boolean }> = ({ children, at, color = COLORS.accent, fill = false }) => {
  const frame = useCurrentFrame();
  const p = ramp(frame, at, at + 12);
  return (
    <span style={{
      backgroundImage: `linear-gradient(${fill ? `${color}55, ${color}55` : `${color}, ${color}`})`,
      backgroundRepeat: 'no-repeat', backgroundPosition: fill ? '0 15%' : '0 92%',
      backgroundSize: `${p * 100}% ${fill ? '80%' : '5px'}`, padding: '0 2px',
    }}>{children}</span>
  );
};

/** The sunset rule (gradient bar) that grows from the center. */
export const SunsetRule: React.FC<{ at: number; width?: number }> = ({ at, width = 420 }) => {
  const frame = useCurrentFrame();
  return <div style={{ width, height: 6, borderRadius: 999, background: GRADIENT, transform: `scaleX(${ramp(frame, at, at + 20)})` }} />;
};

/** Parchment document card with a source line (journal quotes, accounts). */
export const DocCard: React.FC<{
  children: React.ReactNode; at?: number; source?: string; sourceAt?: number; width?: number; rotate?: number;
}> = ({ children, at = 0, source, sourceAt, width = 1380, rotate = -0.6 }) => {
  const frame = useCurrentFrame();
  return (
    <div style={{ ...riseAt(frame, at, 30, 22), width }}>
      <div style={{
        transform: `rotate(${rotate}deg)`, position: 'relative', overflow: 'hidden', padding: '64px 84px 54px',
        background: COLORS.cream, boxShadow: '0 26px 70px rgba(26,11,6,0.5)', border: `1px solid ${COLORS.line}`,
      }}>
        <AbsoluteFill style={{ background: 'radial-gradient(ellipse at center, transparent 60%, rgba(110,30,18,0.16) 100%)' }} />
        <div style={{ position: 'relative' }}>{children}</div>
        {source && (
          <div style={{
            position: 'relative', opacity: ramp(frame, sourceAt ?? at + 20, (sourceAt ?? at + 20) + 14), marginTop: 34,
            fontFamily: FONT_MONO, fontSize: 24, color: COLORS.muted, letterSpacing: 1.5,
          }}>{source}</div>
        )}
      </div>
    </div>
  );
};

/** One quoted line that rises in at `at` (Lora, document voice). */
export const QuoteLine: React.FC<{ children: React.ReactNode; at: number; size?: number }> = ({ children, at, size = 50 }) => {
  const frame = useCurrentFrame();
  return (
    <div style={{ ...riseAt(frame, at, 10, 16), fontFamily: FONT_BODY, fontStyle: 'italic', fontSize: size, lineHeight: 1.38, color: COLORS.ink }}>
      {children}
    </div>
  );
};

/**
 * An abstract handwritten journal page: rows of faint "ink" strokes (unreadable on purpose, so
 * the video never invents journal text) with a few LEGIBLE rows carrying genuine quoted phrases.
 * Legible rows rise in at their `at` frame; `mark` underlines them in rust at that frame.
 */
export type JournalRow = { w: number } | { text: string; at: number; mark?: number };
export const JournalPage: React.FC<{ rows: JournalRow[]; at?: number; width?: number; heading?: string }> = ({ rows, at = 0, width = 1240, heading }) => {
  const frame = useCurrentFrame();
  const strokes = (w: number, i: number) => {
    // deterministic pseudo-words: widths from a tiny LCG seeded by row index
    let s = (i + 3) * 9301 + 49297;
    const out: number[] = []; let used = 0;
    while (used < w - 40) { s = (s * 9301 + 49297) % 233280; const ww = 38 + (s / 233280) * 120; out.push(ww); used += ww + 18; }
    return out;
  };
  return (
    <div style={{ ...riseAt(frame, at, 24, 20), width, position: 'relative' }}>
      <div style={{
        transform: 'rotate(-0.8deg)', background: COLORS.cream, padding: '56px 80px', position: 'relative', overflow: 'hidden',
        boxShadow: '0 26px 70px rgba(26,11,6,0.5)', border: `1px solid ${COLORS.line}`,
      }}>
        <AbsoluteFill style={{ background: 'radial-gradient(ellipse at center, transparent 55%, rgba(110,30,18,0.2) 100%)' }} />
        {heading && <div style={{ position: 'relative', fontFamily: FONT_MONO, fontSize: 24, letterSpacing: 4, color: COLORS.muted, marginBottom: 26 }}>{heading}</div>}
        {rows.map((r, i) => (
          <div key={i} style={{ position: 'relative', height: 58, display: 'flex', alignItems: 'center', gap: 18, borderBottom: '1px solid rgba(160,138,115,0.35)' }}>
            {'w' in r
              ? strokes(r.w, i).map((ww, j) => <div key={j} style={{ width: ww, height: 7, borderRadius: 4, background: COLORS.ink, opacity: 0.2 }} />)
              : (
                <div style={{ ...riseAt(frame, r.at, 8, 14), fontFamily: FONT_BODY, fontStyle: 'italic', fontSize: 40, color: COLORS.ink }}>
                  {r.mark !== undefined ? <Mark at={r.mark}>{r.text}</Mark> : r.text}
                </div>
              )}
          </div>
        ))}
      </div>
    </div>
  );
};

/** Full-frame dim to espresso between frames a..b (freeze/darken moments, "vanished"). */
export const DimTo: React.FC<{ a: number; b: number; to?: number }> = ({ a, b, to = 0.7 }) => {
  const frame = useCurrentFrame();
  return <AbsoluteFill style={{ backgroundColor: COLORS.d900, opacity: ramp(frame, a, b, 0, to, EASINGS.easeInOut) }} />;
};

/** Crossfade wrapper: children fade in over [a, a+dur]. */
export const FadeIn: React.FC<{ a: number; dur?: number; children: React.ReactNode }> = ({ a, dur = 18, children }) => {
  const frame = useCurrentFrame();
  return <AbsoluteFill style={{ opacity: ramp(frame, a, a + dur, 0, 1, EASINGS.easeInOut) }}>{children}</AbsoluteFill>;
};

// ---- trail diagram (who is where on the route) ---------------------------------

/** A hand-inked trail across the page, left (east) to right (west). y in px. */
export const Trail: React.FC<{ y?: number; x0?: number; x1?: number; at?: number }> = ({ y = 600, x0 = 140, x1 = 1780, at = 0 }) => {
  const frame = useCurrentFrame();
  const len = x1 - x0;
  const p = ramp(frame, at, at + 24, 0, 1, EASINGS.easeInOut);
  const d = `M ${x0} ${y} C ${x0 + len * 0.25} ${y - 40}, ${x0 + len * 0.45} ${y + 40}, ${x0 + len * 0.6} ${y} S ${x0 + len * 0.85} ${y - 30}, ${x1} ${y}`;
  return (
    <AbsoluteFill>
      <svg width={1920} height={1080}>
        <path d={d} fill="none" stroke={COLORS.muted} strokeWidth={5} strokeDasharray="18 14"
          strokeDashoffset={0} style={{ clipPath: `inset(0 ${(1 - p) * 100}% 0 0)` }} />
      </svg>
    </AbsoluteFill>
  );
};

/** A labelled marker on the trail at x (px), label above or below. */
export const TrailMarker: React.FC<{
  x: number; y?: number; label: string; sub?: string; at: number; color?: string; below?: boolean; size?: number; outAt?: number;
}> = ({ x, y = 600, label, sub, at, color = COLORS.accent, below = false, size = 30, outAt }) => {
  const frame = useCurrentFrame();
  const o = showBetween(frame, at, outAt, 12);
  const s = ramp(frame, at, at + 12, 0.4, 1, EASINGS.overshoot);
  return (
    <div style={{ position: 'absolute', left: x, top: y, transform: 'translate(-50%, -50%)', opacity: o }}>
      <div style={{ width: size, height: size, borderRadius: '50%', background: color, border: `4px solid ${COLORS.cream}`, boxShadow: '0 4px 14px rgba(26,11,6,0.4)', transform: `scale(${s})` }} />
      <div style={{
        position: 'absolute', left: '50%', transform: 'translateX(-50%)', [below ? 'top' : 'bottom']: size + 18, whiteSpace: 'nowrap', textAlign: 'center',
      } as React.CSSProperties}>
        <div style={{ fontFamily: FONT_MONO, fontWeight: 700, fontSize: 26, letterSpacing: 3, color: COLORS.ink }}>{label}</div>
        {sub && <div style={{ fontFamily: FONT_BODY, fontStyle: 'italic', fontSize: 26, color: COLORS.muted, marginTop: 4 }}>{sub}</div>}
      </div>
    </div>
  );
};

/** Lower-third name tag for parchment backgrounds (ink instead of cream). */
export const InkNameTag: React.FC<{ name: string; role?: string; at: number; outAt?: number; style?: React.CSSProperties }> = ({ name, role, at, outAt, style }) => {
  const frame = useCurrentFrame();
  return (
    <div style={{ opacity: showBetween(frame, at, outAt), display: 'flex', gap: 18, alignItems: 'stretch', ...style }}>
      <div style={{ width: 6, background: COLORS.accent, transform: `scaleY(${ramp(frame, at, at + 14)})`, transformOrigin: 'bottom' }} />
      <div style={{ transform: riseAt(frame, at + 3, 12).transform }}>
        <div style={{ fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 52, color: COLORS.ink }}>{name}</div>
        {role && <div style={{ fontFamily: FONT_BODY, fontStyle: 'italic', fontSize: 30, color: COLORS.muted }}>{role}</div>}
      </div>
    </div>
  );
};

export { SHADOW };
