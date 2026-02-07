import { useContext } from "react";
import { TasksContext } from "../../context/TasksContext";

export const useTasksContext = () => {
  const context = useContext(TasksContext);

  if (!context) {
    throw Error("useAuthContext must be used inside an AuthContextProvider");
  }

  return context;
};
