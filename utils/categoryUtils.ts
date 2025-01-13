// utils/categoryUtils.ts

import { items, Item } from '../data/items';

export const getItemsByCategory = (category: string): Item[] => {
  return items.filter(item => item.categories.includes(category));
};

export const getAllCategories = (): string[] => {
  const categories = new Set<string>();
  items.forEach(item => {
    item.categories.forEach(category => categories.add(category));
  });
  return Array.from(categories);
};