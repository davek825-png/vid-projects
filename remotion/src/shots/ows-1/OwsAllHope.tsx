// Beat 23 · 245.10–254.30 · "Lewis wrote that with him went all hope of obtaining horses. Morale sank a
// little lower each day."  On screen: Lewis's actual words (journal, August 11, 1805), spelling modernised.
import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { COLORS } from '../../brand';
import { FONT_BODY, FONT_MONO } from '../../fonts';
import { NightBg, Grain, Dip, Mark, cueAt, riseAt } from '../../lib/frontier';

export const compositionConfig = { id: 'OwsAllHope', durationInSeconds: 9.2, fps: 30, width: 1920, height: 1080 };

const c = cueAt(245.1);

const OwsAllHope: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill>
      <NightBg glow={COLORS.danger} glowY={120} />
      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', padding: '0 240px' }}>
        <div style={{ ...riseAt(frame, c(245.6), 14, 20), fontFamily: FONT_BODY, fontStyle: 'italic', fontSize: 68, lineHeight: 1.35, color: COLORS.cream, textAlign: 'center' }}>
          "...with him vanished <Mark at={c(248.23)} color={COLORS.warn}>all my hopes of obtaining horses</Mark> for the present."
        </div>
        <div style={{ ...riseAt(frame, c(247.0), 8, 14), fontFamily: FONT_MONO, fontSize: 26, letterSpacing: 3, color: COLORS.d400, marginTop: 34 }}>
          MERIWETHER LEWIS, AUGUST 11, 1805
        </div>
        <div style={{ ...riseAt(frame, c(250.98), 8, 16), fontFamily: FONT_BODY, fontSize: 40, color: COLORS.d300, marginTop: 70 }}>
          Morale sank a little lower each day.
        </div>
      </AbsoluteFill>
      <Grain />
      <Dip inFrames={10} />
    </AbsoluteFill>
  );
};
export default OwsAllHope;
