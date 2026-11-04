// Beat 29 · 362.10–377.80 · "Through the negotiation, she learned that most of her family had died, but two
// brothers were still alive. One of them was sitting right in front of her. He sold Lewis and Clark the
// horses they desperately needed."  Slow push onto the chief (she is not shown).
import React from 'react';
import { AbsoluteFill, staticFile } from 'remotion';
import { COLORS } from '../../brand';
import { KenBurns, Scrim, Caption, Grain, Dip, cueAt } from '../../lib/frontier';

export const compositionConfig = { id: 'OwsBrother', durationInSeconds: 15.7, fps: 30, width: 1920, height: 1080 };

const c = cueAt(362.1);

const OwsBrother: React.FC = () => (
  <AbsoluteFill>
    {/* chief at ~(0.59, 0.47) of the image: t = -(p - 0.5) * s */}
    <KenBurns src={staticFile('projects/ows-1/web/tent.jpg')} illustration
      from={{ s: 1.7, x: -13, y: 2 }} to={{ s: 2.1, x: -19, y: 6 }} dim={0.1} />
    <Scrim height={430} />
    <AbsoluteFill style={{ justifyContent: 'flex-end', alignItems: 'center', paddingBottom: 110 }}>
      <Caption text="Most of her family had died" at={c(365.1)} outAt={c(367.3)} size={64} font="body" italic style={{ position: 'absolute', bottom: 115 }} />
      <Caption text="But two brothers were still alive" at={c(367.65)} outAt={c(369.8)} size={64} font="body" italic style={{ position: 'absolute', bottom: 115 }} />
      <Caption text="One of them was the chief." at={c(370.06)} outAt={c(373.9)} size={86} color={COLORS.warn} style={{ position: 'absolute', bottom: 110 }} />
      <Caption text="He sold them the horses they needed." at={c(374.08)} size={64} font="body" italic style={{ position: 'absolute', bottom: 115 }} />
    </AbsoluteFill>
    <Grain />
    <Dip inFrames={6} outFrames={8} />
  </AbsoluteFill>
);
export default OwsBrother;
