import { CheckCircle, Circle, Calendar, Plus, Filter } from "lucide-react";
import { ProjectSectionCard } from "../components/ui/Card";
import { useProjectsContext } from "../hooks/Projects/useProjectsContext";
import { useTasksContext } from "../hooks/Tasks/useTasksContext";
import { useEffect, useState } from "react";
import { useGetTasks } from "../hooks/Tasks/useGetTasks";
import { CreateMenuActions } from "../components/ui/Menu";

const AllTasks = () => {
  const [isCreateMenuOpen, setIsCreateMenuOpen] = useState(false);
  const { projects } = useProjectsContext();
  const { tasks } = useTasksContext();

  const handleCreateMenu = () => {
    setIsCreateMenuOpen((prev) => !prev);
  };

  return (
    <>
      <CreateMenuActions
        isOpen={isCreateMenuOpen}
        typeMenu={"task"}
        handleCloseButton={handleCreateMenu}
      />
      <div className="w-full min-h-screen bg-background p-6 md:p-8 pb-20">
        <div className="w-full flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          {/* Title */}
          <div>
            <h1 className="text-3xl font-bold text-text-primary">
              All My Tasks
            </h1>
            <p className="text-text-secondary mt-1">
              Overview of all tasks across projects
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-border text-text-secondary rounded-lg text-sm font-medium hover:bg-gray-50 hover:text-text-primary transition-colors shadow-sm">
              <Filter size={16} />
              Filter
            </button>

            <button
              className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-secondary shadow-sm shadow-blue-200 transition-colors"
              onClick={handleCreateMenu}
            >
              <Plus size={16} />
              New Task
            </button>
          </div>
        </div>

        {/* PROJECTS STACK */}
        <div className="w-full flex flex-col gap-8">
          {projects?.map((project) => (
            <ProjectSectionCard
              key={project.id}
              project={project}
              tasks={tasks}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default AllTasks;
