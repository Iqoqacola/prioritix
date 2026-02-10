import { useState } from "react";
import { useProjectsContext } from "./useProjectsContext";

export const useRemoveProject = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [succes, setSucces] = useState(null);

  const { projects, dispatchProjects } = useProjectsContext();

  const removeProject = async (id) => {
    setIsLoading(true);
    setError(null);
    setSucces(null);

    const jwt_token = JSON.parse(localStorage.getItem("token"));

    const response = await fetch(`/api/projects/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt_token}`,
      },
    });

    const json = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
    }

    if (response.ok) {
      setIsLoading(false);
      dispatchProjects({ type: "REMOVE_PROJECT", payload: { id } });
    }
  };

  return { removeProject, isLoading, error };
};
