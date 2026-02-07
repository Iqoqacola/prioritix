import { useState } from "react";
import { useTasksContext } from "./useTasksContext";

export const useGetTasks = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { dispatchTasks } = useTasksContext();

  const getTasks = async () => {
    setIsLoading(true);
    setError(null);

    const jwt_token = JSON.parse(localStorage.getItem("token"));

    const response = await fetch("/api/tasks/", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwt_token}`,
      },
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setIsLoading(false);
    }

    if (response.ok) {
      dispatchTasks({ type: "SET_TASKS", payload: json });
      setIsLoading(false);
    }
  };

  return { getTasks };
};
