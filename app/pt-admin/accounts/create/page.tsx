import { redirect } from "next/navigation";
import { AdminAccountForm } from "@/components/AdminAccountForm";
import { AdminNav } from "@/components/AdminNav";
import { getAdminFromCookies } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default function CreateAccountPage() {
  if (!getAdminFromCookies()) redirect("/pt-admin/login");
  return (
    <main className="mx-auto max-w-7xl px-4 py-6">
      <AdminNav />
      <AdminAccountForm />
    </main>
  );
}
