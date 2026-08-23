"use client";

import { AuthContextProvider } from "../context/AuthContext";
import { ProjectsContextProvider } from "../context/ProjectsContext";
import { TasksContextProvider } from "../context/TasksContext";

export default function Providers({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthContextProvider>
      <ProjectsContextProvider>
        <TasksContextProvider>
          {children}
        </TasksContextProvider>
      </ProjectsContextProvider>
    </AuthContextProvider>
  );
}