// constants/location.ts
import { LocationData, ValidPostalCode } from '../types/location';

export const LOCATION_PRICING: Record<ValidPostalCode, LocationData> = {
  '110001': { areaName: 'Connaught Place, Delhi', priceMultiplier: 1.2, isServiceable: true },
  '400001': { areaName: 'Fort, Mumbai', priceMultiplier: 1.5, isServiceable: true },
  '700001': { areaName: 'BBD Bagh, Kolkata', priceMultiplier: 1.1, isServiceable: true },
  '302001': { areaName: 'Vaishali Nagar, Jaipur', priceMultiplier: 1.0, isServiceable: true },
  '302002': { areaName: 'C Scheme, Jaipur', priceMultiplier: 1.2, isServiceable: true },
  '302003': { areaName: 'Malviya Nagar, Jaipur', priceMultiplier: 1.1, isServiceable: true },
  '302004': { areaName: 'Mansarovar, Jaipur', priceMultiplier: 0.9, isServiceable: true },
} as const;

export const DEFAULT_PRICE_MULTIPLIER = 1.0;
export const STORAGE_KEY = 'user_location_preferences';

export const isValidPostalCode = (postalCode: string): postalCode is ValidPostalCode => {
  return postalCode in LOCATION_PRICING;
};