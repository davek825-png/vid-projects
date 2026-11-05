// Beat 20 · 196.95–205.05 · "So the nickname was a misnomer. Snowshoes are built to stay on top of the
// snow. Thompson's boards were built to slide across it."
import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { COLORS } from '../../brand';
import { FONT_DISPLAY, FONT_BODY, FONT_MONO } from '../../fonts';
import { ParchmentBg, Grain, Dip, Print, cueAt, riseAt } from '../../lib/frontier';
import { IMG } from './_assets';

export const compositionConfig = { id: 'SnMisnomer', durationInSeconds: 8.1, fps: 30, width: 1920, height: 1080 };

const c = cueAt(196.95);

const Side: React.FC<{ src: string; title: string; line: string; at: number; lineAt: number; x: number; hot?: boolean }> = ({ src, title, line, at, lineAt, x, hot }) => {
  const frame = useCurrentFrame();
  return (
    <div style={{ position: 'absolute', left: x, top: 270, width: 700 }}>
      <Print src={src} width={660} height={380} at={at} rotate={hot ? 1 : -1} />
      <div style={{ ...riseAt(frame, at + 4, 10, 14), fontFamily: FONT_MONO, fontWeight: 700, fontSize: 34, letterSpacing: 4, color: hot ? COLORS.accent : COLORS.ink, marginTop: 36 }}>{title}</div>
      <div style={{ ...riseAt(frame, lineAt, 10, 14), fontFamily: FONT_BODY, fontStyle: 'italic', fontSize: 40, color: COLORS.muted, marginTop: 8 }}>{line}</div>
    </div>
  );
};

const SnMisnomer: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill>
      <ParchmentBg />
      <div style={{ position: 'absolute', top: 90, left: 0, right: 0, textAlign: 'center', ...riseAt(frame, c(198.09), 16, 18), fontFamily: FONT_DISPLAY, fontWeight: 800, fontSize: 92, color: COLORS.ink }}>A misnomer</div>
      <Side src={IMG.snowshoes} title="SNOWSHOES" line="built to stay on top" at={c(199.25)} lineAt={c(200.07)} x={180} />
      <Side src={IMG.skiSide} title="THOMPSON'S BOARDS" line="built to slide across" at={c(201.75)} lineAt={c(203.34)} x={1040} hot />
      <Grain opacity={0.05} />
      <Dip inFrames={6} />
    </AbsoluteFill>
  );
};
export default SnMisnomer;
