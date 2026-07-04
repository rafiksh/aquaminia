import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { theme } from '../tokens';
import { Icon } from './Icon';
import type { UiIconName } from '../../data/uiIcons';

export type BadgeTone = 'gold' | 'aqua' | 'coral' | 'grape' | 'success';

const TONES: Record<BadgeTone, { bg: string; fg: string }> = {
  gold: { bg: theme.color.gold100, fg: theme.color.gold700 },
  aqua: { bg: theme.color.aqua100, fg: theme.color.aqua700 },
  coral: { bg: theme.color.coral100, fg: theme.color.coral700 },
  grape: { bg: theme.color.grape100, fg: theme.color.grape700 },
  success: { bg: theme.color.success100, fg: theme.color.success700 },
};

export interface BadgeProps {
  children: React.ReactNode;
  tone?: BadgeTone;
  icon?: UiIconName;
}

export function Badge({ children, tone = 'gold', icon }: BadgeProps) {
  const t = TONES[tone];
  return (
    <View style={[styles.base, { backgroundColor: t.bg }]}>
      {icon ? <Icon name={icon} size={14} color={t.fg} /> : null}
      <Text style={[theme.type.labelCaps, { color: t.fg }]}>{children}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: theme.radius.pill,
    alignSelf: 'flex-start',
  },
});
