// Beat 27 · 322.50–343.90 · "The account published in 1814, drawn from the explorers' journal, says she jumped up,
// ran to him, threw her blanket around him, and wept. The chief was moved too... The tent went silent. For a
// moment, nobody in it needed a translator."
// Phase A quotes the 1814 (Biddle) account; phase B returns to the tent (no image of her).
import React from 'react';
import { AbsoluteFill, staticFile, useCurrentFrame } from 'remotion';
import { COLORS } from '../../brand';
import { FONT_MONO } from '../../fonts';
import { NightBg, KenBurns, Scrim, Caption, DocCard, QuoteLine, FadeIn, Grain, Dip, cueAt, riseAt, showBetween } from '../../lib/frontier';

export const compositionConfig = { id: 'OwsEmbrace', durationInSeconds: 21.4, fps: 30, width: 1920, height: 1080 };

const c = cueAt(322.5);
const SWITCH = c(331.3);

const OwsEmbrace: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill>
      <NightBg glow={COLORS.accent2} />
      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', opacity: showBetween(frame, 0, SWITCH, 12) }}>
        <div style={{ ...riseAt(frame, c(322.62), 8, 14), fontFamily: FONT_MONO, fontSize: 28, letterSpacing: 6, color: COLORS.warn, marginBottom: 34 }}>
          THE ACCOUNT, PUBLISHED IN 1814
        </div>
        <DocCard at={c(323.3)} width={1300} source="History of the Expedition under the Command of Captains Lewis and Clark, 1814" sourceAt={c(324.5)}>
          <QuoteLine at={c(326.79)} size={54}>"she instantly jumped up,</QuoteLine>
          <QuoteLine at={c(328.0)} size={54}>and ran and embraced him,</QuoteLine>
          <QuoteLine at={c(329.12)} size={54}>throwing over him her blanket</QuoteLine>
          <QuoteLine at={c(330.42)} size={54}>and weeping profusely."</QuoteLine>
        </DocCard>
      </AbsoluteFill>
      <FadeIn a={SWITCH} dur={24}>
        <KenBurns src={staticFile('projects/ows-1/web/tent.jpg')} illustration start={SWITCH}
          from={{ s: 1.5, x: -4, y: -2 }} to={{ s: 1.6, x: -4, y: -6 }} dim={0.35} />
        <Scrim height={420} />
        <AbsoluteFill style={{ justifyContent: 'flex-end', alignItems: 'center', paddingBottom: 110 }}>
          <Caption text="The tent went silent." at={c(336.12)} outAt={c(339.8)} size={74} style={{ position: 'absolute', bottom: 115 }} />
          <Caption text="Nobody in it needed a translator." at={c(340.21)} size={74} color={COLORS.warn} style={{ position: 'absolute', bottom: 115 }} />
        </AbsoluteFill>
      </FadeIn>
      <Grain />
      <Dip inFrames={8} />
    </AbsoluteFill>
  );
};
export default OwsEmbrace;
