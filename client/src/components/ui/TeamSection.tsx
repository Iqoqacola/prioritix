// components/ui/TeamSection.tsx

"use client";

import { useState } from "react";
import Link from "next/link";
import { Users, Plus, ChevronDown } from "lucide-react";

type Team = {
  id: number;
  name: string;
};
type TeamSectionProps = {
  initialTeams: Team[];
};

export default function TeamSection({ initialTeams }: TeamSectionProps) {
  const [teams] = useState(initialTeams);
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="mt-7">
      {/* HEADER */}
      <div className="mb-2 flex items-center justify-between px-2">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
          Team
        </p>

        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="rounded-md p-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
        >
          <ChevronDown
            size={16}
            className={`transition-transform duration-200 ${
              isOpen ? "" : "-rotate-90"
            }`}
          />
        </button>
      </div>

      {/* COLLAPSIBLE CONTENT */}
      {isOpen && (
        <>
          {/* TEAM LIST */}
          <div className="space-y-1">
            {teams.map((team) => (
              <Link
                key={team.id}
                href={`/team/${team.id}`}
                className="flex items-center gap-3 rounded-lg px-2 py-2 text-sm text-slate-700 hover:bg-slate-100"
              >
                <Users size={17} className="text-slate-500" />

                <span className="truncate">{team.name}</span>
              </Link>
            ))}
          </div>

          {/* JOIN WORKSPACE */}
          {/* <Link
            href="/workspace/join"
            className="mt-1 flex items-center gap-3 rounded-lg px-2 py-2 text-sm text-slate-400 hover:bg-slate-100"
          >
            <Plus size={17} />
            Join a Workspace
          </Link> */}
        </>
      )}
    </div>
  );
}
