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
import { ProductCard } from '../../components/ProductCard';
import { getItemsByCategory } from '../../utils/categoryUtils';
import { Product } from '../../types';

const CategoryScreen: React.FC = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const categoryItems = getItemsByCategory(id);

  const handleProductPress = (productId: string) => {
    router.push(`/product/${productId}`);
  };

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="p-4">
        <Text className="text-lg font-bold mb-4">Products in this category</Text>
        <View className="flex-row flex-wrap justify-between">
          {categoryItems.map((product: Product) => (
            <ProductCard
              key={product.id}
              product={product}
              onPress={() => handleProductPress(product.id)}
              className="w-[48%] mb-4"
            />
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default CategoryScreen;