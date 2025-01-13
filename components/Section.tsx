// components/Section.tsx
import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Text } from './ui/Text';

interface SectionProps {
  title: string;
  children: React.ReactNode;
  showViewAll?: boolean;
  onViewAll?: () => void;
}

const Section: React.FC<SectionProps> = ({
  title,
  children,
  showViewAll,
  onViewAll
}) => (
  <View className="mt-6">
    <View className="flex-row justify-between items-center px-4 mb-4">
      <Text className="text-lg font-bold">{title}</Text>
      {showViewAll && (
        <TouchableOpacity 
          activeOpacity={0.7}
          onPress={onViewAll}
        >
          <Text className="text-green-500">View All</Text>
        </TouchableOpacity>
      )}
    </View>
    {children}
  </View>
);

export default Section;