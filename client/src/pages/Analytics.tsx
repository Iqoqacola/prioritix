import { useEffect, useMemo, type ReactNode } from "react";
import {
  BarChart3,
  CalendarClock,
  CheckCircle2,
  CircleDashed,
  ListTodo,
  Target,
} from "lucide-react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  AreaChart,
  Area,
} from "recharts";
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

const COLORS = {
  primary: "var(--color-primary)",
  secondary: "var(--color-secondary)",
  success: "var(--color-success)",
  warning: "var(--color-warning)",
  danger: "var(--color-danger)",
  info: "var(--color-info)",
  accent: "var(--color-accent)",
  muted: "var(--color-muted)",
  textSecondary: "var(--color-text-secondary)",
  border: "var(--color-border)",
};

const toDate = (value?: string) => {
  if (!value) return null;
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
};

const startOfDay = (date = new Date()) => {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
};

const formatShortDate = (date: Date) =>
  new Intl.DateTimeFormat("en-US", { month: "short", day: "2-digit" }).format(
    date,
  );

const AnalyticsPage = () => {
  const { getTasks } = useGetTasks();
  const { tasks } = useTasksContext() as unknown as { tasks: Task[] | null };

  useEffect(() => {
    getTasks();
  }, []);

  const safeTasks = tasks ?? [];

  const {
    completedCount,
    inProgressCount,
    pendingCount,
    overdueCount,
    statusData,
    priorityData,
    upcoming7DaysData,
    productivityData,
  } = useMemo(() => {
    const today = startOfDay();

    const completed = safeTasks.filter((t) => t.status === "completed").length;
    const inProgress = safeTasks.filter((t) => t.status === "in_progress").length;
    const pending = safeTasks.filter((t) => t.status === "pending").length;

    const overdue = safeTasks.filter((t) => {
      if (t.status === "completed") return false;
      const due = toDate(t.due_date);
      return due ? due < today : false;
    }).length;

    const statusChart = [
      { name: "Completed", value: completed, color: COLORS.success },
      { name: "In Progress", value: inProgress, color: COLORS.info },
      { name: "Pending", value: pending, color: COLORS.warning },
    ].filter((i) => i.value > 0);

    const priorityChart = [
      {
        name: "Low",
        value: safeTasks.filter((t) => t.priority === "low").length,
        color: COLORS.success,
      },
      {
        name: "Medium",
        value: safeTasks.filter((t) => t.priority === "medium").length,
        color: COLORS.warning,
      },
      {
        name: "High",
        value: safeTasks.filter((t) => t.priority === "high").length,
        color: COLORS.danger,
      },
    ];

    const next7 = Array.from({ length: 7 }, (_, i) => {
      const day = startOfDay(new Date(today.getTime() + i * 86400000));
      const dayEnd = new Date(day);
      dayEnd.setHours(23, 59, 59, 999);

      const count = safeTasks.filter((t) => {
        const due = toDate(t.due_date);
        return due ? due >= day && due <= dayEnd : false;
      }).length;

      return {
        day: formatShortDate(day),
        tasks: count,
      };
    });

    const productivity = Array.from({ length: 7 }, (_, i) => {
      const day = startOfDay(new Date(today.getTime() - (6 - i) * 86400000));
      const dayEnd = new Date(day);
      dayEnd.setHours(23, 59, 59, 999);

      const done = safeTasks.filter((t) => {
        if (t.status !== "completed") return false;
        const due = toDate(t.due_date);
        return due ? due >= day && due <= dayEnd : false;
      }).length;

      return {
        day: formatShortDate(day),
        completed: done,
      };
    });

    return {
      completedCount: completed,
      inProgressCount: inProgress,
      pendingCount: pending,
      overdueCount: overdue,
      statusData: statusChart,
      priorityData: priorityChart,
      upcoming7DaysData: next7,
      productivityData: productivity,
    };
  }, [safeTasks]);

  return (
    <div className="w-full min-h-screen bg-background p-6 md:p-8 pb-20">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-text-primary">Analytics</h1>
        <p className="text-text-secondary mt-1">
          Snapshot performa task kamu dalam chart yang lebih kebaca.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
        <MetricCard title="Total Tasks" value={safeTasks.length} icon={<ListTodo size={18} className="text-primary" />} />
        <MetricCard title="Completed" value={completedCount} icon={<CheckCircle2 size={18} className="text-success" />} />
        <MetricCard title="In Progress" value={inProgressCount} icon={<CircleDashed size={18} className="text-info" />} />
        <MetricCard title="Overdue" value={overdueCount} icon={<CalendarClock size={18} className="text-danger" />} />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-6">
        <ChartCard title="Task Status Distribution" icon={<Target size={18} className="text-primary" />}>
          <ResponsiveContainer width="100%" height={320}>
            <PieChart>
              <Pie data={statusData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={110} innerRadius={60} paddingAngle={4}>
                {statusData.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Priority Breakdown" icon={<BarChart3 size={18} className="text-primary" />}>
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={priorityData}>
              <CartesianGrid strokeDasharray="3 3" stroke={COLORS.border} />
              <XAxis dataKey="name" stroke={COLORS.textSecondary} />
              <YAxis allowDecimals={false} stroke={COLORS.textSecondary} />
              <Tooltip />
              <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                {priorityData.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <ChartCard title="Upcoming 7 Days (Due Tasks)" icon={<CalendarClock size={18} className="text-primary" />}>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={upcoming7DaysData}>
              <defs>
                <linearGradient id="dueTasksGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={COLORS.primary} stopOpacity={0.35} />
                  <stop offset="95%" stopColor={COLORS.primary} stopOpacity={0.03} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={COLORS.border} />
              <XAxis dataKey="day" stroke={COLORS.textSecondary} />
              <YAxis allowDecimals={false} stroke={COLORS.textSecondary} />
              <Tooltip />
              <Area type="monotone" dataKey="tasks" stroke={COLORS.primary} fill="url(#dueTasksGradient)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Completion Trend (Last 7 Days)" icon={<CheckCircle2 size={18} className="text-success" />}>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={productivityData}>
              <defs>
                <linearGradient id="completedGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={COLORS.success} stopOpacity={0.35} />
                  <stop offset="95%" stopColor={COLORS.success} stopOpacity={0.03} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={COLORS.border} />
              <XAxis dataKey="day" stroke={COLORS.textSecondary} />
              <YAxis allowDecimals={false} stroke={COLORS.textSecondary} />
              <Tooltip />
              <Area type="monotone" dataKey="completed" stroke={COLORS.success} fill="url(#completedGradient)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </div>
  );
};

const MetricCard = ({
  title,
  value,
  icon,
}: {
  title: string;
  value: number;
  icon: ReactNode;
}) => (
  <div className="rounded-2xl border border-border bg-surface p-5 shadow-sm">
    <div className="flex items-center justify-between">
      <p className="text-sm text-text-secondary">{title}</p>
      {icon}
    </div>
    <p className="text-2xl font-bold text-text-primary mt-2">{value}</p>
  </div>
);

const ChartCard = ({
  title,
  icon,
  children,
}: {
  title: string;
  icon: ReactNode;
  children: ReactNode;
}) => (
  <section className="rounded-2xl border border-border bg-surface p-5 shadow-sm">
    <div className="flex items-center gap-2 mb-4">
      <div className="h-9 w-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
        {icon}
      </div>
      <h2 className="text-lg font-semibold text-text-primary">{title}</h2>
    </div>
    {children}
  </section>
);

export default AnalyticsPage;
