// Beat 02 · 8.60–13.00 · "In Lewis and Clark's Expedition Journal, one person kept appearing."
// An unreadable journal page; on "one person" the same phrase surfaces again and again.
import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { COLORS } from '../../brand';
import { FONT_MONO } from '../../fonts';
import { ParchmentBg, Grain, Dip, JournalPage, cueAt, riseAt } from '../../lib/frontier';

export const compositionConfig = { id: 'OwsJournalOpen', durationInSeconds: 4.4, fps: 30, width: 1920, height: 1080 };

const IN = 8.6;
const c = cueAt(IN);

const OwsJournalOpen: React.FC = () => {
  const frame = useCurrentFrame();
  const p = c(11.48); // "one person"
  return (
    <AbsoluteFill>
      <ParchmentBg />
      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ ...riseAt(frame, c(9.02), 10, 14), fontFamily: FONT_MONO, fontSize: 26, letterSpacing: 6, color: COLORS.accent, marginBottom: 28 }}>
          THE EXPEDITION JOURNALS · 1804–1806
        </div>
        <JournalPage at={2} width={1180} rows={[
          { w: 980 }, { w: 1010 },
          { text: '... the Indian woman ...', at: p, mark: p + 6 },
          { w: 940 }, { w: 1000 }, { w: 860 },
          { text: '... the Indian woman ...', at: p + 10, mark: p + 16 },
          { w: 990 },
          { text: '... the Indian woman ...', at: p + 20, mark: p + 26 },
          { w: 760 },
        ]} />
      </AbsoluteFill>
      <Grain opacity={0.05} />
      <Dip inFrames={8} />
    </AbsoluteFill>
  );
};
export default OwsJournalOpen;
