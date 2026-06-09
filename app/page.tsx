import { AccountCard } from "@/components/AccountCard";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const accounts = await prisma.account.findMany({
    where: { isVisible: true, status: { not: "hidden" } },
    include: { reviews: { where: { status: "approved" }, take: 2, orderBy: { createdAt: "desc" } } },
    orderBy: [{ status: "asc" }, { createdAt: "desc" }]
  });
  const reviews = accounts.flatMap((account) => account.reviews.map((review) => ({ ...review, accountName: account.name }))).slice(0, 6);
  return (
    <main className="mx-auto max-w-6xl px-3 py-5 text-[#111827] sm:px-5 lg:py-8">
      <header className="mb-5 rounded-[24px] border border-[#f3d6e6] bg-white/78 px-4 py-5 shadow-[0_12px_32px_rgba(236,63,150,0.10)] backdrop-blur sm:px-6">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.18em] text-[#ec3f96]">Shop thuê ACC Liên Quân</p>
          <h1 className="mt-1 text-2xl font-black tracking-tight sm:text-3xl">Acc nhiều skin, thuê nhanh, giá rẻ</h1>
          <p className="mt-2 max-w-2xl text-sm font-medium text-slate-600">Danh sách acc được cập nhật liên tục, thông tin thuê chỉ mở sau khi admin xác nhận thanh toán.</p>
        </div>
      </header>

      <section className="mb-5 flex flex-wrap gap-2 rounded-[20px] border border-[#f3d6e6] bg-white/70 p-3 shadow-[0_8px_22px_rgba(236,63,150,0.08)]">
        {["Tất cả", "Sẵn sàng", "Đang thuê", "Nhiều SSS", "VIP cao"].map((item, index) => (
          <button
            key={item}
            className={`rounded-full border px-4 py-2 text-sm font-black ${index === 0 ? "border-[#ec3f96] bg-[#ec3f96] text-white" : "border-[#f3d6e6] bg-white text-[#ec3f96]"}`}
          >
            {item}
          </button>
        ))}
      </section>

      <section className="grid grid-cols-1 gap-4 min-[420px]:grid-cols-2 lg:grid-cols-3 lg:gap-6">
        {accounts.map((account, index) => <AccountCard key={account.id} account={account} priority={index < 3} />)}
      </section>

      <section className="mt-8 rounded-[24px] border border-[#f3d6e6] bg-white/80 p-5 shadow-[0_12px_32px_rgba(236,63,150,0.10)]">
        <div className="mb-4 flex items-end justify-between gap-3">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[#ec3f96]">Đánh giá khách hàng</p>
            <h2 className="text-xl font-black">Khách thuê nói gì</h2>
          </div>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {(reviews.length ? reviews : [
            { id: "demo-1", customerName: "Minh Anh", accountName: "ACC SEA", rating: 5, comment: "Xác nhận nhanh, acc đúng ảnh và nhiều skin đẹp." },
            { id: "demo-2", customerName: "Gia Huy", accountName: "ACC TÍM", rating: 5, comment: "Giá ổn, thuê qua đêm rất mượt." },
            { id: "demo-3", customerName: "Hoàng", accountName: "ACC ACE", rating: 5, comment: "Shop hỗ trợ nhanh, countdown rõ ràng." }
          ]).map((review) => (
            <article key={review.id} className="rounded-[18px] border border-[#f3d6e6] bg-white p-4">
              <div className="flex items-center justify-between gap-3">
                <strong>{review.customerName}</strong>
                <span className="text-sm font-black text-[#ec3f96]">{review.accountName}</span>
              </div>
              <p className="mt-2 text-sm font-medium text-slate-600">{review.comment}</p>
            </article>
          ))}
        </div>
      </section>

      <footer className="mt-8 rounded-[24px] border border-[#f3d6e6] bg-white/70 p-5 text-center text-sm font-semibold text-slate-600">
        <p className="font-black text-[#111827]">Shop thuê ACC Liên Quân</p>
        <p className="mt-1">Liên hệ Zalo/Facebook: cập nhật trong cấu hình shop. Hỗ trợ thuê acc theo giờ, đêm, ngày.</p>
      </footer>
    </main>
  );
}
