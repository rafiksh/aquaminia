import React from 'react';
import { StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';
import { theme } from '../tokens';

const BUBBLES: { top: string; left: string; size: number }[] = [
  { top: '6%', left: '10%', size: 6 },
  { top: '3%', left: '78%', size: 4 },
  { top: '14%', left: '46%', size: 5 },
  { top: '24%', left: '90%', size: 4 },
  { top: '32%', left: '18%', size: 6 },
  { top: '42%', left: '62%', size: 4 },
  { top: '55%', left: '8%', size: 5 },
  { top: '63%', left: '85%', size: 4 },
  { top: '74%', left: '38%', size: 6 },
  { top: '86%', left: '70%', size: 4 },
  { top: '92%', left: '20%', size: 5 },
];

/**
 * Decorative faint-bubble texture used behind onboarding and app-shell
 * backgrounds — the app's one recurring background motif, defined once
 * here instead of redrawn per screen.
 */
export function BubbleBackdrop({ style }: { style?: StyleProp<ViewStyle> }) {
  return (
    <View style={[StyleSheet.absoluteFill, { pointerEvents: 'none' }, style]}>
      {BUBBLES.map((b, i) => (
        <View
          key={i}
          style={{
            position: 'absolute',
            top: b.top as any,
            left: b.left as any,
            width: b.size,
            height: b.size,
            borderRadius: b.size / 2,
            backgroundColor: 'rgba(255,255,255,0.55)',
          }}
        />
      ))}
    </View>
  );
}

export const bgSurfaceStyle: ViewStyle = { backgroundColor: theme.color.bg };
