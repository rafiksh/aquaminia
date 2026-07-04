import type { ImageSourcePropType } from 'react-native';

/**
 * Illustrated badge art per lesson, keyed by lesson id. Metro requires
 * static string literals for `require`, so this map can't be generated —
 * lessons without art yet (e.g. flutter-kick) are simply absent, and
 * callers fall back to the lesson's emoji glyph.
 */
export const LESSON_ICONS: Partial<Record<string, ImageSourcePropType>> = {
  enter: require('../../assets/icons/lessons/enter.png'),
  face: require('../../assets/icons/lessons/face.png'),
  bubbles: require('../../assets/icons/lessons/bubbles.png'),
  bobbing: require('../../assets/icons/lessons/bobbing.png'),
  'front-float': require('../../assets/icons/lessons/front-float.png'),
  'back-float': require('../../assets/icons/lessons/back-float.png'),
  starfish: require('../../assets/icons/lessons/starfish.png'),
  'roll-recover': require('../../assets/icons/lessons/roll-recover.png'),
  streamline: require('../../assets/icons/lessons/streamline.png'),
  'wall-push': require('../../assets/icons/lessons/wall-push.png'),
  'flutter-kick': require('../../assets/icons/lessons/flutter-kick.png'),
  'back-kick': require('../../assets/icons/lessons/back-kick.png'),
};
