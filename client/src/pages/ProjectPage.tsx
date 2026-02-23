import { useNavigate, useParams } from "react-router";
import { useTasksContext } from "../hooks/Tasks/useTasksContext";
import { useProjectsContext } from "../hooks/Projects/useProjectsContext";
import { useMemo, useState, useEffect, type MouseEvent } from "react";
import {
  MoreHorizontal,
  CheckSquare,
  PieChart,
  Pencil,
  Trash2,
  LayoutTemplate,
  CalendarDays,
  List as ListIcon,
} from "lucide-react";
import { CreateMenuActions, EditMenuActions } from "../components/ui/Menu";
import { FilterButton, NewTaskButton } from "../components/ui/Button";
import { useRemoveProject } from "../hooks/Projects/useRemoveProject";
import { useGetTasks } from "../hooks/Tasks/useGetTasks";

import { TaskKanban } from "../components/layout/View/TaskKanban";
import { TaskCalender } from "../components/layout/View/TaskCalender";
import { TaskList } from "../components/layout/View/TaskList";

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

type Project = {
  id: number;
  title: string;
  color?: string;
};

const ProjectPage = () => {
  const { slug } = useParams();
  const { tasks } = useTasksContext() as { tasks: Task[] | null };
  const { projects } = useProjectsContext() as { projects: Project[] | null };
  const { removeProject } = useRemoveProject();
  const { getTasks } = useGetTasks();

  const navigate = useNavigate();

  const [viewMode, setViewMode] = useState<"list" | "kanban" | "calendar">(
    "list",
  );

  const [isCreateMenuOpen, setIsCreateMenuOpen] = useState(false);
  const [isProjectMenuOpen, setIsProjectMenuOpen] = useState(false);
  const [taskActive, setTaskActive] = useState<Task | null>(null);
  const [editMenuOpen, setEditMenuOpen] = useState(false);
  const [typeMenu, setTypeMenu] = useState<"task" | "project" | null>(null);

  const slugParts = slug ? slug.split("-") : [];
  const projectId = slugParts.at(-1);
  const projectIdInt = Number(projectId);

  const activeProject = projects?.find(
    (p: Project) => p.id.toString() === projectId,
  );

  const fallbackTitle = slugParts
    .slice(0, -1)
    .join(" ")
    .replace(/\b\w/g, (l) => l.toUpperCase());

  const projectTasks = useMemo(() => {
    if (!tasks || !projectId) return [];
    return tasks
      .filter((t: Task) => t.project_id.toString() === projectId)
      .sort((a: Task, b: Task) => {
        if (a.starred === b.starred) return 0;
        return a.starred ? -1 : 1;
      });
  }, [tasks, projectId]);

  const stats = useMemo(() => {
    const total = projectTasks.length;
    const completed = projectTasks.filter(
      (t: Task) => t.status === "completed",
    ).length;
    const pending = total - completed;
    const progress = total === 0 ? 0 : Math.round((completed / total) * 100);
    return { total, completed, pending, progress };
  }, [projectTasks]);

  const toggleProjectMenu = (e: MouseEvent) => {
    e.stopPropagation();
    setIsProjectMenuOpen(!isProjectMenuOpen);
  };

  useEffect(() => {
    const handleClickOutside = () => {
      setIsProjectMenuOpen(false);
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const handleCreateMenu = () => setIsCreateMenuOpen((prev) => !prev);

  const handleRemoveProject = (id: number) => {
    removeProject(id);
    navigate("/all-tasks");
  };

  const handleEditMenu = (type?: "task" | "project") => {
    setEditMenuOpen((prev) => !prev);
    if (type) setTypeMenu(type);
  };

  const handleEditTaskDirect = (task: Task) => {
    setTaskActive(task);
    setTypeMenu("task");
    setEditMenuOpen(true);
  };

  useEffect(() => {
    getTasks();
  }, [getTasks]);

  if (projects === null) {
    return (
      <div className="w-full min-h-screen flex flex-col items-center justify-center bg-background p-6">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
          <h3 className="text-lg font-semibold text-text-primary">
            Loading your project...
          </h3>
        </div>
      </div>
    );
  }

  if (!activeProject && (projects?.length ?? 0) > 0) {
    return (
      <div className="w-full min-h-screen flex flex-col items-center justify-center bg-background p-6">
        <div className="max-w-md w-full bg-surface border border-border rounded-2xl p-8 shadow-sm text-center">
          <h2 className="text-2xl font-bold text-text-primary mb-2">
            Project Not Found
          </h2>
          <button
            onClick={() => navigate("/all-tasks")}
            className="w-full py-3 px-6 bg-primary text-white font-semibold rounded-xl mt-4"
          >
            Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <CreateMenuActions
        isOpen={isCreateMenuOpen}
        typeMenu={"task"}
        handleCloseButton={handleCreateMenu}
      />
      <EditMenuActions
        handleCloseButton={handleEditMenu}
        isOpen={editMenuOpen}
        typeMenu={typeMenu}
        taskActive={taskActive}
      />

      <div className="w-full min-h-screen bg-background p-6 md:p-8 pb-20 animate-in fade-in duration-500">
        {/* HEADER SECTION */}
        <div className="flex flex-col gap-2 mb-6 border-b border-border pb-8">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div
                  className="w-5 h-5 rounded-md shadow-sm ring-1 ring-border"
                  style={{ backgroundColor: activeProject?.color || "#ccc" }}
                />
                <h1 className="text-3xl font-bold text-text-primary tracking-tight">
                  {activeProject?.title || fallbackTitle}
                </h1>
              </div>
            </div>
            <div className="flex items-center gap-3 ml-8 md:ml-0">
              <FilterButton />
              <NewTaskButton handleCreateMenu={handleCreateMenu} />
              <div className="relative">
                <button
                  onClick={(e) => toggleProjectMenu(e)}
                  className={`p-2 bg-surface border border-border rounded-xl text-text-secondary hover:text-text-primary hover:bg-gray-50 transition-all shadow-sm ${isProjectMenuOpen ? "ring-2 ring-primary/20 border-primary" : ""}`}
                >
                  <MoreHorizontal size={20} />
                </button>
                {isProjectMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-border rounded-xl shadow-xl z-20 animate-in fade-in zoom-in-95 duration-200 overflow-hidden">
                    <button
                      onClick={() => handleEditMenu("project")}
                      className="w-full px-4 py-2.5 text-left text-sm text-text-secondary hover:bg-gray-50 hover:text-primary flex items-center gap-2 transition-colors"
                    >
                      <Pencil size={14} /> Edit Project
                    </button>
                    <div className="h-px bg-border/50 mx-2"></div>
                    <button
                      onClick={() => handleRemoveProject(projectIdInt)}
                      className="w-full px-4 py-2.5 text-left text-sm text-danger hover:bg-red-50 flex items-center gap-2 transition-colors"
                    >
                      <Trash2 size={14} /> Remove Project
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* STATS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 ml-0 md:ml-8">
            <div className="col-span-2 bg-surface p-4 rounded-xl border border-border shadow-sm flex flex-col justify-center">
              <div className="flex justify-between items-end mb-2">
                <span className="text-sm font-medium text-text-secondary">
                  Project Progress
                </span>
                <span className="text-xl font-bold text-primary">
                  {stats.progress}%
                </span>
              </div>
              <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary transition-all duration-700 ease-out"
                  style={{ width: `${stats.progress}%` }}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-green-50/50 p-3 rounded-xl border border-green-100 flex items-center gap-3">
                <div className="p-2 bg-white rounded-lg text-success shadow-sm">
                  <CheckSquare size={18} />
                </div>
                <div>
                  <p className="text-xs text-text-secondary">Done</p>
                  <p className="text-lg font-bold text-text-primary">
                    {stats.completed}
                  </p>
                </div>
              </div>
              <div className="bg-orange-50/50 p-3 rounded-xl border border-orange-100 flex items-center gap-3">
                <div className="p-2 bg-white rounded-lg text-warning shadow-sm">
                  <PieChart size={18} />
                </div>
                <div>
                  <p className="text-xs text-text-secondary">Pending</p>
                  <p className="text-lg font-bold text-text-primary">
                    {stats.pending}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* VIEW SWITCHER */}
        <div className="flex items-center gap-2 mb-6 bg-surface p-1 rounded-xl border border-border w-fit">
          <button
            onClick={() => setViewMode("list")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${viewMode === "list" ? "bg-white text-primary shadow-sm ring-1 ring-black/5" : "text-text-secondary hover:text-text-primary hover:bg-gray-100"}`}
          >
            <ListIcon size={16} /> List
          </button>
          <button
            onClick={() => setViewMode("kanban")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${viewMode === "kanban" ? "bg-white text-primary shadow-sm ring-1 ring-black/5" : "text-text-secondary hover:text-text-primary hover:bg-gray-100"}`}
          >
            <LayoutTemplate size={16} /> Kanban
          </button>
          <button
            onClick={() => setViewMode("calendar")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${viewMode === "calendar" ? "bg-white text-primary shadow-sm ring-1 ring-black/5" : "text-text-secondary hover:text-text-primary hover:bg-gray-100"}`}
          >
            <CalendarDays size={16} /> Calendar
          </button>
        </div>

        {/* MAIN CONTENT */}
        <div className="animate-in fade-in slide-in-from-bottom-2 duration-300 relative z-0">
          {viewMode === "list" && (
            <TaskList
              tasks={projectTasks}
              onEdit={handleEditTaskDirect}
              handleCreateMenu={handleCreateMenu}
            />
          )}

          {viewMode === "kanban" && (
            <TaskKanban tasks={projectTasks} onEdit={handleEditTaskDirect} />
          )}

          {viewMode === "calendar" && (
            <TaskCalender
              tasks={projectTasks}
              onEdit={handleEditTaskDirect}
              onCreateTask={handleCreateMenu}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default ProjectPage;
