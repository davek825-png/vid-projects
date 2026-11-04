// Beat 04 · 17.20–28.60 · "Yet the journal almost never gives her a name. Instead, she is, quote,
// 'the wife of our interpreter.' Sometimes she is simply, quote, 'the Indian woman.'"
import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { COLORS } from '../../brand';
import { FONT_MONO } from '../../fonts';
import { ParchmentBg, Grain, Dip, DocCard, QuoteLine, Mark, cueAt, riseAt, ramp } from '../../lib/frontier';

export const compositionConfig = { id: 'OwsNoName', durationInSeconds: 11.4, fps: 30, width: 1920, height: 1080 };

const c = cueAt(17.2);

const OwsNoName: React.FC = () => {
  const frame = useCurrentFrame();
  const blank = c(19.59); // "a name"
  const blink = frame >= blank && Math.floor(frame / 15) % 2 === 0 ? 1 : 0.25;
  return (
    <AbsoluteFill>
      <ParchmentBg />
      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center' }}>
        <DocCard at={2} width={1300}>
          <div style={{ ...riseAt(frame, c(18.55), 8, 14), fontFamily: FONT_MONO, fontSize: 46, fontWeight: 700, color: COLORS.ink, letterSpacing: 3 }}>
            NAME: <span style={{ opacity: ramp(frame, blank, blank + 10) * blink, color: COLORS.accent }}>________________</span>
          </div>
          <div style={{ height: 1, background: COLORS.line, margin: '38px 0 34px' }} />
          <div style={{ ...riseAt(frame, c(20.63), 6, 14), fontFamily: FONT_MONO, fontSize: 24, letterSpacing: 4, color: COLORS.muted, marginBottom: 18 }}>
            INSTEAD, THE JOURNAL CALLS HER
          </div>
          <QuoteLine at={c(22.6)} size={58}><Mark at={c(22.78) + 4}>"the wife of our interpreter"</Mark></QuoteLine>
          <div style={{ height: 22 }} />
          <QuoteLine at={c(27.0)} size={58}><Mark at={c(27.19) + 4}>"the Indian woman"</Mark></QuoteLine>
        </DocCard>
      </AbsoluteFill>
      <Grain opacity={0.05} />
      <Dip inFrames={6} outFrames={8} />
    </AbsoluteFill>
  );
};
export default OwsNoName;
