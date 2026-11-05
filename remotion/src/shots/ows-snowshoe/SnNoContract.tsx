// Beat 32 · 324.35–332.65 · "He was told since he did not have a written contract to carry the mail,
// he had no claim for pay. He had never signed one." A ghost contract: faint body, empty signature.
import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { COLORS, EASINGS } from '../../brand';
import { FONT_DISPLAY, FONT_MONO } from '../../fonts';
import { ParchmentBg, Grain, Dip, DocCard, Stamp, cueAt, ramp, riseAt } from '../../lib/frontier';

export const compositionConfig = { id: 'SnNoContract', durationInSeconds: 8.3, fps: 30, width: 1920, height: 1080 };

const c = cueAt(324.35);

const SnNoContract: React.FC = () => {
  const frame = useCurrentFrame();
  const ring = ramp(frame, c(331.21), c(331.21) + 14, 0, 1, EASINGS.easeOut);
  return (
    <AbsoluteFill>
      <ParchmentBg />
      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center' }}>
        <DocCard at={2} width={1200}>
          <div style={{ ...riseAt(frame, c(326.96), 10, 14), fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 44, letterSpacing: 4, color: COLORS.ink, textAlign: 'center' }}>WRITTEN CONTRACT</div>
          <div style={{ fontFamily: FONT_MONO, fontSize: 24, letterSpacing: 3, color: COLORS.muted, textAlign: 'center', marginTop: 8, opacity: ramp(frame, c(327.86), c(327.86) + 12) }}>TO CARRY THE U.S. MAIL</div>
          <div style={{ marginTop: 40, opacity: 0.35 }}>
            {[92, 84, 96, 70, 88].map((w, i) => <div key={i} style={{ height: 9, width: `${w}%`, borderRadius: 4, background: COLORS.ink, opacity: 0.25, marginBottom: 20 }} />)}
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 24, marginTop: 40, position: 'relative' }}>
            <div style={{ fontFamily: FONT_MONO, fontWeight: 700, fontSize: 30, letterSpacing: 3, color: COLORS.muted }}>SIGNED:</div>
            <div style={{ width: 520, borderBottom: `3px solid ${COLORS.ink}`, height: 50 }} />
            <div style={{ position: 'absolute', left: 150, top: -24, width: 600, height: 110, borderRadius: '50%', border: `5px solid ${COLORS.accent}`, opacity: ring, transform: `scale(${0.8 + ring * 0.2}) rotate(-3deg)` }} />
          </div>
          <div style={{ position: 'absolute', right: 60, top: 140 }}><Stamp text="NO CLAIM FOR PAY" at={c(329.08)} size={66} rotate={-10} /></div>
        </DocCard>
      </AbsoluteFill>
      <Grain opacity={0.05} />
      <Dip inFrames={6} />
    </AbsoluteFill>
  );
};
export default SnNoContract;
