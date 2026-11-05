// Beat 30 · 306.70–316.90 · "In 1869, the Nevada Legislature asked Congress to pay Thompson $6,000 for
// his service. Congress did not pay."
import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { COLORS } from '../../brand';
import { FONT_DISPLAY, FONT_BODY } from '../../fonts';
import { ParchmentBg, Grain, Dip, DocCard, Stamp, cueAt, riseAt } from '../../lib/frontier';

export const compositionConfig = { id: 'SnLegislature', durationInSeconds: 10.2, fps: 30, width: 1920, height: 1080 };

const c = cueAt(306.7);

const SnLegislature: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill>
      <ParchmentBg />
      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center' }}>
        <DocCard at={2} width={1300}>
          <div style={{ ...riseAt(frame, c(308.51), 10, 14), fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 44, letterSpacing: 4, color: COLORS.ink }}>NEVADA LEGISLATURE · 1869</div>
          <div style={{ ...riseAt(frame, c(310.37), 10, 14), fontFamily: FONT_BODY, fontSize: 46, color: COLORS.ink, marginTop: 40 }}>asks Congress to pay John Thompson</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 60, marginTop: 20 }}>
            <div style={{ ...riseAt(frame, c(312.07), 16, 18), fontFamily: FONT_DISPLAY, fontWeight: 900, fontSize: 170, color: COLORS.accent, lineHeight: 1 }}>$6,000</div>
            <Stamp text="NOT PAID" at={c(315.83)} size={84} />
          </div>
          <div style={{ ...riseAt(frame, c(313.5), 10, 14), fontFamily: FONT_BODY, fontStyle: 'italic', fontSize: 40, color: COLORS.muted, marginTop: 14 }}>for his service</div>
        </DocCard>
      </AbsoluteFill>
      <Grain opacity={0.05} />
      <Dip inFrames={6} />
    </AbsoluteFill>
  );
};
export default SnLegislature;
