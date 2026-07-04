import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { Icon, theme } from '../design-system';
import type { UiIconName } from '../data/uiIcons';

const ICONS: Record<string, UiIconName> = { Path: 'swimmer', Profile: 'person' };

/**
 * The one place tab-bar visuals live — themed from tokens, not
 * re-styled per platform. Consumed as the `tabBar` prop on the bottom
 * tab navigator in MainTabs.
 */
export function SwimTabBar({ state, navigation }: BottomTabBarProps) {
  return (
    <SafeAreaView edges={['bottom']} style={styles.bar}>
      {state.routes.map((route, index) => {
        const isActive = state.index === index;
        const onPress = () => {
          const event = navigation.emit({ type: 'tabPress', target: route.key, canPreventDefault: true });
          if (!isActive && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };
        const iconName = ICONS[route.name];
        return (
          <Pressable key={route.key} onPress={onPress} style={styles.item}>
            {iconName && <Icon name={iconName} size={22} color={isActive ? theme.color.aqua500 : theme.color.ink200} />}
            <Text style={[theme.type.caption, { color: isActive ? theme.color.aqua600 : theme.color.ink400 }]}>
              {route.name}
            </Text>
          </Pressable>
        );
      })}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    backgroundColor: theme.color.surface,
    borderTopWidth: 2,
    borderTopColor: theme.color.border,
    paddingTop: 10,
  },
  item: { flex: 1, alignItems: 'center', gap: 4, paddingVertical: 4 },
});
