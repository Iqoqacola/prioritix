import { useContext } from "react";
import { ProjectsContext } from "../../context/ProjectsContext";

export const useProjectsContext = () => {
  const context = useContext(ProjectsContext);

  if (!context) {
    throw Error("useAuthContext must be used inside an AuthContextProvider");
  }

  return context;
};
