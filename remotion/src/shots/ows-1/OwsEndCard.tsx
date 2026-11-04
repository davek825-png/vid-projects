// Beat 32 · 386.90–389.53 · "...and we'll see you again in the next story."
import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { BRAND, COLORS } from '../../brand';
import { FONT_DISPLAY, FONT_BODY } from '../../fonts';
import { NightBg, Grain, Dip, SunsetRule, riseAt } from '../../lib/frontier';

export const compositionConfig = { id: 'OwsEndCard', durationInSeconds: 2.633, fps: 30, width: 1920, height: 1080 };

const OwsEndCard: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill>
      <NightBg glow={COLORS.accent2} glowY={108} />
      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ ...riseAt(frame, 2, 20, 18), fontFamily: FONT_DISPLAY, fontWeight: 800, fontSize: 130, color: COLORS.cream }}>
          {BRAND.wordmark[0]}<span style={{ color: COLORS.warn }}>{BRAND.wordmark[1]}</span>{BRAND.wordmark[2]}
        </div>
        <div style={{ marginTop: 24 }}><SunsetRule at={10} width={520} /></div>
        <div style={{ ...riseAt(frame, 14, 12, 16), fontFamily: FONT_BODY, fontStyle: 'italic', fontSize: 46, color: COLORS.d300, marginTop: 34 }}>{BRAND.signoff}</div>
      </AbsoluteFill>
      <Grain />
      <Dip inFrames={8} outFrames={12} />
    </AbsoluteFill>
  );
};
export default OwsEndCard;
