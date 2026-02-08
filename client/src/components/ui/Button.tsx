import { CheckCircle, Circle, Calendar, Plus } from "lucide-react";
import { useState } from "react";
import { useUpdateTask } from "../../hooks/Tasks/useUpdateTask";

export const CreateButton = ({ handleCreateButtonClick }) => {
  return (
    <div className="fixed bottom-6 right-6 md:bottom-12 md:right-12 ">
      <button
        className="cursor-pointer group flex w-full items-center justify-center gap-2 rounded-full bg-primary py-2.5 px-4 text-sm font-semibold text-white shadow-md hover:bg-secondary hover:shadow-lg transition-all active:scale-95"
        onClick={handleCreateButtonClick}
      >
        <Plus size={50} strokeWidth={3} />
      </button>
    </div>
  );
};

export const TaskRowButton = ({ task }) => {
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
          className={`text-xs font-medium w-15 text-left capitalize ${
            task?.status === "in_progress"
              ? "text-secondary"
              : "text-text-secondary"
          }`}
        >
          {/* Perbaikan Logic */}
          {task?.status === "completed"
            ? "Done"
            : task?.status === "in_progress"
              ? "Progress"
              : "Pending"}
        </span>
      </div>
    </div>
  );
};
