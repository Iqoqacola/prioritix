import { Outlet, useNavigate } from "react-router";
import Header from "./AppHeader";
import { useEffect } from "react";
import { useAuthContext } from "../../../hooks/useAuthContext";

const AppLayout = () => {
  const { user } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/");
      console.log(user);
    }
  }, [user]);

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
