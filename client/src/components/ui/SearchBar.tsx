import { Search } from "lucide-react";

const SearchBar = ({ searchQuery, handleSearch }) => {
  return (
    <div className="relative w-full max-w-md">
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
        <Search size={18} />
      </div>
      <input
        type="text"
        className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2 pl-10 pr-4 text-sm text-gray-800 outline-none transition-all focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100 placeholder:text-gray-400"
        placeholder="Search ..."
        value={searchQuery}
        onChange={handleSearch}
      />
      <div className="absolute inset-y-0 right-0 hidden items-center pr-3 sm:flex"></div>
    </div>
  );
};

export default SearchBar;
