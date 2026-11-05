// Beat 36 · 356.30–366.95 · "The mail got through for 20 years. He carried news from loved ones,
// enabled business transactions by mail, and got a freezing man out of the snow."
import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { COLORS } from '../../brand';
import { FONT_DISPLAY } from '../../fonts';
import { KenBurns, Scrim, Caption, FadeIn, Grain, Dip, cueAt, riseAt } from '../../lib/frontier';
import { IMG } from './_assets';

export const compositionConfig = { id: 'SnLegacy', durationInSeconds: 10.65, fps: 30, width: 1920, height: 1080 };

const c = cueAt(356.3);

const SnLegacy: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill>
      <KenBurns src={IMG.climb} illustration position="center 50%" from={{ s: 1.0, x: 0, y: 0 }} to={{ s: 1.08, x: 2, y: 0 }} />
      <FadeIn a={c(364.16)} dur={18}>
        <KenBurns src={IMG.sled} illustration position="center 55%" from={{ s: 1.05, x: 0, y: 0 }} to={{ s: 1.1, x: -1, y: 0 }} start={c(364.16)} />
      </FadeIn>
      <AbsoluteFill style={{ background: 'linear-gradient(to bottom, rgba(26,11,6,0.7), transparent 40%)' }} />
      <Scrim height={480} />
      <div style={{ position: 'absolute', top: 90, left: 0, right: 0, textAlign: 'center', ...riseAt(frame, c(356.82), 14, 18), fontFamily: FONT_DISPLAY, fontWeight: 800, fontSize: 96, color: COLORS.cream, textShadow: '0 6px 40px rgba(0,0,0,0.6)' }}>
        20 years. The mail got through.
      </div>
      <div style={{ position: 'absolute', left: 96, bottom: 110 }}>
        <Caption text="news from loved ones" at={c(359.67)} size={52} font="body" italic />
        <Caption text="business by mail" at={c(362.0)} size={52} font="body" italic style={{ marginTop: 8 }} />
        <Caption text="a freezing man out of the snow" at={c(364.4)} size={56} color={COLORS.warn} style={{ marginTop: 8 }} />
      </div>
      <Grain />
      <Dip inFrames={8} />
    </AbsoluteFill>
  );
};
export default SnLegacy;
