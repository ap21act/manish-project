// app/index.tsx
import { View, Text, TouchableOpacity, SafeAreaView } from "react-native";
import { useRouter } from "expo-router";
import { useState } from "react";

// App features type for better type safety
type AppFeature = {
  id: string;
  icon: string;
  title: string;
  description: string;
};

export default function WelcomeScreen() {
  const router = useRouter();

  // Features array with proper typing
  const features: AppFeature[] = [
    {
      id: "1",
      icon: "📊",
      title: "Track Progress",
      description: "Monitor your fitness journey",
    },
    {
      id: "2",
      icon: "🎯",
      title: "Set Goals",
      description: "Achieve your fitness targets",
    },
    {
      id: "3",
      icon: "🏋️‍♂️",
      title: "Workout Plans",
      description: "Customized training programs",
    },
  ];

  // Handle navigation with type safety
  const handleGetStarted = (): void => {
    router.replace("/home");
  };

  return (
    <SafeAreaView className="flex-1 bg-indigo-500">
      <View className="flex-1 justify-between p-8">
        {/* App Logo and Title */}
        <View className="items-center mt-20">
          <View className="bg-white/20 rounded-full p-6 mb-8">
            <Text className="text-4xl">🏋️‍♂️</Text>
          </View>
          <Text className="text-white text-4xl font-bold mb-2">FitTracker</Text>
          <Text className="text-white/80 text-lg text-center">
            Your Personal Fitness Journey
          </Text>
        </View>

        {/* Features List */}
        <View className="my-12">
          {features.map((feature) => (
            <View key={feature.id} className="flex-row items-center mb-6">
              <View className="bg-white/20 p-2 rounded-full mr-4">
                <Text className="text-2xl">{feature.icon}</Text>
              </View>
              <View>
                <Text className="text-white text-lg">{feature.title}</Text>
                <Text className="text-white/70">{feature.description}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* CTA Button */}
        <TouchableOpacity
          className="bg-white rounded-2xl py-4 px-8 shadow-lg"
          onPress={handleGetStarted}
        >
          <Text className="text-indigo-500 text-center text-lg font-semibold">
            Get Started
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
