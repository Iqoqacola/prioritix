"use client";

import { useParams } from "next/navigation";
import { useProjectsContext } from "../../../../hooks/Projects/useProjectsContext";
import { useTasksContext } from "../../../../hooks/Tasks/useTasksContext";
import { MoreMenuProject } from "../../../../components/ui/Menu";
import { TaskRowButton } from "../../../../components/ui/Button";
import { useState } from "react";
import { TaskModal } from "../../../../components/ui/Modal";
import { useCreateTask } from "../../../../hooks/Tasks/useCreateTask";

type TaskCreate = {
  title?: string;
  project_id?: number | string;
  description?: string;
  status?: string;
  priority?: string;
  due_date?: string;
  tags?: string;
  starred?: boolean;
};

export default function ProjectPage() {
  const params = useParams<{ id: string }>();

  const [showModal, setShowModal] = useState(false);
  const titleModal: string = "Create";

  const { projects } = useProjectsContext();
  const { tasks } = useTasksContext();
  const { createTask, isLoading, error } = useCreateTask();

  const projectId = Number(params.id);

  const project = projects.find((project) => project.id === projectId);

  const projectTasks = tasks.filter((task) => task.project_id === projectId);
  const tasksCompleted = projectTasks.filter(
    (task) => task.status === "completed",
  );
  const progressTask =
    projectTasks.length === 0
      ? 0
      : Math.round((tasksCompleted.length / projectTasks.length) * 100);

  const taskCreate: TaskCreate = {
    title: "",
    project_id: projectId,
    description: "",
    status: "pending",
    priority: "medium",
    due_date: "",
    tags: "",
    starred: false,
  };

  const handleCreateTask = async (taskCreate: TaskCreate) => {
    createTask(taskCreate);
    setShowModal(false);
  };

  const handleModal = () => {
    setShowModal((prev) => !prev);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  if (projects.length === 0) {
    return (
      <div className="p-6">
        <p className="text-sm text-slate-500">Loading project...</p>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="p-6">
        <p className="text-sm text-slate-500">Project not found.</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* PROJECT HEADER */}
      <div className="flex justify-between items-center gap-3">
        <div className="flex items-center gap-3">
          <div
            className="h-4 w-4 rounded-full"
            style={{
              backgroundColor: project.color || "#94a3b8",
            }}
          />

          <h1 className="text-2xl font-semibold text-slate-900">
            {project.title}
          </h1>
        </div>
        <div>
          <MoreMenuProject project={project} />
        </div>
      </div>

      {/* Progress Section */}
      <div className="mt-4 flex items-center justify-between gap-3">
        <div className="flex-1">
          <div className="mb-1 flex items-center justify-end">
            <span className="text-sm text-slate-500">{progressTask}%</span>
          </div>

          <div className="h-3 w-full rounded-full bg-slate-200">
            <div
              className="h-3 rounded-full bg-sky-500"
              style={{ width: `${progressTask}%` }}
            />
          </div>
        </div>

        <div className="min-w-20 text-right">
          <p className="text-sm font-medium text-slate-700">
            {tasksCompleted.length} / {projectTasks.length}
          </p>
          <p className="text-xs text-slate-400">Tasks</p>
        </div>
      </div>

      {/* TASK SECTION */}
      <div className="mt-8">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-400">
            Tasks
          </h2>

          <span className="text-sm text-slate-400">
            {projectTasks.length} tasks
          </span>
        </div>

        {projectTasks.length === 0 ? (
          <button
            type="button"
            onClick={handleModal}
            className="mt-3 flex w-full items-center justify-center rounded-xl border border-dashed border-slate-200 px-4 py-3 text-sm font-medium cursor-pointer text-slate-500 transition hover:border-slate-300 hover:bg-slate-50 hover:text-slate-700"
          >
            + Add Task
          </button>
        ) : (
          <div className="space-y-2 ">
            {projectTasks.map((task) => (
              <TaskRowButton task={task} key={task.id} />
            ))}
            {/* ADD TASK BUTTON */}
            <button
              type="button"
              onClick={handleModal}
              className="mt-3 flex w-full items-center justify-center rounded-xl border border-dashed border-slate-200 px-4 py-3 text-sm font-medium cursor-pointer text-slate-500 transition hover:border-slate-300 hover:bg-slate-50 hover:text-slate-700"
            >
              + Add Task
            </button>
          </div>
        )}
      </div>
      {showModal && (
        <TaskModal
          showModal={showModal}
          closeModal={closeModal}
          titleModal={titleModal}
          handleTask={handleCreateTask}
          error={error}
          loading={isLoading}
          task={taskCreate}
        />
      )}
    </div>
  );
}
