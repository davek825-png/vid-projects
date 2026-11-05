// Beat 23 · 228.40–239.85 · "In the winter of 1856, on one of those crossings, Thompson came upon a
// prospector named James Sisson. Sisson was alone in a cabin south of Lake Tahoe."
import React from 'react';
import { AbsoluteFill } from 'remotion';
import { KenBurns, DateStamp, NameTag, Scrim, Caption, Grain, Dip, cueAt } from '../../lib/frontier';
import { IMG } from './_assets';

export const compositionConfig = { id: 'SnSisson', durationInSeconds: 11.45, fps: 30, width: 1920, height: 1080 };

const c = cueAt(228.4);

const SnSisson: React.FC = () => (
  <AbsoluteFill>
    <KenBurns src={IMG.cabin} illustration position="center 50%" from={{ s: 1.0, x: 0, y: 0 }} to={{ s: 1.14, x: 2, y: -1 }} />
    <Scrim height={460} />
    <DateStamp text="Winter 1856" at={c(229.22)} />
    <NameTag name="James Sisson" role="a prospector" at={c(234.77)} outAt={c(236.9)} />
    <div style={{ position: 'absolute', left: 96, bottom: 120 }}>
      <Caption text="Alone in a cabin south of Lake Tahoe" at={c(237.2)} size={58} />
    </div>
    <Grain />
    <Dip inFrames={8} />
  </AbsoluteFill>
);
export default SnSisson;
