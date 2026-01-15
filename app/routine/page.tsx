"use client";

import * as React from "react";
import { Pencil, Plus, Trash2 } from "lucide-react";

import { useDogRoutineStore } from "@/store/useDogRoutineStore";
import { TaskFormModal } from "@/components/task-form-modal";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import { RoutineTask } from "@/types";

export default function RoutinePage() {
  const { tasks, addTask, updateTask, deleteTask } = useDogRoutineStore();
  const { toast } = useToast();
  const [open, setOpen] = React.useState(false);
  const [editing, setEditing] = React.useState<RoutineTask | undefined>();
  const getSubtasks = (task: RoutineTask) =>
    Array.isArray(task.subtasks) ? task.subtasks : [];

  const handleEdit = (task: RoutineTask) => {
    setEditing(task);
    setOpen(true);
  };

  const handleSubmit = (task: RoutineTask) => {
    if (editing) {
      updateTask(editing.id, task);
      toast({ title: "Routine updated", description: "Your task is refreshed." });
    } else {
      addTask(task);
      toast({ title: "Routine added", description: "New task added to your routine." });
    }
    setEditing(undefined);
  };

  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm text-muted-foreground">Routine templates</p>
          <h1 className="text-3xl font-semibold">Manage daily tasks</h1>
        </div>
        <Button
          onClick={() => {
            setEditing(undefined);
            setOpen(true);
          }}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add routine
        </Button>
      </header>

      <div className="grid gap-4">
        {tasks.map((task) => (
          <Card key={task.id}>
            <CardContent className="flex flex-col gap-4 p-6 md:flex-row md:items-center md:justify-between">
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-lg font-semibold">{task.title}</h2>
                  <Badge variant="secondary">{task.category}</Badge>
                  <Badge variant="outline">{task.timeOfDay}</Badge>
                </div>
                <p className="text-sm text-muted-foreground">{task.notes}</p>
                {getSubtasks(task).length ? (
                  <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
                    {getSubtasks(task).map((subtask) => (
                      <li key={subtask}>{subtask}</li>
                    ))}
                  </ul>
                ) : null}
                <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                  <span>Priority: {task.priority}</span>
                  <span>Frequency: {task.frequency}</span>
                  <span>Reminder: {task.reminderTime || "None"}</span>
                  <span>Weekdays: {task.weekdays.join(", ")}</span>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  Active
                  <Switch
                    checked={task.isActive}
                    onCheckedChange={(value) => updateTask(task.id, { isActive: value })}
                    aria-label={`Toggle ${task.title}`}
                  />
                </div>
                <Button variant="outline" size="sm" onClick={() => handleEdit(task)}>
                  <Pencil className="mr-2 h-4 w-4" />
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => {
                    deleteTask(task.id);
                    toast({ title: "Routine deleted", description: "Task removed." });
                  }}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <TaskFormModal
        open={open}
        onOpenChange={setOpen}
        onSubmit={handleSubmit}
        task={editing}
      />
    </div>
  );
}
