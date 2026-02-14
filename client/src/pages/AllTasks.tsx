import { CheckCircle, Circle, Calendar, Plus, Filter } from "lucide-react";
import { ProjectSectionCard } from "../components/ui/Card";
import { useProjectsContext } from "../hooks/Projects/useProjectsContext";
import { useTasksContext } from "../hooks/Tasks/useTasksContext";
import { useEffect, useState, useMemo } from "react";
import { useGetTasks } from "../hooks/Tasks/useGetTasks";
import { CreateMenuActions } from "../components/ui/Menu";
import { FilterButton, NewTaskButton } from "../components/ui/Button";
import { useSearchParams } from "react-router";

const AllTasks = () => {
  const [isCreateMenuOpen, setIsCreateMenuOpen] = useState(false);
  const [searchParams] = useSearchParams();

  const { projects } = useProjectsContext();
  const { getTasks } = useGetTasks();
  const { tasks } = useTasksContext();

  const searchQuery = (searchParams.get("q") || "").toLowerCase();

  useEffect(() => {
    getTasks();
  }, []);

  const handleCreateMenu = () => {
    setIsCreateMenuOpen((prev) => !prev);
  };

  const filteredProjectsWithTasks = useMemo(() => {
    if (!projects || !tasks) return [];

    return projects
      .map((project) => {
        const isProjectMatch = project.title
          .toLowerCase()
          .includes(searchQuery);

        const tasksInProject = tasks.filter((task) => {
          if (task.project_id !== project.id) return false;
          if (isProjectMatch) return true;

          const matchesTitle = task.title.toLowerCase().includes(searchQuery);
          const matchesDesc = task.description
            ?.toLowerCase()
            .includes(searchQuery);

          const matchesStatus =
            task.status.toLowerCase().includes(searchQuery) ||
            (searchQuery === "done" &&
              task.status.toLowerCase() === "completed");

          return matchesTitle || matchesDesc || matchesStatus;
        });

        return {
          ...project,
          filteredTasks: tasksInProject,
        };
      })
      .filter((project) => {
        return (
          project.title.toLowerCase().includes(searchQuery) ||
          project.filteredTasks.length > 0
        );
      });
  }, [projects, tasks, searchQuery]);

  return (
    <>
      <CreateMenuActions
        isOpen={isCreateMenuOpen}
        typeMenu={"task"}
        handleCloseButton={handleCreateMenu}
      />
      <div className="w-full min-h-screen bg-background p-6 md:p-8 pb-20">
        <div className="w-full flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-text-primary">
              All My Tasks
            </h1>
            <p className="text-text-secondary mt-1">
              Search anything: tasks, projects, or status
            </p>
          </div>

          <div className="flex items-center gap-3 ml-8 md:ml-0">
            <FilterButton />
            <NewTaskButton handleCreateMenu={handleCreateMenu} />
          </div>
        </div>

        {/* PROJECTS STACK */}
        <div className="w-full flex flex-col gap-8">
          {filteredProjectsWithTasks.length > 0 ? (
            filteredProjectsWithTasks.map((project) => (
              <ProjectSectionCard
                key={project.id}
                project={project}
                tasks={project.filteredTasks}
              />
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="bg-gray-100 p-4 rounded-full mb-4">
                <Filter className="text-gray-400" size={32} />
              </div>
              <h3 className="text-lg font-medium text-text-primary">
                No results found
              </h3>
              <p className="text-text-secondary">
                We couldn't find anything matching "{searchQuery}"
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AllTasks;
