// Beat 22 · 219.55–228.40 · "The crossing took about 3 days going east and about 2 days coming back.
// On some days, he covered close to 45 miles."
import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { COLORS, EASINGS } from '../../brand';
import { ParchmentBg, Grain, Dip, cueAt, ramp } from '../../lib/frontier';
import { MountainRange, PlacePin, RouteLine, RouteRider, MapBadge, SIERRA } from '../../lib/inkmap';

export const compositionConfig = { id: 'SnCrossing', durationInSeconds: 8.85, fps: 30, width: 1920, height: 1080 };

const c = cueAt(219.55);
const R = SIERRA.range;

const SnCrossing: React.FC = () => {
  const frame = useCurrentFrame();
  const east = ramp(frame, c(220.02), c(221.85), 0, 1, EASINGS.easeInOut);
  const back = ramp(frame, c(222.09), c(223.5), 0, 1, EASINGS.easeInOut);
  const p = east - back;
  return (
    <AbsoluteFill>
      <ParchmentBg />
      <MountainRange x0={R.x0} x1={R.x1} y={R.y} at={0} label="SIERRA NEVADA" labelAt={0} />
      <PlacePin label="PLACERVILLE" x={SIERRA.placerville[0]} y={SIERRA.placerville[1]} at={0} />
      <PlacePin label="CARSON VALLEY" x={SIERRA.carson[0]} y={SIERRA.carson[1]} at={0} />
      <RouteLine pts={SIERRA.crossing} at={0} dur={10} color={COLORS.muted} width={5} />
      <RouteRider pts={SIERRA.crossing} p={p} at={c(220.02)} />
      <MapBadge text="3 DAYS EAST →" x={1080} y={300} at={c(220.75)} size={44} />
      <MapBadge text="← 2 DAYS BACK" x={1080} y={780} at={c(222.5)} size={44} color={COLORS.muted} />
      <MapBadge text="UP TO 45 MILES IN A DAY" x={960} y={930} at={c(226.67)} stamp size={52} color={COLORS.accent} rotate={-3} />
      <Grain opacity={0.05} />
      <Dip inFrames={6} />
    </AbsoluteFill>
  );
};
export default SnCrossing;
