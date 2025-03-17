// app/index.tsx
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from "react-native";
import { useRouter } from "expo-router";

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-indigo-500">
      {/* Main Container */}
      <View className="flex-1 justify-between p-8">
        {/* Top Section - Logo & Title */}
        <View className="items-center mt-20">
          {/* Logo Container */}
          <View className="bg-white/20 rounded-full p-6 mb-8">
            {/* You can replace this with your app logo */}
            <Text className="text-white text-4xl">🏋️‍♂️</Text>
          </View>

          {/* App Title */}
          <Text className="text-white text-4xl font-bold mb-2">FitTracker</Text>

          {/* App Subtitle */}
          <Text className="text-white/80 text-lg text-center">
            Your Personal Fitness Journey
          </Text>
        </View>

        {/* Middle Section - Features */}
        <View className="my-12">
          {/* Feature Items */}
          <View className="flex-row items-center mb-6">
            <View className="bg-white/20 p-2 rounded-full mr-4">
              <Text className="text-2xl">📝</Text>
            </View>
            <Text className="text-white text-lg">Track your workouts</Text>
          </View>

          <View className="flex-row items-center mb-6">
            <View className="bg-white/20 p-2 rounded-full mr-4">
              <Text className="text-2xl">📊</Text>
            </View>
            <Text className="text-white text-lg">Monitor progress</Text>
          </View>

          <View className="flex-row items-center">
            <View className="bg-white/20 p-2 rounded-full mr-4">
              <Text className="text-2xl">🎯</Text>
            </View>
            <Text className="text-white text-lg">Achieve your goals</Text>
          </View>
        </View>

        {/* Bottom Section - Get Started Button */}
        <View>
          <TouchableOpacity
            className="bg-white rounded-2xl py-4 px-8 shadow-lg"
            onPress={() => router.replace("/home")}
          >
            <Text className="text-indigo-500 text-center text-lg font-semibold">
              Get Started
            </Text>
          </TouchableOpacity>

          {/* Optional: Add Terms Text */}
          <Text className="text-white/60 text-center mt-4 text-sm">
            By continuing, you agree to our Terms & Conditions
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
