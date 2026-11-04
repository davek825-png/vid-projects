// Video brand tokens (see /brand.md). Import these in every shot
// so all videos stay consistent; change a value here and every shot updates.
//
// Brand: Old West Stories — parchment, espresso and sunset rust; slow, suspenseful motion.
// Written by `/brand-setup` together with /brand.md and fonts.ts — keep all three in sync.
import { Easing } from 'remotion';

// Channel identity. Any shot that puts your name on screen reads it from here,
// so one edit re-brands every video you have ever made in this repo.
export const BRAND = {
  // The wordmark, split in three so the MIDDLE part renders in the accent color.
  // Shots join the parts with no gap, so the spaces live inside the strings.
  wordmark: ['Old ', 'West', ' Stories'] as readonly string[],
  signoff: "We'll see ya again in the next story.",
} as const;

// Old West Stories — sunset-over-the-frontier palette, sampled from the channel banner.
// Light base = aged parchment (wanted poster / period newspaper); dark scale = espresso night.
export const COLORS = {
  // roles
  accent: '#9E431B', // terracotta / rust — primary (large text only: 4.4:1 on paper)
  accent2: '#D37B2B', // frontier ochre — secondary; FILLS/GRADIENT ONLY, never text on paper (2.2:1)
  signal: '#5E7344', // sage — success / positive (large text only on paper)
  signalAlt: '#7D8F5A', // light sage companion
  warn: '#F7BD6A', // sunset gold — attention / highlight sweeps (ink on gold 10.4:1)
  danger: '#6E1E12', // blood crimson — danger / death / outlaw
  ink: '#2B120B', // frontier espresso — primary text on light
  muted: '#6B4A33', // saddle brown — secondary text
  paper: '#ECD3A4', // parchment — light surface / bg
  cream: '#F5E8CC', // light parchment — alt band / cards
  line: '#D4B784', // worn tan — 1px borders on light
  // dark scale (night scenes, dark panels, telegraph/record mockups) — espresso
  d900: '#1A0B06',
  d800: '#2B120B',
  d600: '#4A2111', // burnished scroll bronze
  d400: '#A08A73',
  d300: '#E3D3B8',
} as const;

// signature gradient: the banner sunset — rust -> ochre -> sunset gold
export const GRADIENT = `linear-gradient(120deg, ${COLORS.accent}, ${COLORS.accent2}, ${COLORS.warn})`;

export const RADIUS = { card: 8, panel: 8, window: 6, pill: 999 } as const;

export const SHADOW = {
  soft: '0 8px 32px rgba(43,18,11,0.18)',
  card: '0 10px 40px rgba(43,18,11,0.14)',
} as const;

// Slow, deliberate, suspenseful easings. Long settling tails; overshoot is barely there.
// Use these — never Easing.out(...) wrappers.
export const EASINGS = {
  easeOut: Easing.bezier(0.22, 1, 0.36, 1),
  easeIn: Easing.bezier(0.55, 0, 0.78, 0),
  easeInOut: Easing.bezier(0.45, 0, 0.55, 1),
  overshoot: Easing.bezier(0.3, 1.12, 0.6, 1), // a hint of settle, never a bounce
} as const;
