/**
 * Home Screen
 * Main screen with hero carousel, service shortcuts, and promotions
 * Design: explorar_motocicletas_2
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
  RefreshControl,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import { useQuery } from '@tanstack/react-query';
import { useTheme } from '@/theme';
import type { Colors } from '@/theme/types/colors';
import { GradientBackground } from '@/components/molecules/GradientBackground';
import { Header } from '@/components/molecules/Header';
import { ServiceIconGrid, type ServiceItem } from '@/components/molecules/ServiceIconGrid';
import { GlassCard } from '@/components/atoms/GlassCard';
import { Button } from '@/components/atoms/Button';
import { getMotorcycles, getFeaturedMotorcycles } from '@/services/supabase/motorcycles';
import { Paths } from '@/navigation/paths';
import type { RootStackParamList } from '@/navigation/types';
import type { Motorcycle } from '@/types/motorcycle.types';

type NavigationProp = StackNavigationProp<RootStackParamList>;

const SERVICE_ITEMS: ServiceItem[] = [
  { id: 'maintenance', icon: 'build-circle', label: 'Agendar Mantenimiento' },
  { id: 'insurance', icon: 'admin-panel-settings', label: 'Cotizar Seguros' },
  { id: 'roadside', icon: 'sos', label: 'Solicitar Asistencia' },
];

export const Home = () => {
  const { colors, shadows } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const navigation = useNavigation<NavigationProp>();

  // Fetch featured motorcycles
  const { data: featuredData } = useQuery({
    queryKey: ['motorcycles', 'featured'],
    queryFn: getFeaturedMotorcycles,
  });

  // Fetch all motorcycles (for count)
  const {
    isLoading,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ['motorcycles', 'all'],
    queryFn: () => getMotorcycles({}),
  });

  const featuredMoto = featuredData?.data?.[0];

  const handleServicePress = useCallback((serviceId: string) => {
    console.log('Service pressed:', serviceId);
    // TODO: Navigate to service screen
  }, []);

  const handleCatalogPress = useCallback(() => {
    navigation.navigate(Paths.MainTabs, { screen: Paths.Catalog });
  }, [navigation]);

  const handleFeaturedPress = useCallback((motorcycle: Motorcycle) => {
    navigation.navigate(Paths.MotorcycleDetail, { motorcycleId: motorcycle.id });
  }, [navigation]);

  const handleNotificationPress = () => {
    console.log('Notifications pressed');
    // TODO: Show notifications
  };

  const handleMenuPress = () => {
    console.log('Menu pressed');
    // TODO: Open drawer
  };

  const getImageUrl = (motorcycle: Motorcycle) => {
    const motorcycleWithImages = motorcycle as any;
    if (motorcycleWithImages.images && motorcycleWithImages.images.length > 0) {
      const primaryImage = motorcycleWithImages.images.find((img: any) => img.is_primary);
      return primaryImage?.image_url || motorcycleWithImages.images[0].image_url;
    }
    return 'https://via.placeholder.com/600x400?text=Featured+Motorcycle';
  };

  return (
    <GradientBackground variant="home">
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={isFetching && !isLoading}
            onRefresh={refetch}
            tintColor={colors.primary}
            colors={[colors.primary]}
          />
        }
      >
        {/* Header */}
        <Header
          showLogo
          showMenu
          showNotifications
          onMenuPress={handleMenuPress}
          onNotificationPress={handleNotificationPress}
        />

        {/* Hero Title */}
        <Text style={styles.heroTitle}>Tu Próxima Aventura</Text>

        {/* Hero Card */}
        {featuredMoto ? (
          <View style={styles.heroContainer}>
            <TouchableOpacity
              style={[styles.heroCard, shadows.softLg]}
              activeOpacity={0.9}
              onPress={() => handleFeaturedPress(featuredMoto)}
            >
              <Image
                source={{ uri: getImageUrl(featuredMoto) }}
                style={styles.heroImage}
                resizeMode="cover"
              />
              <LinearGradient
                colors={['transparent', 'rgba(0,0,0,0.8)']}
                style={styles.heroGradient}
              />
              <View style={styles.heroContent}>
                <Text style={styles.heroName}>{featuredMoto.name}</Text>
                <Text style={styles.heroSubtitle}>La revolucion electrica ha llegado.</Text>
              </View>
            </TouchableOpacity>
          </View>
        ) : isLoading ? (
          <View style={styles.heroLoading}>
            <ActivityIndicator size="large" color={colors.primary} />
          </View>
        ) : null}

        {/* Services Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Servicios Esenciales</Text>
          <ServiceIconGrid
            services={SERVICE_ITEMS}
            onServicePress={handleServicePress}
            columns={3}
          />
        </View>

        {/* Promotions Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Promociones</Text>

          <GlassCard style={styles.promoCard}>
            <View style={styles.promoRow}>
              <LinearGradient
                colors={[colors.primary, colors.secondary]}
                style={styles.promoIconContainer}
              >
                <Text style={styles.promoIcon}>🏷️</Text>
              </LinearGradient>
              <View style={styles.promoText}>
                <Text style={styles.promoTitle}>20% de descuento en seguros</Text>
                <Text style={styles.promoSubtitle}>Conduce con protección total.</Text>
              </View>
            </View>
          </GlassCard>

          <GlassCard style={styles.promoCard}>
            <View style={styles.promoRow}>
              <LinearGradient
                colors={[colors.primary, colors.secondary]}
                style={styles.promoIconContainer}
              >
                <Text style={styles.promoIcon}>📦</Text>
              </LinearGradient>
              <View style={styles.promoText}>
                <Text style={styles.promoTitle}>Kit de bienvenida</Text>
                <Text style={styles.promoSubtitle}>En la compra de tu nueva moto.</Text>
              </View>
            </View>
          </GlassCard>
        </View>

        {/* CTA Button */}
        <View style={styles.ctaContainer}>
          <Button
            title="Ver catálogo completo"
            onPress={handleCatalogPress}
            variant="primary"
            size="large"
          />
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
    heroTitle: {
      fontSize: 32,
      fontWeight: '700',
      color: colors.textPrimary,
      paddingHorizontal: 16,
      paddingTop: 16,
      paddingBottom: 16,
      letterSpacing: -0.5,
    },
    heroContainer: {
      paddingHorizontal: 16,
      marginBottom: 24,
    },
    heroCard: {
      borderRadius: 16,
      overflow: 'hidden',
      height: 200,
      position: 'relative',
    },
    heroImage: {
      width: '100%',
      height: '100%',
    },
    heroGradient: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      height: '60%',
    },
    heroContent: {
      position: 'absolute',
      bottom: 16,
      left: 16,
      right: 16,
    },
    heroName: {
      fontSize: 24,
      fontWeight: '700',
      color: colors.textPrimary,
      marginBottom: 4,
    },
    heroSubtitle: {
      fontSize: 14,
      color: colors.textMuted,
    },
    heroLoading: {
      height: 200,
      justifyContent: 'center',
      alignItems: 'center',
      marginHorizontal: 16,
      marginBottom: 24,
      backgroundColor: colors.glassBg,
      borderRadius: 16,
    },
    section: {
      marginBottom: 24,
    },
    sectionTitle: {
      fontSize: 20,
      fontWeight: '700',
      color: colors.textPrimary,
      paddingHorizontal: 16,
      marginBottom: 16,
    },
    promoCard: {
      marginHorizontal: 16,
      marginBottom: 12,
    },
    promoRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 16,
    },
    promoIconContainer: {
      width: 64,
      height: 64,
      borderRadius: 12,
      justifyContent: 'center',
      alignItems: 'center',
    },
    promoIcon: {
      fontSize: 32,
    },
    promoText: {
      flex: 1,
    },
    promoTitle: {
      fontSize: 16,
      fontWeight: '700',
      color: colors.textPrimary,
      marginBottom: 4,
    },
    promoSubtitle: {
      fontSize: 14,
      color: colors.textMuted,
    },
    ctaContainer: {
      paddingHorizontal: 16,
      marginTop: 8,
    },
  });
