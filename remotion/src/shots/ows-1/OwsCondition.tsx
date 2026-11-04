// Beat 13 · 94.10–107.40 · "They hired an Indian man to be their guide and interpreter... He agreed on
// one condition: his wife could come along too. Lewis and Clark readily agreed."
import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { COLORS, EASINGS } from '../../brand';
import { FONT_DISPLAY, FONT_MONO } from '../../fonts';
import { ParchmentBg, Grain, Dip, DocCard, cueAt, riseAt, ramp } from '../../lib/frontier';

export const compositionConfig = { id: 'OwsCondition', durationInSeconds: 13.3, fps: 30, width: 1920, height: 1080 };

const c = cueAt(94.1);
const Row: React.FC<{ k: string; v: string; at: number; vAt?: number; hot?: boolean }> = ({ k, v, at, vAt, hot }) => {
  const frame = useCurrentFrame();
  return (
    <div style={{ display: 'flex', gap: 30, alignItems: 'baseline', marginBottom: 34 }}>
      <div style={{ ...riseAt(frame, at, 8, 12), width: 360, fontFamily: FONT_MONO, fontWeight: 700, fontSize: 34, letterSpacing: 3, color: COLORS.muted }}>{k}</div>
      <div style={{ ...riseAt(frame, vAt ?? at + 6, 8, 12), fontFamily: FONT_MONO, fontSize: 40, color: hot ? COLORS.accent : COLORS.ink, fontWeight: hot ? 700 : 400 }}>{v}</div>
    </div>
  );
};

const OwsCondition: React.FC = () => {
  const frame = useCurrentFrame();
  const st = c(105.97); // "readily agreed"
  return (
    <AbsoluteFill>
      <ParchmentBg />
      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center' }}>
        <DocCard at={2} width={1280}>
          <div style={{ fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 40, letterSpacing: 4, color: COLORS.ink, marginBottom: 40 }}>FORT MANDAN · WINTER 1804</div>
          <Row k="HIRED:" v="a guide & interpreter" at={c(94.26)} vAt={c(95.85)} />
          <Row k="ONE CONDITION:" v="his wife comes too" at={c(101.47)} vAt={c(103.08)} hot />
          <div style={{ height: 130 }} />
          <div style={{
            position: 'absolute', right: 40, bottom: 0, opacity: ramp(frame, st, st + 4),
            transform: `rotate(-12deg) scale(${ramp(frame, st, st + 8, 1.8, 1, EASINGS.easeOut)})`,
            fontFamily: FONT_DISPLAY, fontWeight: 900, fontSize: 92, letterSpacing: 6, color: COLORS.danger,
            border: `8px solid ${COLORS.danger}`, padding: '4px 30px', borderRadius: 10,
          }}>AGREED</div>
        </DocCard>
      </AbsoluteFill>
      <Grain opacity={0.05} />
      <Dip inFrames={6} />
    </AbsoluteFill>
  );
};
export default OwsCondition;
