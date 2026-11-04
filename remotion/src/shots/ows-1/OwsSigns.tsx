// Beat 24 · 254.30–289.60 · "On August 13th, the search party found 3 Indian women. ...George Drouillard,
// knew hand signs... severely limited. Signs could say hello. They could say, 'We are friends and we want
// to trade.' But could a few hand movements explain their need to cross a mountain range? Could they trade
// for horses and earn the trust of strangers on hand signals alone? Drouillard had his doubts..."
import React from 'react';
import { AbsoluteFill, staticFile, useCurrentFrame } from 'remotion';
import { COLORS } from '../../brand';
import { FONT_DISPLAY, FONT_BODY, FONT_MONO } from '../../fonts';
import { ParchmentBg, Grain, Dip, Print, DateStamp, InkNameTag, cueAt, riseAt, showBetween } from '../../lib/frontier';

export const compositionConfig = { id: 'OwsSigns', durationInSeconds: 35.3, fps: 30, width: 1920, height: 1080 };

const c = cueAt(254.3);
const G1_OUT = c(268.4), G2_OUT = c(274.2), G3_OUT = c(284.6);

const Line: React.FC<{ at: number; children: React.ReactNode; size?: number; color?: string; italic?: boolean; display?: boolean }> = ({ at, children, size = 48, color = COLORS.ink, italic, display }) => {
  const frame = useCurrentFrame();
  return (
    <div style={{ ...riseAt(frame, at, 10, 14), fontFamily: display ? FONT_DISPLAY : FONT_BODY, fontWeight: display ? 700 : 400, fontStyle: italic ? 'italic' : 'normal', fontSize: size, lineHeight: 1.3, color, marginBottom: 22 }}>
      {children}
    </div>
  );
};
const Group: React.FC<{ inAt: number; outAt?: number; children: React.ReactNode }> = ({ inAt, outAt, children }) => {
  const frame = useCurrentFrame();
  return <div style={{ position: 'absolute', left: 130, top: 250, width: 950, opacity: showBetween(frame, inAt, outAt, 10) }}>{children}</div>;
};

const OwsSigns: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill>
      <ParchmentBg />
      <Print src={staticFile('projects/ows-1/web/hand-signs.jpg')} width={500} height={828} at={c(261.99)} rotate={1.6}
        caption="Plains sign language (Mallery, 1881)" style={{ position: 'absolute', right: 170, top: 90 }} />
      <DateStamp text="August 13, 1805" at={c(254.43)} onDark={false} outAt={G1_OUT} />
      <Group inAt={c(256.2)} outAt={G1_OUT}>
        <Line at={c(256.2)} display size={64}>Three Indian women</Line>
        <InkNameTag name="George Drouillard" role="the party's hunter" at={c(260.2)} style={{ marginTop: 40 }} />
        <Line at={c(261.99)} italic size={42}>knew hand signs</Line>
        <Line at={c(266.89)} color={COLORS.danger} size={42}>but only a few</Line>
      </Group>
      <Group inAt={c(268.98)} outAt={G2_OUT}>
        <div style={{ ...riseAt(frame, c(268.98), 8, 12), fontFamily: FONT_MONO, fontSize: 28, letterSpacing: 4, color: COLORS.muted, marginBottom: 30 }}>SIGNS COULD SAY</div>
        <Line at={c(269.4)} display size={70}>"Hello."</Line>
        <Line at={c(271.55)} display size={70}>"We are friends."</Line>
        <Line at={c(272.83)} display size={70}>"We want to trade."</Line>
      </Group>
      <Group inAt={c(274.52)} outAt={G3_OUT}>
        <div style={{ ...riseAt(frame, c(274.52), 8, 12), fontFamily: FONT_MONO, fontSize: 28, letterSpacing: 4, color: COLORS.muted, marginBottom: 30 }}>BUT COULD THEY EXPLAIN</div>
        <Line at={c(276.2)} size={54}>crossing a mountain range?</Line>
        <Line at={c(279.25)} size={54}>trading for horses?</Line>
        <Line at={c(281.4)} size={54}>earning a stranger's trust?</Line>
      </Group>
      <Group inAt={c(284.95)}>
        <Line at={c(284.95)} display size={66}>Drouillard had his doubts.</Line>
        <Line at={c(287.04)} display size={66} color={COLORS.accent}>So did Lewis.</Line>
      </Group>
      <Grain opacity={0.05} />
      <Dip inFrames={6} />
    </AbsoluteFill>
  );
};
export default OwsSigns;
