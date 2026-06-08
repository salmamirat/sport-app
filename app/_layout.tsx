import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false, }} />
      <Stack.Screen name="details/[id]" options={{ headerShown: false,}}/>
      <Stack.Screen name="gallery/[id]" options={{ headerShown: false,}}/>
    </Stack>
  );
}
