// Beat 13 · 121.75–138.10 · "The postmaster told him the situation plainly. The contract was not his
// to give. He had no authority to hire Thompson and no authority to pay him. One account says
// Thompson came back every morning for 5 days until the postmaster finally said yes."
import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { COLORS } from '../../brand';
import { FONT_DISPLAY, FONT_MONO } from '../../fonts';
import { ParchmentBg, Grain, Dip, DocCard, LedgerRow, Stamp, cueAt, ramp } from '../../lib/frontier';

export const compositionConfig = { id: 'SnNoAuthority', durationInSeconds: 16.35, fps: 30, width: 1920, height: 1080 };

const c = cueAt(121.75);
const TALLY = [133.03, 133.27, 133.6, 133.93, 134.33];

const SnNoAuthority: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill>
      <ParchmentBg />
      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center' }}>
        <DocCard at={2} width={1320} source="One account" sourceAt={c(131.21)}>
          <div style={{ fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 40, letterSpacing: 4, color: COLORS.ink, marginBottom: 40 }}>PLACERVILLE POST OFFICE</div>
          <LedgerRow k="CONTRACT:" v="not his to give" at={c(125.33)} vAt={c(126.04)} keyWidth={470} />
          <LedgerRow k="AUTHORITY TO HIRE:" v="none" at={c(128.05)} vAt={c(128.47)} keyWidth={470} />
          <LedgerRow k="AUTHORITY TO PAY:" v="none" at={c(129.75)} vAt={c(130.31)} keyWidth={470} hot />
          <div style={{ display: 'flex', gap: 30, alignItems: 'center', marginTop: 20 }}>
            <div style={{ width: 470, fontFamily: FONT_MONO, fontWeight: 700, fontSize: 34, letterSpacing: 3, color: COLORS.muted, opacity: ramp(frame, c(132.56), c(132.56) + 12) }}>MORNINGS:</div>
            <svg width={260} height={70}>
              {TALLY.map((t, i) => {
                const p = ramp(frame, c(t), c(t) + 5);
                return i < 4
                  ? <line key={i} x1={20 + i * 44} y1={62} x2={20 + i * 44} y2={62 - 56 * p} stroke={COLORS.ink} strokeWidth={7} strokeLinecap="round" />
                  : <line key={i} x1={0} y1={50} x2={0 + 175 * p} y2={50 - 34 * p} stroke={COLORS.accent} strokeWidth={7} strokeLinecap="round" />;
              })}
            </svg>
            <div style={{ marginLeft: 'auto' }}><Stamp text="YES" at={c(136.91)} color={COLORS.signal} size={84} /></div>
          </div>
        </DocCard>
      </AbsoluteFill>
      <Grain opacity={0.05} />
      <Dip inFrames={6} />
    </AbsoluteFill>
  );
};
export default SnNoAuthority;
