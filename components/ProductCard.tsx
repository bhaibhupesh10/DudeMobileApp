// components/ProductCard.tsx
import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { Text } from './ui/Text';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { Ionicons } from '@expo/vector-icons';

interface ProductCardProps {
  product: Product;
  onPress: () => void;
  className?: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({ 
  product,
  onPress,
  className 
}) => {
  const { addToCart, cartItems } = useCart();
  
  // Check if product is in cart
  const cartItem = cartItems.find(item => item.id === product.id);
  
  const handleAddToCart = (e: any) => {
    e.stopPropagation(); // Prevent triggering the card's onPress
    addToCart(product);
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      className={`bg-white rounded-lg shadow-sm overflow-hidden ${className}`}
      activeOpacity={0.7}
    >
      <Image
        source={product.image}
        className="w-full h-40"
        resizeMode="cover"
      />
      <View className="p-3">
        <Text className="font-medium" numberOfLines={2}>
          {product.name}
        </Text>
        <Text className="text-sm text-gray-500">
          {product.weight}
        </Text>
        <View className="flex-row items-center justify-between mt-1">
          <View>
            <View className="flex-row items-center">
              <Text className="text-lg font-bold">
                ₹{product.basePrice}
              </Text>
              {product.baseMrp && (
                <Text className="text-sm text-gray-500 line-through ml-2">
                  ₹{product.baseMrp}
                </Text>
              )}
            </View>
            {product.discount && (
              <Text className="text-green-600 text-sm">
                {product.discount}
              </Text>
            )}
          </View>
          
          {/* Add to Cart Button */}
          <TouchableOpacity
            onPress={handleAddToCart}
            className={`p-2 rounded-full ${cartItem ? 'bg-green-500' : 'bg-gray-100'}`}
            activeOpacity={0.7}
          >
            <Ionicons 
              name={cartItem ? "checkmark" : "add"} 
              size={20} 
              color={cartItem ? "white" : "black"} 
            />
          </TouchableOpacity>
        </View>

        {/* Show quantity if item is in cart */}
        {cartItem && (
          <View className="mt-2 bg-gray-50 rounded-lg p-2">
            <Text className="text-sm text-gray-600">
              {cartItem.quantity} in cart
            </Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

// Optional: Add loading state component
export const ProductCardSkeleton: React.FC<{ className?: string }> = ({ className }) => (
  <View className={`bg-white rounded-lg shadow-sm overflow-hidden animate-pulse ${className}`}>
    <View className="w-full h-40 bg-gray-200" />
    <View className="p-3">
      <View className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
      <View className="h-4 bg-gray-200 rounded w-1/2 mb-2" />
      <View className="h-6 bg-gray-200 rounded w-1/3" />
    </View>
  </View>
);