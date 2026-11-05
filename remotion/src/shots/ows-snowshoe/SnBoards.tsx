// Beat 16 · 151.20–164.00 · "He used long wooden boards about 10 feet long, weighing roughly 25 pounds
// each. The Sacramento paper called them 'Norwegian skates.' Today, we call them skis."
import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { COLORS } from '../../brand';
import { FONT_BODY, FONT_MONO } from '../../fonts';
import { ParchmentBg, Grain, Dip, Print, LedgerRow, Stamp, cueAt, riseAt } from '../../lib/frontier';
import { IMG } from './_assets';

export const compositionConfig = { id: 'SnBoards', durationInSeconds: 12.8, fps: 30, width: 1920, height: 1080 };

const c = cueAt(151.2);

const SnBoards: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill>
      <ParchmentBg />
      <Print src={IMG.skiTips} width={1100} height={430} at={c(151.73)} rotate={-1} caption="Long wooden boards" style={{ position: 'absolute', left: 390, top: 70 }} />
      <div style={{ position: 'absolute', left: 150, top: 700 }}>
        <LedgerRow k="LENGTH:" v="about 10 feet" at={c(152.79)} vAt={c(153.61)} keyWidth={240} />
        <LedgerRow k="WEIGHT:" v="roughly 25 lb each" at={c(155.03)} vAt={c(155.76)} keyWidth={240} />
      </div>
      <div style={{ position: 'absolute', left: 1080, top: 680, width: 720 }}>
        <div style={{ ...riseAt(frame, c(159.92), 12, 16), fontFamily: FONT_BODY, fontStyle: 'italic', fontSize: 58, color: COLORS.ink }}>“Norwegian skates”</div>
        <div style={{ ...riseAt(frame, c(160.3), 8, 14), fontFamily: FONT_MONO, fontSize: 24, letterSpacing: 2, color: COLORS.muted, marginTop: 8 }}>THE SACRAMENTO PAPER</div>
        <div style={{ marginTop: 30 }}><Stamp text="TODAY: SKIS" at={c(163.21)} color={COLORS.accent} size={62} rotate={-5} /></div>
      </div>
      <Grain opacity={0.05} />
      <Dip inFrames={6} />
    </AbsoluteFill>
  );
};
export default SnBoards;
