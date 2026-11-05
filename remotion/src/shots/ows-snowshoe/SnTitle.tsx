// Beat 07 · 62.55–68.25 · "Pull up a chair. This is Old West Stories, and this one is gonna be good."
// Episode title card (script v3 title).
import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { COLORS } from '../../brand';
import { FONT_DISPLAY, FONT_MONO } from '../../fonts';
import { NightBg, Grain, Dip, SunsetRule, cueAt, riseAt } from '../../lib/frontier';

export const compositionConfig = { id: 'SnTitle', durationInSeconds: 5.7, fps: 30, width: 1920, height: 1080 };

const c = cueAt(62.55);

const SnTitle: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill>
      <NightBg glow={COLORS.accent2} glowY={110} />
      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
        <div style={{ ...riseAt(frame, c(64.33), 10, 16), fontFamily: FONT_MONO, fontSize: 28, letterSpacing: 8, color: COLORS.warn }}>OLD WEST STORIES</div>
        <div style={{ ...riseAt(frame, c(62.97) + 4, 30, 30), fontFamily: FONT_DISPLAY, fontWeight: 800, fontSize: 118, lineHeight: 1.04, color: COLORS.cream, marginTop: 24, textShadow: '0 6px 40px rgba(0,0,0,0.6)' }}>
          The Road That Disappeared<br />Every Winter
        </div>
        <div style={{ marginTop: 36 }}><SunsetRule at={c(64.33) + 8} width={640} /></div>
      </AbsoluteFill>
      <Grain />
      <Dip inFrames={10} outFrames={10} />
    </AbsoluteFill>
  );
};
export default SnTitle;
