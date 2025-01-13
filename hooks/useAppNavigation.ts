// hooks/useAppNavigation.ts
import { useCallback } from 'react';
import AppRoutes, { ProfileRoutes } from '../app/routes';

export const useAppNavigation = () => {
  const navigate = {
    toHome: useCallback(() => AppRoutes.navigate.toTab('HOME'), []),
    toCategories: useCallback(() => AppRoutes.navigate.toTab('CATEGORIES'), []),
    toCart: useCallback(() => AppRoutes.navigate.toTab('CART'), []),
    toProfile: useCallback(() => AppRoutes.navigate.toTab('PROFILE'), []),
    toSignIn: useCallback(() => AppRoutes.navigate.toAuth('SIGN_IN'), []),
    toSignUp: useCallback(() => AppRoutes.navigate.toAuth('SIGN_UP'), []),
    toProfileSection: useCallback((route: keyof ProfileRoutes) => 
      AppRoutes.navigate.toProfile(route), []),
    toProduct: useCallback((id: string) => 
      AppRoutes.navigate.toProduct(id), []),
    toCategory: useCallback((id: string) => 
      AppRoutes.navigate.toCategory(id), []),
  };

  return navigate;
};