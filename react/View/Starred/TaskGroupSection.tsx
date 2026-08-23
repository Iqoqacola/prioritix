import type { ReactNode } from "react";
import { TaskRowButton } from "../../../ui/Button";

type TaskStatus = "pending" | "in_progress" | "completed";
type TaskPriority = "low" | "medium" | "high";

type Task = {
  id: number;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  due_date?: string;
  tags?: string;
  starred?: boolean;
  project_id: number;
};

type TaskGroupSectionProps = {
  icon: ReactNode;
  title: string;
  subtitle: string;
  emptyText: string;
  tasks: Task[];
};

const TaskGroupSection = ({
  icon,
  title,
  subtitle,
  emptyText,
  tasks,
}: TaskGroupSectionProps) => {
  return (
    <section className="rounded-2xl border border-border bg-surface p-5 shadow-sm">
      <div className="flex items-center gap-3 mb-4">
        <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
          {icon}
        </div>
        <div>
          <h2 className="text-lg font-semibold text-text-primary">{title}</h2>
          <p className="text-sm text-text-secondary">{subtitle}</p>
        </div>
      </div>

      <div className="max-h-[420px] overflow-y-auto rounded-xl border border-border/60">
        {tasks.length > 0 ? (
          tasks.map((task) => <TaskRowButton key={task.id} task={task} />)
        ) : (
          <p className="text-sm text-text-secondary p-4">{emptyText}</p>
        )}
      </div>
    </section>
  );
};

export default TaskGroupSection;
