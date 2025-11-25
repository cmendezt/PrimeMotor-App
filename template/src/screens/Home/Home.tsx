/**
 * Home Screen
 * Main screen showing motorcycle catalog
 */

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { SearchBar } from '@/components/SearchBar';
import { CategoryFilter } from '@/components/CategoryFilter';
import { FeaturedCarousel } from '@/components/FeaturedCarousel';
import { MotorcycleCard } from '@/components/MotorcycleCard';
import { getMotorcycles, getFeaturedMotorcycles } from '@/services/supabase/motorcycles';
import type { Motorcycle, MotorcycleType } from '@/types/motorcycle.types';

export const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<MotorcycleType | 'all'>('all');
  const [filteredMotorcycles, setFilteredMotorcycles] = useState<Motorcycle[]>([]);

  // Fetch featured motorcycles
  const { data: featuredData } = useQuery({
    queryKey: ['motorcycles', 'featured'],
    queryFn: getFeaturedMotorcycles,
  });

  // Fetch all motorcycles
  const {
    data: motorcyclesData,
    isLoading,
    error,
    refetch,
    isRefreshing,
  } = useQuery({
    queryKey: ['motorcycles', selectedCategory, searchQuery],
    queryFn: () =>
      getMotorcycles({
        type: selectedCategory === 'all' ? undefined : selectedCategory,
        search: searchQuery || undefined,
      }),
  });

  // Filter motorcycles based on search and category
  useEffect(() => {
    if (motorcyclesData?.data) {
      setFilteredMotorcycles(motorcyclesData.data);
    }
  }, [motorcyclesData]);

  const handleMotorcyclePress = (motorcycle: Motorcycle) => {
    // TODO: Navigate to motorcycle details
    console.log('Pressed motorcycle:', motorcycle.name);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={refetch}
            tintColor="#FF4500"
            colors={['#FF4500']}
          />
        }
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.logo}>PrimeMotor</Text>
          <Text style={styles.subtitle}>Encuentra tu motocicleta perfecta</Text>
        </View>

        {/* Search */}
        <View style={styles.searchContainer}>
          <SearchBar value={searchQuery} onChangeText={setSearchQuery} />
        </View>

        {/* Category Filter */}
        <CategoryFilter
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />

        {/* Featured Carousel */}
        {featuredData?.data && featuredData.data.length > 0 && (
          <FeaturedCarousel
            motorcycles={featuredData.data}
            onPressMotorcycle={handleMotorcyclePress}
          />
        )}

        {/* Motorcycles List */}
        <View style={styles.listContainer}>
          <Text style={styles.sectionTitle}>
            {selectedCategory === 'all' ? 'Todas las motocicletas' : 'Resultados'}
          </Text>

          {isLoading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#FF4500" />
            </View>
          ) : error ? (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>Error al cargar las motocicletas</Text>
              <Text style={styles.errorSubtext}>
                Por favor, intenta de nuevo más tarde
              </Text>
            </View>
          ) : filteredMotorcycles.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No se encontraron motocicletas</Text>
              <Text style={styles.emptySubtext}>
                Intenta ajustar los filtros de búsqueda
              </Text>
            </View>
          ) : (
            <View style={styles.grid}>
              {filteredMotorcycles.map((motorcycle) => (
                <MotorcycleCard
                  key={motorcycle.id}
                  motorcycle={motorcycle}
                  onPress={handleMotorcyclePress}
                />
              ))}
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0A0A',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 24,
  },
  logo: {
    fontSize: 32,
    fontWeight: '700',
    color: '#FF4500',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#AAAAAA',
  },
  searchContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  listContainer: {
    paddingHorizontal: 20,
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  grid: {
    gap: 16,
  },
  loadingContainer: {
    paddingVertical: 60,
    alignItems: 'center',
  },
  errorContainer: {
    paddingVertical: 60,
    alignItems: 'center',
  },
  errorText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FF4444',
    marginBottom: 8,
  },
  errorSubtext: {
    fontSize: 14,
    color: '#AAAAAA',
  },
  emptyContainer: {
    paddingVertical: 60,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#AAAAAA',
  },
});
