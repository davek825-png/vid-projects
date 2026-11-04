// Beat 31 · 381.60–386.90 · "What do you think she felt when she saw her brother? Drop your answers in the comment below."
// After the reveal, so her face may now be shown (the embrace).
import React from 'react';
import { AbsoluteFill, staticFile, useCurrentFrame } from 'remotion';
import { MessageCircle } from 'lucide-react';
import { COLORS } from '../../brand';
import { FONT_BODY, FONT_MONO } from '../../fonts';
import { KenBurns, Grain, cueAt, riseAt } from '../../lib/frontier';

export const compositionConfig = { id: 'OwsComment', durationInSeconds: 5.3, fps: 30, width: 1920, height: 1080 };

const c = cueAt(381.6);

const OwsComment: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill>
      <KenBurns src={staticFile('projects/ows-1/web/hug.jpg')} illustration from={{ s: 1.06, x: 0, y: 0 }} to={{ s: 1.14, x: 2, y: 1 }} dim={0.5} />
      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', padding: '0 200px' }}>
        <div style={{ ...riseAt(frame, c(381.73), 14, 18), fontFamily: FONT_BODY, fontStyle: 'italic', fontSize: 74, lineHeight: 1.3, color: COLORS.cream, textAlign: 'center', textShadow: '0 4px 30px rgba(0,0,0,0.9)' }}>
          What do you think she felt when she saw her brother?
        </div>
        <div style={{ ...riseAt(frame, c(384.08), 10, 14), display: 'flex', alignItems: 'center', gap: 16, marginTop: 48, background: COLORS.warn, color: COLORS.ink, padding: '16px 34px', borderRadius: 999 }}>
          <MessageCircle size={36} color={COLORS.ink} strokeWidth={2.4} />
          <span style={{ fontFamily: FONT_MONO, fontWeight: 700, fontSize: 32, letterSpacing: 3 }}>TELL US IN THE COMMENTS</span>
        </div>
      </AbsoluteFill>
      <Grain />
    </AbsoluteFill>
  );
};
export default OwsComment;
