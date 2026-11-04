// Beat 10 · 73.30–79.80 · "The men who left St. Louis in May 1804 called themselves the Corps of Discovery."
import React from 'react';
import { AbsoluteFill, staticFile } from 'remotion';
import { KenBurns, Scrim, Caption, DateStamp, Grain, Dip, cueAt } from '../../lib/frontier';

export const compositionConfig = { id: 'OwsCorps', durationInSeconds: 6.5, fps: 30, width: 1920, height: 1080 };

const c = cueAt(73.3);

const OwsCorps: React.FC = () => (
  <AbsoluteFill>
    <KenBurns src={staticFile('projects/ows-1/web/boats.jpg')} illustration from={{ s: 1.04, x: 2, y: 0 }} to={{ s: 1.14, x: -2, y: 1 }} />
    <Scrim height={420} />
    <DateStamp text="St. Louis · May 1804" at={c(74.0)} />
    <AbsoluteFill style={{ justifyContent: 'flex-end', alignItems: 'center', paddingBottom: 110 }}>
      <Caption text="The Corps of Discovery" at={c(77.79)} size={92} />
    </AbsoluteFill>
    <Grain />
    <Dip inFrames={8} />
  </AbsoluteFill>
);
export default OwsCorps;
