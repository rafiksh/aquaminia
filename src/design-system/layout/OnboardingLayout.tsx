import React from 'react';
import { StyleSheet, View, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme } from '../tokens';
import { BubbleBackdrop } from '../components/BubbleBackdrop';

const WIDE_BREAKPOINT = 768;
const CARD_MAX_WIDTH = 460;
const CARD_MAX_HEIGHT = 760;

/**
 * Shared wrapper for the pre-app onboarding flow (Disclaimer, Choice,
 * Assessment): full-bleed on phone-sized viewports, a floating centered
 * card on wide (tablet/desktop web) viewports. One layout definition
 * consumed by all three screens instead of each re-implementing it.
 */
export function OnboardingLayout({ children }: { children: React.ReactNode }) {
  const { width, height } = useWindowDimensions();
  const isWide = width >= WIDE_BREAKPOINT;

  return (
    <View style={[styles.wrap, isWide && styles.wrapCentered]}>
      <BubbleBackdrop />
      <SafeAreaView
        style={[
          styles.card,
          isWide && {
            width: CARD_MAX_WIDTH,
            height: Math.min(CARD_MAX_HEIGHT, height - 80),
            borderRadius: theme.radius.xl,
            ...theme.shadowFloat,
          },
        ]}
      >
        {children}
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    backgroundColor: theme.color.bg,
  },
  wrapCentered: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    flex: 1,
    width: '100%',
    overflow: 'hidden',
  },
});
