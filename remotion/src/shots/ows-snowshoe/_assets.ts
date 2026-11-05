// Image map for ows-snowshoe (files in media/projects/ows-snowshoe/web/, git-ignored, local only).
// AI = Gemini illustration -> must carry the ILLUSTRATION tag (channel rule, set on ows-1).
import { staticFile } from 'remotion';

const w = (n: string) => staticFile(`projects/ows-snowshoe/web/${n}.jpg`);

export const IMG = {
  skiSide: w('2005_6607_1-side-00'), // real: painted long ski, side detail (1200x797)
  skiTips: w('2005_6607_1-tips'), // real: pair of long ski tips (1000x500)
  archSkier: w('d1_3-lg'), // real archival: skier with a single pole + pack (393x450). NOT identified as Thompson
  grave: w('grave-stone'), // real: Thompson's gravestone, skis carved, Genoa (248x346)
  portrait: w('snowshoe-thompson-g-03-212'), // real: tinted portrait of Thompson (400x508)
  camp: w('gemini_generated_image_a6r01va6r01va6r0'), // AI: gold rush camp
  capitol: w('gemini_generated_image_db9pmqdb9pmqdb9p'), // AI: US Capitol
  postOffice: w('post-office'), // AI: frontier post office, no telegraph poles (creator swap 2026-11-05; replaces i9p769...)
  snowshoes: w('gemini_generated_image_ltzxxiltzxxiltzx'), // AI: woven snowshoes
  sierra: w('gemini_generated_image_ngy89ongy89ongy8'), // AI: snowy Sierra range (color)
  climb: w('gemini_generated_image_qgswtkqgswtkqgsw'), // AI: skier climbing with pack + pole (portrait)
  sled: w('gemini_generated_image_tv29b5tv29b5tv29'), // AI: men hauling a man on a sled (portrait)
  cabin: w('gemini_generated_image_yv9syyv9syyv9syy'), // AI: skier at a snowed-in cabin (portrait)
};

/** Pull the vivid color Sierra photo into the period palette. */
export const SIERRA_GRADE = 'sepia(0.45) saturate(0.75) brightness(0.9) contrast(1.05)';
