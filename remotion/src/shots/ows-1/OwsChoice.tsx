// Beat 20 · 193.50–218.70 · "Now Lewis faced a choice, and both options were bad. The Corps could stay
// together... Or he could ride faster with fewer men... Lewis chose speed."
import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { COLORS } from '../../brand';
import { FONT_DISPLAY, FONT_BODY, FONT_MONO } from '../../fonts';
import { NightBg, Grain, Dip, cueAt, riseAt, ramp } from '../../lib/frontier';

export const compositionConfig = { id: 'OwsChoice', durationInSeconds: 25.2, fps: 30, width: 1920, height: 1080 };

const c = cueAt(193.5);
const CHOSE = c(216.92);

const Option: React.FC<{ title: string; items: [string, number][]; at: number; chosen: boolean }> = ({ title, items, at, chosen }) => {
  const frame = useCurrentFrame();
  const lit = chosen ? ramp(frame, CHOSE, CHOSE + 14) : 0;
  const dimmed = !chosen ? ramp(frame, CHOSE, CHOSE + 14) : 0;
  return (
    <div style={{
      ...riseAt(frame, at, 20, 18), width: 720, padding: '46px 54px', background: COLORS.cream, opacity: riseAt(frame, at, 20, 18).opacity * (1 - dimmed * 0.55),
      border: `6px solid ${lit > 0 ? COLORS.warn : COLORS.line}`, boxShadow: `0 20px 60px rgba(0,0,0,0.5), 0 0 ${lit * 60}px ${COLORS.warn}88`,
      transform: `${riseAt(frame, at, 20, 18).transform} scale(${1 + lit * 0.04})`,
    }}>
      <div style={{ fontFamily: FONT_DISPLAY, fontWeight: 800, fontSize: 58, color: COLORS.ink, marginBottom: 26 }}>{title}</div>
      {items.map(([t, a]) => (
        <div key={t} style={{ ...riseAt(frame, a, 8, 12), fontFamily: FONT_BODY, fontSize: 38, color: COLORS.ink, marginBottom: 14 }}>· {t}</div>
      ))}
    </div>
  );
};

const OwsChoice: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill>
      <NightBg glow={COLORS.accent} />
      <div style={{ position: 'absolute', top: 110, left: 0, right: 0, textAlign: 'center' }}>
        <div style={{ ...riseAt(frame, c(193.76), 10, 14), fontFamily: FONT_MONO, fontSize: 32, letterSpacing: 7, color: COLORS.warn }}>LEWIS FACES A CHOICE</div>
        <div style={{ ...riseAt(frame, c(195.53), 8, 14), fontFamily: FONT_BODY, fontStyle: 'italic', fontSize: 40, color: COLORS.d300, marginTop: 14 }}>both options were bad</div>
      </div>
      <AbsoluteFill style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 70, paddingTop: 140 }}>
        <Option title="Stay together" at={c(198.47)} chosen={false} items={[['a slow pace', c(200.6)], ['supplies dwindle', c(203.2)]]} />
        <Option title="Ride ahead" at={c(204.57)} chosen items={[
          ['faster, with fewer men', c(205.8)], ['unknown country', c(208.25)], ['people who might not be friendly', c(211.71)], ['maybe no horses to trade', c(214.02)],
        ]} />
      </AbsoluteFill>
      <div style={{ position: 'absolute', bottom: 70, left: 0, right: 0, textAlign: 'center', ...riseAt(frame, CHOSE, 10, 14), fontFamily: FONT_DISPLAY, fontWeight: 800, fontSize: 64, color: COLORS.warn }}>
        Lewis chose speed.
      </div>
      <Grain />
      <Dip inFrames={8} />
    </AbsoluteFill>
  );
};
export default OwsChoice;
