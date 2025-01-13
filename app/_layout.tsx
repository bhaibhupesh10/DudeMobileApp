// // // app/_layout.tsx
// // import { Stack } from 'expo-router';
// // import GlobalProvider from '../context/GlobalProvider';
// // import { ROUTES } from './routes';
// // import '../global.css';

// // export default function RootLayout() {
// //   return (
// //     <GlobalProvider>
// //       <Stack>
// //         <Stack.Screen
// //           name="(tabs)"
// //           options={{ headerShown: false }}
// //         />
// //         <Stack.Screen
// //           name="(auth)"
// //           options={{ headerShown: false }}
// //         />
// //         <Stack.Screen
// //           name="category/[id]"
// //           options={({ route }) => ({
// //             title: `Category ${route.params.id}`,
// //             headerBackTitle: 'Back',
// //             // You can add more styling here
// //             headerStyle: {
// //               backgroundColor: '#ffffff',
// //             },
// //             headerTintColor: '#000000',
// //             headerShadowVisible: false,
// //           })}
// //         />
// //         <Stack.Screen
// //           name="product/[id]"
// //           options={({ route }) => ({
// //             title: `Product ${route.params.id}`,
// //             headerBackTitle: 'Back',
// //             headerStyle: {
// //               backgroundColor: '#ffffff',
// //             },
// //             headerTintColor: '#000000',
// //             headerShadowVisible: false,
// //           })}
// //         />
// //       </Stack>
// //     </GlobalProvider>
// //   );
// // }










// // // app/_layout.tsx
// // import { Stack } from 'expo-router';
// // import GlobalProvider from '../context/GlobalProvider';
// // import { ROUTES } from './routes';
// // import '../global.css';

// // export default function RootLayout() {
// //   return (
// //     <GlobalProvider>
// //       <Stack>
// //         <Stack.Screen
// //           name="(tabs)"
// //           options={{ headerShown: false }}
// //         />
// //         <Stack.Screen
// //           name="(auth)"
// //           options={{ headerShown: false }}
// //         />
// //         <Stack.Screen
// //           name="category/[id]"
// //           options={({ route }) => ({
// //             title: `Category ${(route.params as any)?.id ?? ''}`,
// //             headerBackTitle: 'Back',
// //             headerStyle: {
// //               backgroundColor: '#ffffff',
// //             },
// //             headerTintColor: '#000000',
// //             headerShadowVisible: false,
// //           })}
// //         />
// //         <Stack.Screen
// //           name="product/[id]"
// //           options={({ route }) => ({
// //             title: `Product ${(route.params as any)?.id ?? ''}`,
// //             headerBackTitle: 'Back',
// //             headerStyle: {
// //               backgroundColor: '#ffffff',
// //             },
// //             headerTintColor: '#000000',
// //             headerShadowVisible: false,
// //           })}
// //         />
// //       </Stack>
// //     </GlobalProvider>
// //   );
// // }







// // app/_layout.tsx
// import { Stack } from 'expo-router';
// import GlobalProvider from '../context/GlobalProvider';
// import { ROUTES } from './routes';
// import '../global.css';

// // Common header options
// const getDefaultHeaderOptions = (title: string) => ({
//   title,
//   headerStyle: {
//     backgroundColor: '#ffffff',
//   },
//   headerTintColor: '#000000',
//   headerShadowVisible: false,
//   headerBackTitle: 'Back',
// });

// export default function RootLayout() {
//   return (
//     <GlobalProvider>
//       <Stack>
//         <Stack.Screen
//           name="(tabs)"
//           options={{ headerShown: false }}
//         />
//         <Stack.Screen
//           name="(auth)"
//           options={{ headerShown: false }}
//         />
//         <Stack.Screen
//           name="category/[id]"
//           options={({ route }) => ({
//             ...getDefaultHeaderOptions(`Category ${(route.params as any)?.id ?? ''}`),
//           })}
//         />
//         <Stack.Screen
//           name="product/[id]"
//           options={({ route }) => ({
//             ...getDefaultHeaderOptions(`Product ${(route.params as any)?.id ?? ''}`),
//           })}
//         />
//         <Stack.Screen
//           name="(profile)"
//           options={({ route }) => ({
//             ...getDefaultHeaderOptions(route.name.split('/').pop() ?? ''),
//           })}
//         />
//       </Stack>
//     </GlobalProvider>
//   );
// }



// app/_layout.tsx
import { Stack } from 'expo-router';
import GlobalProvider from '../context/GlobalProvider';
import { CartProvider } from '../context/CartContext';
import { ROUTES } from './routes';
import '../global.css';
import { Text } from '../components/ui/Text';

// Define types for route params
interface RouteParams {
  id?: string;
  name?: string;
}

// Enhanced header options with better typing and customization
const getDefaultHeaderOptions = (title: string) => ({
  title,
  headerStyle: {
    backgroundColor: '#ffffff',
  },
  headerTintColor: '#000000',
  headerShadowVisible: false,
  headerBackTitle: 'Back',
  // Add custom header title component if needed
  headerTitle: ({ children }: { children: string }) => (
    <Text className="text-lg font-bold">{children}</Text>
  ),
});

// Define specific header options for different routes
const getRouteSpecificOptions = (routeName: string, params?: RouteParams) => {
  switch (routeName) {
    case 'category/[id]':
      return {
        ...getDefaultHeaderOptions('Category'),
        title: params?.id ? `Category: ${params.id}` : 'Category',
      };
    case 'product/[id]':
      return {
        ...getDefaultHeaderOptions('Product'),
        title: params?.id ? `Product Details` : 'Product',
      };
    default:
      return getDefaultHeaderOptions(
        routeName.split('/').pop()?.replace(/^\w/, c => c.toUpperCase()) ?? ''
      );
  }
};

export default function RootLayout() {
  return (
    <GlobalProvider>
      <CartProvider>
        <Stack
          screenOptions={{
            headerShown: false,
            animation: 'slide_from_right',
          }}
        >
          <Stack.Screen
            name="(tabs)"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="(auth)"
            options={{ 
              headerShown: false,
              animation: 'slide_from_bottom',
            }}
          />
          <Stack.Screen
            name="category/[id]"
            options={({ route }) => ({
              headerShown: true,
              ...getRouteSpecificOptions(route.name, route.params as RouteParams),
            })}
          />
          <Stack.Screen
            name="product/[id]"
            options={({ route }) => ({
              headerShown: true,
              ...getRouteSpecificOptions(route.name, route.params as RouteParams),
            })}
          />
          <Stack.Screen
            name="(profile)"
            options={({ route }) => ({
              headerShown: true,
              ...getRouteSpecificOptions(route.name, route.params as RouteParams),
            })}
          />
          <Stack.Screen
            name="(features)"
            options={({ route }) => ({
              headerShown: true,
              ...getRouteSpecificOptions(route.name, route.params as RouteParams),
            })}
          />
        </Stack>
      </CartProvider>
    </GlobalProvider>
  );
}

