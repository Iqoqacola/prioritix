import { MoreHorizontal } from "lucide-react";
import { TaskRowButton } from "./Button";

export const CreateCard = ({ create, handleCreate }) => {
  return (
    <div className="w-full rounded-xl bg-surface shadow-xl ring-1 ring-border p-2 animate-in fade-in zoom-in-95 duration-200">
      <div className="flex flex-col gap-1">
        <button
          className="group flex w-full items-center gap-3 rounded-lg p-4 text-left transition-colors hover:bg-background"
          onClick={handleCreate}
        >
          <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
            <create.icon size={16} />
          </div>
          <div>
            <span className="block text-sm font-semibold text-text-primary">
              {create.title}{" "}
            </span>
            <span className="block text-xs text-text-secondary">
              {create.desc}
            </span>
          </div>
        </button>
      </div>
    </div>
  );
};

export const ProjectSectionCard = ({ project, tasks }) => {
  const taskByProject =
    tasks?.filter((t) => t.project_id === project?.id) ?? [];

  const completed = taskByProject.filter(
    (t) => t.status === "completed",
  ).length;

  const total = taskByProject.length;
  const progress = total > 0 ? (completed / total) * 100 : 0;

  return (
    <div className="flex flex-col bg-surface border border-border rounded-xl shadow-sm overflow-hidden w-full">
      {/* Project Header */}
      <div className="p-5 border-b border-border bg-white">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-lg font-bold text-text-primary">
              {project?.title}
            </h2>
          </div>
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <MoreHorizontal size={16} className="text-text-secondary" />
          </button>
        </div>

        {/* Progress Bar Line */}
        <div className="flex items-center gap-3 mt-4">
          <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="text-xs font-medium text-text-secondary whitespace-nowrap">
            {completed} / {total} Tasks
          </span>
        </div>
      </div>

      {/* Task List */}
      <div className="flex flex-col">
        {taskByProject?.map((task) => (
          <TaskRowButton key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
};
