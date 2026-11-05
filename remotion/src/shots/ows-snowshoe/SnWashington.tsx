// Beat 31 · 316.90–324.35 · "3 years later, in 1872, Thompson went to Washington himself to make the
// case for being paid to do the job."
import React from 'react';
import { AbsoluteFill } from 'remotion';
import { KenBurns, DateStamp, Scrim, Caption, Grain, Dip, cueAt } from '../../lib/frontier';
import { IMG } from './_assets';

export const compositionConfig = { id: 'SnWashington', durationInSeconds: 7.45, fps: 30, width: 1920, height: 1080 };

const c = cueAt(316.9);

const SnWashington: React.FC = () => (
  <AbsoluteFill>
    <KenBurns src={IMG.capitol} illustration from={{ s: 1.03, x: 0, y: 0 }} to={{ s: 1.15, x: 0, y: 1.5 }} />
    <Scrim height={420} />
    <DateStamp text="Washington · 1872" at={c(318.47)} />
    <div style={{ position: 'absolute', left: 96, bottom: 110 }}>
      <Caption text="He went to make his case himself." at={c(320.72)} size={60} />
    </div>
    <Grain />
    <Dip inFrames={8} />
  </AbsoluteFill>
);
export default SnWashington;
