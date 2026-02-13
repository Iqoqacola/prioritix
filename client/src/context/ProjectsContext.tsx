import { createContext, useReducer } from "react";

export const ProjectsContext = createContext([]);

export const projectsReducer = (state, action) => {
  switch (action.type) {
    case "SET_PROJECTS":
      return { projects: action.payload };
    case "CREATE_PROJECT":
      return { projects: [...state.projects, action.payload] };
    case "REMOVE_PROJECT":
      return {
        projects: state.projects.filter((p) => p.id !== action.payload.id),
      };
    case "UPDATE_PROJECT":
      return {
        projects: state.projects.map((p) =>
          p.id === action.payload.id ? action.payload : p,
        ),
      };
    default:
      return state;
  }
};

export const ProjectsContextProvider = ({ children }) => {
  const [state, dispatchProjects] = useReducer(projectsReducer, {
    projects: null,
  });

  return (
    <ProjectsContext.Provider value={{ ...state, dispatchProjects }}>
      {children}
    </ProjectsContext.Provider>
  );
};
