import { Link } from "react-router";

export const HamburgerMain = ({ onClick }) => {
  return (
    <div className="absolute top-16 left-0 w-full bg-white border-b border-gray-200 shadow-xl flex flex-col p-4 gap-3 md:hidden animate-in slide-in-from-top-5">
      <Link
        to="/signin"
        className="text-center text-text-secondary font-bold py-3 border border-gray-200 rounded-lg hover:bg-gray-50"
        onClick={onClick}
      >
        Sign In
      </Link>
      <Link
        to="/signup"
        className="text-center bg-primary text-white font-bold py-3 rounded-lg shadow-md hover:bg-secondary"
        onClick={onClick}
      >
        Sign Up
      </Link>
    </div>
  );
};
