// Beat 05 · 28.60–38.50 · "Why would men who wrote down nearly every mile of their journey forget a
// name? Keep that question close. The answer is the story."
import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { COLORS } from '../../brand';
import { FONT_BODY, FONT_MONO } from '../../fonts';
import { NightBg, Grain, Dip, TypeText, Caption, cueAt, riseAt } from '../../lib/frontier';

export const compositionConfig = { id: 'OwsQuestion', durationInSeconds: 9.9, fps: 30, width: 1920, height: 1080 };

const c = cueAt(28.6);
const Q = 'Why would men who wrote down nearly every mile of their journey forget a name?';

const OwsQuestion: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill>
      <NightBg glow={COLORS.accent} glowY={120} />
      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', padding: '0 220px' }}>
        <div style={{ fontFamily: FONT_BODY, fontStyle: 'italic', fontSize: 70, lineHeight: 1.3, color: COLORS.cream, textAlign: 'center', minHeight: 280 }}>
          <TypeText text={Q} at={c(28.89)} cps={18.5} cursor />
        </div>
        <div style={{ ...riseAt(frame, c(34.25), 10, 16), fontFamily: FONT_MONO, fontSize: 30, letterSpacing: 6, color: COLORS.warn, marginTop: 40 }}>
          KEEP THAT QUESTION CLOSE
        </div>
        <div style={{ marginTop: 34 }}>
          <Caption text="The answer is the story." at={c(36.08)} size={60} />
        </div>
      </AbsoluteFill>
      <Grain />
      <Dip inFrames={8} />
    </AbsoluteFill>
  );
};
export default OwsQuestion;
