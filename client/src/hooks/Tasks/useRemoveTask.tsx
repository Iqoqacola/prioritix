import { useState } from "react";
import { useTasksContext } from "./useTasksContext";

export const useRemoveTask = () => {
  const { dispatchTasks } = useTasksContext();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const removeTask = async (id) => {
    setIsLoading(true);
    setError(null);

    const jwt_token = JSON.parse(localStorage.getItem("token"));
    const response = await fetch(`/api/tasks/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt_token}`,
      },
    });

    const json = response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
    }

    if (response.ok) {
      setIsLoading(false);
      dispatchTasks({ type: "REMOVE_TASK", payload: { id } });
    }
  };

  return { removeTask, isLoading, error };
};
