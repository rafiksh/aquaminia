import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Badge, Card, ContentBounds, Icon, ProgressBar, theme } from '../design-system';

export interface ProfileScreenProps {
  xp: number;
  level: number;
  currentPathway: string;
  earnedBadges: string[];
  lockedBadges: string[];
}

export function ProfileScreen({ xp, level, currentPathway, earnedBadges, lockedBadges }: ProfileScreenProps) {
  return (
    <ScrollView style={styles.scroll}>
      <ContentBounds style={styles.content}>
        <View style={styles.identity}>
          <View style={styles.avatar}>
            <Icon name="swimmer" size={32} color={theme.color.white} />
          </View>
          <View>
            <Text style={[theme.type.displaySm, { color: theme.color.ink800 }]}>Jamie</Text>
            <Text style={[theme.type.bodySm, { color: theme.color.ink400 }]}>
              Level {level} · {currentPathway}
            </Text>
          </View>
        </View>

        <Card>
          <Text style={styles.cardLabel}>PROGRESS</Text>
          <View style={styles.progressHeaderRow}>
            <Text style={[theme.type.bodyMd, { color: theme.color.ink800 }]}>Total XP</Text>
            <Badge tone="gold" icon="sparkle">
              {xp} XP
            </Badge>
          </View>
          <ProgressBar value={xp % 100} max={100} tone="gold" showLabel />
        </Card>

        <Card>
          <Text style={styles.cardLabel}>BADGES EARNED</Text>
          <View style={styles.badgeWrap}>
            {earnedBadges.map((b) => (
              <Badge key={b} tone="success" icon="medal">
                {b}
              </Badge>
            ))}
          </View>
        </Card>

        <Card>
          <Text style={styles.cardLabel}>UP NEXT</Text>
          <View style={styles.badgeWrap}>
            {lockedBadges.map((b) => (
              <View key={b} style={styles.lockedBadge}>
                <Icon name="lock" size={12} color={theme.color.ink400} />
                <Text style={[theme.type.labelCaps, { color: theme.color.ink400 }]}>{b}</Text>
              </View>
            ))}
          </View>
        </Card>
      </ContentBounds>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: { flex: 1 },
  content: { padding: theme.space[5], gap: 18 },
  identity: { flexDirection: 'row', alignItems: 'center', gap: 16 },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: theme.color.aqua500,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardLabel: { ...theme.type.labelCaps, color: theme.color.ink400, marginBottom: 10 },
  progressHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  badgeWrap: { flexDirection: 'row', gap: 10, flexWrap: 'wrap' },
  lockedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: theme.color.bgAlt,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: theme.radius.pill,
  },
});
