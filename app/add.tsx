// app/add.tsx
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { useState } from "react";

// Workout types for selection
const workoutTypes = ["Cardio", "Strength", "Flexibility", "HIIT", "Recovery"];

// Intensity levels
const intensityLevels = ["Low", "Medium", "High"];

export default function AddWorkoutScreen() {
  const router = useRouter();
  const [activeField, setActiveField] = useState("");

  // Form state
  const [form, setForm] = useState({
    name: "",
    duration: "",
    calories: "",
    type: "",
    intensity: "",
    notes: "",
  });

  // Error state
  const [errors, setErrors] = useState({
    name: "",
    duration: "",
    type: "",
  });

  // Validate form
  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      name: "",
      duration: "",
      type: "",
    };

    if (!form.name.trim()) {
      newErrors.name = "Workout name is required";
      isValid = false;
    }

    if (!form.duration.trim()) {
      newErrors.duration = "Duration is required";
      isValid = false;
    } else if (isNaN(Number(form.duration))) {
      newErrors.duration = "Duration must be a number";
      isValid = false;
    }

    if (!form.type) {
      newErrors.type = "Please select a workout type";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // Handle form submission
  const handleSubmit = () => {
    if (validateForm()) {
      Alert.alert("Success", "Workout added successfully!", [
        {
          text: "OK",
          onPress: () => router.back(),
        },
      ]);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView className="flex-1 p-4">
        {/* Form Header */}
        <View className="mb-6">
          <Text className="text-2xl font-bold text-gray-800">
            Add New Workout
          </Text>
          <Text className="text-gray-500 mt-1">
            Fill in the details for your workout
          </Text>
        </View>

        {/* Form Fields */}
        <View className="space-y-4">
          {/* Workout Name */}
          <View className="bg-white p-4 rounded-xl shadow-sm">
            <Text className="text-gray-700 font-medium mb-2">
              Workout Name <Text className="text-red-500">*</Text>
            </Text>
            <TextInput
              value={form.name}
              onChangeText={(text) => {
                setForm({ ...form, name: text });
                if (errors.name) setErrors({ ...errors, name: "" });
              }}
              onFocus={() => setActiveField("name")}
              onBlur={() => setActiveField("")}
              placeholder="e.g., Morning Run"
              className={`bg-gray-50 rounded-xl px-4 py-3 ${
                activeField === "name" ? "border-2 border-indigo-500" : ""
              }`}
            />
            {errors.name ? (
              <Text className="text-red-500 text-sm mt-1">{errors.name}</Text>
            ) : null}
          </View>

          {/* Duration and Calories Row */}
          <View className="flex-row space-x-4">
            <View className="flex-1 bg-white p-4 rounded-xl shadow-sm">
              <Text className="text-gray-700 font-medium mb-2">
                Duration (min) <Text className="text-red-500">*</Text>
              </Text>
              <TextInput
                value={form.duration}
                onChangeText={(text) => {
                  setForm({ ...form, duration: text });
                  if (errors.duration) setErrors({ ...errors, duration: "" });
                }}
                onFocus={() => setActiveField("duration")}
                onBlur={() => setActiveField("")}
                placeholder="30"
                keyboardType="numeric"
                className={`bg-gray-50 rounded-xl px-4 py-3 ${
                  activeField === "duration" ? "border-2 border-indigo-500" : ""
                }`}
              />
              {errors.duration ? (
                <Text className="text-red-500 text-sm mt-1">
                  {errors.duration}
                </Text>
              ) : null}
            </View>

            <View className="flex-1 bg-white p-4 rounded-xl shadow-sm">
              <Text className="text-gray-700 font-medium mb-2">
                Calories (optional)
              </Text>
              <TextInput
                value={form.calories}
                onChangeText={(text) => setForm({ ...form, calories: text })}
                onFocus={() => setActiveField("calories")}
                onBlur={() => setActiveField("")}
                placeholder="300"
                keyboardType="numeric"
                className={`bg-gray-50 rounded-xl px-4 py-3 ${
                  activeField === "calories" ? "border-2 border-indigo-500" : ""
                }`}
              />
            </View>
          </View>

          {/* Workout Type */}
          <View className="bg-white p-4 rounded-xl shadow-sm">
            <Text className="text-gray-700 font-medium mb-2">
              Workout Type <Text className="text-red-500">*</Text>
            </Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              className="flex-row -mx-1"
            >
              {workoutTypes.map((type) => (
                <TouchableOpacity
                  key={type}
                  onPress={() => {
                    setForm({ ...form, type });
                    if (errors.type) setErrors({ ...errors, type: "" });
                  }}
                  className={`m-1 px-4 py-2 rounded-full ${
                    form.type === type ? "bg-indigo-500" : "bg-gray-100"
                  }`}
                >
                  <Text
                    className={`${
                      form.type === type ? "text-white" : "text-gray-600"
                    }`}
                  >
                    {type}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
            {errors.type ? (
              <Text className="text-red-500 text-sm mt-1">{errors.type}</Text>
            ) : null}
          </View>

          {/* Intensity Level */}
          <View className="bg-white p-4 rounded-xl shadow-sm">
            <Text className="text-gray-700 font-medium mb-2">
              Intensity Level
            </Text>
            <View className="flex-row justify-between -mx-1">
              {intensityLevels.map((level) => (
                <TouchableOpacity
                  key={level}
                  onPress={() => setForm({ ...form, intensity: level })}
                  className={`flex-1 mx-1 py-2 rounded-xl ${
                    form.intensity === level ? "bg-indigo-500" : "bg-gray-100"
                  }`}
                >
                  <Text
                    className={`text-center ${
                      form.intensity === level ? "text-white" : "text-gray-600"
                    }`}
                  >
                    {level}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Notes */}
          <View className="bg-white p-4 rounded-xl shadow-sm">
            <Text className="text-gray-700 font-medium mb-2">
              Notes (optional)
            </Text>
            <TextInput
              value={form.notes}
              onChangeText={(text) => setForm({ ...form, notes: text })}
              onFocus={() => setActiveField("notes")}
              onBlur={() => setActiveField("")}
              placeholder="Add any additional notes..."
              multiline
              numberOfLines={4}
              className={`bg-gray-50 rounded-xl px-4 py-3 min-h-[100px] ${
                activeField === "notes" ? "border-2 border-indigo-500" : ""
              }`}
              textAlignVertical="top"
            />
          </View>
        </View>

        {/* Submit Button */}
        <TouchableOpacity
          onPress={handleSubmit}
          className="bg-indigo-500 py-4 rounded-xl mt-6 mb-6 shadow-sm"
        >
          <Text className="text-white text-center font-semibold text-lg">
            Add Workout
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
