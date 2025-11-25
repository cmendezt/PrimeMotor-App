/**
 * Product Types
 * Type definitions for motorcycle products and related entities
 */

export type ProductCategory = 'electric' | 'gasoline' | 'scooter';
export type ProductCondition = 'new' | 'used';

export interface ProductSpecifications {
  engine?: string;
  power?: string;
  torque?: string;
  topSpeed?: string;
  range?: string;
  weight?: string;
  seatHeight?: string;
  fuelCapacity?: string;
  transmission?: string;
  [key: string]: string | undefined;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  model: string | null;
  price: number;
  description: string | null;
  category: ProductCategory;
  condition: ProductCondition;
  image_url: string | null;
  featured: boolean;
  stock_quantity: number;
  year: number | null;
  specifications: ProductSpecifications;
  created_at: string;
  updated_at: string;
}

export interface Favorite {
  id: string;
  user_id: string;
  product_id: string;
  created_at: string;
}

export interface ProductFilters {
  category?: ProductCategory;
  condition?: ProductCondition;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
  featured?: boolean;
}

export interface ProductsResponse {
  data: Product[] | null;
  error: Error | null;
}

export interface ProductResponse {
  data: Product | null;
  error: Error | null;
}
