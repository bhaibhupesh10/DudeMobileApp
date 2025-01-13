// // context/LocationContext.tsx
// import { createContext, useContext, useState, useEffect } from 'react';
// import * as Location from 'expo-location';
// import { locationData, defaultPriceMultiplier } from '../data/locations';
// import { storage } from '../utils/storage';

// interface LocationContextType {
//   currentPincode: string | null;
//   currentAreaName: string | null;
//   priceMultiplier: number;
//   isLoading: boolean;
//   error: string | null;
//   updateLocation: () => Promise<void>;
//   setManualPincode: (pincode: string) => Promise<void>;
// }

// const LocationContext = createContext<LocationContextType | undefined>(undefined);

// export function LocationProvider({ children }: { children: React.ReactNode }) {
//   const [currentPincode, setCurrentPincode] = useState<string | null>(null);
//   const [currentAreaName, setCurrentAreaName] = useState<string | null>(null);
//   const [priceMultiplier, setPriceMultiplier] = useState(defaultPriceMultiplier);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   const updateLocationDetails = async (pincode: string) => {
//     const locationInfo = locationData[pincode];
//     if (locationInfo) {
//       setCurrentPincode(pincode);
//       setCurrentAreaName(locationInfo.areaName);
//       setPriceMultiplier(locationInfo.priceMultiplier);
//       await storage.saveLocation(pincode);
//     } else {
//       setError('Location not serviceable');
//       setPriceMultiplier(defaultPriceMultiplier);
//     }
//   };

//   const setManualPincode = async (pincode: string) => {
//     await updateLocationDetails(pincode);
//   };

//   const updateLocation = async () => {
//     try {
//       setIsLoading(true);
//       const { status } = await Location.requestForegroundPermissionsAsync();
      
//       if (status !== 'granted') {
//         setError('Permission denied');
//         return;
//       }

//       const location = await Location.getCurrentPositionAsync({});
//       const [address] = await Location.reverseGeocodeAsync({
//         latitude: location.coords.latitude,
//         longitude: location.coords.longitude,
//       });

//       if (address?.postalCode) {
//         await updateLocationDetails(address.postalCode);
//       }
//     } catch (err) {
//       setError(err instanceof Error ? err.message : 'Location error');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Load saved location on startup
//   useEffect(() => {
//     const loadSavedLocation = async () => {
//       const savedPincode = await storage.getLocation();
//       if (savedPincode) {
//         await updateLocationDetails(savedPincode);
//       }
//       setIsLoading(false);
//     };

//     loadSavedLocation();
//   }, []);

//   return (
//     <LocationContext.Provider 
//       value={{ 
//         currentPincode, 
//         currentAreaName, 
//         priceMultiplier,
//         isLoading, 
//         error, 
//         updateLocation,
//         setManualPincode
//       }}
//     >
//       {children}
//     </LocationContext.Provider>
//   );
// }

// export const useLocation = () => {
//   const context = useContext(LocationContext);
//   if (!context) {
//     throw new Error('useLocation must be used within LocationProvider');
//   }
//   return context;
// };












// context/LocationContext.tsx
import { createContext, useContext, useState, useEffect } from 'react';
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Types
interface LocationContextType {
  currentPincode: string | null;
  currentAreaName: string | null;
  priceMultiplier: number;
  isLoading: boolean;
  error: string | null;
  updateLocation: () => Promise<void>;
  setManualPincode: (pincode: ValidPostalCode) => Promise<void>;
}

// Define valid postal codes
type ValidPostalCode = '110001' | '400001' | '700001' | '302001' | '302002' | '302003' | '302004' | '302018';

// Location pricing data
interface LocationPricing {
  areaName: string;
  priceMultiplier: number;
  isServiceable: boolean;
}

// Define location-based pricing data
const LOCATION_PRICING: Record<ValidPostalCode, LocationPricing> = {
  '110001': { areaName: 'Connaught Place, Delhi', priceMultiplier: 1.2, isServiceable: true },
  '400001': { areaName: 'Fort, Mumbai', priceMultiplier: 1.5, isServiceable: true },
  '700001': { areaName: 'BBD Bagh, Kolkata', priceMultiplier: 1.1, isServiceable: true },
  '302001': { areaName: 'Vaishali Nagar, Jaipur', priceMultiplier: 1.0, isServiceable: true },
  '302002': { areaName: 'C Scheme, Jaipur', priceMultiplier: 1.2, isServiceable: true },
  '302003': { areaName: 'Malviya Nagar, Jaipur', priceMultiplier: 1.1, isServiceable: true },
  '302004': { areaName: 'Mansarovar, Jaipur', priceMultiplier: 0.9, isServiceable: true },
  '302018': { areaName: 'Arjun Nagar, Jaipur', priceMultiplier: 5.9, isServiceable: true },
};

const DEFAULT_PRICE_MULTIPLIER = 1.0;
const STORAGE_KEY = 'user_location_preferences';

const LocationContext = createContext<LocationContextType | undefined>(undefined);

// Type guard function
const isValidPostalCode = (postalCode: string): postalCode is ValidPostalCode => {
  return postalCode in LOCATION_PRICING;
};

export function LocationProvider({ children }: { children: React.ReactNode }) {
  const [currentPincode, setCurrentPincode] = useState<string | null>(null);
  const [currentAreaName, setCurrentAreaName] = useState<string | null>(null);
  const [priceMultiplier, setPriceMultiplier] = useState(DEFAULT_PRICE_MULTIPLIER);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const updateLocationDetails = async (postalCode: string) => {
    if (isValidPostalCode(postalCode)) {
      const locationInfo = LOCATION_PRICING[postalCode];
      setCurrentPincode(postalCode);
      setCurrentAreaName(locationInfo.areaName);
      setPriceMultiplier(locationInfo.priceMultiplier);
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify({
        postalCode,
        areaName: locationInfo.areaName
      }));
    } else {
      setError('Location not serviceable');
      setPriceMultiplier(DEFAULT_PRICE_MULTIPLIER);
    }
  };

  const setManualPincode = async (postalCode: ValidPostalCode) => {
    setIsLoading(true);
    await updateLocationDetails(postalCode);
    setIsLoading(false);
  };

  const updateLocation = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setError('Permission denied');
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      const [address] = await Location.reverseGeocodeAsync({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });

      if (address?.postalCode) {
        await updateLocationDetails(address.postalCode);
      } else {
        setError('Could not determine postal code');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Location error');
    } finally {
      setIsLoading(false);
    }
  };

  // Load saved location on startup
  useEffect(() => {
    const loadSavedLocation = async () => {
      try {
        const savedLocation = await AsyncStorage.getItem(STORAGE_KEY);
        if (savedLocation) {
          const { postalCode } = JSON.parse(savedLocation);
          if (postalCode && isValidPostalCode(postalCode)) {
            await updateLocationDetails(postalCode);
          }
        }
      } catch (error) {
        console.error('Error loading saved location:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadSavedLocation();
  }, []);

  return (
    <LocationContext.Provider 
      value={{ 
        currentPincode, 
        currentAreaName, 
        priceMultiplier,
        isLoading, 
        error, 
        updateLocation,
        setManualPincode
      }}
    >
      {children}
    </LocationContext.Provider>
  );
}

export const useLocation = () => {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error('useLocation must be used within LocationProvider');
  }
  return context;
};

// Export types and constants for use in other files
export type { ValidPostalCode, LocationPricing };
export { LOCATION_PRICING, isValidPostalCode };