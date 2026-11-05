// Beat 09 · 81.90–96.90 · "The Sierra Nevada mountain range stood between the two communities.
// Winter snow cut off the routes that carried supplies, business, and news from home. Those who had
// tried to cross the Sierra with pack mules and regular snowshoes had failed."
import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { COLORS } from '../../brand';
import { FONT_MONO } from '../../fonts';
import { ParchmentBg, Grain, Dip, Stamp, cueAt, riseAt } from '../../lib/frontier';
import { MountainRange, PlacePin, RouteLine, MapBadge, SIERRA } from '../../lib/inkmap';

export const compositionConfig = { id: 'SnBetween', durationInSeconds: 15.0, fps: 30, width: 1920, height: 1080 };

const c = cueAt(81.9);
const R = SIERRA.range;

const Word: React.FC<{ t: string; at: number }> = ({ t, at }) => {
  const frame = useCurrentFrame();
  return <div style={{ ...riseAt(frame, at, 10, 14), fontFamily: FONT_MONO, fontWeight: 700, fontSize: 38, letterSpacing: 5, color: COLORS.ink }}>{t}</div>;
};

const SnBetween: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill>
      <ParchmentBg />
      <MountainRange x0={R.x0} x1={R.x1} y={R.y} at={c(82.59)} label="SIERRA NEVADA" />
      <PlacePin label="PLACERVILLE" sub="California" x={SIERRA.placerville[0]} y={SIERRA.placerville[1]} at={c(82.1)} />
      <PlacePin label="CARSON VALLEY" sub="the Nevada side" x={SIERRA.carson[0]} y={SIERRA.carson[1]} at={c(82.1) + 6} />
      <RouteLine pts={SIERRA.crossing.slice(0, 3)} at={c(86.26)} dur={18} />
      <MapBadge text="✕ CUT OFF" x={980} y={420} at={c(87.14)} size={42} color={COLORS.danger} />
      <div style={{ position: 'absolute', top: 120, left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: 70 }}>
        <Word t="SUPPLIES" at={c(88.65)} />
        <Word t="BUSINESS" at={c(89.79)} />
        <Word t="NEWS FROM HOME" at={c(90.58)} />
      </div>
      <div style={{ position: 'absolute', bottom: 90, left: 0, right: 0, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 60 }}>
        <div style={{ ...riseAt(frame, c(94.04), 10, 14), fontFamily: FONT_MONO, fontSize: 36, color: COLORS.ink }}>pack mules <span style={{ color: COLORS.danger }}>✕</span></div>
        <div style={{ ...riseAt(frame, c(95.26), 10, 14), fontFamily: FONT_MONO, fontSize: 36, color: COLORS.ink }}>regular snowshoes <span style={{ color: COLORS.danger }}>✕</span></div>
        <Stamp text="FAILED" at={c(96.11)} size={60} rotate={-6} />
      </div>
      <Grain opacity={0.05} />
      <Dip inFrames={8} />
    </AbsoluteFill>
  );
};
export default SnBetween;
