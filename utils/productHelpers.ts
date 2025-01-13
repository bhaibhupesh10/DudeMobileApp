// utils/productHelpers.ts
import { Product } from '../data/products';

export const getPopularProducts = (products: Product[]) => 
  products.filter(product => product.isPopular);

export const getBestSellers = (products: Product[]) => 
  products.filter(product => product.isBestSeller);

export const getSeasonSpecials = (products: Product[]) => 
  products.filter(product => product.isSeasonSpecial);

export const getProductsByCategory = (products: Product[], categoryId: string) => 
  products.filter(product => product.category === categoryId);

export const formatPrice = (price: number) => 
  `₹${price.toFixed(2)}`;