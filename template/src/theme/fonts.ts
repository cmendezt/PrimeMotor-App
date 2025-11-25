import type { UnionConfiguration } from '@/theme/types/config';
import type { FontColors, FontSizes } from '@/theme/types/fonts';
import type { TextStyle } from 'react-native';

import { config } from '@/theme/_config';

export const generateFontColors = (configuration: UnionConfiguration) => {
  // eslint-disable-next-line unicorn/no-array-reduce
  return Object.entries(configuration.fonts.colors).reduce<FontColors>(
    (accumulator, [key, value]) => {
      return Object.assign(accumulator, {
        [key]: {
          color: value,
        },
      });
    },
    {} as FontColors,
  );
};

export const generateFontSizes = () => {
  // eslint-disable-next-line unicorn/no-array-reduce
  return config.fonts.sizes.reduce<FontSizes>((accumulator, size) => {
    return Object.assign(accumulator, {
      [`size_${size}`]: {
        fontSize: size,
      },
    });
  }, {} as FontSizes);
};

export const staticFontStyles = {
  // Text alignment
  alignCenter: {
    textAlign: 'center',
  },
  alignLeft: {
    textAlign: 'left',
  },
  alignRight: {
    textAlign: 'right',
  },

  // Text transforms
  bold: {
    fontWeight: 'bold',
  },
  capitalize: {
    textTransform: 'capitalize',
  },
  uppercase: {
    textTransform: 'uppercase',
  },

  // Font weights (from Stitch designs: Inter 400-800)
  weight400: {
    fontWeight: '400',
  },
  weight500: {
    fontWeight: '500',
  },
  weight600: {
    fontWeight: '600',
  },
  weight700: {
    fontWeight: '700',
  },
  weight800: {
    fontWeight: '800',
  },

  // Typography presets (from Stitch designs)
  heading1: {
    fontSize: 32,
    fontWeight: '700',
    lineHeight: 40,
    letterSpacing: -0.5,
  },
  heading2: {
    fontSize: 24,
    fontWeight: '700',
    lineHeight: 32,
    letterSpacing: -0.3,
  },
  heading3: {
    fontSize: 20,
    fontWeight: '700',
    lineHeight: 28,
  },
  heading4: {
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 24,
  },
  body: {
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
  },
  bodyMedium: {
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 24,
  },
  bodySemibold: {
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 24,
  },
  bodySmall: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 20,
  },
  bodySmallMedium: {
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 20,
  },
  caption: {
    fontSize: 12,
    fontWeight: '500',
    lineHeight: 16,
  },
  captionSmall: {
    fontSize: 10,
    fontWeight: '600',
    lineHeight: 14,
  },
  button: {
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  buttonSmall: {
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
  chip: {
    fontSize: 14,
    fontWeight: '600',
  },
  price: {
    fontSize: 24,
    fontWeight: '700',
  },
  priceLarge: {
    fontSize: 28,
    fontWeight: '700',
  },
  priceSmall: {
    fontSize: 18,
    fontWeight: '700',
  },
} as const satisfies Record<string, TextStyle>;
