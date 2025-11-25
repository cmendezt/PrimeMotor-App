import React, { useMemo } from 'react';
import { StyleSheet, type ViewStyle } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useTheme } from '@/theme';

export interface GradientBackgroundProps {
  children: React.ReactNode;
  style?: ViewStyle;
  variant?: 'home' | 'services';
}

export const GradientBackground: React.FC<GradientBackgroundProps> = ({
  children,
  style,
  variant = 'home',
}) => {
  const { colors } = useTheme();

  const gradientColors = useMemo(() => {
    if (variant === 'services') {
      return [
        colors.gradientServicesStart,
        colors.gradientServicesVia,
        colors.gradientServicesEnd,
        colors.bgDark,
      ];
    }
    return [
      colors.gradientHomeStart,
      colors.gradientHomeVia,
      colors.gradientHomeEnd,
      colors.bgDark,
    ];
  }, [colors, variant]);

  return (
    <LinearGradient
      colors={gradientColors}
      locations={[0, 0.3, 0.6, 1]}
      style={[styles.container, style]}
    >
      {children}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
