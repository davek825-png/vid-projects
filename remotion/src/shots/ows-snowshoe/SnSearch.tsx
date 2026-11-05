// Beat 27 · 267.80–283.90 · "Thompson couldn't let that happen to the man, so he set out to search for
// it. He went to Placerville, found none there, and kept going another 45 miles to Sacramento and
// brought back anesthesia so the operation could proceed."
import React from 'react';
import { AbsoluteFill } from 'remotion';
import { COLORS } from '../../brand';
import { ParchmentBg, Grain, Dip, cueAt } from '../../lib/frontier';
import { MountainRange, PlacePin, RouteLine, MapBadge, Compass, SIERRA, Pt } from '../../lib/inkmap';

export const compositionConfig = { id: 'SnSearch', durationInSeconds: 16.1, fps: 30, width: 1920, height: 1080 };

const c = cueAt(267.8);
const R = SIERRA.range;
const toPlacerville: Pt[] = [SIERRA.genoa, ...SIERRA.crossing.slice(1, -1).reverse(), SIERRA.placerville];
const toSacramento: Pt[] = [...SIERRA.valley].reverse();
const home: Pt[] = [...SIERRA.valley, ...SIERRA.crossing.slice(1, -1), SIERRA.genoa].map(([x, y]) => [x, y + 26] as Pt);

const SnSearch: React.FC = () => (
  <AbsoluteFill>
    <ParchmentBg />
    <MountainRange x0={R.x0} x1={R.x1} y={R.y} at={0} label="SIERRA NEVADA" labelAt={0} />
    <PlacePin label="GENOA" x={SIERRA.genoa[0]} y={SIERRA.genoa[1]} at={2} hot above />
    <RouteLine pts={toPlacerville} at={c(270.32)} dur={c(272.71) - c(270.32)} color={COLORS.ink} width={6} />
    <PlacePin label="PLACERVILLE" x={SIERRA.placerville[0]} y={SIERRA.placerville[1]} at={c(272.71)} above />
    <MapBadge text="NONE" x={SIERRA.placerville[0]} y={SIERRA.placerville[1] + 110} at={c(274.32)} stamp size={52} color={COLORS.danger} rotate={-8} />
    <RouteLine pts={toSacramento} at={c(275.61)} dur={c(278.27) - c(275.61)} color={COLORS.ink} width={6} />
    <MapBadge text="+45 MILES" x={500} y={760} at={c(277.05)} size={42} />
    <PlacePin label="SACRAMENTO" x={SIERRA.sacramento[0]} y={SIERRA.sacramento[1]} at={c(278.27)} above />
    <RouteLine pts={home} at={c(279.86)} dur={c(282.9) - c(279.86)} color={COLORS.accent} width={8} />
    <MapBadge text="BACK WITH ANESTHESIA" x={1000} y={870} at={c(280.49)} size={46} color={COLORS.accent} />
    <Compass at={4} />
    <Grain opacity={0.05} />
    <Dip inFrames={6} />
  </AbsoluteFill>
);
export default SnSearch;
