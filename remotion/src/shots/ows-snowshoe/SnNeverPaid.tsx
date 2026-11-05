// Beat 37 · 366.95–370.70 · "And he never received payment for any of it."
import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { COLORS } from '../../brand';
import { FONT_DISPLAY, FONT_BODY } from '../../fonts';
import { NightBg, Grain, Dip, Print, cueAt, riseAt } from '../../lib/frontier';
import { IMG } from './_assets';

export const compositionConfig = { id: 'SnNeverPaid', durationInSeconds: 3.75, fps: 30, width: 1920, height: 1080 };

const c = cueAt(366.95);

const SnNeverPaid: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill>
      <NightBg glow={COLORS.accent} glowY={100} />
      <Print src={IMG.portrait} width={460} height={584} at={2} rotate={-1.5} zoomTo={1.04} style={{ position: 'absolute', left: 330, top: 200 }} />
      <div style={{ position: 'absolute', left: 1000, top: 400 }}>
        <div style={{ ...riseAt(frame, c(367.7), 18, 20), fontFamily: FONT_DISPLAY, fontWeight: 800, fontSize: 130, color: COLORS.warn }}>Never paid.</div>
        <div style={{ ...riseAt(frame, c(369.37), 10, 16), fontFamily: FONT_BODY, fontStyle: 'italic', fontSize: 44, color: COLORS.d300, marginTop: 14 }}>not for any of it</div>
      </div>
      <Grain />
      <Dip inFrames={10} />
    </AbsoluteFill>
  );
};
export default SnNeverPaid;
