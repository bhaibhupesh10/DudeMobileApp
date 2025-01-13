// components/DealCard.tsx
import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { Text } from './ui/Text';

interface Deal {
  id: string;
  title: string;
  originalPrice: number;
  discountedPrice: number;
  image: string;
  discountPercentage: number;
  validUntil: string;
}

interface DealCardProps {
  deal: Deal;
  onPress: () => void;
}

export const DealCard: React.FC<DealCardProps> = ({ deal, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="bg-white rounded-lg shadow-sm overflow-hidden"
      activeOpacity={0.7}
    >
      <Image
        source={{ uri: deal.image }}
        className="w-full h-48"
        resizeMode="cover"
      />
      <View className="absolute top-2 right-2 bg-red-500 px-2 py-1 rounded">
        <Text className="text-white font-bold">
          {deal.discountPercentage}% OFF
        </Text>
      </View>
      <View className="p-4">
        <Text className="text-lg font-bold" numberOfLines={2}>
          {deal.title}
        </Text>
        <View className="flex-row items-center mt-2">
          <Text className="text-lg font-bold text-red-500">
            ${deal.discountedPrice.toFixed(2)}
          </Text>
          <Text className="ml-2 text-gray-500 line-through">
            ${deal.originalPrice.toFixed(2)}
          </Text>
        </View>
        <Text className="text-sm text-gray-500 mt-2">
          Valid until {new Date(deal.validUntil).toLocaleDateString()}
        </Text>
      </View>
    </TouchableOpacity>
  );
};