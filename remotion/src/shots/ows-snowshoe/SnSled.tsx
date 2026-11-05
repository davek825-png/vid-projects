// Beat 25 · 248.85–259.95 · "Thompson couldn't move the man himself, so he went to the town of Genoa
// and came back with a team of men and a sled. Together, they hauled Sisson out through the snowdrifts."
import React from 'react';
import { AbsoluteFill } from 'remotion';
import { KenBurns, DateStamp, Scrim, Caption, FadeIn, Grain, Dip, cueAt } from '../../lib/frontier';
import { IMG } from './_assets';

export const compositionConfig = { id: 'SnSled', durationInSeconds: 11.1, fps: 30, width: 1920, height: 1080 };

const c = cueAt(248.85);

const SnSled: React.FC = () => (
  <AbsoluteFill>
    <KenBurns src={IMG.cabin} illustration position="center 48%" dim={0.45} from={{ s: 1.1, x: 0, y: 0 }} to={{ s: 1.16, x: 1, y: 0 }} />
    <DateStamp text="To Genoa for help" at={c(251.71)} outAt={c(253.4)} />
    <FadeIn a={c(253.86)} dur={20}>
      <KenBurns src={IMG.sled} illustration position="center 52%" from={{ s: 1.0, x: 0, y: 0 }} to={{ s: 1.12, x: -2, y: 0 }} start={c(253.86)} />
      <Scrim height={420} />
      <div style={{ position: 'absolute', left: 96, bottom: 110 }}>
        <Caption text="A team of men and a sled" at={c(254.52)} size={60} />
        <Caption text="hauled out through the drifts" at={c(257.15)} size={46} font="body" italic style={{ marginTop: 10 }} />
      </div>
    </FadeIn>
    <Grain />
    <Dip inFrames={6} />
  </AbsoluteFill>
);
export default SnSled;
