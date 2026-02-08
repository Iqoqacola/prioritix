import { useParams } from "react-router";
import { useTasksContext } from "../hooks/Tasks/useTasksContext";
import { useProjectsContext } from "../hooks/Projects/useProjectsContext";
import { useMemo, useState, useEffect } from "react";
import {
  Calendar,
  MoreHorizontal,
  CheckCircle,
  Circle,
  ListTodo,
  PieChart,
  CheckSquare,
  Star,
  Pencil,
  Trash2,
} from "lucide-react";
import { CreateMenuActions } from "../components/ui/Menu";
import { FilterButton, NewTaskButton } from "../components/ui/Button";

const ProjectPage = () => {
  const { slug } = useParams();
  const { tasks } = useTasksContext();
  const { projects } = useProjectsContext();

  const [isCreateMenuOpen, setIsCreateMenuOpen] = useState(false);
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);
  const [isProjectMenuOpen, setIsProjectMenuOpen] = useState(false);

  const parts = slug ? slug.split("-") : [];
  const projectId = parts.pop();

  const activeProject = useMemo(() => {
    return projects?.find((p) => p.id.toString() === projectId);
  }, [projects, projectId]);

  const fallbackTitle = parts
    .join(" ")
    .replace(/\b\w/g, (l) => l.toUpperCase());

  const projectTasks = useMemo(() => {
    if (!tasks || !projectId) return [];
    return tasks
      .filter((t) => t.project_id.toString() === projectId)
      .sort((a, b) => {
        if (a.starred === b.starred) return 0;
        return a.starred ? -1 : 1;
      });
  }, [tasks, projectId]);

  const stats = useMemo(() => {
    const total = projectTasks.length;
    const completed = projectTasks.filter(
      (t) => t.status === "completed",
    ).length;
    const pending = total - completed;
    const progress = total === 0 ? 0 : Math.round((completed / total) * 100);
    return { total, completed, pending, progress };
  }, [projectTasks]);

  const toggleMenu = (e: React.MouseEvent, taskId: string) => {
    e.stopPropagation();
    setActiveMenuId(activeMenuId === taskId ? null : taskId);
  };
  const toggleProjectMenu = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsProjectMenuOpen(!isProjectMenuOpen);
    setActiveMenuId(null);
  };

  useEffect(() => {
    const handleClickOutside = () => setActiveMenuId(null);
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const handleCreateMenu = () => {
    setIsCreateMenuOpen((prev) => !prev);
  };

  const handleEditTask = (taskId: string) => {
    console.log("Edit task:", taskId);
    setActiveMenuId(null);
  };

  const handleDeleteTask = (taskId: string) => {
    console.log("Delete task:", taskId);
    setActiveMenuId(null);
  };

  return (
    <>
      <CreateMenuActions
        isOpen={isCreateMenuOpen}
        typeMenu={"task"}
        handleCloseButton={handleCreateMenu}
      />

      <div className="w-full min-h-screen bg-background p-6 md:p-8 pb-20 animate-in fade-in duration-500">
        {/* === HEADER SECTION === */}
        <div className="flex flex-col gap-2 mb-8 border-b border-border pb-8">
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

            {/* BUTTON GROUP HEADER */}
            <div className="flex items-center gap-3 ml-8 md:ml-0">
              <FilterButton />
              <NewTaskButton handleCreateMenu={handleCreateMenu} />

              <div className="relative">
                <button
                  onClick={toggleProjectMenu}
                  className={`p-2 bg-surface border border-border rounded-xl text-text-secondary hover:text-text-primary hover:bg-gray-50 transition-all shadow-sm ${isProjectMenuOpen ? "ring-2 ring-primary/20 border-primary" : ""}`}
                >
                  <MoreHorizontal size={20} />
                </button>

                {isProjectMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-border rounded-xl shadow-xl z-20 animate-in fade-in zoom-in-95 duration-200 overflow-hidden">
                    <button
                      //   onClick={handleEditProject}
                      className="w-full px-4 py-2.5 text-left text-sm text-text-secondary hover:bg-gray-50 hover:text-primary flex items-center gap-2 transition-colors"
                    >
                      <Pencil size={14} /> Edit Project
                    </button>
                    <div className="h-px bg-border/50 mx-2"></div>
                    <button
                      //   onClick={handleRemoveProject}
                      className="w-full px-4 py-2.5 text-left text-sm text-danger hover:bg-red-50 flex items-center gap-2 transition-colors"
                    >
                      <Trash2 size={14} /> Remove Project
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* === STATS === */}
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

        {/* === TASK LIST SECTION === */}
        <div className="space-y-4">
          {projectTasks.length > 0 ? (
            <div className="grid grid-cols-1 gap-3">
              {projectTasks.map((task) => (
                <div
                  key={task.id}
                  className={`group flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-surface border rounded-xl hover:shadow-md transition-all duration-200 
                    ${task.status === "completed" ? "border-border opacity-75" : "border-border hover:border-primary/50"}`}
                >
                  <div className="flex items-center gap-4 flex-1">
                    <button className="flex-shrink-0 focus:outline-none hover:scale-110 transition-transform cursor-pointer">
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
                            onClick={() => handleEditTask(task.id)}
                            className="w-full px-4 py-2.5 text-left text-sm text-text-secondary hover:bg-gray-50 hover:text-primary flex items-center gap-2 transition-colors"
                          >
                            <Pencil size={14} /> Edit
                          </button>
                          <div className="h-px bg-border/50 mx-2"></div>
                          <button
                            onClick={() => handleDeleteTask(task.id)}
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
      </div>
    </>
  );
};

export default ProjectPage;
