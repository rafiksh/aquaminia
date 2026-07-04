import type { TextStyle } from 'react-native';
import {
  Baloo2_500Medium,
  Baloo2_600SemiBold,
  Baloo2_700Bold,
  Baloo2_800ExtraBold,
} from '@expo-google-fonts/baloo-2';
import {
  Nunito_400Regular,
  Nunito_600SemiBold,
  Nunito_700Bold,
  Nunito_800ExtraBold,
  Nunito_900Black,
} from '@expo-google-fonts/nunito';

/**
 * Aquamania — Typography tokens.
 * Display: Baloo 2 (rounded, chunky, game-y — headlines, node labels, big numbers)
 * Body: Nunito (rounded sans, extremely legible at small sizes)
 *
 * Every screen must consume `type.*` scales below rather than setting
 * fontFamily/fontSize/fontWeight ad hoc — that's what keeps the system
 * centralized instead of copy-pasted per screen.
 */
export const fontFamilies = {
  displayMedium: 'Baloo2_500Medium',
  displaySemiBold: 'Baloo2_600SemiBold',
  displayBold: 'Baloo2_700Bold',
  displayExtraBold: 'Baloo2_800ExtraBold',
  bodyRegular: 'Nunito_400Regular',
  bodySemiBold: 'Nunito_600SemiBold',
  bodyBold: 'Nunito_700Bold',
  bodyExtraBold: 'Nunito_800ExtraBold',
  bodyBlack: 'Nunito_900Black',
} as const;

/** Pass straight to useFonts(). */
export const fontsToLoad = {
  Baloo2_500Medium,
  Baloo2_600SemiBold,
  Baloo2_700Bold,
  Baloo2_800ExtraBold,
  Nunito_400Regular,
  Nunito_600SemiBold,
  Nunito_700Bold,
  Nunito_800ExtraBold,
  Nunito_900Black,
};

type TypeScale = Pick<TextStyle, 'fontFamily' | 'fontSize' | 'lineHeight' | 'letterSpacing' | 'textTransform'>;

export const type: Record<
  'displayXl' | 'displayLg' | 'displayMd' | 'displaySm' | 'bodyLg' | 'bodyMd' | 'bodySm' | 'caption' | 'labelCaps',
  TypeScale
> = {
  // Display scale (Baloo 2)
  displayXl: { fontFamily: fontFamilies.displayExtraBold, fontSize: 56, lineHeight: 59 },
  displayLg: { fontFamily: fontFamilies.displayExtraBold, fontSize: 40, lineHeight: 44 },
  displayMd: { fontFamily: fontFamilies.displayBold, fontSize: 28, lineHeight: 32 },
  displaySm: { fontFamily: fontFamilies.displayBold, fontSize: 22, lineHeight: 26 },

  // Body scale (Nunito)
  bodyLg: { fontFamily: fontFamilies.bodyBold, fontSize: 18, lineHeight: 25 },
  bodyMd: { fontFamily: fontFamilies.bodySemiBold, fontSize: 16, lineHeight: 23 },
  bodySm: { fontFamily: fontFamilies.bodySemiBold, fontSize: 14, lineHeight: 20 },
  caption: { fontFamily: fontFamilies.bodyExtraBold, fontSize: 12, lineHeight: 16 },
  labelCaps: {
    fontFamily: fontFamilies.bodyExtraBold,
    fontSize: 13,
    lineHeight: 16,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
};
