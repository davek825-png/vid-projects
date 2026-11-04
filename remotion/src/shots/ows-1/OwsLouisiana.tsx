// Beat 08 · 53.20–63.10 · "The Louisiana Purchase. It was a vast stretch of frontier beyond the
// Mississippi River, and most of what was known about it was just rumor."
import React from 'react';
import { AbsoluteFill, staticFile, useCurrentFrame } from 'remotion';
import { COLORS } from '../../brand';
import { FONT_DISPLAY, FONT_MONO } from '../../fonts';
import { ParchmentBg, Grain, Dip, Print, cueAt, riseAt } from '../../lib/frontier';

export const compositionConfig = { id: 'OwsLouisiana', durationInSeconds: 9.9, fps: 30, width: 1920, height: 1080 };

const c = cueAt(53.2);

const OwsLouisiana: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill>
      <ParchmentBg />
      <AbsoluteFill style={{ alignItems: 'center', paddingTop: 50 }}>
        <div style={{ ...riseAt(frame, c(53.32), 12, 16), fontFamily: FONT_DISPLAY, fontWeight: 800, fontSize: 76, color: COLORS.ink, letterSpacing: 2 }}>
          THE LOUISIANA PURCHASE
        </div>
        <Print src={staticFile('projects/ows-1/web/louisiana-map.jpg')} width={1060} height={697} at={4} rotate={0.8} zoomTo={1.06}
          caption="Map of the Louisiana Purchase, 1803" style={{ marginTop: 18 }} />
      </AbsoluteFill>
      <div style={{ position: 'absolute', left: 70, top: 440, width: 300, display: 'flex', flexDirection: 'column', gap: 40 }}>
        <div style={{ ...riseAt(frame, c(57.66), 10, 16), fontFamily: FONT_MONO, fontWeight: 700, fontSize: 28, lineHeight: 1.4, letterSpacing: 2, color: COLORS.accent }}>
          BEYOND THE MISSISSIPPI
        </div>
        <div style={{ ...riseAt(frame, c(61.74), 10, 16), fontFamily: FONT_MONO, fontWeight: 700, fontSize: 28, lineHeight: 1.4, letterSpacing: 2, color: COLORS.danger }}>
          MOSTLY RUMOR
        </div>
      </div>
      <Grain opacity={0.05} />
      <Dip inFrames={6} />
    </AbsoluteFill>
  );
};
export default OwsLouisiana;
