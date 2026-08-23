"use client";

import { useState } from "react";
import { useProjectsContext } from "./useProjectsContext";

export const useCreateProject = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [succes, setSucces] = useState<string | null>(null);

  const { dispatchProjects } = useProjectsContext();

  const createProject = async (title: string, color: string) => {
    setIsLoading(true);
    setError(null);
    setSucces(null);

    try {
      const response = await fetch("http://localhost:3000/api/projects/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          title,
          color,
        }),
      });

      const json = await response.json();

      if (!response.ok) {
        setError(json.error || json.message || "Failed to create project");
        return;
      }

      dispatchProjects({
        type: "CREATE_PROJECT",
        payload: json,
      });

      setSucces(json.message || "Project created");
    } catch (err) {
      console.error("Create project failed:", err);
      setError("Failed to connect to server");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    createProject,
    isLoading,
    error,
    succes,
  };
};
