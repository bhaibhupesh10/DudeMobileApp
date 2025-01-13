// data/quickLinks.ts
import { QuickLink } from '../types';

export const QUICK_LINKS: QuickLink[] = [
  { 
    icon: 'basket',
    title: 'Top Deals',
    route: '/deals'
  },
  { 
    icon: 'restaurant',
    title: 'Cooking Essentials',
    route: '/cooking-essentials'
  },
  { 
    icon: 'fast-food',
    title: 'Packaged Food',
    route: '/packaged-food'
  },
  { 
    icon: 'cafe',
    title: 'Beverages',
    route: '/beverages'
  }
];