import { redirect } from "next/navigation";
import { AdminAccountsTable } from "@/components/AdminAccountsTable";
import { AdminNav } from "@/components/AdminNav";
import { getAdminFromCookies } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminAccountsPage() {
  if (!getAdminFromCookies()) redirect("/pt-admin/login");
  const accounts = await prisma.account.findMany({ orderBy: { createdAt: "desc" } });
  const rows = accounts.map((account) => ({
    id: account.id,
    slug: account.slug,
    name: account.name,
    thumbnailUrl: account.thumbnailUrl,
    heroCount: account.heroCount,
    skinCount: account.skinCount,
    sssCount: account.sssCount,
    collaborationCount: account.collaborationCount,
    vipLevel: account.vipLevel,
    priceHourly: account.priceHourly,
    priceNight: account.priceNight,
    priceDaily: account.priceDaily,
    status: account.status,
    currentRentEndsAt: account.currentRentEndsAt?.toISOString() || null
  }));
  return (
    <main className="mx-auto max-w-7xl px-4 py-6">
      <AdminNav />
      <AdminAccountsTable accounts={rows} />
    </main>
  );
}
