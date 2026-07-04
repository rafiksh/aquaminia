import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { theme } from '../tokens';
import { Icon } from './Icon';

export interface CheckboxProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  label?: string;
}

export function Checkbox({ checked = false, onChange, label }: CheckboxProps) {
  return (
    <Pressable
      accessibilityRole="checkbox"
      accessibilityState={{ checked }}
      onPress={() => onChange?.(!checked)}
      style={styles.row}
    >
      <View
        style={[
          styles.box,
          {
            backgroundColor: checked ? theme.color.aqua500 : theme.color.surface,
            borderColor: checked ? theme.color.aqua600 : theme.color.borderStrong,
          },
        ]}
      >
        {checked ? <Icon name="check" size={15} color={theme.color.white} /> : null}
      </View>
      {label ? <Text style={[theme.type.bodyMd, { color: theme.color.ink800 }]}>{label}</Text> : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  box: {
    width: 26,
    height: 26,
    borderRadius: 8,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
