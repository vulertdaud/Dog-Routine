"use client";

import * as React from "react";

import { RoutineTask, Priority, TimeOfDay, Frequency } from "@/types";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const priorities: Priority[] = ["Low", "Medium", "High"];
const times: TimeOfDay[] = ["Morning", "Afternoon", "Evening", "Any"];
const frequencies: Frequency[] = ["Daily", "Weekdays"];

interface TaskFormModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (task: RoutineTask) => void;
  task?: RoutineTask;
}

export function TaskFormModal({ open, onOpenChange, onSubmit, task }: TaskFormModalProps) {
  const [form, setForm] = React.useState<RoutineTask>(
    task ?? {
      id: crypto.randomUUID(),
      title: "",
      category: "",
      timeOfDay: "Morning",
      frequency: "Daily",
      weekdays: weekdays,
      notes: "",
      priority: "Medium",
      reminderTime: "",
      isActive: true,
    }
  );

  React.useEffect(() => {
    if (task) {
      setForm(task);
    }
  }, [task]);

  const updateField = <K extends keyof RoutineTask>(key: K, value: RoutineTask[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const toggleWeekday = (day: string) => {
    setForm((prev) => ({
      ...prev,
      weekdays: prev.weekdays.includes(day)
        ? prev.weekdays.filter((item) => item !== day)
        : [...prev.weekdays, day],
    }));
  };

  const handleFrequencyChange = (value: Frequency) => {
    updateField("frequency", value);
    if (value === "Daily") {
      updateField("weekdays", weekdays);
    }
  };

  const handleSubmit = () => {
    onSubmit({ ...form, id: task?.id ?? form.id });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>{task ? "Edit routine" : "New routine"}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={form.title}
              onChange={(event) => updateField("title", event.target.value)}
              placeholder="Morning walk"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="category">Category</Label>
            <Input
              id="category"
              value={form.category}
              onChange={(event) => updateField("category", event.target.value)}
              placeholder="Exercise"
            />
          </div>
          <div className="grid gap-2">
            <Label>Time of day</Label>
            <Select
              value={form.timeOfDay}
              onValueChange={(value) => updateField("timeOfDay", value as TimeOfDay)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select time" />
              </SelectTrigger>
              <SelectContent>
                {times.map((time) => (
                  <SelectItem key={time} value={time}>
                    {time}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label>Frequency</Label>
            <Select value={form.frequency} onValueChange={(value) => handleFrequencyChange(value as Frequency)}>
              <SelectTrigger>
                <SelectValue placeholder="Frequency" />
              </SelectTrigger>
              <SelectContent>
                {frequencies.map((frequency) => (
                  <SelectItem key={frequency} value={frequency}>
                    {frequency}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label>Weekdays</Label>
            <div className="flex flex-wrap gap-2">
              {weekdays.map((day) => (
                <Button
                  key={day}
                  type="button"
                  size="sm"
                  variant={form.weekdays.includes(day) ? "default" : "outline"}
                  onClick={() => toggleWeekday(day)}
                  disabled={form.frequency === "Daily"}
                >
                  {day}
                </Button>
              ))}
            </div>
          </div>
          <div className="grid gap-2">
            <Label>Priority</Label>
            <Select
              value={form.priority}
              onValueChange={(value) => updateField("priority", value as Priority)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent>
                {priorities.map((priority) => (
                  <SelectItem key={priority} value={priority}>
                    {priority}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="reminderTime">Reminder time</Label>
            <Input
              id="reminderTime"
              type="time"
              value={form.reminderTime ?? ""}
              onChange={(event) => updateField("reminderTime", event.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              value={form.notes ?? ""}
              onChange={(event) => updateField("notes", event.target.value)}
              placeholder="Extra care or instructions"
            />
          </div>
          <div className="flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="button" onClick={handleSubmit}>
              Save routine
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
