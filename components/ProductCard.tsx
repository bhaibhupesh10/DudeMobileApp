// components/ProductCard.tsx
import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { Text } from './ui/Text';

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
}

interface ProductCardProps {
  product: Product;
  onPress: () => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="flex-1 bg-white rounded-lg shadow-sm overflow-hidden"
      activeOpacity={0.7}
    >
      <Image
        source={{ uri: product.image }}
        className="w-full h-40"
        resizeMode="cover"
      />
      <View className="p-3">
        <Text className="font-medium" numberOfLines={2}>
          {product.name}
        </Text>
        <Text className="text-lg font-bold mt-1">
          ${product.price.toFixed(2)}
        </Text>
      </View>
    </TouchableOpacity>
  );
};