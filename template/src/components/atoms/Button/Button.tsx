import React, { useMemo } from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  type TouchableOpacityProps,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useTheme } from '@/theme';
import type { Colors } from '@/theme/types/colors';

export interface ButtonProps extends TouchableOpacityProps {
  title: string;
  loading?: boolean;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'small' | 'medium' | 'large';
}

export const Button: React.FC<ButtonProps> = ({
  title,
  loading = false,
  variant = 'primary',
  size = 'large',
  disabled,
  style,
  ...props
}) => {
  const { colors, shadows } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  const buttonHeight = size === 'small' ? 40 : size === 'medium' ? 48 : 56;

  const renderContent = () => (
    <View style={[styles.content, { height: buttonHeight }]}>
      {loading ? (
        <ActivityIndicator color={colors.textPrimary} />
      ) : (
        <Text style={[styles.text, variant === 'outline' && { color: colors.primary }]}>
          {title}
        </Text>
      )}
    </View>
  );

  if (variant === 'primary') {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        disabled={disabled || loading}
        style={[styles.container, shadows.buttonPrimary, disabled && styles.disabled, style]}
        {...props}
      >
        <LinearGradient
          colors={[colors.primary, colors.primaryDark]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.gradient}
        >
          {renderContent()}
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      disabled={disabled || loading}
      style={[
        styles.container,
        variant === 'secondary' && { backgroundColor: colors.bgCard },
        variant === 'outline' && {
          backgroundColor: 'transparent',
          borderWidth: 1,
          borderColor: colors.primary,
        },
        variant === 'ghost' && { backgroundColor: 'transparent' },
        disabled && styles.disabled,
        style,
      ]}
      {...props}
    >
      {renderContent()}
    </TouchableOpacity>
  );
};

const createStyles = (colors: Colors) =>
  StyleSheet.create({
    container: {
      borderRadius: 12,
      overflow: 'hidden',
    },
    gradient: {
      borderRadius: 12,
    },
    content: {
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 24,
    },
    text: {
      color: colors.textPrimary,
      fontSize: 16,
      fontWeight: '700',
    },
    disabled: {
      opacity: 0.5,
    },
  });
