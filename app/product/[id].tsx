// // app/product/[id].tsx
// import React from 'react';
// import { View, ScrollView, Image } from 'react-native';
// import { useLocalSearchParams } from 'expo-router';
// import { Text } from '../../components/ui/Text';
// import { Button } from '../../components/ui/Button';
// import {IMAGES } from '../../constants/images';

// const ProductScreen = () => {
//   const { id } = useLocalSearchParams();

//   return (
//     <ScrollView className="flex-1 bg-white">
//       <Image 
//         source={IMAGES.sugar}
//         className="w-full h-80"
//         resizeMode="cover"
//       />
      
//       <View className="p-4">
//         <Text className="text-2xl font-bold">Premium Sugar</Text>
//         <Text className="text-gray-600 mt-2">1 kg</Text>
        
//         <View className="flex-row items-center mt-4">
//           <Text className="text-2xl font-bold">₹51</Text>
//           <Text className="text-gray-500 line-through ml-2">₹60</Text>
//           <View className="bg-green-100 px-2 py-1 rounded ml-2">
//             <Text className="text-green-700 text-sm">15% OFF</Text>
//           </View>
//         </View>

//         <View className="mt-6">
//           <Text className="font-bold text-lg mb-2">Product Description</Text>
//           <Text className="text-gray-600">
//             Premium quality sugar that's perfect for your daily needs. 
//             Finely processed and pure.
//           </Text>
//         </View>

//         <Button 
//           onPress={() => console.log('Add to cart')}
//           className="mt-6"
//         >
//           Add to Cart
//         </Button>
//       </View>
//     </ScrollView>
//   );
// };

// export default ProductScreen;









// app/product/[id].tsx
import React from 'react';
import { View, ScrollView, Image, TouchableOpacity, Dimensions } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { Text } from '../../components/ui/Text';
import { Ionicons } from '@expo/vector-icons';
import { useGlobalContext } from '../../context/GlobalProvider';
import { IMAGES } from '../../constants/images';

const { width } = Dimensions.get('window');

// Product data type
interface ProductDetails {
  id: string;
  name: string;
  description: string;
  basePrice: number;
  baseMrp?: number;
  discount?: string;
  weight?: string;
  image: { uri: string };
  features?: string[];
  specifications?: { [key: string]: string };
  category?: string;
  brand?: string;
  inStock?: boolean;
  deliveryTime?: string;
}

// Mock product data
const PRODUCT_DATA: { [key: string]: ProductDetails } = {
  'sugar': {
    id: 'sugar',
    name: 'Premium Sugar',
    description: 'High-quality refined sugar perfect for all your sweetening needs. Our sugar is processed under strict quality control to ensure purity and consistency. Each grain is carefully processed to maintain the perfect sweetness and dissolving properties.',
    basePrice: 51,
    baseMrp: 60,
    weight: '1 kg',
    discount: '15% OFF',
    image: IMAGES.sugar,
    category: 'Groceries',
    brand: 'Premium Foods',
    inStock: true,
    deliveryTime: '2-3 days',
    features: [
      'Pure and refined',
      'Free from impurities',
      'Perfect sweetness',
      'Dissolves quickly',
      'No artificial additives',
      'Suitable for all cooking needs'
    ],
    specifications: {
      'Brand': 'Premium Foods',
      'Package Weight': '1 kg',
      'Type': 'Refined Sugar',
      'Shelf Life': '24 months',
      'Storage': 'Store in a cool, dry place',
      'Country of Origin': 'India',
      'Packaging Type': 'Food Grade Plastic',
      'Maximum Shelf Life': '24 Months'
    }
  },
  'salt': {
    id: 'salt',
    name: 'Iodized Table Salt',
    description: 'Pure iodized salt that ensures the perfect taste in every dish. Our salt is processed with the latest technology to ensure proper iodization and purity. Perfect for all your cooking needs.',
    basePrice: 9,
    baseMrp: 12,
    weight: '1 kg',
    discount: '25% OFF',
    image: IMAGES.salt,
    category: 'Groceries',
    brand: 'Premium Foods',
    inStock: true,
    deliveryTime: '2-3 days',
    features: [
      'Iodized for health',
      'Pure and clean',
      'Perfect for cooking',
      'Free-flowing crystals',
      'No lumps',
      'Consistent grain size'
    ],
    specifications: {
      'Brand': 'Premium Foods',
      'Package Weight': '1 kg',
      'Type': 'Iodized Salt',
      'Shelf Life': '24 months',
      'Storage': 'Store in a cool, dry place',
      'Country of Origin': 'India',
      'Packaging Type': 'Food Grade Plastic',
      'Iodine Content': '15-30 ppm'
    }
  },
  // Add more products as needed
};

export default function ProductScreen() {
  const { id } = useLocalSearchParams();
  const { currentAreaName, priceMultiplier } = useGlobalContext();
  
  const product = PRODUCT_DATA[id as string];

  if (!product) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <Ionicons name="alert-circle-outline" size={48} color="gray" />
        <Text className="text-lg text-gray-600 mt-2">Product not found</Text>
        <TouchableOpacity 
          className="mt-4 bg-green-500 px-6 py-2 rounded-full"
          onPress={() => router.back()}
        >
          <Text className="text-white">Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const adjustedPrice = (product.basePrice * priceMultiplier).toFixed(2);
  const adjustedMrp = product.baseMrp ? (product.baseMrp * priceMultiplier).toFixed(2) : undefined;
  const savedAmount = adjustedMrp ? (Number(adjustedMrp) - Number(adjustedPrice)).toFixed(2) : '0';

  return (
    <View className="flex-1 bg-white">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Product Image */}
        <View className="relative">
          <Image 
            source={product.image}
            style={{ width, height: width * 0.8 }}
            resizeMode="contain"
          />
          {product.discount && (
            <View className="absolute top-4 left-4 bg-red-500 px-3 py-1 rounded">
              <Text className="text-white font-bold">{product.discount}</Text>
            </View>
          )}
        </View>

        {/* Product Info */}
        <View className="p-4">
          {/* Basic Info */}
          <View className="border-b border-gray-200 pb-4">
            <Text className="text-2xl font-bold">{product.name}</Text>
            <Text className="text-gray-500 mt-1">{product.brand}</Text>
            
            {product.weight && (
              <Text className="text-gray-500 mt-1">{product.weight}</Text>
            )}

            <View className="flex-row items-center mt-2">
              <Text className="text-3xl font-bold text-green-600">₹{adjustedPrice}</Text>
              {adjustedMrp && (
                <>
                  <Text className="text-gray-500 line-through ml-2">₹{adjustedMrp}</Text>
                  <Text className="text-green-600 ml-2">Save ₹{savedAmount}</Text>
                </>
              )}
            </View>

            {priceMultiplier !== 1 && (
              <Text className="text-sm text-green-600 mt-1">
                *Price adjusted for your location
              </Text>
            )}
          </View>

          {/* Delivery Info */}
          <View className="py-4 border-b border-gray-200">
            {currentAreaName && (
              <View className="flex-row items-center">
                <Ionicons name="location-outline" size={20} color="gray" />
                <Text className="text-gray-600 ml-2">
                  Delivering to: {currentAreaName}
                </Text>
              </View>
            )}
            
            {product.deliveryTime && (
              <View className="flex-row items-center mt-2">
                <Ionicons name="time-outline" size={20} color="gray" />
                <Text className="text-gray-600 ml-2">
                  Delivery in {product.deliveryTime}
                </Text>
              </View>
            )}

            {product.inStock ? (
              <View className="flex-row items-center mt-2">
                <Ionicons name="checkmark-circle" size={20} color="green" />
                <Text className="text-green-600 ml-2">In Stock</Text>
              </View>
            ) : (
              <View className="flex-row items-center mt-2">
                <Ionicons name="close-circle" size={20} color="red" />
                <Text className="text-red-600 ml-2">Out of Stock</Text>
              </View>
            )}
          </View>

          {/* Description */}
          <View className="py-4 border-b border-gray-200">
            <Text className="text-lg font-bold mb-2">About this item</Text>
            <Text className="text-gray-600 leading-6">{product.description}</Text>
          </View>

          {/* Features */}
          {product.features && (
            <View className="py-4 border-b border-gray-200">
              <Text className="text-lg font-bold mb-2">Key Features</Text>
              {product.features.map((feature, index) => (
                <View key={index} className="flex-row items-center mb-2">
                  <Ionicons name="checkmark-circle" size={20} color="green" />
                  <Text className="text-gray-600 ml-2">{feature}</Text>
                </View>
              ))}
            </View>
          )}

          {/* Specifications */}
          {product.specifications && (
            <View className="py-4">
              <Text className="text-lg font-bold mb-2">Product Details</Text>
              {Object.entries(product.specifications).map(([key, value], index) => (
                <View 
                  key={index} 
                  className={`flex-row py-3 ${
                    index !== Object.entries(product.specifications!).length - 1 
                      ? 'border-b border-gray-200' 
                      : ''
                  }`}
                >
                  <Text className="flex-1 text-gray-500">{key}</Text>
                  <Text className="flex-1 text-gray-800">{value}</Text>
                </View>
              ))}
            </View>
          )}
        </View>
      </ScrollView>

      {/* Bottom Action Bar */}
      <View className="p-4 border-t border-gray-200 bg-white">
        <View className="flex-row space-x-4">
          <TouchableOpacity 
            className="flex-1 bg-yellow-500 py-3 rounded-lg"
            onPress={() => console.log('Buy Now')}
          >
            <Text className="text-white text-center font-bold">Buy Now</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            className="flex-1 bg-green-500 py-3 rounded-lg"
            onPress={() => console.log('Add to Cart')}
          >
            <Text className="text-white text-center font-bold">Add to Cart</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}