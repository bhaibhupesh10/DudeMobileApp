// // app/(tabs)/categories.tsx
// import React from 'react';
// import { View, ScrollView, TouchableOpacity, Image } from 'react-native';
// import { Text } from '../../components/ui/Text';
// import { Ionicons } from '@expo/vector-icons';
// import { categoryData } from '../../data/categories'; // Ensure this is correctly imported
// import { useNavigation } from '@react-navigation/native';

// const Categories = () => {
//   const navigation = useNavigation();

//   return (
//     <View style={{ flex: 1, backgroundColor: 'white' }}>
//       {/* Header */}
//       <View style={{ flexDirection: 'row', alignItems: 'center', padding: 16, borderBottomWidth: 1, borderBottomColor: '#E5E7EB' }}>
//         <TouchableOpacity onPress={() => navigation.goBack()}>
//           <Ionicons name="arrow-back" size={24} color="black" />
//         </TouchableOpacity>
//         <Text style={{ fontSize: 18, fontWeight: 'bold', marginLeft: 16 }}>Categories</Text>
//       </View>

//       <ScrollView showsVerticalScrollIndicator={false}>
//         {Object.entries(categoryData).map(([key, section]) => (
//           <CategorySection
//             key={key}
//             title={section.title}
//             items={section.items}
//           />
//         ))}
//       </ScrollView>
//     </View>
//   );
// };

// interface CategorySectionProps {
//   title: string;
//   items: Array<{
//     title: string;
//     image: string;
//   }>;
// }

// const CategorySection: React.FC<CategorySectionProps> = ({ title, items }) => (
//   <View style={{ marginTop: 16 }}>
//     <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16 }}>
//       <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{title}</Text>
//       <TouchableOpacity>
//         <Ionicons name="chevron-forward" size={24} color="gray" />
//       </TouchableOpacity>
//     </View>
//     <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 8 }}>
//       {items.map((item, index) => (
//         <CategoryItem key={index} {...item} />
//       ))}
//     </View>
//   </View>
// );

// interface CategoryItemProps {
//   title: string;
//   image: string;
// }

// const CategoryItem: React.FC<CategoryItemProps> = ({ title, image }) => (
//   <TouchableOpacity 
//     style={{ width: '33%', padding: 8 }}
//     onPress={() => console.log(`Selected category: ${title}`)}
//   >
//     <View style={{ backgroundColor: '#F3F4F6', borderRadius: 8, padding: 16, alignItems: 'center' }}>
//       <Image 
//         source={{ uri: image }} 
//         style={{ width: 64, height: 64, borderRadius: 8, backgroundColor: '#f3f4f6' }}
//       />
//       <Text style={{ textAlign: 'center', marginTop: 8, fontSize: 14 }} numberOfLines={2}>
//         {title}
//       </Text>
//     </View>
//   </TouchableOpacity>
// );

// export default Categories;


// app/(tabs)/categories.tsx
import React from 'react';
import { View, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Text } from '../../components/ui/Text';
import { Ionicons } from '@expo/vector-icons';
import { categoryData } from '../../data/categories';
import { CategoryItem, CategorySection } from '../../types/categories';
import { router } from 'expo-router';

const Categories: React.FC = () => {
  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', padding: 16, borderBottomWidth: 1, borderBottomColor: '#E5E7EB' }}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={{ fontSize: 18, fontWeight: 'bold', marginLeft: 16 }}>Categories</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {(Object.entries(categoryData) as [string, CategorySection][]).map(([key, section]) => (
          <CategorySectionComponent
            key={key}
            title={section.title}
            items={section.items}
            onPress={() => router.push(`/category/${key}`)}
          />
        ))}
      </ScrollView>
    </View>
  );
};

interface CategorySectionProps {
  title: string;
  items: CategoryItem[];
  onPress: () => void;
}

const CategorySectionComponent: React.FC<CategorySectionProps> = ({ title, items, onPress }) => (
  <View style={{ marginTop: 16 }}>
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16 }}>
      <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{title}</Text>
      <TouchableOpacity onPress={onPress}>
        <Ionicons name="chevron-forward" size={24} color="gray" />
      </TouchableOpacity>
    </View>
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 8 }}>
      {items.map((item, index) => (
        <CategoryItemComponent key={index} {...item} />
      ))}
    </View>
  </View>
);

interface CategoryItemProps {
  title: string;
  image: string;
}

const CategoryItemComponent: React.FC<CategoryItemProps> = ({ title, image }) => (
  <TouchableOpacity 
    style={{ width: '33%', padding: 8 }}
    onPress={() => console.log(`Selected category: ${title}`)}
  >
    <View style={{ backgroundColor: '#F3F4F6', borderRadius: 8, padding: 16, alignItems: 'center' }}>
      <Image 
        source={{ uri: image }} 
        style={{ width: 64, height: 64, borderRadius: 8, backgroundColor: '#f3f4f6' }}
      />
      <Text style={{ textAlign: 'center', marginTop: 8, fontSize: 14 }} numberOfLines={2}>
        {title}
      </Text>
    </View>
  </TouchableOpacity>
);

export default Categories;