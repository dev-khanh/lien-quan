import Link from "next/link";
import { featuredHeroes } from "@/lib/heroes";
import { HeroImage } from "@/components/HeroImage";

export function FeaturedHeroesSection() {
  return (
    <section className="mb-6 rounded-[28px] border border-white/[0.18] bg-[#12051f]/78 p-5 shadow-[0_18px_48px_rgba(13,7,35,0.28)] backdrop-blur-[8px] sm:p-6">
      <div className="grid gap-5 md:grid-cols-[210px_1fr] md:items-center">
        <div>
          <h2 className="text-2xl font-black uppercase text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.45)]">Tướng nổi bật ✨</h2>
          <p className="mt-2 max-w-[220px] text-sm font-semibold leading-6 text-white/[0.76]">Những vị tướng được ưa chuộng nhất</p>
        </div>
        <div className="grid grid-cols-3 gap-4 md:grid-cols-6">
          {featuredHeroes.map((hero) => (
            <Link key={hero.slug} href={`/tuong/${hero.slug}`} className="group min-w-0 text-center outline-none">
              <div className="mx-auto h-24 w-24 rounded-full border-2 border-[#a66cff] bg-[#251042] p-1 shadow-[0_0_24px_rgba(166,108,255,0.38)] transition duration-200 group-hover:scale-[1.06] group-hover:border-[#ff77bd] group-hover:shadow-[0_0_34px_rgba(236,63,150,0.58)] group-focus-visible:scale-[1.06] group-focus-visible:border-[#ffd166] sm:h-28 sm:w-28">
                <HeroImage src={hero.avatarUrl} alt={`Tướng ${hero.name} Liên Quân`} className="h-full w-full rounded-full object-cover" />
              </div>
              <p className="mt-2 truncate text-sm font-black text-white transition group-hover:text-[#ff9bd0] group-focus-visible:text-[#ffd166] sm:text-base">{hero.name}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
