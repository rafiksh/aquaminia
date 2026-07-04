import { useCallback, useRef, useState } from 'react';
import { Animated } from 'react-native';
import { duration, easeSnap } from './tokens/effects';

/**
 * Aquamania's signature "depth edge" press interaction: a raised surface
 * (Button, IconButton, Card) has a solid darker border-bottom standing in
 * for a 3D edge. On press the edge thins and the surface shifts down — a
 * physical "push" rather than an opacity/color change.
 *
 * Centralized here so every raised component shares one implementation
 * instead of re-deriving the press animation per component.
 */
export function usePressDepth(depthPx: number, disabled = false) {
  const [pressed, setPressed] = useState(false);
  const translateY = useRef(new Animated.Value(0)).current;

  const animateTo = useCallback(
    (toValue: number) => {
      Animated.timing(translateY, {
        toValue,
        duration: duration.fast,
        easing: easeSnap,
        useNativeDriver: true,
      }).start();
    },
    [translateY]
  );

  const onPressIn = useCallback(() => {
    if (disabled) return;
    setPressed(true);
    animateTo(depthPx - 2);
  }, [disabled, depthPx, animateTo]);

  const onPressOut = useCallback(() => {
    setPressed(false);
    animateTo(0);
  }, [animateTo]);

  return {
    pressed,
    onPressIn,
    onPressOut,
    borderBottomWidth: pressed ? 2 : depthPx,
    animatedStyle: { transform: [{ translateY }] },
  };
}
