// Beat 12 · 83.50–94.10 · "By November, about 6 months into the journey, the explorers had reached
// the Dakotas. Winter was coming on, and they needed a guide for the country ahead."
import React from 'react';
import { AbsoluteFill, staticFile, useCurrentFrame } from 'remotion';
import { COLORS, EASINGS } from '../../brand';
import { FONT_BODY } from '../../fonts';
import { ParchmentBg, Grain, Dip, Print, DateStamp, cueAt, riseAt, ramp } from '../../lib/frontier';

export const compositionConfig = { id: 'OwsDakotas', durationInSeconds: 10.6, fps: 30, width: 1920, height: 1080 };

const c = cueAt(83.5);
// map print geometry (px) and Fort Mandan's position inside the image (fractions)
const MAP = { left: 300, top: 150, w: 1320, h: 824 };
const PIN = { fx: 0.445, fy: 0.19 };

const OwsDakotas: React.FC = () => {
  const frame = useCurrentFrame();
  const pinAt = c(88.31); // "Dakotas"
  const pulse = frame >= pinAt ? (Math.sin((frame - pinAt) / 6) + 1) / 2 : 0;
  // print has 16px padding inside its frame
  const px = MAP.left + 16 + PIN.fx * MAP.w;
  const py = MAP.top + 16 + PIN.fy * MAP.h;
  return (
    <AbsoluteFill>
      <ParchmentBg />
      <Print src={staticFile('projects/ows-1/web/route-map.jpg')} width={MAP.w} height={MAP.h} at={2} rotate={0} zoomTo={1}
        style={{ position: 'absolute', left: MAP.left, top: MAP.top }} />
      <div style={{ position: 'absolute', left: px, top: py, transform: 'translate(-50%,-50%)', opacity: ramp(frame, pinAt, pinAt + 8) }}>
        <div style={{ width: 90 + pulse * 40, height: 90 + pulse * 40, borderRadius: '50%', border: `5px solid ${COLORS.accent}`, opacity: 1 - pulse * 0.6, position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)' }} />
        <div style={{ width: 30, height: 30, borderRadius: '50%', background: COLORS.accent, border: `4px solid ${COLORS.cream}`, transform: `scale(${ramp(frame, pinAt, pinAt + 10, 0.3, 1, EASINGS.overshoot)})` }} />
      </div>
      <DateStamp text="November 1804" at={c(83.57)} onDark={false} />
      <div style={{ position: 'absolute', right: 120, bottom: 70, textAlign: 'right' }}>
        <div style={{ ...riseAt(frame, c(89.84), 10, 16), fontFamily: FONT_BODY, fontStyle: 'italic', fontSize: 46, color: COLORS.ink, background: 'rgba(245,232,204,0.88)', padding: '10px 24px' }}>
          Winter is coming. They need a guide.
        </div>
      </div>
      <Grain opacity={0.05} />
      <Dip inFrames={6} />
    </AbsoluteFill>
  );
};
export default OwsDakotas;
