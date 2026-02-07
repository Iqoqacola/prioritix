import { Menu } from "lucide-react";
import Navbar from "./AppNavbar";
import SearchBar from "../../ui/SearchBar";

const Header = ({ onMenuClick }) => {
  return (
    <header className="h-16 bg-white border-b border-gray-200 z-30 flex items-center px-4 md:px-6">
      <div className="flex justify-between items-center w-full">
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuClick}
            className="p-2 -ml-2 text-gray-600 rounded-md md:hidden hover:bg-gray-100"
          >
            <Menu size={24} />
          </button>
          <SearchBar />
        </div>

        <Navbar />
      </div>
    </header>
  );
};

export default Header;
