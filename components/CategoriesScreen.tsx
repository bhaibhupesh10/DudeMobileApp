import React, { useState } from 'react';
import { View, ScrollView, Text, TouchableOpacity } from 'react-native';
import { getItemsByCategory, getAllCategories } from '../utils/categoryUtils';

const CategoriesScreen = () => {
  // Allow selectedCategory to be either a string or null
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const categories = getAllCategories();

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ padding: 16 }}>
        {categories.map((category, index) => (
          <TouchableOpacity key={index} onPress={() => setSelectedCategory(category)} style={{ marginRight: 16 }}>
            <Text style={{ fontSize: 16, fontWeight: selectedCategory === category ? 'bold' : 'normal' }}>
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView style={{ padding: 16 }}>
        {selectedCategory && getItemsByCategory(selectedCategory).map(item => (
          <View key={item.id} style={{ marginBottom: 16 }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{item.name}</Text>
            <Text>{item.description}</Text>
            <Text style={{ color: 'green' }}>₹{item.basePrice}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default CategoriesScreen;