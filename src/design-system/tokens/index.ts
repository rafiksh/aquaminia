export * from './colors';
export * from './spacing';
export * from './typography';
export * from './effects';

import { colors, semanticColors } from './colors';
import { space, radius, stroke } from './spacing';
import { type, fontFamilies } from './typography';
import { depth, shadowFloat, shadowSoft, focusRingColor, duration, easeBounce, easeSnap } from './effects';

/**
 * Single import surface for the whole design system. Screens and
 * components should read from `theme.*` (or the named exports) instead of
 * hardcoding colors, spacing, or type — that's the whole point of having a
 * design system instead of copy-pasted style literals.
 */
export const theme = {
  color: { ...colors, ...semanticColors },
  space,
  radius,
  stroke,
  type,
  font: fontFamilies,
  depth,
  shadowFloat,
  shadowSoft,
  focusRingColor,
  duration,
  ease: { bounce: easeBounce, snap: easeSnap },
} as const;

export type Theme = typeof theme;
