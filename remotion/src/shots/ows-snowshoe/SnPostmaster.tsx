// Beat 08 · 68.25–81.90 · "The Placerville, California postmaster had a problem. Letters were
// stacking up in his office, and the mail carrier... had vanished, and the postmaster could find no
// one to take his place."
import React from 'react';
import { AbsoluteFill } from 'remotion';
import { COLORS } from '../../brand';
import { KenBurns, DateStamp, Scrim, Caption, Grain, Dip, cueAt } from '../../lib/frontier';
import { IMG } from './_assets';

export const compositionConfig = { id: 'SnPostmaster', durationInSeconds: 13.65, fps: 30, width: 1920, height: 1080 };

const c = cueAt(68.25);

const SnPostmaster: React.FC = () => (
  <AbsoluteFill>
    <KenBurns src={IMG.postOffice} illustration from={{ s: 1.03, x: 0, y: 0 }} to={{ s: 1.16, x: 2, y: 1 }} />
    <Scrim height={560} />
    <DateStamp text="Placerville, California" at={c(68.77)} />
    <div style={{ position: 'absolute', left: 96, bottom: 110 }}>
      <Caption text="Letters stacking up." at={c(72.3)} size={58} />
      <Caption text="The carrier: vanished." at={c(77.11)} size={58} style={{ marginTop: 12 }} />
      <Caption text="No one to take his place." at={c(79.68)} size={58} color={COLORS.warn} style={{ marginTop: 12 }} />
    </div>
    <Grain />
    <Dip inFrames={8} />
  </AbsoluteFill>
);
export default SnPostmaster;
