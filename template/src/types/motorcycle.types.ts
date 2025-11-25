/**
 * Motorcycle Types
 * Type definitions for motorcycles using generated database types
 */

import type { Database } from './database.types';

// Re-export database types for motorcycles
export type Motorcycle = Database['public']['Tables']['motorcycles']['Row'];
export type MotorcycleInsert = Database['public']['Tables']['motorcycles']['Insert'];
export type MotorcycleUpdate = Database['public']['Tables']['motorcycles']['Update'];

// Enums from database
export type MotorcycleType = Database['public']['Enums']['motorcycle_type'];
export type MotorcycleCondition = Database['public']['Enums']['motorcycle_condition'];

// Motorcycle image type
export type MotorcycleImage = Database['public']['Tables']['motorcycle_images']['Row'];

// Filter types for querying motorcycles
export interface MotorcycleFilters {
  type?: MotorcycleType;
  condition?: MotorcycleCondition;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
  featured?: boolean;
  brand?: string;
  year?: number;
}

// Response types
export interface MotorcyclesResponse {
  data: Motorcycle[] | null;
  error: Error | null;
}

export interface MotorcycleResponse {
  data: Motorcycle | null;
  error: Error | null;
}

// Motorcycle with images
export interface MotorcycleWithImages extends Motorcycle {
  images?: MotorcycleImage[];
}
