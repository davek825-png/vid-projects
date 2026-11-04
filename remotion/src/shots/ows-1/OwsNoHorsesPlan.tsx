// Beat 17 · 150.40–171.20 · "You see, the expedition had been searching for a water route to the Pacific,
// and horses were not part of the plan. Lewis wrote in his journal that without horses, the Corps would
// have to leave a great part of its supplies behind..."
// Phase B is a PARAPHRASE (not a quote), labeled as such.
import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { COLORS } from '../../brand';
import { FONT_DISPLAY, FONT_BODY, FONT_MONO } from '../../fonts';
import { ParchmentBg, Grain, Dip, DocCard, Mark, cueAt, riseAt, showBetween } from '../../lib/frontier';

export const compositionConfig = { id: 'OwsNoHorsesPlan', durationInSeconds: 20.8, fps: 30, width: 1920, height: 1080 };

const c = cueAt(150.4);
const SWITCH = c(157.9);

const OwsNoHorsesPlan: React.FC = () => {
  const frame = useCurrentFrame();
  const mono = { fontFamily: FONT_MONO, fontSize: 44 } as const;
  return (
    <AbsoluteFill>
      <ParchmentBg />
      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', opacity: showBetween(frame, 0, SWITCH, 10) }}>
        <DocCard at={2} width={1180}>
          <div style={{ fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 44, letterSpacing: 4, color: COLORS.ink, marginBottom: 44 }}>THE PLAN</div>
          <div style={{ ...riseAt(frame, c(153.68), 8, 12), ...mono, color: COLORS.ink, marginBottom: 30 }}>
            <span style={{ color: '#4f6b3a', fontWeight: 700 }}>✓</span>&nbsp; A water route to the Pacific
          </div>
          <div style={{ ...riseAt(frame, c(155.54), 8, 12), ...mono, color: COLORS.danger }}>
            <span style={{ fontWeight: 700 }}>✗</span>&nbsp; Horses
          </div>
        </DocCard>
      </AbsoluteFill>
      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', opacity: showBetween(frame, SWITCH + 4, undefined, 12) }}>
        <DocCard at={SWITCH + 4} width={1300}>
          <div style={{ fontFamily: FONT_MONO, fontSize: 26, letterSpacing: 4, color: COLORS.muted, marginBottom: 30 }}>LEWIS, IN HIS JOURNAL (PARAPHRASED)</div>
          <div style={{ ...riseAt(frame, c(160.2), 8, 14), fontFamily: FONT_BODY, fontSize: 54, lineHeight: 1.4, color: COLORS.ink }}>
            Without horses, the Corps must leave <Mark at={c(162.19)}>a great part of its supplies</Mark> behind.
          </div>
          <div style={{ ...riseAt(frame, c(167.3), 8, 14), fontFamily: FONT_BODY, fontStyle: 'italic', fontSize: 42, color: COLORS.danger, marginTop: 34 }}>
            And supplies were already running thin.
          </div>
        </DocCard>
      </AbsoluteFill>
      <Grain opacity={0.05} />
      <Dip inFrames={6} />
    </AbsoluteFill>
  );
};
export default OwsNoHorsesPlan;
