// Beat 21 · 205.05–219.55 · "Then there was the load. He carried 60 to 80 pounds of letters and
// packages, sometimes more. He carried little food. He melted snow for water. He went without a
// blanket because a blanket would have taken room the mail needed."
import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { COLORS } from '../../brand';
import { FONT_DISPLAY, FONT_BODY } from '../../fonts';
import { KenBurns, LedgerRow, Grain, Dip, cueAt, riseAt } from '../../lib/frontier';
import { IMG } from './_assets';

export const compositionConfig = { id: 'SnLoad', durationInSeconds: 14.5, fps: 30, width: 1920, height: 1080 };

const c = cueAt(205.05);

const SnLoad: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill>
      <KenBurns src={IMG.climb} illustration position="center 30%" from={{ s: 1.3, x: -8, y: 4 }} to={{ s: 1.42, x: -10, y: 5 }} />
      <AbsoluteFill style={{ background: 'linear-gradient(to right, rgba(26,11,6,0.9) 0%, rgba(26,11,6,0.7) 44%, transparent 70%)' }} />
      <div style={{ position: 'absolute', left: 96, top: 200, width: 1000 }}>
        <div style={{ ...riseAt(frame, c(205.44), 16, 18), fontFamily: FONT_DISPLAY, fontWeight: 800, fontSize: 84, color: COLORS.cream, marginBottom: 54 }}>The load</div>
        <LedgerRow dark k="MAIL:" v="60 to 80 lb" at={c(207.35)} vAt={c(208.31)} keyWidth={250} />
        <div style={{ ...riseAt(frame, c(210.17), 8, 14), fontFamily: FONT_BODY, fontStyle: 'italic', fontSize: 34, color: COLORS.d300, margin: '-18px 0 30px 280px' }}>sometimes more</div>
        <LedgerRow dark k="FOOD:" v="little" at={c(211.75)} vAt={c(212.09)} keyWidth={250} />
        <LedgerRow dark k="WATER:" v="melted snow" at={c(213.12)} vAt={c(213.44)} keyWidth={250} />
        <LedgerRow dark k="BLANKET:" v="none" at={c(215.3)} vAt={c(215.68)} keyWidth={250} hot />
        <div style={{ ...riseAt(frame, c(217.46), 8, 14), fontFamily: FONT_BODY, fontStyle: 'italic', fontSize: 38, color: COLORS.warn, marginLeft: 280 }}>the mail needed the room</div>
      </div>
      <Grain />
      <Dip inFrames={8} />
    </AbsoluteFill>
  );
};
export default SnLoad;
