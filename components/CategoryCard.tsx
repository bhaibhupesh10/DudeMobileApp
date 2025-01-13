// components/CategoryCard.tsx
import React from 'react';
import { TouchableOpacity, View, Image } from 'react-native';
import { Text } from './ui/Text';
import { Category } from '../types';

interface CategoryCardProps {
  category: Category;
  onPress: () => void;
  className?: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({
  category,
  onPress,
  className
}) => (
  <TouchableOpacity 
    className={`bg-yellow-50 rounded-lg p-4 ${className}`}
    activeOpacity={0.7}
    onPress={onPress}
  >
    <Image 
      source={category.image} 
      className="w-20 h-20"
      resizeMode="cover"
    />
    <Text className="font-bold mt-2">{category.title}</Text>
    <Text className="text-gray-500 text-sm">Starting at {category.startingPrice}</Text>
  </TouchableOpacity>
);

export default CategoryCard;