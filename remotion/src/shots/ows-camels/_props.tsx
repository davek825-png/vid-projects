// Hand-drawn SVG props for ows-camels (all three styles; the style's Mat wrapper adds the material).
// REVEAL RULE: nothing here may read as a camel before beat 26 (no humps, no camel silhouettes).
import React from 'react';
import { COLORS } from '../../brand';

/** A robed handler figure (head wrap, robe, staff), front view. Unnamed on purpose. */
export const Handler: React.FC<{ color: string; h?: number }> = ({ color, h = 380 }) => (
  <svg width={h * 0.55} height={h} viewBox="0 0 110 200">
    <line x1={92} y1={40} x2={98} y2={196} stroke={COLORS.d600} strokeWidth={5} strokeLinecap="round" />
    <path d="M55 52 C30 58 24 90 20 196 L90 196 C86 90 80 58 55 52 Z" fill={color} />
    <path d="M40 70 L55 120 L70 70" fill="none" stroke={COLORS.ink} strokeOpacity={0.25} strokeWidth={3} />
    <circle cx={55} cy={36} r={17} fill="#C8925E" />
    <path d="M36 32 C36 12 74 12 74 32 C68 26 42 26 36 32 Z" fill={COLORS.cream} />
    <path d="M37 33 C40 52 70 52 73 33 L76 44 C70 60 40 60 34 44 Z" fill={COLORS.cream} opacity={0.9} />
  </svg>
);

/** Sealed orders envelope (address = abstract strokes). */
export const EnvelopeArt: React.FC<{ w?: number }> = ({ w = 640 }) => {
  const h = Math.round(w * 0.6);
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`}>
      <rect x={0} y={0} width={w} height={h} fill={COLORS.cream} />
      <path d={`M0 0 L${w / 2} ${h * 0.52} L${w} 0`} fill="none" stroke={COLORS.line} strokeWidth={4} />
      {[0.66, 0.76, 0.86].map((y, i) => <line key={i} x1={w * 0.32} y1={h * y} x2={w * (0.84 - i * 0.08)} y2={h * y} stroke={COLORS.ink} strokeOpacity={0.22} strokeWidth={8} strokeLinecap="round" />)}
      <circle cx={w / 2} cy={h * 0.52} r={36} fill={COLORS.danger} />
      <circle cx={w / 2} cy={h * 0.52} r={22} fill="none" stroke="#8E2C1C" strokeWidth={4} />
    </svg>
  );
};

/** A closed leather history book (cover ornament only, no legible text). */
export const BookArt: React.FC<{ w?: number }> = ({ w = 460 }) => {
  const h = Math.round(w * 1.3);
  return (
    <svg width={w} height={h} viewBox="0 0 100 130">
      <rect x={6} y={4} width={92} height={122} rx={3} fill={COLORS.cream} />
      <rect x={2} y={2} width={90} height={124} rx={4} fill="#5A2414" />
      <rect x={2} y={2} width={12} height={124} rx={3} fill="#3E170C" />
      <rect x={24} y={16} width={58} height={98} fill="none" stroke={COLORS.warn} strokeWidth={1.4} />
      <rect x={34} y={42} width={38} height={4} fill={COLORS.warn} opacity={0.85} />
      <rect x={40} y={52} width={26} height={3} fill={COLORS.warn} opacity={0.6} />
      {[20, 40, 90, 110].map((y) => <rect key={y} x={3} y={y} width={10} height={2} fill={COLORS.warn} opacity={0.7} />)}
    </svg>
  );
};

/** An 1850s newspaper page: masthead + columns of abstract strokes (no invented headlines). */
export const PaperArt: React.FC<{ w?: number; seed?: number }> = ({ w = 520, seed = 1 }) => {
  const h = Math.round(w * 1.3);
  const cols = 4;
  const lines: React.ReactNode[] = [];
  for (let c = 0; c < cols; c++) {
    for (let r = 0; r < 26; r++) {
      const ww = 14 + ((r * 7 + c * 5 + seed * 3) % 9);
      lines.push(<rect key={`${c}-${r}`} x={6 + c * 22} y={34 + r * 3.4} width={ww} height={1.4} fill={COLORS.ink} opacity={0.32} />);
    }
  }
  return (
    <svg width={w} height={h} viewBox="0 0 100 130">
      <rect x={0} y={0} width={100} height={130} fill="#F3E6C8" />
      <rect x={10} y={6} width={80} height={9} fill={COLORS.ink} opacity={0.75} />
      <rect x={4} y={18} width={92} height={0.8} fill={COLORS.ink} />
      <rect x={4} y={20.5} width={92} height={0.4} fill={COLORS.ink} />
      <rect x={12} y={24} width={76} height={5} fill={COLORS.ink} opacity={0.5} />
      {lines}
    </svg>
  );
};

/** Side-view pack animal icons (labelled on screen; not camels). */
export const HorseArt: React.FC<{ w?: number; mule?: boolean; color?: string }> = ({ w = 360, mule = false, color = COLORS.d600 }) => (
  <svg width={w} height={w * 0.8} viewBox="0 0 150 120">
    <ellipse cx={72} cy={60} rx={42} ry={20} fill={color} />
    <path d="M100 52 L118 22 L132 26 L120 58 Z" fill={color} />
    <path d="M118 22 L140 30 L142 40 L126 40 Z" fill={color} />
    {mule
      ? <><path d="M122 22 L118 2 L126 20 Z" fill={color} /><path d="M128 24 L130 4 L134 24 Z" fill={color} /></>
      : <path d="M124 22 L124 12 L129 21 Z" fill={color} />}
    {[40, 54, 92, 104].map((x) => <rect key={x} x={x} y={70} width={8} height={44} rx={3} fill={color} />)}
    <path d="M30 56 C14 60 10 78 14 92 C20 80 24 70 32 64 Z" fill={color} />
  </svg>
);

/** A tall boxy load under lashed canvas (deliberately NOT animal-shaped). */
export const TarpArt: React.FC<{ w?: number }> = ({ w = 520 }) => (
  <svg width={w} height={w * 1.05} viewBox="0 0 100 105">
    <path d="M10 102 L8 28 C8 18 14 12 26 11 L74 10 C86 11 92 18 92 28 L90 102 Z" fill="#CDB487" />
    <path d="M14 102 L12 30 M88 102 L90 30" stroke="#A58C62" strokeWidth={2} />
    <path d="M22 14 C30 40 26 70 30 102 M50 11 C54 40 48 70 52 102 M76 12 C70 40 76 70 72 102" fill="none" stroke="#B79D70" strokeWidth={1.6} />
    <path d="M6 40 L94 38 M6 72 L94 70" stroke={COLORS.d600} strokeWidth={2.6} />
    <path d="M10 102 L90 102" stroke={COLORS.d600} strokeWidth={3} />
  </svg>
);

/** Small skull mark for the strip map. */
export const SkullArt: React.FC<{ s?: number }> = ({ s = 46 }) => (
  <svg width={s} height={s} viewBox="0 0 40 40">
    <path d="M20 4 C9 4 4 11 4 19 C4 25 8 28 11 29 L11 35 L29 35 L29 29 C32 28 36 25 36 19 C36 11 31 4 20 4 Z" fill={COLORS.cream} stroke={COLORS.d600} strokeWidth={2.4} />
    <circle cx={14} cy={19} r={4.5} fill={COLORS.d600} />
    <circle cx={26} cy={19} r={4.5} fill={COLORS.d600} />
    <path d="M17 35 L17 31 M20 35 L20 31 M23 35 L23 31" stroke={COLORS.d600} strokeWidth={1.8} />
  </svg>
);

/** Water mark (teardrop). */
export const DropArt: React.FC<{ s?: number }> = ({ s = 44 }) => (
  <svg width={s} height={s * 1.3} viewBox="0 0 30 40">
    <path d="M15 2 C15 2 3 18 3 26 C3 33 8.5 38 15 38 C21.5 38 27 33 27 26 C27 18 15 2 15 2 Z" fill="#5B7C93" stroke={COLORS.cream} strokeWidth={2} />
  </svg>
);

/** An eye glyph for "with their own eyes". */
export const EyeArt: React.FC<{ s?: number }> = ({ s = 70 }) => (
  <svg width={s} height={s * 0.6} viewBox="0 0 50 30">
    <path d="M2 15 C12 2 38 2 48 15 C38 28 12 28 2 15 Z" fill={COLORS.cream} stroke={COLORS.ink} strokeWidth={2.4} />
    <circle cx={25} cy={15} r={7} fill={COLORS.accent} />
    <circle cx={25} cy={15} r={3} fill={COLORS.ink} />
  </svg>
);

/** A sighting note: small paper with abstract handwriting strokes. */
export const NoteArt: React.FC<{ w?: number; seed?: number }> = ({ w = 300, seed = 1 }) => (
  <svg width={w} height={w * 0.62} viewBox="0 0 100 62">
    <rect x={0} y={0} width={100} height={62} fill="#F3E6C8" />
    {[12, 22, 32, 42, 52].map((y, i) => <rect key={y} x={8} y={y} width={50 + ((seed * 13 + i * 17) % 34)} height={2.4} rx={1.2} fill={COLORS.ink} opacity={0.3} />)}
  </svg>
);
