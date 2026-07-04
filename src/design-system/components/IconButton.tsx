import React from 'react';
import { Animated, Pressable, StyleSheet } from 'react-native';
import { theme } from '../tokens';
import { usePressDepth } from '../usePressDepth';
import { Icon } from './Icon';
import type { UiIconName } from '../../data/uiIcons';

export type IconButtonTone = 'primary' | 'neutral' | 'ghost';

const TONES: Record<IconButtonTone, { bg: string; edge: string; fg: string }> = {
  primary: { bg: theme.color.aqua500, edge: theme.color.aqua600, fg: theme.color.white },
  neutral: { bg: theme.color.white, edge: theme.color.borderStrong, fg: theme.color.ink600 },
  ghost: { bg: theme.color.bgAlt, edge: theme.color.border, fg: theme.color.ink600 },
};

export interface IconButtonProps {
  icon: UiIconName;
  tone?: IconButtonTone;
  size?: number;
  onPress?: () => void;
  ariaLabel: string;
}

export function IconButton({ icon, tone = 'neutral', size = 44, onPress, ariaLabel }: IconButtonProps) {
  const t = TONES[tone];
  const depth = theme.depth.sm;
  const { onPressIn, onPressOut, borderBottomWidth, animatedStyle } = usePressDepth(depth);

  return (
    <Animated.View style={animatedStyle}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={ariaLabel}
        onPress={onPress}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        style={[
          styles.base,
          {
            width: size,
            height: size,
            backgroundColor: t.bg,
            borderRadius: theme.radius.md,
            borderBottomWidth,
            borderBottomColor: t.edge,
          },
        ]}
      >
        <Icon name={icon} size={size * 0.45} color={t.fg} />
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
