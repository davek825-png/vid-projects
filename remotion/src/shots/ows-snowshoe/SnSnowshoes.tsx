// Beat 15 · 145.30–151.20 · "People called him 'Snowshoe,' but he did not carry snowshoes, the woven
// kind most people picture."
import React from 'react';
import { AbsoluteFill } from 'remotion';
import { COLORS } from '../../brand';
import { KenBurns, Scrim, Caption, Grain, Dip, cueAt } from '../../lib/frontier';
import { IMG } from './_assets';

export const compositionConfig = { id: 'SnSnowshoes', durationInSeconds: 5.9, fps: 30, width: 1920, height: 1080 };

const c = cueAt(145.3);

const SnSnowshoes: React.FC = () => (
  <AbsoluteFill>
    <KenBurns src={IMG.snowshoes} illustration grade="sepia(0.2)" from={{ s: 1.04, x: 0, y: 0 }} to={{ s: 1.14, x: 0, y: -1 }} />
    <Scrim height={460} />
    <div style={{ position: 'absolute', left: 96, bottom: 110 }}>
      <Caption text="He did not carry these." at={c(147.4)} size={70} />
      <Caption text="the woven kind most people picture" at={c(149.32)} size={46} font="body" italic color={COLORS.warn} style={{ marginTop: 10 }} />
    </div>
    <Grain />
    <Dip inFrames={6} />
  </AbsoluteFill>
);
export default SnSnowshoes;
