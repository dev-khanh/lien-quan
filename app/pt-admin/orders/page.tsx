import { redirect } from "next/navigation";
import { OrderActions } from "@/components/AdminActions";
import { AdminNav } from "@/components/AdminNav";
import { getAdminFromCookies } from "@/lib/auth";
import { expireRentals } from "@/lib/expire-rentals";
import { money } from "@/lib/format";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminOrdersPage() {
  if (!getAdminFromCookies()) redirect("/pt-admin/login");
  await expireRentals();
  const orders = await prisma.rentOrder.findMany({ include: { account: true }, orderBy: { createdAt: "desc" } });
  return (
    <main className="mx-auto max-w-7xl px-4 py-6">
      <AdminNav />
      <section className="rounded-lg border border-[#f3d6e6] bg-white p-4 shadow-[0_10px_24px_rgba(236,63,150,0.08)]">
        <h1 className="mb-4 text-2xl font-black text-[#111827]">Đơn thuê</h1>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1100px] text-left text-sm">
            <thead><tr className="border-b bg-[#fff7fb] text-xs uppercase text-slate-500"><th className="p-2">Mã đơn</th><th>Khách hàng</th><th>SĐT</th><th>Zalo/Facebook</th><th>ACC</th><th>Gói</th><th>Giá</th><th>Bill</th><th>Trạng thái</th><th>Ngày tạo</th><th>Start</th><th>End</th><th>Hành động</th></tr></thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-b align-middle">
                  <td className="p-2 font-mono text-xs">{order.id.slice(0, 8)}</td>
                  <td className="font-bold">{order.customerName}</td>
                  <td>{order.phone}</td>
                  <td>{order.contact}</td>
                  <td className="font-bold">{order.account.name}</td>
                  <td>{order.packageType}</td>
                  <td>{money(order.totalPrice)}</td>
                  <td>{order.billImageUrl ? <a className="font-bold text-[#ec3f96]" href={order.billImageUrl} target="_blank">Xem bill</a> : "-"}</td>
                  <td><span className="rounded-full bg-purple-100 px-2 py-1 text-xs font-black text-purple-700">{order.status}</span></td>
                  <td>{order.createdAt.toLocaleString("vi-VN")}</td>
                  <td>{order.startTime?.toLocaleString("vi-VN") || "-"}</td>
                  <td>{order.endTime?.toLocaleString("vi-VN") || "-"}</td>
                  <td><OrderActions id={order.id} status={order.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
