// components/screens/OrdersScreen.tsx
import React from 'react';
import { View, FlatList, TouchableOpacity } from 'react-native';
import { Text } from '../ui/Text';
import { Ionicons } from '@expo/vector-icons';

interface Order {
  id: string;
  orderNumber: string;
  date: string;
  status: 'pending' | 'delivered' | 'cancelled';
  total: number;
  items: number;
}

const MOCK_ORDERS: Order[] = [
  {
    id: '1',
    orderNumber: 'ORD001',
    date: '2024-01-15',
    status: 'delivered',
    total: 499,
    items: 3,
  },
  // Add more mock orders
];

export const OrdersScreen = () => {
  const renderOrder = ({ item }: { item: Order }) => (
    <TouchableOpacity 
      className="bg-white p-4 mb-2 rounded-lg shadow-sm"
      onPress={() => console.log(`View order ${item.orderNumber}`)}
    >
      <View className="flex-row justify-between items-center">
        <Text className="font-bold">Order #{item.orderNumber}</Text>
        <Text className={`
          ${item.status === 'delivered' ? 'text-green-600' : 
            item.status === 'cancelled' ? 'text-red-600' : 'text-yellow-600'}
        `}>
          {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
        </Text>
      </View>
      
      <Text className="text-gray-500 mt-1">{item.date}</Text>
      
      <View className="flex-row justify-between items-center mt-2">
        <Text>₹{item.total}</Text>
        <Text className="text-gray-500">{item.items} items</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 bg-gray-50 p-4">
      <FlatList
        data={MOCK_ORDERS}
        renderItem={renderOrder}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

// components/screens/EarningsScreen.tsx
export const EarningsScreen = () => {
  return (
    <View className="flex-1 bg-white p-4">
      <View className="bg-green-500 p-6 rounded-lg">
        <Text className="text-white text-lg">Total Earnings</Text>
        <Text className="text-white text-3xl font-bold mt-2">₹1,234.00</Text>
      </View>
      
      {/* Add earnings history */}
    </View>
  );
};

// components/screens/ReferralScreen.tsx
export const ReferralScreen = () => {
  return (
    <View className="flex-1 bg-white p-4">
      <View className="bg-yellow-50 p-6 rounded-lg mb-4">
        <Text className="text-xl font-bold">Your Referral Code</Text>
        <Text className="text-3xl font-bold text-yellow-600 mt-2">ABC123</Text>
      </View>
      
      <TouchableOpacity 
        className="bg-green-500 p-4 rounded-lg"
        onPress={() => console.log('Share referral code')}
      >
        <Text className="text-white text-center">Share Code</Text>
      </TouchableOpacity>
    </View>
  );
};

// components/screens/AddressesScreen.tsx
interface Address {
  id: string;
  type: 'home' | 'work' | 'other';
  address: string;
  isDefault: boolean;
}

export const AddressesScreen = () => {
  const [addresses, setAddresses] = React.useState<Address[]>([
    {
      id: '1',
      type: 'home',
      address: '123 Main St, City, State 12345',
      isDefault: true,
    },
    // Add more addresses
  ]);

  return (
    <View className="flex-1 bg-gray-50">
      <FlatList
        data={addresses}
        renderItem={({ item }) => (
          <View className="bg-white p-4 mb-2">
            <View className="flex-row justify-between">
              <Text className="font-bold">{item.type.toUpperCase()}</Text>
              {item.isDefault && (
                <Text className="text-green-600">Default</Text>
              )}
            </View>
            <Text className="mt-1">{item.address}</Text>
          </View>
        )}
        keyExtractor={item => item.id}
      />
      
      <TouchableOpacity 
        className="bg-green-500 m-4 p-4 rounded-lg"
        onPress={() => console.log('Add new address')}
      >
        <Text className="text-white text-center">Add New Address</Text>
      </TouchableOpacity>
    </View>
  );
};