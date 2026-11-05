// Beat 01 · 0.00–5.45 · "A letter does not weigh very much... until somebody has to carry it
// across a mountain." Envelope alone; on "until" it lifts and a snowy ridge rises behind it.
import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { COLORS, EASINGS } from '../../brand';
import { NightBg, Grain, Dip, Envelope, cueAt, ramp } from '../../lib/frontier';

export const compositionConfig = { id: 'SnLetter', durationInSeconds: 5.45, fps: 30, width: 1920, height: 1080 };

const c = cueAt(0);

const SnLetter: React.FC = () => {
  const frame = useCurrentFrame();
  const lift = ramp(frame, c(2.28), c(4.4), 0, 1, EASINGS.easeInOut);
  const ridgeY = ramp(frame, c(3.5), c(5.0), 520, 0, EASINGS.easeOut);
  return (
    <AbsoluteFill>
      <NightBg glow={COLORS.accent2} glowY={100} />
      <AbsoluteFill style={{ transform: `translateY(${ridgeY}px)` }}>
        <svg width={1920} height={1080}>
          <path d="M 0 1080 L 0 820 L 260 640 L 420 720 L 700 470 L 860 590 L 1010 520 L 1240 330 L 1430 560 L 1600 480 L 1920 700 L 1920 1080 Z" fill={COLORS.d600} />
          <path d="M 640 525 L 700 470 L 760 520 L 730 512 L 700 530 L 672 512 Z M 1170 390 L 1240 330 L 1310 410 L 1272 398 L 1240 420 L 1205 400 Z M 1560 505 L 1600 480 L 1650 512 L 1600 515 Z" fill={COLORS.cream} opacity={0.9} />
          <path d="M 0 1080 L 0 930 L 380 800 L 640 880 L 980 740 L 1300 860 L 1640 780 L 1920 860 L 1920 1080 Z" fill={COLORS.d800} />
        </svg>
      </AbsoluteFill>
      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ transform: `translateY(${-lift * 250}px) scale(${1 - lift * 0.55})` }}>
          <Envelope at={2} width={640} />
        </div>
      </AbsoluteFill>
      <Grain />
      <Dip inFrames={10} />
    </AbsoluteFill>
  );
};
export default SnLetter;
