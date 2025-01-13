// // hooks/useLocation.ts
// import { useState, useEffect } from 'react';
// import * as Location from 'expo-location';

// export interface DetailedAddress {
//   area: string;
//   city: string;
//   street?: string | undefined;
//   landmark?: string | undefined;
//   postalCode?: string | undefined;
//   region?: string | undefined;
//   fullAddress: string;
// }

// interface LocationState {
//   location: Location.LocationObject | null;
//   address: DetailedAddress | null;
//   loading: boolean;
//   error: string | null;
// }

// export const useLocation = () => {
//   const [state, setState] = useState<LocationState>({
//     location: null,
//     address: null,
//     loading: true,
//     error: null,
//   });

//   const getLocation = async () => {
//     try {
//       setState(prev => ({ ...prev, loading: true, error: null }));
      
//       const { status } = await Location.requestForegroundPermissionsAsync();
//       if (status !== 'granted') {
//         setState(prev => ({
//           ...prev,
//           loading: false,
//           error: 'Location permission denied'
//         }));
//         return;
//       }

//       const location = await Location.getCurrentPositionAsync({
//         accuracy: Location.Accuracy.Balanced,
//       });

//       const [addressDetails] = await Location.reverseGeocodeAsync({
//         latitude: location.coords.latitude,
//         longitude: location.coords.longitude
//       });

//       if (!addressDetails) {
//         throw new Error('Could not fetch address details');
//       }

//       const address: DetailedAddress = {
//         area: addressDetails.district || addressDetails.subregion || 'Unknown Area',
//         city: addressDetails.city || 'Unknown City',
//         street: addressDetails.street || undefined,
//         landmark: addressDetails.name || undefined,
//         postalCode: addressDetails.postalCode || undefined,
//         region: addressDetails.region || undefined,
//         fullAddress: [
//           addressDetails.street,
//           addressDetails.district,
//           addressDetails.city,
//           addressDetails.region,
//           addressDetails.postalCode
//         ].filter(Boolean).join(', ') || 'Address not available'
//       };

//       setState({
//         location,
//         address,
//         loading: false,
//         error: null
//       });

//     } catch (error) {
//       setState(prev => ({
//         ...prev,
//         loading: false,
//         error: error instanceof Error ? error.message : 'Error getting location'
//       }));
//     }
//   };

//   useEffect(() => {
//     getLocation();
//   }, []);

//   return {
//     ...state,
//     getLocation,
//   };
// };














// hooks/useLocation.ts
import { useState, useEffect } from 'react';
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Types
export interface DetailedAddress {
  area: string;
  city: string;
  street?: string | undefined;
  landmark?: string | undefined;
  postalCode?: string | undefined;
  region?: string | undefined;
  fullAddress: string;
}

interface LocationState {
  location: Location.LocationObject | null;
  address: DetailedAddress | null;
  loading: boolean;
  error: string | null;
  priceMultiplier: number;
  currentAreaName: string | null;
}

// Location pricing data
interface LocationPricing {
  areaName: string;
  priceMultiplier: number;
  isServiceable: boolean;
}

// Define location-based pricing data
const LOCATION_PRICING: Record<string, LocationPricing> = {
  '302001': { areaName: 'Vaishali Nagar, Jaipur', priceMultiplier: 1.0, isServiceable: true },
  '302002': { areaName: 'C Scheme, Jaipur', priceMultiplier: 1.2, isServiceable: true },
  '302003': { areaName: 'Malviya Nagar, Jaipur', priceMultiplier: 1.1, isServiceable: true },
  '302004': { areaName: 'Mansarovar, Jaipur', priceMultiplier: 0.9, isServiceable: true },
  '302018': { areaName: 'Arjun Nagar, Jaipur', priceMultiplier: 0.9, isServiceable: true },
  // Add more locations as needed
};

const DEFAULT_PRICE_MULTIPLIER = 1.0;
const STORAGE_KEY = 'user_location_preferences';

export const useLocation = () => {
  const [state, setState] = useState<LocationState>({
    location: null,
    address: null,
    loading: true,
    error: null,
    priceMultiplier: DEFAULT_PRICE_MULTIPLIER,
    currentAreaName: null,
  });

  // Load saved location preferences
  const loadSavedLocation = async () => {
    try {
      const savedLocation = await AsyncStorage.getItem(STORAGE_KEY);
      if (savedLocation) {
        const { postalCode, areaName } = JSON.parse(savedLocation);
        updatePriceMultiplier(postalCode);
      }
    } catch (error) {
      console.error('Error loading saved location:', error);
    }
  };

  // Save location preferences
  const saveLocationPreferences = async (postalCode: string, areaName: string) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify({ postalCode, areaName }));
    } catch (error) {
      console.error('Error saving location preferences:', error);
    }
  };

  // Update price multiplier based on postal code
  const updatePriceMultiplier = (postalCode: string | undefined) => {
    if (!postalCode) {
      setState(prev => ({
        ...prev,
        priceMultiplier: DEFAULT_PRICE_MULTIPLIER,
        currentAreaName: null,
      }));
      return;
    }

    const locationData = LOCATION_PRICING[postalCode];
    if (locationData) {
      setState(prev => ({
        ...prev,
        priceMultiplier: locationData.priceMultiplier,
        currentAreaName: locationData.areaName,
      }));
    } else {
      setState(prev => ({
        ...prev,
        priceMultiplier: DEFAULT_PRICE_MULTIPLIER,
        currentAreaName: null,
      }));
    }
  };

  const getLocation = async () => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setState(prev => ({
          ...prev,
          loading: false,
          error: 'Location permission denied'
        }));
        return;
      }

      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });

      const [addressDetails] = await Location.reverseGeocodeAsync({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude
      });

      if (!addressDetails) {
        throw new Error('Could not fetch address details');
      }

      const address: DetailedAddress = {
        area: addressDetails.district || addressDetails.subregion || 'Unknown Area',
        city: addressDetails.city || 'Unknown City',
        street: addressDetails.street || undefined,
        landmark: addressDetails.name || undefined,
        postalCode: addressDetails.postalCode || undefined,
        region: addressDetails.region || undefined,
        fullAddress: [
          addressDetails.street,
          addressDetails.district,
          addressDetails.city,
          addressDetails.region,
          addressDetails.postalCode
        ].filter(Boolean).join(', ') || 'Address not available'
      };

      // Update price multiplier based on postal code
      updatePriceMultiplier(address.postalCode);

      // Save location preferences
      if (address.postalCode) {
        await saveLocationPreferences(address.postalCode, address.area);
      }

      setState(prev => ({
        ...prev,
        location,
        address,
        loading: false,
        error: null,
      }));

    } catch (error) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Error getting location'
      }));
    }
  };

  // Set manual location
  const setManualLocation = async (postalCode: string) => {
    const locationData = LOCATION_PRICING[postalCode];
    if (locationData) {
      updatePriceMultiplier(postalCode);
      await saveLocationPreferences(postalCode, locationData.areaName);
      setState(prev => ({
        ...prev,
        address: {
          ...prev.address!,
          postalCode,
          area: locationData.areaName,
        },
      }));
    }
  };

  // Check if location is serviceable
  const isLocationServiceable = (postalCode: string): boolean => {
    return LOCATION_PRICING[postalCode]?.isServiceable ?? false;
  };

  // Load saved location on mount
  useEffect(() => {
    loadSavedLocation();
    getLocation();
  }, []);

  return {
    ...state,
    getLocation,
    setManualLocation,
    isLocationServiceable,
    availableLocations: LOCATION_PRICING,
  };
};

// Usage example:
/*
const MyComponent = () => {
  const { 
    location, 
    address, 
    loading, 
    error, 
    priceMultiplier, 
    currentAreaName,
    getLocation,
    setManualLocation,
    isLocationServiceable 
  } = useLocation();

  const calculatePrice = (basePrice: number) => {
    return (basePrice * priceMultiplier).toFixed(2);
  };

  return (
    <View>
      {currentAreaName && (
        <Text>Delivering to: {currentAreaName}</Text>
      )}
      <Text>Price: ₹{calculatePrice(100)}</Text>
    </View>
  );
};
*/