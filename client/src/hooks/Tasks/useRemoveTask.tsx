"use client";

import { useState } from "react";
import { useTasksContext } from "./useTasksContext";

export const useRemoveTask = () => {
  const { dispatchTasks } = useTasksContext();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const removeTask = async (id: number) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`http://localhost:3000/api/tasks/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const json = await response.json();

      if (!response.ok) {
        setError(json.error);
        return;
      }

      dispatchTasks({
        type: "REMOVE_TASK",
        payload: { id },
      });
    } catch (err) {
      console.error("Remove task failed:", err);
      setError("Failed to remove task");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    removeTask,
    isLoading,
    error,
  };
};
