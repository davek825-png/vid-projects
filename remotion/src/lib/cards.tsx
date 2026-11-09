// Playing cards for frontier poker beats (reusable). NOT a shot. Frame-driven only.
// A card deals in (slides from `from`), and flips face-up at `flipAt` (scaleX through 0, back -> face).
// Suits are drawn as SVG paths (no font dependency). Brand colours: cream face, rust back.
import React from 'react';
import { useCurrentFrame } from 'remotion';
import { COLORS, EASINGS } from '../brand';
import { FONT_DISPLAY } from '../fonts';
import { ramp } from './frontier';

export type Suit = 'S' | 'C' | 'H' | 'D';
const RED = '#A3241A';
const INK = '#1E1410';

/** Suit glyph as an SVG path in a 100x100 box. */
export const SuitGlyph: React.FC<{ suit: Suit; size: number; color?: string }> = ({ suit, size, color }) => {
  const c = color ?? (suit === 'H' || suit === 'D' ? RED : INK);
  const d = {
    S: 'M50 4 C 30 30, 6 42, 6 62 C 6 78, 22 88, 38 80 C 42 78, 45 75, 47 72 C 46 82, 42 90, 34 96 L 66 96 C 58 90, 54 82, 53 72 C 55 75, 58 78, 62 80 C 78 88, 94 78, 94 62 C 94 42, 70 30, 50 4 Z',
    H: 'M50 94 C 30 74, 4 58, 4 34 C 4 18, 16 6, 30 6 C 40 6, 47 12, 50 20 C 53 12, 60 6, 70 6 C 84 6, 96 18, 96 34 C 96 58, 70 74, 50 94 Z',
    D: 'M50 2 L 88 50 L 50 98 L 12 50 Z',
    C: 'M50 6 A 18 18 0 1 1 49.9 6 Z M 24 40 A 18 18 0 1 1 23.9 40 Z M 76 40 A 18 18 0 1 1 75.9 40 Z M 46 50 L 54 50 C 54 70, 58 84, 68 96 L 32 96 C 42 84, 46 70, 46 50 Z',
  }[suit];
  return <svg width={size} height={size} viewBox="0 0 100 100" style={{ display: 'block' }}><path d={d} fill={c} /></svg>;
};

const Back: React.FC<{ w: number; h: number }> = ({ w, h }) => (
  <div style={{ width: w, height: h, borderRadius: w * 0.08, background: COLORS.accent, border: `${Math.max(3, w * 0.035)}px solid ${COLORS.cream}`, boxSizing: 'border-box', position: 'relative', overflow: 'hidden' }}>
    <div style={{ position: 'absolute', inset: w * 0.07, borderRadius: w * 0.05, border: `2px solid ${COLORS.warn}`, opacity: 0.8,
      backgroundImage: `repeating-linear-gradient(45deg, rgba(247,189,106,0.28) 0 2px, transparent 2px 14px), repeating-linear-gradient(-45deg, rgba(247,189,106,0.28) 0 2px, transparent 2px 14px)` }} />
  </div>
);

const Face: React.FC<{ w: number; h: number; rank: string; suit: Suit }> = ({ w, h, rank, suit }) => {
  const col = suit === 'H' || suit === 'D' ? RED : INK;
  const corner = (flip: boolean) => (
    <div style={{ position: 'absolute', [flip ? 'right' : 'left']: w * 0.07, [flip ? 'bottom' : 'top']: h * 0.04, transform: flip ? 'rotate(180deg)' : undefined, textAlign: 'center' } as React.CSSProperties}>
      <div style={{ fontFamily: FONT_DISPLAY, fontWeight: 800, fontSize: w * 0.24, lineHeight: 1, color: col }}>{rank}</div>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}><SuitGlyph suit={suit} size={w * 0.16} /></div>
    </div>
  );
  return (
    <div style={{ width: w, height: h, borderRadius: w * 0.08, background: '#FBF4E4', border: `1px solid ${COLORS.line}`, boxSizing: 'border-box', position: 'relative' }}>
      {corner(false)}{corner(true)}
      <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}><SuitGlyph suit={suit} size={w * 0.5} /></div>
    </div>
  );
};

/** One card. Positioned by the caller (absolute). dealAt: slides in; flipAt: turns face-up. */
export const PlayingCard: React.FC<{
  rank?: string; suit?: Suit; w?: number; dealAt?: number; flipAt?: number; rotate?: number;
  from?: [number, number]; style?: React.CSSProperties; dim?: number;
}> = ({ rank = 'A', suit = 'S', w = 170, dealAt = 0, flipAt, rotate = 0, from = [0, 260], style, dim = 0 }) => {
  const frame = useCurrentFrame();
  const h = Math.round(w * 1.4);
  const p = ramp(frame, dealAt, dealAt + 12, 0, 1, EASINGS.easeOut);
  const flip = flipAt === undefined ? 0 : ramp(frame, flipAt, flipAt + 10, 0, 1, EASINGS.easeInOut);
  const showFace = flip >= 0.5;
  const sx = Math.abs(Math.cos(flip * Math.PI));
  return (
    <div style={{
      opacity: p, transform: `translate(${from[0] * (1 - p)}px, ${from[1] * (1 - p)}px) rotate(${rotate}deg) scale(${1 + Math.sin(flip * Math.PI) * 0.06})`,
      filter: `drop-shadow(0 10px 18px rgba(0,0,0,0.45)) brightness(${1 - dim})`, ...style,
    }}>
      <div style={{ transform: `scaleX(${Math.max(0.02, sx)})` }}>{showFace ? <Face w={w} h={h} rank={rank} suit={suit} /> : <Back w={w} h={h} />}</div>
    </div>
  );
};
