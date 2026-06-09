import Image from "next/image";
import { notFound } from "next/navigation";
import { CheckCircle2, Crown, Percent, ShieldCheck, Sparkles, Star, type LucideIcon } from "lucide-react";
import { RentForm } from "@/components/RentForm";
import { ReviewForm } from "@/components/ReviewForm";
import { ReviewList } from "@/components/ReviewList";
import { CountdownTimer } from "@/components/CountdownTimer";
import { money } from "@/lib/format";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AccountDetailPage({ params }: { params: { id: string } }) {
  const account = await prisma.account.findFirst({
    where: { OR: [{ id: params.id }, { slug: params.id }], isVisible: true, status: { not: "hidden" } },
    include: { images: { orderBy: { sortOrder: "asc" } }, reviews: { where: { status: "approved" }, orderBy: { createdAt: "desc" } } }
  });
  if (!account) notFound();
  const stats: Array<[string, string | number, LucideIcon]> = [
    ["Tướng", account.heroCount, CheckCircle2],
    ["Skin", account.skinCount, Sparkles],
    ["Hợp tác", account.collaborationCount, Crown],
    ["Rank", account.rank, ShieldCheck],
    ["Tỷ lệ thắng", `${account.winRate}%`, Percent],
    ["Uy tín", `${account.reputation}/5`, Star],
    ["VIP", account.vipLevel, ShieldCheck],
    ["SSS", account.sssCount, Sparkles]
  ];
  return (
    <main className="mx-auto max-w-7xl px-3 py-5 sm:px-5">
      <a href="/" className="mb-4 inline-block rounded-md bg-white/15 px-3 py-2 text-sm font-bold text-white">← Danh sách acc</a>
      <div className="grid gap-5 lg:grid-cols-[1.35fr_0.65fr]">
        <section className="space-y-4">
          <div className="overflow-hidden rounded-lg bg-white shadow-game">
            <div className="relative aspect-video">
              <Image src={account.thumbnailUrl} alt={account.name} fill className="object-cover" priority />
              {account.status === "renting" && <div className="absolute left-3 top-3"><CountdownTimer endAt={account.currentRentEndsAt} /></div>}
            </div>
            <div className="p-4">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="mr-auto text-2xl font-black text-purple-950">{account.name}</h1>
                <span className="rounded-full bg-pink-100 px-3 py-1 text-sm font-black text-pink-600">SSS {account.sssCount}</span>
                <span className="rounded-full bg-red-600 px-3 py-1 text-sm font-black text-white">{account.status === "renting" ? "Đang thuê" : "Sẵn sàng"}</span>
              </div>
              <p className="mt-3 text-sm text-slate-700">{account.description}</p>
              <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {stats.map(([label, value, Icon]) => (
                  <div key={String(label)} className="rounded-lg bg-purple-50 p-3">
                    <Icon className="mb-2 h-5 w-5 text-pink-500" />
                    <p className="text-xs font-bold text-slate-500">{label}</p>
                    <p className="font-black text-purple-950">{value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {account.images.map((image) => (
              <div key={image.id} className="relative aspect-video overflow-hidden rounded-lg bg-white shadow-game">
                <Image src={image.url} alt={image.alt || account.name} fill className="object-cover" />
              </div>
            ))}
          </div>
          <ReviewList reviews={account.reviews} />
        </section>
        <aside className="space-y-4">
          <div className="rounded-lg bg-white p-4 shadow-game">
            <h2 className="text-lg font-black text-purple-950">Bảng giá</h2>
            <div className="mt-3 space-y-2">
              <p className="rounded-full bg-amber-100 px-3 py-2 font-black text-orange-700">{money(account.priceHourly)} / giờ</p>
              <p className="rounded-full bg-amber-100 px-3 py-2 font-black text-orange-700">{money(account.priceNight)} / đêm</p>
              <p className="rounded-full bg-amber-100 px-3 py-2 font-black text-orange-700">{money(account.priceDaily)} / ngày</p>
            </div>
          </div>
          <RentForm accountId={account.id} />
          <ReviewForm accountId={account.id} />
        </aside>
      </div>
    </main>
  );
}
