import type { ImageSourcePropType } from 'react-native';

export type UiIconName =
  | 'wave'
  | 'clipboard'
  | 'lock'
  | 'check'
  | 'star'
  | 'medal'
  | 'sparkle'
  | 'close'
  | 'person'
  | 'swimmer'
  | 'play'
  | 'party'
  | 'target';

/**
 * Solid single-color glyphs, tinted at render time via <Icon>. Metro
 * requires static string literals for `require`, so this map is written
 * out by hand rather than generated.
 */
export const UI_ICONS: Record<UiIconName, ImageSourcePropType> = {
  wave: require('../../assets/icons/ui/wave.png'),
  clipboard: require('../../assets/icons/ui/clipboard.png'),
  lock: require('../../assets/icons/ui/lock.png'),
  check: require('../../assets/icons/ui/check.png'),
  star: require('../../assets/icons/ui/star.png'),
  medal: require('../../assets/icons/ui/medal.png'),
  sparkle: require('../../assets/icons/ui/sparkle.png'),
  close: require('../../assets/icons/ui/close.png'),
  person: require('../../assets/icons/ui/person.png'),
  swimmer: require('../../assets/icons/ui/swimmer.png'),
  play: require('../../assets/icons/ui/play.png'),
  party: require('../../assets/icons/ui/party.png'),
  target: require('../../assets/icons/ui/target.png'),
};
