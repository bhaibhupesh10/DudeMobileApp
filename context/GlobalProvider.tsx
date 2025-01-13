// import React, { createContext, useContext, useEffect, useState, Context } from "react";
// import { getCurrentUser } from "../lib/handleAuth";
// import { Models } from "react-native-appwrite";

// // Define the context value type
// interface GlobalContextType {
//   isLogged: boolean;
//   setIsLogged: React.Dispatch<React.SetStateAction<boolean>>;
//   user: Models.User<Models.Preferences> | null;
//   setUser: React.Dispatch<React.SetStateAction<Models.User<Models.Preferences> | null>>;
//   loading: boolean;
// }

// // Create context with proper type
// const GlobalContext: Context<GlobalContextType | undefined> = createContext<GlobalContextType | undefined>(undefined);

// // Type-safe custom hook
// export const useGlobalContext = (): GlobalContextType => {
//   const context = useContext(GlobalContext);
//   if (context === undefined) {
//     throw new Error("useGlobalContext must be used within a GlobalProvider");
//   }
//   return context;
// };

// // Type the provider props
// interface GlobalProviderProps {
//   children: React.ReactNode;
// }

// const GlobalProvider: React.FC<GlobalProviderProps> = ({ children }) => {
//   const [isLogged, setIsLogged] = useState<boolean>(false);
//   const [user, setUser] = useState<Models.User<Models.Preferences> | null>(null);
//   const [loading, setLoading] = useState<boolean>(true);

//   useEffect(() => {
//     getCurrentUser()
//       .then((res) => {
//         if (res) {
//           setIsLogged(true);
//           setUser(res);
//         } else {
//           setIsLogged(false);
//           setUser(null);
//         }
//       })
//       .catch((error) => {
//         console.log(error);
//       })
//       .finally(() => {
//         setLoading(false);
//       });
//   }, []);

//   const value: GlobalContextType = {
//     isLogged,
//     setIsLogged,
//     user,
//     setUser,
//     loading,
//   };

//   return (
//     <GlobalContext.Provider value={value}>
//       {children}
//     </GlobalContext.Provider>
//   );
// };

// export default GlobalProvider;






// context/GlobalProvider.tsx
import React, { createContext, useContext, useEffect, useState, Context } from "react";
import { getCurrentUser } from "../lib/handleAuth";
import { Models } from "react-native-appwrite";
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';
import { LOCATION_PRICING, DEFAULT_PRICE_MULTIPLIER, STORAGE_KEY, isValidPostalCode } from '../constants/location';
import { LocationContextType, DetailedAddress, ValidPostalCode } from '../types/location';

// Combined Context Type
interface GlobalContextType extends LocationContextType {
  isLogged: boolean;
  setIsLogged: React.Dispatch<React.SetStateAction<boolean>>;
  user: Models.User<Models.Preferences> | null;
  setUser: React.Dispatch<React.SetStateAction<Models.User<Models.Preferences> | null>>;
  loading: boolean;
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (context === undefined) {
    throw new Error("useGlobalContext must be used within a GlobalProvider");
  }
  return context;
};

interface GlobalProviderProps {
  children: React.ReactNode;
}

const GlobalProvider: React.FC<GlobalProviderProps> = ({ children }) => {
  // Auth states
  const [isLogged, setIsLogged] = useState<boolean>(false);
  const [user, setUser] = useState<Models.User<Models.Preferences> | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Location states
  const [currentPincode, setCurrentPincode] = useState<string | null>(null);
  const [currentAreaName, setCurrentAreaName] = useState<string | null>(null);
  const [priceMultiplier, setPriceMultiplier] = useState(DEFAULT_PRICE_MULTIPLIER);
  const [locationLoading, setLocationLoading] = useState(true);
  const [locationError, setLocationError] = useState<string | null>(null);

  // Location functions
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
      setLocationError('Location not serviceable');
      setPriceMultiplier(DEFAULT_PRICE_MULTIPLIER);
    }
  };

  const setManualPincode = async (postalCode: ValidPostalCode) => {
    setLocationLoading(true);
    await updateLocationDetails(postalCode);
    setLocationLoading(false);
  };

  const updateLocation = async () => {
    try {
      setLocationLoading(true);
      setLocationError(null);

      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setLocationError('Location permission denied');
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
        setLocationError('Could not determine postal code');
      }
    } catch (err) {
      setLocationError(err instanceof Error ? err.message : 'Location error');
    } finally {
      setLocationLoading(false);
    }
  };

  // Auth effect
  useEffect(() => {
    getCurrentUser()
      .then((res) => {
        if (res) {
          setIsLogged(true);
          setUser(res);
        } else {
          setIsLogged(false);
          setUser(null);
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // Location effect
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
        setLocationLoading(false);
      }
    };

    loadSavedLocation();
    updateLocation();
  }, []);

  const value: GlobalContextType = {
    // Auth values
    isLogged,
    setIsLogged,
    user,
    setUser,
    loading,
    // Location values
    currentPincode,
    currentAreaName,
    priceMultiplier,
    locationLoading,
    locationError,
    updateLocation,
    setManualPincode,
  };

  return (
    <GlobalContext.Provider value={value}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;