// Beat 18 · 171.20–181.80 · "The Indian woman knew where to go to buy the horses they desperately needed.
// The question was whether anyone would be willing to trade with them."
// No image of her (face withheld until the name reveal).
import React from 'react';
import { AbsoluteFill, staticFile, useCurrentFrame } from 'remotion';
import { COLORS } from '../../brand';
import { FONT_DISPLAY, FONT_BODY } from '../../fonts';
import { ParchmentBg, Grain, Dip, Print, cueAt, riseAt } from '../../lib/frontier';

export const compositionConfig = { id: 'OwsSheKnew', durationInSeconds: 10.6, fps: 30, width: 1920, height: 1080 };

const c = cueAt(171.2);

const OwsSheKnew: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill>
      <ParchmentBg />
      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ ...riseAt(frame, c(171.41), 12, 16), fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 72, color: COLORS.ink, marginBottom: 40 }}>
          She knew where to find <span style={{ color: COLORS.accent }}>horses</span>.
        </div>
        <Print src={staticFile('projects/ows-1/web/horses.jpg')} width={1250} height={521} at={c(173.5)} rotate={-0.8} zoomTo={1.04} />
        <div style={{ ...riseAt(frame, c(177.18), 12, 16), fontFamily: FONT_BODY, fontStyle: 'italic', fontSize: 52, color: COLORS.danger, marginTop: 44 }}>
          But would anyone trade?
        </div>
      </AbsoluteFill>
      <Grain opacity={0.05} />
      <Dip inFrames={6} />
    </AbsoluteFill>
  );
};
export default OwsSheKnew;
