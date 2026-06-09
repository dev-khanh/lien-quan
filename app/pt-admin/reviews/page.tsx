import { redirect } from "next/navigation";
import { ReviewModeration } from "@/components/AdminActions";
import { AdminNav } from "@/components/AdminNav";
import { getAdminFromCookies } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminReviewsPage() {
  if (!getAdminFromCookies()) redirect("/pt-admin/login");
  const reviews = await prisma.review.findMany({ include: { account: true }, orderBy: { createdAt: "desc" } });
  return (
    <main className="mx-auto max-w-7xl px-4 py-6">
      <AdminNav />
      <section className="rounded-lg border border-[#f3d6e6] bg-white p-4 shadow-[0_10px_24px_rgba(236,63,150,0.08)]">
        <h1 className="mb-4 text-2xl font-black text-[#111827]">Duyệt đánh giá</h1>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-left text-sm">
            <thead><tr className="border-b bg-[#fff7fb] text-xs uppercase text-slate-500"><th className="p-2">Tên khách</th><th>ACC</th><th>Sao</th><th>Bình luận</th><th>Trạng thái</th><th>Ngày gửi</th><th>Hành động</th></tr></thead>
            <tbody>
              {reviews.map((review) => (
                <tr key={review.id} className="border-b align-top">
                  <td className="p-2 font-bold">{review.customerName}</td>
                  <td>{review.account.name}</td>
                  <td>{review.rating}</td>
                  <td className="max-w-md">{review.comment}</td>
                  <td><span className="rounded-full bg-purple-100 px-2 py-1 text-xs font-black text-purple-700">{review.status}</span></td>
                  <td>{review.createdAt.toLocaleString("vi-VN")}</td>
                  <td><ReviewModeration id={review.id} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
