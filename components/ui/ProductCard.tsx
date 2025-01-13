// // components/ui/ProductCard.tsx
// import React from 'react';
// import { View, Image, TouchableOpacity, ImageSourcePropType } from 'react-native';
// import { Text } from './Text';

// interface ProductCardProps {
//   image: ImageSourcePropType;
//   name: string;
//   price: string;
//   mrp?: string;
//   discount?: string;
//   weight?: string;
//   onPress?: () => void;
//   className?: string;
// }

// export const ProductCard: React.FC<ProductCardProps> = ({
//   image,
//   name,
//   price,
//   mrp,
//   discount,
//   weight,
//   onPress,
//   className,
// }) => {
//   return (
//     <TouchableOpacity
//       onPress={onPress}
//       className={`bg-white rounded-lg p-3 shadow-sm ${className || ''}`}
//     >
//       <View className="relative">
//         <Image 
//           source={image}
//           className="w-full h-32 rounded-lg"
//           resizeMode="contain"
//         />
//         {discount && (
//           <View className="absolute top-2 left-2 bg-red-500 px-2 py-1 rounded">
//             <Text className="text-white text-xs">{discount}</Text>
//           </View>
//         )}
//       </View>
      
//       <Text className="font-medium mt-2" numberOfLines={2}>
//         {name}
//       </Text>
      
//       {weight && (
//         <Text className="text-gray-500 text-sm mt-1">
//           {weight}
//         </Text>
//       )}
      
//       <View className="flex-row items-center mt-2">
//         <Text className="font-bold text-lg">{price}</Text>
//         {mrp && (
//           <Text className="text-gray-500 line-through ml-2 text-sm">
//             {mrp}
//           </Text>
//         )}
//       </View>
//     </TouchableOpacity>
//   );
// };











// components/ui/ProductCard.tsx
import React from 'react';
import { View, Image, TouchableOpacity, ImageSourcePropType } from 'react-native';
import { Text } from './Text';
import { useGlobalContext } from '../../context/GlobalProvider';

interface ProductCardProps {
  image: ImageSourcePropType;
  name: string;
  basePrice: number;
  baseMrp?: number;
  discount?: string;
  weight?: string;
  onPress?: () => void;
  className?: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  image,
  name,
  basePrice,
  baseMrp,
  discount,
  weight,
  onPress,
  className,
}) => {
  const { currentAreaName, priceMultiplier } = useGlobalContext();

  // Calculate location-adjusted prices
  const adjustedPrice = (basePrice * priceMultiplier).toFixed(2);
  const adjustedMrp = baseMrp ? (baseMrp * priceMultiplier).toFixed(2) : undefined;

  // Format prices for display
  const displayPrice = `₹${adjustedPrice}`;
  const displayMrp = adjustedMrp ? `₹${adjustedMrp}` : undefined;

  return (
    <TouchableOpacity
      onPress={onPress}
      className={`bg-white rounded-lg p-3 shadow-sm ${className || ''}`}
    >
      <View className="relative">
        <Image 
          source={image}
          className="w-full h-32 rounded-lg"
          resizeMode="contain"
        />
        {discount && (
          <View className="absolute top-2 left-2 bg-red-500 px-2 py-1 rounded">
            <Text className="text-white text-xs">{discount}</Text>
          </View>
        )}
      </View>
      
      <Text className="font-medium mt-2" numberOfLines={2}>
        {name}
      </Text>
      
      {weight && (
        <Text className="text-gray-500 text-sm mt-1">
          {weight}
        </Text>
      )}

      {currentAreaName && (
        <Text className="text-xs text-gray-500 mt-1">
          Delivering to: {currentAreaName}
        </Text>
      )}
      
      <View className="flex-row items-center mt-2">
        <Text className="font-bold text-lg">{displayPrice}</Text>
        {displayMrp && (
          <Text className="text-gray-500 line-through ml-2 text-sm">
            {displayMrp}
          </Text>
        )}
      </View>

      {priceMultiplier !== 1 && (
        <Text className="text-xs text-green-600 mt-1">
          *Price adjusted for your location
        </Text>
      )}
    </TouchableOpacity>
  );
};