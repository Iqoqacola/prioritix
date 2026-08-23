// components/ui/LogoutButton.tsx

"use client";

import { LogOut } from "lucide-react";
import { useSignout } from "../../hooks/Auth/useSignOut";

export default function LogoutButton() {
  const { signout } = useSignout();

  return (
    <button
      type="button"
      onClick={signout}
      className="flex w-full items-center gap-3 rounded-lg px-2 py-2 text-sm text-red-500 transition hover:bg-red-50"
    >
      <div className="flex h-8 w-8 items-center justify-center">
        <LogOut size={18} />
      </div>
      Sign out
    </button>
  );
}
