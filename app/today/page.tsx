"use client";

import * as React from "react";
import { PawPrint } from "lucide-react";

import { useDogRoutineStore, getTodayISO } from "@/store/useDogRoutineStore";
import { TaskGroup } from "@/components/task-group";
import { ConfirmDialog } from "@/components/confirm-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { timeOfDayOrder } from "@/lib/date";
import { useToast } from "@/components/ui/use-toast";

export default function TodayPage() {
  const {
    tasks,
    getLogForDate,
    toggleTaskCompletion,
    markAllDone,
    resetDay,
    updateLogNote,
    updateAllLogNotes,
  } = useDogRoutineStore();
  const dateISO = getTodayISO();
  const log = getLogForDate(dateISO);
  const { toast } = useToast();
  const [allNote, setAllNote] = React.useState("");

  const activeTasks = tasks.filter((task) => task.isActive);

  const groupedTasks = React.useMemo(() => {
    return timeOfDayOrder.reduce<Record<string, typeof activeTasks>>((acc, time) => {
      acc[time] = activeTasks.filter((task) => task.timeOfDay === time);
      return acc;
    }, {});
  }, [activeTasks]);

  const logItems = React.useMemo(() => {
    return log.items.reduce<Record<string, (typeof log.items)[number]>>((acc, item) => {
      acc[item.taskId] = item;
      return acc;
    }, {});
  }, [log.items]);

  const completedCount = log.items.filter((item) => item.completed).length;
  const totalCount = log.items.length;

  const handleToggle = (taskId: string) => {
    toggleTaskCompletion(dateISO, taskId);
  };

  const handleNote = (taskId: string, note: string) => {
    updateLogNote(dateISO, taskId, note);
    toast({ title: "Note saved", description: "Your update is stored for today." });
  };

  const handleApplyAllNotes = () => {
    updateAllLogNotes(dateISO, allNote);
    toast({
      title: "Notes applied",
      description: "Your note was added to all of today's tasks.",
    });
  };

  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm text-muted-foreground">Today</p>
          <h1 className="text-3xl font-semibold text-foreground">Good day for a routine.</h1>
        </div>
        <div className="flex flex-wrap gap-3">
          <ConfirmDialog
            trigger={
              <Button variant="outline" className="rounded-full">
                Reset day
              </Button>
            }
            title="Reset today's checklist?"
            description="This will clear all completed tasks for today."
            onConfirm={() => {
              resetDay(dateISO);
              toast({ title: "Checklist reset", description: "Start fresh for today." });
            }}
          />
          <ConfirmDialog
            trigger={<Button className="rounded-full">Mark all done</Button>}
            title="Mark all tasks done?"
            description="We'll timestamp every active task for today."
            onConfirm={() => {
              markAllDone(dateISO);
              toast({ title: "All tasks completed", description: "Nice work today!" });
            }}
          />
        </div>
      </header>

      <Card>
        <CardContent className="flex flex-col gap-4 p-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <PawPrint className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Completion</p>
              <p className="text-2xl font-semibold">
                {completedCount}/{totalCount} tasks finished
              </p>
            </div>
          </div>
          <div className="rounded-2xl bg-secondary px-4 py-3 text-sm text-muted-foreground">
            Keep it light and joyful. Small wins build strong habits.
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="flex flex-col gap-4 p-6 md:flex-row md:items-end md:justify-between">
          <div className="flex-1 space-y-2">
            <p className="text-sm font-medium text-foreground">Shared note</p>
            <Textarea
              value={allNote}
              onChange={(event) => setAllNote(event.target.value)}
              placeholder="Add a note to apply to every task today."
              className="min-h-[96px]"
            />
            <p className="text-xs text-muted-foreground">
              This will overwrite existing task notes for today.
            </p>
          </div>
          <ConfirmDialog
            trigger={
              <Button className="rounded-full md:mt-0" disabled={log.items.length === 0}>
                Apply note to all tasks
              </Button>
            }
            title="Apply this note to every task?"
            description="This will replace all existing task notes for today."
            onConfirm={handleApplyAllNotes}
          />
        </CardContent>
      </Card>

      {activeTasks.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center gap-3 py-16 text-center">
            <div className="rounded-full bg-secondary p-4">
              <PawPrint className="h-6 w-6 text-muted-foreground" />
            </div>
            <h2 className="text-lg font-semibold">No routines yet</h2>
            <p className="text-sm text-muted-foreground">
              Add your first routine task to start today's checklist.
            </p>
            <Button asChild>
              <a href="/routine">Create routine</a>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-8">
          {timeOfDayOrder.map((time) => (
            <TaskGroup
              key={time}
              title={time}
              tasks={groupedTasks[time] ?? []}
              logItems={logItems}
              onToggle={handleToggle}
              onNote={handleNote}
            />
          ))}
        </div>
      )}
    </div>
  );
}
