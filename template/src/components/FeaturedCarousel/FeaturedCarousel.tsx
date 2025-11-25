/**
 * FeaturedCarousel Component
 * Horizontal carousel of featured motorcycles (Hero Carousel)
 */

import React, { useMemo } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet, Dimensions } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import type { Motorcycle } from '@/types/motorcycle.types';
import { useTheme } from '@/theme';
import type { Colors } from '@/theme/types/colors';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.85;
const CARD_MARGIN = 16;

interface FeaturedCarouselProps {
  motorcycles: Motorcycle[];
  onPressMotorcycle?: (motorcycle: Motorcycle) => void;
}

export const FeaturedCarousel: React.FC<FeaturedCarouselProps> = ({
  motorcycles,
  onPressMotorcycle,
}) => {
  const { colors, shadows } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const getImageUrl = (motorcycle: Motorcycle) => {
    const motorcycleWithImages = motorcycle as any;
    if (motorcycleWithImages.images && motorcycleWithImages.images.length > 0) {
      const primaryImage = motorcycleWithImages.images.find((img: any) => img.is_primary);
      return primaryImage?.image_url || motorcycleWithImages.images[0].image_url;
    }
    return 'https://via.placeholder.com/600x400?text=Featured+Motorcycle';
  };

  if (motorcycles.length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <MaterialIcons name="star" size={22} color={colors.primary} />
        <Text style={styles.title}>Destacados</Text>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={CARD_WIDTH + CARD_MARGIN}
        decelerationRate="fast"
        contentContainerStyle={styles.scrollContent}
      >
        {motorcycles.map((motorcycle) => (
          <TouchableOpacity
            key={motorcycle.id}
            style={[styles.card, shadows.card]}
            onPress={() => onPressMotorcycle?.(motorcycle)}
            activeOpacity={0.9}
          >
            {/* Image Background */}
            <View style={styles.imageContainer}>
              <Image
                source={{ uri: getImageUrl(motorcycle) }}
                style={styles.image}
                resizeMode="cover"
              />
              <LinearGradient
                colors={['transparent', 'rgba(0,0,0,0.7)', 'rgba(0,0,0,0.95)']}
                style={styles.gradient}
              />
            </View>

            {/* Content Overlay */}
            <View style={styles.content}>
              <View style={[styles.badge, shadows.glowOrangeSmall]}>
                <Text style={styles.badgeText}>DESTACADO</Text>
              </View>

              <View style={styles.info}>
                <Text style={styles.brand}>{motorcycle.brand}</Text>
                <Text style={styles.name} numberOfLines={2}>
                  {motorcycle.name}
                </Text>

                <View style={styles.specs}>
                  {motorcycle.year && (
                    <Text style={styles.specText}>{motorcycle.year}</Text>
                  )}
                  {motorcycle.engine_size && (
                    <>
                      <Text style={styles.specDivider}>•</Text>
                      <Text style={styles.specText}>{motorcycle.engine_size}cc</Text>
                    </>
                  )}
                </View>

                <Text style={styles.price}>{formatPrice(motorcycle.price)}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const createStyles = (colors: Colors) =>
  StyleSheet.create({
    container: {
      marginBottom: 24,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 20,
      marginBottom: 16,
      gap: 8,
    },
    title: {
      fontSize: 22,
      fontWeight: '700',
      color: colors.textPrimary,
    },
    scrollContent: {
      paddingHorizontal: 20,
      gap: CARD_MARGIN,
    },
    card: {
      width: CARD_WIDTH,
      height: 280,
      borderRadius: 16,
      overflow: 'hidden',
      backgroundColor: colors.bgCard,
      borderWidth: 1,
      borderColor: colors.glassBorder,
    },
    imageContainer: {
      width: '100%',
      height: '100%',
      position: 'absolute',
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
      flex: 1,
      justifyContent: 'space-between',
      padding: 20,
    },
    badge: {
      alignSelf: 'flex-start',
      backgroundColor: colors.primary,
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 8,
    },
    badgeText: {
      color: colors.textPrimary,
      fontSize: 12,
      fontWeight: '700',
    },
    info: {
      gap: 4,
    },
    brand: {
      fontSize: 14,
      fontWeight: '600',
      color: colors.primary,
      textTransform: 'uppercase',
    },
    name: {
      fontSize: 24,
      fontWeight: '700',
      color: colors.textPrimary,
      marginBottom: 4,
    },
    specs: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 8,
    },
    specText: {
      fontSize: 14,
      color: colors.textSecondary,
    },
    specDivider: {
      fontSize: 14,
      color: colors.textMuted,
      marginHorizontal: 8,
    },
    price: {
      fontSize: 28,
      fontWeight: '700',
      color: colors.textPrimary,
    },
  });
