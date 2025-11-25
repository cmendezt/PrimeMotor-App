/**
 * Badge Component
 * Small badge for labels like "NEW", "FEATURED", discount percentages
 */

import React, { useMemo } from 'react';
import { View, Text, StyleSheet, type ViewStyle } from 'react-native';
import { useTheme } from '@/theme';
import type { Colors } from '@/theme/types/colors';

export type BadgeVariant = 'new' | 'featured' | 'discount' | 'electric' | 'default';

export interface BadgeProps {
  children: string;
  variant?: BadgeVariant;
  size?: 'small' | 'medium';
  style?: ViewStyle;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  size = 'medium',
  style,
}) => {
  const { colors, shadows } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  const variantStyle: ViewStyle = useMemo(() => {
    switch (variant) {
      case 'new':
      case 'featured':
        return { backgroundColor: colors.primary };
      case 'discount':
        return { backgroundColor: colors.emergency };
      case 'electric':
        return { backgroundColor: colors.success };
      default:
        return { backgroundColor: colors.bgSurface };
    }
  }, [variant, colors]);

  const sizeStyle = size === 'small' ? styles.small : styles.medium;

  const shouldGlow = variant === 'new' || variant === 'featured';

  return (
    <View style={[styles.container, sizeStyle, variantStyle, shouldGlow && shadows.glowOrangeSmall, style]}>
      <Text style={[styles.text, size === 'small' && styles.textSmall]}>
        {children}
      </Text>
    </View>
  );
};

const createStyles = (colors: Colors) =>
  StyleSheet.create({
    container: {
      alignSelf: 'flex-start',
      borderRadius: 8,
    },
    small: {
      paddingHorizontal: 8,
      paddingVertical: 4,
    },
    medium: {
      paddingHorizontal: 12,
      paddingVertical: 6,
    },
    text: {
      color: colors.textPrimary,
      fontSize: 12,
      fontWeight: '700',
      textTransform: 'uppercase',
    },
    textSmall: {
      fontSize: 10,
    },
  });

export default Badge;
