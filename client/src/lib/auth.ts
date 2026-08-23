import { cookies } from "next/headers";
import { useSignout } from "../hooks/Auth/useSignOut";

export async function getAuthToken() {
  const cookieStore = await cookies();

  return cookieStore.get("token")?.value;
}

export async function verifyAuth() {
  const token = await getAuthToken();

  if (!token) {
    return false;
  }

  try {
    const response = await fetch("http://localhost:3000/api/users/me", {
      method: "GET",
      headers: {
        Cookie: `token=${token}`,
      },
      cache: "no-store",
    });

    if (!response.ok) {
      return false;
    }

    const data = await response.json();
    return data.user;
  } catch (error) {
    console.error("verifyAuth error:", error);
    return false;
  }
}
