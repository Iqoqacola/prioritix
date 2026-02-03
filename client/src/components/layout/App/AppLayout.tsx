import { Outlet } from "react-router";
import Header from "./AppHeader";
import { useAuthContext } from "../../../hooks/useAuthContext";

const AppLayout = () => {
  return (
    <div className="min-h-screen bg-white font-sans text-gray-900">
      <Header />

      <main className="pt-16">
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;
