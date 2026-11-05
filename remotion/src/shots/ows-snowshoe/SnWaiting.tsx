// Beat 10 · 96.90–106.55 · "For a person waiting on the other side, the distance was not simply a
// matter of miles. It was a matter of not knowing about the people they loved."
import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { COLORS } from '../../brand';
import { FONT_BODY } from '../../fonts';
import { NightBg, Grain, Dip, Envelope, cueAt, riseAt } from '../../lib/frontier';

export const compositionConfig = { id: 'SnWaiting', durationInSeconds: 9.65, fps: 30, width: 1920, height: 1080 };

const c = cueAt(96.9);

const SnWaiting: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill>
      <NightBg glow={COLORS.accent} glowY={90} />
      <Envelope at={4} width={560} rotate={-6} style={{ position: 'absolute', left: 170, top: 330 }} />
      <div style={{ position: 'absolute', left: 900, top: 380, width: 900 }}>
        <div style={{ ...riseAt(frame, c(100.29), 14, 20), fontFamily: FONT_BODY, fontStyle: 'italic', fontSize: 58, color: COLORS.d300 }}>Not a matter of miles.</div>
        <div style={{ ...riseAt(frame, c(103.36), 14, 20), fontFamily: FONT_BODY, fontStyle: 'italic', fontWeight: 600, fontSize: 66, color: COLORS.warn, marginTop: 34 }}>A matter of not knowing.</div>
      </div>
      <Grain />
      <Dip inFrames={10} />
    </AbsoluteFill>
  );
};
export default SnWaiting;
