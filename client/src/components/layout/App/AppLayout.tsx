import { useState } from "react";
import { Outlet } from "react-router";
import Header from "./AppHeader";
import Sidebar from "./AppSidebar";

const AppLayout = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const onMenuClick = () => {
    setIsMobileMenuOpen(true);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      <Sidebar
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />

      <div className="flex-1 flex flex-col min-w-0">
        <Header onMenuClick={onMenuClick} />

        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
