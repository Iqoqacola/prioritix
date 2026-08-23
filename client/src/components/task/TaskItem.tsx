"use client";

import { CalendarDays, Star } from "lucide-react";
import { useUpdateTask } from "../../hooks/Tasks/useUpdateTask";

export type Task = {
  id: number;
  title: string;
  project_id: number | string | null;
  description: string;
  status: string;
  priority: string;
  due_date: string;
  tags: string;
  starred: boolean;
};

type TaskItemProps = {
  task: Task;
};

export const isTaskCompleted = (task: Task) => {
  const status = task.status?.toLowerCase();

  return status === "completed" || status === "done";
};

const priorityStyle = (priority: string) => {
  switch (priority?.toLowerCase()) {
    case "high":
      return "bg-red-50 text-red-600";

    case "medium":
      return "bg-amber-50 text-amber-600";

    case "low":
      return "bg-emerald-50 text-emerald-600";

    default:
      return "bg-slate-100 text-slate-500";
  }
};

const formatDate = (date: string) => {
  if (!date) return "";

  const value = date.split("T")[0];

  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "short",
  }).format(new Date(`${value}T00:00:00`));
};

export default function TaskItem({ task }: TaskItemProps) {
  const { updateTask, isLoading } = useUpdateTask();

  const completed = isTaskCompleted(task);

  const handleToggleTask = async () => {
    const newStatus = completed ? "pending" : "completed";

    await updateTask({
      ...task,
      status: newStatus,
    });
  };

  return (
    <div className="group flex items-start gap-3 border-b border-slate-100 px-1 py-4 last:border-none">
      {/* COMPLETE BUTTON */}
      <button
        type="button"
        onClick={handleToggleTask}
        disabled={isLoading}
        title={completed ? "Mark as pending" : "Mark as completed"}
        className={`mt-1 flex h-5 w-5 shrink-0 cursor-pointer items-center justify-center rounded-full border-2 transition-all ${
          completed
            ? "border-sky-500 bg-sky-500"
            : "border-slate-300 bg-white hover:border-sky-500 hover:bg-sky-50"
        } ${isLoading ? "cursor-not-allowed opacity-50" : ""}`}
      >
        {completed && (
          <span className="text-[10px] font-bold leading-none text-white">
            ✓
          </span>
        )}
      </button>

      {/* TASK CONTENT */}
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            {/* TITLE */}
            <div className="flex items-center gap-2">
              <p
                className={`truncate text-sm font-medium ${
                  completed ? "text-slate-400 line-through" : "text-slate-700"
                }`}
              >
                {task.title}
              </p>

              {task.starred && (
                <Star
                  size={14}
                  className="shrink-0 fill-amber-400 text-amber-400"
                />
              )}
            </div>

            {/* DESCRIPTION */}
            {task.description && (
              <p
                className={`mt-1 line-clamp-1 text-xs ${
                  completed ? "text-slate-300" : "text-slate-400"
                }`}
              >
                {task.description}
              </p>
            )}
          </div>

          {/* PRIORITY */}
          {task.priority && (
            <span
              className={`shrink-0 rounded-md px-2 py-1 text-[11px] font-medium capitalize ${priorityStyle(
                task.priority,
              )}`}
            >
              {task.priority}
            </span>
          )}
        </div>

        {/* BOTTOM INFO */}
        <div className="mt-2 flex flex-wrap items-center gap-3">
          {task.due_date && (
            <div className="flex items-center gap-1 text-xs text-slate-400">
              <CalendarDays size={13} />

              <span>{formatDate(task.due_date)}</span>
            </div>
          )}

          {task.tags && (
            <span className="text-xs text-slate-400">#{task.tags}</span>
          )}
        </div>
      </div>
    </div>
  );
}
