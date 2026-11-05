// Beat 12 · 114.70–121.75 · "He had come to California to dig for gold, and the gold had not paid
// off. He wanted the mail job."
import React from 'react';
import { AbsoluteFill } from 'remotion';
import { COLORS } from '../../brand';
import { KenBurns, DateStamp, Scrim, Caption, Grain, Dip, cueAt } from '../../lib/frontier';
import { IMG } from './_assets';

export const compositionConfig = { id: 'SnGold', durationInSeconds: 7.05, fps: 30, width: 1920, height: 1080 };

const c = cueAt(114.7);

const SnGold: React.FC = () => (
  <AbsoluteFill>
    <KenBurns src={IMG.camp} illustration from={{ s: 1.12, x: 2, y: 1 }} to={{ s: 1.02, x: 0, y: 0 }} />
    <Scrim height={480} />
    <DateStamp text="The California gold rush" at={c(115.68)} />
    <div style={{ position: 'absolute', left: 96, bottom: 110 }}>
      <Caption text="The gold did not pay off." at={c(117.7)} size={62} />
      <Caption text="He wanted the mail job." at={c(120.1)} size={62} color={COLORS.warn} style={{ marginTop: 12 }} />
    </div>
    <Grain />
    <Dip inFrames={8} />
  </AbsoluteFill>
);
export default SnGold;
