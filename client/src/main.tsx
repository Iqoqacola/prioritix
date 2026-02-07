import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { AuthContextProvider } from "./context/AuthContext.tsx";
import { BrowserRouter } from "react-router";
import { TasksContextProvider } from "./context/TasksContext.tsx";
import { ProjectsContextProvider } from "./context/ProjectsContext.tsx";

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
