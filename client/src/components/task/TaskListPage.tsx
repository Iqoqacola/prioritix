"use client";

import { useMemo } from "react";
import { Inbox, CalendarDays, CalendarRange, ListTodo } from "lucide-react";

import { useTasksContext } from "../../hooks/Tasks/useTasksContext";
import TaskItem, { Task } from "./TaskItem";

type View = "inbox" | "today" | "upcoming" | "all";

type TaskListPageProps = {
  view: View;
};

const getToday = () => {
  const date = new Date();

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const getTaskDate = (date: string) => {
  if (!date) return "";

  return date.split("T")[0];
};

const configs = {
  inbox: {
    title: "Inbox",
    description: "Tasks that haven't been assigned to a project.",
    icon: Inbox,
  },

  today: {
    title: "Today",
    description: "Tasks that need your attention today.",
    icon: CalendarDays,
  },

  upcoming: {
    title: "Upcoming",
    description: "Tasks scheduled for the coming days.",
    icon: CalendarRange,
  },

  all: {
    title: "All Tasks",
    description: "View and manage all your tasks.",
    icon: ListTodo,
  },
};

export default function TaskListPage({ view }: TaskListPageProps) {
  const { tasks } = useTasksContext();

  const allTasks = (tasks ?? []) as Task[];

  const filteredTasks = useMemo(() => {
    const today = getToday();

    const result = allTasks.filter((task) => {
      const dueDate = getTaskDate(task.due_date);

      switch (view) {
        case "inbox":
          return (
            task.project_id === "" ||
            task.project_id === null ||
            task.project_id === undefined
          );

        case "today":
          return dueDate === today;

        case "upcoming":
          return dueDate > today;

        case "all":
        default:
          return true;
      }
    });

    return result.sort((a, b) => {
      if (!a.due_date && !b.due_date) {
        return 0;
      }

      if (!a.due_date) {
        return 1;
      }

      if (!b.due_date) {
        return -1;
      }

      return getTaskDate(a.due_date).localeCompare(getTaskDate(b.due_date));
    });
  }, [allTasks, view]);

  const config = configs[view];

  const Icon = config.icon;

  return (
    <div className="w-full min-w-0 px-6 py-6 lg:px-8 xl:px-10">
      {/* HEADER */}
      <div className="mb-8">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100">
            <Icon size={20} className="text-slate-600" />
          </div>

          <div className="min-w-0">
            <h1 className="text-2xl font-semibold text-slate-800">
              {config.title}
            </h1>

            <p className="mt-1 text-sm text-slate-400">{config.description}</p>
          </div>
        </div>
      </div>

      {/* TASK CONTAINER */}
      <div className="w-full overflow-hidden rounded-2xl border border-slate-200 bg-white">
        {/* TASK HEADER */}
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
          <div>
            <p className="text-sm font-semibold text-slate-700">Tasks</p>

            <p className="mt-0.5 text-xs text-slate-400">
              {filteredTasks.length}{" "}
              {filteredTasks.length === 1 ? "task" : "tasks"}
            </p>
          </div>

          <span className="rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-500">
            {filteredTasks.length}
          </span>
        </div>

        {/* TASK LIST */}
        {filteredTasks.length > 0 ? (
          <div className="px-5">
            {filteredTasks.map((task) => (
              <TaskItem key={task.id} task={task} />
            ))}
          </div>
        ) : (
          /* EMPTY STATE */
          <div className="flex min-h-[400px] flex-col items-center justify-center px-5">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-slate-100">
              <Icon size={21} className="text-slate-400" />
            </div>

            <p className="text-sm font-medium text-slate-600">No tasks here</p>

            <p className="mt-1 text-xs text-slate-400">You're all caught up.</p>
          </div>
        )}
      </div>
    </div>
  );
}
