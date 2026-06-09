import { redirect } from "next/navigation";
import { getAdminFromCookies } from "@/lib/auth";
import { money } from "@/lib/format";
import { prisma } from "@/lib/prisma";
import { AlertTriangle, CheckCircle2, EyeOff, MessageSquare, Package, Timer, WalletCards, type LucideIcon } from "lucide-react";
import { AdminNav } from "@/components/AdminNav";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const admin = getAdminFromCookies();
  if (!admin) redirect("/pt-admin/login");
  const now = new Date();
  const startToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const startMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const [totalAccounts, rentingAccounts, availableAccounts, maintenanceAccounts, hiddenAccounts, pendingOrders, rentingOrders, todayRevenue, monthRevenue, pendingReviews] = await Promise.all([
    prisma.account.count(),
    prisma.account.count({ where: { status: "renting" } }),
    prisma.account.count({ where: { status: "available", isVisible: true } }),
    prisma.account.count({ where: { status: "maintenance" } }),
    prisma.account.count({ where: { OR: [{ status: "hidden" }, { isVisible: false }] } }),
    prisma.rentOrder.count({ where: { status: "pending" } }),
    prisma.rentOrder.count({ where: { status: "renting" } }),
    prisma.rentOrder.aggregate({ _sum: { totalPrice: true }, where: { status: { in: ["renting", "completed"] }, startTime: { gte: startToday } } }),
    prisma.rentOrder.aggregate({ _sum: { totalPrice: true }, where: { status: { in: ["renting", "completed"] }, startTime: { gte: startMonth } } }),
    prisma.review.count({ where: { status: "pending" } })
  ]);
  const cards: Array<[string, string | number, LucideIcon]> = [
    ["Tổng ACC", totalAccounts, Package],
    ["ACC đang thuê", rentingAccounts, Timer],
    ["ACC sẵn sàng", availableAccounts, CheckCircle2],
    ["ACC bảo trì", maintenanceAccounts, AlertTriangle],
    ["ACC bị ẩn", hiddenAccounts, EyeOff],
    ["Đơn chờ xác nhận", pendingOrders, WalletCards],
    ["Đơn đang thuê", rentingOrders, Timer],
    ["Doanh thu hôm nay", money(todayRevenue._sum.totalPrice || 0), WalletCards],
    ["Doanh thu tháng này", money(monthRevenue._sum.totalPrice || 0), WalletCards],
    ["Review chờ duyệt", pendingReviews, MessageSquare]
  ];
  return (
    <main className="mx-auto max-w-7xl px-4 py-6">
      <AdminNav />
      <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {cards.map(([label, value, Icon]) => (
          <div key={String(label)} className="rounded-lg border border-[#f3d6e6] bg-white p-5 shadow-[0_10px_24px_rgba(236,63,150,0.08)]">
            <div className="mb-3 inline-flex rounded-md bg-[#fff5fb] p-2 text-[#ec3f96]">
              <Icon className="h-5 w-5" />
            </div>
            <p className="text-sm font-bold text-slate-500">{label}</p>
            <p className="mt-2 text-2xl font-black text-[#111827]">{value}</p>
          </div>
        ))}
      </section>
    </main>
  );
}
