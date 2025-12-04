/**
 * Header Component
 * App header with logo, title, and action buttons
 */

import React, { useMemo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '@/theme';
import type { Colors } from '@/theme/types/colors';

export interface HeaderProps {
  title?: string;
  showLogo?: boolean;
  showMenu?: boolean;
  showNotifications?: boolean;
  showProfile?: boolean;
  notificationCount?: number;
  onMenuPress?: () => void;
  onNotificationPress?: () => void;
  onProfilePress?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  showLogo = true,
  showMenu = true,
  showNotifications = true,
  showProfile = false,
  notificationCount = 0,
  onMenuPress,
  onNotificationPress,
  onProfilePress,
}) => {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const styles = useMemo(() => createStyles(colors), [colors]);

  return (
    <View style={[styles.container, { paddingTop: insets.top + 12 }]}>
      {/* Left Side */}
      <View style={styles.leftSection}>
        {showMenu && (
          <TouchableOpacity onPress={onMenuPress} style={styles.iconButton}>
            <MaterialIcons name="menu" size={24} color={colors.textPrimary} />
          </TouchableOpacity>
        )}
        {showLogo && (
          <View style={styles.logoContainer}>
            <MaterialIcons name="electric-moped" size={28} color={colors.primary} />
            <Text style={styles.logoText}>Prime<Text style={styles.logoTextAccent}>Motor</Text></Text>
          </View>
        )}
        {title && !showLogo && (
          <Text style={styles.title}>{title}</Text>
        )}
      </View>

      {/* Right Side */}
      <View style={styles.rightSection}>
        {showNotifications && (
          <TouchableOpacity onPress={onNotificationPress} style={styles.iconButton}>
            <MaterialIcons name="notifications-none" size={24} color={colors.textPrimary} />
            {notificationCount > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>
                  {notificationCount > 9 ? '9+' : notificationCount}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        )}
        {showProfile && (
          <TouchableOpacity onPress={onProfilePress} style={styles.profileButton}>
            <View style={styles.avatar}>
              <MaterialIcons name="person" size={20} color={colors.textSecondary} />
            </View>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const createStyles = (colors: Colors) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 16,
      paddingBottom: 12,
    },
    leftSection: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
    },
    rightSection: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    iconButton: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: colors.glassBg,
      borderWidth: 1,
      borderColor: colors.glassBorder,
      justifyContent: 'center',
      alignItems: 'center',
    },
    logoContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    logoText: {
      fontSize: 20,
      fontWeight: '700',
      color: colors.textPrimary,
    },
    logoTextAccent: {
      color: colors.primary,
    },
    title: {
      fontSize: 20,
      fontWeight: '700',
      color: colors.textPrimary,
    },
    badge: {
      position: 'absolute',
      top: -4,
      right: -4,
      minWidth: 18,
      height: 18,
      borderRadius: 9,
      backgroundColor: colors.primary,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 4,
    },
    badgeText: {
      fontSize: 10,
      fontWeight: '700',
      color: colors.textPrimary,
    },
    profileButton: {
      marginLeft: 4,
    },
    avatar: {
      width: 36,
      height: 36,
      borderRadius: 18,
      backgroundColor: colors.bgSurface,
      borderWidth: 2,
      borderColor: colors.primary,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

export default Header;
