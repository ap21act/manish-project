
export interface Workout {
    id: string;
    name: string;
    duration: number;
    type: WorkoutType;
    calories: number;
    intensity: IntensityLevel;
    notes?: string;
    createdAt: Date;
    equipment?: string[];
    targetMuscles?: string[];
    difficulty: DifficultyLevel;
    estimatedTime?: string;
    sets?: WorkoutSet[];
  }
  
  export type WorkoutType = 'Cardio' | 'Strength' | 'Flexibility' | 'HIIT' | 'Recovery';
  export type IntensityLevel = 'Low' | 'Medium' | 'High';
  export type DifficultyLevel = 'Beginner' | 'Intermediate' | 'Advanced';
  
  export interface WorkoutSet {
    exerciseName: string;
    reps: number;
    weight?: number;
    duration?: number;
    restPeriod: number;
  }
  
  export interface WorkoutFormData {
    name: string;
    duration: string;
    calories: string;
    type: string;
    intensity: string;
    notes: string;
    equipment: string[];
    targetMuscles: string[];
    difficulty: string;
    sets: WorkoutSet[];
  }
  