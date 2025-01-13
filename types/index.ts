// types/index.ts
export interface Image {
  uri: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  basePrice: number;
  baseMrp?: number;
  discount?: string;
  weight?: string;
  image: Image;
  category: string;
  isPopular?: boolean;
  isBestSeller?: boolean;
  isSeasonSpecial?: boolean;
}

export interface Category {
  id: string;
  title: string;
  startingPrice: string;
  image: Image;
  description?: string;
}

export interface QuickLink {
  icon: 'basket' | 'restaurant' | 'fast-food' | 'cafe';
  title: string;
  route?: string;
}

export interface Item extends Product {} 