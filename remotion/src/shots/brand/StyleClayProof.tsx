// Utility shot (not a video beat): proof of the CLAYMATION style kit (lib/styles.tsx) on a sample
// beat. The make-tsx style gate shows this to the creator. Uses ows-snowshoe images (local media).
import React from 'react';
import { AbsoluteFill, staticFile, useCurrentFrame } from 'remotion';
import { COLORS } from '../../brand';
import { FONT_MONO } from '../../fonts';
import { ClayDefs, ClaySet, ClayMountains, ClayPiece, ClayText, ClaySlab, ClayPhotoProp } from '../../lib/styles';

export const compositionConfig = { id: 'StyleClayProof', durationInSeconds: 4, fps: 30, width: 1920, height: 1080 };

const StyleClayProof: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill>
      <ClayDefs />
      <ClaySet wall="#5B7C93" floor="#E8E1D4" horizon={780} />
      <ClayMountains y={800} color={COLORS.d400} snow="#F7F1E6" />
      <ClayPiece frame={frame} at={4} seed={3} style={{ position: 'absolute', left: 230, top: 250 }}>
        <ClayPhotoProp src={staticFile('projects/ows-snowshoe/web/snowshoe-thompson-g-03-212.jpg')} width={340} height={432} />
      </ClayPiece>
      <ClayPiece frame={frame} at={16} seed={7} shadow={false} style={{ position: 'absolute', left: 760, top: 200 }}>
        <ClayText text="20 Winters" size={150} />
      </ClayPiece>
      <ClayPiece frame={frame} at={34} seed={11} style={{ position: 'absolute', left: 820, top: 470 }}>
        <ClaySlab>
          <div style={{ fontFamily: FONT_MONO, fontWeight: 700, fontSize: 44, letterSpacing: 4, color: COLORS.ink }}>90 MILES · 60–80 LB</div>
        </ClaySlab>
      </ClayPiece>
    </AbsoluteFill>
  );
};
export default StyleClayProof;
