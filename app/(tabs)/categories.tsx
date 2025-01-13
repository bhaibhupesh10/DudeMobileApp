// app/(tabs)/categories.tsx
import React from 'react';
import { View, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Text } from '../../components/ui/Text';
import { Ionicons } from '@expo/vector-icons';
import { categoryData } from '../../data/categories'; // Category data with Unsplash images
// Category data with Unsplash images


const Categories = () => {
  return (
    <View className="flex-1 bg-white">
      {/* Header */}
      <View className="flex-row items-center p-4 border-b border-gray-200">
        <TouchableOpacity>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text className="text-lg font-bold ml-4">Categories</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {Object.values(categoryData).map((section, index) => (
          <CategorySection
            key={index}
            title={section.title}
            items={section.items}
          />
        ))}
      </ScrollView>
    </View>
  );
};

interface CategorySectionProps {
  title: string;
  items: Array<{
    title: string;
    image: string;
  }>;
}

const CategorySection: React.FC<CategorySectionProps> = ({ title, items }) => (
  <View className="mt-4">
    <View className="flex-row justify-between items-center px-4">
      <Text className="text-lg font-bold">{title}</Text>
      <TouchableOpacity>
        <Ionicons name="chevron-forward" size={24} color="gray" />
      </TouchableOpacity>
    </View>
    <View className="flex-row flex-wrap mt-2">
      {items.map((item, index) => (
        <CategoryItem key={index} {...item} />
      ))}
    </View>
  </View>
);

interface CategoryItemProps {
  title: string;
  image: string;
}

const CategoryItem: React.FC<CategoryItemProps> = ({ title, image }) => (
  <TouchableOpacity 
    className="w-1/3 p-2"
    onPress={() => console.log(`Selected category: ${title}`)}
  >
    <View className="bg-gray-50 rounded-lg p-4 items-center">
      <Image 
        source={{ uri: image }} 
        className="w-16 h-16 rounded-lg"
        style={{ backgroundColor: '#f3f4f6' }}
      />
      <Text className="text-center mt-2 text-sm" numberOfLines={2}>
        {title}
      </Text>
    </View>
  </TouchableOpacity>
);

export default Categories;