// Beat 38 · 370.70–377.933 · "If you like this story, give it a like and subscribe to Old West
// Stories, and we'll see you at the next story."
import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { BRAND, COLORS } from '../../brand';
import { FONT_DISPLAY, FONT_BODY, FONT_MONO } from '../../fonts';
import { NightBg, Grain, Dip, SunsetRule, cueAt, riseAt } from '../../lib/frontier';

export const compositionConfig = { id: 'SnEndCard', durationInSeconds: 7.233, fps: 30, width: 1920, height: 1080 };

const c = cueAt(370.7);

const SnEndCard: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill>
      <NightBg glow={COLORS.accent2} glowY={108} />
      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ display: 'flex', gap: 50, fontFamily: FONT_MONO, fontWeight: 700, fontSize: 34, letterSpacing: 8, color: COLORS.warn }}>
          <span style={riseAt(frame, c(372.58), 10, 14)}>LIKE</span>
          <span style={riseAt(frame, c(373.31), 10, 14)}>SUBSCRIBE</span>
        </div>
        <div style={{ ...riseAt(frame, c(374.04), 20, 20), fontFamily: FONT_DISPLAY, fontWeight: 800, fontSize: 130, color: COLORS.cream, marginTop: 30 }}>
          {BRAND.wordmark[0]}<span style={{ color: COLORS.warn }}>{BRAND.wordmark[1]}</span>{BRAND.wordmark[2]}
        </div>
        <div style={{ marginTop: 24 }}><SunsetRule at={c(374.6)} width={520} /></div>
        <div style={{ ...riseAt(frame, c(375.8), 12, 16), fontFamily: FONT_BODY, fontStyle: 'italic', fontSize: 46, color: COLORS.d300, marginTop: 34 }}>{BRAND.signoff}</div>
      </AbsoluteFill>
      <Grain />
      <Dip inFrames={8} outFrames={12} />
    </AbsoluteFill>
  );
};
export default SnEndCard;
