import type { ThemeConfiguration } from '@/theme/types/config';

import { DarkTheme, DefaultTheme } from '@react-navigation/native';

export const enum Variant {
  DARK = 'dark',
}

const colorsLight = {
  // Primary colors (orange-red from Stitch designs)
  primary: '#FF4500',
  primaryDark: '#E63E00',
  primaryLight: '#FF6B3D',
  secondary: '#FF6347',
  orange: '#F97316',

  // Backgrounds (from Stitch designs)
  bgDark: '#0A0A0A',
  bgSecondary: '#111111',
  bgCard: '#1A1A1A',
  bgCardLight: '#1C1C1E',
  bgElevated: '#262626',
  bgSurface: '#2A2A2A',

  // Glass effects (semi-transparent)
  glassBg: 'rgba(255, 255, 255, 0.05)',
  glassBgMedium: 'rgba(38, 38, 38, 0.5)',
  glassBgDark: 'rgba(0, 0, 0, 0.3)',
  glassBorder: 'rgba(255, 255, 255, 0.1)',
  glassBorderLight: 'rgba(255, 255, 255, 0.2)',

  // Text colors
  textPrimary: '#F7FAFC',
  textSecondary: '#A0AEC0',
  textMuted: 'rgba(255, 255, 255, 0.7)',
  textPlaceholder: 'rgba(255, 255, 255, 0.5)',
  textInverse: '#1A202C',

  // Grays (expanded scale)
  gray50: '#FAFAFA',
  gray100: '#F5F5F5',
  gray200: '#E5E5E5',
  gray300: '#D4D4D4',
  gray400: '#A3A3A3',
  gray500: '#737373',
  gray600: '#525252',
  gray700: '#404040',
  gray800: '#262626',
  gray900: '#171717',

  // States
  success: '#10B981',
  error: '#EF4444',
  warning: '#F59E0B',
  emergency: '#DC2626',
  info: '#3B82F6',

  // Gradient colors (for LinearGradient)
  gradientHomeStart: '#1c1c1c',
  gradientHomeVia: '#200A00',
  gradientHomeEnd: '#3B0000',
  gradientServicesStart: '#1c1c1c',
  gradientServicesVia: '#2d0b0b',
  gradientServicesEnd: '#3a1a0a',

  // Legacy colors (keeping for compatibility)
  purple100: '#E1E1EF',
  purple50: '#1B1A23',
  purple500: '#44427D',
  red500: '#C13333',
  skeleton: '#A1A1A1',
} as const;

const colorsDark = {
  // Primary colors (orange-red from Stitch designs)
  primary: '#FF4500',
  primaryDark: '#E63E00',
  primaryLight: '#FF6B3D',
  secondary: '#FF6347',
  orange: '#F97316',

  // Backgrounds (from Stitch designs)
  bgDark: '#0A0A0A',
  bgSecondary: '#111111',
  bgCard: '#1A1A1A',
  bgCardLight: '#1C1C1E',
  bgElevated: '#262626',
  bgSurface: '#2A2A2A',

  // Glass effects (semi-transparent)
  glassBg: 'rgba(255, 255, 255, 0.05)',
  glassBgMedium: 'rgba(38, 38, 38, 0.5)',
  glassBgDark: 'rgba(0, 0, 0, 0.3)',
  glassBorder: 'rgba(255, 255, 255, 0.1)',
  glassBorderLight: 'rgba(255, 255, 255, 0.2)',

  // Text colors
  textPrimary: '#F7FAFC',
  textSecondary: '#A0AEC0',
  textMuted: 'rgba(255, 255, 255, 0.7)',
  textPlaceholder: 'rgba(255, 255, 255, 0.5)',
  textInverse: '#1A202C',

  // Grays (expanded scale - inverted for dark theme)
  gray50: '#171717',
  gray100: '#262626',
  gray200: '#404040',
  gray300: '#525252',
  gray400: '#737373',
  gray500: '#A3A3A3',
  gray600: '#D4D4D4',
  gray700: '#E5E5E5',
  gray800: '#F5F5F5',
  gray900: '#FAFAFA',

  // States
  success: '#10B981',
  error: '#EF4444',
  warning: '#F59E0B',
  emergency: '#DC2626',
  info: '#3B82F6',

  // Gradient colors (for LinearGradient)
  gradientHomeStart: '#1c1c1c',
  gradientHomeVia: '#200A00',
  gradientHomeEnd: '#3B0000',
  gradientServicesStart: '#1c1c1c',
  gradientServicesVia: '#2d0b0b',
  gradientServicesEnd: '#3a1a0a',

  // Legacy colors (keeping for compatibility)
  purple100: '#252732',
  purple50: '#1B1A23',
  purple500: '#A6A4F0',
  red500: '#C13333',
  skeleton: '#303030',
} as const;

// Expanded spacing scale (from Stitch designs)
const sizes = [4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80] as const;

// Expanded border radius scale (from Stitch designs)
const radiusScale = [4, 8, 12, 16, 20, 24, 9999] as const;

export const config = {
  backgrounds: colorsLight,
  borders: {
    colors: colorsLight,
    radius: radiusScale,
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
