"use client";

import { useState } from "react";
import { useProjectsContext } from "./useProjectsContext";

export const useGetProjects = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { dispatchProjects } = useProjectsContext();

  const getProjects = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:3000/api/projects", {
        method: "GET",
        credentials: "include",
      });

      const json = await response.json();

      if (!response.ok) {
        setError(json.error || json.message || "Failed to get projects");
        return;
      }

      dispatchProjects({
        type: "SET_PROJECTS",
        payload: json,
      });
    } catch (err) {
      console.error("Get projects failed:", err);
      setError("Failed to connect to server");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    getProjects,
    isLoading,
    error,
  };
};
