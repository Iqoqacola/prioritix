import { Navigate, Outlet } from "react-router";

const ProtectedRoute = () => {
  const isAuthenticated =
    localStorage.getItem("token") && localStorage.getItem("user");

  if (!isAuthenticated) {
    return <Navigate to="/signin" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
