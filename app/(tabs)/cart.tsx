

// app/(tabs)/cart.tsx
import React from 'react';
import { View, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Text } from '../../components/ui/Text';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { useCart } from '../../context/CartContext';
import { CartItem } from '../../types/cart';

interface CartItemCardProps {
  item: CartItem;
  onUpdateQuantity: (id: string, quantity: number) => void;
}

const CartItemCard: React.FC<CartItemCardProps> = ({ item, onUpdateQuantity }) => (
  <View className="p-4 border-b border-gray-200">
    <View className="flex-row">
      <Image source={item.image} className="w-20 h-20 rounded" />
      <View className="flex-1 ml-4">
        <Text className="font-medium">{item.name}</Text>
        <Text className="text-gray-600 mt-1">₹{item.price}</Text>
        
        {/* Quantity Controls */}
        <View className="flex-row items-center mt-2">
          <TouchableOpacity
            onPress={() => onUpdateQuantity(item.id, Math.max(0, item.quantity - 1))}
            className="w-8 h-8 bg-gray-100 rounded-full items-center justify-center"
          >
            <Ionicons name="remove" size={20} color="black" />
          </TouchableOpacity>
          <Text className="mx-4">{item.quantity}</Text>
          <TouchableOpacity
            onPress={() => onUpdateQuantity(item.id, item.quantity + 1)}
            className="w-8 h-8 bg-gray-100 rounded-full items-center justify-center"
          >
            <Ionicons name="add" size={20} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  </View>
);

const CartScreen: React.FC = () => {
  const { cartItems, updateQuantity, getCartTotal } = useCart();
  const totalAmount = getCartTotal();

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1">
        {/* Header */}
        <View className="p-4 border-b border-gray-200">
          <Text className="text-xl font-bold">Shopping Cart</Text>
        </View>

        {/* Cart Items */}
        <ScrollView className="flex-1">
          {cartItems.length === 0 ? (
            <View className="flex-1 items-center justify-center p-4">
              <Text className="text-gray-500">Your cart is empty</Text>
            </View>
          ) : (
            <>
              {cartItems.map(item => (
                <CartItemCard
                  key={item.id}
                  item={item}
                  onUpdateQuantity={updateQuantity}
                />
              ))}

              {/* Offers Section */}
              <Card className="m-4 p-4">
                <Text className="font-bold mb-2">Available Offers</Text>
                <View className="flex-row items-center">
                  <Ionicons name="pricetag" size={20} color="#22C55E" />
                  <Text className="ml-2 text-gray-600">
                    Get 10% off on orders above ₹500
                  </Text>
                </View>
              </Card>
            </>
          )}
        </ScrollView>

        {/* Bottom Sheet */}
        {cartItems.length > 0 && (
          <View className="border-t border-gray-200 p-4">
            <View className="flex-row justify-between mb-4">
              <Text className="text-gray-600">Total Amount</Text>
              <Text className="font-bold">₹{totalAmount}</Text>
            </View>
            <Button onPress={() => console.log('Proceed to checkout')}>
              Proceed to Checkout
            </Button>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default CartScreen;