// Beat 25 · 289.60–305.40 · "The rest of the party, with the interpreter guide and his wife, was still behind on
// the slower route. So Lewis sent for the interpreter's wife while her husband stayed behind with the main
// party to make sure they kept moving in the right direction."
import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { COLORS, EASINGS } from '../../brand';
import { FONT_DISPLAY } from '../../fonts';
import { ParchmentBg, Grain, Dip, Trail, TrailMarker, cueAt, riseAt, ramp } from '../../lib/frontier';

export const compositionConfig = { id: 'OwsSentFor', durationInSeconds: 15.8, fps: 30, width: 1920, height: 1080 };

const c = cueAt(289.6);
const Y = 640;

const OwsSentFor: React.FC = () => {
  const frame = useCurrentFrame();
  // messenger rides back from Lewis (x=1500) to the main party (x=420), then she rides forward
  const msg = ramp(frame, c(297.06), c(299.0), 1500, 440, EASINGS.easeInOut);
  const her = ramp(frame, c(300.2), c(304.6), 420, 1480, EASINGS.easeInOut);
  return (
    <AbsoluteFill>
      <ParchmentBg />
      <div style={{ position: 'absolute', top: 150, left: 0, right: 0, textAlign: 'center', ...riseAt(frame, c(297.06), 10, 16), fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 62, color: COLORS.ink }}>
        Lewis sends for the interpreter's wife
      </div>
      <Trail y={Y} at={0} />
      <TrailMarker x={1500} y={Y} label="LEWIS" sub="with the Indian camp" at={4} color={COLORS.accent} />
      <TrailMarker x={420} y={Y} label="MAIN PARTY" sub="still behind" at={c(289.69)} color={COLORS.muted} />
      <TrailMarker x={msg} y={Y} label="" at={c(297.06)} outAt={c(299.4)} size={18} color={COLORS.d600} />
      <TrailMarker x={her} y={Y - 2} label="THE INTERPRETER'S WIFE" at={c(300.2)} color={COLORS.warn} size={24} below />
      <div style={{ position: 'absolute', left: 140, bottom: 140, ...riseAt(frame, c(299.22), 8, 14), fontFamily: 'inherit' }}>
        <div style={{ fontFamily: FONT_DISPLAY, fontWeight: 600, fontSize: 38, color: COLORS.muted }}>her husband stays with the main party</div>
      </div>
      <Grain opacity={0.05} />
      <Dip inFrames={6} />
    </AbsoluteFill>
  );
};
export default OwsSentFor;
