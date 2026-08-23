"use client";

import { createContext, useReducer, ReactNode, Dispatch } from "react";

export type Project = {
  id: number;
  title: string;
  color?: string;
  [key: string]: any;
};

type ProjectsState = {
  projects: Project[];
};

type ProjectsAction =
  | {
      type: "SET_PROJECTS";
      payload: Project[];
    }
  | {
      type: "CREATE_PROJECT";
      payload: Project;
    }
  | {
      type: "REMOVE_PROJECT";
      payload: Project;
    }
  | {
      type: "UPDATE_PROJECT";
      payload: Project;
    };

type ProjectsContextType = ProjectsState & {
  dispatchProjects: Dispatch<ProjectsAction>;
};

export const ProjectsContext = createContext<ProjectsContextType | null>(null);

export const projectsReducer = (
  state: ProjectsState,
  action: ProjectsAction,
): ProjectsState => {
  switch (action.type) {
    case "SET_PROJECTS":
      return {
        projects: action.payload,
      };

    case "CREATE_PROJECT":
      return {
        projects: [...state.projects, action.payload],
      };

    case "REMOVE_PROJECT":
      return {
        projects: state.projects.filter(
          (project) => project.id !== action.payload.id,
        ),
      };

    case "UPDATE_PROJECT":
      return {
        projects: state.projects.map((project) =>
          project.id === action.payload.id ? action.payload : project,
        ),
      };

    default:
      return state;
  }
};

type ProjectsContextProviderProps = {
  children: ReactNode;
};

export const ProjectsContextProvider = ({
  children,
}: ProjectsContextProviderProps) => {
  const [state, dispatchProjects] = useReducer(projectsReducer, {
    projects: [],
  });

  return (
    <ProjectsContext.Provider
      value={{
        ...state,
        dispatchProjects,
      }}
    >
      {children}
    </ProjectsContext.Provider>
  );
};
