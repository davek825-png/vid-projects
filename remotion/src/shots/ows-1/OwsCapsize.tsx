// Beat 14 · 107.40–122.50 · "In May 1805, one of the explorers' boats tipped over in the river. Crates
// of supplies and important papers were tossed into the churning current. Among the things washed away
// were the captain's own records of the trip."
import React from 'react';
import { AbsoluteFill, staticFile, useCurrentFrame } from 'remotion';
import { COLORS } from '../../brand';
import { KenBurns, Scrim, Caption, DateStamp, Grain, Dip, cueAt, ramp } from '../../lib/frontier';

export const compositionConfig = { id: 'OwsCapsize', durationInSeconds: 15.1, fps: 30, width: 1920, height: 1080 };

const c = cueAt(107.4);

const OwsCapsize: React.FC = () => {
  const frame = useCurrentFrame();
  // a short shudder on "tipped over", decaying over ~1.5s
  const k = c(110.8);
  const amp = frame >= k ? 9 * (1 - ramp(frame, k, k + 45)) : 0;
  const shake = `translate(${Math.sin(frame * 1.9) * amp}px, ${Math.cos(frame * 2.3) * amp * 0.6}px)`;
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ transform: shake }}>
        <KenBurns src={staticFile('projects/ows-1/web/capsize.jpg')} illustration from={{ s: 1.1, x: 3, y: 1 }} to={{ s: 1.22, x: -2, y: 2 }} />
      </AbsoluteFill>
      <Scrim height={430} />
      <DateStamp text="May 1805" at={c(107.67)} />
      <AbsoluteFill style={{ justifyContent: 'flex-end', alignItems: 'center', paddingBottom: 110 }}>
        <div style={{ display: 'flex', gap: 54, alignItems: 'baseline' }}>
          <Caption text="Supplies" at={c(112.46)} size={64} />
          <Caption text="Papers" at={c(113.62)} size={64} />
          <Caption text="The captains' own records" at={c(119.54)} size={64} color={COLORS.warn} />
        </div>
      </AbsoluteFill>
      <Grain />
      <Dip inFrames={6} />
    </AbsoluteFill>
  );
};
export default OwsCapsize;
