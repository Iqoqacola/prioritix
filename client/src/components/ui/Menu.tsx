import { Link, NavLink, useParams } from "react-router";
import {
  ChevronRight,
  ChevronDown,
  XIcon,
  Plus,
  Folder,
  Check,
  Calendar,
  Flag,
  Tag,
  Star,
} from "lucide-react";
import { act, useEffect, useMemo, useState } from "react";
import { CreateCard } from "./Card";
import SearchBar from "./SearchBar";
import {} from "lucide-react";
import { useCreateProject } from "../../hooks/Projects/useCreateProject";
import { useProjectsContext } from "../../hooks/Projects/useProjectsContext";
import { useCreateTask } from "../../hooks/Tasks/useCreateTask";
import { useUpdateTask } from "../../hooks/Tasks/useUpdateTask";
import { useUpdateProject } from "../../hooks/Projects/useUpdateProject";
import { useTasksContext } from "../../hooks/Tasks/useTasksContext";

export const HamburgerMain = ({ onClick }) => {
  return (
    <div className="absolute top-16 left-0 w-full bg-white border-b border-gray-200 shadow-xl flex flex-col p-4 gap-3 md:hidden animate-in slide-in-from-top-5">
      <Link
        to="/signin"
        className="text-center text-text-secondary font-bold py-3 border border-gray-200 rounded-lg hover:bg-gray-50"
        onClick={onClick}
      >
        Sign In
      </Link>
      <Link
        to="/signup"
        className="text-center bg-primary text-white font-bold py-3 rounded-lg shadow-md hover:bg-secondary"
        onClick={onClick}
      >
        Sign Up
      </Link>
    </div>
  );
};

export const SidebarMainMenu = ({ mainMenus, handleLinkClick }) => {
  return (
    <nav className="space-y-1">
      {mainMenus.map((menu) => (
        <NavLink
          key={menu.label}
          to={menu.path}
          onClick={handleLinkClick}
          className={({ isActive }) =>
            `flex items-center justify-between px-3 py-2 rounded-md text-sm font-medium transition-colors
                   ${isActive ? "bg-blue-50 text-blue-700" : "hover:bg-gray-100 text-gray-600"}`
          }
        >
          <div className="flex items-center gap-3">
            <menu.icon size={18} />
            {menu.label}
          </div>
          {menu.badge && (
            <span className="bg-blue-100 text-blue-600 text-xs font-bold px-2 py-0.5 rounded-full">
              {menu.badge}
            </span>
          )}
        </NavLink>
      ))}
    </nav>
  );
};

export const SidebarHighlightsMenu = ({ highlightsMenu, handleLinkClick }) => {
  return (
    <div>
      <div className="px-3 mb-2 flex items-center justify-between">
        <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
          Highlights
        </span>
      </div>
      <nav className="space-y-1">
        {highlightsMenu.map((menu) => (
          <NavLink
            key={menu.label}
            to={menu.path}
            onClick={handleLinkClick}
            className={({ isActive }) =>
              `flex items-center justify-between px-3 py-2 rounded-md text-sm font-medium transition-colors
                   ${isActive ? "bg-blue-50 text-blue-700" : "hover:bg-gray-100 text-gray-600"}`
            }
          >
            <div className="flex items-center gap-3">
              <menu.icon size={18} />
              {menu.label}
            </div>
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export const SidebarProjectsMenu = ({
  projects,
  handleLinkClick,
  handleAddProject,
}) => {
  const [isProjectsOpen, setIsProjectsOpen] = useState(true);

  const toSlug = (text) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "");
  };

  return (
    <div>
      <div
        className="flex items-center justify-between px-3 mb-1 cursor-pointer group"
        onClick={() => setIsProjectsOpen(!isProjectsOpen)}
      >
        <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider group-hover:text-gray-600 transition-colors">
          Projects
        </span>
        {isProjectsOpen ? (
          <ChevronDown size={14} className="text-gray-400" />
        ) : (
          <ChevronRight size={14} className="text-gray-400" />
        )}
      </div>
      {isProjectsOpen && (
        <div className="space-y-0.5 mt-1">
          {projects?.map((project) => (
            <NavLink
              key={project.title}
              to={`/project/${toSlug(project.title)}-${project.id}`}
              onClick={handleLinkClick}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors
                       ${isActive ? "bg-gray-100 text-gray-900" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"}`
              }
            >
              <Folder
                size={14}
                style={{
                  color: project?.color || "currentColor",
                }}
              />
              {project.title}
            </NavLink>
          ))}
          <button
            className="flex items-center gap-3 px-3 py-2 text-sm text-gray-400 hover:text-blue-600 w-full text-left transition-colors"
            onClick={handleAddProject}
          >
            <Plus size={16} />
            <span>Add Project</span>
          </button>
        </div>
      )}
    </div>
  );
};

export const SidebarTeamsMenu = ({ teams, handleLinkClick, handleAddTeam }) => {
  const [isTeamsOpen, setIsTeamsOpen] = useState(true);

  return (
    <div>
      <div
        className="flex items-center justify-between px-3 mb-1 cursor-pointer group"
        onClick={() => setIsTeamsOpen(!isTeamsOpen)}
      >
        <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider group-hover:text-gray-600 transition-colors">
          Team
        </span>
        {isTeamsOpen ? (
          <ChevronDown size={14} className="text-gray-400" />
        ) : (
          <ChevronRight size={14} className="text-gray-400" />
        )}
      </div>

      {isTeamsOpen && (
        <div className="space-y-0.5 mt-1">
          {teams.map((team) => (
            <NavLink
              key={team.label}
              to={team.path}
              onClick={handleLinkClick}
              className="flex items-center gap-3 px-3 py-2 rounded-md text-sm text-gray-600 hover:bg-gray-50"
            >
              <team.icon size={16} />
              {team.label}
            </NavLink>
          ))}
          <button
            className="flex items-center gap-3 px-3 py-2 text-sm text-gray-400 hover:text-blue-600 w-full text-left transition-colors"
            onClick={handleAddTeam}
          >
            <Plus size={16} />
            <span>Join a Workspace</span>
          </button>
        </div>
      )}
    </div>
  );
};

export const CreateMenu = ({ creates, handleCloseButton, handleCreate }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-text-primary/50 backdrop-blur-sm transition-opacity">
      <div className="absolute inset-0"></div>

      {/* Modal Container */}
      <div className="relative z-10 h-[90vh] w-11/12 bg-surface shadow-2xl rounded-2xl md:h-[80vh] md:w-1/3 flex flex-col overflow-hidden ring-1 ring-border animate-in zoom-in-95 duration-200 p-4">
        <div className="flex items-center justify-between border-b border-border px-6 py-4 bg-surface">
          <h2 className="text-lg font-bold text-text-primary">Create</h2>
          <button
            className="rounded-full p-2 text-muted hover:bg-background hover:text-text-primary transition-colors"
            onClick={handleCloseButton}
          >
            <XIcon size={24} />
          </button>
        </div>
        <div className="mt-4 flex justify-center">
          <SearchBar />
        </div>
        {/* Content Wrapper */}
        <div className="mt-4 flex h-full w-full flex-col items-center px-6 py-2 text-text-primary overflow-y-auto gap-2">
          {creates &&
            creates?.map((create: object) => (
              <CreateCard create={create} handleCreate={handleCreate} />
            ))}
        </div>
      </div>
    </div>
  );
};

export const CreateMenuActions = ({ handleCloseButton, isOpen, typeMenu }) => {
  const priorities = [
    {
      value: "low",
      label: "Low",
      bg: "bg-primary",
    },
    {
      value: "medium",
      label: "Medium",
      bg: "bg-warning",
    },
    {
      value: "high",
      label: "High",
      bg: "bg-danger",
    },
  ];

  const { createProject } = useCreateProject();
  const { createTask } = useCreateTask();

  const [isProjectOpen, setIsProjectOpen] = useState(false);
  const [isPriorityOpen, setIsPriorityOpen] = useState(false);

  const [isTitleError, setIsTitleError] = useState(false);
  const [isProjectError, setIsProjectError] = useState(false);
  const [isDateError, setIsDateError] = useState(false);

  const { projects } = useProjectsContext();

  const today = new Date().toISOString().split("T")[0];

  const INITIAL_DATA = {
    title: "",
    color: "#000000",
    description: "",
    priority: "medium",
    due_date: "",
    tags: "",
    starred: false,
    status: "pending",
    project_id: "",
  };

  const [formData, setFormData] = useState(INITIAL_DATA);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === "due_date" && value) {
      setIsDateError(false);
    }

    if (name === "title" && value) {
      setIsTitleError(false);
    }

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const selectedProject = projects?.find((p) => p.id === formData.project_id);
  const selectedPriority = priorities.find(
    (p) => p.value === formData.priority,
  );

  const handleSelectProject = (id) => {
    setFormData((prev) => ({ ...prev, project_id: id }));
    setIsProjectOpen(false);
    setIsProjectError(false);
  };

  const handleCloseAndReset = () => {
    setFormData(INITIAL_DATA);
    setIsTitleError(false);
    setIsProjectError(false);
    setIsDateError(false);
    setIsProjectOpen(false);
    handleCloseButton();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (typeMenu === "project") {
      createProject(formData.title, formData.color);
    }

    if (typeMenu === "task") {
      let hasError = false;

      if (!formData.title) {
        setIsTitleError(true);
        hasError = true;
      }
      if (!formData.project_id) {
        setIsProjectError(true);
        hasError = true;
      }

      if (!formData.due_date) {
        setIsDateError(true);
        hasError = true;
      }

      if (hasError) return;

      setIsTitleError(false);
      setIsProjectError(false);
      setIsDateError(false);

      createTask(
        formData.title,
        formData.project_id,
        formData.description,
        formData.status,
        formData.priority,
        formData.due_date,
        formData.tags,
        formData.starred,
      );
    }

    handleCloseAndReset();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in">
      <div className="w-full max-w-lg bg-surface border border-border rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header & Tabs */}
        <div className="border-b border-border bg-background">
          <div className="flex items-center justify-between p-4 pb-2">
            <h2 className="text-lg font-bold text-text-primary">{`Create New ${typeMenu ? typeMenu : ""}`}</h2>
            <button
              onClick={handleCloseAndReset}
              className="text-text-secondary hover:text-text-primary transition-colors"
            >
              <XIcon size={20} />
            </button>
          </div>
        </div>

        {/* Scrollable Form Body */}
        <div className="overflow-y-auto p-6">
          <form id="create-form" onSubmit={handleSubmit} className="space-y-5">
            {/* PROJECT FORM FIELDS */}
            {typeMenu === "project" && (
              <div className="animate-in slide-in-from-left-2 duration-300">
                <label className="block text-sm font-medium text-text-secondary mb-1">
                  Title <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  name="title"
                  required
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Project Name"
                  className="block w-full px-4 py-2.5 bg-background border border-border rounded-xl text-text-primary focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none transition-all"
                />
                <label className="block text-sm font-medium text-text-secondary mb-1 mt-4">
                  Color
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    name="color"
                    value={formData.color}
                    onChange={handleChange}
                    className="h-10 w-20 p-1 bg-background border border-border rounded-lg cursor-pointer"
                  />
                  <span className="text-sm text-text-secondary uppercase">
                    {formData.color}
                  </span>
                </div>
              </div>
            )}

            {/* TASK FORM FIELDS */}
            {typeMenu === "task" && (
              <div className="space-y-5 animate-in slide-in-from-right-2 duration-300">
                {/* Title */}
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-1">
                    Title <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Task Title"
                    className="block w-full px-4 py-2.5 bg-background border border-border rounded-xl text-text-primary focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none transition-all"
                  />

                  {isTitleError && (
                    <span className="text-xs text-danger mt-1 ml-1 animate-in slide-in-from-top-1">
                      Please fil a Title
                    </span>
                  )}
                </div>

                {/* Project */}
                <div className="relative">
                  <label className="block text-sm font-medium text-text-secondary mb-1 flex items-center gap-1">
                    Project <span className="text-danger">*</span>
                  </label>

                  <button
                    type="button"
                    onClick={() => setIsProjectOpen(!isProjectOpen)}
                    className={`relative w-full px-4 py-2.5 bg-background border rounded-xl text-left flex items-center justify-between transition-all group
                      ${isProjectOpen ? "border-primary ring-2 ring-primary/20" : "border-border hover:border-primary/50"}
                    `}
                  >
                    <div className="flex items-center gap-2 overflow-hidden">
                      <div
                        className={`flex items-center justify-center w-6 h-6 rounded-md ${formData.project_id ? "bg-opacity-20" : "bg-text-secondary/10"}`}
                        style={{
                          backgroundColor: selectedProject?.color
                            ? `${selectedProject.color}33`
                            : undefined,
                        }}
                      >
                        <Folder
                          size={14}
                          style={{
                            color: selectedProject?.color || "currentColor",
                          }}
                          className={
                            formData.project_id ? "" : "text-text-secondary"
                          }
                        />
                      </div>

                      <span
                        className={`block truncate ${formData.project_id ? "text-text-primary" : "text-text-secondary"}`}
                      >
                        {selectedProject
                          ? selectedProject.title || selectedProject.name
                          : "Select a Project"}
                      </span>
                    </div>

                    <ChevronDown
                      size={16}
                      className={`text-text-secondary transition-transform duration-200 ${isProjectOpen ? "rotate-180" : ""}`}
                    />
                  </button>

                  {isProjectError && (
                    <span className="text-xs text-danger mt-1 ml-1 animate-in slide-in-from-top-1">
                      Please select a project
                    </span>
                  )}

                  {isProjectOpen && (
                    <>
                      <div
                        className="fixed inset-0 z-10"
                        onClick={() => setIsProjectOpen(false)}
                      />

                      <div className="absolute z-20 w-full mt-2 bg-surface border border-border rounded-xl shadow-xl max-h-60 overflow-y-auto animate-in fade-in zoom-in-95 duration-200">
                        {/* List Projects */}
                        {projects &&
                          projects?.map((p) => (
                            <div
                              key={p.id}
                              onClick={() => handleSelectProject(p.id)}
                              className="px-3 py-2.5 cursor-pointer hover:bg-background/50 flex items-center justify-between group transition-colors last:rounded-b-xl border-t border-border/40"
                            >
                              <div className="flex items-center gap-3">
                                <div
                                  className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors"
                                  style={{ backgroundColor: `${p.color}20` }} // 20 hex = low opacity background
                                >
                                  <Folder
                                    size={16}
                                    style={{ color: p.color }}
                                  />
                                </div>
                                <span className="text-sm font-medium text-text-primary">
                                  {p.title}
                                </span>
                              </div>
                              {formData.project_id === p.id && (
                                <Check size={16} className="text-primary" />
                              )}
                            </div>
                          ))}
                      </div>
                    </>
                  )}
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-1">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Add details about this task..."
                    className="block w-full px-4 py-2.5 bg-background border border-border rounded-xl text-text-primary focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none transition-all resize-none"
                  />
                </div>

                {/* Priority */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="relative">
                    <label className="text-sm font-medium text-text-secondary mb-1 flex items-center gap-1">
                      <Flag size={14} /> Priority
                    </label>

                    <button
                      type="button"
                      onClick={() => setIsPriorityOpen(!isPriorityOpen)}
                      className={`relative w-full px-4 py-2.5 bg-background border rounded-xl text-left flex items-center justify-between transition-all group ${isPriorityOpen ? "border-primary ring-2 ring-primary/20" : "border-border hover:border-primary/50"}`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-2 h-2 rounded-md flex items-center justify-center ${selectedPriority?.bg}`}
                        ></div>
                        <span className="text-text-primary capitalize">
                          {selectedPriority?.label}
                        </span>
                      </div>

                      <ChevronDown
                        size={16}
                        className={`text-text-secondary transition-transform duration-200 ${isPriorityOpen ? "rotate-180" : ""}`}
                      />
                    </button>

                    {isPriorityOpen && (
                      <>
                        <div
                          className="fixed inset-0 z-10"
                          onClick={() => setIsPriorityOpen(false)}
                        />

                        <div className="absolute z-20 w-full mt-2 bg-surface border border-border rounded-xl shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                          {priorities.map((p) => (
                            <div
                              key={p.value}
                              onClick={() => {
                                setFormData((prev) => ({
                                  ...prev,
                                  priority: p.value,
                                }));
                                setIsPriorityOpen(false);
                              }}
                              className="px-3 py-2.5 cursor-pointer hover:bg-background/50 flex items-center justify-between group transition-colors border-b border-border/40 last:border-0"
                            >
                              <div className="flex items-center gap-3">
                                <div
                                  className={`w-2 h-2 rounded-lg flex items-center justify-center transition-colors ${p.bg}`}
                                ></div>
                                <span className="text-sm font-medium text-text-primary capitalize">
                                  {p.label}
                                </span>
                              </div>

                              {formData.priority === p.value && (
                                <Check size={16} className="text-primary" />
                              )}
                            </div>
                          ))}
                        </div>
                      </>
                    )}
                  </div>

                  {/* Due Date */}
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-1 flex items-center gap-1">
                      <Calendar size={14} /> Due Date{" "}
                      <span className="text-danger">*</span>
                    </label>
                    <input
                      type="date"
                      name="due_date"
                      min={today}
                      value={formData.due_date}
                      onChange={handleChange}
                      className="block w-full px-3 py-2.5 bg-background border border-border rounded-xl text-text-primary focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none"
                    />
                    {isDateError && (
                      <span className="text-xs text-red-500 mt-1 animate-in slide-in-from-top-1">
                        Date is required
                      </span>
                    )}
                  </div>
                </div>

                {/* Tags */}
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-1 flex items-center gap-1">
                    <Tag size={14} /> Tags
                  </label>
                  <input
                    type="text"
                    name="tags"
                    value={formData.tags}
                    onChange={handleChange}
                    placeholder="e.g. dev, urgent (comma separated)"
                    className="block w-full px-4 py-2.5 bg-background border border-border rounded-xl text-text-primary focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none transition-all"
                  />
                </div>

                {/* Starred */}
                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="checkbox"
                    id="starred"
                    name="starred"
                    checked={formData.starred}
                    onChange={handleChange}
                    className="h-4 w-4 text-primary border-border rounded focus:ring-primary"
                  />
                  <label
                    htmlFor="starred"
                    className="text-sm font-medium text-text-secondary flex items-center gap-1 cursor-pointer select-none"
                  >
                    <Star
                      size={14}
                      className={
                        formData.starred
                          ? "fill-yellow-400 text-yellow-400"
                          : ""
                      }
                    />
                    Mark as Important
                  </label>
                </div>
              </div>
            )}
          </form>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-border bg-surface flex justify-end gap-3">
          <button
            type="button"
            onClick={handleCloseAndReset}
            className="px-4 py-2.5 text-sm font-medium text-text-secondary bg-transparent hover:bg-background border border-transparent rounded-xl transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            form="create-form"
            className="px-6 py-2.5 text-sm font-bold text-white bg-primary hover:bg-secondary rounded-xl shadow-lg transition-all transform hover:-translate-y-0.5 flex items-center gap-2"
          >
            <Plus size={18} />
            Create {typeMenu ? typeMenu : ""}
          </button>
        </div>
      </div>
    </div>
  );
};

export const EditMenuActions = ({
  handleCloseButton,
  isOpen,
  typeMenu,
  taskActive,
}) => {
  const { slug } = useParams();

  const priorities = [
    {
      value: "low",
      label: "Low",
      bg: "bg-primary",
    },
    {
      value: "medium",
      label: "Medium",
      bg: "bg-warning",
    },
    {
      value: "high",
      label: "High",
      bg: "bg-danger",
    },
  ];

  const [isProjectOpen, setIsProjectOpen] = useState(false);
  const [isPriorityOpen, setIsPriorityOpen] = useState(false);

  const [isTitleError, setIsTitleError] = useState(false);
  const [isProjectError, setIsProjectError] = useState(false);
  const [isDateError, setIsDateError] = useState(false);

  const { projects } = useProjectsContext();
  const { updateProject } = useUpdateProject();

  const parts = slug ? slug.split("-") : [];
  const projectId = parts.pop();

  const projectIdInt = parseInt(projectId);

  const activeProject = projects?.find((p) => p.id === projectIdInt);

  const today = new Date().toISOString().split("T")[0];

  const INITIAL_DATA = {
    // PROJECT
    id_project: activeProject.id || "",
    title_project: activeProject.title || "",
    color: activeProject.color || "",

    // TASK
    id_task: taskActive?.id || "",
    title_task: taskActive?.title || "",
    description: taskActive?.description || "",
    priority: taskActive?.priority || "",
    due_date: taskActive?.due_date || "",
    tags: taskActive?.tags || "",
    starred: taskActive?.starred || "",
    status: taskActive?.status || "",
  };

  const [formData, setFormData] = useState(INITIAL_DATA);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === "due_date" && value) {
      setIsDateError(false);
    }

    if (name === "title" && value) {
      setIsTitleError(false);
    }

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const selectedProject = projects?.find((p) => p.id === formData.id_project);
  const selectedPriority = priorities.find(
    (p) => p.value === formData.priority,
  );

  const handleSelectProject = (id) => {
    setFormData((prev) => ({ ...prev, id_project: id }));
    setIsProjectOpen(false);
    setIsProjectError(false);
  };

  const handleCloseAndReset = () => {
    setFormData(INITIAL_DATA);
    setIsTitleError(false);
    setIsProjectError(false);
    setIsDateError(false);
    setIsProjectOpen(false);
    handleCloseButton();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (typeMenu === "project") {
      updateProject(formData);
    }

    if (typeMenu === "task") {
      let hasError = false;

      if (!formData.title_task) {
        setIsTitleError(true);
        hasError = true;
      }
      if (!formData.id_project) {
        setIsProjectError(true);
        hasError = true;
      }

      if (!formData.due_date) {
        setIsDateError(true);
        hasError = true;
      }

      if (hasError) return;

      setIsTitleError(false);
      setIsProjectError(false);
      setIsDateError(false);
    }

    handleCloseAndReset();
  };

  useEffect(() => {
    if (INITIAL_DATA) {
      setFormData(INITIAL_DATA);
    }

    console.log("tes");
  }, [slug, taskActive, projects]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm p-4 animate-in fade-in">
      <div className="w-full max-w-lg bg-surface border border-border rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header & Tabs */}
        <div className="border-b border-border bg-background">
          <div className="flex items-center justify-between p-4 pb-2">
            <h2 className="text-lg font-bold text-text-primary">{`Create New ${typeMenu ? typeMenu : ""}`}</h2>
            <button
              onClick={handleCloseAndReset}
              className="text-text-secondary hover:text-text-primary transition-colors"
            >
              <XIcon size={20} />
            </button>
          </div>
        </div>

        {/* Scrollable Form Body */}
        <div className="overflow-y-auto p-6">
          <form id="edit-form" onSubmit={handleSubmit} className="space-y-5">
            {/* PROJECT FORM FIELDS */}
            {typeMenu === "project" && (
              <div className="animate-in slide-in-from-left-2 duration-300">
                <label className="block text-sm font-medium text-text-secondary mb-1">
                  Title <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  name="title_project"
                  required
                  value={formData.title_project}
                  onChange={handleChange}
                  placeholder="Project Name"
                  className="block w-full px-4 py-2.5 bg-background border border-border rounded-xl text-text-primary focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none transition-all"
                />
                <label className="block text-sm font-medium text-text-secondary mb-1 mt-4">
                  Color
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    name="color"
                    value={formData.color}
                    onChange={handleChange}
                    className="h-10 w-20 p-1 bg-background border border-border rounded-lg cursor-pointer"
                  />
                  <span className="text-sm text-text-secondary uppercase">
                    {formData.color}
                  </span>
                </div>
              </div>
            )}

            {/* TASK FORM FIELDS */}
            {typeMenu === "task" && (
              <div className="space-y-5 animate-in slide-in-from-right-2 duration-300">
                {/* Title */}
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-1">
                    Title <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    name="title_task"
                    value={formData.title_task}
                    onChange={handleChange}
                    placeholder="Task Title"
                    className="block w-full px-4 py-2.5 bg-background border border-border rounded-xl text-text-primary focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none transition-all"
                  />

                  {isTitleError && (
                    <span className="text-xs text-danger mt-1 ml-1 animate-in slide-in-from-top-1">
                      Please fil a Title
                    </span>
                  )}
                </div>

                {/* Project */}
                <div className="relative">
                  <label className="block text-sm font-medium text-text-secondary mb-1 flex items-center gap-1">
                    Project <span className="text-danger">*</span>
                  </label>

                  <button
                    type="button"
                    onClick={() => setIsProjectOpen(!isProjectOpen)}
                    className={`relative w-full px-4 py-2.5 bg-background border rounded-xl text-left flex items-center justify-between transition-all group
                      ${isProjectOpen ? "border-primary ring-2 ring-primary/20" : "border-border hover:border-primary/50"}
                    `}
                  >
                    <div className="flex items-center gap-2 overflow-hidden">
                      <div
                        className={`flex items-center justify-center w-6 h-6 rounded-md ${formData.project_id ? "bg-opacity-20" : "bg-text-secondary/10"}`}
                        style={{
                          backgroundColor: selectedProject?.color
                            ? `${selectedProject.color}33`
                            : undefined,
                        }}
                      >
                        <Folder
                          size={14}
                          style={{
                            color: selectedProject?.color || "currentColor",
                          }}
                          className={
                            formData.id_project ? "" : "text-text-secondary"
                          }
                        />
                      </div>

                      <span
                        className={`block truncate ${formData.id_project ? "text-text-primary" : "text-text-secondary"}`}
                      >
                        {selectedProject
                          ? selectedProject.title || selectedProject.name
                          : "Select a Project"}
                      </span>
                    </div>

                    <ChevronDown
                      size={16}
                      className={`text-text-secondary transition-transform duration-200 ${isProjectOpen ? "rotate-180" : ""}`}
                    />
                  </button>

                  {isProjectError && (
                    <span className="text-xs text-danger mt-1 ml-1 animate-in slide-in-from-top-1">
                      Please select a project
                    </span>
                  )}

                  {isProjectOpen && (
                    <>
                      <div
                        className="fixed inset-0 z-10"
                        onClick={() => setIsProjectOpen(false)}
                      />

                      <div className="absolute z-20 w-full mt-2 bg-surface border border-border rounded-xl shadow-xl max-h-60 overflow-y-auto animate-in fade-in zoom-in-95 duration-200">
                        {/* List Projects */}
                        {projects &&
                          projects?.map((p) => (
                            <div
                              key={p.id}
                              onClick={() => handleSelectProject(p.id)}
                              className="px-3 py-2.5 cursor-pointer hover:bg-background/50 flex items-center justify-between group transition-colors last:rounded-b-xl border-t border-border/40"
                            >
                              <div className="flex items-center gap-3">
                                <div
                                  className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors"
                                  style={{ backgroundColor: `${p.color}20` }} // 20 hex = low opacity background
                                >
                                  <Folder
                                    size={16}
                                    style={{ color: p.color }}
                                  />
                                </div>
                                <span className="text-sm font-medium text-text-primary">
                                  {p.title}
                                </span>
                              </div>
                              {formData.id_project === p.id && (
                                <Check size={16} className="text-primary" />
                              )}
                            </div>
                          ))}
                      </div>
                    </>
                  )}
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-1">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Add details about this task..."
                    className="block w-full px-4 py-2.5 bg-background border border-border rounded-xl text-text-primary focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none transition-all resize-none"
                  />
                </div>

                {/* Priority */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="relative">
                    <label className="text-sm font-medium text-text-secondary mb-1 flex items-center gap-1">
                      <Flag size={14} /> Priority
                    </label>

                    <button
                      type="button"
                      onClick={() => setIsPriorityOpen(!isPriorityOpen)}
                      className={`relative w-full px-4 py-2.5 bg-background border rounded-xl text-left flex items-center justify-between transition-all group ${isPriorityOpen ? "border-primary ring-2 ring-primary/20" : "border-border hover:border-primary/50"}`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-2 h-2 rounded-md flex items-center justify-center ${selectedPriority?.bg}`}
                        ></div>
                        <span className="text-text-primary capitalize">
                          {selectedPriority?.label}
                        </span>
                      </div>

                      <ChevronDown
                        size={16}
                        className={`text-text-secondary transition-transform duration-200 ${isPriorityOpen ? "rotate-180" : ""}`}
                      />
                    </button>

                    {isPriorityOpen && (
                      <>
                        <div
                          className="fixed inset-0 z-10"
                          onClick={() => setIsPriorityOpen(false)}
                        />

                        <div className="absolute z-20 w-full mt-2 bg-surface border border-border rounded-xl shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                          {priorities.map((p) => (
                            <div
                              key={p.value}
                              onClick={() => {
                                setFormData((prev) => ({
                                  ...prev,
                                  priority: p.value,
                                }));
                                setIsPriorityOpen(false);
                              }}
                              className="px-3 py-2.5 cursor-pointer hover:bg-background/50 flex items-center justify-between group transition-colors border-b border-border/40 last:border-0"
                            >
                              <div className="flex items-center gap-3">
                                <div
                                  className={`w-2 h-2 rounded-lg flex items-center justify-center transition-colors ${p.bg}`}
                                ></div>
                                <span className="text-sm font-medium text-text-primary capitalize">
                                  {p.label}
                                </span>
                              </div>

                              {formData.priority === p.value && (
                                <Check size={16} className="text-primary" />
                              )}
                            </div>
                          ))}
                        </div>
                      </>
                    )}
                  </div>

                  {/* Due Date */}
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-1 flex items-center gap-1">
                      <Calendar size={14} /> Due Date{" "}
                      <span className="text-danger">*</span>
                    </label>
                    <input
                      type="date"
                      name="due_date"
                      min={today}
                      value={formData.due_date}
                      onChange={handleChange}
                      className="block w-full px-3 py-2.5 bg-background border border-border rounded-xl text-text-primary focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none"
                    />
                    {isDateError && (
                      <span className="text-xs text-red-500 mt-1 animate-in slide-in-from-top-1">
                        Date is required
                      </span>
                    )}
                  </div>
                </div>

                {/* Tags */}
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-1 flex items-center gap-1">
                    <Tag size={14} /> Tags
                  </label>
                  <input
                    type="text"
                    name="tags"
                    value={formData.tags}
                    onChange={handleChange}
                    placeholder="e.g. dev, urgent (comma separated)"
                    className="block w-full px-4 py-2.5 bg-background border border-border rounded-xl text-text-primary focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none transition-all"
                  />
                </div>

                {/* Starred */}
                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="checkbox"
                    id="starred"
                    name="starred"
                    checked={formData.starred}
                    onChange={handleChange}
                    className="h-4 w-4 text-primary border-border rounded focus:ring-primary"
                  />
                  <label
                    htmlFor="starred"
                    className="text-sm font-medium text-text-secondary flex items-center gap-1 cursor-pointer select-none"
                  >
                    <Star
                      size={14}
                      className={
                        formData.starred
                          ? "fill-yellow-400 text-yellow-400"
                          : ""
                      }
                    />
                    Mark as Important
                  </label>
                </div>
              </div>
            )}
          </form>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-border bg-surface flex justify-end gap-3">
          <button
            type="button"
            onClick={handleCloseAndReset}
            className="px-4 py-2.5 text-sm font-medium text-text-secondary bg-transparent hover:bg-background border border-transparent rounded-xl transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            form="edit-form"
            className="px-6 py-2.5 text-sm font-bold text-white bg-primary hover:bg-secondary rounded-xl shadow-lg transition-all transform hover:-translate-y-0.5 flex items-center gap-2"
          >
            <Plus size={18} />
            Edit {typeMenu ? typeMenu : ""}
          </button>
        </div>
      </div>
    </div>
  );
};
