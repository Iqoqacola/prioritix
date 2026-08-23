"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Folder, Plus, ChevronDown } from "lucide-react";

import { useProjectsContext } from "../../hooks/Projects/useProjectsContext";
import { ProjectModal } from "./Modal";

type Project = {
  id: number;
  title: string;
  color: string;
};

type ProjectsSectionProps = {
  initialProjects: Project[];
};

const API_URL = "http://localhost:3000";

export default function ProjectsSection({
  initialProjects,
}: ProjectsSectionProps) {
  const { projects, dispatchProjects } = useProjectsContext();

  const [isOpen, setIsOpen] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const titleProject = "";
  const colorProject = "#38bdf8";
  const titleModal: string = "Create";

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    dispatchProjects({
      type: "SET_PROJECTS",
      payload: initialProjects,
    });
  }, [initialProjects, dispatchProjects]);

  const closeModal = () => {
    setShowModal(false);
    setError("");
  };

  const handleCreateProject = async (
    title: string,
    color: string,
  ): Promise<boolean> => {
    if (!title.trim()) {
      setError("Project name is required");
      return false;
    }

    try {
      setLoading(true);
      setError("");

      const response = await fetch(`${API_URL}/api/projects`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          color,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Failed to create project");
        return false;
      }

      dispatchProjects({
        type: "CREATE_PROJECT",
        payload: data,
      });

      closeModal();
      return true;
    } catch (error) {
      console.error(error);
      setError("Failed to create project");
      return false;
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* PROJECT SECTION */}
      <div className="mt-7">
        {/* HEADER */}
        <div className="mb-2 flex items-center justify-between px-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
            Projects
          </p>

          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            className="rounded-md p-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
          >
            <ChevronDown
              size={16}
              className={`transition-transform duration-200 ${
                isOpen ? "" : "-rotate-90"
              }`}
            />
          </button>
        </div>

        {/* COLLAPSIBLE CONTENT */}
        {isOpen && (
          <>
            {/* PROJECT LIST */}
            <div className="space-y-1">
              {projects.map((project) => (
                <Link
                  key={project.id}
                  href={`/project/${project.id}`}
                  className="flex items-center gap-3 rounded-lg px-2 py-2 text-sm text-slate-700 hover:bg-slate-100"
                >
                  <Folder
                    size={17}
                    style={{
                      color: project.color || "#38bdf8",
                    }}
                  />

                  <span className="truncate">{project.title}</span>
                </Link>
              ))}
            </div>

            {/* ADD PROJECT */}
            <button
              type="button"
              onClick={() => setShowModal(true)}
              className="mt-1 flex w-full items-center gap-3 rounded-lg px-2 py-2 text-sm text-slate-400 hover:bg-slate-100"
            >
              <Plus size={17} />
              Add Project
            </button>
          </>
        )}
      </div>

      {/* MODAL */}
      {showModal && (
        <ProjectModal
          titleModal={titleModal}
          showModal={showModal}
          closeModal={closeModal}
          handleProject={handleCreateProject}
          error={error}
          loading={loading}
          titleProject={titleProject}
          colorProject={colorProject}
        />
      )}
    </>
  );
}
