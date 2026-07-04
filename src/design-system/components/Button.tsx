import React from 'react';
import { Animated, Pressable, StyleSheet, Text, type StyleProp, type ViewStyle } from 'react-native';
import { theme } from '../tokens';
import { usePressDepth } from '../usePressDepth';

export type ButtonTone = 'primary' | 'secondary' | 'success' | 'danger' | 'neutral';
export type ButtonSize = 'sm' | 'md' | 'lg';

const TONES: Record<ButtonTone, { bg: string; edge: string; fg: string }> = {
  primary: { bg: theme.color.aqua500, edge: theme.color.aqua600, fg: theme.color.white },
  secondary: { bg: theme.color.blue500, edge: theme.color.blue600, fg: theme.color.white },
  success: { bg: theme.color.success500, edge: theme.color.success600, fg: theme.color.white },
  danger: { bg: theme.color.coral500, edge: theme.color.coral600, fg: theme.color.white },
  neutral: { bg: theme.color.white, edge: theme.color.borderStrong, fg: theme.color.ink800 },
};

const SIZES: Record<ButtonSize, { paddingV: number; paddingH: number; fontSize: number; depth: number; radius: number }> = {
  sm: { paddingV: 10, paddingH: 18, fontSize: 14, depth: theme.depth.sm, radius: theme.radius.md },
  md: { paddingV: 14, paddingH: 24, fontSize: 16, depth: theme.depth.sm + 1, radius: theme.radius.lg },
  lg: { paddingV: 17, paddingH: 32, fontSize: 18, depth: theme.depth.md, radius: theme.radius.lg },
};

export interface ButtonProps {
  children: React.ReactNode;
  tone?: ButtonTone;
  size?: ButtonSize;
  disabled?: boolean;
  fullWidth?: boolean;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}

export function Button({
  children,
  tone = 'primary',
  size = 'md',
  disabled = false,
  fullWidth = false,
  onPress,
  style,
  testID,
}: ButtonProps) {
  const t = TONES[tone];
  const s = SIZES[size];
  const { onPressIn, onPressOut, borderBottomWidth, animatedStyle } = usePressDepth(s.depth, disabled);

  const bg = disabled ? theme.color.disabledBg : t.bg;
  const edge = disabled ? theme.color.disabledEdge : t.edge;
  const fg = disabled ? theme.color.disabledFg : t.fg;

  return (
    <Animated.View style={[fullWidth && styles.fullWidth, animatedStyle, style]}>
      <Pressable
        testID={testID}
        accessibilityRole="button"
        accessibilityState={{ disabled }}
        disabled={disabled}
        onPress={onPress}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        style={[
          styles.base,
          {
            paddingVertical: s.paddingV,
            paddingHorizontal: s.paddingH,
            backgroundColor: bg,
            borderRadius: s.radius,
            borderBottomWidth,
            borderBottomColor: edge,
          },
        ]}
      >
        {typeof children === 'string' ? (
          <Text style={[styles.label, { fontSize: s.fontSize, color: fg }]}>{children}</Text>
        ) : (
          children
        )}
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  label: {
    fontFamily: theme.font.displayBold,
    letterSpacing: 0.3,
    textAlign: 'center',
  },
  fullWidth: {
    width: '100%',
  },
});
