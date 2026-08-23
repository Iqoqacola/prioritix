import { redirect } from "next/navigation";
import { verifyAuth } from "../lib/auth";

export default async function Home() {
  const authenticated = await verifyAuth();
  if (authenticated) {
    redirect("/dashboard");
  }
  redirect("/signin");
}
