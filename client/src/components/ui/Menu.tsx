import { Link, NavLink } from "react-router";
import { ChevronRight, ChevronDown, Plus } from "lucide-react";
import { useState } from "react";

export const HamburgerMain = ({ onClick }) => {
  return (
    <div className="absolute top-16 left-0 w-full bg-white border-b border-gray-200 shadow-xl flex flex-col p-4 gap-3 md:hidden animate-in slide-in-from-top-5">
      <Link
        to="/signin"
        className="text-center text-text-secondary font-bold py-3 border border-gray-200 rounded-lg hover:bg-gray-50"
        onClick={onClick}
      >
        Sign In
      </Link>
      <Link
        to="/signup"
        className="text-center bg-primary text-white font-bold py-3 rounded-lg shadow-md hover:bg-secondary"
        onClick={onClick}
      >
        Sign Up
      </Link>
    </div>
  );
};

export const SidebarMainMenu = ({ mainMenus, handleLinkClick }) => {
  return (
    <nav className="space-y-1">
      {mainMenus.map((menu) => (
        <NavLink
          key={menu.label}
          to={menu.path}
          onClick={handleLinkClick}
          className={({ isActive }) =>
            `flex items-center justify-between px-3 py-2 rounded-md text-sm font-medium transition-colors
                   ${isActive ? "bg-blue-50 text-blue-700" : "hover:bg-gray-100 text-gray-600"}`
          }
        >
          <div className="flex items-center gap-3">
            <menu.icon size={18} />
            {menu.label}
          </div>
          {menu.badge && (
            <span className="bg-blue-100 text-blue-600 text-xs font-bold px-2 py-0.5 rounded-full">
              {menu.badge}
            </span>
          )}
        </NavLink>
      ))}
    </nav>
  );
};

export const SidebarHighlightsMenu = ({ highlightsMenu, handleLinkClick }) => {
  return (
    <div>
      <div className="px-3 mb-2 flex items-center justify-between">
        <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
          Highlights
        </span>
      </div>
      <nav className="space-y-1">
        {highlightsMenu.map((menu) => (
          <NavLink
            key={menu.label}
            to={menu.path}
            onClick={handleLinkClick}
            className={({ isActive }) =>
              `flex items-center justify-between px-3 py-2 rounded-md text-sm font-medium transition-colors
                   ${isActive ? "bg-blue-50 text-blue-700" : "hover:bg-gray-100 text-gray-600"}`
            }
          >
            <div className="flex items-center gap-3">
              <menu.icon size={18} />
              {menu.label}
            </div>
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export const SidebarProjectsMenu = ({ projects, handleLinkClick }) => {
  const [isProjectsOpen, setIsProjectsOpen] = useState(true);
  return (
    <div>
      {" "}
      <div
        className="flex items-center justify-between px-3 mb-1 cursor-pointer group"
        onClick={() => setIsProjectsOpen(!isProjectsOpen)}
      >
        <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider group-hover:text-gray-600 transition-colors">
          Projects
        </span>
        {isProjectsOpen ? (
          <ChevronDown size={14} className="text-gray-400" />
        ) : (
          <ChevronRight size={14} className="text-gray-400" />
        )}
      </div>
      {isProjectsOpen && (
        <div className="space-y-0.5 mt-1">
          {projects.map((project) => (
            <NavLink
              key={project.label}
              to={project.path}
              onClick={handleLinkClick}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors
                       ${isActive ? "bg-gray-100 text-gray-900" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"}`
              }
            >
              <span className={`w-2 h-2 rounded-full ${project.color}`} />
              {project.label}
            </NavLink>
          ))}
          <button className="flex items-center gap-3 px-3 py-2 text-sm text-gray-400 hover:text-blue-600 w-full text-left transition-colors">
            <Plus size={16} />
            <span>Add Project</span>
          </button>
        </div>
      )}
    </div>
  );
};

export const SidebarTeamsMenu = ({ teams, handleLinkClick }) => {
  const [isTeamsOpen, setIsTeamsOpen] = useState(true);

  return (
    <div>
      <div
        className="flex items-center justify-between px-3 mb-1 cursor-pointer group"
        onClick={() => setIsTeamsOpen(!isTeamsOpen)}
      >
        <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider group-hover:text-gray-600 transition-colors">
          Team
        </span>
        {isTeamsOpen ? (
          <ChevronDown size={14} className="text-gray-400" />
        ) : (
          <ChevronRight size={14} className="text-gray-400" />
        )}
      </div>

      {isTeamsOpen && (
        <div className="space-y-0.5 mt-1">
          {teams.map((team) => (
            <NavLink
              key={team.label}
              to={team.path}
              onClick={handleLinkClick}
              className="flex items-center gap-3 px-3 py-2 rounded-md text-sm text-gray-600 hover:bg-gray-50"
            >
              <team.icon size={16} />
              {team.label}
            </NavLink>
          ))}
          <button className="flex items-center gap-3 px-3 py-2 text-sm text-gray-400 hover:text-blue-600 w-full text-left transition-colors">
            <Plus size={16} />
            <span>Join a Workspace</span>
          </button>
        </div>
      )}
    </div>
  );
};
