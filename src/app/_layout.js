
import { Stack } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: '#d400ff' },
          headerTintColor: '#0a38d1',
          headerTitleStyle: { fontWeight: 'bold' },
          contentStyle: { backgroundColor: '#1e1e2e' },
          headerShown: false,
        }}
      />
    </SafeAreaProvider>
  );
}
