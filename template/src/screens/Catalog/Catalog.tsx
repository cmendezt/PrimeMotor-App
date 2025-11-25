/**
 * Catalog Screen
 * Browse motorcycles with search, filters, and grid view
 * Design: explorar_motocicletas_1
 */

import React, { useState, useMemo, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { useTheme } from '@/theme';
import type { Colors } from '@/theme/types/colors';
import { GradientBackground } from '@/components/molecules/GradientBackground';
import { Header } from '@/components/molecules/Header';
import { SearchBar } from '@/components/SearchBar';
import { CategoryFilter, type FilterValue } from '@/components/CategoryFilter';
import { PromotionalCarousel } from '@/components/molecules/PromotionalCarousel';
import { CatalogMotorcycleCard } from '@/components/molecules/CatalogMotorcycleCard';
import { getMotorcycles } from '@/services/supabase/motorcycles';
import type { Motorcycle, MotorcycleFilters } from '@/types/motorcycle.types';

export const Catalog = () => {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  // State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilterId, setSelectedFilterId] = useState<string>('electric');
  const [activeFilter, setActiveFilter] = useState<FilterValue>({
    kind: 'type',
    value: 'electric',
  });

  // Build query filters
  const queryFilters = useMemo((): MotorcycleFilters => {
    const filters: MotorcycleFilters = {};

    if (searchQuery.trim()) {
      filters.search = searchQuery.trim();
    }

    if (activeFilter.kind === 'type') {
      filters.type = activeFilter.value;
    } else if (activeFilter.kind === 'condition') {
      filters.condition = activeFilter.value;
    }

    return filters;
  }, [searchQuery, activeFilter]);

  // Fetch motorcycles
  const {
    data: motorcyclesResponse,
    isLoading,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ['motorcycles', 'catalog', queryFilters],
    queryFn: () => getMotorcycles(queryFilters),
  });

  const motorcycles = motorcyclesResponse?.data ?? [];

  // Handlers
  const handleFilterSelect = useCallback(
    (filterId: string, filter: FilterValue) => {
      setSelectedFilterId(filterId);
      setActiveFilter(filter);
    },
    []
  );

  const handleMotorcyclePress = useCallback((motorcycle: Motorcycle) => {
    // TODO: Navigate to motorcycle detail
    console.log('Motorcycle pressed:', motorcycle.id);
  }, []);

  const handleFavoriteToggle = useCallback((motorcycleId: string) => {
    // TODO: Implement favorites (requires auth)
    console.log('Toggle favorite:', motorcycleId);
  }, []);

  const handleMenuPress = useCallback(() => {
    // TODO: Open drawer/menu
    console.log('Menu pressed');
  }, []);

  const handleNotificationPress = useCallback(() => {
    // TODO: Show notifications
    console.log('Notifications pressed');
  }, []);

  // Render motorcycle card
  const renderMotorcycleCard = useCallback(
    ({ item, index }: { item: Motorcycle; index: number }) => (
      <View style={[styles.cardWrapper, index % 2 === 0 && styles.cardLeft]}>
        <CatalogMotorcycleCard
          motorcycle={item}
          isFavorite={false} // TODO: Check from favorites state
          onPress={() => handleMotorcyclePress(item)}
          onFavoriteToggle={() => handleFavoriteToggle(item.id)}
        />
      </View>
    ),
    [styles, handleMotorcyclePress, handleFavoriteToggle]
  );

  // Render list header (search, filters, promo carousel)
  const renderListHeader = useCallback(
    () => (
      <View style={styles.listHeader}>
        {/* Page Title */}
        <Text style={styles.pageTitle}>Encuentra tu Futuro</Text>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <SearchBar
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Buscar modelo o marca..."
          />
        </View>

        {/* Category Filters */}
        <View style={styles.filtersContainer}>
          <CategoryFilter
            selectedFilter={selectedFilterId}
            onSelectFilter={handleFilterSelect}
            variant="catalog"
          />
        </View>

        {/* Promotional Carousel */}
        <View style={styles.carouselContainer}>
          <PromotionalCarousel items={[]} />
        </View>

        {/* Section Title */}
        <Text style={styles.sectionTitle}>Recomendadas para ti</Text>
      </View>
    ),
    [
      styles,
      searchQuery,
      selectedFilterId,
      handleFilterSelect,
    ]
  );

  // Render empty state
  const renderEmptyState = useCallback(
    () =>
      !isLoading ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateText}>
            No se encontraron motocicletas
          </Text>
          <Text style={styles.emptyStateSubtext}>
            Intenta con otros filtros o términos de búsqueda
          </Text>
        </View>
      ) : null,
    [isLoading, styles]
  );

  return (
    <GradientBackground variant="home">
      {/* Header */}
      <Header
        showLogo
        showMenu
        showNotifications
        onMenuPress={handleMenuPress}
        onNotificationPress={handleNotificationPress}
      />

      {/* Main Content */}
      {isLoading && motorcycles.length === 0 ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      ) : (
        <FlatList
          data={motorcycles}
          renderItem={renderMotorcycleCard}
          keyExtractor={(item) => item.id}
          numColumns={2}
          ListHeaderComponent={renderListHeader}
          ListEmptyComponent={renderEmptyState}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={isFetching && !isLoading}
              onRefresh={refetch}
              tintColor={colors.primary}
              colors={[colors.primary]}
            />
          }
        />
      )}
    </GradientBackground>
  );
};

const createStyles = (colors: Colors) =>
  StyleSheet.create({
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    listContent: {
      paddingBottom: 100,
    },
    listHeader: {
      paddingBottom: 16,
    },
    pageTitle: {
      fontSize: 32,
      fontWeight: '700',
      color: colors.textPrimary,
      paddingHorizontal: 16,
      paddingTop: 16,
      paddingBottom: 4,
      letterSpacing: -0.5,
    },
    searchContainer: {
      paddingHorizontal: 16,
      paddingVertical: 12,
    },
    filtersContainer: {
      paddingVertical: 12,
    },
    carouselContainer: {
      paddingVertical: 16,
    },
    sectionTitle: {
      fontSize: 20,
      fontWeight: '700',
      color: colors.textPrimary,
      paddingHorizontal: 16,
      marginTop: 8,
      marginBottom: 16,
    },
    cardWrapper: {
      flex: 1,
      paddingHorizontal: 8,
      paddingBottom: 16,
    },
    cardLeft: {
      paddingLeft: 16,
      paddingRight: 8,
    },
    emptyState: {
      padding: 40,
      alignItems: 'center',
    },
    emptyStateText: {
      fontSize: 18,
      fontWeight: '600',
      color: colors.textPrimary,
      marginBottom: 8,
    },
    emptyStateSubtext: {
      fontSize: 14,
      color: colors.textSecondary,
      textAlign: 'center',
    },
  });

export default Catalog;
