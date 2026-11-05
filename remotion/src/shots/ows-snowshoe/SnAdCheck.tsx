// Beat 06 · 49.75–62.55 · "The employment ad identified the customer. It identified the problem.
// It did not identify how a mail carrier would get the job done in the snowy winter months over
// tall mountain passes."
import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { COLORS } from '../../brand';
import { FONT_DISPLAY, FONT_BODY } from '../../fonts';
import { ParchmentBg, Grain, Dip, DocCard, LedgerRow, cueAt, riseAt } from '../../lib/frontier';

export const compositionConfig = { id: 'SnAdCheck', durationInSeconds: 12.8, fps: 30, width: 1920, height: 1080 };

const c = cueAt(49.75);
const ok = <span style={{ color: COLORS.signal, fontWeight: 700 }}>✓</span>;

const SnAdCheck: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill>
      <ParchmentBg />
      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center' }}>
        <DocCard at={2} width={1380}>
          <div style={{ fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 40, letterSpacing: 4, color: COLORS.ink, marginBottom: 44 }}>THE AD SAID...</div>
          <LedgerRow k="CUSTOMER:" v={<>people lost to the world {ok}</>} at={c(50.22)} vAt={c(51.57)} />
          <LedgerRow k="PROBLEM:" v={<>no mail in winter {ok}</>} at={c(52.4)} vAt={c(53.17)} />
          <LedgerRow k="HOW:" v="?" at={c(54.23)} vAt={c(54.86)} hot size={52} />
          <div style={{ ...riseAt(frame, c(58.99), 10, 16), fontFamily: FONT_BODY, fontStyle: 'italic', fontSize: 42, color: COLORS.accent, marginLeft: 390 }}>
            in the snowy winter months, over tall mountain passes
          </div>
        </DocCard>
      </AbsoluteFill>
      <Grain opacity={0.05} />
      <Dip inFrames={6} />
    </AbsoluteFill>
  );
};
export default SnAdCheck;
