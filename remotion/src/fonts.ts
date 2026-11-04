// Brand 3-font system, loaded from Google Fonts (bundled by Remotion at render time).
// Nothing to install — swap a family here and every shot follows. `/brand-setup` rewrites
// this file alongside brand.ts and brand.md; keep all three in sync if you edit by hand.
import { loadFont as loadDisplay } from '@remotion/google-fonts/Rokkitt';
import { loadFont as loadBody } from '@remotion/google-fonts/Lora';
import { loadFont as loadMono } from '@remotion/google-fonts/CourierPrime';
import { loadFont as loadSerif } from '@remotion/google-fonts/Spectral';

// Rokkitt: 19th-century 'Egyptian' slab serif, full weight range (wood-type Rye/Smokum are 400-only).
export const FONT_DISPLAY = loadDisplay('normal', { weights: ['500', '600', '700', '800', '900'], subsets: ['latin'] }).fontFamily;
export const FONT_BODY = loadBody('normal', { weights: ['400', '500', '600', '700'], subsets: ['latin'] }).fontFamily;
// Courier Prime: typewriter mono for telegrams, transcripts and records (ships 400/700 only).
export const FONT_MONO = loadMono('normal', { weights: ['400', '700'], subsets: ['latin'] }).fontFamily;
// serif for the Claude Code wordmark clone (close match to the app's serif) — not a brand font
export const FONT_SERIF = loadSerif('normal', { weights: ['500', '600'], subsets: ['latin'] }).fontFamily;
