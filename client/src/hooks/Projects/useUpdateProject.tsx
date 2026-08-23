"use client";

import { useState } from "react";
import { useProjectsContext } from "./useProjectsContext";

export const useUpdateProject = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [succes, setSucces] = useState<string | null>(null);

  const { dispatchProjects } = useProjectsContext();

  const updateProject = async (
    id_project: number,
    title: string,
    color: string,
  ) => {
    setIsLoading(true);
    setError(null);
    setSucces(null);

    try {
      const response = await fetch(
        `http://localhost:3000/api/projects/${id_project}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            title: title,
            color: color,
          }),
        },
      );

      const json = await response.json();

      if (!response.ok) {
        setError(json.error || json.message || "Failed to update project");
        return;
      }

      setSucces(json.message);

      dispatchProjects({
        type: "UPDATE_PROJECT",
        payload: json.project,
      });
    } catch (err) {
      console.error("Update project failed:", err);
      setError("Failed to connect to server");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    updateProject,
    isLoading,
    error,
    succes,
  };
};
