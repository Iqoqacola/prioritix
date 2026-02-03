import React from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

const Profile = () => {
  const { user } = useAuthContext();

  return (
    <div className="h-[calc(100vh-64px)] bg-background p-6 flex justify-center items-center overflow-hidden">
      <div className="w-full max-w-2xl bg-surface rounded-2xl shadow-sm border border-border overflow-hidden">
        <div className="p-8">
          <div className="flex flex-col items-center mb-8">
            {/* Avatar Section */}
            <div className="relative mb-4">
              <span className="flex h-32 w-32 shrink-0 overflow-hidden rounded-full bg-surface ring-4 ring-primary/10 shadow-sm">
                <img
                  className="aspect-square h-full w-full object-cover"
                  src={user?.avatar_path}
                  alt="User Avatar"
                />
              </span>
              <div className="absolute bottom-2 right-2 h-4 w-4 bg-success rounded-full border-2 border-surface"></div>
            </div>

            {/* Name & Email Center */}
            <div className="text-center">
              <h1 className="text-2xl font-bold text-text-primary leading-tight">
                {user?.full_name}
              </h1>
              <p className="text-text-secondary text-sm">{user?.email}</p>
            </div>

            {/* Badge Role */}
            <span
              className={`mt-3 px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border transition-all ${
                user?.role === "premium"
                  ? "bg-warning text-white border-warning shadow-[0_0_10px_rgba(245,158,11,0.3)]"
                  : user?.role === "pro"
                    ? "bg-accent text-white border-accent"
                    : "bg-info/10 text-secondary border-info/20"
              }`}
            >
              {user?.role} Account
            </span>
          </div>

          {/* User Information Grid */}
          <div className="space-y-4 border-t border-border pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-background border border-border">
                <span className="block text-[10px] font-bold text-muted uppercase tracking-tight mb-1">
                  Full Name
                </span>
                <span className="text-text-primary font-semibold truncate block">
                  {user?.full_name}
                </span>
              </div>
              <div className="p-4 rounded-xl bg-background border border-border">
                <span className="block text-[10px] font-bold text-muted uppercase tracking-tight mb-1">
                  Email Address
                </span>
                <span className="text-text-primary font-semibold truncate block">
                  {user?.email}
                </span>
              </div>
              <div className="p-4 rounded-xl bg-background border border-border">
                <span className="block text-[10px] font-bold text-muted uppercase tracking-tight mb-1">
                  User Role
                </span>
                <span className="text-text-primary font-semibold capitalize block">
                  {user?.role}
                </span>
              </div>
              <div className="p-4 rounded-xl bg-background border border-border">
                <span className="block text-[10px] font-bold text-muted uppercase tracking-tight mb-1">
                  Joined Since
                </span>
                <span className="text-text-primary font-semibold block">
                  {user?.created_at
                    ? new Intl.DateTimeFormat("en-US", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                      }).format(new Date(user.created_at))
                    : "Date not available"}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-6">
              <Link
                to="/settings"
                className="block w-full text-center bg-surface hover:bg-background text-text-secondary border border-border font-semibold py-3 rounded-xl transition-all active:scale-[0.98]"
              >
                Account Settings
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
