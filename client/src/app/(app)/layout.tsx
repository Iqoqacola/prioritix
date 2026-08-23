import { redirect } from "next/navigation";
import { verifyAuth } from "../../lib/auth";

import AppLayout from "../../components/layout/AppLayout";
import AppDataInitializer from "../../components/AppDataInitializer";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await verifyAuth();

  if (!user) {
    redirect("/api/auth/invalid");
  }

  return (
    <AppLayout user={user}>
      <AppDataInitializer />

      {children}
    </AppLayout>
  );
}
