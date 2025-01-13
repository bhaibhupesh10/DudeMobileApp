// types/categories.ts
export interface CategoryItem {
    title: string;
    image: string;
  }
  
  export interface CategorySection {
    title: string;
    items: CategoryItem[];
  }
  
  export type CategoryData = Record<string, CategorySection>;