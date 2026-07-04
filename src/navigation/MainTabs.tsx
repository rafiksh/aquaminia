import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { createBottomTabNavigator, type BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BubbleBackdrop, Icon, theme } from '../design-system';
import type { UiIconName } from '../data/uiIcons';
import { RoadmapScreen } from '../screens/RoadmapScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
import { useAppState } from '../state/AppState';
import { SwimTabBar } from './SwimTabBar';

export type MainTabParamList = {
  Path: undefined;
  Profile: undefined;
};

const WIDE_BREAKPOINT = 768;
const TAB_ICONS: Record<keyof MainTabParamList, UiIconName> = { Path: 'swimmer', Profile: 'person' };
const TAB_KEYS = Object.keys(TAB_ICONS) as (keyof MainTabParamList)[];

const Tab = createBottomTabNavigator<MainTabParamList>();

function PathTab({ navigation }: BottomTabScreenProps<MainTabParamList, 'Path'>) {
  const { worlds, xp, level, pathway, openLesson } = useAppState();
  return (
    <RoadmapScreen
      worlds={worlds}
      xp={xp}
      level={level}
      currentPathway={pathway}
      onOpenLesson={(lesson) => {
        openLesson(lesson);
        navigation.getParent()?.navigate('Lesson' as never);
      }}
    />
  );
}

function ProfileTab() {
  const { xp, level, pathway, earnedBadges, lockedBadges } = useAppState();
  return (
    <ProfileScreen xp={xp} level={level} currentPathway={pathway} earnedBadges={earnedBadges} lockedBadges={lockedBadges} />
  );
}

/**
 * Desktop/tablet layout: a persistent left side rail next to the active
 * screen. Deliberately bypasses Tab.Navigator's scene view here — that
 * view only ever stacks scenes in a column (content, then tab bar), so it
 * can't produce a true side-by-side row layout, and on web its
 * multi-scene stacking was the source of the profile-overflowing-above-path
 * rendering bug. Rendering exactly one screen at a time from local state
 * sidesteps both problems.
 */
function SideNavShell() {
  const [active, setActive] = useState<keyof MainTabParamList>('Path');
  const navigation = useNavigation();
  const { worlds, xp, level, pathway, openLesson, earnedBadges, lockedBadges } = useAppState();

  return (
    <View style={styles.wideRoot}>
      <SafeAreaView edges={['top', 'left', 'bottom']} style={styles.sideNav}>
        <View style={styles.brandRow}>
          <Text style={[theme.type.displaySm, { color: theme.color.ink800 }]}>Aquamania</Text>
        </View>
        {TAB_KEYS.map((key) => {
          const isActive = active === key;
          return (
            <Pressable
              key={key}
              accessibilityRole="button"
              accessibilityState={{ selected: isActive }}
              onPress={() => setActive(key)}
              style={[styles.sideItem, isActive && styles.sideItemActive]}
            >
              <Icon name={TAB_ICONS[key]} size={20} color={isActive ? theme.color.aqua700 : theme.color.ink600} />
              <Text style={[theme.type.bodyMd, { color: isActive ? theme.color.aqua700 : theme.color.ink600 }]}>{key}</Text>
            </Pressable>
          );
        })}
      </SafeAreaView>
      <View style={styles.wideContent}>
        <BubbleBackdrop />
        {active === 'Path' ? (
          <RoadmapScreen
            worlds={worlds}
            xp={xp}
            level={level}
            currentPathway={pathway}
            onOpenLesson={(lesson) => {
              openLesson(lesson);
              navigation.navigate('Lesson' as never);
            }}
          />
        ) : (
          <ProfileScreen xp={xp} level={level} currentPathway={pathway} earnedBadges={earnedBadges} lockedBadges={lockedBadges} />
        )}
      </View>
    </View>
  );
}

export function MainTabs() {
  const { width } = useWindowDimensions();
  const isWide = width >= WIDE_BREAKPOINT;

  if (isWide) {
    return <SideNavShell />;
  }

  return (
    <View style={{ flex: 1, backgroundColor: theme.color.bg }}>
      <BubbleBackdrop />
      <Tab.Navigator
        tabBar={(props) => <SwimTabBar {...props} />}
        screenOptions={{ headerShown: false, sceneStyle: { backgroundColor: 'transparent' } }}
      >
        <Tab.Screen name="Path" component={PathTab} />
        <Tab.Screen name="Profile" component={ProfileTab} />
      </Tab.Navigator>
    </View>
  );
}

const styles = StyleSheet.create({
  wideRoot: { flex: 1, flexDirection: 'row', backgroundColor: theme.color.bg },
  sideNav: {
    width: 240,
    flexShrink: 0,
    backgroundColor: theme.color.surface,
    borderRightWidth: 2,
    borderRightColor: theme.color.border,
    padding: 18,
    gap: 6,
  },
  brandRow: { flexDirection: 'row', alignItems: 'center', gap: 10, paddingHorizontal: 10, paddingBottom: 28 },
  sideItem: { flexDirection: 'row', alignItems: 'center', gap: 12, padding: 12, borderRadius: theme.radius.md },
  sideItemActive: { backgroundColor: theme.color.aqua100 },
  wideContent: { flex: 1, position: 'relative' },
});
