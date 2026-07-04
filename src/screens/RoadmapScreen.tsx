import React, { Fragment, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Badge, ContentBounds, Icon, LessonIcon, ProgressBar, theme } from '../design-system';
import type { Lesson, LessonStatus, World, WorldTone } from '../data/lessonData';
import type { UiIconName } from '../data/uiIcons';

const NODE_SIZE = 72;

const PATTERNS: number[][] = [
  [0, 80, 0, -80],
  [0, -70, -30, 40, 90, 40, -30, -70],
  [0, 55, 95, 55, 0, -55, -95, -55],
  [0, -90, 0, 90],
];

const STATUS_BADGE: Partial<Record<LessonStatus, { bg: string; fg: string; glyph: UiIconName }>> = {
  mastered: { bg: theme.color.gold500, fg: theme.color.white, glyph: 'star' },
  complete: { bg: theme.color.success500, fg: theme.color.white, glyph: 'check' },
};

function LessonNode({
  lesson,
  index,
  offsets,
  onOpen,
}: {
  lesson: Lesson;
  index: number;
  offsets: number[];
  onOpen: (lesson: Lesson) => void;
}) {
  const offset = offsets[index % offsets.length];
  const badge = STATUS_BADGE[lesson.status];

  return (
    <View style={[styles.nodeRow, { transform: [{ translateX: offset }] }]}>
      {lesson.status === 'available' && (
        <View style={styles.nextUpTag}>
          <Text style={[theme.type.caption, { color: theme.color.white }]}>NEXT UP</Text>
        </View>
      )}
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={lesson.name}
        accessibilityState={{ disabled: lesson.status === 'locked' }}
        onPress={() => lesson.status !== 'locked' && onOpen(lesson)}
        disabled={lesson.status === 'locked'}
        style={styles.nodeWrap}
      >
        {lesson.status === 'locked' ? (
          <View style={[styles.node, { backgroundColor: theme.color.lockedNodeBg, borderBottomColor: theme.color.lockedNodeEdge }]}>
            <Icon name="lock" size={26} color={theme.color.ink200} />
          </View>
        ) : (
          <LessonIcon lesson={lesson} size={NODE_SIZE} />
        )}
        {badge && (
          <View style={[styles.statusBadge, { backgroundColor: badge.bg }]}>
            <Icon name={badge.glyph} size={13} color={badge.fg} />
          </View>
        )}
      </Pressable>
    </View>
  );
}

function StepStones({ fromOffset, toOffset }: { fromOffset: number; toOffset: number }) {
  const mid1 = fromOffset + (toOffset - fromOffset) * 0.33;
  const mid2 = fromOffset + (toOffset - fromOffset) * 0.66;
  return (
    <Fragment>
      <View style={[styles.stoneRow, { transform: [{ translateX: mid1 }] }]}>
        <View style={styles.stoneLg} />
      </View>
      <View style={[styles.stoneRow, { transform: [{ translateX: mid2 }] }]}>
        <View style={styles.stoneSm} />
      </View>
    </Fragment>
  );
}

function LessonPath({
  lessons,
  offsets,
  onOpen,
}: {
  lessons: Lesson[];
  offsets: number[];
  onOpen: (lesson: Lesson) => void;
}) {
  const nodes: React.ReactNode[] = [];
  lessons.forEach((l, i) => {
    nodes.push(<LessonNode key={l.id} lesson={l} index={i} offsets={offsets} onOpen={onOpen} />);
    if (i < lessons.length - 1) {
      const from = offsets[i % offsets.length];
      const to = offsets[(i + 1) % offsets.length];
      nodes.push(<StepStones key={l.id + '-stones'} fromOffset={from} toOffset={to} />);
    }
  });
  return <Fragment>{nodes}</Fragment>;
}

type WorldStatus = 'locked' | 'complete' | 'in-progress' | 'coming-soon';

/**
 * Worlds with a `lessons` list derive their status from lesson progress.
 * Worlds without one (e.g. "Freestyle Path") are teaser rows with no
 * content yet — they unlock into a "coming soon" state once every
 * lesson-bearing world ahead of them is complete, rather than staying
 * permanently locked regardless of progress.
 */
function computeWorldStatus(world: World, foundationsComplete: boolean): WorldStatus {
  if (!world.lessons) return foundationsComplete ? 'coming-soon' : 'locked';
  const anyUnlocked = world.lessons.some((l) => l.status !== 'locked');
  if (!anyUnlocked) return 'locked';
  const allDone = world.lessons.every((l) => l.status === 'complete' || l.status === 'mastered');
  return allDone ? 'complete' : 'in-progress';
}

const WORLD_TONE_BG: Record<WorldTone, string> = {
  aqua: theme.color.aqua500,
  blue: theme.color.blue500,
  grape: theme.color.grape500,
  gold: theme.color.gold500,
};

function WorldBanner({
  world,
  status,
  expanded,
  onToggle,
}: {
  world: World;
  status: WorldStatus;
  expanded: boolean;
  onToggle: () => void;
}) {
  if (status === 'locked') {
    return (
      <View style={styles.lockedBanner}>
        <Icon name="lock" size={24} color={theme.color.ink400} />
        <View style={{ flex: 1 }}>
          <Text style={[theme.type.bodyLg, { color: theme.color.ink600 }]}>{world.title}</Text>
          <Text style={[theme.type.bodySm, { color: theme.color.ink400 }]}>
            {world.unlockNote || 'Complete the previous world to unlock'}
          </Text>
        </View>
      </View>
    );
  }

  if (status === 'coming-soon') {
    return (
      <View style={styles.comingSoonBanner}>
        <Icon name="sparkle" size={24} color={theme.color.gold700} />
        <View style={{ flex: 1 }}>
          <Text style={[theme.type.bodyLg, { color: theme.color.ink800 }]}>{world.title}</Text>
          <Text style={[theme.type.bodySm, { color: theme.color.gold700 }]}>Unlocked! New lessons coming soon.</Text>
        </View>
      </View>
    );
  }

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`${world.title}, ${expanded ? 'expanded' : 'collapsed'}`}
      onPress={onToggle}
      style={[styles.banner, { backgroundColor: WORLD_TONE_BG[world.tone] }]}
    >
      <View style={styles.bannerCircleTop} />
      <View style={styles.bannerCircleBottom} />
      <View>
        <Text style={[theme.type.labelCaps, { color: theme.color.white, opacity: 0.85 }]}>
          {status === 'complete' ? 'Complete' : 'In progress'}
        </Text>
        <Text style={[theme.type.displaySm, { color: theme.color.white }]}>{world.title}</Text>
      </View>
      <Text style={[styles.chevron, expanded && styles.chevronOpen]}>⌄</Text>
    </Pressable>
  );
}

function buildWorldOffsets(worlds: World[]): Record<string, number[]> {
  let carry = 0;
  let started = false;
  const map: Record<string, number[]> = {};
  worlds.forEach((world, wi) => {
    if (!world.lessons) return;
    const raw = PATTERNS[wi % PATTERNS.length];
    let offsets: number[];
    if (!started) {
      offsets = raw;
      started = true;
    } else {
      const shift = carry - raw[0];
      offsets = raw.map((v) => v + shift);
    }
    map[world.id] = offsets;
    carry = offsets[(world.lessons.length - 1) % offsets.length];
  });
  return map;
}

export interface RoadmapScreenProps {
  worlds: World[];
  xp: number;
  level: number;
  currentPathway: string;
  onOpenLesson: (lesson: Lesson) => void;
}

export function RoadmapScreen({ worlds, xp, level, currentPathway, onOpenLesson }: RoadmapScreenProps) {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({ w1: false, w2: true });
  const worldOffsets = buildWorldOffsets(worlds);
  const foundationsComplete = worlds
    .filter((w) => w.lessons)
    .every((w) => computeWorldStatus(w, false) === 'complete');

  return (
    <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
      <ContentBounds>
        <View style={styles.header}>
          <View style={styles.levelBadge}>
            <Text style={[theme.type.displaySm, { color: theme.color.white, fontSize: 16 }]}>{level}</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={[theme.type.bodySm, { color: theme.color.ink400 }]}>
              Level {level} · {currentPathway}
            </Text>
            <ProgressBar value={xp % 100} max={100} tone="gold" />
          </View>
          <Badge tone="gold" icon="sparkle">
            {xp} XP
          </Badge>
        </View>

        {worlds.map((world) => {
          const status = computeWorldStatus(world, foundationsComplete);
          return (
            <View key={world.id} style={styles.worldBlock}>
              <WorldBanner
                world={world}
                status={status}
                expanded={!!expanded[world.id]}
                onToggle={() => setExpanded((e) => ({ ...e, [world.id]: !e[world.id] }))}
              />
              {world.lessons && (status === 'in-progress' || status === 'complete') && expanded[world.id] && (
                <View style={styles.pathWrap}>
                  <LessonPath lessons={world.lessons} offsets={worldOffsets[world.id]} onOpen={onOpenLesson} />
                </View>
              )}
            </View>
          );
        })}
      </ContentBounds>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: { flex: 1 },
  scrollContent: { paddingBottom: theme.space[8] },
  header: { padding: theme.space[5], paddingTop: theme.space[5], flexDirection: 'row', alignItems: 'center', gap: 12 },
  levelBadge: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: theme.color.aqua500,
    alignItems: 'center',
    justifyContent: 'center',
  },
  worldBlock: { marginBottom: 28 },
  lockedBanner: {
    marginHorizontal: 16,
    marginBottom: 24,
    padding: 18,
    borderRadius: theme.radius.lg,
    backgroundColor: theme.color.surface,
    borderWidth: 2,
    borderColor: theme.color.border,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    opacity: 0.85,
  },
  comingSoonBanner: {
    marginHorizontal: 16,
    marginBottom: 24,
    padding: 18,
    borderRadius: theme.radius.lg,
    backgroundColor: theme.color.gold100,
    borderWidth: 2,
    borderColor: theme.color.gold300,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  banner: {
    marginHorizontal: 16,
    padding: 20,
    paddingBottom: 22,
    borderRadius: theme.radius.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    overflow: 'hidden',
    position: 'relative',
  },
  bannerCircleTop: {
    position: 'absolute',
    top: -30,
    right: -30,
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255,255,255,0.12)',
  },
  bannerCircleBottom: {
    position: 'absolute',
    bottom: -40,
    left: -20,
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: 'rgba(255,255,255,0.08)',
  },
  chevron: { fontSize: 20, color: theme.color.white },
  chevronOpen: { transform: [{ rotate: '180deg' }] },
  pathWrap: { paddingTop: 22 },
  nodeRow: { alignItems: 'center', marginBottom: 10, position: 'relative' },
  nextUpTag: {
    position: 'absolute',
    top: -34,
    backgroundColor: theme.color.ink800,
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: theme.radius.pill,
  },
  node: {
    width: 72,
    height: 72,
    borderRadius: 36,
    borderBottomWidth: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nodeWrap: { position: 'relative' },
  statusBadge: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: theme.color.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stoneRow: { alignItems: 'center', marginBottom: 10 },
  stoneLg: { width: 20, height: 13, borderRadius: 10, backgroundColor: theme.color.ink200, borderBottomWidth: 3, borderBottomColor: theme.color.borderStrong },
  stoneSm: { width: 15, height: 10, borderRadius: 8, backgroundColor: theme.color.ink200, borderBottomWidth: 2, borderBottomColor: theme.color.borderStrong },
});
