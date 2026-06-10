import { redirect } from "next/navigation";
import { AdminNav } from "@/components/AdminNav";
import { AdminSettingsForm } from "@/components/AdminSettingsForm";
import { getAdminFromCookies } from "@/lib/auth";
import { getShopSettings } from "@/lib/settings";

export const dynamic = "force-dynamic";

export default async function AdminSettingsPage() {
  if (!getAdminFromCookies()) redirect("/pt-admin/login");
  const settings = await getShopSettings();
  return (
    <main className="mx-auto max-w-7xl px-4 py-6">
      <AdminNav />
      <AdminSettingsForm settings={settings} />
    </main>
  );
}
