import { Stack } from 'expo-router';

// Each tab owns a Stack, so detail screens push inside the tab and the tab bar stays visible.
export default function HomeLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="product/[id]" options={{ headerBackTitle: 'Quay lại' }} />
    </Stack>
  );
}
