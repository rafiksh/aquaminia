import React from 'react';
import { Animated, Pressable, StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';
import { theme } from '../tokens';
import { usePressDepth } from '../usePressDepth';

export interface CardProps {
  children: React.ReactNode;
  padding?: number;
  onPress?: () => void;
  interactive?: boolean;
  style?: StyleProp<ViewStyle>;
}

export function Card({ children, padding = theme.space[5], onPress, interactive = false, style }: CardProps) {
  const { onPressIn, onPressOut, borderBottomWidth, animatedStyle } = usePressDepth(5, !interactive);

  const content = (
    <View
      style={[
        styles.base,
        {
          padding,
          borderBottomWidth: interactive ? borderBottomWidth : 5,
          borderBottomColor: theme.color.borderStrong,
        },
        style,
      ]}
    >
      {children}
    </View>
  );

  if (!interactive) return content;

  return (
    <Animated.View style={animatedStyle}>
      <Pressable accessibilityRole="button" onPress={onPress} onPressIn={onPressIn} onPressOut={onPressOut}>
        {content}
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  base: {
    backgroundColor: theme.color.surface,
    borderRadius: theme.radius.lg,
    borderWidth: 2,
    borderColor: theme.color.border,
  },
});
