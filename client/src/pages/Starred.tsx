import { useEffect, useMemo } from "react";
import { CalendarDays, Clock3, Star } from "lucide-react";
import AnalyticsCards from "../components/layout/View/Starred/AnalyticsCards";
import TaskGroupSection from "../components/layout/View/Starred/TaskGroupSection";
import { useGetTasks } from "../hooks/Tasks/useGetTasks";
import { useTasksContext } from "../hooks/Tasks/useTasksContext";

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

const toDate = (value?: string) => {
  if (!value) return null;
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
};

const getDayBounds = (base = new Date()) => {
  const start = new Date(base);
  start.setHours(0, 0, 0, 0);

  const end = new Date(base);
  end.setHours(23, 59, 59, 999);

  return { start, end };
};

const StarredPage = () => {
  const { getTasks } = useGetTasks();
  const { tasks } = useTasksContext() as unknown as { tasks: Task[] | null };

  useEffect(() => {
    getTasks();
  }, []);

  const safeTasks = tasks ?? [];

  const { starredTasks, todayTasks, upcomingTasks, completedCount, progress } =
    useMemo(() => {
      const { start, end } = getDayBounds();

      const starred = safeTasks.filter((task) => task.starred);

      const today = safeTasks.filter((task) => {
        const date = toDate(task.due_date);
        return date ? date >= start && date <= end : false;
      });

      const upcoming = safeTasks
        .filter((task) => {
          const date = toDate(task.due_date);
          return date ? date > end : false;
        })
        .sort((a, b) => {
          const dateA = toDate(a.due_date)?.getTime() ?? 0;
          const dateB = toDate(b.due_date)?.getTime() ?? 0;
          return dateA - dateB;
        });

      const completed = safeTasks.filter(
        (task) => task.status === "completed",
      ).length;

      const progressRate =
        safeTasks.length > 0 ? Math.round((completed / safeTasks.length) * 100) : 0;

      return {
        starredTasks: starred,
        todayTasks: today,
        upcomingTasks: upcoming,
        completedCount: completed,
        progress: progressRate,
      };
    }, [safeTasks]);

  return (
    <div className="w-full min-h-screen bg-background p-6 md:p-8 pb-20">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-text-primary">Starred</h1>
        <p className="text-text-secondary mt-1">
          Analytics, starred focus, today tasks, and upcoming timeline.
        </p>
      </div>

      <AnalyticsCards
        totalTasks={safeTasks.length}
        completedCount={completedCount}
        progress={progress}
        starredCount={starredTasks.length}
      />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <TaskGroupSection
          icon={<Star size={18} />}
          title="Starred"
          subtitle="Prioritized by you"
          emptyText="No starred tasks yet."
          tasks={starredTasks}
        />

        <TaskGroupSection
          icon={<CalendarDays size={18} />}
          title="Today"
          subtitle="Tasks due today"
          emptyText="No tasks due today."
          tasks={todayTasks}
        />

        <TaskGroupSection
          icon={<Clock3 size={18} />}
          title="Upcoming"
          subtitle="Next tasks by due date"
          emptyText="No upcoming tasks."
          tasks={upcomingTasks}
        />
      </div>
    </div>
  );
};

export default StarredPage;
