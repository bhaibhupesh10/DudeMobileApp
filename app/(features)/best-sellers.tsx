// app/(features)/best-sellers.tsx
import React from 'react';
import { View, ScrollView, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack } from 'expo-router';
import { Text } from '../../components/ui/Text';
import { ProductCard } from '../../components/ProductCard';

// Define product type
interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
}

const BestSellersScreen: React.FC = () => {
  // Mock data - replace with actual data fetching
  const bestSellers: Product[] = [
    {
      id: '1',
      name: 'Product 1',
      price: 99.99,
      image: 'https://via.placeholder.com/150',
      description: 'Best selling product description',
    },
    {
      id: '2',
      name: 'Product 2',
      price: 149.99,
      image: 'https://via.placeholder.com/150',
      description: 'Another best selling product',
    },
    // Add more products as needed
  ];

  const renderProduct = ({ item }: { item: Product }) => (
    <ProductCard
      product={item}
      onPress={() => {
        // Handle product press
      }}
    />
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
      <Stack.Screen
        options={{
          title: 'Best Sellers',
          headerShadowVisible: false,
        }}
      />
      
      <View className="flex-1">
        <FlatList
          data={bestSellers}
          renderItem={renderProduct}
          keyExtractor={(item) => item.id}
          numColumns={2}
          contentContainerStyle={{ padding: 16 }}
          columnWrapperStyle={{ gap: 16 }}
          ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
          ListEmptyComponent={() => (
            <View className="flex-1 items-center justify-center p-4">
              <Text className="text-gray-500">No products found</Text>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default BestSellersScreen;