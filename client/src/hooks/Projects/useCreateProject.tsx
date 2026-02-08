import { useState } from "react";
import { useProjectsContext } from "./useProjectsContext";

export const useCreateProject = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [succes, setSucces] = useState(null);
  const { dispatchProjects } = useProjectsContext();

  const createProject = async (title, color) => {
    setIsLoading(true);
    setError(null);
    setSucces(null);

    const jwt_token = JSON.parse(localStorage.getItem("token"));

    const response = await fetch("/api/projects/", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${jwt_token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        color,
      }),
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setIsLoading(false);
    }
    if (response.ok) {
      dispatchProjects({ type: "CREATE_PROJECT", payload: json });
      console.log(json);

      setIsLoading(false);
    }
  };

  return { createProject };
};
