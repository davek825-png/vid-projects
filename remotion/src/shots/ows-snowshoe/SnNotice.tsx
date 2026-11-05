// Beat 05 · 33.90–49.75 · "Then in 1855, a notice ran in the Sacramento Union. The headline was
// blunt: 'People Lost to the World. Uncle Sam Needs a Mail Carrier.' That is an unusually candid
// employment advertisement." Clipping body is abstract strokes; only the quoted headline is legible.
import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { COLORS, EASINGS } from '../../brand';
import { FONT_DISPLAY, FONT_BODY, FONT_MONO } from '../../fonts';
import { NightBg, Grain, Dip, DateStamp, cueAt, ramp, riseAt } from '../../lib/frontier';

export const compositionConfig = { id: 'SnNotice', durationInSeconds: 15.85, fps: 30, width: 1920, height: 1080 };

const c = cueAt(33.9);

const Col: React.FC<{ rows: number; seed: number }> = ({ rows, seed }) => (
  <div style={{ flex: 1 }}>
    {Array.from({ length: rows }, (_, i) => (
      <div key={i} style={{ height: 9, borderRadius: 4, background: COLORS.ink, opacity: 0.18, marginBottom: 15, width: `${70 + (((i + seed) * 37) % 30)}%` }} />
    ))}
  </div>
);

const SnNotice: React.FC = () => {
  const frame = useCurrentFrame();
  const zoom = ramp(frame, c(40.33), c(45.5), 1, 1.18, EASINGS.easeInOut);
  return (
    <AbsoluteFill>
      <NightBg glow={COLORS.accent2} glowY={110} />
      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ ...riseAt(frame, c(37.05), 30, 22), transform: `${riseAt(frame, c(37.05), 30, 22).transform} scale(${zoom}) rotate(-1deg)` }}>
          <div style={{ width: 1180, background: COLORS.cream, padding: '40px 56px 46px', boxShadow: '0 26px 70px rgba(0,0,0,0.55)', border: `1px solid ${COLORS.line}` }}>
            <div style={{ textAlign: 'center', fontFamily: FONT_DISPLAY, fontWeight: 900, fontSize: 76, letterSpacing: 4, color: COLORS.ink, lineHeight: 1 }}>SACRAMENTO UNION</div>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: `3px solid ${COLORS.ink}`, borderBottom: `1px solid ${COLORS.ink}`, padding: '6px 0', margin: '14px 0 26px', fontFamily: FONT_MONO, fontSize: 20, letterSpacing: 2, color: COLORS.muted }}>
              <span>SACRAMENTO, CAL.</span><span>1855</span>
            </div>
            <div style={{ display: 'flex', gap: 36 }}>
              <Col rows={11} seed={1} />
              <div style={{ flex: 1.6, border: `2px solid ${COLORS.ink}`, padding: '26px 28px', textAlign: 'center' }}>
                <div style={{ ...riseAt(frame, c(42.27), 8, 12), fontFamily: FONT_DISPLAY, fontWeight: 800, fontSize: 50, lineHeight: 1.05, color: COLORS.ink }}>PEOPLE LOST TO THE WORLD.</div>
                <div style={{ height: 2, background: COLORS.ink, opacity: 0.4, margin: '18px 60px' }} />
                <div style={{ ...riseAt(frame, c(44.02), 8, 12), fontFamily: FONT_DISPLAY, fontWeight: 800, fontSize: 44, lineHeight: 1.08, color: COLORS.accent }}>UNCLE SAM NEEDS A MAIL CARRIER.</div>
                <div style={{ marginTop: 22 }}><Col rows={3} seed={4} /></div>
              </div>
              <Col rows={11} seed={7} />
            </div>
          </div>
        </div>
      </AbsoluteFill>
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 64, textAlign: 'center', ...riseAt(frame, c(46.99), 10, 16), fontFamily: FONT_BODY, fontStyle: 'italic', fontSize: 44, color: COLORS.warn }}>
        An unusually candid job ad.
      </div>
      <DateStamp text="1855" at={c(34.53)} />
      <Grain />
      <Dip inFrames={8} />
    </AbsoluteFill>
  );
};
export default SnNotice;
