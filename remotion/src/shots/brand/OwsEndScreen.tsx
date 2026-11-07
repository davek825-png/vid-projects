// Utility still (not a video beat): the Old West Stories END SCREEN slide, 16 s at the end of every
// video. Same look as the creator's original (black, gold double frame, cream serif) but with two
// EMPTY slots sized for YouTube's end-screen elements so nothing overlaps the text:
//   VIDEO slot (16:9)  x 200..1016, y 372..831  -> drop the "Video" element here
//   SUBSCRIBE circle   centre (1440, 580), d 320 -> drop the "Subscribe" element here
// Static on purpose (every frame identical). Render: node scripts/render-all.mjs --still OwsEndScreen
import React from 'react';
import { AbsoluteFill } from 'remotion';
import { FONT_BODY, FONT_SERIF } from '../../fonts';

export const compositionConfig = { id: 'OwsEndScreen', durationInSeconds: 1, fps: 30, width: 1920, height: 1080 };

const BG = '#0A0705';
const GOLD = '#7A5A2E';
const CREAM = '#F1E3C2';
const SLOT = '#120D09';

const VIDEO = { x: 200, y: 372, w: 816, h: 459 };
const SUB = { cx: 1440, cy: 580, d: 320 };

const OwsEndScreen: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: BG, fontFamily: FONT_SERIF || FONT_BODY, color: CREAM }}>
    {/* double gold frame, as on the original slide */}
    <div style={{ position: 'absolute', inset: 60, border: `3px solid ${GOLD}` }} />
    <div style={{ position: 'absolute', inset: 76, border: `1px solid ${GOLD}`, opacity: 0.6 }} />

    {/* title block (top) */}
    <div style={{ position: 'absolute', top: 104, left: 0, right: 0, textAlign: 'center' }}>
      <div style={{ fontSize: 104, fontWeight: 600, letterSpacing: 1, lineHeight: 1 }}>Old West Stories</div>
      <div style={{ width: 520, height: 1.5, background: GOLD, margin: '30px auto 26px' }} />
      <div style={{ fontFamily: FONT_BODY, fontStyle: 'italic', fontSize: 38, opacity: 0.92 }}>
        If this story stayed with you, give it a like and subscribe for more true tales of the frontier.
      </div>
    </div>

    {/* VIDEO slot: YouTube's "Video" element sits here */}
    <div style={{ position: 'absolute', left: VIDEO.x, top: VIDEO.y, width: VIDEO.w, height: VIDEO.h, background: SLOT, border: `2px solid ${GOLD}`, borderRadius: 6 }} />
    <div style={{ position: 'absolute', left: VIDEO.x, width: VIDEO.w, top: VIDEO.y + VIDEO.h + 22, textAlign: 'center', fontSize: 34, letterSpacing: 8 }}>WATCH THE NEXT STORY</div>

    {/* SUBSCRIBE slot: YouTube's "Subscribe" element sits here */}
    <div style={{ position: 'absolute', left: SUB.cx - SUB.d / 2, top: SUB.cy - SUB.d / 2, width: SUB.d, height: SUB.d, borderRadius: '50%', background: SLOT, border: `2px solid ${GOLD}` }} />
    <div style={{ position: 'absolute', left: SUB.cx - 300, width: 600, top: SUB.cy + SUB.d / 2 + 22, textAlign: 'center' }}>
      <div style={{ fontSize: 34, letterSpacing: 8 }}>SUBSCRIBE</div>
      <div style={{ fontSize: 40, marginTop: 10 }}>@storiesoldwest</div>
    </div>

    {/* sign-off (bottom) */}
    <div style={{ position: 'absolute', bottom: 100, left: 0, right: 0, textAlign: 'center', fontFamily: FONT_BODY, fontStyle: 'italic', fontSize: 30, opacity: 0.8 }}>
      Pull up a chair. We'll see you at the next story.
    </div>
  </AbsoluteFill>
);
export default OwsEndScreen;
