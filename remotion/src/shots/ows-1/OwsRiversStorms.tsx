// Beat 03 · 13.00–17.20 · "She was there through the rivers, the storms, and the hunger."
// TYPE ONLY: no image may show her face before the name reveal at 6:19 (creator rule).
import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { COLORS } from '../../brand';
import { FONT_DISPLAY, FONT_BODY } from '../../fonts';
import { NightBg, Grain, Dip, cueAt, riseAt } from '../../lib/frontier';

export const compositionConfig = { id: 'OwsRiversStorms', durationInSeconds: 4.2, fps: 30, width: 1920, height: 1080 };

const c = cueAt(13.0);
const WORDS: [string, number][] = [['the rivers', 14.3], ['the storms', 15.16], ['the hunger', 16.21]];

const OwsRiversStorms: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill>
      <NightBg glow={COLORS.accent} glowY={112} />
      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', gap: 6 }}>
        <div style={{ ...riseAt(frame, c(13.34), 10, 14), fontFamily: FONT_BODY, fontStyle: 'italic', fontSize: 44, color: COLORS.d300, marginBottom: 24 }}>
          She was there through
        </div>
        {WORDS.map(([w, t], i) => (
          <div key={w} style={{
            ...riseAt(frame, c(t), 18, 16), fontFamily: FONT_DISPLAY, fontWeight: 800, fontSize: 120, lineHeight: 1.05,
            textTransform: 'uppercase', letterSpacing: 2, color: i === 2 ? COLORS.warn : COLORS.cream,
          }}>{w}</div>
        ))}
      </AbsoluteFill>
      <Grain />
      <Dip inFrames={6} />
    </AbsoluteFill>
  );
};
export default OwsRiversStorms;
