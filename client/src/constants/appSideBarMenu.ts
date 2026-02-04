import {
  LayoutDashboard,
  Inbox,
  Calendar,
  CalendarDays,
  Star,
  BarChart2,
} from "lucide-react";

export const mainMenus = [
  { label: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  { label: "Inbox", path: "/inbox", icon: Inbox, badge: 3 },
  { label: "Today", path: "/today", icon: Calendar },
  { label: "Upcoming", path: "/upcoming", icon: CalendarDays },
];

export const highlightsMenu = [
  { label: "Analytics", path: "/analytics", icon: BarChart2 },
  { label: "Starred", path: "/starred", icon: Star },
];
