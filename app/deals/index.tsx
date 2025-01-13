// app/(features)/deals.tsx
import React from 'react';
import { View, ScrollView, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack } from 'expo-router';
import { Text } from '../../components/ui/Text';
import { DealCard } from '../../components/DealCard';

// Define deal type
interface Deal {
  id: string;
  title: string;
  originalPrice: number;
  discountedPrice: number;
  image: string;
  discountPercentage: number;
  validUntil: string;
}

const DealsScreen: React.FC = () => {
  // Mock data - replace with actual data fetching
  const deals: Deal[] = [
    {
      id: '1',
      title: 'Special Deal 1',
      originalPrice: 199.99,
      discountedPrice: 149.99,
      image: 'https://via.placeholder.com/300x200',
      discountPercentage: 25,
      validUntil: '2024-03-31',
    },
    {
      id: '2',
      title: 'Flash Sale Item',
      originalPrice: 299.99,
      discountedPrice: 199.99,
      image: 'https://via.placeholder.com/300x200',
      discountPercentage: 33,
      validUntil: '2024-03-25',
    },
    // Add more deals as needed
  ];

  const renderDeal = ({ item }: { item: Deal }) => (
    <DealCard
      deal={item}
      onPress={() => {
        // Handle deal press
      }}
    />
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
      <Stack.Screen
        options={{
          title: 'Today\'s Deals',
          headerShadowVisible: false,
        }}
      />
      
      <View className="flex-1">
        <FlatList
          data={deals}
          renderItem={renderDeal}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ padding: 16 }}
          ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
          ListHeaderComponent={() => (
            <View className="mb-4">
              <Text className="text-xl font-bold">Limited Time Offers</Text>
              <Text className="text-gray-500 mt-1">
                Grab these deals before they're gone!
              </Text>
            </View>
          )}
          ListEmptyComponent={() => (
            <View className="flex-1 items-center justify-center p-4">
              <Text className="text-gray-500">No active deals at the moment</Text>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default DealsScreen;