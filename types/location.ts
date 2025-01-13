// types/location.ts
export interface DetailedAddress {
    area: string;
    city: string;
    street?: string;
    landmark?: string;
    postalCode?: string;
    region?: string;
    fullAddress: string;
  }
  
  export interface LocationData {
    areaName: string;
    priceMultiplier: number;
    isServiceable: boolean;
  }
  
  // Define valid postal codes as literal types
  export type ValidPostalCode = 
    | '110001' 
    | '400001' 
    | '700001' 
    | '302001' 
    | '302002' 
    | '302003' 
    | '302004';
  
  export interface LocationContextType {
    currentPincode: string | null;
    currentAreaName: string | null;
    priceMultiplier: number;
    locationLoading: boolean;
    locationError: string | null;
    updateLocation: () => Promise<void>;
    setManualPincode: (pincode: ValidPostalCode) => Promise<void>;
  }