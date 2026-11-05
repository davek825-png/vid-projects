// Beat 19 · 184.95–196.95 · "But it gave him a workable way to cover the nearly 90 miles between
// Placerville and Carson Valley. In what was then Utah Territory and is now Nevada."
import React from 'react';
import { AbsoluteFill } from 'remotion';
import { ParchmentBg, Grain, Dip, cueAt } from '../../lib/frontier';
import { MountainRange, PlacePin, RouteLine, MapBadge, Boundary, Compass, SIERRA } from '../../lib/inkmap';

export const compositionConfig = { id: 'SnRoute', durationInSeconds: 12.0, fps: 30, width: 1920, height: 1080 };

const c = cueAt(184.95);
const R = SIERRA.range;

const SnRoute: React.FC = () => (
  <AbsoluteFill>
    <ParchmentBg />
    <MountainRange x0={R.x0} x1={R.x1} y={R.y} at={2} label="SIERRA NEVADA" />
    <PlacePin label="PLACERVILLE" x={SIERRA.placerville[0]} y={SIERRA.placerville[1]} at={c(190.94)} />
    <PlacePin label="CARSON VALLEY" x={SIERRA.carson[0]} y={SIERRA.carson[1]} at={c(191.82)} />
    <RouteLine pts={SIERRA.crossing} at={c(188.03)} dur={c(192.22) - c(188.03)} />
    <MapBadge text="NEARLY 90 MILES" x={1060} y={360} at={c(188.93)} size={44} />
    <Boundary x={SIERRA.border} at={c(192.94)} left="CALIFORNIA" right="UTAH TERRITORY" rightAt={c(193.73)} rightSub="now Nevada" rightSubAt={c(195.65)} />
    <Compass at={4} />
    <Grain opacity={0.05} />
    <Dip inFrames={6} />
  </AbsoluteFill>
);
export default SnRoute;
