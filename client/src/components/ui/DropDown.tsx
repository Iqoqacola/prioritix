export const ProfileOpen = ({ user, handleSignOut }) => {
  return (
    <div className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-surface border border-border py-1 shadow-lg focus:outline-none z-50">
      <div className="px-4 py-2 border-b border-border md:hidden">
        <p className="text-sm font-medium text-text-primary truncate">
          {user?.full_name}
        </p>
        <p className="text-xs text-text-secondary truncate">{user?.role}</p>
      </div>

      <a
        href="/profile"
        className="block px-4 py-2 text-sm text-text-secondary hover:bg-background hover:text-text-primary"
      >
        Your Profile
      </a>
      <a
        href="/settings"
        className="block px-4 py-2 text-sm text-text-secondary hover:bg-background hover:text-text-primary"
      >
        Settings
      </a>

      <div className="border-t border-border my-1"></div>

      <button
        onClick={handleSignOut}
        className="block w-full text-left px-4 py-2 text-sm text-danger hover:bg-background"
      >
        Sign out
      </button>
    </div>
  );
};

export const NotificationsOpen = ({ notifications }) => {
  return (
    <div className="fixed left-4 right-4 mt-2 w-auto md:absolute md:right-0 md:left-auto md:w-80 origin-top-right rounded-md bg-surface border border-border shadow-lg focus:outline-none z-50 overflow-hidden">
      <div className="px-4 py-3 border-b border-border flex justify-between items-center">
        <h3 className="text-sm font-semibold text-text-primary">
          Notifications
        </h3>
        <button className="text-xs text-primary hover:text-secondary font-medium">
          Mark all read
        </button>
      </div>

      <div className="max-h-64 overflow-y-auto">
        {notifications.length > 0 ? (
          notifications.map((notif) => (
            <div
              key={notif.id}
              className={`px-4 py-3 border-b border-border last:border-0 cursor-pointer transition-colors ${
                notif.unread ? "bg-accent-soft" : "hover:bg-background"
              }`}
            >
              <p
                className={`text-sm ${notif.unread ? "font-semibold text-text-primary" : "text-text-secondary"}`}
              >
                {notif.text}
              </p>
              <p className="text-xs text-muted mt-1">{notif.time}</p>
            </div>
          ))
        ) : (
          <div className="px-4 py-6 text-center text-sm text-text-secondary">
            No new notifications
          </div>
        )}
      </div>

      <div className="bg-background px-4 py-2 text-center border-t border-border">
        <a
          href="/notifications"
          className="text-xs font-medium text-text-secondary hover:text-text-primary"
        >
          View all notifications
        </a>
      </div>
    </div>
  );
};
