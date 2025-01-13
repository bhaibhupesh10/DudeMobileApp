// app/(tabs)/home.tsx
import React, { useState, useEffect } from 'react';
import { View, ScrollView, TextInput, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Text } from '../../components/ui/Text';
import { Card } from '../../components/ui/Card';
import { ProductCard } from '../../components/ProductCard';
import CategoryCard from '../../components/CategoryCard';
import QuickLink from '../../components/QuickLink';
import Section from '../../components/Section';
import { useGlobalContext } from '../../context/GlobalProvider';
import { LocationExpandedView } from '../../components/LocationExpandedView';
import { router } from 'expo-router';
import * as Location from 'expo-location';
import { IMAGES } from '../../constants/images';
import { QUICK_LINKS } from '../../data/quickLinks';
import { Product, Category } from '../../types';

const { width } = Dimensions.get('window');

// Sample data for demonstration
const SAMPLE_PRODUCTS: Product[] = [
  {
    id: 'sugar',
    name: 'Premium Sugar',
    description: 'High-quality refined sugar',
    basePrice: 51,
    baseMrp: 60,
    weight: '1 kg',
    discount: '15% OFF',
    image: IMAGES.sugar,
    category: 'groceries',
  },
  {
    id: 'salt',
    name: 'Iodized Salt',
    description: 'Pure iodized salt',
    basePrice: 9,
    baseMrp: 12,
    weight: '1 kg',
    discount: '25% OFF',
    image: IMAGES.salt,
    category: 'groceries',
  },
];

const SAMPLE_CATEGORIES: Category[] = [
  {
    id: 'fruits-vegetables',
    title: "Fruits & Vegetables",
    startingPrice: "₹9/kg",
    image: IMAGES.fruits,
  },
  {
    id: 'masala-spices',
    title: "Masala & Spices",
    startingPrice: "₹45/pack",
    image: IMAGES.masala,
  },
];

const Home: React.FC = () => {
  const { 
    currentAreaName, 
    priceMultiplier, 
    locationLoading: loading, 
    locationError: error,
    updateLocation: getLocation,
    currentPincode
  } = useGlobalContext();
  
  const [showLocationExpanded, setShowLocationExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [city, setCity] = useState<string | null>(null);
  const [locationErrorMsg, setLocationErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setLocationErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      let [address] = await Location.reverseGeocodeAsync({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });

      if (address && address.city) {
        setCity(address.city);
      } else {
        setLocationErrorMsg('Could not determine city');
      }
    })();
  }, []);

  const LocationHeader = () => (
    <TouchableOpacity 
      className="flex-row items-center"
      onPress={() => setShowLocationExpanded(true)}
      activeOpacity={0.7}
    >
      <Ionicons name="location" size={24} color="white" />
      <View className="ml-2 flex-1">
        {loading ? (
          <>
            <Text className="text-white font-bold text-lg">Loading...</Text>
            <Text className="text-white text-sm">Getting your location</Text>
          </>
        ) : error ? (
          <>
            <Text className="text-white font-bold text-lg">Location Error</Text>
            <Text className="text-white text-sm">{error}</Text>
          </>
        ) : (
          <>
            <Text className="text-white font-bold text-lg" numberOfLines={1}>
              {currentAreaName || 'Select Location'}
            </Text>
            <Text className="text-white text-sm" numberOfLines={1}>
              {currentPincode || 'Set your delivery location'}
              {priceMultiplier !== 1 && ` • Prices adjusted for your location`}
            </Text>
          </>
        )}
      </View>
      <Ionicons name="chevron-down" size={20} color="white" />
    </TouchableOpacity>
  );

  const handleProductPress = (productId: string) => {
    router.push(`/product/${productId}`);
  };

  const handleCategoryPress = (categoryId: string) => {
    router.push(`/category/${categoryId}`);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header with Location */}
      <View className="bg-green-500 px-4 pb-4">
        <LocationHeader />
        
        {/* Search Bar */}
        <View className="flex-row items-center bg-white rounded-full mt-4 px-4 py-2">
          <Ionicons name="search" size={20} color="gray" />
          <TextInput
            placeholder="Search products..."
            className="flex-1 ml-2"
            placeholderTextColor="gray"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery ? (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={20} color="gray" />
            </TouchableOpacity>
          ) : (
            <Ionicons name="mic" size={20} color="gray" />
          )}
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Banner */}
        <View className="p-4">
          <Card className="bg-yellow-50 p-4 rounded-lg">
            <Text className="text-lg font-bold">
              LOWEST PRICES IN {city || 'your location'}
            </Text>
            <View className="flex-row mt-4 justify-between">
              {SAMPLE_PRODUCTS.slice(0, 2).map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onPress={() => handleProductPress(product.id)}
                  className="w-[48%]"
                />
              ))}
            </View>
          </Card>
        </View>

        {/* Quick Links */}
        <View className="flex-row justify-between px-4 py-2">
          {QUICK_LINKS.map((link, index) => (
            <QuickLink 
              key={index}
              {...link}
              onPress={() => router.push(link.route as any)}
            />
          ))}
        </View>

        {/* City Best Sellers */}
        <Section 
          title="City Best Sellers" 
          showViewAll
          onViewAll={() => router.push('/best-sellers')}
        >
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            className="px-4"
          >
            {SAMPLE_PRODUCTS.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onPress={() => handleProductPress(product.id)}
                className="w-64 mr-4"
              />
            ))}
          </ScrollView>
        </Section>

        {/* Top Categories */}
        <Section 
          title="Top Categories"
          showViewAll
          onViewAll={() => router.push('/categories')}
        >
          <View className="flex-row flex-wrap justify-between px-4">
            {SAMPLE_CATEGORIES.map((category) => (
              <CategoryCard
                key={category.id}
                category={category}
                onPress={() => handleCategoryPress(category.id)}
              />
            ))}
          </View>
        </Section>

        {/* Season Essentials */}
        <Section title="Season Essentials">
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            className="px-4 pb-4"
          >
            {SAMPLE_PRODUCTS.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onPress={() => handleProductPress(product.id)}
                className="w-64 mr-4"
              />
            ))}
          </ScrollView>
        </Section>
      </ScrollView>

      <LocationExpandedView
        visible={showLocationExpanded}
        onClose={() => setShowLocationExpanded(false)}
        loading={loading}
        error={error}
        onRefreshLocation={getLocation}
      />
    </SafeAreaView>
  );
};

export default Home;