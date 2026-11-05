// Beat 35 · 347.10–356.30 · "Ironically, a bill to approve his payment was in Congress when he died.
// Accounts say the bill died with him."
import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { COLORS, EASINGS } from '../../brand';
import { FONT_DISPLAY, FONT_MONO } from '../../fonts';
import { ParchmentBg, Grain, Dip, DocCard, Stamp, cueAt, ramp, riseAt } from '../../lib/frontier';

export const compositionConfig = { id: 'SnBill', durationInSeconds: 9.2, fps: 30, width: 1920, height: 1080 };

const c = cueAt(347.1);

const SnBill: React.FC = () => {
  const frame = useCurrentFrame();
  const fade = ramp(frame, c(354.64), c(355.6), 1, 0.45, EASINGS.easeInOut);
  return (
    <AbsoluteFill>
      <ParchmentBg />
      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ position: 'relative' }}>
          <div style={{ opacity: fade, filter: `grayscale(${1 - fade})` }}>
            <DocCard at={c(348.14)} width={1200}>
              <div style={{ fontFamily: FONT_MONO, fontSize: 26, letterSpacing: 4, color: COLORS.muted, opacity: ramp(frame, c(350.15), c(350.15) + 12) }}>IN CONGRESS · 1876</div>
              <div style={{ ...riseAt(frame, c(348.3), 10, 14), fontFamily: FONT_DISPLAY, fontWeight: 800, fontSize: 64, color: COLORS.ink, marginTop: 16 }}>A BILL</div>
              <div style={{ ...riseAt(frame, c(348.79), 10, 14), fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 44, color: COLORS.ink, marginTop: 6 }}>to approve the payment of John Thompson</div>
              <div style={{ marginTop: 40 }}>
                {[94, 86, 90, 60].map((w, i) => <div key={i} style={{ height: 9, width: `${w}%`, borderRadius: 4, background: COLORS.ink, opacity: 0.18, marginBottom: 20 }} />)}
              </div>
            </DocCard>
          </div>
          <div style={{ position: 'absolute', right: 40, bottom: 30 }}><Stamp text="DIED WITH HIM" at={c(354.64)} size={74} rotate={-9} /></div>
        </div>
      </AbsoluteFill>
      <Grain opacity={0.05} />
      <Dip inFrames={6} />
    </AbsoluteFill>
  );
};
export default SnBill;
