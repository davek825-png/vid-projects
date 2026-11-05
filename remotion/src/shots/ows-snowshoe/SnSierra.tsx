// Beat 02 · 5.45–13.00 · "Every winter, the road over the Sierra Nevada mountain range disappeared.
// Not for a day or two. For months."
import React from 'react';
import { AbsoluteFill } from 'remotion';
import { COLORS } from '../../brand';
import { KenBurns, DateStamp, Scrim, Caption, Grain, Dip, cueAt } from '../../lib/frontier';
import { IMG, SIERRA_GRADE } from './_assets';

export const compositionConfig = { id: 'SnSierra', durationInSeconds: 7.55, fps: 30, width: 1920, height: 1080 };

const c = cueAt(5.45);

const SnSierra: React.FC = () => (
  <AbsoluteFill>
    <KenBurns src={IMG.sierra} grade={SIERRA_GRADE} illustration from={{ s: 1.02, x: 1, y: 0 }} to={{ s: 1.14, x: -1.5, y: 1 }} />
    <Scrim height={520} />
    <DateStamp text="Sierra Nevada · every winter" at={c(5.8)} />
    <div style={{ position: 'absolute', left: 96, bottom: 120 }}>
      <Caption text="The road disappeared." at={c(9.11)} size={84} />
      <div style={{ display: 'flex', gap: 30, marginTop: 14 }}>
        <Caption text="Not for a day or two." at={c(10.39)} size={50} font="body" italic color={COLORS.d300} />
        <Caption text="For months." at={c(11.98)} size={50} color={COLORS.warn} />
      </div>
    </div>
    <Grain />
    <Dip inFrames={8} />
  </AbsoluteFill>
);
export default SnSierra;
