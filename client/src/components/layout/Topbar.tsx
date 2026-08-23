import { Bell } from "lucide-react";
import SearchBar from "../ui/SearchBar";

type TopbarProps = {
  user: {
    full_name: string;
    email: string;
    avatar_path?: string | null;
  };
};

export default function Topbar({ user }: TopbarProps) {
  return (
    <header className="fixed left-62.5 right-0 top-0 z-30 flex h-13.5 items-center justify-between border-b border-slate-200 bg-white px-6">
      <SearchBar />

      <div className="flex items-center gap-5">
        <button className="text-slate-400 hover:text-slate-700">
          <Bell size={20} />
        </button>

        <div className="h-7 w-px bg-slate-200" />

        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-sm font-medium text-slate-900">
              {user.full_name}
            </p>

            <p className="text-xs text-slate-400">Free</p>
          </div>

          {user.avatar_path ? (
            <img
              src={`http://localhost:3000${user.avatar_path}`}
              alt={user.full_name}
              className="h-9 w-9 rounded-full object-cover"
            />
          ) : (
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-sky-100 text-sm font-semibold text-sky-600">
              {user.full_name.charAt(0).toUpperCase()}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
