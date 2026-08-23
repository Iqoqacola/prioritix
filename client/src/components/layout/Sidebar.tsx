import Link from "next/link";
import { BarChart3, Star, LogOut, Plus, Users, Settings } from "lucide-react";
import ProjectsSection from "../ui/ProjectSection";
import TeamSection from "../ui/TeamSection";
import LogoutButton from "../ui/LogoutButton";

import Logo from "../ui/Logo";
import SidebarNav from "../ui/SidebarNav";

type Project = {
  id: number;
  title: string;
  color: string;
};

type Team = {
  id: number;
  name: string;
};

type SidebarProps = {
  projects: Project[];
  teams?: Team[];
};

export default function Sidebar({ projects, teams = [] }: SidebarProps) {
  return (
    <aside className="fixed left-0 top-0 z-40 flex h-screen w-[250px] flex-col border-r border-slate-200 bg-white">
      {/* LOGO */}
      <div className="flex h-[54px] items-center border-b border-slate-200 px-5">
        <Link href="/dashboard" className="flex items-center gap-2">
          <Logo />
        </Link>
      </div>

      {/* SCROLL AREA */}
      <div className="flex-1 overflow-y-auto px-3 py-3">
        {/* MAIN NAVIGATION */}
        <SidebarNav />

        {/* HIGHLIGHTS */}
        {/* <div className="mt-7">
          <p className="mb-2 px-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
            Highlights
          </p>

          <Link
            href="/analytics"
            className="flex items-center gap-3 rounded-lg px-2 py-2 text-sm text-slate-700 hover:bg-slate-100"
          >
            <BarChart3 size={18} />
            Analytics
          </Link>

          <Link
            href="/starred"
            className="flex items-center gap-3 rounded-lg px-2 py-2 text-sm text-slate-700 hover:bg-slate-100"
          >
            <Star size={18} />
            Starred
          </Link>
        </div> */}

        {/* PROJECTS */}
        <ProjectsSection initialProjects={projects} />

        {/* TEAMS */}
        <TeamSection initialTeams={teams} />
      </div>

      {/* BOTTOM */}
      <div className="border-t border-slate-200 p-3">
        {/* SETTINGS */}
        <Link
          href="/settings"
          className="flex items-center gap-3 rounded-lg px-2 py-2 text-sm text-slate-700 hover:bg-slate-100"
        >
          <div className="flex h-8 w-8 items-center justify-center">
            <Settings size={18} />
          </div>
          Settings
        </Link>

        {/* LOGOUT */}
        <LogoutButton />
      </div>
    </aside>
  );
}
