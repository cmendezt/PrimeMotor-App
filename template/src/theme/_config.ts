import type { ThemeConfiguration } from '@/theme/types/config';

import { DarkTheme, DefaultTheme } from '@react-navigation/native';

export const enum Variant {
  DARK = 'dark',
}

const colorsLight = {
  // Primary colors (orange-red from mockups)
  primary: '#FF4500',
  primaryDark: '#E63E00',
  secondary: '#FF6347',
  orange: '#F97316',

  // Backgrounds
  bgDark: '#0A0A0A',
  bgCard: '#262626',
  glassBg: 'rgba(255, 255, 255, 0.05)',
  glassBorder: 'rgba(255, 255, 255, 0.1)',

  // Text colors
  textPrimary: '#F7FAFC',
  textSecondary: '#A0AEC0',
  textMuted: 'rgba(255, 255, 255, 0.7)',
  textPlaceholder: 'rgba(255, 255, 255, 0.5)',

  // Grays (keeping for compatibility)
  gray100: '#DFDFDF',
  gray200: '#A1A1A1',
  gray400: '#4D4D4D',
  gray50: '#EFEFEF',
  gray800: '#303030',

  // States
  success: '#10B981',
  error: '#EF4444',
  warning: '#F59E0B',

  // Legacy colors (keeping for compatibility)
  purple100: '#E1E1EF',
  purple50: '#1B1A23',
  purple500: '#44427D',
  red500: '#C13333',
  skeleton: '#A1A1A1',
} as const;

const colorsDark = {
  // Primary colors (orange-red from mockups)
  primary: '#FF4500',
  primaryDark: '#E63E00',
  secondary: '#FF6347',
  orange: '#F97316',

  // Backgrounds
  bgDark: '#0A0A0A',
  bgCard: '#262626',
  glassBg: 'rgba(255, 255, 255, 0.05)',
  glassBorder: 'rgba(255, 255, 255, 0.1)',

  // Text colors
  textPrimary: '#F7FAFC',
  textSecondary: '#A0AEC0',
  textMuted: 'rgba(255, 255, 255, 0.7)',
  textPlaceholder: 'rgba(255, 255, 255, 0.5)',

  // Grays (adjusted for dark theme)
  gray100: '#000000',
  gray200: '#BABABA',
  gray400: '#969696',
  gray50: '#0A0A0A',
  gray800: '#E0E0E0',

  // States
  success: '#10B981',
  error: '#EF4444',
  warning: '#F59E0B',

  // Legacy colors (adjusted for dark theme)
  purple100: '#252732',
  purple50: '#1B1A23',
  purple500: '#A6A4F0',
  red500: '#C13333',
  skeleton: '#303030',
} as const;

const sizes = [12, 16, 24, 32, 40, 80] as const;

export const config = {
  backgrounds: colorsLight,
  borders: {
    colors: colorsLight,
    radius: [4, 16],
    widths: [1, 2],
  },
  colors: colorsLight,
  fonts: {
    colors: colorsLight,
    sizes,
  },
  gutters: sizes,
  navigationColors: {
    ...DefaultTheme.colors,
    background: colorsLight.bgDark,
    card: colorsLight.bgDark,
  },
  variants: {
    dark: {
      backgrounds: colorsDark,
      borders: {
        colors: colorsDark,
      },
      colors: colorsDark,
      fonts: {
        colors: colorsDark,
      },
      navigationColors: {
        ...DarkTheme.colors,
        background: colorsDark.purple50,
        card: colorsDark.purple50,
      },
    },
  },
} as const satisfies ThemeConfiguration;
