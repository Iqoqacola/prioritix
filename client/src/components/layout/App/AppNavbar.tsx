// AppNavbar.jsx
import React, { useState, useRef, useEffect } from "react";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { useSignout } from "../../../hooks/useSignOut";
import { NotificationsOpen, ProfileOpen } from "../../ui/DropDown";
import { useClickOutside } from "../../../hooks/useClickOutside";

const Navbar = () => {
  const { user } = useAuthContext();
  const { signout } = useSignout();

  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);

  const profileRef = useRef(null);
  const notifRef = useRef(null);

  // DUMMY DATA NOTIF => get API if already done
  const notifications = [
    // {
    //   id: 1,
    //   text: "New comment on your post",
    //   time: "2 min ago",
    //   unread: true,
    // },
    // {
    //   id: 2,
    //   text: "Server backup completed",
    //   time: "1 hour ago",
    //   unread: true,
    // },
  ];

  const unreadCount = notifications.filter((n) => n.unread).length;

  const handleProfile = () => {
    setIsProfileOpen((prev) => !prev);
  };

  useClickOutside(profileRef, () => {
    setIsProfileOpen(false);
  });

  const handleNotificaton = () => {
    setIsNotifOpen((prev) => !prev);
  };

  useClickOutside(notifRef, () => {
    setIsNotifOpen(false);
  });

  const handleSignOut = () => {
    signout();
  };

  return (
    <div className="flex items-center gap-4">
      {/* NOTIFICATION */}
      <div className="relative" ref={notifRef}>
        <button
          className="relative group p-2 text-muted hover:bg-background hover:text-text-primary rounded-full transition-colors duration-200 focus:outline-none"
          onClick={handleNotificaton}
        >
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
            />
          </svg>

          {unreadCount > 0 && (
            <span className="absolute top-1 right-0 flex h-4 w-4 items-center justify-center rounded-full bg-danger text-[10px] font-bold text-white ring-2 ring-surface">
              {unreadCount}
            </span>
          )}
        </button>

        {isNotifOpen && <NotificationsOpen notifications={notifications} />}
      </div>

      <div className="h-6 w-px bg-border" aria-hidden="true" />

      {/* PROFILE */}
      <div className="relative" ref={profileRef}>
        <button onClick={handleProfile}>
          <div className="flex items-center gap-3 cursor-pointer select-none group">
            <div className="hidden md:flex md:flex-col md:items-start">
              <span className="text-sm font-semibold text-text-primary leading-tight group-hover:text-primary transition-colors">
                {user?.full_name}
              </span>
              <span className="text-xs text-text-secondary capitalize">
                {user?.role}
              </span>
            </div>

            <span className="relative flex h-9 w-9 shrink-0 overflow-hidden rounded-full ring-2 ring-primary ring-offset-2">
              <img
                className="aspect-square h-full w-full object-cover"
                src={user?.avatar_path}
                alt="User Avatar"
              />
            </span>
          </div>
        </button>
        {isProfileOpen && (
          <ProfileOpen user={user} handleSignOut={handleSignOut} />
        )}
      </div>
    </div>
  );
};

export default Navbar;
