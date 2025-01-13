// utils/storage.ts
import AsyncStorage from '@react-native-async-storage/async-storage';

export const StorageKeys = {
  CURRENT_LOCATION: 'current_location',
  CUSTOM_PRICES: 'custom_prices',
};

export const storage = {
  async saveLocation(pincode: string) {
    try {
      await AsyncStorage.setItem(StorageKeys.CURRENT_LOCATION, pincode);
    } catch (error) {
      console.error('Error saving location:', error);
    }
  },

  async getLocation(): Promise<string | null> {
    try {
      return await AsyncStorage.getItem(StorageKeys.CURRENT_LOCATION);
    } catch (error) {
      console.error('Error getting location:', error);
      return null;
    }
  },

  async saveCustomPrices(prices: Record<string, number>) {
    try {
      await AsyncStorage.setItem(
        StorageKeys.CUSTOM_PRICES, 
        JSON.stringify(prices)
      );
    } catch (error) {
      console.error('Error saving custom prices:', error);
    }
  },

  async getCustomPrices(): Promise<Record<string, number>> {
    try {
      const prices = await AsyncStorage.getItem(StorageKeys.CUSTOM_PRICES);
      return prices ? JSON.parse(prices) : {};
    } catch (error) {
      console.error('Error getting custom prices:', error);
      return {};
    }
  },
};