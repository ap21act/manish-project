import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "./globals.css"; // Global Tailwind from Nativewind import for in-line css

type ScreenOptions = {
  headerShown?: boolean;
  gestureEnabled?: boolean;
  presentation?: "modal" | "card";
  headerTitle?: string;
};

export default function RootLayout() {
  // Base screen options that will be applied to all screens
  const defaultScreenOptions: ScreenOptions = {
    headerShown: false,
  };

  return (
    <Stack screenOptions={defaultScreenOptions}>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="home"
        options={{
          headerShown: false,
          // Preventing back navigation to splash screen
          gestureEnabled: false,
        }}
      />
      <Stack.Screen
        name="add"
        options={{
          headerShown: true,
          headerTitle: "Add New Item",
          // Using modal presentation for better UX
          presentation: "modal",
        }}
      />
    </Stack>
  );
}
