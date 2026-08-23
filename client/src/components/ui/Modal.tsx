"use client";

import { useEffect, useState } from "react";
import { Star, X } from "lucide-react";

type ProjectModalProps = {
  titleModal: string;
  showModal: boolean;
  closeModal: () => void;
  handleProject: (title: string, color: string) => void;
  error: string | null;
  loading: boolean;
  titleProject: string;
  colorProject: string;
};

export const ProjectModal = ({
  titleModal,
  showModal,
  closeModal,
  handleProject,
  error,
  loading,
  titleProject,
  colorProject,
}: ProjectModalProps) => {
  const [title, setTitle] = useState(titleProject);
  const [color, setColor] = useState(colorProject);

  const [validationError, setValidationError] = useState<string | null>(null);

  const handelSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setValidationError(null);

    if (!title.trim()) {
      setValidationError("Project name is required.");
      return;
    }

    if (!color.trim()) {
      setValidationError("Project color is required.");
      return;
    }

    if (!/^#[0-9A-Fa-f]{6}$/.test(color)) {
      setValidationError("Project color is invalid.");
      return;
    }

    await handleProject(title.trim(), color);
  };

  if (!showModal) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/30 backdrop-blur-sm"
      onClick={closeModal}
    >
      <div
        className="w-full max-w-[430px] rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* MODAL HEADER */}
        <div className="mb-5 flex items-start justify-between">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">
              {titleModal} project
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              {titleModal} a project to organize your tasks.
            </p>
          </div>

          <button
            type="button"
            onClick={closeModal}
            className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
          >
            <X size={19} />
          </button>
        </div>

        {/* FORM */}
        <form onSubmit={handelSubmit}>
          {/* PROJECT NAME */}
          <div>
            <label
              htmlFor="project-title"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Project name <span className="text-red-500">*</span>
            </label>

            <input
              id="project-title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Website Redesign"
              autoFocus
              className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
            />
          </div>

          {/* COLOR */}
          <div className="mt-5">
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Project color <span className="text-red-500">*</span>
            </label>

            <div className="flex items-center gap-3">
              <input
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="h-10 w-12 cursor-pointer rounded-lg border border-slate-200 bg-white p-1"
              />

              <div className="flex items-center gap-2">
                <div
                  className="h-5 w-5 rounded-full"
                  style={{
                    backgroundColor: color,
                  }}
                />

                <span className="text-sm text-slate-500">{color}</span>
              </div>
            </div>
          </div>

          {/* VALIDATION ERROR */}
          {validationError && (
            <p className="mt-4 text-sm text-red-500">{validationError}</p>
          )}

          {/* BACKEND ERROR */}
          {error && <p className="mt-4 text-sm text-red-500">{error}</p>}

          {/* ACTIONS */}
          <div className="mt-6 flex justify-end gap-3">
            <button
              type="button"
              onClick={closeModal}
              disabled={loading}
              className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50 disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="rounded-xl bg-sky-500 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-sky-600 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? `${titleModal}ing...` : `${titleModal} project`}
            </button>
          </div>
        </form>
      </div>
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

type createTaskType = {
  title?: string;
  project_id?: number | string;
  description?: string;
  status?: string;
  priority?: string;
  due_date?: string;
  tags?: string;
  starred?: boolean;
};

type TaskModalProps = {
  titleModal: string;
  showModal: boolean;
  closeModal: () => void;
  handleTask: (task: taskType) => void;
  error: string | null;
  loading: boolean;
  task: taskType | createTaskType;
};

export const TaskModal = ({
  titleModal,
  showModal,
  closeModal,
  handleTask,
  error,
  loading,
  task,
}: TaskModalProps) => {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [status, setStatus] = useState(task.status);
  const [priority, setPriority] = useState(task.priority);
  const [due_date, setDue_Date] = useState(task.due_date);
  const [tags, setTags] = useState(task.tags);
  const [starred, setStarred] = useState(task.starred);

  const [validationError, setValidationError] = useState<string | null>(null);

  // TANGGAL HARI INI (LOCAL TIME)
  const now = new Date();
  const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(
    2,
    "0",
  )}-${String(now.getDate()).padStart(2, "0")}`;

  useEffect(() => {
    setTitle(task.title);
    setDescription(task.description);
    setStatus(task.status);
    setPriority(task.priority);
    setDue_Date(task.due_date);
    setTags(task.tags);
    setStarred(task.starred);
  }, [task]);

  const handelSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setValidationError(null);

    if (!title?.trim()) {
      setValidationError("Task title is required.");
      return;
    }

    if (!due_date?.trim()) {
      setValidationError("Due date is required.");
      return;
    }

    const updatedTask: taskType = {
      ...task,
      title: title.trim(),
      description,
      status,
      priority,
      due_date,
      tags,
      starred,
    } as taskType;

    await handleTask(updatedTask);
  };

  if (!showModal) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/30 backdrop-blur-sm"
      onClick={closeModal}
    >
      <div
        className="w-full max-w-[500px] rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* HEADER */}
        <div className="mb-5 flex items-start justify-between">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">
              {titleModal} task
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              {titleModal} task information.
            </p>
          </div>

          <button
            type="button"
            onClick={closeModal}
            className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
          >
            <X size={19} />
          </button>
        </div>

        <form onSubmit={handelSubmit}>
          {/* TITLE */}
          <div>
            <label
              htmlFor="task-title"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Task title <span className="text-red-500">*</span>
            </label>

            <input
              id="task-title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Create landing page"
              autoFocus
              className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
            />
          </div>

          {/* DESCRIPTION */}
          <div className="mt-4">
            <label
              htmlFor="task-description"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Description
            </label>

            <textarea
              id="task-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Write task description..."
              rows={3}
              className="w-full resize-none rounded-xl border border-slate-200 px-3 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
            />
          </div>

          {/* STATUS & PRIORITY */}
          <div className="mt-4 grid grid-cols-2 gap-3">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Status
              </label>

              <div className="grid grid-cols-3 gap-2">
                {[
                  {
                    value: "pending",
                    label: "Pending",
                    active: "border-amber-200 bg-amber-50 text-amber-600",
                  },
                  {
                    value: "in_progress",
                    label: "Progress",
                    active: "border-sky-200 bg-sky-50 text-sky-600",
                  },
                  {
                    value: "completed",
                    label: "Done",
                    active: "border-emerald-200 bg-emerald-50 text-emerald-600",
                  },
                ].map((item) => (
                  <button
                    key={item.value}
                    type="button"
                    onClick={() => setStatus(item.value)}
                    className={`rounded-xl border px-3 py-2.5 text-xs font-medium transition ${
                      status === item.value
                        ? item.active
                        : "border-slate-200 bg-white text-slate-500 hover:bg-slate-50"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Priority
              </label>

              <div className="grid grid-cols-3 gap-2">
                {[
                  {
                    value: "low",
                    label: "Low",
                    active: "border-slate-300 bg-slate-100 text-slate-600",
                  },
                  {
                    value: "medium",
                    label: "Medium",
                    active: "border-amber-200 bg-amber-50 text-amber-600",
                  },
                  {
                    value: "high",
                    label: "High",
                    active: "border-red-200 bg-red-50 text-red-600",
                  },
                ].map((item) => (
                  <button
                    key={item.value}
                    type="button"
                    onClick={() => setPriority(item.value)}
                    className={`rounded-xl border px-3 py-2.5 text-xs font-medium transition ${
                      priority === item.value
                        ? item.active
                        : "border-slate-200 bg-white text-slate-500 hover:bg-slate-50"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* DUE DATE */}
          <div className="mt-4">
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Due date <span className="text-red-500">*</span>
            </label>

            <input
              type="date"
              value={due_date}
              min={today}
              onChange={(e) => setDue_Date(e.target.value)}
              className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
            />
          </div>

          {/* TAGS */}
          <div className="mt-4">
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Tags
            </label>

            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="e.g. frontend, design"
              className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
            />
          </div>

          {/* STARRED */}
          <button
            type="button"
            onClick={() => setStarred((prev) => !prev)}
            className={`mt-4 flex w-full items-center gap-3 rounded-xl border px-3 py-2.5 text-sm font-medium transition ${
              starred
                ? "border-amber-200 bg-amber-50 text-amber-600"
                : "border-slate-200 text-slate-500 hover:bg-slate-50"
            }`}
          >
            <Star size={17} fill={starred ? "currentColor" : "none"} />

            {starred ? "Starred task" : "Mark as starred"}
          </button>

          {/* VALIDATION ERROR */}
          {validationError && (
            <p className="mt-4 text-sm text-red-500">{validationError}</p>
          )}

          {/* BACKEND ERROR */}
          {error && <p className="mt-4 text-sm text-red-500">{error}</p>}

          {/* ACTIONS */}
          <div className="mt-6 flex justify-end gap-3">
            <button
              type="button"
              onClick={closeModal}
              disabled={loading}
              className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50 disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="rounded-xl bg-sky-500 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-sky-600 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? `${titleModal}ing...` : `${titleModal} task`}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
