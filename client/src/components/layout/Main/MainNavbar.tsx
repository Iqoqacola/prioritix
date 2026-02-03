import { Link } from "react-router";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { HamburgerMain } from "../../ui/Menu";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const onClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <div className="flex items-center gap-4">
        <div className="hidden md:flex items-center gap-4">
          <Link
            to="/signin"
            className="text-text-secondary font-medium hover:text-primary px-4 py-2 transition-colors"
          >
            Sign In
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

      {isMenuOpen && HamburgerMain({ onClick })}
    </>
  );
};

export default Navbar;
