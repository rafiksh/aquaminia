/**
 * Aquamania — Spacing & radius tokens. 4px base unit.
 * Chunky, generous radii — nothing sharp, nothing pill-only.
 */
export const space = {
  1: 4,
  2: 8,
  3: 12,
  4: 16,
  5: 20,
  6: 24,
  8: 32,
  10: 40,
  12: 48,
  16: 64,
  20: 80,
} as const;

export const radius = {
  sm: 10,
  md: 16,
  lg: 24,
  xl: 32,
  pill: 999,
} as const;

export const stroke = {
  thin: 2,
  thick: 3,
} as const;
