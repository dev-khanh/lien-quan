import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AccountCard } from "@/components/AccountCard";
import { HeroDetailClient } from "@/components/HeroDetailClient";
import { getHeroBySlug, featuredHeroes } from "@/lib/heroes";
import { prisma } from "@/lib/prisma";
import { expireRentals } from "@/lib/expire-rentals";
import { hasDatabaseUrl } from "@/lib/env";

export async function generateStaticParams() {
  return featuredHeroes.map((hero) => ({ slug: hero.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const hero = getHeroBySlug(params.slug);
  if (!hero) return {};
  return {
    title: `${hero.name} Liên Quân: trang phục, kỹ năng, ACC liên quan | Shop thuê ACC`,
    description: `Xem ${hero.name} Liên Quân, trang phục nổi bật, kỹ năng và các ACC nhiều skin đang có tướng/skin liên quan.`,
    alternates: { canonical: `/tuong/${hero.slug}` },
    openGraph: {
      title: `${hero.name} Liên Quân`,
      description: hero.description,
      url: `/tuong/${hero.slug}`,
      images: [{ url: hero.splashUrl, alt: `Tướng ${hero.name} Liên Quân` }]
    }
  };
}

export default async function HeroDetailPage({ params }: { params: { slug: string } }) {
  const hero = getHeroBySlug(params.slug);
  if (!hero) notFound();
  await expireRentals();
  const accounts = hasDatabaseUrl()
    ? await prisma.account.findMany({
        where: { isVisible: true, status: { not: "hidden" } },
        orderBy: [{ sssCount: "desc" }, { createdAt: "desc" }],
        take: 3
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
    status: account.status,
    currentRentEndsAt: account.currentRentEndsAt?.toISOString() || null
  }));

  return (
    <main className="mx-auto max-w-[1360px] px-4 pb-24 pt-5 sm:px-6 lg:py-8">
      <Link href="/tuong" className="mb-4 inline-block rounded-md border border-white/20 bg-white/10 px-3 py-2 text-sm font-bold text-white backdrop-blur">← Danh sách tướng</Link>
      <HeroDetailClient hero={hero} />
      <section className="mt-6 rounded-[28px] border border-white/[0.18] bg-white/[0.08] p-4 shadow-[0_18px_48px_rgba(13,7,35,0.22)] backdrop-blur-[8px] sm:p-6">
        <h2 className="text-2xl font-black text-white">ACC đang có tướng/skin này</h2>
        <div className="mt-4 grid grid-cols-1 gap-6 min-[560px]:grid-cols-2 lg:grid-cols-3">
          {publicAccounts.map((account) => <AccountCard key={account.id} account={account} />)}
        </div>
      </section>
    </main>
  );
}
