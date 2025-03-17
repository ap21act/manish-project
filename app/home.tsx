// app/home.tsx
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { useRouter } from "expo-router";

// Sample data - you can expand this later
const sampleWorkouts = [
  {
    id: "1",
    name: "Morning Cardio",
    duration: "30 min",
    type: "Cardio",
    calories: 300,
    intensity: "Medium",
  },
  {
    id: "2",
    name: "Full Body Strength",
    duration: "45 min",
    type: "Strength",
    calories: 400,
    intensity: "High",
  },
  {
    id: "3",
    name: "Evening Yoga",
    duration: "60 min",
    type: "Flexibility",
    calories: 200,
    intensity: "Low",
  },
];

export default function HomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      {/* Header Section */}
      <View className="bg-white">
        <View className="p-4 border-b border-gray-200">
          <View className="flex-row justify-between items-center">
            <View>
              <Text className="text-2xl font-bold text-gray-800">Workouts</Text>
              <Text className="text-gray-500 mt-1">
                Track your fitness journey
              </Text>
            </View>
            <TouchableOpacity className="bg-gray-100 p-2 rounded-full">
              <Text className="text-xl">👤</Text>
            </TouchableOpacity>
          </View>

          {/* Search Bar */}
          <View className="mt-4">
            <View className="flex-row items-center bg-gray-100 rounded-xl px-4 py-2">
              <Text className="text-gray-400 mr-2">🔍</Text>
              <TextInput
                placeholder="Search workouts..."
                className="flex-1 text-base"
                placeholderTextColor="#9CA3AF"
              />
            </View>
          </View>
        </View>

        {/* Stats Overview */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="p-4"
        >
          <View className="bg-indigo-500 p-4 rounded-xl mr-3 w-32">
            <Text className="text-white/80">Total</Text>
            <Text className="text-white text-xl font-bold">24</Text>
            <Text className="text-white/80">Workouts</Text>
          </View>
          <View className="bg-green-500 p-4 rounded-xl mr-3 w-32">
            <Text className="text-white/80">Weekly</Text>
            <Text className="text-white text-xl font-bold">6</Text>
            <Text className="text-white/80">Hours</Text>
          </View>
          <View className="bg-orange-500 p-4 rounded-xl w-32">
            <Text className="text-white/80">Streak</Text>
            <Text className="text-white text-xl font-bold">5</Text>
            <Text className="text-white/80">Days</Text>
          </View>
        </ScrollView>
      </View>

      {/* Main Content */}
      <ScrollView className="flex-1 p-4">
        {/* Section Title */}
        <View className="flex-row justify-between items-center mb-4">
          <Text className="text-lg font-semibold text-gray-800">
            Your Workouts
          </Text>
          <TouchableOpacity>
            <Text className="text-indigo-500">See All</Text>
          </TouchableOpacity>
        </View>

        {/* Workout List */}
        {sampleWorkouts.map((workout) => (
          <TouchableOpacity
            key={workout.id}
            className="bg-white p-4 rounded-xl mb-4 shadow-sm"
          >
            {/* Workout Header */}
            <View className="flex-row justify-between items-center mb-2">
              <Text className="text-lg font-semibold text-gray-800">
                {workout.name}
              </Text>
              <View
                className={`px-3 py-1 rounded-full ${
                  workout.intensity === "High"
                    ? "bg-red-100"
                    : workout.intensity === "Medium"
                    ? "bg-orange-100"
                    : "bg-green-100"
                }`}
              >
                <Text
                  className={`${
                    workout.intensity === "High"
                      ? "text-red-600"
                      : workout.intensity === "Medium"
                      ? "text-orange-600"
                      : "text-green-600"
                  }`}
                >
                  {workout.intensity}
                </Text>
              </View>
            </View>

            {/* Workout Details */}
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center">
                <Text className="text-gray-500 mr-4">⏱ {workout.duration}</Text>
                <Text className="text-gray-500">🔥 {workout.calories} cal</Text>
              </View>
              <View className="bg-gray-100 px-3 py-1 rounded-full">
                <Text className="text-gray-600">{workout.type}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Add Button */}
      <TouchableOpacity
        className="absolute bottom-6 right-6 bg-indigo-500 w-16 h-16 rounded-full items-center justify-center shadow-lg"
        onPress={() => router.push("/add")}
      >
        <Text className="text-white text-3xl">+</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
