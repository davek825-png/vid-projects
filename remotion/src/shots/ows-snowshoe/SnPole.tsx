// Beat 17 · 164.00–171.65 · "He also carried a single long pole. It helped him push, balance, and slow
// himself when going downhill." Archival photo is NOT identified as Thompson.
import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { COLORS } from '../../brand';
import { FONT_DISPLAY, FONT_BODY, FONT_MONO } from '../../fonts';
import { ParchmentBg, Grain, Dip, Print, cueAt, riseAt } from '../../lib/frontier';
import { IMG } from './_assets';

export const compositionConfig = { id: 'SnPole', durationInSeconds: 7.65, fps: 30, width: 1920, height: 1080 };

const c = cueAt(164.0);

const Use: React.FC<{ t: string; at: number; sub?: string; subAt?: number }> = ({ t, at, sub, subAt }) => {
  const frame = useCurrentFrame();
  return (
    <div style={{ display: 'flex', alignItems: 'baseline', gap: 24, marginBottom: 26 }}>
      <div style={{ ...riseAt(frame, at, 10, 14), fontFamily: FONT_MONO, fontWeight: 700, fontSize: 54, letterSpacing: 6, color: COLORS.ink }}>{t}</div>
      {sub && <div style={{ ...riseAt(frame, subAt ?? at, 8, 14), fontFamily: FONT_BODY, fontStyle: 'italic', fontSize: 40, color: COLORS.muted }}>{sub}</div>}
    </div>
  );
};

const SnPole: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill>
      <ParchmentBg />
      <Print src={IMG.archSkier} width={600} height={687} at={c(164.42)} rotate={-1.5} caption="Archival photograph" style={{ position: 'absolute', left: 200, top: 120 }} />
      <div style={{ position: 'absolute', left: 1000, top: 270 }}>
        <div style={{ ...riseAt(frame, c(165.16), 16, 20), fontFamily: FONT_DISPLAY, fontWeight: 800, fontSize: 74, color: COLORS.accent, marginBottom: 56 }}>A single long pole</div>
        <Use t="PUSH" at={c(167.58)} />
        <Use t="BALANCE" at={c(168.37)} />
        <Use t="SLOW DOWN" at={c(169.33)} sub="going downhill" subAt={c(170.38)} />
      </div>
      <Grain opacity={0.05} />
      <Dip inFrames={6} />
    </AbsoluteFill>
  );
};
export default SnPole;
