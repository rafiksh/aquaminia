import React, { createContext, useContext, useMemo, useState } from 'react';
import { getInitialWorlds, type Lesson, type World } from '../data/lessonData';

interface AppStateValue {
  worlds: World[];
  xp: number;
  level: number;
  pathway: string;
  activeLesson: Lesson | null;
  earnedBadges: string[];
  lockedBadges: string[];
  setPathway: (pathway: string) => void;
  openLesson: (lesson: Lesson) => void;
  closeLesson: () => void;
  markComplete: (lesson: Lesson) => void;
}

const AppStateContext = createContext<AppStateValue | null>(null);

/**
 * Single source of truth for progression (worlds/lessons, XP, active
 * pathway, the lesson currently open). Screens read/act through this
 * context instead of each owning a slice of duplicated state.
 */
export function AppStateProvider({ children }: { children: React.ReactNode }) {
  const [worlds, setWorlds] = useState<World[]>(getInitialWorlds());
  const [xp, setXp] = useState(60);
  const [pathway, setPathway] = useState('Foundations: Floating and Recovery');
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);

  const level = Math.floor(xp / 100) + 1;

  function openLesson(lesson: Lesson) {
    setActiveLesson(lesson);
  }

  function closeLesson() {
    setActiveLesson(null);
  }

  function markComplete(lesson: Lesson) {
    if (lesson.status === 'complete' || lesson.status === 'mastered') {
      // Already-mastered lessons are reviewable but shouldn't re-award XP
      // or demote their status every time they're reopened.
      setActiveLesson(null);
      return;
    }
    setWorlds((prev) =>
      prev.map((world) => {
        if (!world.lessons) return world;
        const lessons = world.lessons.map((l) => {
          if (l.id === lesson.id) return { ...l, status: 'complete' as const };
          if (l.name === lesson.unlocks && l.status === 'locked') return { ...l, status: 'available' as const };
          return l;
        });
        return { ...world, lessons };
      })
    );
    setXp((x) => x + lesson.xp);
    setActiveLesson(null);
  }

  const allLessons = worlds.flatMap((w) => w.lessons || []);
  const earnedBadges = allLessons.filter((l) => l.status === 'complete' || l.status === 'mastered').map((l) => l.badge);
  const lockedBadges = allLessons.filter((l) => l.status === 'available' || l.status === 'locked').map((l) => l.badge);

  const value = useMemo<AppStateValue>(
    () => ({
      worlds,
      xp,
      level,
      pathway,
      activeLesson,
      earnedBadges,
      lockedBadges,
      setPathway,
      openLesson,
      closeLesson,
      markComplete,
    }),
    [worlds, xp, level, pathway, activeLesson, earnedBadges, lockedBadges]
  );

  return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>;
}

export function useAppState(): AppStateValue {
  const ctx = useContext(AppStateContext);
  if (!ctx) throw new Error('useAppState must be used within an AppStateProvider');
  return ctx;
}
