// Beat 24 · 239.85–248.85 · "He had been there for 12 days, living on raw flour with no fire. And his
// boots frozen to his feet."
import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { COLORS } from '../../brand';
import { FONT_DISPLAY, FONT_MONO } from '../../fonts';
import { KenBurns, Grain, Dip, cueAt, riseAt } from '../../lib/frontier';
import { IMG } from './_assets';

export const compositionConfig = { id: 'SnTwelveDays', durationInSeconds: 9.0, fps: 30, width: 1920, height: 1080 };

const c = cueAt(239.85);

const Line: React.FC<{ t: string; at: number; hot?: boolean }> = ({ t, at, hot }) => {
  const frame = useCurrentFrame();
  return <div style={{ ...riseAt(frame, at, 10, 14), fontFamily: FONT_MONO, fontWeight: hot ? 700 : 400, fontSize: 46, color: hot ? COLORS.warn : COLORS.cream, marginTop: 22 }}>{t}</div>;
};

const SnTwelveDays: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill>
      <KenBurns src={IMG.cabin} illustration position="center 45%" dim={0.55} from={{ s: 1.25, x: -6, y: 0 }} to={{ s: 1.32, x: -7, y: -1 }} />
      <div style={{ position: 'absolute', left: 1040, top: 250 }}>
        <div style={{ ...riseAt(frame, c(241.38), 20, 22), fontFamily: FONT_DISPLAY, fontWeight: 800, fontSize: 200, lineHeight: 1, color: COLORS.cream }}>12 days</div>
        <div style={{ height: 30 }} />
        <Line t="raw flour" at={c(243.13)} />
        <Line t="no fire" at={c(244.56)} />
        <Line t="boots frozen to his feet" at={c(246.76)} hot />
      </div>
      <Grain />
      <Dip inFrames={6} />
    </AbsoluteFill>
  );
};
export default SnTwelveDays;
