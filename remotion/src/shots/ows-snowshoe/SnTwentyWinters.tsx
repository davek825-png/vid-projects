// Beat 29 · 290.55–306.70 · "For 20 winters from 1856 to 1876, he carried that mail over the Sierra
// Nevada Mountains. The letters arrived. The people in Carson Valley got their news. The road
// disappeared every winter, but the mail still arrived." Callback to beat 02's Sierra.
import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { COLORS, EASINGS } from '../../brand';
import { FONT_DISPLAY, FONT_MONO } from '../../fonts';
import { KenBurns, Scrim, Caption, Grain, Dip, cueAt, riseAt, ramp } from '../../lib/frontier';
import { IMG, SIERRA_GRADE } from './_assets';

export const compositionConfig = { id: 'SnTwentyWinters', durationInSeconds: 16.15, fps: 30, width: 1920, height: 1080 };

const c = cueAt(290.55);

const SnTwentyWinters: React.FC = () => {
  const frame = useCurrentFrame();
  const year = Math.round(ramp(frame, c(292.04), c(295.4), 1856, 1876, EASINGS.easeInOut));
  return (
    <AbsoluteFill>
      <KenBurns src={IMG.sierra} grade={SIERRA_GRADE} illustration from={{ s: 1.16, x: -3, y: 1 }} to={{ s: 1.04, x: 1, y: 0 }} />
      <AbsoluteFill style={{ background: 'linear-gradient(to bottom, rgba(26,11,6,0.7), transparent 45%)' }} />
      <Scrim height={460} />
      <div style={{ position: 'absolute', top: 90, left: 0, right: 0, textAlign: 'center' }}>
        <div style={{ ...riseAt(frame, c(291.02), 12, 16), fontFamily: FONT_MONO, fontWeight: 700, fontSize: 36, letterSpacing: 10, color: COLORS.warn }}>20 WINTERS</div>
        <div style={{ ...riseAt(frame, c(292.04), 16, 18), fontFamily: FONT_DISPLAY, fontWeight: 800, fontSize: 150, color: COLORS.cream, textShadow: '0 6px 40px rgba(0,0,0,0.6)' }}>
          1856 <span style={{ color: COLORS.d400 }}>–</span> {year}
        </div>
      </div>
      <div style={{ position: 'absolute', left: 96, bottom: 110 }}>
        <Caption text="The letters arrived." at={c(298.41)} size={54} />
        <Caption text="Carson Valley got its news." at={c(299.94)} size={54} style={{ marginTop: 8 }} />
        <Caption text="The mail still arrived." at={c(304.57)} size={62} color={COLORS.warn} style={{ marginTop: 8 }} />
      </div>
      <Grain />
      <Dip inFrames={8} />
    </AbsoluteFill>
  );
};
export default SnTwentyWinters;
