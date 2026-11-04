// Beat 21 · 218.70–224.10 · "Clark and the main party would continue more slowly while Lewis took 3 men ahead."
import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { COLORS, EASINGS } from '../../brand';
import { ParchmentBg, Grain, Dip, Trail, TrailMarker, cueAt, ramp } from '../../lib/frontier';

export const compositionConfig = { id: 'OwsSplit', durationInSeconds: 5.4, fps: 30, width: 1920, height: 1080 };

const c = cueAt(218.7);

const OwsSplit: React.FC = () => {
  const frame = useCurrentFrame();
  const slow = ramp(frame, c(219.0), c(224.1), 300, 560, EASINGS.easeInOut);
  const fast = ramp(frame, c(221.73), c(224.0), 300, 1500, EASINGS.easeInOut);
  return (
    <AbsoluteFill>
      <ParchmentBg />
      <Trail y={600} at={0} />
      <TrailMarker x={slow} label="CLARK & MAIN PARTY" sub="slower" at={c(218.93)} color={COLORS.muted} below />
      <TrailMarker x={fast} label="LEWIS + 3 MEN" sub="riding ahead" at={c(221.73)} color={COLORS.accent} />
      <Grain opacity={0.05} />
      <Dip inFrames={6} />
    </AbsoluteFill>
  );
};
export default OwsSplit;
