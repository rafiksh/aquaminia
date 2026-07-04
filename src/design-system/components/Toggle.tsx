import React, { useEffect, useRef } from 'react';
import { Animated, Pressable, StyleSheet } from 'react-native';
import { theme } from '../tokens';

export interface ToggleProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
}

export function Toggle({ checked = false, onChange, disabled = false }: ToggleProps) {
  const knobX = useRef(new Animated.Value(checked ? 25 : 3)).current;

  useEffect(() => {
    Animated.timing(knobX, {
      toValue: checked ? 25 : 3,
      duration: theme.duration.med,
      easing: theme.ease.bounce,
      useNativeDriver: false,
    }).start();
  }, [checked, knobX]);

  return (
    <Pressable
      accessibilityRole="switch"
      accessibilityState={{ checked, disabled }}
      disabled={disabled}
      onPress={() => onChange?.(!checked)}
      style={[
        styles.track,
        {
          backgroundColor: disabled ? theme.color.disabledBg : checked ? theme.color.success500 : theme.color.borderStrong,
        },
      ]}
    >
      <Animated.View style={[styles.knob, { left: knobX }]} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  track: {
    width: 52,
    height: 30,
    borderRadius: theme.radius.pill,
    justifyContent: 'center',
  },
  knob: {
    position: 'absolute',
    top: 3,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: theme.color.white,
    ...theme.shadowSoft,
  },
});
