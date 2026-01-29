import { Outlet } from "react-router";
// import Header from "./AppHeader";
// import Footer from "./AppFooter";

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-white font-sans text-gray-900">
      {/* <Header /> */}

      <main className="pt-16">
        <Outlet />
      </main>

      {/* <Footer /> */}
    </div>
  );
};

export default MainLayout;
