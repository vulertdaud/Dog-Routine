"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { format, parseISO, subDays } from "date-fns";
import { CalendarDays } from "lucide-react";

import { useDogRoutineStore } from "@/store/useDogRoutineStore";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatISODate } from "@/lib/date";

export default function HistoryPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { logs, tasks } = useDogRoutineStore();

  const selectedDate = searchParams.get("date") ?? formatISODate(new Date());

  const dateOptions = React.useMemo(() => {
    return Array.from({ length: 14 }).map((_, index) => {
      const date = subDays(new Date(), index);
      return formatISODate(date);
    });
  }, []);

  const selectedLog = logs.find((log) => log.dateISO === selectedDate);
  const totalTasks = tasks.length;
  const completedCount = selectedLog
    ? selectedLog.items.filter((item) => item.completed).length
    : 0;

  const handleSelectDate = (date: string) => {
    router.push(`/history?date=${date}`);
  };

  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-2">
        <p className="text-sm text-muted-foreground">History</p>
        <h1 className="text-3xl font-semibold">Past routines & stats</h1>
      </header>

      <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-sm font-medium">
              <CalendarDays className="h-4 w-4" />
              Select a date
            </div>
            <div className="mt-4 space-y-2">
              {dateOptions.map((date) => (
                <Button
                  key={date}
                  variant={date === selectedDate ? "default" : "outline"}
                  className="w-full justify-between"
                  onClick={() => handleSelectDate(date)}
                >
                  {format(parseISO(date), "MMM d")}
                  <span className="text-xs text-muted-foreground">
                    {logs.find((log) => log.dateISO === date)?.items.filter((item) => item.completed)
                      .length ?? 0}
                    /{totalTasks}
                  </span>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{format(parseISO(selectedDate), "PPPP")}</p>
                <h2 className="text-2xl font-semibold">
                  {completedCount}/{totalTasks} tasks completed
                </h2>
              </div>
              <div className="rounded-2xl bg-secondary px-4 py-2 text-sm text-muted-foreground">
                Keep the streak alive by finishing every task.
              </div>
            </div>

            {selectedLog ? (
              <div className="mt-6 space-y-3">
                {selectedLog.items.map((item) => {
                  const task = tasks.find((task) => task.id === item.taskId);
                  if (!task) return null;
                  return (
                    <div
                      key={item.taskId}
                      className="flex items-start justify-between rounded-2xl border border-border/60 bg-background/70 p-4"
                    >
                      <div>
                        <p className="font-medium">{task.title}</p>
                        <p className="text-sm text-muted-foreground">{task.category}</p>
                        {item.note ? (
                          <p className="mt-2 text-sm text-muted-foreground">Note: {item.note}</p>
                        ) : null}
                      </div>
                      <div className="text-right text-sm">
                        <p className={item.completed ? "text-primary" : "text-muted-foreground"}>
                          {item.completed ? "Completed" : "Missed"}
                        </p>
                        {item.completedAtISO ? (
                          <p className="text-xs text-muted-foreground">
                            {format(parseISO(item.completedAtISO), "p")}
                          </p>
                        ) : null}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="mt-6 rounded-2xl border border-dashed border-border/70 p-6 text-sm text-muted-foreground">
                No log yet. Complete today&apos;s tasks to see them here.
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
