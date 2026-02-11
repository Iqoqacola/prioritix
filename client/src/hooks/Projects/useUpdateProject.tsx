import { useState } from "react";
import { useProjectsContext } from "./useProjectsContext";

export const useUpdateProject = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [succes, setSucces] = useState(null);
  const { dispatchProjects } = useProjectsContext();

  const jwt_token = JSON.parse(localStorage.getItem("token"));

  const updateProject = async (projectUpdate) => {
    setIsLoading(true);
    setError(null);
    setSucces(null);

    const response = await fetch(`/api/projects/${projectUpdate.id_project}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt_token}`,
      },

      body: JSON.stringify({
        title: projectUpdate.title_project,
        color: projectUpdate.color,
      }),
    });

    const json = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
    }

    if (response.ok) {
      setIsLoading(false);
      setSucces(json.message);

      dispatchProjects({ type: "UPDATE_PROJECT", payload: json.project });
    }
  };

  return { updateProject, isLoading, error, succes };
};
