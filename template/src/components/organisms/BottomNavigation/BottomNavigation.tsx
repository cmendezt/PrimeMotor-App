/**
 * BottomNavigation Component
 * Custom bottom tab bar with glass effect styling
 * For use with React Navigation's createBottomTabNavigator
 */

import React, { useMemo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '@/theme';
import type { Colors } from '@/theme/types/colors';
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';

export interface TabConfig {
  name: string;
  icon: string;
  iconFilled?: string;
  label: string;
}

export const TAB_CONFIG: Record<string, TabConfig> = {
  Home: { name: 'Home', icon: 'home', iconFilled: 'home', label: 'Inicio' },
  Catalog: { name: 'Catalog', icon: 'two-wheeler', iconFilled: 'two-wheeler', label: 'Catálogo' },
  Services: { name: 'Services', icon: 'build', iconFilled: 'build', label: 'Servicios' },
  Favorites: { name: 'Favorites', icon: 'favorite-border', iconFilled: 'favorite', label: 'Favoritos' },
  Profile: { name: 'Profile', icon: 'person-outline', iconFilled: 'person', label: 'Perfil' },
};

export const BottomNavigation: React.FC<BottomTabBarProps> = ({
  state,
  descriptors,
  navigation,
}) => {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom || 8 }]}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;

        const config = TAB_CONFIG[route.name] || {
          icon: 'circle',
          iconFilled: 'circle',
          label: route.name,
        };

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarButtonTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.tab}
            activeOpacity={0.7}
          >
            <MaterialIcons
              name={isFocused ? config.iconFilled || config.icon : config.icon}
              size={24}
              color={isFocused ? colors.primary : colors.textMuted}
            />
            <Text style={[styles.label, isFocused && styles.labelActive]}>
              {config.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const createStyles = (colors: Colors) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      backgroundColor: colors.glassBgDark,
      borderTopWidth: 1,
      borderTopColor: colors.glassBorder,
      paddingTop: 8,
    },
    tab: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 8,
      gap: 4,
    },
    label: {
      fontSize: 11,
      fontWeight: '500',
      color: colors.textMuted,
    },
    labelActive: {
      color: colors.primary,
      fontWeight: '700',
    },
  });

export default BottomNavigation;
