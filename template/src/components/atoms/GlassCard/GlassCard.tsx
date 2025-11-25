/**
 * GlassCard Component
 * A card component with glass morphism effect (semi-transparent background)
 */

import React, { useMemo } from 'react';
import { View, StyleSheet, type ViewProps, type ViewStyle } from 'react-native';
import { useTheme } from '@/theme';
import type { Colors } from '@/theme/types/colors';

export interface GlassCardProps extends ViewProps {
  children: React.ReactNode;
  variant?: 'light' | 'medium' | 'dark';
  borderRadius?: number;
  padding?: number;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  variant = 'light',
  borderRadius = 16,
  padding = 16,
  style,
  ...props
}) => {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  const variantStyle: ViewStyle = useMemo(() => {
    switch (variant) {
      case 'medium':
        return { backgroundColor: colors.glassBgMedium };
      case 'dark':
        return { backgroundColor: colors.glassBgDark };
      case 'light':
      default:
        return { backgroundColor: colors.glassBg };
    }
  }, [variant, colors]);

  return (
    <View
      style={[
        styles.container,
        variantStyle,
        { borderRadius, padding },
        style,
      ]}
      {...props}
    >
      {children}
    </View>
  );
};

const createStyles = (colors: Colors) =>
  StyleSheet.create({
    container: {
      borderWidth: 1,
      borderColor: colors.glassBorder,
      overflow: 'hidden',
    },
  });

export default GlassCard;
