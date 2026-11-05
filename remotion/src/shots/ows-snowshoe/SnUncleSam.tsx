// Beat 33 · 332.65–338.70 · "He is often quoted as saying that if he did his job and got the mail
// through, Uncle Sam would pay him." Not verbatim -> labeled as a paraphrase (accuracy rule).
import React from 'react';
import { AbsoluteFill } from 'remotion';
import { ParchmentBg, Grain, Dip, DocCard, QuoteLine, Mark, cueAt } from '../../lib/frontier';

export const compositionConfig = { id: 'SnUncleSam', durationInSeconds: 6.05, fps: 30, width: 1920, height: 1080 };

const c = cueAt(332.65);

const SnUncleSam: React.FC = () => (
  <AbsoluteFill>
    <ParchmentBg />
    <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center' }}>
      <DocCard at={2} width={1360} source="OFTEN ATTRIBUTED TO THOMPSON · PARAPHRASED" sourceAt={c(333.38)}>
        <QuoteLine at={c(334.51)} size={60}>If he did his job and got the mail through,</QuoteLine>
        <QuoteLine at={c(337.16)} size={60}><Mark at={c(337.4)}>Uncle Sam would pay him.</Mark></QuoteLine>
      </DocCard>
    </AbsoluteFill>
    <Grain opacity={0.05} />
    <Dip inFrames={6} />
  </AbsoluteFill>
);
export default SnUncleSam;
