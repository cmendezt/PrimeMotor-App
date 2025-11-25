/**
 * FeaturedCarousel Component
 * Horizontal carousel of featured motorcycles
 */

import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet, Dimensions } from 'react-native';
import type { Motorcycle } from '@/types/motorcycle.types';

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
        <Text style={styles.title}>⭐ Destacados</Text>
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
            style={styles.card}
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
              <View style={styles.gradient} />
            </View>

            {/* Content Overlay */}
            <View style={styles.content}>
              <View style={styles.badge}>
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

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  header: {
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#FFFFFF',
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
    backgroundColor: '#1A1A1A',
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
    backgroundColor: 'linear-gradient(transparent, rgba(0,0,0,0.9))',
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 20,
  },
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: '#FF4500',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  info: {
    gap: 4,
  },
  brand: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FF4500',
    textTransform: 'uppercase',
  },
  name: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  specs: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  specText: {
    fontSize: 14,
    color: '#CCCCCC',
  },
  specDivider: {
    fontSize: 14,
    color: '#888888',
    marginHorizontal: 8,
  },
  price: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});
