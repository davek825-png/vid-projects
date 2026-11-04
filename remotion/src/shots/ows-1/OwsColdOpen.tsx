// Beat 01 · 0.00–8.60 · "Welcome to Old West Stories. Ride with us through the true tales of the
// frontier, one good story at a time." Wordmark on "Welcome", tagline on "Ride with us".
import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { BRAND, COLORS } from '../../brand';
import { FONT_DISPLAY, FONT_BODY, FONT_MONO } from '../../fonts';
import { NightBg, Grain, Dip, SunsetRule, cueAt, riseAt } from '../../lib/frontier';

export const compositionConfig = { id: 'OwsColdOpen', durationInSeconds: 8.6, fps: 30, width: 1920, height: 1080 };

const c = cueAt(0);

const OwsColdOpen: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill>
      <NightBg glow={COLORS.accent2} glowY={108} />
      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ ...riseAt(frame, c(0.1) + 2, 26, 26), fontFamily: FONT_DISPLAY, fontWeight: 800, fontSize: 150, letterSpacing: -1, color: COLORS.cream, textShadow: '0 6px 40px rgba(0,0,0,0.6)' }}>
          {BRAND.wordmark[0]}<span style={{ color: COLORS.warn }}>{BRAND.wordmark[1]}</span>{BRAND.wordmark[2]}
        </div>
        <div style={{ marginTop: 26 }}><SunsetRule at={c(0.1) + 18} width={560} /></div>
        <div style={{ ...riseAt(frame, c(2.68), 14, 18), fontFamily: FONT_BODY, fontStyle: 'italic', fontSize: 46, color: COLORS.d300, marginTop: 38 }}>
          True tales of the frontier
        </div>
        <div style={{ ...riseAt(frame, c(6.19), 10, 18), fontFamily: FONT_MONO, fontSize: 26, letterSpacing: 6, color: COLORS.warn, marginTop: 30, textTransform: 'uppercase' }}>
          One good story at a time
        </div>
      </AbsoluteFill>
      <Grain />
      <Dip inFrames={0} outFrames={10} />
    </AbsoluteFill>
  );
};
export default OwsColdOpen;
