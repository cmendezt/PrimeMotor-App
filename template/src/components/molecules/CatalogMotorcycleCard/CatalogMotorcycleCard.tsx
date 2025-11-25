/**
 * CatalogMotorcycleCard Component
 * Grid card for catalog view with favorite toggle
 * Design: explorar_motocicletas_1
 */

import React, { useMemo } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '@/theme';
import type { Colors } from '@/theme/types/colors';
import type { Motorcycle } from '@/types/motorcycle.types';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 48) / 2; // 2 columns with padding

export interface CatalogMotorcycleCardProps {
  motorcycle: Motorcycle;
  isFavorite?: boolean;
  onPress?: () => void;
  onFavoriteToggle?: () => void;
}

export const CatalogMotorcycleCard: React.FC<CatalogMotorcycleCardProps> = ({
  motorcycle,
  isFavorite = false,
  onPress,
  onFavoriteToggle,
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

  const getImageUrl = () => {
    const motorcycleWithImages = motorcycle as any;
    if (motorcycleWithImages.images && motorcycleWithImages.images.length > 0) {
      const primaryImage = motorcycleWithImages.images.find(
        (img: any) => img.is_primary
      );
      return primaryImage?.image_url || motorcycleWithImages.images[0].image_url;
    }
    return 'https://via.placeholder.com/300x300?text=Motorcycle';
  };

  // Electric motorcycles get primary color price, gasoline gets secondary
  const isElectric = motorcycle.type === 'electric';

  return (
    <TouchableOpacity
      style={[styles.container, shadows.soft]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      {/* Image Container */}
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: getImageUrl() }}
          style={styles.image}
          resizeMode="cover"
        />

        {/* Favorite Button */}
        <TouchableOpacity
          style={styles.favoriteButton}
          onPress={onFavoriteToggle}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <MaterialIcons
            name={isFavorite ? 'favorite' : 'favorite-border'}
            size={20}
            color={isFavorite ? colors.primary : colors.textPrimary}
          />
        </TouchableOpacity>
      </View>

      {/* Content */}
      <View style={styles.content}>
        <Text style={styles.name} numberOfLines={1}>
          {motorcycle.name}
        </Text>
        <Text
          style={[
            styles.price,
            isElectric ? styles.priceElectric : styles.priceGasoline,
          ]}
        >
          {formatPrice(motorcycle.price)}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const createStyles = (colors: Colors) =>
  StyleSheet.create({
    container: {
      width: CARD_WIDTH,
      backgroundColor: colors.glassBg,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: colors.glassBorder,
      padding: 10,
      gap: 8,
    },
    imageContainer: {
      width: '100%',
      aspectRatio: 1,
      borderRadius: 8,
      overflow: 'hidden',
      position: 'relative',
    },
    image: {
      width: '100%',
      height: '100%',
    },
    favoriteButton: {
      position: 'absolute',
      top: 8,
      right: 8,
      width: 32,
      height: 32,
      borderRadius: 16,
      backgroundColor: 'rgba(0, 0, 0, 0.3)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    content: {
      paddingHorizontal: 4,
      gap: 4,
    },
    name: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.textPrimary,
    },
    price: {
      fontSize: 14,
      fontWeight: '700',
    },
    priceElectric: {
      color: colors.primary,
    },
    priceGasoline: {
      color: colors.textSecondary,
    },
  });

export default CatalogMotorcycleCard;
