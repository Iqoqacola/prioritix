"use client";

import { useState } from "react";
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { useRemoveProject } from "../../hooks/Projects/useRemoveProject";
import { useUpdateProject } from "../../hooks/Projects/useUpdateProject";
import { ProjectModal, TaskModal } from "./Modal";
import { useRemoveTask } from "../../hooks/Tasks/useRemoveTask";
import { useUpdateTask } from "../../hooks/Tasks/useUpdateTask";

type projectType = {
  id: number;
  title: string;
  color?: string;
};

type projectTypeProps = {
  project: projectType;
};

export const MoreMenuProject = ({ project }: projectTypeProps) => {
  const [open, setOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const { removeProject } = useRemoveProject();
  const { updateProject, isLoading, error } = useUpdateProject();

  const titleModal: string = "Edit";

  const closeModal = () => {
    setShowModal(false);
  };

  const handleEdit = () => {
    setShowModal(true);
    setOpen(false);
  };

  const handleDelete = () => {
    removeProject(project.id);
    setOpen(false);
  };

  const handleEditProject = async (title: string, color: string) => {
    updateProject(project.id, title, color);
    setShowModal(false);
  };

  return (
    <div className="relative">
      <button
        className="pointer rounded-md p-1.5 hover:bg-slate-100"
        onClick={() => setOpen((prev) => !prev)}
      >
        <MoreHorizontal size={18} />
      </button>

      {open && (
        <div className="absolute right-0 top-full z-50 mt-1 w-32 rounded-lg border bg-white p-1 shadow-lg">
          <button
            onClick={handleEdit}
            className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-slate-100"
          >
            <Pencil size={14} />
            Edit
          </button>

          <button
            onClick={handleDelete}
            className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-red-600 hover:bg-red-50"
          >
            <Trash2 size={14} />
            Delete
          </button>
        </div>
      )}

      {showModal && (
        <ProjectModal
          showModal={showModal}
          closeModal={closeModal}
          titleModal={titleModal}
          handleProject={handleEditProject}
          error={error}
          loading={isLoading}
          titleProject={project.title}
          colorProject={project.color}
        />
      )}
    </div>
  );
};

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

type taskTypeProps = {
  task: taskType;
};

export const MoreMenuTask = ({ task }: taskTypeProps) => {
  const [open, setOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const { removeTask } = useRemoveTask();
  const { updateTask, isLoading, error } = useUpdateTask();

  const titleModal: string = "Edit";

  const closeModal = () => {
    setShowModal(false);
  };

  const handleEdit = () => {
    setShowModal(true);
    setOpen(false);
  };

  const handleDelete = () => {
    removeTask(task.id);
    setOpen(false);
  };

  const handleEditTask = async (task: taskType) => {
    updateTask(task);
    setShowModal(false);
  };

  return (
    <div className="relative">
      <button
        className="pointer rounded-md p-1.5 hover:bg-slate-100"
        onClick={() => setOpen((prev) => !prev)}
      >
        <MoreHorizontal size={18} />
      </button>

      {open && (
        <div className="absolute right-0 top-full z-50 mt-1 w-32 rounded-lg border bg-white p-1 shadow-lg">
          <button
            onClick={handleEdit}
            className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-slate-100"
          >
            <Pencil size={14} />
            Edit
          </button>

          <button
            onClick={handleDelete}
            className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-red-600 hover:bg-red-50"
          >
            <Trash2 size={14} />
            Delete
          </button>
        </div>
      )}

      {showModal && (
        <TaskModal
          showModal={showModal}
          closeModal={closeModal}
          titleModal={titleModal}
          handleTask={handleEditTask}
          error={error}
          loading={isLoading}
          task={task}
        />
      )}
    </div>
  );
};
