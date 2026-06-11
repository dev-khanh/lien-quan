import { PublicAccountBrowser } from "@/components/PublicAccountBrowser";
import { Crown } from "lucide-react";
import { expireRentals } from "@/lib/expire-rentals";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  await expireRentals();
  const accounts = await prisma.account.findMany({
    where: { isVisible: true, status: { not: "hidden" } },
    include: { reviews: { where: { status: "approved" }, take: 2, orderBy: { createdAt: "desc" } } },
    orderBy: [{ status: "asc" }, { createdAt: "desc" }]
  });
  const reviews = accounts.flatMap((account) => account.reviews.map((review) => ({ ...review, accountName: account.name }))).slice(0, 6);
  const publicAccounts = accounts.map((account) => ({
    id: account.id,
    slug: account.slug,
    name: account.name,
    thumbnailUrl: account.thumbnailUrl,
    sssCount: account.sssCount,
    collaborationCount: account.collaborationCount,
    vipLevel: account.vipLevel,
    priceHourly: account.priceHourly,
    priceNight: account.priceNight,
    priceDaily: account.priceDaily,
    skinCount: account.skinCount,
    isFeatured: account.isFeatured,
    featuredImageUrl: account.featuredImageUrl,
    featuredOrder: account.featuredOrder,
    status: account.status,
    currentRentEndsAt: account.currentRentEndsAt?.toISOString() || null
  }));
  return (
    <main className="mx-auto max-w-[1360px] px-4 pb-24 pt-5 text-[#111827] sm:px-6 lg:py-8">
      <header className="relative mb-5 overflow-hidden rounded-[24px] border border-[#fbd0e3] bg-white/[0.92] px-5 py-6 shadow-[0_18px_54px_rgba(236,63,150,0.18)] backdrop-blur-md sm:px-8 lg:px-12">
        <div className="pointer-events-none absolute right-10 top-7 text-4xl font-black text-[#ffd6e8]">✦</div>
        <div className="pointer-events-none absolute right-28 bottom-8 text-2xl font-black text-[#ffe3ef]">✦</div>
        <div className="flex items-center gap-5">
          <div className="hidden h-20 w-20 shrink-0 items-center justify-center rounded-[22px] border border-[#ffb8d8] bg-gradient-to-b from-[#ffe6f1] to-[#ff7eb8] text-white shadow-[0_14px_30px_rgba(236,63,150,0.28)] sm:flex">
            <Crown className="h-10 w-10 fill-current" />
          </div>
          <div>
            <p className="text-xs font-black uppercase tracking-[0.34em] text-[#ec3f96]">Shop thuê ACC Liên Quân</p>
            <h1 className="mt-2 text-3xl font-black tracking-tight text-[#111827] sm:text-4xl">
              Shop thuê ACC Liên Quân nhiều skin SSS, giá rẻ
            </h1>
            <p className="mt-3 max-w-3xl text-sm font-semibold text-slate-600 sm:text-base">Danh sách acc Liên Quân nhiều skin đẹp, thuê theo giờ, đêm, ngày. Thông tin đăng nhập chỉ mở sau khi admin xác nhận thanh toán.</p>
          </div>
        </div>
      </header>

      <h2 className="mb-4 text-2xl font-black text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.45)]">Danh sách ACC Liên Quân đang cho thuê</h2>
      <PublicAccountBrowser accounts={publicAccounts} />

      <section className="mt-8 rounded-[24px] border border-[#fbd0e3] bg-white/[0.90] p-5 text-[#111827] shadow-[0_16px_40px_rgba(236,63,150,0.16)] backdrop-blur-md">
        <div className="mb-4 flex items-end justify-between gap-3">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[#ec3f96]">Đánh giá khách hàng</p>
            <h2 className="text-xl font-black">Đánh giá khách thuê ACC</h2>
          </div>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review) => (
            <article key={review.id} className="rounded-[18px] border border-[#f3d6e6] bg-white p-4">
              <div className="flex items-center justify-between gap-3">
                <strong>{review.customerName}</strong>
                <span className="text-sm font-black text-[#ec3f96]">{review.accountName}</span>
              </div>
              <p className="mt-2 text-sm font-medium text-slate-600">{review.comment}</p>
            </article>
          ))}
          {!reviews.length && <p className="text-sm font-bold text-slate-600">Chưa có đánh giá được duyệt.</p>}
        </div>
      </section>

      <footer className="mt-8 rounded-[24px] border border-[#fbd0e3] bg-white/[0.88] p-5 text-center text-sm font-semibold text-slate-600 shadow-[0_12px_30px_rgba(236,63,150,0.12)] backdrop-blur-md">
        <p className="font-black text-[#111827]">Shop thuê ACC Liên Quân</p>
        <p className="mt-1">Liên hệ Zalo/Facebook: cập nhật trong cấu hình shop. Hỗ trợ thuê acc theo giờ, đêm, ngày.</p>
        <div className="mx-auto mt-4 max-w-2xl rounded-2xl border border-[#f3d6e6] bg-white/80 p-4 text-left">
          <p className="font-black text-[#111827]">Thêm web vào màn hình chính trên iPhone</p>
          <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm font-semibold text-slate-600">
            <li>Mở web bằng Safari.</li>
            <li>Bấm nút Chia sẻ.</li>
            <li>Chọn "Thêm vào Màn hình chính".</li>
            <li>Bấm "Thêm".</li>
          </ol>
          <p className="mt-2 text-xs font-bold text-slate-500">iPhone cần Safari để thêm vào màn hình chính và mở như app.</p>
        </div>
      </footer>
    </main>
  );
}
