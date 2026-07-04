import React, { useState } from 'react';
import { Platform, StyleSheet, Text, TextInput, View, type KeyboardTypeOptions } from 'react-native';
import { theme } from '../tokens';

// Focus ring is a web-native affordance (glow around the field). On
// touch platforms the border-color swap alone communicates focus, matching
// the source system's "no glassmorphism" rule.
const focusRingStyle = Platform.OS === 'web' ? { boxShadow: `0 0 0 4px ${theme.focusRingColor}` } : null;

export interface InputProps {
  label?: string;
  placeholder?: string;
  value?: string;
  onChangeText?: (value: string) => void;
  secureTextEntry?: boolean;
  keyboardType?: KeyboardTypeOptions;
  error?: string;
}

export function Input({ label, placeholder, value, onChangeText, secureTextEntry, keyboardType, error }: InputProps) {
  const [focused, setFocused] = useState(false);
  const borderColor = error ? theme.color.coral500 : focused ? theme.color.aqua500 : theme.color.border;

  return (
    <View style={styles.wrap}>
      {label ? <Text style={[theme.type.labelCaps, { color: theme.color.ink600 }]}>{label}</Text> : null}
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={theme.color.ink200}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={[
          styles.input,
          theme.type.bodyMd,
          {
            color: theme.color.ink800,
            borderColor,
          },
          focused ? focusRingStyle : null,
        ]}
      />
      {error ? <Text style={[theme.type.bodySm, { color: theme.color.coral600 }]}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { flexDirection: 'column', gap: 6, width: '100%' },
  input: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: theme.radius.md,
    borderWidth: 2,
    backgroundColor: theme.color.surface,
  },
});
