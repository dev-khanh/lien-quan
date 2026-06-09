import { redirect } from "next/navigation";
import { getAdminFromCookies } from "@/lib/auth";
import { money } from "@/lib/format";
import { prisma } from "@/lib/prisma";
import { AdminNav } from "@/components/AdminNav";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const admin = getAdminFromCookies();
  if (!admin) redirect("/pt-admin/login");
  const now = new Date();
  const startToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const startMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const [totalAccounts, rentingAccounts, availableAccounts, pendingOrders, todayRevenue, monthRevenue] = await Promise.all([
    prisma.account.count(),
    prisma.account.count({ where: { status: "renting" } }),
    prisma.account.count({ where: { status: "available", isVisible: true } }),
    prisma.rentOrder.count({ where: { status: "pending" } }),
    prisma.rentOrder.aggregate({ _sum: { totalPrice: true }, where: { status: { in: ["renting", "completed"] }, startTime: { gte: startToday } } }),
    prisma.rentOrder.aggregate({ _sum: { totalPrice: true }, where: { status: { in: ["renting", "completed"] }, startTime: { gte: startMonth } } })
  ]);
  const cards = [
    ["Tổng acc", totalAccounts],
    ["Đang thuê", rentingAccounts],
    ["Sẵn sàng", availableAccounts],
    ["Đơn chờ", pendingOrders],
    ["Doanh thu hôm nay", money(todayRevenue._sum.totalPrice || 0)],
    ["Doanh thu tháng", money(monthRevenue._sum.totalPrice || 0)]
  ];
  return (
    <main className="mx-auto max-w-7xl px-4 py-6">
      <AdminNav />
      <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map(([label, value]) => (
          <div key={String(label)} className="rounded-lg bg-white p-5 shadow-game">
            <p className="text-sm font-bold text-slate-500">{label}</p>
            <p className="mt-2 text-3xl font-black text-purple-950">{value}</p>
          </div>
        ))}
      </section>
    </main>
  );
}
