"use client";

import * as React from "react";
import { Bell, CheckCircle2, Clock } from "lucide-react";

import { RoutineTask, DailyLogItem } from "@/types";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { formatTime } from "@/lib/date";

interface TaskCardProps {
  task: RoutineTask;
  logItem: DailyLogItem;
  onToggle: () => void;
  onNote: (note: string) => void;
}

export function TaskCard({ task, logItem, onToggle, onNote }: TaskCardProps) {
  const [note, setNote] = React.useState(logItem.note ?? "");
  const [showNote, setShowNote] = React.useState(false);

  React.useEffect(() => {
    setNote(logItem.note ?? "");
  }, [logItem.note]);

  return (
    <div
      className={cn(
        "rounded-2xl border bg-card p-4 shadow-soft transition",
        logItem.completed ? "border-primary/40" : "border-border/60"
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <Checkbox
            checked={logItem.completed}
            onCheckedChange={onToggle}
            aria-label={`Mark ${task.title} as complete`}
          />
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-sm font-semibold text-foreground">{task.title}</h3>
              <Badge variant="secondary">{task.category}</Badge>
              <Badge variant="outline">{task.priority}</Badge>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">{task.notes}</p>
            {task.subtasks.length ? (
              <ul className="mt-2 list-disc space-y-1 pl-4 text-xs text-muted-foreground">
                {task.subtasks.map((subtask) => (
                  <li key={subtask}>{subtask}</li>
                ))}
              </ul>
            ) : null}
            <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
              {task.reminderTime ? (
                <span className="flex items-center gap-1">
                  <Bell className="h-3 w-3" />
                  {task.reminderTime}
                </span>
              ) : null}
              {logItem.completedAtISO ? (
                <span className="flex items-center gap-1 text-primary">
                  <CheckCircle2 className="h-3 w-3" />
                  Done {formatTime(logItem.completedAtISO)}
                </span>
              ) : (
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  Pending
                </span>
              )}
            </div>
          </div>
        </div>
        <Button
          size="sm"
          variant="ghost"
          onClick={() => setShowNote((prev) => !prev)}
          aria-label="Toggle task note"
        >
          Notes
        </Button>
      </div>
      {showNote ? (
        <div className="mt-3">
          <Textarea
            value={note}
            onChange={(event) => setNote(event.target.value)}
            placeholder="Quick note for today"
            className="min-h-[80px]"
            onBlur={() => onNote(note)}
          />
        </div>
      ) : null}
    </div>
  );
}
