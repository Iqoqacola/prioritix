"use client";

import Link from "next/link";

import {
  ArrowRight,
  CalendarDays,
  CalendarRange,
  CheckCircle2,
  Inbox,
  ListTodo,
} from "lucide-react";

import { useTasksContext } from "../../../hooks/Tasks/useTasksContext";

import TaskItem, {
  Task,
  isTaskCompleted,
} from "../../../components/task/TaskItem";

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

export default function DashboardPage() {
  const { tasks } = useTasksContext();

  const allTasks = (tasks ?? []) as Task[];

  const today = getToday();

  /*
   * INBOX
   * Task yang belum masuk project
   */
  const inboxTasks = allTasks.filter(
    (task) =>
      task.project_id === "" ||
      task.project_id === null ||
      task.project_id === undefined,
  );

  /*
   * TODAY
   */
  const todayTasks = allTasks.filter(
    (task) => getTaskDate(task.due_date) === today,
  );

  /*
   * UPCOMING
   */
  const upcomingTasks = allTasks.filter(
    (task) =>
      task.due_date &&
      getTaskDate(task.due_date) > today &&
      !isTaskCompleted(task),
  );

  /*
   * COMPLETED
   */
  const completedTasks = allTasks.filter((task) => isTaskCompleted(task));

  /*
   * PENDING
   */
  const pendingTasks = allTasks.filter((task) => !isTaskCompleted(task));

  /*
   * PROGRESS
   */
  const progress =
    allTasks.length === 0
      ? 0
      : Math.round((completedTasks.length / allTasks.length) * 100);

  /*
   * NEXT TASKS
   */
  const nextTasks = [...pendingTasks]
    .sort((a, b) => {
      if (!a.due_date && !b.due_date) return 0;

      if (!a.due_date) return 1;

      if (!b.due_date) return -1;

      return getTaskDate(a.due_date).localeCompare(getTaskDate(b.due_date));
    })
    .slice(0, 7);

  /*
   * TOP CARDS
   */
  const overview = [
    {
      title: "Inbox",
      value: inboxTasks.length,
      href: "/inbox",
      icon: Inbox,
    },

    {
      title: "Today",
      value: todayTasks.length,
      href: "/today",
      icon: CalendarDays,
    },

    {
      title: "Upcoming",
      value: upcomingTasks.length,
      href: "/upcoming",
      icon: CalendarRange,
    },

    {
      title: "All Tasks",
      value: allTasks.length,
      href: "/all-tasks",
      icon: ListTodo,
    },
  ];

  return (
    /*
     * PENTING:
     * Tidak pakai:
     *
     * mx-auto
     * max-w-6xl
     *
     * supaya dashboard memenuhi area kanan sidebar.
     */
    <div className="w-full px-6 py-6 lg:px-8 xl:px-10">
      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-slate-800">Dashboard</h1>

        <p className="mt-1 text-sm text-slate-400">
          Here's an overview of your tasks.
        </p>
      </div>

      {/* ===================================== */}
      {/* OVERVIEW CARDS */}
      {/* ===================================== */}

      <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {overview.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              href={item.href}
              key={item.title}
              className="group min-w-0 rounded-2xl border border-slate-200 bg-white p-5 transition-all hover:border-slate-300 hover:shadow-sm"
            >
              {/* CARD TOP */}
              <div className="mb-7 flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100">
                  <Icon size={19} className="text-slate-600" />
                </div>

                <ArrowRight
                  size={17}
                  className="text-slate-300 transition-transform duration-200 group-hover:translate-x-1 group-hover:text-slate-500"
                />
              </div>

              {/* VALUE */}
              <p className="text-2xl font-semibold text-slate-800">
                {item.value}
              </p>

              {/* NAME */}
              <p className="mt-1 text-sm text-slate-400">{item.title}</p>
            </Link>
          );
        })}
      </div>

      {/* ===================================== */}
      {/* MAIN CONTENT */}
      {/* ===================================== */}

      <div className="mt-6 grid w-full grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_340px]">
        {/* ================================= */}
        {/* NEXT TASK */}
        {/* ================================= */}

        <div className="min-w-0 rounded-2xl border border-slate-200 bg-white px-5">
          {/* HEADER */}
          <div className="flex items-center justify-between border-b border-slate-100 py-5">
            <div>
              <h2 className="text-sm font-semibold text-slate-700">
                Next Tasks
              </h2>

              <p className="mt-0.5 text-xs text-slate-400">
                Tasks you should focus on next.
              </p>
            </div>

            <Link
              href="/all-tasks"
              className="shrink-0 text-xs font-medium text-sky-600 transition hover:text-sky-700"
            >
              View all
            </Link>
          </div>

          {/* TASK LIST */}
          {nextTasks.length > 0 ? (
            <div>
              {nextTasks.map((task) => (
                <TaskItem key={task.id} task={task} />
              ))}
            </div>
          ) : (
            /* EMPTY */
            <div className="flex min-h-[320px] items-center justify-center">
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-slate-100">
                  <CheckCircle2 size={23} className="text-slate-400" />
                </div>

                <p className="text-sm font-medium text-slate-600">
                  You're all caught up
                </p>

                <p className="mt-1 text-xs text-slate-400">No pending tasks.</p>
              </div>
            </div>
          )}
        </div>

        {/* ================================= */}
        {/* TASK PROGRESS */}
        {/* ================================= */}

        <div className="h-fit rounded-2xl border border-slate-200 bg-white p-5">
          {/* TITLE */}
          <h2 className="text-sm font-semibold text-slate-700">
            Task Progress
          </h2>

          <p className="mt-1 text-xs text-slate-400">Overall completion</p>

          {/* PERCENTAGE */}
          <div className="my-7 flex items-end gap-1">
            <span className="text-4xl font-semibold tracking-tight text-slate-800">
              {progress}
            </span>

            <span className="mb-1 text-sm text-slate-400">%</span>
          </div>

          {/* PROGRESS BAR */}
          <div className="h-3 w-full overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full rounded-full bg-sky-500 transition-all duration-300"
              style={{
                width: `${progress}%`,
              }}
            />
          </div>

          {/* COUNTERS */}
          <div className="mt-7 space-y-4">
            {/* COMPLETED */}
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-500">Completed</span>

              <span className="text-sm font-semibold text-slate-700">
                {completedTasks.length}
              </span>
            </div>

            {/* PENDING */}
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-500">Pending</span>

              <span className="text-sm font-semibold text-slate-700">
                {pendingTasks.length}
              </span>
            </div>

            {/* TOTAL */}
            <div className="flex items-center justify-between border-t border-slate-100 pt-4">
              <span className="text-sm text-slate-500">Total</span>

              <span className="text-sm font-semibold text-slate-700">
                {allTasks.length}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
