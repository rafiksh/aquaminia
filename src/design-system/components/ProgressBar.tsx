import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import { theme } from '../tokens';

export type ProgressBarTone = 'primary' | 'gold' | 'success';

const TONES: Record<ProgressBarTone, { bg: string; edge: string }> = {
  primary: { bg: theme.color.aqua500, edge: theme.color.aqua600 },
  gold: { bg: theme.color.gold500, edge: theme.color.gold600 },
  success: { bg: theme.color.success500, edge: theme.color.success600 },
};

export interface ProgressBarProps {
  value?: number;
  max?: number;
  tone?: ProgressBarTone;
  height?: number;
  showLabel?: boolean;
}

export function ProgressBar({ value = 0, max = 100, tone = 'primary', height = 20, showLabel = false }: ProgressBarProps) {
  const pct = Math.max(0, Math.min(100, (value / max) * 100));
  const c = TONES[tone];
  const widthAnim = useRef(new Animated.Value(pct)).current;

  useEffect(() => {
    Animated.timing(widthAnim, {
      toValue: pct,
      duration: theme.duration.slow,
      easing: theme.ease.bounce,
      useNativeDriver: false,
    }).start();
  }, [pct, widthAnim]);

  return (
    <View style={styles.row}>
      <View style={[styles.track, { height, borderRadius: theme.radius.pill }]}>
        <Animated.View
          style={[
            styles.fill,
            {
              width: widthAnim.interpolate({ inputRange: [0, 100], outputRange: ['0%', '100%'] }),
              backgroundColor: c.bg,
              borderBottomColor: c.edge,
              borderRadius: theme.radius.pill,
            },
          ]}
        />
      </View>
      {showLabel ? <Text style={[theme.type.caption, styles.label]}>{Math.round(pct)}%</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  track: {
    flex: 1,
    backgroundColor: theme.color.bgAlt,
    borderWidth: 2,
    borderColor: theme.color.border,
    overflow: 'hidden',
  },
  fill: { height: '100%', borderBottomWidth: 3 },
  label: { color: theme.color.ink600, minWidth: 36, textAlign: 'right' },
});
