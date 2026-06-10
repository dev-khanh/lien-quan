"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Diamond } from "lucide-react";
import { useMemo, useRef, useState } from "react";
import type { PublicAccount } from "@/components/PublicAccountBrowser";
import { money } from "@/lib/format";
import { CountdownTimer } from "@/components/CountdownTimer";

function availableFirst(a: PublicAccount, b: PublicAccount) {
  if (a.status === "available" && b.status !== "available") return -1;
  if (a.status !== "available" && b.status === "available") return 1;
  return 0;
}

export function FeaturedAccountSlider({ accounts }: { accounts: PublicAccount[] }) {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const slides = useMemo(() => {
    const publicAccounts = accounts.filter((account) => account.status !== "hidden");
    const featured = publicAccounts.filter((account) => account.isFeatured);
    const source = featured.length
      ? [...featured].sort((a, b) => availableFirst(a, b) || (a.featuredOrder ?? 9999) - (b.featuredOrder ?? 9999) || b.sssCount - a.sssCount)
      : [...publicAccounts].sort((a, b) => availableFirst(a, b) || b.sssCount - a.sssCount);
    return source.slice(0, 6);
  }, [accounts]);

  if (!slides.length) return null;

  function scrollTo(index: number) {
    const slider = sliderRef.current;
    const slide = slider?.children[index] as HTMLElement | undefined;
    if (!slider || !slide) return;
    slider.scrollTo({ left: slide.offsetLeft - slider.offsetLeft, behavior: "smooth" });
    setActiveIndex(index);
  }

  function handleScroll() {
    const slider = sliderRef.current;
    if (!slider) return;
    const nextIndex = Math.round(slider.scrollLeft / Math.max(1, slider.clientWidth));
    setActiveIndex(Math.min(slides.length - 1, Math.max(0, nextIndex)));
  }

  return (
    <section className="mb-6 rounded-[28px] border border-white/[0.16] bg-[#12051f]/88 px-4 pb-5 pt-5 shadow-[0_18px_54px_rgba(13,7,35,0.30)] backdrop-blur-[8px] sm:px-8 sm:pb-6 sm:pt-7">
      <div className="mb-4 flex items-center justify-between gap-4">
        <div className="min-w-0">
          <h2 className="text-2xl font-black text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.45)]">Skin SSS nổi bật</h2>
          <p className="mt-1 hidden text-base font-semibold text-white/[0.78] drop-shadow-[0_2px_8px_rgba(0,0,0,0.35)] sm:block lg:text-[17px]">Acc nhiều skin, nhiều SSS, sẵn sàng thuê</p>
        </div>
        <div className="hidden gap-2 md:flex">
          <button type="button" onClick={() => scrollTo(Math.max(0, activeIndex - 1))} className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/18 bg-white/10 text-white/90 shadow-[0_10px_24px_rgba(0,0,0,0.18)] backdrop-blur transition hover:border-[#ff7fc0] hover:bg-[#ec3f96]/35" aria-label="Slide trước">
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button type="button" onClick={() => scrollTo(Math.min(slides.length - 1, activeIndex + 1))} className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/18 bg-white/10 text-white/90 shadow-[0_10px_24px_rgba(0,0,0,0.18)] backdrop-blur transition hover:border-[#ff7fc0] hover:bg-[#ec3f96]/35" aria-label="Slide sau">
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div ref={sliderRef} onScroll={handleScroll} className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {slides.map((account, index) => {
          const imageUrl = account.featuredImageUrl || account.thumbnailUrl;
          const hasFeaturedImage = Boolean(account.featuredImageUrl);
          const lowestPrice = Math.min(account.priceHourly, account.priceNight, account.priceDaily);
          const available = account.status === "available";
          const alt = `Ảnh skin ${account.name} Liên Quân ${account.skinCount} skin ${account.sssCount} SSS`;
          return (
            <article
              key={account.id}
              className="relative h-[260px] min-w-full snap-start overflow-hidden rounded-[28px] border border-white/[0.16] bg-[#12051f] shadow-[0_24px_70px_rgba(0,0,0,0.35)] sm:h-[330px] lg:h-[340px]"
            >
              <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(20,10,40,.98),rgba(120,20,90,.72))]" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(236,63,150,0.22),transparent_28%),radial-gradient(circle_at_70%_18%,rgba(255,198,92,0.10),transparent_32%)]" />

              <div className="absolute right-0 top-0 hidden h-full w-[70%] overflow-hidden rounded-l-[26px] border-l border-[#ec3f96]/30 shadow-[inset_1px_0_0_rgba(255,255,255,0.10)] sm:block">
                <Image
                  src={imageUrl}
                  alt={alt}
                  fill
                  sizes="(min-width: 1024px) 900px, 70vw"
                  priority={index === 0}
                  loading={index === 0 ? undefined : "lazy"}
                  unoptimized={imageUrl.startsWith("/")}
                  className={`object-cover object-right opacity-95 ${available ? "" : "grayscale-[0.6]"} ${hasFeaturedImage ? "contrast-[1.05] brightness-[0.95]" : "scale-[0.98] saturate-[0.9] brightness-[0.82] contrast-[1.03]"}`}
                />
                <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(10,5,25,0.42)_0%,rgba(10,5,25,0.18)_22%,rgba(10,5,25,0.04)_58%,rgba(10,5,25,0)_100%)]" />
              </div>

              <div className="absolute inset-0 sm:hidden">
                <Image
                  src={imageUrl}
                  alt={alt}
                  fill
                  sizes="100vw"
                  priority={index === 0}
                  loading={index === 0 ? undefined : "lazy"}
                  unoptimized={imageUrl.startsWith("/")}
                  className={`object-cover object-right opacity-90 ${available ? "" : "grayscale-[0.6]"} ${hasFeaturedImage ? "contrast-[1.05] brightness-[0.95]" : "scale-[0.98] saturate-[0.9] brightness-[0.82] contrast-[1.03]"}`}
                />
                <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(10,5,25,.96)_0%,rgba(10,5,25,.82)_54%,rgba(10,5,25,.30)_100%)]" />
              </div>

              <div className="absolute inset-0 hidden bg-[linear-gradient(90deg,rgba(10,5,25,0.96)_0%,rgba(10,5,25,0.88)_32%,rgba(10,5,25,0.35)_48%,rgba(10,5,25,0.05)_100%)] sm:block" />

              <div className="relative z-10 flex h-full max-w-[390px] flex-col justify-center px-5 py-5 text-white sm:w-[34%] sm:px-7 sm:py-8 lg:px-8">
                <div className="mb-2 flex flex-wrap items-center gap-2 sm:mb-3">
                  <span className="inline-flex items-center gap-1 rounded-full border border-[#ff9bd0]/35 bg-[#ec3f96]/90 px-3 py-1 text-[11px] font-black uppercase text-white shadow-[0_8px_20px_rgba(236,63,150,0.28)]">
                    <Diamond className="h-3.5 w-3.5 fill-current" />
                    SSS {account.sssCount}
                  </span>
                  <span className={`rounded-full px-3 py-1 text-[11px] font-black uppercase shadow-[0_8px_20px_rgba(0,0,0,0.18)] ${available ? "bg-emerald-500 text-white" : "bg-red-500 text-white"}`}>
                    {available ? "Sẵn sàng" : "Đang thuê"}
                  </span>
                </div>
                <h3 className="mt-1 max-w-[390px] text-[22px] font-black uppercase leading-tight tracking-normal sm:text-[28px]">
                  {account.name} - {account.sssCount} Skin SSS
                </h3>
                <p className="mt-2 text-[13px] font-bold text-white/[0.76] sm:text-sm">
                  {account.skinCount} skin • {account.vipLevel} • Hợp tác {account.collaborationCount}
                </p>
                <p className="mt-2 text-xl font-black text-white sm:mt-4 sm:text-2xl">Từ {money(lowestPrice)} / giờ</p>
                {!available && account.currentRentEndsAt && (
                  <div className="mt-2 max-w-fit overflow-hidden rounded-xl border border-white/12 bg-white/10 text-xs backdrop-blur">
                    <CountdownTimer endAt={account.currentRentEndsAt} />
                  </div>
                )}
                <div className="mt-4 flex flex-wrap gap-2">
                  {available ? (
                    <Link href={`/accounts/${account.slug}`} className="inline-flex h-11 items-center justify-center rounded-xl bg-gradient-to-r from-[#ff2f9f] to-[#ff6b6b] px-5 text-sm font-black uppercase text-white shadow-[0_14px_26px_rgba(236,63,150,0.32)]">
                      Thuê ngay
                    </Link>
                  ) : (
                    <button disabled className="inline-flex h-11 cursor-not-allowed items-center justify-center rounded-xl bg-white/18 px-5 text-sm font-black uppercase text-white/70 backdrop-blur">
                      Đang thuê
                    </button>
                  )}
                  <Link href={`/accounts/${account.slug}`} className="hidden h-11 items-center justify-center rounded-xl border border-white/30 bg-white/8 px-5 text-sm font-black uppercase text-white backdrop-blur transition hover:bg-white/15 sm:inline-flex">
                    Xem chi tiết
                  </Link>
                </div>
              </div>
            </article>
          );
        })}
      </div>
      <div className="mt-3 flex justify-center gap-2">
        {slides.map((slide, index) => (
          <button key={slide.id} type="button" onClick={() => scrollTo(index)} aria-label={`Chuyển tới slide ${index + 1}`} className={`h-2 rounded-full transition ${activeIndex === index ? "w-[34px] bg-[#ec3f96]" : "w-2 bg-white/35 hover:bg-white/60"}`} />
        ))}
      </div>
    </section>
  );
}
