// Beat 28 · 343.90–362.10 · "The tribe had every reason to be wary of strangers. Without the interpreter's wife,
// the negotiation likely would have failed, and the dozens of horses the Corps needed probably would never have
// changed hands. But she bridged the cultural and communication gap, and the trade succeeded."
import React from 'react';
import { AbsoluteFill, staticFile } from 'remotion';
import { COLORS } from '../../brand';
import { KenBurns, Scrim, Caption, Grain, Dip, cueAt } from '../../lib/frontier';

export const compositionConfig = { id: 'OwsTrade', durationInSeconds: 18.2, fps: 30, width: 1920, height: 1080 };

const c = cueAt(343.9);

const OwsTrade: React.FC = () => (
  <AbsoluteFill>
    <KenBurns src={staticFile('projects/ows-1/web/camp.jpg')} illustration from={{ s: 1.18, x: 2, y: -3 }} to={{ s: 1.04, x: 0, y: 0 }} />
    <Scrim height={430} />
    <AbsoluteFill style={{ justifyContent: 'flex-end', alignItems: 'center', paddingBottom: 110 }}>
      <Caption text="Wary of strangers" at={c(344.07)} outAt={c(346.6)} size={66} font="body" italic style={{ position: 'absolute', bottom: 115 }} />
      <Caption text="Without her, the talks fail" at={c(346.88)} outAt={c(351.3)} size={66} font="body" italic style={{ position: 'absolute', bottom: 115 }} />
      <Caption text="Dozens of horses" at={c(351.69)} outAt={c(356.5)} size={80} style={{ position: 'absolute', bottom: 110 }} />
      <Caption text="The trade succeeded." at={c(360.35) - 6} size={84} color={COLORS.warn} style={{ position: 'absolute', bottom: 110 }} />
    </AbsoluteFill>
    <Grain />
    <Dip inFrames={6} />
  </AbsoluteFill>
);
export default OwsTrade;
