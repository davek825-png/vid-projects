// Beat 26 · 305.40–322.50 · "When she reached the Indian camp, she stepped into the council tent. The men inside
// turned to look at her. She sat down. Then she began to translate. Then she stopped mid-sentence. She had
// recognized the chief."  Camera stays on the chief and fire (she is not shown).
import React from 'react';
import { AbsoluteFill, staticFile } from 'remotion';
import { COLORS } from '../../brand';
import { KenBurns, Scrim, Caption, DimTo, Grain, Dip, cueAt } from '../../lib/frontier';

export const compositionConfig = { id: 'OwsTent', durationInSeconds: 17.1, fps: 30, width: 1920, height: 1080 };

const c = cueAt(305.4);
const STOP = c(316.46);

const OwsTent: React.FC = () => (
  <AbsoluteFill>
    {/* push toward the chief (~0.59, 0.50 of the image); the move FREEZES on "Then she stopped" */}
    <KenBurns src={staticFile('projects/ows-1/web/tent.jpg')} illustration start={0} end={STOP}
      from={{ s: 1.45, x: -5, y: 0 }} to={{ s: 1.7, x: -13, y: 3 }} />
    {/* framing keeps the image's right edge (x > ~0.88, a long-haired woman a viewer could take for
        her) OUT of frame: visible right edge = 0.5 - x/(100*s) + 0.5/s must stay < 0.88 */}
    <DimTo a={STOP} b={c(319.5)} to={0.55} />
    <Scrim height={380} strength={0.75} />
    <AbsoluteFill style={{ justifyContent: 'flex-end', alignItems: 'center', paddingBottom: 110 }}>
      <Caption text="The council tent" at={c(307.73)} outAt={c(313.9)} size={62} font="body" italic style={{ position: 'absolute', bottom: 115 }} />
      <Caption text="She began to translate..." at={c(314.22)} outAt={c(316.3)} size={62} font="body" italic style={{ position: 'absolute', bottom: 115 }} />
      <Caption text="...then stopped mid-sentence." at={c(318.15)} outAt={c(319.5)} size={62} font="body" italic style={{ position: 'absolute', bottom: 115 }} />
      <Caption text="She had recognized the chief." at={c(319.73)} size={84} color={COLORS.warn} style={{ position: 'absolute', bottom: 460 }} />
    </AbsoluteFill>
    <Grain />
    <Dip inFrames={8} />
  </AbsoluteFill>
);
export default OwsTent;
