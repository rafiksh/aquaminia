import React from 'react';
import { StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';

const MAX_WIDTH = 520;

/**
 * Caps content width and centers it on wide (tablet/desktop web) viewports
 * while staying full-bleed on phones — the same column width the source
 * system uses for its main app-shell content.
 */
export function ContentBounds({ children, style }: { children: React.ReactNode; style?: StyleProp<ViewStyle> }) {
  return <View style={[styles.wrap, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  wrap: { width: '100%', maxWidth: MAX_WIDTH, alignSelf: 'center' },
});
