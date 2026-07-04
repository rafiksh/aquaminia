import React from 'react';
import { StyleSheet, View, useWindowDimensions } from 'react-native';
import { theme } from '../tokens';

const WIDE_BREAKPOINT = 768;
const CARD_MAX_WIDTH = 620;

/**
 * Wraps full-screen-takeover content (the Lesson flow): edge-to-edge on
 * phones, a centered scrim-backed card on wide viewports — mirrors
 * OnboardingLayout's breakpoint so every full-screen surface in the app
 * follows one responsive rule instead of each screen inventing its own.
 */
export function ModalCardLayout({ children }: { children: React.ReactNode }) {
  const { width, height } = useWindowDimensions();
  const isWide = width >= WIDE_BREAKPOINT;

  if (!isWide) {
    return <View style={styles.fullBleed}>{children}</View>;
  }

  return (
    <View style={styles.scrim}>
      <View style={[styles.card, { width: CARD_MAX_WIDTH, height: height * 0.85 }]}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  fullBleed: { flex: 1 },
  scrim: {
    flex: 1,
    backgroundColor: theme.color.scrim,
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.space[8],
  },
  card: { borderRadius: theme.radius.xl, overflow: 'hidden', ...theme.shadowFloat },
});
