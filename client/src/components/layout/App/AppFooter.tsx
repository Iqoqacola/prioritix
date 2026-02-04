import { NavLink } from "react-router";
import { Settings, LogOut } from "lucide-react";
import { useSignout } from "../../../hooks/useSignOut";

const Footer = () => {
  const { signout } = useSignout();

  const handleSignOut = () => {
    signout();
  };
  return (
    <div className="p-4 border-t border-gray-100 space-y-2">
      <NavLink
        to="/settings"
        className={({ isActive }) =>
          `flex w-full items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors
            ${isActive ? "bg-gray-100 text-gray-900" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"}`
        }
      >
        <Settings size={20} strokeWidth={1.5} />
        Settings
      </NavLink>

      <button
        className="flex w-full items-center gap-3 px-3 py-2 text-sm font-medium text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
        onClick={handleSignOut}
      >
        <LogOut size={20} strokeWidth={1.5} />
        Sign out
      </button>
    </div>
  );
};

export default Footer;
