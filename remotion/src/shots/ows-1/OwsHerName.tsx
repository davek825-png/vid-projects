// Beat 30 · 377.80–381.60 · "Her name ... was Sacagawea."  THE REVEAL. First time her face is shown, and
// the answer to beat 04's blank NAME line.
import React from 'react';
import { AbsoluteFill, staticFile, useCurrentFrame } from 'remotion';
import { COLORS, EASINGS } from '../../brand';
import { FONT_DISPLAY, FONT_BODY } from '../../fonts';
import { NightBg, KenBurns, FadeIn, Grain, cueAt, riseAt, ramp } from '../../lib/frontier';

export const compositionConfig = { id: 'OwsHerName', durationInSeconds: 3.8, fps: 30, width: 1920, height: 1080 };

const c = cueAt(377.8);
const NAME = c(379.59);

const OwsHerName: React.FC = () => {
  const frame = useCurrentFrame();
  const s = ramp(frame, NAME, NAME + 18, 1.18, 1, EASINGS.easeOut);
  return (
    <AbsoluteFill>
      <NightBg glow={COLORS.accent2} />
      <FadeIn a={NAME - 2} dur={26}>
        <KenBurns src={staticFile('projects/ows-1/web/woman-with-baby.jpg')} illustration start={NAME}
          from={{ s: 1.12, x: 0, y: 2 }} to={{ s: 1.04, x: 0, y: 0 }} dim={0.42} />
      </FadeIn>
      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ ...riseAt(frame, c(377.94), 10, 14), fontFamily: FONT_BODY, fontStyle: 'italic', fontSize: 56, color: COLORS.d300, marginBottom: 10, textShadow: '0 3px 20px rgba(0,0,0,0.8)' }}>
          Her name was
        </div>
        <div style={{
          opacity: ramp(frame, NAME, NAME + 10), transform: `scale(${s})`, fontFamily: FONT_DISPLAY, fontWeight: 900, fontSize: 210,
          letterSpacing: 10, color: COLORS.warn, textShadow: '0 8px 50px rgba(0,0,0,0.85)',
        }}>
          SACAGAWEA
        </div>
      </AbsoluteFill>
      <Grain />
    </AbsoluteFill>
  );
};
export default OwsHerName;
