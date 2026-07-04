import React from 'react';
import { Image, type ImageStyle, type StyleProp } from 'react-native';
import { UI_ICONS, type UiIconName } from '../../data/uiIcons';
import { theme } from '../tokens';

export interface IconProps {
  name: UiIconName;
  size?: number;
  color?: string;
  style?: StyleProp<ImageStyle>;
}

/**
 * Solid single-color UI glyph (close, lock, star, etc.), recolored via
 * `tintColor` since the source art is a black silhouette on transparent.
 */
export function Icon({ name, size = 20, color = theme.color.ink800, style }: IconProps) {
  return (
    <Image
      source={UI_ICONS[name]}
      resizeMode="contain"
      style={[{ width: size, height: size, tintColor: color }, style]}
    />
  );
}
