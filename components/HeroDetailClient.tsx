"use client";

import { useState } from "react";
import Link from "next/link";
import { HeroImage } from "@/components/HeroImage";
import type { FeaturedHero } from "@/lib/heroes";

export function HeroDetailClient({ hero }: { hero: FeaturedHero }) {
  const [skinIndex, setSkinIndex] = useState(0);
  const [skillIndex, setSkillIndex] = useState(0);
  const activeSkin = hero.skins[skinIndex] || hero.skins[0];
  const activeSkill = hero.skills[skillIndex] || hero.skills[0];
  const splashUrl = activeSkin?.splashUrl || hero.splashUrl;

  // badges removed: overlay will no longer show badge row (header remains primary)

  return (
    <section className="space-y-6">
      {/* Header above splash: show skin logo + name centered */}
      <div className="rounded-[12px]">
        <div className="flex items-center justify-center relative overflow-hidden rounded-[12px] border border-white/[0.18] bg-white/[0.04] h-[120px] sm:h-[140px] backdrop-blur-[6px]">
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.02),transparent_20%,rgba(255,255,255,0.02))] pointer-events-none" />
          <div className="relative z-10 flex items-center justify-center gap-4 px-4 text-center">
            {activeSkin?.logoUrl ? (
              <img src={activeSkin.logoUrl} alt={`${activeSkin.name} logo`} className="h-12 w-auto object-contain sm:h-16" />
            ) : null}
            <h2 className="text-2xl font-black text-[#f3d9a3] sm:text-4xl">{activeSkin?.name || hero.name}</h2>
          </div>
        </div>
      </div>

      <div className="relative overflow-hidden rounded-[28px] border border-white/[0.18] bg-[#090513] shadow-[0_24px_70px_rgba(0,0,0,0.35)]">
        <HeroImage src={splashUrl} alt={`Ảnh splash ${hero.name} ${activeSkin?.name || ""}`} className="h-[320px] w-full object-cover sm:h-[460px] max-h-[720px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.12),transparent_18%),radial-gradient(circle_at_bottom_right,rgba(152,96,255,0.16),transparent_35%),linear-gradient(180deg,rgba(0,0,0,0.02),rgba(0,0,0,0.82))]" />
        <div className="absolute inset-x-0 bottom-0 px-5 pb-6 pt-5 text-white sm:px-8 sm:pb-8">
          <p className="text-xs font-black uppercase tracking-[0.36em] text-[#c8d0ff]/75">{hero.role}</p>
          <p className="mt-4 max-w-3xl text-sm font-semibold leading-6 text-white/80 sm:text-base">{hero.description}</p>
        </div>
      </div>

      <section className="rounded-[24px] border border-white/[0.18] bg-white/[0.06] p-4 shadow-[0_18px_48px_rgba(13,7,35,0.22)] backdrop-blur-[8px] sm:p-5">
        <h2 className="text-2xl font-black text-white">Trang phục</h2>
        <div className="mt-4 grid auto-cols-[120px] grid-flow-col gap-3 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {hero.skins.map((skin, index) => {
            const active = skinIndex === index;
            return (
              <button
                key={`${skin.name}-${index}`}
                type="button"
                onClick={() => setSkinIndex(index)}
                className={`relative min-w-[120px] overflow-hidden rounded-[24px] border p-0 text-left transition duration-200 ${
                  active
                    ? "border-[#f3c66b] shadow-[0_0_0_8px_rgba(243,198,107,0.12)]"
                    : "border-white/12 bg-[#0f091e] hover:border-white/20"
                }`}
              >
                <HeroImage src={skin.thumbnailUrl} alt={`Skin ${skin.name}`} className="h-28 w-full object-cover" />
                <div className="p-3">
                  <p className="text-xs font-black uppercase tracking-[0.2em] text-white/70">{skin.badge}</p>
                  <p className="mt-2 line-clamp-2 text-sm font-black text-white">{skin.name}</p>
                </div>
                {active && <div className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-[#f3c66b] via-[#ff8edb] to-[#675cff]" />}
              </button>
            );
          })}
        </div>
      </section>

      <section className="rounded-[24px] border border-white/[0.18] bg-white/[0.06] p-4 shadow-[0_18px_48px_rgba(13,7,35,0.22)] backdrop-blur-[8px] sm:p-5">
        <h2 className="text-2xl font-black text-white">Kỹ năng</h2>
        <div className="mt-6 flex gap-4 overflow-x-auto pb-2 sm:gap-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {hero.skills.map((skill, index) => {
            const active = skillIndex === index;
            return (
              <button
                key={`${skill.name}-${index}`}
                type="button"
                onClick={() => setSkillIndex(index)}
                className={`relative flex h-[84px] w-[84px] min-w-[84px] items-center justify-center rounded-full border-2 bg-[#120b24] transition duration-200 focus:outline-none sm:h-[112px] sm:w-[112px] sm:min-w-[112px] ${
                  active
                    ? "border-[#f3c66b] shadow-[0_0_0_3px_rgba(243,198,107,0.12),0_0_24px_rgba(243,198,107,0.28)] opacity-100"
                    : "border-[rgba(255,255,255,0.28)] opacity-80"
                }`}
                aria-label={skill.name}
              >
                <span
                  className={`absolute left-[-8px] top-1/2 h-3 w-3 -translate-y-1/2 rotate-45 rounded-sm ${
                    active ? "bg-[#f3c66b]" : "bg-white/40"
                  }`}
                />
                <span
                  className={`absolute right-[-8px] top-1/2 h-3 w-3 -translate-y-1/2 rotate-45 rounded-sm ${
                    active ? "bg-[#f3c66b]" : "bg-white/40"
                  }`}
                />
                <div className={`flex h-[64px] w-[64px] items-center justify-center rounded-full bg-[#0e0821] ${active ? "scale-[1.03]" : ""} sm:h-[80px] sm:w-[80px]`}>
                  <HeroImage
                    src={skill.iconUrl}
                    alt={`Kỹ năng ${skill.name}`}
                    className="h-full w-full rounded-full object-cover"
                  />
                </div>
              </button>
            );
          })}
        </div>
        {activeSkill && (
          <div className="mt-8 max-w-3xl text-white">
            <h3 className="text-[28px] font-extrabold leading-tight text-[#f3c66b] sm:text-[38px]">{activeSkill.name}</h3>
            <p className="mt-4 text-[17px] leading-[1.55] text-white/[0.88] sm:text-[22px]">{activeSkill.description}</p>
          </div>
        )}
      </section>

      <Link href="/tuong" className="inline-flex rounded-xl border border-white/22 bg-white/10 px-4 py-2 text-sm font-black text-white backdrop-blur transition hover:bg-white/16">
        ← Danh sách tướng
      </Link>
    </section>
  );
}
