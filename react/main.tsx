import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { AuthContextProvider } from "../client/src/context/AuthContext.tsxext.tsx";
import { BrowserRouter } from "react-router";
import { TasksContextProvider } from "../client/src/context/TasksContext.tsxext.tsx";
import { ProjectsContextProvider } from "../client/src/context/ProjectsContext.tsxext.tsx";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <StrictMode>
      <AuthContextProvider>
        <ProjectsContextProvider>
          <TasksContextProvider>
            <App />
          </TasksContextProvider>
        </ProjectsContextProvider>
      </AuthContextProvider>
    </StrictMode>
  </BrowserRouter>,
);
