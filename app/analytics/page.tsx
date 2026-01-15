"use client";

import * as React from "react";
import { subDays } from "date-fns";

import { useDogRoutineStore } from "@/store/useDogRoutineStore";
import { WeeklyChart } from "@/components/weekly-chart";
import { StatsCard } from "@/components/stats-card";
import { formatISODate } from "@/lib/date";

export default function AnalyticsPage() {
  const { logs, tasks } = useDogRoutineStore();
  const totalTasks = tasks.length || 1;

  const weeklyData = React.useMemo(() => {
    return Array.from({ length: 7 }).map((_, index) => {
      const date = subDays(new Date(), 6 - index);
      const dateISO = formatISODate(date);
      const log = logs.find((entry) => entry.dateISO === dateISO);
      const completed = log ? log.items.filter((item) => item.completed).length : 0;
      return {
        day: date.toLocaleDateString("en-US", { weekday: "short" }),
        completion: Math.round((completed / totalTasks) * 100),
      };
    });
  }, [logs, totalTasks]);

  const streak = React.useMemo(() => {
    let count = 0;
    for (let index = 0; index < 30; index += 1) {
      const dateISO = formatISODate(subDays(new Date(), index));
      const log = logs.find((entry) => entry.dateISO === dateISO);
      if (!log) break;
      const completed = log.items.filter((item) => item.completed).length;
      if (completed === totalTasks) {
        count += 1;
      } else {
        break;
      }
    }
    return count;
  }, [logs, totalTasks]);

  const averageCompletion = Math.round(
    weeklyData.reduce((acc, item) => acc + item.completion, 0) / weeklyData.length
  );

  return (
    <div className="space-y-6">
      <header>
        <p className="text-sm text-muted-foreground">Analytics</p>
        <h1 className="text-3xl font-semibold">Progress insights</h1>
      </header>

      <div className="grid gap-4 md:grid-cols-3">
        <StatsCard
          title="Weekly average"
          value={`${averageCompletion}%`}
          description="Average completion across the last 7 days."
        />
        <StatsCard
          title="Current streak"
          value={`${streak} days`}
          description="Days in a row with full completion."
        />
        <StatsCard
          title="Active tasks"
          value={`${tasks.filter((task) => task.isActive).length}`}
          description="Tasks currently included in your routine."
        />
      </div>

      <WeeklyChart data={weeklyData} />
    </div>
  );
}
