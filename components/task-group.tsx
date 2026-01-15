import { TimeOfDay, RoutineTask, DailyLogItem } from "@/types";
import { TaskCard } from "@/components/task-card";

interface TaskGroupProps {
  title: TimeOfDay;
  tasks: RoutineTask[];
  logItems: Record<string, DailyLogItem>;
  onToggle: (taskId: string) => void;
  onNote: (taskId: string, note: string) => void;
}

export function TaskGroup({ title, tasks, logItems, onToggle, onNote }: TaskGroupProps) {
  if (!tasks.length) return null;

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">{title}</h2>
        <p className="text-sm text-muted-foreground">
          {tasks.length} task{tasks.length > 1 ? "s" : ""}
        </p>
      </div>
      <div className="grid gap-4">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            logItem={logItems[task.id]}
            onToggle={() => onToggle(task.id)}
            onNote={(note) => onNote(task.id, note)}
          />
        ))}
      </div>
    </section>
  );
}
