// Hand-inked route map on parchment — reusable for any "who went where" frontier beat.
// NOT a shot. Coordinates are px on a 1920x1080 canvas (west = left). Routes are polylines
// revealed by stroke-dashoffset; a marker can ride a route by fraction (routePoint).
import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { COLORS, EASINGS } from '../brand';
import { FONT_DISPLAY, FONT_BODY, FONT_MONO } from '../fonts';
import { ramp, showBetween } from './frontier';

export type Pt = [number, number];
export type Place = { label: string; x: number; y: number; at: number; sub?: string; above?: boolean; outAt?: number; hot?: boolean };
export type Route = { pts: Pt[]; at: number; dur: number; color?: string; width?: number; outAt?: number };
export type Range = { x0: number; x1: number; y: number; at: number; label?: string; labelAt?: number };

const segLens = (pts: Pt[]) => pts.slice(1).map((p, i) => Math.hypot(p[0] - pts[i][0], p[1] - pts[i][1]));
export const routeLength = (pts: Pt[]) => segLens(pts).reduce((a, b) => a + b, 0);

/** Point at fraction p (0..1) along a polyline. */
export const routePoint = (pts: Pt[], p: number): Pt => {
  const ls = segLens(pts); const total = ls.reduce((a, b) => a + b, 0);
  let d = Math.max(0, Math.min(1, p)) * total;
  for (let i = 0; i < ls.length; i++) {
    if (d <= ls[i] || i === ls.length - 1) {
      const t = ls[i] === 0 ? 0 : Math.min(1, d / ls[i]);
      return [pts[i][0] + (pts[i + 1][0] - pts[i][0]) * t, pts[i][1] + (pts[i + 1][1] - pts[i][1]) * t];
    }
    d -= ls[i];
  }
  return pts[pts.length - 1];
};

/** A row of inked peaks between x0..x1 around y, drawn in left to right from `at`. */
export const MountainRange: React.FC<Range> = ({ x0, x1, y, at, label, labelAt }) => {
  const frame = useCurrentFrame();
  const n = Math.max(3, Math.round((x1 - x0) / 46));
  const peaks = Array.from({ length: n }, (_, i) => {
    const x = x0 + ((x1 - x0) * i) / (n - 1);
    const h = 46 + ((i * 37) % 5) * 11; // deterministic jagged heights
    const yy = y + ((i * 53) % 3) * 16 - 16;
    return { x, h, yy, a: at + Math.round((i / n) * 22) };
  });
  return (
    <>
      <svg width={1920} height={1080} style={{ position: 'absolute', inset: 0 }}>
        {peaks.map((p, i) => (
          <g key={i} opacity={ramp(frame, p.a, p.a + 10)}>
            <path d={`M ${p.x - p.h * 0.75} ${p.yy} L ${p.x} ${p.yy - p.h} L ${p.x + p.h * 0.75} ${p.yy}`} fill={COLORS.cream} stroke={COLORS.muted} strokeWidth={4} strokeLinejoin="round" />
            <path d={`M ${p.x - p.h * 0.28} ${p.yy - p.h * 0.62} L ${p.x} ${p.yy - p.h} L ${p.x + p.h * 0.28} ${p.yy - p.h * 0.62}`} fill="none" stroke={COLORS.d400} strokeWidth={3} />
          </g>
        ))}
      </svg>
      {label && (
        <div style={{
          position: 'absolute', left: (x0 + x1) / 2, top: y + 34, transform: 'translateX(-50%)', opacity: ramp(frame, labelAt ?? at + 18, (labelAt ?? at + 18) + 14),
          fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 34, letterSpacing: 10, color: COLORS.muted, whiteSpace: 'nowrap',
        }}>{label}</div>
      )}
    </>
  );
};

/** An inked route that draws itself over [at, at+dur]. */
export const RouteLine: React.FC<Route> = ({ pts, at, dur, color = COLORS.accent, width = 7, outAt }) => {
  const frame = useCurrentFrame();
  const len = routeLength(pts);
  const p = ramp(frame, at, at + dur, 0, 1, EASINGS.easeInOut);
  return (
    <svg width={1920} height={1080} style={{ position: 'absolute', inset: 0, opacity: outAt === undefined ? 1 : showBetween(frame, 0, outAt) }}>
      <polyline points={pts.map((q) => q.join(',')).join(' ')} fill="none" stroke={color} strokeWidth={width}
        strokeLinecap="round" strokeLinejoin="round" strokeDasharray={len} strokeDashoffset={len * (1 - p)} />
    </svg>
  );
};

/** A town pin with a label. */
export const PlacePin: React.FC<Place> = ({ label, x, y, at, sub, above = false, outAt, hot = false }) => {
  const frame = useCurrentFrame();
  const s = ramp(frame, at, at + 12, 0.3, 1, EASINGS.overshoot);
  const col = hot ? COLORS.accent : COLORS.ink;
  return (
    <div style={{ position: 'absolute', left: x, top: y, opacity: showBetween(frame, at, outAt, 12) }}>
      <div style={{ position: 'absolute', left: -13, top: -13, width: 26, height: 26, borderRadius: '50%', background: col, border: `4px solid ${COLORS.cream}`, transform: `scale(${s})`, boxShadow: '0 3px 10px rgba(26,11,6,0.35)' }} />
      <div style={{ position: 'absolute', left: 0, transform: 'translateX(-50%)', [above ? 'bottom' : 'top']: 26, textAlign: 'center', whiteSpace: 'nowrap' } as React.CSSProperties}>
        <div style={{ fontFamily: FONT_MONO, fontWeight: 700, fontSize: 30, letterSpacing: 3, color: col }}>{label}</div>
        {sub && <div style={{ fontFamily: FONT_BODY, fontStyle: 'italic', fontSize: 26, color: COLORS.muted }}>{sub}</div>}
      </div>
    </div>
  );
};

/** Compass + "WEST / EAST" hint, bottom-left. */
export const Compass: React.FC<{ at?: number }> = ({ at = 0 }) => {
  const frame = useCurrentFrame();
  return (
    <div style={{ position: 'absolute', left: 90, bottom: 70, opacity: ramp(frame, at, at + 16) * 0.8, fontFamily: FONT_MONO, fontSize: 22, letterSpacing: 4, color: COLORS.muted }}>
      ← WEST · EAST →
    </div>
  );
};

/** A big map label badge (distance, "STOPPED", etc.) positioned in px. */
export const MapBadge: React.FC<{ text: string; x: number; y: number; at: number; outAt?: number; color?: string; size?: number; rotate?: number; stamp?: boolean }> = ({ text, x, y, at, outAt, color = COLORS.accent, size = 40, rotate = 0, stamp = false }) => {
  const frame = useCurrentFrame();
  const sc = stamp ? ramp(frame, at, at + 8, 1.7, 1, EASINGS.easeOut) : ramp(frame, at, at + 14, 0.9, 1);
  return (
    <div style={{
      position: 'absolute', left: x, top: y, transform: `translate(-50%, -50%) rotate(${rotate}deg) scale(${sc})`, opacity: showBetween(frame, at, outAt, stamp ? 4 : 14),
      fontFamily: stamp ? FONT_DISPLAY : FONT_MONO, fontWeight: stamp ? 900 : 700, fontSize: size, letterSpacing: stamp ? 6 : 3, color, whiteSpace: 'nowrap',
      border: stamp ? `7px solid ${color}` : 'none', padding: stamp ? '2px 26px' : 0, borderRadius: 8, background: stamp ? 'rgba(245,232,204,0.6)' : 'transparent',
    }}>{text}</div>
  );
};

/** Moving dot along a route (by fraction p). */
export const RouteRider: React.FC<{ pts: Pt[]; p: number; at: number; outAt?: number; color?: string }> = ({ pts, p, at, outAt, color = COLORS.danger }) => {
  const frame = useCurrentFrame();
  const [x, y] = routePoint(pts, p);
  return <div style={{ position: 'absolute', left: x - 15, top: y - 15, width: 30, height: 30, borderRadius: '50%', background: color, border: `5px solid ${COLORS.cream}`, boxShadow: '0 4px 14px rgba(26,11,6,0.45)', opacity: showBetween(frame, at, outAt, 10) }} />;
};

/** Dashed border line (territory boundary) with labels on each side. */
export const Boundary: React.FC<{ x: number; at: number; left?: string; right?: string; rightAt?: number; rightSub?: string; rightSubAt?: number }> = ({ x, at, left, right, rightAt, rightSub, rightSubAt }) => {
  const frame = useCurrentFrame();
  const p = ramp(frame, at, at + 20, 0, 1, EASINGS.easeInOut);
  const lbl = (o: number): React.CSSProperties => ({ position: 'absolute', top: 120, opacity: o, fontFamily: FONT_MONO, fontWeight: 700, fontSize: 28, letterSpacing: 5, color: COLORS.muted, whiteSpace: 'nowrap' });
  return (
    <AbsoluteFill>
      <svg width={1920} height={1080}>
        <line x1={x} y1={90} x2={x} y2={90 + 900 * p} stroke={COLORS.muted} strokeWidth={3} strokeDasharray="14 12" opacity={0.7} />
      </svg>
      {left && <div style={{ ...lbl(ramp(frame, at + 6, at + 20)), right: 1920 - x + 26 }}>{left}</div>}
      {right && <div style={{ ...lbl(ramp(frame, rightAt ?? at + 6, (rightAt ?? at + 6) + 14)), left: x + 26 }}>{right}</div>}
      {rightSub && <div style={{ position: 'absolute', top: 162, left: x + 26, opacity: ramp(frame, rightSubAt ?? at, (rightSubAt ?? at) + 14), fontFamily: FONT_BODY, fontStyle: 'italic', fontSize: 30, color: COLORS.accent }}>{rightSub}</div>}
    </AbsoluteFill>
  );
};

// ---- the Sierra crossing geography (Snowshoe Thompson; reusable for any Sierra story) ----
export const SIERRA = {
  sacramento: [330, 650] as Pt,
  placerville: [700, 575] as Pt,
  tahoe: [1290, 400] as Pt,
  genoa: [1450, 600] as Pt,
  carson: [1470, 660] as Pt,
  border: 1340,
  range: { x0: 880, x1: 1300, y: 560 },
  // Placerville -> over the crest -> Carson Valley (~90 miles)
  crossing: [[700, 575], [800, 540], [920, 500], [1040, 470], [1160, 500], [1280, 560], [1470, 660]] as Pt[],
  // Sacramento -> Placerville (~45 miles)
  valley: [[330, 650], [440, 625], [570, 610], [700, 575]] as Pt[],
};

/** Sierra lake outline (Tahoe). */
export const Lake: React.FC<{ x: number; y: number; at: number; label?: string }> = ({ x, y, at, label }) => {
  const frame = useCurrentFrame();
  return (
    <div style={{ position: 'absolute', left: x, top: y, opacity: ramp(frame, at, at + 14) }}>
      <div style={{ position: 'absolute', left: -34, top: -58, width: 68, height: 116, borderRadius: '50%', background: 'rgba(94,115,68,0.18)', border: `3px solid ${COLORS.muted}` }} />
      {label && <div style={{ position: 'absolute', left: 50, top: -16, fontFamily: FONT_BODY, fontStyle: 'italic', fontSize: 28, color: COLORS.muted, whiteSpace: 'nowrap' }}>{label}</div>}
    </div>
  );
};
