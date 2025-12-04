/**
 * Motorcycle Service
 * Supabase queries for motorcycles
 */

import { supabase } from './client';
import type { Motorcycle, MotorcycleFilters, MotorcycleType, MotorcycleCondition } from '@/types/motorcycle.types';

/**
 * Get all motorcycles with optional filtering
 */
export const getMotorcycles = async (filters?: MotorcycleFilters) => {
  console.log('[motorcycles.ts] getMotorcycles called with filters:', filters);

  let query = supabase
    .from('motorcycles')
    .select(`
      *,
      images:motorcycle_images(*)
    `)
    .eq('is_active', true)
    .order('created_at', { ascending: false });

  // Apply filters
  if (filters?.type) {
    console.log('[motorcycles.ts] Applying type filter:', filters.type);
    query = query.eq('type', filters.type);
  }

  if (filters?.condition) {
    console.log('[motorcycles.ts] Applying condition filter:', filters.condition);
    query = query.eq('condition', filters.condition);
  }

  if (filters?.featured !== undefined) {
    query = query.eq('is_featured', filters.featured);
  }

  if (filters?.brand) {
    query = query.eq('brand', filters.brand);
  }

  if (filters?.year) {
    query = query.eq('year', filters.year);
  }

  if (filters?.minPrice) {
    query = query.gte('price', filters.minPrice);
  }

  if (filters?.maxPrice) {
    query = query.lte('price', filters.maxPrice);
  }

  if (filters?.search) {
    query = query.or(`name.ilike.%${filters.search}%,brand.ilike.%${filters.search}%,model.ilike.%${filters.search}%,description.ilike.%${filters.search}%`);
  }

  const { data, error } = await query;

  console.log('[motorcycles.ts] Query returned', data?.length || 0, 'results');
  if (error) {
    console.error('[motorcycles.ts] Query error:', error);
  }

  return { data: data as Motorcycle[] | null, error };
};

/**
 * Get featured motorcycles (for carousel)
 */
export const getFeaturedMotorcycles = async () => {
  const { data, error } = await supabase
    .from('motorcycles')
    .select(`
      *,
      images:motorcycle_images(*)
    `)
    .eq('is_featured', true)
    .eq('is_active', true)
    .order('created_at', { ascending: false })
    .limit(5);

  return { data: data as Motorcycle[] | null, error };
};

/**
 * Get motorcycles by type
 */
export const getMotorcyclesByType = async (type: MotorcycleType) => {
  const { data, error } = await supabase
    .from('motorcycles')
    .select('*')
    .eq('type', type)
    .eq('is_active', true)
    .order('created_at', { ascending: false });

  return { data: data as Motorcycle[] | null, error };
};

/**
 * Get motorcycles by condition (new/used)
 */
export const getMotorcyclesByCondition = async (condition: MotorcycleCondition) => {
  const { data, error } = await supabase
    .from('motorcycles')
    .select('*')
    .eq('condition', condition)
    .eq('is_active', true)
    .order('created_at', { ascending: false });

  return { data: data as Motorcycle[] | null, error };
};

/**
 * Get a single motorcycle by ID
 */
export const getMotorcycleById = async (id: string) => {
  const { data, error } = await supabase
    .from('motorcycles')
    .select('*')
    .eq('id', id)
    .eq('is_active', true)
    .single();

  return { data: data as Motorcycle | null, error };
};

/**
 * Get motorcycle with images
 */
export const getMotorcycleWithImages = async (id: string) => {
  const { data, error } = await supabase
    .from('motorcycles')
    .select(`
      *,
      images:motorcycle_images(*)
    `)
    .eq('id', id)
    .eq('is_active', true)
    .single();

  return { data, error };
};

/**
 * Search motorcycles by name, brand, model, or description
 */
export const searchMotorcycles = async (searchTerm: string) => {
  const { data, error } = await supabase
    .from('motorcycles')
    .select('*')
    .eq('is_active', true)
    .or(`name.ilike.%${searchTerm}%,brand.ilike.%${searchTerm}%,model.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%`)
    .order('created_at', { ascending: false });

  return { data: data as Motorcycle[] | null, error };
};

/**
 * Get user's favorite motorcycles (requires authentication)
 */
export const getUserFavorites = async (userId: string) => {
  const { data, error } = await supabase
    .from('favorites')
    .select(`
      *,
      motorcycle:motorcycles(*)
    `)
    .eq('user_id', userId)
    .eq('item_type', 'motorcycle');

  return { data, error };
};

/**
 * Add motorcycle to favorites (requires authentication)
 */
export const addToFavorites = async (userId: string, motorcycleId: string) => {
  const { data, error } = await supabase
    .from('favorites')
    .insert({
      user_id: userId,
      item_id: motorcycleId,
      item_type: 'motorcycle'
    })
    .select()
    .single();

  return { data, error };
};

/**
 * Remove motorcycle from favorites (requires authentication)
 */
export const removeFromFavorites = async (userId: string, motorcycleId: string) => {
  const { data, error } = await supabase
    .from('favorites')
    .delete()
    .eq('user_id', userId)
    .eq('item_id', motorcycleId)
    .eq('item_type', 'motorcycle');

  return { data, error };
};

/**
 * Check if motorcycle is in user's favorites
 */
export const isMotorcycleFavorited = async (userId: string, motorcycleId: string) => {
  const { data, error } = await supabase
    .from('favorites')
    .select('id')
    .eq('user_id', userId)
    .eq('item_id', motorcycleId)
    .eq('item_type', 'motorcycle')
    .maybeSingle();

  return { isFavorited: !!data, error };
};

/**
 * Get unique brands
 */
export const getMotorcycleBrands = async () => {
  const { data, error } = await supabase
    .from('motorcycles')
    .select('brand')
    .eq('is_active', true);

  if (error) return { data: null, error };

  // Get unique brands
  const brands = [...new Set(data.map(m => m.brand))].sort();
  return { data: brands, error: null };
};
