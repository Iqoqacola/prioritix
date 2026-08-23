"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  LayoutDashboard,
  Inbox,
  CalendarDays,
  CalendarRange,
  Layers3,
} from "lucide-react";

const menus = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Inbox",
    href: "/inbox",
    icon: Inbox,
  },
  {
    label: "Today",
    href: "/today",
    icon: CalendarDays,
  },
  {
    label: "Upcoming",
    href: "/upcoming",
    icon: CalendarRange,
  },
  {
    label: "All Tasks",
    href: "/all-tasks",
    icon: Layers3,
  },
];

export default function SidebarNav() {
  const pathname = usePathname();

  return (
    <nav className="space-y-1">
      {menus.map((menu) => {
        const Icon = menu.icon;

        const active =
          pathname === menu.href || pathname.startsWith(`${menu.href}/`);

        return (
          <Link
            key={menu.href}
            href={menu.href}
            className={`
              flex items-center gap-3 rounded-lg px-3 py-2
              text-sm transition
              ${
                active
                  ? "bg-blue-50 font-medium text-blue-600"
                  : "text-slate-700 hover:bg-slate-100"
              }
            `}
          >
            <Icon size={18} />

            {menu.label}
          </Link>
        );
      })}
    </nav>
  );
}
