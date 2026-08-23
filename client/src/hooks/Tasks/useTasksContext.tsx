"use client";

import { useContext } from "react";
import { TasksContext } from "../../context/TasksContext";

export const useTasksContext = () => {
  const context = useContext(TasksContext);

  if (!context) {
    throw new Error(
      "useTasksContext must be used inside a TasksContextProvider",
    );
  }

  return context;
};
