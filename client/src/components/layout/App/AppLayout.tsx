import { useState } from "react";
import { Outlet } from "react-router";
import Header from "./AppHeader";
import Sidebar from "./AppSidebar";
import { CreateMenuActions } from "../../ui/Menu";

const AppLayout = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCreateMenuActionOpen, setIsCreateMenuActionOpen] = useState(false);
  const [typeMenu, setTypeMenu] = useState("");

  const handleAddProject = () => {
    setIsCreateMenuActionOpen((prev) => !prev);
    setTypeMenu("project");
  };

  const handleAddTeam = () => {
    setIsCreateMenuActionOpen((prev) => !prev);
    setTypeMenu("task");
  };

  const handleCloseCreateMenuAction = () => {
    setIsCreateMenuActionOpen(false);
  };

  const onMenuClick = () => {
    setIsMobileMenuOpen(true);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      <Sidebar
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        handleAddProject={handleAddProject}
        handleAddTeam={handleAddTeam}
      />

      <div className="flex-1 flex flex-col min-w-0">
        <Header onMenuClick={onMenuClick} />

        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <Outlet />
        </main>
      </div>

      <CreateMenuActions
        isOpen={isCreateMenuActionOpen}
        handleCloseButton={handleCloseCreateMenuAction}
        typeMenu={typeMenu}
      />
    </div>
  );
};

export default AppLayout;
