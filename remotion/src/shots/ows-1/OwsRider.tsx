// Beat 22 · 224.10–245.10 · "2 days into the ride, a rider appeared on the horizon. He sat small against the
// sky, then grew as he came down the slope. Lewis rode toward him until they were about 100 paces apart.
// Then the stranger wheeled his horse, splashed across a creek, and vanished into the willows."
import React from 'react';
import { AbsoluteFill, staticFile, useCurrentFrame } from 'remotion';
import { COLORS } from '../../brand';
import { FONT_MONO } from '../../fonts';
import { KenBurns, Scrim, Caption, DimTo, Grain, Dip, cueAt, riseAt, showBetween } from '../../lib/frontier';

export const compositionConfig = { id: 'OwsRider', durationInSeconds: 21.0, fps: 30, width: 1920, height: 1080 };

const c = cueAt(224.1);
// rider sits at ~(0.47, 0.47) of the frame; push in toward him as he "grows"
const OwsRider: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill>
      <KenBurns src={staticFile('projects/ows-1/web/rider.jpg')} illustration start={c(226.0)} end={c(237.0)}
        from={{ s: 1.0, x: 0, y: 0 }} to={{ s: 1.9, x: 5, y: 5 }} />
      <DimTo a={c(242.4)} b={c(244.6)} to={1} />
      <Scrim height={360} strength={0.7} />
      <div style={{ position: 'absolute', left: 96, top: 80, opacity: showBetween(frame, c(224.23), c(229.0)), transform: riseAt(frame, c(224.23), 10).transform,
        fontFamily: FONT_MONO, fontWeight: 700, fontSize: 30, letterSpacing: 5, color: COLORS.warn, border: `2px solid ${COLORS.warn}`, padding: '10px 20px', background: 'rgba(26,11,6,0.55)' }}>
        TWO DAYS INTO THE RIDE
      </div>
      <AbsoluteFill style={{ justifyContent: 'flex-end', alignItems: 'center', paddingBottom: 110 }}>
        <Caption text="A rider on the horizon" at={c(226.08)} outAt={c(233.8)} size={68} style={{ position: 'absolute', bottom: 110 }} />
        <Caption text="100 paces" at={c(236.89)} outAt={c(239.9)} size={96} color={COLORS.warn} style={{ position: 'absolute', bottom: 100 }} />
        <Caption text="...and he was gone." at={c(242.62)} size={68} font="body" italic style={{ position: 'absolute', bottom: 470 }} />
      </AbsoluteFill>
      <Grain />
      <Dip inFrames={6} />
    </AbsoluteFill>
  );
};
export default OwsRider;
