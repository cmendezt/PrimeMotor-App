/**
 * Product Service
 * Supabase queries for motorcycle products
 */

import { supabase } from './client';
import type { Product, ProductCategory, ProductCondition, ProductFilters } from '@/types/product.types';

/**
 * Get all products with optional filtering
 */
export const getProducts = async (filters?: ProductFilters) => {
  let query = supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false });

  // Apply filters
  if (filters?.category) {
    query = query.eq('category', filters.category);
  }

  if (filters?.condition) {
    query = query.eq('condition', filters.condition);
  }

  if (filters?.featured !== undefined) {
    query = query.eq('featured', filters.featured);
  }

  if (filters?.minPrice) {
    query = query.gte('price', filters.minPrice);
  }

  if (filters?.maxPrice) {
    query = query.lte('price', filters.maxPrice);
  }

  if (filters?.search) {
    query = query.or(`name.ilike.%${filters.search}%,brand.ilike.%${filters.search}%,description.ilike.%${filters.search}%`);
  }

  const { data, error } = await query;

  return { data: data as Product[] | null, error };
};

/**
 * Get featured products (for carousel)
 */
export const getFeaturedProducts = async () => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('featured', true)
    .order('created_at', { ascending: false })
    .limit(5);

  return { data: data as Product[] | null, error };
};

/**
 * Get products by category
 */
export const getProductsByCategory = async (category: ProductCategory) => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('category', category)
    .order('created_at', { ascending: false });

  return { data: data as Product[] | null, error };
};

/**
 * Get products by condition (new/used)
 */
export const getProductsByCondition = async (condition: ProductCondition) => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('condition', condition)
    .order('created_at', { ascending: false});

  return { data: data as Product[] | null, error };
};

/**
 * Get a single product by ID
 */
export const getProductById = async (id: string) => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single();

  return { data: data as Product | null, error };
};

/**
 * Search products by name, brand, or description
 */
export const searchProducts = async (searchTerm: string) => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .or(`name.ilike.%${searchTerm}%,brand.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%`)
    .order('created_at', { ascending: false });

  return { data: data as Product[] | null, error };
};

/**
 * Get user's favorite products (requires authentication)
 */
export const getUserFavorites = async (userId: string) => {
  const { data, error } = await supabase
    .from('favorites')
    .select(`
      *,
      product:products(*)
    `)
    .eq('user_id', userId);

  return { data, error };
};

/**
 * Add product to favorites (requires authentication)
 */
export const addToFavorites = async (userId: string, productId: string) => {
  const { data, error } = await supabase
    .from('favorites')
    .insert({ user_id: userId, product_id: productId })
    .select()
    .single();

  return { data, error };
};

/**
 * Remove product from favorites (requires authentication)
 */
export const removeFromFavorites = async (userId: string, productId: string) => {
  const { data, error } = await supabase
    .from('favorites')
    .delete()
    .eq('user_id', userId)
    .eq('product_id', productId);

  return { data, error };
};

/**
 * Check if product is in user's favorites
 */
export const isProductFavorited = async (userId: string, productId: string) => {
  const { data, error } = await supabase
    .from('favorites')
    .select('id')
    .eq('user_id', userId)
    .eq('product_id', productId)
    .maybeSingle();

  return { isFavorited: !!data, error };
};
