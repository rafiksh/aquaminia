import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Badge, Button, Card, Dialog, Icon, IconButton, ModalCardLayout, theme } from '../design-system';
import type { Lesson } from '../data/lessonData';

export interface LessonScreenProps {
  lesson: Lesson;
  onExit: () => void;
  onMarkComplete: (lesson: Lesson) => void;
}

export function LessonScreen({ lesson, onExit, onMarkComplete }: LessonScreenProps) {
  const [showCelebration, setShowCelebration] = useState(false);
  const alreadyDone = lesson.status === 'complete' || lesson.status === 'mastered';

  function markComplete() {
    setShowCelebration(true);
  }

  function finish() {
    setShowCelebration(false);
    onMarkComplete(lesson);
  }

  return (
    <ModalCardLayout>
      <View style={styles.root}>
        <View style={styles.header}>
          <IconButton icon="close" tone="neutral" size={40} onPress={onExit} ariaLabel="Close lesson" />
          <Text style={[theme.type.labelCaps, { color: theme.color.aqua600 }]}>{lesson.category}</Text>
        </View>

        <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
          <Text style={[theme.type.displayMd, { color: theme.color.ink800 }]}>{lesson.name}</Text>
          <Text style={[theme.type.bodyMd, { color: theme.color.ink600 }]}>{lesson.explanation}</Text>

          <View style={styles.videoPlaceholder}>
            <Icon name="play" size={30} color={theme.color.aqua700} />
            <Text style={[theme.type.bodyMd, { color: theme.color.aqua700 }]}>Watch demonstration</Text>
          </View>

          <Card>
            <Text style={styles.cardLabel}>OBJECTIVE</Text>
            <Text style={[theme.type.bodyLg, { color: theme.color.ink800 }]}>{lesson.objective}</Text>
          </Card>

          <Card>
            <Text style={[styles.cardLabel, { marginBottom: 10 }]}>TIPS</Text>
            <View style={{ gap: 8 }}>
              {lesson.tips.map((t, i) => (
                <View key={i} style={styles.tipRow}>
                  <Text style={{ color: theme.color.aqua500 }}>•</Text>
                  <Text style={[theme.type.bodySm, { color: theme.color.ink600, flex: 1 }]}>{t}</Text>
                </View>
              ))}
            </View>
          </Card>

          <Card>
            <Text style={styles.cardLabel}>MASTERY GOAL</Text>
            <Text style={[theme.type.bodyMd, { color: theme.color.ink800 }]}>{lesson.mastery}</Text>
          </Card>

          <View style={styles.badgeRow}>
            <Badge tone="gold" icon="sparkle">
              +{lesson.xp} XP
            </Badge>
            <Badge tone="success" icon="medal">
              {lesson.badge}
            </Badge>
          </View>
        </ScrollView>

        <View style={styles.footer}>
          {alreadyDone ? (
            <Badge tone={lesson.status === 'mastered' ? 'gold' : 'success'} icon={lesson.status === 'mastered' ? 'star' : 'check'}>
              {lesson.status === 'mastered' ? 'Mastered' : 'Completed'}
            </Badge>
          ) : (
            <Button tone="success" size="lg" fullWidth onPress={markComplete}>
              Mark Complete
            </Button>
          )}
        </View>

        <Dialog
          open={showCelebration}
          title="Nice work!"
          actions={
            <Button tone="success" fullWidth onPress={finish}>
              Continue
            </Button>
          }
        >
          <View style={{ gap: 10 }}>
            <Icon name="party" size={32} color={theme.color.gold500} />
            <Text style={[theme.type.bodyMd, { color: theme.color.ink600 }]}>{lesson.name} complete.</Text>
            <View style={styles.badgeRow}>
              <Badge tone="gold" icon="sparkle">
                +{lesson.xp} XP
              </Badge>
              <Badge tone="success" icon="medal">
                {lesson.badge}
              </Badge>
            </View>
            <Text style={[theme.type.bodySm, { color: theme.color.ink400 }]}>Unlocks: {lesson.unlocks}</Text>
          </View>
        </Dialog>
      </View>
    </ModalCardLayout>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: theme.color.bg },
  header: { flexDirection: 'row', alignItems: 'center', gap: 14, padding: theme.space[5], paddingBottom: 4 },
  scroll: { flex: 1 },
  scrollContent: { padding: theme.space[6], paddingTop: 10, gap: 18 },
  videoPlaceholder: {
    height: 120,
    borderRadius: theme.radius.lg,
    backgroundColor: theme.color.aqua100,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  cardLabel: { ...theme.type.labelCaps, color: theme.color.ink400, marginBottom: 8 },
  tipRow: { flexDirection: 'row', gap: 8 },
  badgeRow: { flexDirection: 'row', gap: 10, flexWrap: 'wrap' },
  footer: {
    padding: theme.space[6],
    paddingTop: 16,
    borderTopWidth: 2,
    borderTopColor: theme.color.border,
    backgroundColor: theme.color.surface,
  },
});
