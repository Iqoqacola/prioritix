import { useState } from "react";
import { useTasksContext } from "./useTasksContext";

export const useCreateTask = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [succes, setSucces] = useState(null);
  const { dispatchTasks } = useTasksContext();

  const createTask = async (
    title,
    project_id,
    description,
    status,
    priority,
    due_date,
    tags,
    starred,
  ) => {
    setIsLoading(true);
    setError(null);
    setSucces(null);

    const jwt_token = JSON.parse(localStorage.getItem("token"));

    const response = await fetch("/api/tasks/", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${jwt_token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        project_id,
        description,
        status,
        priority,
        due_date,
        tags,
        starred,
      }),
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setIsLoading(false);
    }
    if (response.ok) {
      setIsLoading(false);
      setSucces(json.message);

      dispatchTasks({ type: "CREATE_TASK", payload: json });
    }
  };

  return { createTask };
};
