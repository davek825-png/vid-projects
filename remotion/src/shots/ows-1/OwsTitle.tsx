// Beat 06 · 38.50–43.80 · "Pull up a chair. This is Old West Stories, and this one's gonna be good."
// Episode title card. Must NOT reveal her name.
import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { COLORS } from '../../brand';
import { FONT_DISPLAY, FONT_MONO } from '../../fonts';
import { NightBg, Grain, Dip, SunsetRule, cueAt, riseAt } from '../../lib/frontier';

export const compositionConfig = { id: 'OwsTitle', durationInSeconds: 5.3, fps: 30, width: 1920, height: 1080 };

const c = cueAt(38.5);

const OwsTitle: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill>
      <NightBg glow={COLORS.accent2} glowY={110} />
      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ ...riseAt(frame, c(40.02), 10, 16), fontFamily: FONT_MONO, fontSize: 28, letterSpacing: 8, color: COLORS.warn }}>
          OLD WEST STORIES
        </div>
        <div style={{ ...riseAt(frame, c(38.74) + 4, 30, 30), fontFamily: FONT_DISPLAY, fontWeight: 800, fontSize: 132, color: COLORS.cream, marginTop: 24, textShadow: '0 6px 40px rgba(0,0,0,0.6)' }}>
          The Woman With No Name
        </div>
        <div style={{ marginTop: 34 }}><SunsetRule at={c(40.02) + 8} width={620} /></div>
      </AbsoluteFill>
      <Grain />
      <Dip inFrames={10} outFrames={10} />
    </AbsoluteFill>
  );
};
export default OwsTitle;
