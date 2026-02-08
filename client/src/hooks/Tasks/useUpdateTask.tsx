import { useState } from "react";
import { useTasksContext } from "./useTasksContext";

export const useUpdateTask = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [succes, setSucces] = useState(null);
  const { dispatchTasks } = useTasksContext();

  const jwt_token = JSON.parse(localStorage.getItem("token"));

  const updateTask = async (taskUpdate) => {
    setIsLoading(true);
    setError(null);
    setSucces(null);

    const response = await fetch(`/api/tasks/${taskUpdate.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt_token}`,
      },

      body: JSON.stringify(taskUpdate),
    });

    const json = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
    }

    if (response.ok) {
      setIsLoading(false);
      setSucces(json.message);

      dispatchTasks({ type: "UPDATE_TASK", payload: json.task });
    }
  };

  return { updateTask, isLoading, error, succes };
};
