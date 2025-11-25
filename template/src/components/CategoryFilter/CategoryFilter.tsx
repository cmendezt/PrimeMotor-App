/**
 * CategoryFilter Component
 * Horizontal scroll of filter chips for motorcycle types
 */

import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import type { MotorcycleType } from '@/types/motorcycle.types';

interface Category {
  id: MotorcycleType | 'all';
  label: string;
}

const CATEGORIES: Category[] = [
  { id: 'all', label: 'Todas' },
  { id: 'electric', label: 'Eléctricas' },
  { id: 'sport', label: 'Deportivas' },
  { id: 'cruiser', label: 'Crucero' },
  { id: 'touring', label: 'Turismo' },
  { id: 'naked', label: 'Naked' },
  { id: 'adventure', label: 'Aventura' },
  { id: 'scooter', label: 'Scooter' },
];

interface CategoryFilterProps {
  selectedCategory: MotorcycleType | 'all';
  onSelectCategory: (category: MotorcycleType | 'all') => void;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  selectedCategory,
  onSelectCategory,
}) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {CATEGORIES.map((category) => {
        const isSelected = selectedCategory === category.id;

        return (
          <TouchableOpacity
            key={category.id}
            style={[styles.chip, isSelected && styles.chipSelected]}
            onPress={() => onSelectCategory(category.id)}
            activeOpacity={0.7}
          >
            <Text style={[styles.chipText, isSelected && styles.chipTextSelected]}>
              {category.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    gap: 8,
  },
  chip: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#1A1A1A',
    borderWidth: 1,
    borderColor: '#2A2A2A',
  },
  chipSelected: {
    backgroundColor: '#FF4500',
    borderColor: '#FF4500',
  },
  chipText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#AAAAAA',
  },
  chipTextSelected: {
    color: '#FFFFFF',
  },
});
