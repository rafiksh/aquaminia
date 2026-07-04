import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { LESSON_ICONS } from '../../data/lessonIcons';
import type { Lesson } from '../../data/lessonData';

export interface LessonIconProps {
  lesson: Lesson;
  size: number;
}

/**
 * Illustrated badge art for a lesson when available; falls back to the
 * lesson's emoji glyph on a plain circle for lessons without art yet.
 */
export function LessonIcon({ lesson, size }: LessonIconProps) {
  const source = LESSON_ICONS[lesson.id];
  if (source) {
    return <Image source={source} style={{ width: size, height: size, borderRadius: size / 2 }} resizeMode="cover" />;
  }
  return (
    <View style={[styles.fallback, { width: size, height: size, borderRadius: size / 2 }]}>
      <Text style={{ fontSize: size * 0.4 }}>{lesson.icon}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  fallback: { alignItems: 'center', justifyContent: 'center' },
});
