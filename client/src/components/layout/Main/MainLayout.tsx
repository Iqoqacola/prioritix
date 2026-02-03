import { Outlet, useNavigate } from "react-router";
import Header from "./MainHeader";
import Footer from "../Footer";
import { useEffect } from "react";
import { useAuthContext } from "../../../hooks/useAuthContext";

const MainLayout = () => {
  const { user } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user]);
  return (
    <div className="min-h-screen bg-white font-sans text-gray-900">
      <Header />

      <main className="pt-16">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default MainLayout;
