import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button, theme } from '../design-system';

export interface DisclaimerScreenProps {
  onContinue: () => void;
}

export function DisclaimerScreen({ onContinue }: DisclaimerScreenProps) {
  return (
    <View style={styles.root}>
      <View style={styles.center}>
        <Text style={[theme.type.displayLg, { color: theme.color.ink800 }]}>Aquamania</Text>
        <Text style={[theme.type.bodyMd, styles.body]}>
          Swimming involves physical risk. Practice in a safe pool environment and use appropriate supervision. This
          app is a learning guide and is not a substitute for professional instruction.
        </Text>
      </View>
      <Button tone="primary" size="lg" fullWidth onPress={onContinue}>
        I understand
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, padding: theme.space[6], paddingTop: theme.space[12], justifyContent: 'space-between' },
  center: { flex: 1, justifyContent: 'center', gap: theme.space[5] },
  body: { color: theme.color.ink600, lineHeight: 24 },
});
