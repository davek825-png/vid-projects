// Beat 09 · 63.10–73.30 · "Railroads were decades away from crossing the West, so Jefferson hoped for
// something better: a practical water route to the Pacific."
import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { COLORS, EASINGS } from '../../brand';
import { FONT_DISPLAY, FONT_BODY, FONT_MONO } from '../../fonts';
import { ParchmentBg, Grain, Dip, cueAt, riseAt, ramp } from '../../lib/frontier';

export const compositionConfig = { id: 'OwsWaterRoute', durationInSeconds: 10.2, fps: 30, width: 1920, height: 1080 };

const c = cueAt(63.1);
// a hand-drawn river, east (right) to west (left) — the way the expedition traveled
const RIVER = 'M 1620 640 C 1450 600, 1380 700, 1220 660 S 960 560, 820 610 S 560 700, 420 620 S 300 560, 240 600';

const OwsWaterRoute: React.FC = () => {
  const frame = useCurrentFrame();
  const draw = ramp(frame, c(70.63), c(72.4), 0, 1, EASINGS.easeInOut);
  const strike = ramp(frame, c(64.3), c(65.2));
  return (
    <AbsoluteFill>
      <ParchmentBg />
      <div style={{ position: 'absolute', left: 0, right: 0, top: 150, textAlign: 'center' }}>
        <div style={{ ...riseAt(frame, c(63.25), 10, 16), display: 'inline-block', position: 'relative', fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 64, color: COLORS.muted }}>
          Railroads: decades away
          <div style={{ position: 'absolute', left: -10, right: -10, top: '52%', height: 6, background: COLORS.danger, transform: `scaleX(${strike})`, transformOrigin: 'left' }} />
        </div>
        <div style={{ ...riseAt(frame, c(68.08), 12, 16), fontFamily: FONT_BODY, fontStyle: 'italic', fontSize: 46, color: COLORS.ink, marginTop: 40 }}>
          Jefferson hoped for something better
        </div>
      </div>
      <svg width={1920} height={1080} style={{ position: 'absolute', inset: 0 }}>
        <path d={RIVER} fill="none" stroke="#5b7c99" strokeWidth={10} strokeLinecap="round" pathLength={1}
          strokeDasharray="1 1" strokeDashoffset={1 - draw} opacity={0.85} />
      </svg>
      <div style={{ position: 'absolute', left: 1560, top: 690, ...riseAt(frame, c(70.3), 8, 12), fontFamily: FONT_MONO, fontWeight: 700, fontSize: 26, letterSpacing: 3, color: COLORS.ink }}>ST. LOUIS</div>
      <div style={{ position: 'absolute', left: 120, top: 660, ...riseAt(frame, c(72.01), 8, 12), fontFamily: FONT_MONO, fontWeight: 700, fontSize: 34, letterSpacing: 3, color: COLORS.accent }}>PACIFIC ?</div>
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 150, textAlign: 'center', ...riseAt(frame, c(70.63), 10, 16), fontFamily: FONT_DISPLAY, fontWeight: 800, fontSize: 70, color: COLORS.ink }}>
        A water route to the <span style={{ color: COLORS.accent }}>Pacific</span>
      </div>
      <Grain opacity={0.05} />
      <Dip inFrames={6} />
    </AbsoluteFill>
  );
};
export default OwsWaterRoute;
