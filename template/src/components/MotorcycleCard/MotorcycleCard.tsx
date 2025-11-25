/**
 * MotorcycleCard Component
 * Displays a motorcycle with image, name, price, and key specs
 */

import React, { useMemo } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import type { Motorcycle } from '@/types/motorcycle.types';
import { useTheme } from '@/theme';
import type { Colors } from '@/theme/types/colors';

interface MotorcycleCardProps {
  motorcycle: Motorcycle;
  onPress?: (motorcycle: Motorcycle) => void;
}

export const MotorcycleCard: React.FC<MotorcycleCardProps> = ({ motorcycle, onPress }) => {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const getTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      electric: 'Eléctrica',
      sport: 'Deportiva',
      cruiser: 'Crucero',
      touring: 'Turismo',
      naked: 'Naked',
      adventure: 'Aventura',
      scooter: 'Scooter',
      gasoline: 'Gasolina',
    };
    return labels[type] || type;
  };

  // Get primary image or first image
  const getImageUrl = () => {
    const motorcycleWithImages = motorcycle as any;
    if (motorcycleWithImages.images && motorcycleWithImages.images.length > 0) {
      const primaryImage = motorcycleWithImages.images.find((img: any) => img.is_primary);
      return primaryImage?.image_url || motorcycleWithImages.images[0].image_url;
    }
    return 'https://via.placeholder.com/300x200?text=Motorcycle';
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => onPress?.(motorcycle)}
      activeOpacity={0.7}
    >
      {/* Image */}
      <View style={styles.imageContainer}>
        {motorcycle.discount_percentage && motorcycle.discount_percentage > 0 && (
          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>-{motorcycle.discount_percentage}%</Text>
          </View>
        )}
        <Image
          source={{
            uri: getImageUrl(),
          }}
          style={styles.image}
          resizeMode="cover"
        />
      </View>

      {/* Content */}
      <View style={styles.content}>
        {/* Brand & Type */}
        <View style={styles.header}>
          <Text style={styles.brand}>{motorcycle.brand}</Text>
          <View style={styles.typeBadge}>
            <Text style={styles.typeText}>{getTypeLabel(motorcycle.type)}</Text>
          </View>
        </View>

        {/* Name */}
        <Text style={styles.name} numberOfLines={2}>
          {motorcycle.name}
        </Text>

        {/* Specs */}
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
          {motorcycle.condition && (
            <>
              <Text style={styles.specDivider}>•</Text>
              <Text style={styles.specText}>
                {motorcycle.condition === 'new' ? 'Nueva' : 'Usada'}
              </Text>
            </>
          )}
        </View>

        {/* Price */}
        <Text style={styles.price}>{formatPrice(motorcycle.price)}</Text>
      </View>
    </TouchableOpacity>
  );
};

const createStyles = (colors: Colors) =>
  StyleSheet.create({
    container: {
      backgroundColor: colors.bgCard,
      borderRadius: 12,
      overflow: 'hidden',
      marginBottom: 16,
      borderWidth: 1,
      borderColor: colors.bgSurface,
    },
    imageContainer: {
      width: '100%',
      height: 200,
      position: 'relative',
    },
    image: {
      width: '100%',
      height: '100%',
    },
    discountBadge: {
      position: 'absolute',
      top: 12,
      right: 12,
      backgroundColor: colors.primary,
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 8,
      zIndex: 1,
    },
    discountText: {
      color: colors.textPrimary,
      fontSize: 14,
      fontWeight: '700',
    },
    content: {
      padding: 16,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 8,
    },
    brand: {
      fontSize: 14,
      fontWeight: '600',
      color: colors.primary,
      textTransform: 'uppercase',
    },
    typeBadge: {
      backgroundColor: colors.bgSurface,
      paddingHorizontal: 10,
      paddingVertical: 4,
      borderRadius: 6,
    },
    typeText: {
      fontSize: 12,
      color: colors.textSecondary,
    },
    name: {
      fontSize: 18,
      fontWeight: '700',
      color: colors.textPrimary,
      marginBottom: 8,
    },
    specs: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 12,
    },
    specText: {
      fontSize: 13,
      color: colors.textSecondary,
    },
    specDivider: {
      fontSize: 13,
      color: colors.textMuted,
      marginHorizontal: 8,
    },
    price: {
      fontSize: 24,
      fontWeight: '700',
      color: colors.textPrimary,
    },
  });
