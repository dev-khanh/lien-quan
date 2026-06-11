import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CheckCircle2, Crown, Percent, ShieldCheck, Sparkles, Star, type LucideIcon } from "lucide-react";
import { ReviewForm } from "@/components/ReviewForm";
import { ReviewList } from "@/components/ReviewList";
import { ZaloRentCard } from "@/components/ZaloRentCard";
import AccountImageGallery from "@/components/AccountImageGallery";
import { AccountHeroImage } from "@/components/AccountHeroImage";
import { expireRentals } from "@/lib/expire-rentals";
import { money } from "@/lib/format";
import { prisma } from "@/lib/prisma";
import { getShopSettings, getZaloHref } from "@/lib/settings";

export const dynamic = "force-dynamic";

function accountImageAlt(account: { name: string; skinCount: number; sssCount: number }) {
  return `Ảnh skin ${account.name} Liên Quân ${account.skinCount} skin ${account.sssCount} SSS`;
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const account = await prisma.account.findFirst({
    where: { OR: [{ id: params.id }, { slug: params.id }], isVisible: true, status: { not: "hidden" } },
    select: { name: true, slug: true, skinCount: true, sssCount: true, rank: true, thumbnailUrl: true }
  });
  if (!account) return {};
  const title = `Thuê ${account.name} Liên Quân ${account.skinCount} Skin, ${account.sssCount} SSS | Shop thuê acc giá rẻ`;
  const description = `Thuê ${account.name} Liên Quân nhiều skin đẹp, ${account.skinCount} skin, ${account.sssCount} skin SSS, rank ${account.rank}. Cho thuê theo giờ, đêm, ngày. Xác nhận nhanh qua Zalo.`;
  const url = `/accounts/${account.slug}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: "Shop thuê ACC Liên Quân",
      images: [{ url: account.thumbnailUrl, alt: accountImageAlt(account) }],
      locale: "vi_VN",
      type: "website"
    }
  };
}

export default async function AccountDetailPage({ params }: { params: { id: string } }) {
  await expireRentals();
  const account = await prisma.account.findFirst({
    where: { OR: [{ id: params.id }, { slug: params.id }], isVisible: true, status: { not: "hidden" } },
    include: { images: { orderBy: { sortOrder: "asc" } }, reviews: { where: { status: "approved" }, include: { images: { orderBy: { sortOrder: "asc" } } }, orderBy: { createdAt: "desc" } } }
  });
  if (!account) notFound();
  const settings = await getShopSettings();
  const stats: Array<[string, string | number, LucideIcon]> = [
    ["Tổng Skin", account.skinCount, Sparkles],
    ["Skin SSS", account.sssCount, Star],
    ["Skin hợp tác", account.collaborationCount, Crown],
    ["Rank", account.rank, ShieldCheck],
    ["Uy tín hiện tại", `${account.reputation}/5`, Star],
    ["VIP", account.vipLevel, ShieldCheck],
    ["Tỷ lệ thắng", `${account.winRate}%`, Percent],
    ["Tướng", account.heroCount, CheckCircle2]
  ];
  const detailTitle = `Thuê ${account.name} Liên Quân ${account.skinCount} skin, ${account.sssCount} skin SSS`;
  const imageAlt = accountImageAlt(account);
  return (
    <main className="mx-auto max-w-7xl px-3 pb-24 pt-5 sm:px-5 lg:pb-8">
      <a href="/" className="mb-4 inline-block rounded-md border border-[#f3d6e6] bg-white px-3 py-2 text-sm font-bold text-[#ec3f96]">← Danh sách acc</a>
      <div className="grid gap-5 lg:grid-cols-[1.35fr_0.65fr]">
        <section className="space-y-4">
          <div className="overflow-hidden rounded-[24px] border border-[#f3d6e6] bg-white shadow-[0_12px_32px_rgba(236,63,150,0.12)]">
            <AccountHeroImage
              thumbnailUrl={account.thumbnailUrl}
              images={account.images}
              imageAlt={imageAlt}
              status={account.status}
              currentRentEndsAt={account.currentRentEndsAt?.toISOString() || null}
            />
            <div className="p-4">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="mr-auto text-2xl font-black text-[#111827]">{detailTitle}</h1>
                <span className="rounded-full bg-pink-100 px-3 py-1 text-sm font-black text-pink-600">SSS {account.sssCount}</span>
                <span className="rounded-full bg-red-600 px-3 py-1 text-sm font-black text-white">{account.status === "renting" ? "Đang thuê" : account.status === "maintenance" ? "Bảo trì" : "Sẵn sàng"}</span>
              </div>
              <p className="mt-3 text-sm text-slate-700">{account.description}</p>
              <h2 className="mt-5 text-xl font-black text-[#111827]">Thông tin ACC</h2>
              <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {stats.map(([label, value, Icon]) => (
                  <div key={String(label)} className="rounded-[18px] border border-[#f3d6e6] bg-[#fff5fb] p-3">
                    <Icon className="mb-2 h-5 w-5 text-[#ec3f96]" />
                    <p className="text-xs font-bold text-slate-500">{label}</p>
                    <p className="font-black text-[#111827]">{value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <AccountImageGallery thumbnailUrl={account.thumbnailUrl} images={account.images} imageAlt={imageAlt} />
          <section>
            <h2 className="mb-3 text-xl font-black text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.45)]">Đánh giá khách thuê ACC</h2>
            <ReviewList reviews={account.reviews} />
          </section>
        </section>
        <aside className="space-y-4">
          <div className="rounded-[22px] border border-[#f3d6e6] bg-white p-4 shadow-[0_12px_32px_rgba(236,63,150,0.12)]">
            <h2 className="text-lg font-black text-[#111827]">Bảng giá thuê ACC</h2>
            <div className="mt-3 space-y-2">
              <p className="rounded-full bg-amber-100 px-3 py-2 font-black text-orange-700">{money(account.priceHourly)} / giờ</p>
              <p className="rounded-full bg-amber-100 px-3 py-2 font-black text-orange-700">{money(account.priceNight)} / đêm</p>
              <p className="rounded-full bg-amber-100 px-3 py-2 font-black text-orange-700">{money(account.priceDaily)} / ngày</p>
            </div>
          </div>
          <ZaloRentCard
            account={{
              name: account.name,
              status: account.status,
              skinCount: account.skinCount,
              sssCount: account.sssCount,
              priceHourly: account.priceHourly,
              priceNight: account.priceNight,
              priceDaily: account.priceDaily,
              currentRentEndsAt: account.currentRentEndsAt?.toISOString() || null
            }}
            zaloHref={getZaloHref(settings)}
            rentalGuide={settings.rentalGuide}
          />
          <ReviewForm accountId={account.id} />
        </aside>
      </div>
    </main>
  );
}
