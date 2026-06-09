import { redirect } from "next/navigation";
import { ConfirmOrderButton } from "@/components/AdminActions";
import { AdminNav } from "@/components/AdminNav";
import { getAdminFromCookies } from "@/lib/auth";
import { money } from "@/lib/format";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminOrdersPage() {
  if (!getAdminFromCookies()) redirect("/pt-admin/login");
  const orders = await prisma.rentOrder.findMany({ include: { account: true }, orderBy: { createdAt: "desc" } });
  return (
    <main className="mx-auto max-w-7xl px-4 py-6">
      <AdminNav />
      <section className="rounded-lg bg-white p-4 shadow-game">
        <h1 className="mb-4 text-2xl font-black text-purple-950">Đơn thuê</h1>
        <div className="space-y-3">
          {orders.map((order) => (
            <div key={order.id} className="rounded-lg border p-3">
              <div className="flex flex-wrap items-center gap-2">
                <strong className="mr-auto">{order.customerName} thuê {order.account.name}</strong>
                <span className="rounded-full bg-amber-100 px-2 py-1 text-xs font-black text-orange-700">{money(order.totalPrice)}</span>
                <span className="rounded-full bg-purple-100 px-2 py-1 text-xs font-black text-purple-700">{order.status}</span>
                {order.status === "pending" && <ConfirmOrderButton id={order.id} />}
              </div>
              <p className="mt-2 text-sm text-slate-600">{order.phone} · {order.contact} · {order.packageType}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
