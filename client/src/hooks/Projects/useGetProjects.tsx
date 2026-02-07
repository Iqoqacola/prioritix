import { useState } from "react";
import { useProjectsContext } from "./useProjectsContext";

export const useGetProjects = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { dispatchProjects } = useProjectsContext();

  const getProjects = async () => {
    setIsLoading(true);
    setError(null);

    const jwt_token = JSON.parse(localStorage.getItem("token"));

    const response = await fetch("/api/projects", {
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
      dispatchProjects({ type: "SET_PROJECTS", payload: json });
      setIsLoading(false);
    }
  };

  return { getProjects, isLoading, error };
};
