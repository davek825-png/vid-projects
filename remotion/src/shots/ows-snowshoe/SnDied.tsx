// Beat 34 · 338.70–347.10 · "Thompson died in 1876 at the age of 49. Accounts say appendicitis, which
// may have developed into pneumonia." His real gravestone (skis carved on it), Genoa.
import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { COLORS } from '../../brand';
import { FONT_DISPLAY, FONT_BODY, FONT_MONO } from '../../fonts';
import { NightBg, Grain, Dip, Print, cueAt, riseAt } from '../../lib/frontier';
import { IMG } from './_assets';

export const compositionConfig = { id: 'SnDied', durationInSeconds: 8.4, fps: 30, width: 1920, height: 1080 };

const c = cueAt(338.7);

const SnDied: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill>
      <NightBg glow={COLORS.accent} glowY={95} />
      <Print src={IMG.grave} width={430} height={600} at={c(339.08)} rotate={-1.5} zoomTo={1.03} caption="His grave · Genoa, Nevada" style={{ position: 'absolute', left: 300, top: 150 }} />
      <div style={{ position: 'absolute', left: 950, top: 330, width: 860 }}>
        <div style={{ ...riseAt(frame, c(339.85), 20, 22), fontFamily: FONT_DISPLAY, fontWeight: 800, fontSize: 180, lineHeight: 1, color: COLORS.cream }}>1876</div>
        <div style={{ ...riseAt(frame, c(341.39), 10, 16), fontFamily: FONT_MONO, fontSize: 40, letterSpacing: 6, color: COLORS.warn, marginTop: 18 }}>AGE 49</div>
        <div style={{ ...riseAt(frame, c(343.81), 10, 16), fontFamily: FONT_BODY, fontStyle: 'italic', fontSize: 38, color: COLORS.d300, marginTop: 40, lineHeight: 1.35 }}>
          Accounts say appendicitis,<br />possibly turning to pneumonia.
        </div>
      </div>
      <Grain />
      <Dip inFrames={10} />
    </AbsoluteFill>
  );
};
export default SnDied;
