import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Card, Icon, theme } from '../design-system';

export interface ChoiceScreenProps {
  onStartFromBeginning: () => void;
  onTakeAssessment: () => void;
}

export function ChoiceScreen({ onStartFromBeginning, onTakeAssessment }: ChoiceScreenProps) {
  return (
    <View style={styles.root}>
      <Text style={[theme.type.displayMd, { color: theme.color.ink800 }]}>How should we start?</Text>
      <Text style={[theme.type.bodyMd, styles.subtitle]}>
        We'll build your roadmap either way — this just decides your starting point.
      </Text>

      <Card interactive onPress={onTakeAssessment}>
        <View style={styles.optionRow}>
          <Icon name="clipboard" size={30} color={theme.color.aqua600} />
          <View style={styles.optionText}>
            <Text style={[theme.type.bodyLg, { color: theme.color.ink800 }]}>Take a quick assessment</Text>
            <Text style={[theme.type.bodySm, { color: theme.color.ink400 }]}>
              5 questions · places you at the right level
            </Text>
          </View>
        </View>
      </Card>

      <Card interactive onPress={onStartFromBeginning}>
        <View style={styles.optionRow}>
          <Icon name="wave" size={30} color={theme.color.blue600} />
          <View style={styles.optionText}>
            <Text style={[theme.type.bodyLg, { color: theme.color.ink800 }]}>Start from the beginning</Text>
            <Text style={[theme.type.bodySm, { color: theme.color.ink400 }]}>
              Begin with Water Confidence fundamentals
            </Text>
          </View>
        </View>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, padding: theme.space[6], paddingTop: theme.space[12], gap: theme.space[5] },
  subtitle: { color: theme.color.ink600, marginBottom: theme.space[2] },
  optionRow: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  optionText: { flex: 1, gap: 2 },
});
