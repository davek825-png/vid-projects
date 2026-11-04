// Beat 15 · 122.50–134.60 · "Lewis wrote that the Indian woman, whom he credited with equal fortitude and
// resolution, in a heroic act, caught and saved most of the light articles that went overboard."
// On screen: Lewis's ACTUAL words (journal, May 16, 1805), spelling modernised.
import React from 'react';
import { AbsoluteFill, staticFile } from 'remotion';
import { COLORS } from '../../brand';
import { ParchmentBg, Grain, Dip, DocCard, QuoteLine, Mark, Print, cueAt } from '../../lib/frontier';

export const compositionConfig = { id: 'OwsFortitude', durationInSeconds: 12.1, fps: 30, width: 1920, height: 1080 };

const c = cueAt(122.5);

const OwsFortitude: React.FC = () => (
  <AbsoluteFill>
    <ParchmentBg />
    <Print src={staticFile('projects/ows-1/web/lewis-engraving.jpg')} width={330} height={327} at={2} rotate={-3}
      caption="Meriwether Lewis" style={{ position: 'absolute', left: 110, top: 330 }} />
    <div style={{ position: 'absolute', left: 560, top: 190 }}>
      <DocCard at={4} width={1240} rotate={0.4} source="Meriwether Lewis, journal, May 16, 1805" sourceAt={c(133.2)}>
        <QuoteLine at={c(123.6)} size={48}>"the Indian woman, to whom I ascribe</QuoteLine>
        <QuoteLine at={c(127.07)} size={48}><Mark at={c(127.07) + 4} color={COLORS.accent}>equal fortitude and resolution</Mark> with any</QuoteLine>
        <QuoteLine at={c(128.3)} size={48}>person onboard at the time of the accident,</QuoteLine>
        <QuoteLine at={c(130.65)} size={48}>caught and preserved most of the light</QuoteLine>
        <QuoteLine at={c(133.09)} size={48}>articles which were washed overboard."</QuoteLine>
      </DocCard>
    </div>
    <Grain opacity={0.05} />
    <Dip inFrames={6} />
  </AbsoluteFill>
);
export default OwsFortitude;
