import {WorkoutType, IntensityLevel,DifficultyLevel} from '@/lib/types'
export const workoutTypes: {
  id: string;
  name: WorkoutType;
  icon: string;
  description: string;
}[] = [
  {
    id: "cardio",
    name: "Cardio",
    icon: "🏃‍♂️",
    description: "Improve heart health and endurance",
  },
  {
    id: "strength",
    name: "Strength",
    icon: "💪",
    description: "Build muscle and increase power",
  },
  {
    id: "flexibility",
    name: "Flexibility",
    icon: "🧘‍♂️",
    description: "Enhance mobility and recovery",
  },
  {
    id: "hiit",
    name: "HIIT",
    icon: "⚡",
    description: "Maximum calorie burn and efficiency",
  },
  {
    id: "recovery",
    name: "Recovery",
    icon: "🧘‍♀️",
    description: "Active rest and muscle repair",
  },
];

export const intensityLevels: {
  level: IntensityLevel;
  icon: string;
  description: string;
}[] = [
  {
    level: "Low",
    icon: "🟢",
    description: "Comfortable pace, can easily hold conversation",
  },
  {
    level: "Medium",
    icon: "🟡",
    description: "Challenging but sustainable",
  },
  {
    level: "High",
    icon: "🔴",
    description: "Maximum effort, very challenging",
  },
];

export const difficultyLevels: {
  level: DifficultyLevel;
  icon: string;
  description: string;
}[] = [
  {
    level: "Beginner",
    icon: "🌱",
    description: "Perfect for those just starting their fitness journey",
  },
  {
    level: "Intermediate",
    icon: "⭐",
    description: "For regular fitness enthusiasts",
  },
  {
    level: "Advanced",
    icon: "🏆",
    description: "Challenging workouts for experienced athletes",
  },
];

export const equipment = [
  "Dumbbells",
  "Barbell",
  "Kettlebell",
  "Resistance Bands",
  "Yoga Mat",
  "Jump Rope",
  "Pull-up Bar",
  "Treadmill",
  "None",
];

export const targetMuscles = [
  "Full Body",
  "Upper Body",
  "Lower Body",
  "Core",
  "Back",
  "Chest",
  "Arms",
  "Legs",
  "Shoulders",
];