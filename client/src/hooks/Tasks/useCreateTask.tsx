"use client";

import { useState } from "react";
import { useTasksContext } from "./useTasksContext";

type TaskCreate = {
  title?: string;
  project_id?: number | string;
  description?: string;
  status?: string;
  priority?: string;
  due_date?: string;
  tags?: string;
  starred?: boolean;
};

export const useCreateTask = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [succes, setSucces] = useState<string | null>(null);

  const { dispatchTasks } = useTasksContext();

  const createTask = async (createTask: TaskCreate) => {
    setIsLoading(true);
    setError(null);
    setSucces(null);

    try {
      const response = await fetch("http://localhost:3000/api/tasks/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(createTask),
      });

      const json = await response.json();

      if (!response.ok) {
        setError(json.error || json.message || "Failed to create task");
        return;
      }

      setSucces(json.message);

      dispatchTasks({
        type: "CREATE_TASK",
        payload: json,
      });
    } catch (err) {
      console.error("Create task failed:", err);
      setError("Failed to connect to server");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    createTask,
    isLoading,
    error,
    succes,
  };
};
