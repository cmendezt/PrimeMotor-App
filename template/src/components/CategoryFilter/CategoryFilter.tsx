/**
 * CategoryFilter Component
 * Horizontal scroll of filter chips for motorcycle types and conditions
 * Updated for Catalog screen design (explorar_motocicletas_1)
 */

import React, { useMemo } from 'react';
import { Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import type { MotorcycleType, MotorcycleCondition } from '@/types/motorcycle.types';
import { useTheme } from '@/theme';
import type { Colors } from '@/theme/types/colors';

// Filter can be type, condition, or 'all'
export type FilterValue =
  | { kind: 'all' }
  | { kind: 'type'; value: MotorcycleType }
  | { kind: 'condition'; value: MotorcycleCondition };

interface FilterOption {
  id: string;
  label: string;
  filter: FilterValue;
}

// Catalog screen filters (matches explorar_motocicletas_1 design)
const CATALOG_FILTERS: FilterOption[] = [
  { id: 'electric', label: 'Eléctricas', filter: { kind: 'type', value: 'electric' } },
  { id: 'gasoline', label: 'Gasolina', filter: { kind: 'type', value: 'gasoline' } },
  { id: 'new', label: 'Nuevas', filter: { kind: 'condition', value: 'new' } },
  { id: 'used', label: 'Usadas', filter: { kind: 'condition', value: 'used' } },
];

// Legacy type-only filters for backward compatibility
const LEGACY_FILTERS: FilterOption[] = [
  { id: 'all', label: 'Todas', filter: { kind: 'all' } },
  { id: 'electric', label: 'Eléctricas', filter: { kind: 'type', value: 'electric' } },
  { id: 'gasoline', label: 'Gasolina', filter: { kind: 'type', value: 'gasoline' } },
];

export interface CategoryFilterProps {
  /** Currently selected filter ID */
  selectedFilter: string;
  /** Callback when filter is selected */
  onSelectFilter: (filterId: string, filter: FilterValue) => void;
  /** Use catalog-style filters (type + condition) or legacy (type only) */
  variant?: 'catalog' | 'legacy';
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  selectedFilter,
  onSelectFilter,
  variant = 'catalog',
}) => {
  const { colors, shadows } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  const filters = variant === 'catalog' ? CATALOG_FILTERS : LEGACY_FILTERS;

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {filters.map((option) => {
        const isSelected = selectedFilter === option.id;

        return (
          <TouchableOpacity
            key={option.id}
            style={[
              styles.chip,
              isSelected && styles.chipSelected,
              isSelected && shadows.glowOrangeSmall,
            ]}
            onPress={() => onSelectFilter(option.id, option.filter)}
            activeOpacity={0.7}
          >
            <Text style={[styles.chipText, isSelected && styles.chipTextSelected]}>
              {option.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};

const createStyles = (colors: Colors) =>
  StyleSheet.create({
    container: {
      paddingHorizontal: 16,
      gap: 12,
    },
    chip: {
      height: 40,
      paddingHorizontal: 20,
      borderRadius: 20,
      backgroundColor: colors.glassBg,
      borderWidth: 1,
      borderColor: colors.glassBorder,
      justifyContent: 'center',
      alignItems: 'center',
    },
    chipSelected: {
      backgroundColor: colors.primary,
      borderColor: colors.primary,
    },
    chipText: {
      fontSize: 14,
      fontWeight: '500',
      color: colors.textPrimary,
    },
    chipTextSelected: {
      color: colors.textPrimary,
      fontWeight: '600',
    },
  });

export default CategoryFilter;
