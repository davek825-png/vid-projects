// Beat 26 · 259.95–267.80 · "The doctor in Genoa said Sisson's feet would need to be amputated, and
// there was no chloroform or anesthesia in town."
import React from 'react';
import { AbsoluteFill } from 'remotion';
import { COLORS } from '../../brand';
import { FONT_DISPLAY } from '../../fonts';
import { ParchmentBg, Grain, Dip, DocCard, LedgerRow, Stamp, cueAt } from '../../lib/frontier';

export const compositionConfig = { id: 'SnNoChloroform', durationInSeconds: 7.85, fps: 30, width: 1920, height: 1080 };

const c = cueAt(259.95);

const SnNoChloroform: React.FC = () => (
  <AbsoluteFill>
    <ParchmentBg />
    <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center' }}>
      <DocCard at={2} width={1300}>
        <div style={{ fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 40, letterSpacing: 4, color: COLORS.ink, marginBottom: 40 }}>THE DOCTOR · GENOA</div>
        <LedgerRow k="PATIENT:" v="James Sisson" at={c(260.45)} vAt={c(261.83)} keyWidth={380} />
        <LedgerRow k="HIS FEET:" v="must be amputated" at={c(262.37)} vAt={c(263.25)} keyWidth={380} hot />
        <LedgerRow k="CHLOROFORM:" v="none in town" at={c(264.86)} vAt={c(265.3)} keyWidth={380} />
        <div style={{ height: 40, display: 'flex', justifyContent: 'flex-end' }}>
          <Stamp text="NO ANESTHESIA" at={c(266.12)} size={66} rotate={-8} style={{ marginTop: -30 }} />
        </div>
      </DocCard>
    </AbsoluteFill>
    <Grain opacity={0.05} />
    <Dip inFrames={6} />
  </AbsoluteFill>
);
export default SnNoChloroform;
