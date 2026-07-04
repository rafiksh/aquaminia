import { Easing, Platform, type ViewStyle } from 'react-native';

/**
 * Aquamania — Effects tokens.
 * Signature look: raised "3D" buttons/cards with a solid darker-shade depth
 * edge (borderBottomWidth/Color — not a blurred shadow) that compresses on
 * press. Soft ambient shadows are reserved for floating/overlay surfaces
 * (Dialog) only.
 */
export const depth = {
  sm: 4,
  md: 6,
  lg: 8,
} as const;

/** Ambient shadow for floating surfaces (dialogs, sheets) — cross-platform. */
export const shadowFloat: ViewStyle = Platform.select({
  web: { boxShadow: '0 12px 28px rgba(16, 34, 44, 0.16), 0 2px 6px rgba(16, 34, 44, 0.08)' } as ViewStyle,
  android: { elevation: 16 },
  default: {
    shadowColor: '#10222C',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.18,
    shadowRadius: 18,
  },
})!;

/** Small ambient shadow for compact floating elements (e.g. the Toggle knob). */
export const shadowSoft: ViewStyle = Platform.select({
  web: { boxShadow: '0 1px 3px rgba(16, 34, 44, 0.25)' } as ViewStyle,
  android: { elevation: 2 },
  default: {
    shadowColor: '#10222C',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.25,
    shadowRadius: 3,
  },
})!;

export const focusRingColor = 'rgba(28, 176, 246, 0.35)';

export const duration = {
  fast: 120,
  med: 220,
  slow: 420,
} as const;

// Motion — bouncy, snappy, never linear. Duolingo-like pop/settle.
export const easeBounce = Easing.bezier(0.34, 1.56, 0.64, 1);
export const easeSnap = Easing.bezier(0.2, 0.9, 0.3, 1.3);
