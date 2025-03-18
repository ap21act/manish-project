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
import { useState } from "react";
import { Workout, WorkoutType, IntensityLevel } from "./types/workout";

// Define type for stats cards
type StatCard = {
  id: string;
  title: string;
  value: number;
  unit: string;
  bgColor: string;
};

// Sample workout data with proper typing
const sampleWorkouts: Workout[] = [
  {
    id: "1",
    name: "Morning Cardio",
    duration: 30,
    type: "Cardio",
    calories: 300,
    intensity: "Medium",
    createdAt: new Date(),
  },
  {
    id: "2",
    name: "Strength Training",
    duration: 45,
    type: "Strength",
    calories: 400,
    intensity: "High",
    createdAt: new Date(),
  },
];

export default function HomeScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Stats data with proper typing
  const statsCards: StatCard[] = [
    {
      id: "total",
      title: "Total",
      value: 24,
      unit: "Workouts",
      bgColor: "bg-indigo-500",
    },
    {
      id: "weekly",
      title: "Weekly",
      value: 6,
      unit: "Hours",
      bgColor: "bg-green-500",
    },
    {
      id: "streak",
      title: "Streak",
      value: 5,
      unit: "Days",
      bgColor: "bg-orange-500",
    },
  ];

  // Type-safe handlers
  const handleSearch = (text: string): void => {
    setSearchQuery(text);
  };

  const handleWorkoutPress = (workout: Workout): void => {
    // Handle workout selection
    console.log("Selected workout:", workout);
  };

  const getIntensityColor = (intensity: IntensityLevel): string => {
    const colors = {
      Low: "bg-green-100 text-green-600",
      Medium: "bg-orange-100 text-orange-600",
      High: "bg-red-100 text-red-600",
    };
    return colors[intensity];
  };

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
                value={searchQuery}
                onChangeText={handleSearch}
              />
            </View>
          </View>
        </View>

        {/* Stats Cards */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="p-4"
        >
          {statsCards.map((stat) => (
            <View
              key={stat.id}
              className={`${stat.bgColor} p-4 rounded-xl mr-3 w-32`}
            >
              <Text className="text-white/80">{stat.title}</Text>
              <Text className="text-white text-xl font-bold">{stat.value}</Text>
              <Text className="text-white/80">{stat.unit}</Text>
            </View>
          ))}
        </ScrollView>
      </View>

      {/* Workout List */}
      <ScrollView className="flex-1 p-4">
        {sampleWorkouts.map((workout) => (
          <TouchableOpacity
            key={workout.id}
            className="bg-white p-4 rounded-xl mb-4 shadow-sm"
            onPress={() => handleWorkoutPress(workout)}
          >
            <View className="flex-row justify-between items-center mb-2">
              <Text className="text-lg font-semibold text-gray-800">
                {workout.name}
              </Text>
              <View
                className={`px-3 py-1 rounded-full ${getIntensityColor(
                  workout.intensity
                )}`}
              >
                <Text>{workout.intensity}</Text>
              </View>
            </View>
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center">
                <Text className="text-gray-500 mr-4">
                  ⏱ {workout.duration} min
                </Text>
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
