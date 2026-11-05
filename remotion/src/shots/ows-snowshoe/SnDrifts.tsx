// Beat 03 · 13.00–21.10 · "Snow piled up in drifts so deep that a wagon stopped being a practical
// idea, and a horse could sink out of sight." Ink diagram: snow rises past a wagon wheel, then a horse.
import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { COLORS, EASINGS } from '../../brand';
import { FONT_MONO, FONT_BODY } from '../../fonts';
import { ParchmentBg, Grain, Dip, cueAt, ramp, riseAt } from '../../lib/frontier';

export const compositionConfig = { id: 'SnDrifts', durationInSeconds: 8.1, fps: 30, width: 1920, height: 1080 };

const c = cueAt(13.0);
const GROUND = 880;
const HORSE = 'M 30 95 L 18 80 L 30 55 L 55 40 L 70 20 L 78 32 L 88 30 L 120 70 L 130 105 L 230 100 L 262 112 L 278 140 L 292 205 L 282 205 L 270 152 L 262 160 L 262 260 L 248 260 L 244 172 L 200 176 L 150 173 L 140 260 L 126 260 L 122 176 L 108 160 L 100 260 L 86 260 L 88 150 L 80 120 L 62 95 L 45 102 Z';

const Label: React.FC<{ k: string; v: string; at: number; x: number }> = ({ k, v, at, x }) => {
  const frame = useCurrentFrame();
  return (
    <div style={{ position: 'absolute', left: x, top: 150, width: 560, textAlign: 'center', ...riseAt(frame, at, 10, 14) }}>
      <div style={{ fontFamily: FONT_MONO, fontWeight: 700, fontSize: 34, letterSpacing: 5, color: COLORS.ink }}>{k}</div>
      <div style={{ fontFamily: FONT_BODY, fontStyle: 'italic', fontSize: 40, color: COLORS.accent, marginTop: 8 }}>{v}</div>
    </div>
  );
};

const SnDrifts: React.FC = () => {
  const frame = useCurrentFrame();
  // snow height above ground, px: buries the wheel by "stopped", the horse by "sight"
  const h1 = ramp(frame, c(14.47), c(16.4), 0, 190, EASINGS.easeInOut); // wheel hub buried, horse only to the knees
  const h2 = ramp(frame, c(19.39), c(20.6), 0, 320, EASINGS.easeInOut); // horse gone
  const snow = h1 + h2;
  const top = GROUND - snow;
  const wave = (frame % 300) / 300;
  return (
    <AbsoluteFill>
      <ParchmentBg />
      <svg width={1920} height={1080} style={{ position: 'absolute', inset: 0 }}>
        {/* wagon wheel */}
        <g transform="translate(620 710)" stroke={COLORS.ink} fill="none">
          <circle r={165} strokeWidth={14} />
          <circle r={26} strokeWidth={10} fill={COLORS.ink} />
          {Array.from({ length: 12 }, (_, i) => {
            const a = (i * Math.PI) / 6;
            return <line key={i} x1={0} y1={0} x2={Math.cos(a) * 160} y2={Math.sin(a) * 160} strokeWidth={8} />;
          })}
        </g>
        {/* horse silhouette */}
        <g transform={`translate(1060 ${GROUND - 260 * 1.9}) scale(1.9)`}>
          <path d={HORSE} fill={COLORS.ink} />
        </g>
        <line x1={0} y1={GROUND} x2={1920} y2={GROUND} stroke={COLORS.muted} strokeWidth={4} />
        {/* rising snow */}
        <path d={`M 0 1080 L 0 ${top} Q ${480 + wave * 40} ${top - 26} 960 ${top} T 1920 ${top} L 1920 1080 Z`} fill="#F7F1E6" stroke="#C9C3BA" strokeWidth={4} />
      </svg>
      <Label k="A WAGON" v="stopped being practical" at={c(15.85)} x={340} />
      <Label k="A HORSE" v="could sink out of sight" at={c(18.81)} x={1020} />
      <Grain opacity={0.05} />
      <Dip inFrames={6} />
    </AbsoluteFill>
  );
};
export default SnDrifts;
