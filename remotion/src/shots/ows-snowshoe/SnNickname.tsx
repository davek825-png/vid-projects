// Beat 14 · 138.10–145.30 · "Over time, he earned the nickname 'Snowshoe Thompson,' but his actual
// equipment is where the nickname goes wrong."
import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { COLORS } from '../../brand';
import { FONT_DISPLAY, FONT_BODY } from '../../fonts';
import { NightBg, Grain, Dip, Mark, cueAt, riseAt, ramp } from '../../lib/frontier';

export const compositionConfig = { id: 'SnNickname', durationInSeconds: 7.2, fps: 30, width: 1920, height: 1080 };

const c = cueAt(138.1);

const SnNickname: React.FC = () => {
  const frame = useCurrentFrame();
  const wrong = c(143.66);
  const q = (ch: string) => <span style={{ color: frame >= wrong ? COLORS.warn : COLORS.cream, opacity: ramp(frame, c(140.29), c(140.29) + 10) }}>{ch}</span>;
  return (
    <AbsoluteFill>
      <NightBg glow={COLORS.accent2} glowY={105} />
      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
        <div style={{ ...riseAt(frame, c(140.29), 24, 24), fontFamily: FONT_DISPLAY, fontWeight: 800, fontSize: 140, color: COLORS.cream, textShadow: '0 6px 40px rgba(0,0,0,0.6)' }}>
          {q('“')}<Mark at={wrong} color={COLORS.accent2}>Snowshoe</Mark>{q('”')} Thompson
        </div>
        <div style={{ ...riseAt(frame, wrong, 12, 16), fontFamily: FONT_BODY, fontStyle: 'italic', fontSize: 46, color: COLORS.d300, marginTop: 30 }}>
          where the nickname goes wrong
        </div>
      </AbsoluteFill>
      <Grain />
      <Dip inFrames={8} />
    </AbsoluteFill>
  );
};
export default SnNickname;
