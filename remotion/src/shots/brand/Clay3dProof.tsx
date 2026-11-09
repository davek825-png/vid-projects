// Utility shot (not a video beat): proof that the 3D claymation kit (lib/clay3d.tsx) renders.
// Render with: node scripts/render-all.mjs --still --scale=1 --gl=angle Clay3dProof
import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { ClayWorld, Prop, Camel3D, Person3D, Saguaro3D, Mesa3D, Sun3D, CLAY, stepF, driftCam } from '../../lib/clay3d';

export const compositionConfig = { id: 'Clay3dProof', durationInSeconds: 3, fps: 30, width: 1920, height: 1080 };

const Clay3dProof: React.FC = () => {
  const f = stepF(useCurrentFrame());
  const cam = driftCam(f, 90, { pos: [0, 3.2, 14], look: [0, 1.6, 0] }, { pos: [1.2, 3.0, 12.5], look: [0.5, 1.6, 0] });
  return (
    <AbsoluteFill>
      <ClayWorld sky={CLAY.ochre} floor={CLAY.sand} cam={cam} sun={[-6, 7, 8]}>
        <Sun3D position={[-2, 5, -20]} r={3} color={CLAY.gold} />
        <Prop at={[-7, 0, -8]} seed={1}><Mesa3D w={5} h={3.5} /></Prop>
        <Prop at={[6, 0, -9]} seed={2}><Mesa3D w={6} h={2.6} seed={2} color={CLAY.bronze} /></Prop>
        <Prop at={[-3, 0, 0]} seed={3}><Camel3D phase={f / 7} /></Prop>
        <Prop at={[1.5, 0, 0.6]} seed={4}><Camel3D phase={f / 7 + 1.4} /></Prop>
        <Prop at={[4.4, 0, 1.2]} seed={5}><Person3D pose="walk" phase={f / 6} /></Prop>
        <Prop at={[-6.5, 0, 2]} seed={6}><Saguaro3D s={1.1} /></Prop>
      </ClayWorld>
    </AbsoluteFill>
  );
};
export default Clay3dProof;
