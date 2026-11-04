// Beat 16 · 134.60–150.40 · "By the summer of 1805, the rivers they had followed were running thin. Ahead
// rose a line of formidable mountains. Crossing those mountains would require horses to carry their
// belongings, horses they didn't have."  (Real photograph: the Continental Divide.)
import React from 'react';
import { AbsoluteFill, staticFile } from 'remotion';
import { COLORS } from '../../brand';
import { KenBurns, Scrim, Caption, DateStamp, Grain, Dip, cueAt } from '../../lib/frontier';

export const compositionConfig = { id: 'OwsMountains', durationInSeconds: 15.8, fps: 30, width: 1920, height: 1080 };

const c = cueAt(134.6);

const OwsMountains: React.FC = () => (
  <AbsoluteFill>
    <KenBurns src={staticFile('projects/ows-1/web/divide-pano.jpg')} panFrom={0} panTo={100}
      from={{ s: 1.0, x: 0, y: 0 }} to={{ s: 1.06, x: 0, y: 0 }} />
    <Scrim height={460} />
    <DateStamp text="Summer 1805" at={c(134.77)} />
    <AbsoluteFill style={{ justifyContent: 'flex-end', alignItems: 'center', paddingBottom: 110, gap: 10 }}>
      <Caption text="The rivers run thin" at={c(138.12)} outAt={c(141.4)} size={60} font="body" italic style={{ position: 'absolute', bottom: 120 }} />
      <Caption text="Formidable mountains" at={c(141.75)} outAt={c(147.3)} size={80} style={{ position: 'absolute', bottom: 110 }} />
      <Caption text="Horses they didn't have." at={c(147.9)} size={80} color={COLORS.warn} style={{ position: 'absolute', bottom: 110 }} />
    </AbsoluteFill>
    <Grain />
    <Dip inFrames={6} />
  </AbsoluteFill>
);
export default OwsMountains;
