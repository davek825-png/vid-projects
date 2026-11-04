// Beat 11 · 79.80–83.50 · "Meriwether Lewis and William Clark led them."
// Charles Willson Peale portraits: Lewis (left), Clark (right).
import React from 'react';
import { AbsoluteFill, staticFile, useCurrentFrame } from 'remotion';
import { COLORS } from '../../brand';
import { FONT_DISPLAY, FONT_MONO } from '../../fonts';
import { NightBg, Grain, Dip, Print, cueAt, riseAt } from '../../lib/frontier';

export const compositionConfig = { id: 'OwsCaptains', durationInSeconds: 3.7, fps: 30, width: 1920, height: 1080 };

const c = cueAt(79.8);
const Label: React.FC<{ name: string; at: number }> = ({ name, at }) => {
  const frame = useCurrentFrame();
  return <div style={{ ...riseAt(frame, at, 10, 12), fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 50, color: COLORS.cream, textAlign: 'center', width: 420 }}>{name}</div>;
};

const OwsCaptains: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill>
      <NightBg glow={COLORS.accent2} />
      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ ...riseAt(frame, 2, 8, 12), fontFamily: FONT_MONO, fontSize: 26, letterSpacing: 6, color: COLORS.warn, marginBottom: 30 }}>THE CAPTAINS</div>
        <Print src={staticFile('projects/ows-1/web/lewis-clark-color.jpg')} width={900} height={678} at={0} rotate={0} zoomTo={1.02} />
        <div style={{ display: 'flex', width: 932, justifyContent: 'space-around', marginTop: 26 }}>
          <Label name="Meriwether Lewis" at={c(79.89)} />
          <Label name="William Clark" at={c(81.4)} />
        </div>
      </AbsoluteFill>
      <Grain />
      <Dip inFrames={6} />
    </AbsoluteFill>
  );
};
export default OwsCaptains;
