import { useState, useMemo, type MouseEvent } from "react";
import { useUpdateTask } from "../../../hooks/Tasks/useUpdateTask";
import {
  ChevronLeft,
  ChevronRight,
  CheckSquare,
  Clock,
  Plus,
  Circle,
  CheckCircle2,
} from "lucide-react";

type TaskStatus = "pending" | "in_progress" | "completed";
type TaskPriority = "low" | "medium" | "high";

type Task = {
  id: number;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  due_date?: string;
};

type TaskCalendarProps = {
  tasks: Task[];
  onEdit: (task: Task) => void;
  onCreateTask?: () => void;
  onToggleTaskStatus?: (task: Task) => void;
};

export const TaskCalendar = ({
  tasks,
  onEdit,
  onCreateTask,
  onToggleTaskStatus,
}: TaskCalendarProps) => {
  const { updateTask } = useUpdateTask();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const now = new Date();

  const isCurrentRealMonth =
    now.getMonth() === month && now.getFullYear() === year;

  const getCalendarData = () => {
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrevMonth = new Date(year, month, 0).getDate();

    const calendarDays = [];

    for (let i = firstDayOfMonth - 1; i >= 0; i--) {
      calendarDays.push({
        day: daysInPrevMonth - i,
        date: new Date(year, month - 1, daysInPrevMonth - i),
        type: "prev",
      });
    }

    for (let i = 1; i <= daysInMonth; i++) {
      calendarDays.push({
        day: i,
        date: new Date(year, month, i),
        type: "current",
      });
    }

    const remainingDays = 42 - calendarDays.length;
    for (let i = 1; i <= remainingDays; i++) {
      calendarDays.push({
        day: i,
        date: new Date(year, month + 1, i),
        type: "next",
      });
    }

    return calendarDays;
  };

  const calendarDays = getCalendarData();

  const monthName = currentDate.toLocaleString("en-US", {
    month: "long",
    year: "numeric",
  });
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const prevMonth = () => {
    if (isCurrentRealMonth) return;
    setCurrentDate(new Date(year, month - 1, 1));
  };
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  const formatDateKey = (date: Date) => {
    const offset = date.getTimezoneOffset();
    const d = new Date(date.getTime() - offset * 60 * 1000);
    return d.toISOString().split("T")[0];
  };

  const selectedDateKey = formatDateKey(selectedDate);

  const selectedDateTasks = useMemo(() => {
    return tasks.filter((t: Task) => t.due_date === selectedDateKey);
  }, [tasks, selectedDateKey]);

  const handleDayClick = (dayInfo: {
    day: number;
    date: Date;
    type: "prev" | "current" | "next";
  }) => {
    setSelectedDate(dayInfo.date);

    if (dayInfo.type === "prev") {
      prevMonth();
    } else if (dayInfo.type === "next") {
      nextMonth();
    }
  };

  const handleToggleTaskStatus = (e: MouseEvent, task: Task) => {
    e.stopPropagation();

    if (onToggleTaskStatus) {
      onToggleTaskStatus(task);
      return;
    }

    const nextStatus: TaskStatus =
      task.status === "completed" ? "in_progress" : "completed";

    updateTask({
      ...task,
      status: nextStatus,
    });
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 h-full min-h-[600px]">
      {/* GRID KALENDER */}
      <div className="flex-1 bg-white border border-border rounded-2xl shadow-sm overflow-hidden flex flex-col h-fit">
        <div className="p-6 border-b border-border flex justify-between items-center bg-surface">
          <h3 className="text-xl font-bold text-text-primary">{monthName}</h3>
          <div className="flex items-center gap-2">
            <button
              onClick={prevMonth}
              disabled={isCurrentRealMonth}
              className={`p-2 rounded-xl transition-all ${isCurrentRealMonth ? "text-gray-300 cursor-not-allowed" : "hover:bg-gray-100 text-text-secondary hover:text-primary border border-transparent hover:border-gray-200"}`}
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={nextMonth}
              className="p-2 hover:bg-gray-100 rounded-xl transition-all text-text-secondary hover:text-primary border border-transparent hover:border-gray-200"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-7 border-b border-border bg-gray-50/50">
          {weekdays.map((day) => (
            <div
              key={day}
              className="py-3 text-center text-xs font-bold text-text-secondary uppercase tracking-widest"
            >
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 auto-rows-[1fr] gap-px bg-border flex-1">
          {calendarDays.map((dayInfo, index) => {
            const dateStr = formatDateKey(dayInfo.date);
            const isToday = dateStr === formatDateKey(now);
            const isSelected = dateStr === selectedDateKey;
            const isCurrentMonth = dayInfo.type === "current";

            const dayTasks = tasks.filter((t: Task) => t.due_date === dateStr);
            const highPriorityCount = dayTasks.filter(
              (t: Task) => t.priority === "high",
            ).length;

            return (
              <div
                key={`${dateStr}-${index}`}
                onClick={() => handleDayClick(dayInfo)}
                className={`bg-white min-h-[100px] p-3 flex flex-col relative transition-all cursor-pointer hover:bg-blue-50/30
                    ${isSelected ? "ring-2 ring-primary ring-inset z-10 bg-blue-50/20" : ""}
                    ${!isCurrentMonth ? "bg-gray-50/60 opacity-60 hover:opacity-100" : ""} 
                `}
              >
                <span
                  className={`text-sm font-semibold w-8 h-8 flex items-center justify-center rounded-full mb-2
                    ${isToday ? "bg-primary text-white shadow-md" : !isCurrentMonth ? "text-gray-400" : "text-text-primary"}
                    ${isSelected && !isToday ? "bg-blue-100 text-primary" : ""}
                `}
                >
                  {dayInfo.day}
                </span>

                <div className="flex flex-wrap content-start gap-1.5 mt-auto">
                  {dayTasks.length > 0 && (
                    <>
                      {highPriorityCount > 0 && (
                        <div
                          className={`h-2 w-2 rounded-full bg-red-400 ring-2 ring-red-100 ${!isCurrentMonth ? "opacity-50" : ""}`}
                          title={`${highPriorityCount} High Priority`}
                        />
                      )}
                      {dayTasks.length - highPriorityCount > 0 && (
                        <div
                          className={`h-2 w-2 rounded-full bg-blue-400 ring-2 ring-blue-100 ${!isCurrentMonth ? "opacity-50" : ""}`}
                        />
                      )}
                      <span
                        className={`text-[10px] font-medium ml-1 ${!isCurrentMonth ? "text-gray-300" : "text-text-secondary"}`}
                      >
                        {dayTasks.length} Task{dayTasks.length > 1 ? "s" : ""}
                      </span>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* AGENDA (Tidak Ada Perubahan) */}
      <div className="w-full lg:w-96 flex flex-col gap-4 animate-in slide-in-from-right-4 duration-500">
        <div className="bg-surface border border-border rounded-2xl p-6 shadow-sm h-full flex flex-col">
          <div className="mb-6 pb-4 border-b border-border">
            <p className="text-sm text-text-secondary font-medium uppercase tracking-wider mb-1">
              Schedule For
            </p>
            <h2 className="text-2xl font-bold text-text-primary flex items-center gap-2">
              {selectedDate.toLocaleDateString("en-US", {
                weekday: "long",
                day: "numeric",
                month: "long",
              })}
            </h2>
          </div>

          <div className="flex-1 overflow-y-auto pr-2 space-y-3 custom-scrollbar">
            {selectedDateTasks.length > 0 ? (
              selectedDateTasks.map((task) => (
                <div
                  key={task.id}
                  onClick={() => onEdit(task)}
                  className="group p-4 bg-white border border-border rounded-xl hover:shadow-md hover:border-primary/50 transition-all cursor-pointer relative overflow-hidden"
                >
                  <div
                    className={`absolute left-0 top-0 bottom-0 w-1 
                                ${task.priority === "high" ? "bg-danger" : task.priority === "medium" ? "bg-warning" : "bg-success"}
                            `}
                  />

                  <div className="flex justify-between items-start mb-1 pl-2 gap-2">
                    <div className="flex items-start gap-2 min-w-0">
                      <button
                        onClick={(e) => handleToggleTaskStatus(e, task)}
                        className="mt-0.5 text-muted hover:text-primary transition-colors"
                        aria-label={
                          task.status === "completed"
                            ? "Mark as in progress"
                            : "Mark as completed"
                        }
                      >
                        {task.status === "completed" ? (
                          <CheckCircle2 size={16} className="text-success" />
                        ) : (
                          <Circle size={16} />
                        )}
                      </button>
                      <h4
                        className={`font-bold text-sm text-text-primary truncate ${task.status === "completed" ? "line-through text-muted" : ""}`}
                      >
                        {task.title}
                      </h4>
                    </div>
                    {task.status === "completed" && (
                      <CheckSquare size={14} className="text-success flex-shrink-0" />
                    )}
                  </div>

                  <p className="text-xs text-text-secondary line-clamp-2 pl-2 mb-2">
                    {task.description || "No description"}
                  </p>

                  <div className="flex items-center gap-2 pl-2 mt-2">
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase ${
                        task.status === "in_progress"
                          ? "bg-blue-50 text-blue-600"
                          : task.status === "completed"
                            ? "bg-green-50 text-green-600"
                            : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {task.status?.replace("_", " ")}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center h-48 text-center text-text-secondary border-2 border-dashed border-border/50 rounded-xl bg-gray-50/50">
                <Clock size={32} className="mb-2 opacity-20" />
                <p className="text-sm">No tasks for this day</p>
                <p className="text-xs opacity-60">Enjoy your free time!</p>
              </div>
            )}
          </div>

          <div className="mt-4 pt-4 border-t border-border">
            <button
              onClick={onCreateTask}
              className="w-full py-2.5 flex items-center justify-center gap-2 text-sm font-bold text-primary bg-primary/10 hover:bg-primary/15 rounded-xl transition-colors"
            >
              <Plus size={16} /> Add Task to {selectedDate.getDate()} {monthName.split(" ")[0]}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
