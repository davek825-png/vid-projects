// Beat 07 · 43.80–53.20 · "In 1803, President Thomas Jefferson sent a small expedition west to
// explore the land the country had just bought."
import React from 'react';
import { AbsoluteFill, staticFile, useCurrentFrame } from 'remotion';
import { COLORS } from '../../brand';
import { FONT_DISPLAY, FONT_BODY, FONT_MONO } from '../../fonts';
import { ParchmentBg, Grain, Dip, Print, InkNameTag, cueAt, riseAt } from '../../lib/frontier';

export const compositionConfig = { id: 'OwsJefferson', durationInSeconds: 9.4, fps: 30, width: 1920, height: 1080 };

const c = cueAt(43.8);

const OwsJefferson: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill>
      <ParchmentBg />
      <Print src={staticFile('projects/ows-1/web/jefferson-letter.jpg')} width={436} height={600} at={2} rotate={-2}
        caption="Jefferson's letter on exploring the West" style={{ position: 'absolute', left: 190, top: 150 }} />
      <div style={{ position: 'absolute', left: 860, top: 210, width: 900 }}>
        <div style={{ ...riseAt(frame, c(43.96), 20, 20), fontFamily: FONT_DISPLAY, fontWeight: 800, fontSize: 190, lineHeight: 1, color: COLORS.accent }}>1803</div>
        <InkNameTag name="President Thomas Jefferson" at={c(46.67)} style={{ marginTop: 40 }} />
        <div style={{ ...riseAt(frame, c(47.65), 12, 16), fontFamily: FONT_BODY, fontSize: 46, lineHeight: 1.3, color: COLORS.ink, marginTop: 44 }}>
          sends a small expedition west
        </div>
        <div style={{ ...riseAt(frame, c(51.8), 10, 16), fontFamily: FONT_MONO, fontSize: 28, letterSpacing: 3, color: COLORS.muted, marginTop: 22 }}>
          TO EXPLORE THE LAND JUST BOUGHT
        </div>
      </div>
      <Grain opacity={0.05} />
      <Dip inFrames={10} />
    </AbsoluteFill>
  );
};
export default OwsJefferson;
