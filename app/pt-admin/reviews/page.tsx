import { redirect } from "next/navigation";
import { ReviewModeration } from "@/components/AdminActions";
import { AdminNav } from "@/components/AdminNav";
import { getAdminFromCookies } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminReviewsPage() {
  if (!getAdminFromCookies()) redirect("/admin");
  const reviews = await prisma.review.findMany({ include: { account: true }, orderBy: { createdAt: "desc" } });
  return (
    <main className="mx-auto max-w-7xl px-4 py-6">
      <AdminNav />
      <section className="rounded-lg bg-white p-4 shadow-game">
        <h1 className="mb-4 text-2xl font-black text-purple-950">Duyệt đánh giá</h1>
        <div className="space-y-3">
          {reviews.map((review) => (
            <div key={review.id} className="rounded-lg border p-3">
              <div className="flex flex-wrap items-center gap-2">
                <strong className="mr-auto">{review.customerName} · {review.account.name} · {review.rating} sao</strong>
                <span className="rounded-full bg-purple-100 px-2 py-1 text-xs font-black text-purple-700">{review.status}</span>
                {review.status === "pending" && <ReviewModeration id={review.id} />}
              </div>
              <p className="mt-2 text-sm text-slate-700">{review.comment}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
