import { Calendar, CheckCircle, Circle } from "lucide-react";
import { useUpdateTask } from "../../hooks/Tasks/useUpdateTask";
import { MoreMenuTask } from "./Menu";

type taskType = {
  id: number;
  title: string;
  project_id: number | string;
  description: string;
  status: string;
  priority: string;
  due_date: string;
  tags: string;
  starred: boolean;
};

type TaskUpdateProps = {
  task: taskType;
};

export const TaskRowButton = ({ task }: TaskUpdateProps) => {
  const { updateTask } = useUpdateTask();

  const isDone = task?.status === "completed";

  const handleUpdate = () => {
    const newStatus = task.status === "completed" ? "in_progress" : "completed";

    const taskUpdate = {
      id: task.id,
      title: task.title,
      project_id: task.project_id,
      description: task.description,
      status: newStatus,
      priority: task.priority,
      due_date: task.due_date,
      tags: task.tags,
      starred: task.starred,
    };

    updateTask(taskUpdate);
  };

  return (
    <div className="group flex items-center justify-between p-4 bg-white border-b border-border last:border-b-0 hover:bg-gray-50 transition-colors">
      {/* Left: Check & Text Area */}
      <div className="flex items-center gap-4 overflow-hidden">
        {/* Check Button */}
        <button
          className="flex-shrink-0 focus:outline-none hover:scale-110 transition-transform cursor-pointer"
          onClick={handleUpdate}
        >
          {isDone ? (
            <CheckCircle size={20} className="text-primary fill-accent-soft" />
          ) : (
            <Circle size={20} className="text-muted" />
          )}
        </button>
        {/* Text Wrapper */}
        <div className="flex flex-col min-w-0">
          <p
            className={`text-sm font-medium truncate ${
              isDone ? "text-muted line-through" : "text-text-primary"
            }`}
          >
            {task?.title}
          </p>
          {task?.description && (
            <p className="text-xs text-text-secondary truncate mt-0.5">
              {task?.description}
            </p>
          )}
        </div>
      </div>

      {/* Right: Meta Info */}
      <div className="flex items-center gap-4 sm:gap-6 flex-shrink-0 ml-4">
        {/* Date */}
        <div className="hidden sm:flex items-center text-xs text-text-secondary w-25">
          <Calendar size={14} className="mr-1.5 text-muted" />
          {task?.due_date}
        </div>
        {/* Priority Badge */}
        <span
          className={`hidden sm:inline-block text-xs px-2.5 py-1 rounded-full font-medium border w-20 text-center uppercase ${
            task?.priority === "high"
              ? "bg-red-50 text-danger border-red-100"
              : task?.priority === "medium"
                ? "bg-orange-50 text-warning border-orange-100"
                : "bg-green-50 text-success border-green-100"
          }`}
        >
          {task?.priority}
        </span>
        {/* Status Text */}
        <span
          className={`w-15 text-left text-xs font-medium capitalize ${
            task?.status === "completed"
              ? "text-emerald-500"
              : task?.status === "in_progress"
                ? "text-secondary"
                : "text-text-secondary"
          }`}
        >
          {task?.status === "completed"
            ? "Done"
            : task?.status === "in_progress"
              ? "Progress"
              : "Pending"}
        </span>
        {/* MoreMenuTask  */}
        <MoreMenuTask task={task} />
      </div>
    </div>
  );
};
