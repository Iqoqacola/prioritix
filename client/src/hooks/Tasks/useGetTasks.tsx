"use client";

import { useState } from "react";
import { useTasksContext } from "./useTasksContext";

export const useGetTasks = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { dispatchTasks } = useTasksContext();

  const getTasks = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:3000/api/tasks/", {
        method: "GET",
        credentials: "include",
      });

      const json = await response.json();
      if (!response.ok) {
        setError(json.error || json.message || "Failed to get tasks");
        return;
      }

      dispatchTasks({
        type: "SET_TASKS",
        payload: json,
      });
    } catch (err) {
      console.error("Get tasks failed:", err);
      setError("Failed to connect to server");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    getTasks,
    isLoading,
    error,
  };
};
