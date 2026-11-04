// Beat 19 · 181.80–193.50 · "On August 8th, she pointed to a high plain to the right of the mountain peaks.
// A place to trade for horses lay just beyond the mountains, not far from her people's summer camp."
// The pointing image shows only her arm (no face).
import React from 'react';
import { AbsoluteFill, staticFile } from 'remotion';
import { COLORS } from '../../brand';
import { KenBurns, Scrim, Caption, DateStamp, FadeIn, Grain, Dip, cueAt } from '../../lib/frontier';

export const compositionConfig = { id: 'OwsPointing', durationInSeconds: 11.7, fps: 30, width: 1920, height: 1080 };

const c = cueAt(181.8);

const OwsPointing: React.FC = () => (
  <AbsoluteFill>
    <KenBurns src={staticFile('projects/ows-1/web/pointing.jpg')} illustration from={{ s: 1.04, x: 0, y: 0 }} to={{ s: 1.16, x: -4, y: 1 }} end={c(192.5)} />
    <FadeIn a={c(191.3)} dur={20}>
      <KenBurns src={staticFile('projects/ows-1/web/camp.jpg')} illustration start={c(191.3)} from={{ s: 1.04, x: 0, y: 0 }} to={{ s: 1.08, x: 0, y: 0 }} />
    </FadeIn>
    <Scrim height={420} />
    <DateStamp text="August 8, 1805" at={c(181.98)} outAt={c(190.8)} />
    <AbsoluteFill style={{ justifyContent: 'flex-end', alignItems: 'center', paddingBottom: 110 }}>
      <Caption text="A place to trade for horses" at={c(186.89)} outAt={c(191.0)} size={70} style={{ position: 'absolute', bottom: 110 }} />
      <Caption text="Near her people's summer camp" at={c(191.6)} size={70} color={COLORS.warn} style={{ position: 'absolute', bottom: 110 }} />
    </AbsoluteFill>
    <Grain />
    <Dip inFrames={6} />
  </AbsoluteFill>
);
export default OwsPointing;
