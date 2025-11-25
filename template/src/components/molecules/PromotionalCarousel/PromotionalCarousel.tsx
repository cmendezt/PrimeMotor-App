/**
 * PromotionalCarousel Component
 * Horizontal carousel for promotional banners
 * Design: explorar_motocicletas_1
 */

import React, { useMemo } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useTheme } from '@/theme';
import type { Colors } from '@/theme/types/colors';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.72;
const CARD_MARGIN = 12;

export interface PromotionalItem {
  id: string;
  title: string;
  subtitle: string;
  imageUrl: string;
  onPress?: () => void;
}

export interface PromotionalCarouselProps {
  items: PromotionalItem[];
}

// Default promotional items
const DEFAULT_PROMOTIONS: PromotionalItem[] = [
  {
    id: 'promo-electric',
    title: 'Nueva Scrambler Eléctrica',
    subtitle: 'Descubre el futuro de la movilidad',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDR5Wkx4NRZsXufA3Tnrked_p8TK1DS23-hdd_EWkipZHq1D8kVdGcEgYnj0o6FYqVsKBvQiy0tzX6u5WLtlwc4f-yiEwWpt0YJTachC_5SlO64Xwe3DN1Cf0uQeKV0t6xeWgHrjh60XOal3pjTnKDT2dU82h4bov7wGPy8-7bSfKQe6_l5OYOlA34wAXgtI9oRl2o2PCVT-0OS9xUPkdpuPYSR_xZOJdE8GNyrQ3CQYIhqP-vBPYOVw0218c3OO4qWg0QVf3GAmE60',
  },
  {
    id: 'promo-touring',
    title: 'Potencia y Libertad sin Límites',
    subtitle: 'Domina cada curva del camino',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBvktmdkqkbhxdigqDw3HRGbN-wAsZmmoMbBQZuQZHryxoXVppITBSCpCMpaOnJOJ_XeTSVqEPcepcrIQIeX_gQd2PSyqOQGgsfUfOt2yhbzXcDnoy2efyJzv1aalgWY5FDCZBxJpAe-tgbi9JuA-zDrr0R6ivP8mFKPILV-W677Sic2cq-N1emV8BIGP27dXjV1EG26qmfE5HhewSizhLGv5rsPsDKuFUYmMA4vQQnut_35hQsDn-wRhsuOeY0yK1ft0pA18IcOm6Y',
  },
  {
    id: 'promo-insurance',
    title: '20% de descuento en seguros',
    subtitle: 'Conduce con protección total',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuD06yMUPkCKu3pWrbEfIUgS3QvkJlL7pQ5iWnHqSqZEfIife0nUo6evqPTDvDR6UhtlsTw9VITGzevmMnjcxvNvbrj8Exzm98x60uih0GWofe_dZMVQ4wMY4vncvxjWgGztK8-xixeP2hD8-PjVh4B8NFUkUFp6q5zkwAjE0_5Bfd0-s9WWZg_secn3RJyoeuo7YYOhkLbBdDeYo72OByZAMEOFGuzZH-lB8NpYap2S0V9lu8Ix1I-3IuAxfoTzIX9oVnB5REfNifvO',
  },
];

export const PromotionalCarousel: React.FC<PromotionalCarouselProps> = ({
  items = DEFAULT_PROMOTIONS,
}) => {
  const { colors, shadows } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      snapToInterval={CARD_WIDTH + CARD_MARGIN}
      decelerationRate="fast"
      contentContainerStyle={styles.scrollContent}
    >
      {items.map((item) => (
        <TouchableOpacity
          key={item.id}
          style={[styles.card, shadows.softLg]}
          onPress={item.onPress}
          activeOpacity={0.9}
        >
          {/* Image */}
          <Image
            source={{ uri: item.imageUrl }}
            style={styles.image}
            resizeMode="cover"
          />

          {/* Gradient Overlay */}
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.4)', 'rgba(0,0,0,0.7)']}
            style={styles.gradient}
          />

          {/* Content */}
          <View style={styles.content}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.subtitle}>{item.subtitle}</Text>
          </View>

          {/* Holographic border effect */}
          <View style={styles.holographicBorder} />
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const createStyles = (colors: Colors) =>
  StyleSheet.create({
    scrollContent: {
      paddingHorizontal: 16,
      gap: CARD_MARGIN,
    },
    card: {
      width: CARD_WIDTH,
      aspectRatio: 16 / 9,
      borderRadius: 12,
      overflow: 'hidden',
      position: 'relative',
    },
    image: {
      width: '100%',
      height: '100%',
    },
    gradient: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      height: '70%',
    },
    content: {
      position: 'absolute',
      bottom: 12,
      left: 12,
      right: 12,
    },
    title: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.textPrimary,
      marginBottom: 4,
    },
    subtitle: {
      fontSize: 14,
      color: 'rgba(255, 255, 255, 0.8)',
    },
    holographicBorder: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: 'rgba(255, 100, 0, 0.3)',
    },
  });

export default PromotionalCarousel;
