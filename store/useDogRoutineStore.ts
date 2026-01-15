"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { formatISODate } from "@/lib/date";
import { format, parseISO } from "date-fns";
import { seedLogs, seedProfile, seedTasks } from "@/lib/seed";
import { DailyLog, OwnerProfile, RoutineTask } from "@/types";

interface DogRoutineState {
  profile: OwnerProfile;
  tasks: RoutineTask[];
  logs: DailyLog[];
  setProfile: (profile: OwnerProfile) => void;
  addTask: (task: RoutineTask) => void;
  updateTask: (taskId: string, updates: Partial<RoutineTask>) => void;
  deleteTask: (taskId: string) => void;
  toggleTaskCompletion: (dateISO: string, taskId: string, note?: string) => void;
  markAllDone: (dateISO: string) => void;
  resetDay: (dateISO: string) => void;
  updateLogNote: (dateISO: string, taskId: string, note: string) => void;
  getLogForDate: (dateISO: string) => DailyLog;
}

const getOrCreateLog = (logs: DailyLog[], dateISO: string, tasks: RoutineTask[]): DailyLog => {
  const existing = logs.find((log) => log.dateISO === dateISO);
  if (existing) return existing;
  const day = format(parseISO(dateISO), "EEE");
  return {
    dateISO,
    items: tasks
      .filter((task) => task.isActive && task.weekdays.includes(day))
      .map((task) => ({ taskId: task.id, completed: false })),
  };
};

export const useDogRoutineStore = create<DogRoutineState>()(
  persist(
    (set, get) => ({
      profile: seedProfile,
      tasks: seedTasks,
      logs: seedLogs,
      setProfile: (profile) => set({ profile }),
      addTask: (task) =>
        set((state) => ({
          tasks: [task, ...state.tasks],
          logs: state.logs.map((log) => {
            const day = format(parseISO(log.dateISO), "EEE");
            if (!task.weekdays.includes(day) || !task.isActive) {
              return log;
            }
            return {
              ...log,
              items: [{ taskId: task.id, completed: false }, ...log.items],
            };
          }),
        })),
      updateTask: (taskId, updates) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === taskId ? { ...task, ...updates } : task
          ),
        })),
      deleteTask: (taskId) =>
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== taskId),
          logs: state.logs.map((log) => ({
            ...log,
            items: log.items.filter((item) => item.taskId !== taskId),
          })),
        })),
      toggleTaskCompletion: (dateISO, taskId, note) =>
        set((state) => {
          const log = getOrCreateLog(state.logs, dateISO, state.tasks);
          const updatedItems = log.items.map((item) =>
            item.taskId === taskId
              ? {
                  ...item,
                  completed: !item.completed,
                  completedAtISO: !item.completed ? new Date().toISOString() : undefined,
                  note: note ?? item.note,
                }
              : item
          );
          const updatedLog = { ...log, items: updatedItems };
          const otherLogs = state.logs.filter((entry) => entry.dateISO !== dateISO);
          return { logs: [updatedLog, ...otherLogs] };
        }),
      markAllDone: (dateISO) =>
        set((state) => {
          const log = getOrCreateLog(state.logs, dateISO, state.tasks);
          const updatedLog = {
            ...log,
            items: log.items.map((item) => ({
              ...item,
              completed: true,
              completedAtISO: item.completedAtISO ?? new Date().toISOString(),
            })),
          };
          return {
            logs: [updatedLog, ...state.logs.filter((entry) => entry.dateISO !== dateISO)],
          };
        }),
      resetDay: (dateISO) =>
        set((state) => {
          const log = getOrCreateLog(state.logs, dateISO, state.tasks);
          const updatedLog = {
            ...log,
            items: log.items.map((item) => ({
              ...item,
              completed: false,
              completedAtISO: undefined,
            })),
          };
          return {
            logs: [updatedLog, ...state.logs.filter((entry) => entry.dateISO !== dateISO)],
          };
        }),
      updateLogNote: (dateISO, taskId, note) =>
        set((state) => {
          const log = getOrCreateLog(state.logs, dateISO, state.tasks);
          const updatedLog = {
            ...log,
            items: log.items.map((item) =>
              item.taskId === taskId ? { ...item, note } : item
            ),
          };
          return {
            logs: [updatedLog, ...state.logs.filter((entry) => entry.dateISO !== dateISO)],
          };
        }),
      getLogForDate: (dateISO) => {
        const { logs, tasks } = get();
        return getOrCreateLog(logs, dateISO, tasks);
      },
    }),
    {
      name: "dog-routine-storage",
      partialize: (state) => ({
        profile: state.profile,
        tasks: state.tasks,
        logs: state.logs,
      }),
    }
  )
);

export const getTodayISO = () => formatISODate(new Date());
