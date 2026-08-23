import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { getAppSidebarData } from "../../lib/app-data";

type AppLayoutProps = {
  children: React.ReactNode;

  user: {
    id: number;
    full_name: string;
    email: string;
    avatar_path?: string | null;
  };
};

export default async function AppLayout({ children, user }: AppLayoutProps) {
  const { projects, teams } = await getAppSidebarData();

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <Sidebar projects={projects} teams={teams} />

      <div className="ml-62.5 min-h-screen">
        <Topbar user={user} />

        <main className="pt-13.5 min-h-screen">
          <div className="p-6">{children}</div>
        </main>
      </div>
    </div>
  );
}
