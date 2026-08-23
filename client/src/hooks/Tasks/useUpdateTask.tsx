"use client";

import { useState } from "react";
import { useTasksContext } from "./useTasksContext";

type TaskUpdate = {
  id: number;
  title?: string;
  project_id?: number | string;
  description?: string;
  status?: string;
  priority?: string;
  due_date?: string;
  tags?: string;
  starred?: boolean;
};
export const useUpdateTask = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [succes, setSucces] = useState<string | null>(null);

  const { dispatchTasks } = useTasksContext();

  const updateTask = async (taskUpdate: TaskUpdate) => {
    setIsLoading(true);
    setError(null);
    setSucces(null);

    try {
      const response = await fetch(
        `http://localhost:3000/api/tasks/${taskUpdate.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(taskUpdate),
        },
      );

      const json = await response.json();

      if (!response.ok) {
        setError(json.error || json.message || "Failed to update task");
        return;
      }

      setSucces(json.message);

      dispatchTasks({
        type: "UPDATE_TASK",
        payload: json.task,
      });
    } catch (err) {
      console.error("Update task failed:", err);
      setError("Failed to connect to server");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    updateTask,
    isLoading,
    error,
    succes,
  };
};
