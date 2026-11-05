// Beat 11 · 106.55–114.70 · "A Norwegian immigrant named John Thompson came into the post office to
// ask about the job. He was about 28 years old."
import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { COLORS } from '../../brand';
import { FONT_BODY, FONT_MONO } from '../../fonts';
import { ParchmentBg, Grain, Dip, Print, InkNameTag, cueAt, riseAt } from '../../lib/frontier';
import { IMG } from './_assets';

export const compositionConfig = { id: 'SnThompson', durationInSeconds: 8.15, fps: 30, width: 1920, height: 1080 };

const c = cueAt(106.55);

const SnThompson: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill>
      <ParchmentBg />
      <Print src={IMG.portrait} width={500} height={635} at={c(106.97)} rotate={-2} zoomTo={1.04} style={{ position: 'absolute', left: 230, top: 150 }} />
      <div style={{ position: 'absolute', left: 900, top: 330, width: 900 }}>
        <InkNameTag name="John Thompson" role="a Norwegian immigrant" at={c(108.55)} />
        <div style={{ ...riseAt(frame, c(109.59), 12, 16), fontFamily: FONT_BODY, fontSize: 44, color: COLORS.ink, marginTop: 50 }}>asks about the mail job</div>
        <div style={{ ...riseAt(frame, c(113.2), 10, 16), fontFamily: FONT_MONO, fontSize: 32, letterSpacing: 3, color: COLORS.muted, marginTop: 22 }}>ABOUT 28 YEARS OLD</div>
      </div>
      <Grain opacity={0.05} />
      <Dip inFrames={8} />
    </AbsoluteFill>
  );
};
export default SnThompson;
