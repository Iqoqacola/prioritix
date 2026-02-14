import { Search } from "lucide-react";
import { useSearchParams, useNavigate, useLocation } from "react-router";

const SearchBar = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();

  const searchQuery = searchParams.get("q") || "";

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (
      location.pathname !== "/all-tasks" &&
      !location.pathname.startsWith("/project")
    ) {
      navigate(`/all-tasks?q=${encodeURIComponent(value)}`);
      return;
    }

    setSearchParams(
      (prev) => {
        if (value) {
          prev.set("q", value);
        } else {
          prev.delete("q");
        }
        return prev;
      },
      { replace: true },
    );
  };

  return (
    <div className="relative w-full max-w-md">
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
        <Search size={18} />
      </div>
      <input
        type="text"
        className="w-full rounded-xl border border-border bg-surface py-2 pl-10 pr-4 text-sm text-text-primary outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/10 placeholder:text-text-secondary"
        placeholder="Search ..."
        value={searchQuery}
        onChange={handleSearch}
      />
    </div>
  );
};

export default SearchBar;
