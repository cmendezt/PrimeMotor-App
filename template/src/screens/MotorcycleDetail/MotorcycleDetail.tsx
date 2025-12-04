/**
 * MotorcycleDetail Screen
 * Displays full motorcycle information with image carousel,
 * specifications, battery options, features, and purchase actions
 */

import React, { useMemo, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
  FlatList,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useQuery } from '@tanstack/react-query';
import { useNavigation, useRoute, type RouteProp } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { useTheme } from '@/theme';
import type { Colors } from '@/theme/types/colors';
import { GradientBackground } from '@/components/molecules/GradientBackground';
import { GlassCard } from '@/components/atoms/GlassCard';
import { Button } from '@/components/atoms/Button';
import { getMotorcycleWithImages } from '@/services/supabase/motorcycles';
import { Paths } from '@/navigation/paths';
import type { RootStackParamList } from '@/navigation/types';
import type { MotorcycleWithImages, MotorcycleSpecifications, BatteryOption } from '@/types/motorcycle.types';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

type RouteProps = RouteProp<RootStackParamList, typeof Paths.MotorcycleDetail>;

// Spec label translations
const SPEC_LABELS: Record<string, string> = {
  potencia: 'Potencia',
  cargador: 'Cargador',
  autonomia: 'Autonomia',
  velocidadMaxima: 'Velocidad Maxima',
  capacidadCarga: 'Capacidad de Carga',
  peso: 'Peso',
  tipoLlanta: 'Tipo de Llanta',
  tiempoCarga: 'Tiempo de Carga',
  categoria: 'Categoria',
};

// Spec icons mapping
const SPEC_ICONS: Record<string, string> = {
  potencia: 'bolt',
  cargador: 'power',
  autonomia: 'route',
  velocidadMaxima: 'speed',
  capacidadCarga: 'fitness-center',
  peso: 'scale',
  tipoLlanta: 'tire-repair',
  tiempoCarga: 'schedule',
  categoria: 'category',
};

export const MotorcycleDetail = () => {
  const { colors, shadows } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const navigation = useNavigation();
  const route = useRoute<RouteProps>();
  const { motorcycleId } = route.params;

  const { data, isLoading, error } = useQuery({
    queryKey: ['motorcycle', motorcycleId],
    queryFn: () => getMotorcycleWithImages(motorcycleId),
  });

  const motorcycle = data?.data as MotorcycleWithImages | null;
  const specifications = motorcycle?.specifications as MotorcycleSpecifications | null;

  const handleGoBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleFavoritePress = useCallback(() => {
    // TODO: Implement favorite toggle
    console.log('Toggle favorite for:', motorcycleId);
  }, [motorcycleId]);

  const handleContactPress = useCallback(() => {
    // TODO: Implement contact/quote action
    console.log('Contact for:', motorcycleId);
  }, [motorcycleId]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const getImages = () => {
    if (motorcycle?.images && motorcycle.images.length > 0) {
      return motorcycle.images.sort((a, b) => {
        if (a.is_primary) return -1;
        if (b.is_primary) return 1;
        return (a.display_order || 0) - (b.display_order || 0);
      });
    }
    return [];
  };

  const images = getImages();

  // Get battery options (can be single or array)
  const getBatteryOptions = (): BatteryOption[] => {
    if (!specifications?.bateria) return [];
    return Array.isArray(specifications.bateria)
      ? specifications.bateria
      : [specifications.bateria];
  };

  const batteryOptions = getBatteryOptions();

  // Get charger options (can be single or array)
  const getChargerOptions = (): string[] => {
    if (!specifications?.cargador) return [];
    return Array.isArray(specifications.cargador)
      ? specifications.cargador
      : [specifications.cargador];
  };

  const chargerOptions = getChargerOptions();

  // Get features array
  const features = motorcycle?.features as string[] | null;

  if (isLoading) {
    return (
      <GradientBackground>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={styles.loadingText}>Cargando detalles...</Text>
        </View>
      </GradientBackground>
    );
  }

  if (error || !motorcycle) {
    return (
      <GradientBackground>
        <View style={styles.errorContainer}>
          <MaterialIcons name="error-outline" size={64} color={colors.textMuted} />
          <Text style={styles.errorText}>No se pudo cargar la informacion</Text>
          <Button title="Volver" onPress={handleGoBack} variant="primary" />
        </View>
      </GradientBackground>
    );
  }

  const renderImageItem = ({ item }: { item: any }) => (
    <View style={styles.imageSlide}>
      <Image
        source={{ uri: item.image_url }}
        style={styles.motorcycleImage}
        resizeMode="cover"
      />
    </View>
  );

  return (
    <GradientBackground>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Image Carousel */}
        <View style={styles.carouselContainer}>
          {images.length > 0 ? (
            <FlatList
              data={images}
              renderItem={renderImageItem}
              keyExtractor={(item) => item.id}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              style={styles.carousel}
            />
          ) : (
            <View style={[styles.imageSlide, styles.placeholderImage]}>
              <MaterialIcons name="directions-bike" size={80} color={colors.textMuted} />
            </View>
          )}

          {/* Back Button */}
          <TouchableOpacity
            style={[styles.backButton, shadows.soft]}
            onPress={handleGoBack}
            activeOpacity={0.8}
          >
            <MaterialIcons name="arrow-back" size={24} color={colors.textPrimary} />
          </TouchableOpacity>

          {/* Favorite Button */}
          <TouchableOpacity
            style={[styles.favoriteButton, shadows.soft]}
            onPress={handleFavoritePress}
            activeOpacity={0.8}
          >
            <MaterialIcons name="favorite-border" size={24} color={colors.primary} />
          </TouchableOpacity>

          {/* Image Counter */}
          {images.length > 1 && (
            <View style={styles.imageCounter}>
              <Text style={styles.imageCounterText}>
                1 / {images.length}
              </Text>
            </View>
          )}
        </View>

        {/* Header Info */}
        <View style={styles.headerSection}>
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryText}>
              {specifications?.categoria || motorcycle.type === 'electric' ? 'Electrico' : 'Gasolina'}
            </Text>
          </View>
          <Text style={styles.motorcycleName}>{motorcycle.name}</Text>
          <Text style={styles.motorcycleBrand}>{motorcycle.brand}</Text>
          <Text style={styles.motorcyclePrice}>{formatPrice(motorcycle.price)}</Text>
        </View>

        {/* Battery Options */}
        {batteryOptions.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              {batteryOptions.length > 1 ? 'Opciones de Bateria' : 'Bateria'}
            </Text>
            {batteryOptions.map((battery, index) => (
              <GlassCard key={index} style={styles.batteryCard}>
                <View style={styles.batteryHeader}>
                  <LinearGradient
                    colors={[colors.primary, colors.secondary]}
                    style={styles.batteryIconContainer}
                  >
                    <MaterialIcons name="battery-charging-full" size={24} color="#FFFFFF" />
                  </LinearGradient>
                  <Text style={styles.batteryTitle}>
                    {batteryOptions.length > 1 ? `Opcion ${index + 1}` : 'Especificaciones'}
                  </Text>
                </View>
                <View style={styles.batterySpecs}>
                  <View style={styles.specRow}>
                    <Text style={styles.specLabel}>Voltaje</Text>
                    <Text style={styles.specValue}>{battery.voltaje}</Text>
                  </View>
                  <View style={styles.specRow}>
                    <Text style={styles.specLabel}>Amperaje</Text>
                    <Text style={styles.specValue}>{battery.amperaje}</Text>
                  </View>
                  {battery.autonomia && (
                    <View style={styles.specRow}>
                      <Text style={styles.specLabel}>Autonomia</Text>
                      <Text style={styles.specValue}>{battery.autonomia}</Text>
                    </View>
                  )}
                  {(battery as any).extraible !== undefined && (
                    <View style={styles.specRow}>
                      <Text style={styles.specLabel}>Extraible</Text>
                      <Text style={styles.specValue}>
                        {(battery as any).extraible ? 'Si' : 'No'}
                      </Text>
                    </View>
                  )}
                </View>
              </GlassCard>
            ))}
          </View>
        )}

        {/* Technical Specifications */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Especificaciones Tecnicas</Text>
          <GlassCard style={styles.specsCard}>
            {Object.entries(SPEC_LABELS).map(([key, label]) => {
              const value = specifications?.[key];
              // Skip battery and cargador (shown separately) and empty values
              if (key === 'bateria' || !value) return null;

              // Handle cargador array
              if (key === 'cargador') {
                return (
                  <View key={key} style={styles.specItem}>
                    <View style={styles.specIconContainer}>
                      <MaterialIcons
                        name={SPEC_ICONS[key] || 'info'}
                        size={20}
                        color={colors.primary}
                      />
                    </View>
                    <View style={styles.specContent}>
                      <Text style={styles.specItemLabel}>{label}</Text>
                      <Text style={styles.specItemValue}>
                        {chargerOptions.join(' / ')}
                      </Text>
                    </View>
                  </View>
                );
              }

              return (
                <View key={key} style={styles.specItem}>
                  <View style={styles.specIconContainer}>
                    <MaterialIcons
                      name={SPEC_ICONS[key] || 'info'}
                      size={20}
                      color={colors.primary}
                    />
                  </View>
                  <View style={styles.specContent}>
                    <Text style={styles.specItemLabel}>{label}</Text>
                    <Text style={styles.specItemValue}>{String(value)}</Text>
                  </View>
                </View>
              );
            })}
          </GlassCard>
        </View>

        {/* Features */}
        {features && features.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Caracteristicas</Text>
            <GlassCard style={styles.featuresCard}>
              {features.map((feature, index) => (
                <View key={index} style={styles.featureItem}>
                  <MaterialIcons name="check-circle" size={20} color={colors.primary} />
                  <Text style={styles.featureText}>{feature}</Text>
                </View>
              ))}
            </GlassCard>
          </View>
        )}

        {/* Description */}
        {motorcycle.description && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Descripcion</Text>
            <GlassCard style={styles.descriptionCard}>
              <Text style={styles.descriptionText}>{motorcycle.description}</Text>
            </GlassCard>
          </View>
        )}

        {/* CTA Section */}
        <View style={styles.ctaSection}>
          <Button
            title="Solicitar Cotizacion"
            onPress={handleContactPress}
            variant="primary"
            size="large"
          />
          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={handleContactPress}
            activeOpacity={0.7}
          >
            <MaterialIcons name="chat" size={20} color={colors.primary} />
            <Text style={styles.secondaryButtonText}>Contactar Asesor</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </GradientBackground>
  );
};

const createStyles = (colors: Colors) =>
  StyleSheet.create({
    scrollView: {
      flex: 1,
    },
    scrollContent: {
      paddingBottom: 100,
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      gap: 16,
    },
    loadingText: {
      fontSize: 16,
      color: colors.textMuted,
    },
    errorContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      gap: 16,
      padding: 32,
    },
    errorText: {
      fontSize: 16,
      color: colors.textMuted,
      textAlign: 'center',
    },
    carouselContainer: {
      position: 'relative',
      height: 300,
    },
    carousel: {
      flex: 1,
    },
    imageSlide: {
      width: SCREEN_WIDTH,
      height: 300,
    },
    motorcycleImage: {
      width: '100%',
      height: '100%',
    },
    placeholderImage: {
      backgroundColor: colors.glassBgMedium,
      justifyContent: 'center',
      alignItems: 'center',
    },
    backButton: {
      position: 'absolute',
      top: 48,
      left: 16,
      width: 44,
      height: 44,
      borderRadius: 22,
      backgroundColor: colors.glassBgDark,
      justifyContent: 'center',
      alignItems: 'center',
    },
    favoriteButton: {
      position: 'absolute',
      top: 48,
      right: 16,
      width: 44,
      height: 44,
      borderRadius: 22,
      backgroundColor: colors.glassBgDark,
      justifyContent: 'center',
      alignItems: 'center',
    },
    imageCounter: {
      position: 'absolute',
      bottom: 16,
      right: 16,
      backgroundColor: 'rgba(0,0,0,0.6)',
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 12,
    },
    imageCounterText: {
      color: '#FFFFFF',
      fontSize: 12,
      fontWeight: '600',
    },
    headerSection: {
      padding: 16,
    },
    categoryBadge: {
      backgroundColor: colors.primary,
      alignSelf: 'flex-start',
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 8,
      marginBottom: 12,
    },
    categoryText: {
      color: '#FFFFFF',
      fontSize: 12,
      fontWeight: '600',
      textTransform: 'uppercase',
    },
    motorcycleName: {
      fontSize: 28,
      fontWeight: '700',
      color: colors.textPrimary,
      marginBottom: 4,
    },
    motorcycleBrand: {
      fontSize: 16,
      color: colors.textMuted,
      marginBottom: 8,
    },
    motorcyclePrice: {
      fontSize: 26,
      fontWeight: '700',
      color: colors.primary,
      letterSpacing: 0.5,
    },
    section: {
      paddingHorizontal: 16,
      marginBottom: 24,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: '700',
      color: colors.textPrimary,
      marginBottom: 12,
    },
    batteryCard: {
      marginBottom: 12,
    },
    batteryHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
      marginBottom: 16,
    },
    batteryIconContainer: {
      width: 44,
      height: 44,
      borderRadius: 12,
      justifyContent: 'center',
      alignItems: 'center',
    },
    batteryTitle: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.textPrimary,
    },
    batterySpecs: {
      gap: 8,
    },
    specRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 4,
    },
    specLabel: {
      fontSize: 14,
      color: colors.textMuted,
    },
    specValue: {
      fontSize: 14,
      fontWeight: '600',
      color: colors.textPrimary,
    },
    specsCard: {
      gap: 12,
    },
    specItem: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
    },
    specIconContainer: {
      width: 36,
      height: 36,
      borderRadius: 8,
      backgroundColor: colors.glassBgMedium,
      justifyContent: 'center',
      alignItems: 'center',
    },
    specContent: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    specItemLabel: {
      fontSize: 14,
      color: colors.textMuted,
    },
    specItemValue: {
      fontSize: 14,
      fontWeight: '600',
      color: colors.textPrimary,
    },
    featuresCard: {
      gap: 12,
    },
    featureItem: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      gap: 12,
    },
    featureText: {
      flex: 1,
      fontSize: 14,
      color: colors.textSecondary,
      lineHeight: 20,
    },
    descriptionCard: {},
    descriptionText: {
      fontSize: 14,
      color: colors.textSecondary,
      lineHeight: 22,
    },
    ctaSection: {
      paddingHorizontal: 16,
      gap: 12,
    },
    secondaryButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
      paddingVertical: 14,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: colors.primary,
    },
    secondaryButtonText: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.primary,
    },
  });

export default MotorcycleDetail;
