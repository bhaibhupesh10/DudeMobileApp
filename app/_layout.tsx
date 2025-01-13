// // app/_layout.tsx
// import { Stack } from 'expo-router';
// import GlobalProvider from '../context/GlobalProvider';
// import { ROUTES } from './routes';
// import '../global.css';

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
//             title: `Category ${route.params.id}`,
//             headerBackTitle: 'Back',
//             // You can add more styling here
//             headerStyle: {
//               backgroundColor: '#ffffff',
//             },
//             headerTintColor: '#000000',
//             headerShadowVisible: false,
//           })}
//         />
//         <Stack.Screen
//           name="product/[id]"
//           options={({ route }) => ({
//             title: `Product ${route.params.id}`,
//             headerBackTitle: 'Back',
//             headerStyle: {
//               backgroundColor: '#ffffff',
//             },
//             headerTintColor: '#000000',
//             headerShadowVisible: false,
//           })}
//         />
//       </Stack>
//     </GlobalProvider>
//   );
// }










// // app/_layout.tsx
// import { Stack } from 'expo-router';
// import GlobalProvider from '../context/GlobalProvider';
// import { ROUTES } from './routes';
// import '../global.css';

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
//             title: `Category ${(route.params as any)?.id ?? ''}`,
//             headerBackTitle: 'Back',
//             headerStyle: {
//               backgroundColor: '#ffffff',
//             },
//             headerTintColor: '#000000',
//             headerShadowVisible: false,
//           })}
//         />
//         <Stack.Screen
//           name="product/[id]"
//           options={({ route }) => ({
//             title: `Product ${(route.params as any)?.id ?? ''}`,
//             headerBackTitle: 'Back',
//             headerStyle: {
//               backgroundColor: '#ffffff',
//             },
//             headerTintColor: '#000000',
//             headerShadowVisible: false,
//           })}
//         />
//       </Stack>
//     </GlobalProvider>
//   );
// }







// app/_layout.tsx
import { Stack } from 'expo-router';
import GlobalProvider from '../context/GlobalProvider';
import { ROUTES } from './routes';
import '../global.css';

// Common header options
const getDefaultHeaderOptions = (title: string) => ({
  title,
  headerStyle: {
    backgroundColor: '#ffffff',
  },
  headerTintColor: '#000000',
  headerShadowVisible: false,
  headerBackTitle: 'Back',
});

export default function RootLayout() {
  return (
    <GlobalProvider>
      <Stack>
        <Stack.Screen
          name="(tabs)"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="(auth)"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="category/[id]"
          options={({ route }) => ({
            ...getDefaultHeaderOptions(`Category ${(route.params as any)?.id ?? ''}`),
          })}
        />
        <Stack.Screen
          name="product/[id]"
          options={({ route }) => ({
            ...getDefaultHeaderOptions(`Product ${(route.params as any)?.id ?? ''}`),
          })}
        />
        <Stack.Screen
          name="(profile)"
          options={({ route }) => ({
            ...getDefaultHeaderOptions(route.name.split('/').pop() ?? ''),
          })}
        />
      </Stack>
    </GlobalProvider>
  );
}