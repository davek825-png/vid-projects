// Beat 18 · 171.65–184.95 · "The method was different from walking across the snow. It allowed him to
// slide over. But that did not remove the climb over the mountains. It did not shorten the distance.
// And it did not make the mail carry itself."
import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { COLORS } from '../../brand';
import { FONT_MONO } from '../../fonts';
import { KenBurns, Caption, Grain, Dip, cueAt, riseAt } from '../../lib/frontier';
import { IMG } from './_assets';

export const compositionConfig = { id: 'SnSlide', durationInSeconds: 13.3, fps: 30, width: 1920, height: 1080 };

const c = cueAt(171.65);
const OUT = c(177.2);

const SnSlide: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill>
      <KenBurns src={IMG.climb} illustration position="center 42%" from={{ s: 1.0, x: 6, y: 0 }} to={{ s: 1.1, x: 10, y: -1 }} />
      <AbsoluteFill style={{ background: 'linear-gradient(to right, rgba(26,11,6,0.85) 0%, rgba(26,11,6,0.55) 38%, transparent 62%)' }} />
      <div style={{ position: 'absolute', left: 96, top: 330, width: 820 }}>
        <Caption text="Not walking on the snow." at={c(173.27)} outAt={OUT} size={58} font="body" italic color={COLORS.d300} />
        <Caption text="Sliding over it." at={c(175.69)} outAt={OUT} size={76} color={COLORS.warn} style={{ marginTop: 16 }} />
      </div>
      <div style={{ position: 'absolute', left: 96, top: 300, width: 820 }}>
        <div style={{ ...riseAt(frame, c(177.7), 10, 14), fontFamily: FONT_MONO, fontWeight: 700, fontSize: 32, letterSpacing: 5, color: COLORS.warn, marginBottom: 26 }}>IT DID NOT</div>
        <Caption text="remove the climb," at={c(178.65)} size={60} />
        <Caption text="shorten the distance," at={c(180.74)} size={60} style={{ marginTop: 10 }} />
        <Caption text="or make the mail carry itself." at={c(183.22)} size={60} style={{ marginTop: 10 }} />
      </div>
      <Grain />
      <Dip inFrames={8} />
    </AbsoluteFill>
  );
};
export default SnSlide;
