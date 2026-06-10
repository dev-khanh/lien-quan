import Link from "next/link";
import type { Metadata } from "next";
import { FeaturedHeroesSection } from "@/components/FeaturedHeroesSection";
import { featuredHeroes } from "@/lib/heroes";

export const metadata: Metadata = {
  title: "Danh sách tướng nổi bật Liên Quân | Shop thuê ACC",
  description: "Xem các tướng Liên Quân nổi bật, skin đẹp, kỹ năng và ACC đang có tướng/skin liên quan.",
  alternates: { canonical: "/tuong" }
};

export default function HeroesPage() {
  return (
    <main className="mx-auto max-w-[1360px] px-4 pb-24 pt-5 sm:px-6 lg:py-8">
      <Link href="/" className="mb-4 inline-block rounded-md border border-white/20 bg-white/10 px-3 py-2 text-sm font-bold text-white backdrop-blur">← Về trang chủ</Link>
      <FeaturedHeroesSection />
      <section className="rounded-[28px] border border-white/[0.18] bg-white/[0.08] p-5 text-white backdrop-blur-[8px]">
        <h1 className="text-3xl font-black">Danh sách tướng Liên Quân nổi bật</h1>
        <p className="mt-2 text-sm font-semibold text-white/[0.74]">Chọn tướng để xem trang phục, kỹ năng và ACC liên quan.</p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {featuredHeroes.map((hero) => (
            <Link key={hero.slug} href={`/tuong/${hero.slug}`} className="rounded-2xl border border-white/16 bg-[#13061f]/70 p-4 transition hover:-translate-y-0.5 hover:border-[#ec3f96]">
              <p className="text-xl font-black">{hero.name}</p>
              <p className="mt-1 text-sm font-bold text-[#ff9bd0]">{hero.role} • {hero.badge}</p>
              <p className="mt-2 line-clamp-2 text-sm font-semibold text-white/[0.68]">{hero.description}</p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
