"use client";

import { useState } from "react";
import { useProjectsContext } from "./useProjectsContext";

export const useRemoveProject = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [succes, setSucces] = useState<string | null>(null);

  const { dispatchProjects } = useProjectsContext();

  const removeProject = async (id: number) => {
    setIsLoading(true);
    setError(null);
    setSucces(null);

    try {
      const response = await fetch(`http://localhost:3000/api/projects/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const json = await response.json();

      if (!response.ok) {
        setError(json.error || json.message || "Failed to remove project");
        return;
      }

      dispatchProjects({
        type: "REMOVE_PROJECT",
        payload: { id },
      });

      setSucces(json.message || "Project removed");
    } catch (err) {
      console.error("Remove project failed:", err);
      setError("Failed to connect to server");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    removeProject,
    isLoading,
    error,
    succes,
  };
};
