/**
 * Aquamania — Color tokens.
 * Ported 1:1 from the source design system's tokens/colors.css.
 * Every action color has a "600" darker twin used as the bottom "depth" edge
 * of raised 3D buttons/cards.
 */
export const colors = {
  // Brand — Aqua (primary)
  aqua100: '#E1F8F6',
  aqua300: '#7DE0D6',
  aqua500: '#00C4B3',
  aqua600: '#00A190',
  aqua700: '#007F72',

  // Brand — Pool Blue (secondary / water)
  blue100: '#E3F4FE',
  blue300: '#7ED2FA',
  blue500: '#1CB0F6',
  blue600: '#0D8FD6',
  blue700: '#0A6FAA',

  // Gold — XP / streaks / gems
  gold100: '#FFF6DA',
  gold300: '#FFDD6B',
  gold500: '#FFC800',
  gold600: '#E5A600',
  gold700: '#B98200',

  // Coral — hearts / energy / errors
  coral100: '#FFE5E3',
  coral300: '#FF9B94',
  coral500: '#FF4B4B',
  coral600: '#E63E3E',
  coral700: '#C22E2E',

  // Grape — gems / premium
  grape100: '#F1E4FE',
  grape300: '#CB9AF7',
  grape500: '#A560F5',
  grape600: '#8B3FE0',
  grape700: '#6E2CB8',

  // Success — lesson complete / correct
  success100: '#E4F9D9',
  success300: '#A6E67A',
  success500: '#58CC02',
  success600: '#46A302',
  success700: '#357B01',

  // Ink / neutrals — deep navy-teal, never pure black
  ink900: '#10222C',
  ink800: '#1B3A4B',
  ink600: '#3E5C68',
  ink400: '#6B8B99',
  ink200: '#A9C2CB',

  // Surfaces
  bg: '#EAF7FA',
  bgAlt: '#DCF0F5',
  surface: '#FFFFFF',
  surfaceSunken: '#F2FBFC',
  border: '#D3EAEE',
  borderStrong: '#B9DDE3',

  // Disabled state (flat desaturated grays — never a dimmed brand color)
  disabledBg: '#C9DCE1',
  disabledEdge: '#AEC7CD',
  disabledFg: '#A9C2CB',

  // Locked lesson-node state on the roadmap (distinct from generic disabled)
  lockedNodeBg: '#D9E7EA',
  lockedNodeEdge: '#C2D5D9',

  white: '#FFFFFF',

  // Overlay scrim behind Dialog and ModalCardLayout
  scrim: 'rgba(16, 34, 44, 0.45)',
} as const;

export const semanticColors = {
  primary: colors.aqua500,
  primaryDeep: colors.aqua600,
  secondary: colors.blue500,
  secondaryDeep: colors.blue600,
  text: colors.ink800,
  textMuted: colors.ink400,
  textOnColor: colors.white,
  danger: colors.coral500,
  dangerDeep: colors.coral600,
  warning: colors.gold500,
  success: colors.success500,
  successDeep: colors.success600,
} as const;

export type ColorToken = keyof typeof colors;
