// app/add.tsx
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Alert,
  Switch,
} from "react-native";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Workout,
  WorkoutType,
  IntensityLevel,
  WorkoutFormData,
  // DifficultyLevel,
  WorkoutSet,
} from "@/lib/types";
import { workoutTypes, equipment, targetMuscles } from "@/lib/data";

export default function AddWorkoutScreen() {
  const router = useRouter();
  const [activeField, setActiveField] = useState<string>("");
  const [showAdvanced, setShowAdvanced] = useState<boolean>(false);

  const [form, setForm] = useState<WorkoutFormData>({
    name: "",
    duration: "",
    calories: "",
    type: "",
    intensity: "",
    notes: "",
    equipment: [],
    targetMuscles: [],
    difficulty: "Beginner",
    sets: [],
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof WorkoutFormData, string>>
  >({});
  const [currentSet, setCurrentSet] = useState<WorkoutSet>({
    exerciseName: "",
    reps: 0,
    weight: 0,
    duration: 0,
    restPeriod: 60,
  });

  const addSet = () => {
    if (currentSet.exerciseName && currentSet.reps > 0) {
      setForm((prev) => ({
        ...prev,
        sets: [...prev.sets, currentSet],
      }));
      setCurrentSet({
        exerciseName: "",
        reps: 0,
        weight: 0,
        duration: 0,
        restPeriod: 60,
      });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof WorkoutFormData, string>> = {};
    let isValid = true;

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

  const handleSubmit = (): void => {
    if (validateForm()) {
      Alert.alert(
        "Workout Summary",
        `Name: ${form.name}\nType: ${form.type}\nDuration: ${form.duration} minutes\nSets: ${form.sets.length}`,
        [
          {
            text: "Edit",
            style: "cancel",
          },
          {
            text: "Save",
            onPress: () => {
              Alert.alert("Success", "Workout added successfully!", [
                {
                  text: "OK",
                  onPress: () => router.back(),
                },
              ]);
            },
          },
        ]
      );
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

        {/* Basic Info Section */}
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
                if (errors.name) {
                  const { name, ...rest } = errors;
                  setErrors(rest);
                }
              }}
              onFocus={() => setActiveField("name")}
              onBlur={() => setActiveField("")}
              placeholder="e.g., Morning Run"
              className={`bg-gray-50 rounded-xl px-4 py-3 ${
                activeField === "name" ? "border-2 border-indigo-500" : ""
              }`}
            />
            {errors.name && (
              <Text className="text-red-500 text-sm mt-1">{errors.name}</Text>
            )}
          </View>

          {/* Duration and Calories */}
          <View className="flex-row space-x-4">
            <View className="flex-1 bg-white p-4 rounded-xl shadow-sm">
              <Text className="text-gray-700 font-medium mb-2">
                Duration (min) <Text className="text-red-500">*</Text>
              </Text>
              <TextInput
                value={form.duration}
                onChangeText={(text) => setForm({ ...form, duration: text })}
                keyboardType="numeric"
                placeholder="30"
                className="bg-gray-50 rounded-xl px-4 py-3"
              />
            </View>
            <View className="flex-1 bg-white p-4 rounded-xl shadow-sm">
              <Text className="text-gray-700 font-medium mb-2">
                Calories (optional)
              </Text>
              <TextInput
                value={form.calories}
                onChangeText={(text) => setForm({ ...form, calories: text })}
                keyboardType="numeric"
                placeholder="300"
                className="bg-gray-50 rounded-xl px-4 py-3"
              />
            </View>
          </View>

          {/* Workout Type Selection */}
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
                  key={type.id}
                  onPress={() => setForm({ ...form, type: type.name })}
                  className={`m-1 p-3 rounded-xl ${
                    form.type === type.name ? "bg-indigo-500" : "bg-gray-100"
                  }`}
                >
                  <Text className="text-2xl mb-1">{type.icon}</Text>
                  <Text
                    className={`${
                      form.type === type.name ? "text-white" : "text-gray-700"
                    }`}
                  >
                    {type.name}
                  </Text>
                  <Text
                    className={`text-xs mt-1 ${
                      form.type === type.name
                        ? "text-white/80"
                        : "text-gray-500"
                    }`}
                  >
                    {type.description}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Advanced Options Toggle */}
          <View className="bg-white p-4 rounded-xl shadow-sm">
            <TouchableOpacity
              className="flex-row justify-between items-center"
              onPress={() => setShowAdvanced(!showAdvanced)}
            >
              <Text className="text-gray-700 font-medium">
                Advanced Options
              </Text>
              <Switch value={showAdvanced} onValueChange={setShowAdvanced} />
            </TouchableOpacity>
          </View>

          {/* Advanced Options */}
          {showAdvanced && (
            <>
              {/* Equipment Selection */}
              <View className="bg-white p-4 rounded-xl shadow-sm">
                <Text className="text-gray-700 font-medium mb-2">
                  Equipment
                </Text>
                <View className="flex-row flex-wrap -m-1">
                  {equipment.map((item) => (
                    <TouchableOpacity
                      key={item}
                      onPress={() => {
                        const newEquipment = form.equipment.includes(item)
                          ? form.equipment.filter((e) => e !== item)
                          : [...form.equipment, item];
                        setForm({ ...form, equipment: newEquipment });
                      }}
                      className={`m-1 px-3 py-1 rounded-full ${
                        form.equipment.includes(item)
                          ? "bg-indigo-500"
                          : "bg-gray-100"
                      }`}
                    >
                      <Text
                        className={
                          form.equipment.includes(item)
                            ? "text-white"
                            : "text-gray-700"
                        }
                      >
                        {item}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              {/* Target Muscles */}
              <View className="bg-white p-4 rounded-xl shadow-sm">
                <Text className="text-gray-700 font-medium mb-2">
                  Target Muscles
                </Text>
                <View className="flex-row flex-wrap -m-1">
                  {targetMuscles.map((muscle) => (
                    <TouchableOpacity
                      key={muscle}
                      onPress={() => {
                        const newMuscles = form.targetMuscles.includes(muscle)
                          ? form.targetMuscles.filter((m) => m !== muscle)
                          : [...form.targetMuscles, muscle];
                        setForm({ ...form, targetMuscles: newMuscles });
                      }}
                      className={`m-1 px-3 py-1 rounded-full ${
                        form.targetMuscles.includes(muscle)
                          ? "bg-indigo-500"
                          : "bg-gray-100"
                      }`}
                    >
                      <Text
                        className={
                          form.targetMuscles.includes(muscle)
                            ? "text-white"
                            : "text-gray-700"
                        }
                      >
                        {muscle}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              {/* Exercise Sets */}
              <View className="bg-white p-4 rounded-xl shadow-sm">
                <Text className="text-gray-700 font-medium mb-2">
                  Exercise Sets
                </Text>

                {/* Add New Set Form */}
                <View className="bg-gray-50 p-3 rounded-xl mb-4">
                  <TextInput
                    value={currentSet.exerciseName}
                    onChangeText={(text) =>
                      setCurrentSet({ ...currentSet, exerciseName: text })
                    }
                    placeholder="Exercise name"
                    className="bg-white rounded-xl px-4 py-2 mb-2"
                  />
                  <View className="flex-row space-x-2 mb-2">
                    <TextInput
                      value={currentSet.reps.toString()}
                      onChangeText={(text) =>
                        setCurrentSet({
                          ...currentSet,
                          reps: parseInt(text) || 0,
                        })
                      }
                      placeholder="Reps"
                      keyboardType="numeric"
                      className="flex-1 bg-white rounded-xl px-4 py-2"
                    />
                    <TextInput
                      value={currentSet.weight?.toString()}
                      onChangeText={(text) =>
                        setCurrentSet({
                          ...currentSet,
                          weight: parseInt(text) || 0,
                        })
                      }
                      placeholder="Weight (kg)"
                      keyboardType="numeric"
                      className="flex-1 bg-white rounded-xl px-4 py-2"
                    />
                  </View>
                  <TouchableOpacity
                    onPress={addSet}
                    className="bg-indigo-500 rounded-xl py-2"
                  >
                    <Text className="text-white text-center">Add Set</Text>
                  </TouchableOpacity>
                </View>

                {/* Sets List */}
                {form.sets.map((set, index) => (
                  <View key={index} className="bg-gray-50 p-3 rounded-xl mb-2">
                    <Text className="font-medium">{set.exerciseName}</Text>
                    <Text className="text-gray-500">
                      {set.reps} reps {set.weight ? `@ ${set.weight}kg` : ""}
                    </Text>
                  </View>
                ))}
              </View>
            </>
          )}

          {/* Notes */}
          <View className="bg-white p-4 rounded-xl shadow-sm">
            <Text className="text-gray-700 font-medium mb-2">
              Notes (optional)
            </Text>
            <TextInput
              value={form.notes}
              onChangeText={(text) => setForm({ ...form, notes: text })}
              placeholder="Add any additional notes..."
              multiline
              numberOfLines={4}
              className="bg-gray-50 rounded-xl px-4 py-3 min-h-[100px]"
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
