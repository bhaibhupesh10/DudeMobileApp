// components/QuickLink.tsx
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Text } from './ui/Text';
import { QuickLink as QuickLinkType } from '../types';

interface QuickLinkProps extends QuickLinkType {
  onPress: () => void;
}

const QuickLink: React.FC<QuickLinkProps> = ({ icon, title, onPress }) => (
  <TouchableOpacity
    onPress={onPress}
    className="items-center"
    activeOpacity={0.7}
  >
    <View className="w-12 h-12 bg-gray-100 rounded-full items-center justify-center">
      <Ionicons name={icon} size={24} color="#4B5563" />
    </View>
    <Text className="text-xs mt-1 text-center">{title}</Text>
  </TouchableOpacity>
);

export default QuickLink;