import { Routes, Route } from "react-router";
import MainLayout from "./components/layout/Main/MainLayout";
import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Error from "./pages/Error";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import AppLayout from "./components/layout/App/AppLayout";
import Settings from "./pages/Settings";
import Profile from "./pages/Profile";
import AllTasks from "./pages/AllTasks";

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<LandingPage />} />
      </Route>

      <Route path="/signin" element={<Signin />} />
      <Route path="/signup" element={<Signup />} />

      <Route element={<ProtectedRoute />}>
        <Route element={<AppLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/all-tasks" element={<AllTasks />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
      </Route>

      <Route path="*" element={<Error />} />
    </Routes>
  );
}

export default App;
