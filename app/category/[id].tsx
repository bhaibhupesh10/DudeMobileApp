// // app/category/[id].tsx
// import React from 'react';
// import { View, ScrollView } from 'react-native';
// import { useLocalSearchParams } from 'expo-router';
// import { Text } from '../../components/ui/Text';
// import {  ProductCard } from '../../components/ui/ProductCard';
// import { UNSPLASH_IMAGES }  from '../../constants/images';

// const CategoryScreen = () => {
//   const { id } = useLocalSearchParams();
  
//   return (
//     <ScrollView className="flex-1 bg-white">
//       <View className="p-4">
//         <Text className="text-lg font-bold mb-4">Products in this category</Text>
//         <View className="flex-row flex-wrap justify-between">
//           <ProductCard
//             image={UNSPLASH_IMAGES.sugar}
//             name="Premium Sugar"
//             price="₹51/kg"
//             discount="20% OFF"
//           />
//           {/* Add more products */}
//         </View>
//       </View>
//     </ScrollView>
//   );
// };

// export default CategoryScreen;










// app/category/[id].tsx
import React from 'react';
import { View, ScrollView } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { Text } from '../../components/ui/Text';
import { ProductCard } from '../../components/ui/ProductCard';
import { UNSPLASH_IMAGES } from '../../constants/images';

const CATEGORY_PRODUCTS = [
  {
    id: '1',
    image: UNSPLASH_IMAGES.sugar,
    name: "Premium Sugar",
    basePrice: 51,
    baseMrp: 60,
    weight: "1 kg",
    discount: "20% OFF"
  },
  {
    id: '2',
    image: UNSPLASH_IMAGES.atta,
    name: "Whole Wheat Atta",
    basePrice: 371,
    baseMrp: 458,
    weight: "10 kg",
    discount: "15% OFF"
  },
  // Add more products as needed
];

const CategoryScreen = () => {
  const { id } = useLocalSearchParams();
  
  return (
    <ScrollView className="flex-1 bg-white">
      <View className="p-4">
        <Text className="text-lg font-bold mb-4">Products in this category</Text>
        <View className="flex-row flex-wrap justify-between">
          {CATEGORY_PRODUCTS.map((product) => (
            <ProductCard
              key={product.id}
              image={product.image}
              name={product.name}
              basePrice={product.basePrice}
              baseMrp={product.baseMrp}
              discount={product.discount}
              weight={product.weight}
              onPress={() => router.push(`/product/${product.id}`)}
              className="w-[48%] mb-4"
            />
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default CategoryScreen;