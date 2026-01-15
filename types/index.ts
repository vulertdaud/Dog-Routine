export type TimeOfDay = "Morning" | "Afternoon" | "Evening" | "Any";
export type Frequency = "Daily" | "Weekdays";
export type Priority = "Low" | "Medium" | "High";

export interface OwnerProfile {
  ownerName: string;
  dogName: string;
  dogBreed: string;
  dogAge: string;
  avatarUrl?: string;
}

export interface RoutineTask {
  id: string;
  title: string;
  category: string;
  timeOfDay: TimeOfDay;
  frequency: Frequency;
  weekdays: string[];
  subtasks: string[];
  notes?: string;
  priority: Priority;
  reminderTime?: string;
  isActive: boolean;
}

export interface DailyLogItem {
  taskId: string;
  completed: boolean;
  completedAtISO?: string;
  note?: string;
}

export interface DailyLog {
  dateISO: string;
  items: DailyLogItem[];
}
