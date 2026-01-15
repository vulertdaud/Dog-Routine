import { DailyLog, OwnerProfile, RoutineTask } from "@/types";
import { formatISODate } from "@/lib/date";

export const seedProfile: OwnerProfile = {
  ownerName: "Jordan",
  dogName: "Luna",
  dogBreed: "Golden Retriever",
  dogAge: "3",
  avatarUrl: "",
};

export const seedTasks: RoutineTask[] = [
  {
    id: "task-1",
    title: "Morning walk",
    category: "Exercise",
    timeOfDay: "Morning",
    frequency: "Daily",
    weekdays: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    subtasks: ["Leash up", "Bring water bottle"],
    notes: "15-20 minutes around the park.",
    priority: "High",
    reminderTime: "07:30",
    isActive: true,
  },
  {
    id: "task-2",
    title: "Breakfast",
    category: "Meals",
    timeOfDay: "Morning",
    frequency: "Daily",
    weekdays: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    subtasks: ["Refresh water bowl", "Add supplements"],
    notes: "1 cup kibble + water.",
    priority: "Medium",
    reminderTime: "08:00",
    isActive: true,
  },
  {
    id: "task-3",
    title: "Training",
    category: "Training",
    timeOfDay: "Afternoon",
    frequency: "Weekdays",
    weekdays: ["Mon", "Wed", "Fri"],
    subtasks: ["5 min recall", "Sit-stay reps"],
    notes: "Focus on recall and sit-stay.",
    priority: "Medium",
    reminderTime: "15:00",
    isActive: true,
  },
  {
    id: "task-4",
    title: "Brush coat",
    category: "Grooming",
    timeOfDay: "Evening",
    frequency: "Weekdays",
    weekdays: ["Tue", "Thu", "Sun"],
    subtasks: ["Check paws", "Use detangling spray"],
    notes: "Use detangling spray.",
    priority: "Low",
    reminderTime: "19:00",
    isActive: true,
  },
  {
    id: "task-5",
    title: "Evening walk",
    category: "Exercise",
    timeOfDay: "Evening",
    frequency: "Daily",
    weekdays: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    subtasks: ["Grab reflective leash", "Slow cool-down loop"],
    notes: "Slow-paced for cooldown.",
    priority: "High",
    reminderTime: "20:00",
    isActive: true,
  },
];

export const seedLogs: DailyLog[] = [
  {
    dateISO: formatISODate(new Date()),
    items: seedTasks.map((task) => ({
      taskId: task.id,
      completed: false,
    })),
  },
];
