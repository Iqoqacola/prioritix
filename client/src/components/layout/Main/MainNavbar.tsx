import { Link } from "react-router";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <div className="flex items-center gap-4">
        <div className="hidden md:flex items-center gap-4">
          <Link
            to="/login"
            className="text-text-secondary font-medium hover:text-primary px-4 py-2 transition-colors"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="bg-primary text-white px-5 py-2.5 rounded-lg font-medium hover:bg-secondary transition shadow-lg shadow-blue-600/20"
          >
            Sign Up
          </Link>
        </div>

        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-text-secondary hover:text-primary focus:outline-none p-2"
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="absolute top-16 left-0 w-full bg-white border-b border-gray-200 shadow-xl flex flex-col p-4 gap-3 md:hidden animate-in slide-in-from-top-5">
          <Link
            to="/login"
            className="text-center text-text-secondary font-bold py-3 border border-gray-200 rounded-lg hover:bg-gray-50"
            onClick={() => setIsMenuOpen(false)}
          >
            Login
          </Link>
          <Link
            to="/register"
            className="text-center bg-primary text-white font-bold py-3 rounded-lg shadow-md hover:bg-secondary"
            onClick={() => setIsMenuOpen(false)}
          >
            Sign Up
          </Link>
        </div>
      )}
    </>
  );
};

export default Navbar;
