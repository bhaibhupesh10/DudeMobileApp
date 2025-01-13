// types/menu.ts
export interface MenuItem {
    id: string;
    icon: keyof typeof Ionicons.glyphMap;
    title: string;
    route?: string;
    component?: React.FC;
  }