// Beat 04 · 21.10–33.90 · "On the Nevada side... in Carson Valley, people waited for word from the
// West. Their mail came from Sacramento on the far side of the range. In winter, the mail stopped."
import React from 'react';
import { AbsoluteFill } from 'remotion';
import { COLORS } from '../../brand';
import { ParchmentBg, Grain, Dip, cueAt } from '../../lib/frontier';
import { MountainRange, PlacePin, RouteLine, MapBadge, Compass, SIERRA } from '../../lib/inkmap';

export const compositionConfig = { id: 'SnCarson', durationInSeconds: 12.8, fps: 30, width: 1920, height: 1080 };

const c = cueAt(21.1);
const R = SIERRA.range;
const mail = [...SIERRA.valley, ...SIERRA.crossing.slice(1, 3)];

const SnCarson: React.FC = () => (
  <AbsoluteFill>
    <ParchmentBg />
    <MountainRange x0={R.x0} x1={R.x1} y={R.y} at={c(21.48)} label="SIERRA NEVADA" />
    <PlacePin label="CARSON VALLEY" sub="the Nevada side" x={SIERRA.carson[0]} y={SIERRA.carson[1]} at={c(23.14)} hot />
    <MapBadge text="← waiting for word from the West" x={1520} y={830} at={c(25.96)} size={32} color={COLORS.muted} />
    <PlacePin label="SACRAMENTO" sub="the far side of the range" x={SIERRA.sacramento[0]} y={SIERRA.sacramento[1]} at={c(28.64)} />
    <RouteLine pts={mail} at={c(31.67)} dur={30} color={COLORS.accent} />
    <MapBadge text="MAIL STOPPED" x={1000} y={330} at={c(33.05)} stamp size={64} color={COLORS.danger} rotate={-8} />
    <Compass at={c(21.5)} />
    <Grain opacity={0.05} />
    <Dip inFrames={8} />
  </AbsoluteFill>
);
export default SnCarson;
