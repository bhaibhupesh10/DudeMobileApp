// constants/products.ts
import { UNSPLASH_IMAGES } from './images';

export interface ProductDetails {
  id: string;
  name: string;
  description: string;
  basePrice: number;
  baseMrp?: number;
  discount?: string;
  weight?: string;
  image: { uri: string };
  features?: string[];
  specifications?: { [key: string]: string };
  category?: string;
  brand?: string;
  inStock?: boolean;
  deliveryTime?: string;
}

export const PRODUCTS: { [key: string]: ProductDetails } = {
  'sugar': {
    id: 'sugar',
    name: 'Premium Sugar',
    description: 'High-quality refined sugar perfect for all your sweetening needs. Our sugar is processed under strict quality control to ensure purity and consistency. Each grain is carefully processed to maintain the perfect sweetness and dissolving properties.',
    basePrice: 51,
    baseMrp: 60,
    weight: '1 kg',
    discount: '15% OFF',
    image: UNSPLASH_IMAGES.sugar,
    category: 'groceries',
    brand: 'Premium Foods',
    inStock: true,
    deliveryTime: '2-3 days',
    features: [
      'Pure and refined',
      'Free from impurities',
      'Perfect sweetness',
      'Dissolves quickly',
      'No artificial additives',
      'Suitable for all cooking needs'
    ],
    specifications: {
      'Brand': 'Premium Foods',
      'Package Weight': '1 kg',
      'Type': 'Refined Sugar',
      'Shelf Life': '24 months',
      'Storage': 'Store in a cool, dry place',
      'Country of Origin': 'India',
      'Packaging Type': 'Food Grade Plastic',
      'Maximum Shelf Life': '24 Months'
    }
  },
  'salt': {
    id: 'salt',
    name: 'Iodized Table Salt',
    description: 'Pure iodized salt that ensures the perfect taste in every dish. Our salt is processed with the latest technology to ensure proper iodization and purity. Perfect for all your cooking needs.',
    basePrice: 9,
    baseMrp: 12,
    weight: '1 kg',
    discount: '25% OFF',
    image: UNSPLASH_IMAGES.salt,
    category: 'groceries',
    brand: 'Premium Foods',
    inStock: true,
    deliveryTime: '2-3 days',
    features: [
      'Iodized for health',
      'Pure and clean',
      'Perfect for cooking',
      'Free-flowing crystals',
      'No lumps',
      'Consistent grain size'
    ],
    specifications: {
      'Brand': 'Premium Foods',
      'Package Weight': '1 kg',
      'Type': 'Iodized Salt',
      'Shelf Life': '24 months',
      'Storage': 'Store in a cool, dry place',
      'Country of Origin': 'India',
      'Packaging Type': 'Food Grade Plastic',
      'Iodine Content': '15-30 ppm'
    }
  },
  'atta': {
    id: 'atta',
    name: 'Whole Wheat Atta',
    description: 'Premium quality whole wheat flour perfect for making soft rotis and parathas. Made from carefully selected wheat grains, ground to perfection.',
    basePrice: 371,
    baseMrp: 458,
    weight: '10 kg',
    discount: '20% OFF',
    image: UNSPLASH_IMAGES.atta,
    category: 'groceries',
    brand: 'Premium Foods',
    inStock: true,
    deliveryTime: '2-3 days',
    features: [
      '100% whole wheat',
      'No maida mixed',
      'Perfect for rotis',
      'High protein content',
      'Fresh grinding',
      'Natural fiber rich'
    ],
    specifications: {
      'Brand': 'Premium Foods',
      'Package Weight': '10 kg',
      'Type': 'Whole Wheat Flour',
      'Shelf Life': '6 months',
      'Storage': 'Store in a cool, dry place',
      'Country of Origin': 'India',
      'Packaging Type': 'Food Grade Plastic',
      'Protein Content': '12g per 100g'
    }
  },
  'rice': {
    id: 'rice',
    name: 'Premium Basmati Rice',
    description: 'Extra-long grain basmati rice with amazing aroma. Perfect for biryani and pulao. Aged naturally for the best taste and texture.',
    basePrice: 299,
    baseMrp: 399,
    weight: '5 kg',
    discount: '25% OFF',
    image: UNSPLASH_IMAGES.rice,
    category: 'groceries',
    brand: 'Premium Foods',
    inStock: true,
    deliveryTime: '2-3 days',
    features: [
      'Extra long grains',
      'Natural aging',
      'Superior aroma',
      'Perfect for biryani',
      'No broken rice',
      'Non-sticky cooking'
    ],
    specifications: {
      'Brand': 'Premium Foods',
      'Package Weight': '5 kg',
      'Type': 'Basmati Rice',
      'Shelf Life': '12 months',
      'Storage': 'Store in a cool, dry place',
      'Country of Origin': 'India',
      'Packaging Type': 'Food Grade Plastic',
      'Grain Length': 'Extra Long'
    }
  }
};

// Helper functions
export const getProductById = (id: string): ProductDetails | undefined => {
  return PRODUCTS[id];
};

export const getAllProducts = (): ProductDetails[] => {
  return Object.values(PRODUCTS);
};

export const getProductsByCategory = (category: string): ProductDetails[] => {
  return Object.values(PRODUCTS).filter(product => product.category === category);
};

export const searchProducts = (query: string): ProductDetails[] => {
  const searchTerm = query.toLowerCase();
  return Object.values(PRODUCTS).filter(product => 
    product.name.toLowerCase().includes(searchTerm) ||
    product.description.toLowerCase().includes(searchTerm) ||
    product.brand?.toLowerCase().includes(searchTerm) ||
    product.category?.toLowerCase().includes(searchTerm)
  );
};

// Categories
export const PRODUCT_CATEGORIES = {
  groceries: 'Groceries',
  vegetables: 'Vegetables',
  fruits: 'Fruits',
  dairy: 'Dairy Products',
  snacks: 'Snacks & Beverages'
} as const;

export type ProductCategory = keyof typeof PRODUCT_CATEGORIES;

// Sort options
export const SORT_OPTIONS = {
  nameAsc: 'Name (A-Z)',
  nameDesc: 'Name (Z-A)',
  priceAsc: 'Price (Low to High)',
  priceDesc: 'Price (High to Low)',
  discountDesc: 'Discount (High to Low)'
} as const;

export type SortOption = keyof typeof SORT_OPTIONS;

// Sort function
export const sortProducts = (products: ProductDetails[], sortBy: SortOption): ProductDetails[] => {
  const sortedProducts = [...products];
  
  switch (sortBy) {
    case 'nameAsc':
      return sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
    case 'nameDesc':
      return sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
    case 'priceAsc':
      return sortedProducts.sort((a, b) => a.basePrice - b.basePrice);
    case 'priceDesc':
      return sortedProducts.sort((a, b) => b.basePrice - a.basePrice);
    case 'discountDesc':
      return sortedProducts.sort((a, b) => {
        const getDiscountPercent = (discount?: string) => {
          if (!discount) return 0;
          return parseInt(discount) || 0;
        };
        return getDiscountPercent(b.discount) - getDiscountPercent(a.discount);
      });
    default:
      return sortedProducts;
  }
};