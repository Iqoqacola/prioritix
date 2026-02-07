import { Link } from "react-router";
import { Users, X } from "lucide-react";
import Logo from "../../ui/Logo";
import Footer from "./AppFooter";
import {
  SidebarHighlightsMenu,
  SidebarMainMenu,
  SidebarProjectsMenu,
  SidebarTeamsMenu,
} from "../../ui/Menu";
import { highlightsMenu, mainMenus } from "../../../constants/appSideBarMenu";
import { useEffect } from "react";
import { useProjectsContext } from "../../../hooks/Projects/useProjectsContext";
import { useGetProjects } from "../../../hooks/Projects/useGetProjects";
import { useGetTasks } from "../../../hooks/Tasks/useGetTasks";
import { useTasksContext } from "../../../hooks/Tasks/useTasksContext";

const Sidebar = ({ isOpen, onClose, handleAddProject, handleAddTeam }) => {
  const { getTasks } = useGetTasks();
  const { tasks } = useTasksContext();
  const { getProjects } = useGetProjects();
  const { projects } = useProjectsContext();

  const teamsMenu = [
    { label: "Design Team", path: "/team/design", icon: Users },
    { label: "Marketing", path: "/team/marketing", icon: Users },
  ];

  const handleLinkClick = () => {
    if (window.innerWidth < 768 && onClose) {
      onClose();
    }
  };

  useEffect(() => {
    getProjects();
    getTasks();
  }, [projects, tasks]);

  return (
    <>
      {/* OVERLAY MOBILE */}
      <div
        className={`fixed inset-0 z-40 bg-gray-900/50 backdrop-blur-sm transition-opacity md:hidden
          ${isOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"}`}
        onClick={onClose}
      />
      <aside
        className={`
          fixed md:static inset-y-0 left-0 z-50 
          w-64 bg-white border-r border-gray-200 h-screen flex flex-col font-sans text-gray-700
          transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        <div className="h-16 flex items-center justify-between px-6 border-b border-gray-100 mb-2">
          <Link to="/dashboard" onClick={handleLinkClick}>
            <Logo />
          </Link>

          <button
            onClick={onClose}
            className="md:hidden p-1 text-gray-500 hover:bg-gray-100 rounded-md"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-3 space-y-6 pb-4">
          {/* MAIN MENU */}
          <SidebarMainMenu
            mainMenus={mainMenus}
            handleLinkClick={handleLinkClick}
          />

          {/* HIGHLIGHTS */}
          <SidebarHighlightsMenu
            highlightsMenu={highlightsMenu}
            handleLinkClick={handleLinkClick}
          />

          {/* PROJECTS */}
          <SidebarProjectsMenu
            projects={projects}
            handleLinkClick={handleLinkClick}
            handleAddProject={handleAddProject}
          />

          {/* TEAMS */}
          <SidebarTeamsMenu
            teams={teamsMenu}
            handleLinkClick={handleLinkClick}
            handleAddTeam={handleAddTeam}
          />
        </div>

        {/* FOOTER */}
        <Footer handleLinkClick={handleLinkClick} />
      </aside>
    </>
  );
};

export default Sidebar;
