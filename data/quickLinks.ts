// data/quickLinks.ts
import { Ionicons } from '@expo/vector-icons';
import { FeatureRoutes } from '../app/routes';

export interface QuickLink {
  id: string;
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  route: keyof FeatureRoutes;
}

export const QUICK_LINKS: QuickLink[] = [
  { 
    id: 'deals',
    icon: 'basket',
    title: 'Top Deals',
    route: 'DEALS'
  },
  { 
    id: 'cooking',
    icon: 'restaurant',
    title: 'Cooking Essentials',
    route: 'COOKING_ESSENTIALS'
  },
  { 
    id: 'packaged',
    icon: 'fast-food',
    title: 'Packaged Food',
    route: 'PACKAGED_FOOD'
  },
  { 
    id: 'beverages',
    icon: 'cafe',
    title: 'Beverages',
    route: 'BEVERAGES'
  },
];