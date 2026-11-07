// Utility shot (not a video beat): proof of the CUTOUT style kit (lib/styles.tsx) on a sample
// beat. The make-tsx style gate shows this to the creator. Uses ows-snowshoe images (local media).
import React from 'react';
import { AbsoluteFill, staticFile, useCurrentFrame } from 'remotion';
import { COLORS } from '../../brand';
import { CraftPaperBg, CutoutPhoto, PaperLabel, PaperPiece } from '../../lib/styles';
import { FONT_MONO } from '../../fonts';

export const compositionConfig = { id: 'StyleCutoutProof', durationInSeconds: 4, fps: 30, width: 1920, height: 1080 };

const StyleCutoutProof: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill>
      <CraftPaperBg color="#E9C98F" strips={[{ color: COLORS.d400, top: 560, seed: 4 }, { color: COLORS.muted, top: 700, seed: 9 }, { color: '#F7F1E6', top: 860, seed: 13 }]} />
      <CutoutPhoto frame={frame} at={4} seed={3} src={staticFile('projects/ows-snowshoe/web/snowshoe-thompson-g-03-212.jpg')} width={380} height={482} rotate={-4} style={{ position: 'absolute', left: 240, top: 150 }} />
      <PaperLabel frame={frame} at={20} seed={7} text="John Thompson" size={76} style={{ position: 'absolute', left: 780, top: 250 }} />
      <PaperLabel frame={frame} at={30} seed={11} text="a Norwegian immigrant" size={44} font="body" color={COLORS.warn} rotate={1.5} style={{ position: 'absolute', left: 820, top: 390 }} />
      <PaperPiece frame={frame} at={42} seed={21} rotate={-6} color={COLORS.danger} padding="10px 26px" from="drop" style={{ position: 'absolute', left: 1300, top: 520 }}>
        <div style={{ fontFamily: FONT_MONO, fontWeight: 700, fontSize: 40, letterSpacing: 4, color: COLORS.cream }}>90 MILES</div>
      </PaperPiece>
    </AbsoluteFill>
  );
};
export default StyleCutoutProof;
