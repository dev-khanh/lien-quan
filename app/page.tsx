import { PublicAccountBrowser } from "@/components/PublicAccountBrowser";
import { Crown } from "lucide-react";
import { expireRentals } from "@/lib/expire-rentals";
import { hasDatabaseUrl } from "@/lib/env";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  await expireRentals();
  const accounts = hasDatabaseUrl()
    ? await prisma.account.findMany({
        where: { isVisible: true, status: { not: "hidden" } },
        orderBy: [{ status: "asc" }, { createdAt: "desc" }]
      })
    : [];
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
  const faqs = [
    ["Thuê ACC Liên Quân là gì?", "Thuê ACC Liên Quân là dịch vụ cho người chơi mượn tài khoản đã có sẵn tướng, skin, rank hoặc skin SSS trong một khoảng thời gian nhất định để trải nghiệm nhanh mà không cần tự cày từ đầu."],
    ["Thuê ACC Liên Quân có an toàn không?", "Shop chỉ bàn giao thông tin sau khi xác nhận đơn thuê và luôn ưu tiên tài khoản đang sẵn sàng. Người thuê cần dùng đúng thời gian đã thống nhất và không thay đổi thông tin đăng nhập."],
    ["Có thuê theo giờ không?", "Có. Người chơi có thể thuê ACC Liên Quân theo giờ nếu chỉ cần test skin, leo rank ngắn hoặc chơi cùng bạn bè trong thời gian ngắn."],
    ["Có thuê qua đêm không?", "Có. Gói thuê ACC Liên Quân qua đêm phù hợp khi cần chơi lâu hơn, tiết kiệm hơn so với thuê nhiều giờ lẻ."],
    ["ACC đang thuê thì làm sao?", "Nếu ACC đang thuê, bạn có thể chờ đồng hồ đếm ngược kết thúc hoặc chọn ACC khác đang sẵn sàng trong danh sách."],
    ["Làm sao biết ACC có nhiều skin SSS?", "Mỗi thẻ ACC hiển thị tổng skin, số skin SSS, skin hợp tác và ảnh preview để bạn kiểm tra trước khi liên hệ thuê qua Zalo."]
  ];
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(([question, answer]) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer }
    }))
  };
  return (
    <main className="mx-auto max-w-[1360px] px-4 pb-24 pt-5 text-[#111827] sm:px-6 lg:py-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
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
        <h2 className="text-2xl font-black text-[#111827]">Thuê ACC Liên Quân nhiều skin SSS, giá rẻ, nhận acc nhanh qua Zalo</h2>
        <div className="mt-4 space-y-4 text-sm font-semibold leading-7 text-slate-700 sm:text-base">
          <p>Shop tập trung vào nhu cầu thuê ACC Liên Quân nhanh, rõ thông tin và dễ chọn tài khoản trước khi liên hệ. Mỗi ACC được hiển thị ảnh skin, tổng số skin, số skin SSS, skin hợp tác, rank, giá thuê theo từng gói và trạng thái hiện tại. Nhờ vậy người chơi có thể xem trước tài khoản phù hợp để trải nghiệm skin đẹp, leo rank cùng bạn bè hoặc test các bộ trang phục hiếm mà không mất thời gian cày lại từ đầu.</p>
          <p>Dịch vụ thuê ACC Liên Quân nhiều skin phù hợp với người muốn chơi ngắn hạn nhưng vẫn cần tài khoản chất lượng. Bạn có thể chọn thuê ACC Liên Quân SSS nếu ưu tiên các skin nổi bật, hiệu ứng đẹp và tài khoản có nhiều bộ sưu tập giá trị. Những ACC đang sẵn sàng sẽ có nút liên hệ Zalo để shop kiểm tra và xác nhận nhanh, hạn chế việc khách chọn nhầm tài khoản đang được người khác thuê.</p>
          <p>Shop hỗ trợ thuê ACC Liên Quân theo giờ cho nhu cầu chơi nhanh, test skin hoặc leo vài trận trong ngày. Nếu muốn chơi lâu hơn, bạn có thể chọn thuê ACC Liên Quân qua đêm hoặc thuê theo ngày để có thời gian thoải mái hơn. Các gói được trình bày công khai trên từng trang ACC để khách dễ so sánh trước khi nhắn Zalo.</p>
          <p>Với tiêu chí thuê ACC Liên Quân giá rẻ nhưng vẫn rõ ràng và tiện thao tác, website luôn ưu tiên danh sách tài khoản visible, trạng thái sẵn sàng và thông tin dễ đọc trên cả điện thoại lẫn máy tính. Khi cần thuê, bạn chỉ cần mở ACC muốn dùng, copy nội dung nhắn hoặc bấm Thuê qua Zalo để shop kiểm tra tình trạng và hướng dẫn nhận acc.</p>
        </div>
      </section>

      <section className="mt-8 rounded-[24px] border border-[#fbd0e3] bg-white/[0.90] p-5 text-[#111827] shadow-[0_16px_40px_rgba(236,63,150,0.16)] backdrop-blur-md">
        <h2 className="text-2xl font-black text-[#111827]">Câu hỏi thường gặp</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {faqs.map(([question, answer]) => (
            <article key={question} className="rounded-[18px] border border-[#f3d6e6] bg-white p-4">
              <h3 className="font-black text-[#111827]">{question}</h3>
              <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">{answer}</p>
            </article>
          ))}
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
