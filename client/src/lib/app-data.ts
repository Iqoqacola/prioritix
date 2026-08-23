import { cookies } from "next/headers";

const API_URL = "http://localhost:3000";

export async function getAppSidebarData() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");

  if (!token) {
    return {
      projects: [],
      teams: [],
    };
  }

  try {
    const projectsResponse = await fetch(`${API_URL}/api/projects`, {
      method: "GET",
      headers: {
        Cookie: `token=${token.value}`,
      },
      cache: "no-store",
    });

    if (!projectsResponse.ok) {
      console.error("Failed loading projects:", projectsResponse.status);

      return {
        projects: [],
        teams: [],
      };
    }

    const projects = await projectsResponse.json();

    return {
      projects,
      teams: [],
    };
  } catch (error) {
    console.error("Failed loading sidebar:", error);

    return {
      projects: [],
      teams: [],
    };
  }
}
