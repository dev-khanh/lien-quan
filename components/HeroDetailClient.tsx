"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { HeroImage } from "@/components/HeroImage";
import type { FeaturedHero } from "@/lib/heroes";

export function HeroDetailClient({ hero }: { hero: FeaturedHero }) {
  const [skinIndex, setSkinIndex] = useState(0);
  const [skillIndex, setSkillIndex] = useState(0);
  const activeSkin = hero.skins[skinIndex] || hero.skins[0];
  const activeSkill = hero.skills[skillIndex] || hero.skills[0];
  const splashUrl = activeSkin?.splashUrl || hero.splashUrl;

  const badges = useMemo(() => [hero.badge, activeSkin?.badge].filter(Boolean), [activeSkin?.badge, hero.badge]);

  return (
    <section className="space-y-6">
      <div className="relative overflow-hidden rounded-[28px] border border-white/[0.18] bg-[#13061f] shadow-[0_24px_70px_rgba(0,0,0,0.35)]">
        <HeroImage src={splashUrl} alt={`Ảnh splash ${hero.name} ${activeSkin?.name || ""}`} className="h-[300px] w-full object-cover sm:h-[420px]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#090314] via-[#090314]/42 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-5 text-white sm:p-8">
          <div className="mb-3 flex flex-wrap gap-2">
            <span className="rounded-full bg-[#ec3f96] px-3 py-1 text-xs font-black uppercase">{hero.role}</span>
            {badges.map((badge) => (
              <span key={badge} className="rounded-full border border-white/22 bg-white/12 px-3 py-1 text-xs font-black uppercase backdrop-blur">{badge}</span>
            ))}
          </div>
          <h1 className="text-4xl font-black uppercase tracking-normal sm:text-6xl">{hero.name}</h1>
          <p className="mt-2 max-w-2xl text-sm font-semibold leading-6 text-white/[0.78] sm:text-base">{hero.description}</p>
          {activeSkin && <p className="mt-3 text-lg font-black text-[#ffd166]">Đang xem: {activeSkin.name}</p>}
        </div>
      </div>

      <section className="rounded-[24px] border border-white/[0.18] bg-white/[0.08] p-4 shadow-[0_18px_48px_rgba(13,7,35,0.22)] backdrop-blur-[8px] sm:p-5">
        <h2 className="text-2xl font-black text-white">Trang phục</h2>
        <div className="mt-4 flex snap-x gap-3 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {hero.skins.map((skin, index) => {
            const active = skinIndex === index;
            return (
              <button
                key={`${skin.name}-${index}`}
                type="button"
                onClick={() => setSkinIndex(index)}
                className={`min-w-[150px] snap-start overflow-hidden rounded-2xl border bg-[#160a28] text-left transition hover:-translate-y-0.5 hover:shadow-[0_0_26px_rgba(236,63,150,0.28)] ${active ? "border-[#ffd166] shadow-[0_0_0_3px_rgba(255,209,102,0.18)]" : "border-white/16"}`}
              >
                <HeroImage src={skin.thumbnailUrl} alt={`Skin ${skin.name}`} className="h-24 w-full object-cover" />
                <div className="p-3">
                  <span className="rounded-full bg-[#ec3f96] px-2 py-0.5 text-[10px] font-black uppercase text-white">{skin.badge}</span>
                  <p className="mt-2 line-clamp-2 text-sm font-black text-white">{skin.name}</p>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      <section className="rounded-[24px] border border-white/[0.18] bg-white/[0.08] p-4 shadow-[0_18px_48px_rgba(13,7,35,0.22)] backdrop-blur-[8px] sm:p-5">
        <h2 className="text-2xl font-black text-white">Kỹ năng</h2>
        <div className="mt-4 flex flex-wrap gap-3">
          {hero.skills.map((skill, index) => {
            const active = skillIndex === index;
            return (
              <button
                key={`${skill.name}-${index}`}
                type="button"
                onClick={() => setSkillIndex(index)}
                className={`h-16 w-16 overflow-hidden rounded-full border-2 bg-[#160a28] p-1 transition hover:scale-105 ${active ? "border-[#ffd166] shadow-[0_0_24px_rgba(255,209,102,0.32)]" : "border-white/20"}`}
                aria-label={skill.name}
              >
                <HeroImage src={skill.iconUrl} alt={`Kỹ năng ${skill.name}`} className="h-full w-full rounded-full object-cover" />
              </button>
            );
          })}
        </div>
        {activeSkill && (
          <div className="mt-4 rounded-2xl border border-white/14 bg-[#0f061d]/70 p-4 text-white">
            <h3 className="text-lg font-black">{activeSkill.name}</h3>
            <p className="mt-2 text-sm font-semibold leading-6 text-white/[0.74]">{activeSkill.description}</p>
          </div>
        )}
      </section>

      <Link href="/tuong" className="inline-flex rounded-xl border border-white/22 bg-white/10 px-4 py-2 text-sm font-black text-white backdrop-blur transition hover:bg-white/16">
        ← Danh sách tướng
      </Link>
    </section>
  );
}
