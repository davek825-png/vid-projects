// Beat 28 · 283.90–290.55 · "A 2005 public television investigation says he arrived just in time."
import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { COLORS } from '../../brand';
import { FONT_DISPLAY, FONT_MONO } from '../../fonts';
import { NightBg, Grain, Dip, SunsetRule, cueAt, riseAt } from '../../lib/frontier';

export const compositionConfig = { id: 'SnJustInTime', durationInSeconds: 6.65, fps: 30, width: 1920, height: 1080 };

const c = cueAt(283.9);

const SnJustInTime: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill>
      <NightBg glow={COLORS.accent2} glowY={105} />
      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
        <div style={{ ...riseAt(frame, c(284.42), 10, 16), fontFamily: FONT_MONO, fontSize: 28, letterSpacing: 5, color: COLORS.d400 }}>A 2005 PUBLIC TELEVISION INVESTIGATION</div>
        <div style={{ marginTop: 30 }}><SunsetRule at={c(286.37)} width={520} /></div>
        <div style={{ ...riseAt(frame, c(288.68), 22, 24), fontFamily: FONT_DISPLAY, fontWeight: 800, fontSize: 150, color: COLORS.cream, marginTop: 40, textShadow: '0 6px 40px rgba(0,0,0,0.6)' }}>Just in time.</div>
      </AbsoluteFill>
      <Grain />
      <Dip inFrames={10} />
    </AbsoluteFill>
  );
};
export default SnJustInTime;
