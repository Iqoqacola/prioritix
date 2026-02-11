import {
  Circle,
  Calendar,
  Plus,
  Filter,
  MoreHorizontal,
  CheckCircle,
  ListTodo,
  Star,
  Pencil,
  Trash2,
} from "lucide-react";
import { useUpdateTask } from "../../hooks/Tasks/useUpdateTask";
import { useRemoveTask } from "../../hooks/Tasks/useRemoveTask";
import { EditMenuActions } from "./Menu";
import { useState } from "react";

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

export const NewTaskButton = ({ handleCreateMenu }) => {
  return (
    <button
      onClick={handleCreateMenu}
      className="flex items-center gap-2 px-5 py-2 bg-primary text-white rounded-xl text-sm font-bold hover:bg-secondary shadow-lg shadow-blue-500/20 transition-all transform hover:-translate-y-0.5"
    >
      <Plus size={18} strokeWidth={2.5} />
      New Task
    </button>
  );
};

export const FilterButton = ({ handleFilter }) => {
  return (
    <button
      className="flex items-center gap-2 px-4 py-2 bg-surface border border-border text-text-secondary rounded-xl text-sm font-medium hover:bg-gray-50 hover:text-text-primary transition-all shadow-sm"
      onClick={handleFilter}
    >
      <Filter size={16} />
      <span>Filter</span>
    </button>
  );
};

export const TaskListButton = ({
  projectTasks,
  activeMenuId,
  handleCreateMenu,
  toggleMenu,
  setActiveMenuId,
  handleEditTaskMenu,
  taskActive,
}) => {
  const { updateTask } = useUpdateTask();
  const { removeTask } = useRemoveTask();

  const handleCompleted = (task) => {
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

  const handleRemoveTask = (taskId) => {
    removeTask(taskId);
    setActiveMenuId(null);
  };

  return (
    <>
      {/* === TASK LIST SECTION === */}
      <div className="space-y-4">
        {projectTasks?.length > 0 ? (
          <div className="grid grid-cols-1 gap-3">
            {projectTasks.map((task) => (
              <div
                key={task.id}
                className={`group flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-surface border rounded-xl hover:shadow-md transition-all duration-200 
                    ${task.status === "completed" ? "border-border opacity-75" : "border-border hover:border-primary/50"}`}
              >
                <div className="flex items-center gap-4 flex-1">
                  <button
                    className="flex-shrink-0 focus:outline-none hover:scale-110 transition-transform cursor-pointer"
                    onClick={() => handleCompleted(task)}
                  >
                    {task.status === "completed" ? (
                      <CheckCircle
                        size={20}
                        className="text-primary fill-accent-soft"
                      />
                    ) : (
                      <Circle size={20} className="text-muted" />
                    )}
                  </button>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3
                        className={`font-semibold text-text-primary truncate ${task.status === "completed" ? "line-through text-muted" : ""}`}
                      >
                        {task.title}
                      </h3>
                      {task.starred && (
                        <Star
                          size={16}
                          className="fill-yellow-400 text-yellow-400 flex-shrink-0"
                        />
                      )}
                    </div>

                    {task.description && (
                      <p className="text-sm text-text-secondary mb-2 line-clamp-1 leading-relaxed">
                        {task.description}
                      </p>
                    )}

                    <div className="flex flex-wrap items-center gap-3 text-xs text-text-secondary">
                      <span
                        className={`px-2.5 py-0.5 rounded-md font-medium capitalize border 
                          ${
                            task.priority === "high"
                              ? "bg-red-50 text-danger border-red-100"
                              : task.priority === "medium"
                                ? "bg-orange-50 text-warning border-orange-100"
                                : "bg-green-50 text-success border-green-100"
                          }`}
                      >
                        {task.priority}
                      </span>

                      {task.due_date && (
                        <div className="flex items-center gap-1.5 text-muted group-hover:text-text-secondary transition-colors">
                          <Calendar size={14} />
                          <span>
                            {new Date(task.due_date).toLocaleDateString()}
                          </span>
                        </div>
                      )}

                      {task.tags && (
                        <div className="flex flex-wrap gap-1.5">
                          {task.tags.split(",").map((tag, index) => (
                            <span
                              key={index}
                              className="px-2 py-0.5 bg-gray-100 text-text-secondary rounded text-[10px] font-medium border border-gray-200"
                            >
                              #{tag.trim()}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Kanan: Actions & Menu Dropdown */}
                <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-4 mt-3 sm:mt-0 pl-10 sm:pl-0 relative flex-shrink-0">
                  <span
                    className={`text-xs font-medium px-2 py-1 rounded capitalize 
                      ${
                        task.status === "in_progress"
                          ? "bg-blue-50 text-info"
                          : task.status === "completed"
                            ? "bg-green-50 text-success"
                            : "bg-gray-100 text-muted"
                      }`}
                  >
                    {task.status?.replace("_", " ")}
                  </span>

                  <div className="relative">
                    <button
                      onClick={(e) => toggleMenu(e, task.id)}
                      className={`p-2 rounded-lg transition-colors ${activeMenuId === task.id ? "bg-gray-100 text-text-primary" : "text-muted hover:text-text-primary hover:bg-gray-100"}`}
                    >
                      <MoreHorizontal size={18} />
                    </button>

                    {activeMenuId === task.id && (
                      <div className="absolute right-0 mt-2 w-36 bg-white border border-border rounded-xl shadow-lg z-10 animate-in fade-in zoom-in-95 duration-200 overflow-hidden">
                        <button
                          onClick={() => {
                            handleEditTaskMenu();
                            taskActive(task);
                          }}
                          className="w-full px-4 py-2.5 text-left text-sm text-text-secondary hover:bg-gray-50 hover:text-primary flex items-center gap-2 transition-colors"
                        >
                          <Pencil size={14} /> Edit
                        </button>
                        <div className="h-px bg-border/50 mx-2"></div>
                        <button
                          onClick={() => handleRemoveTask(task.id)}
                          className="w-full px-4 py-2.5 text-left text-sm text-danger hover:bg-red-50 flex items-center gap-2 transition-colors"
                        >
                          <Trash2 size={14} /> Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-center border-2 border-dashed border-border/60 rounded-2xl bg-surface/30">
            <div className="w-16 h-16 bg-blue-50/50 rounded-full flex items-center justify-center mb-4">
              <ListTodo size={32} className="text-primary/60" />
            </div>
            <h3 className="text-lg font-bold text-text-primary mb-2">
              No tasks found
            </h3>
            <p className="text-text-secondary max-w-xs mx-auto mb-6">
              You haven't created any tasks for this project yet.
            </p>
            <button
              onClick={handleCreateMenu}
              className="px-6 py-2.5 bg-white border border-border text-text-primary rounded-xl font-medium hover:bg-gray-50 transition-colors shadow-sm"
            >
              Create First Task
            </button>
          </div>
        )}
      </div>
    </>
  );
};
