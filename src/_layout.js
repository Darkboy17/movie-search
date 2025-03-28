import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'Movie Search' }} />
      <Stack.Screen name="details" options={{ title: 'Movie Details' }} />
    </Stack>
  );
}