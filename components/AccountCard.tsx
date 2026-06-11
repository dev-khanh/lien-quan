import Image from "next/image";
import Link from "next/link";
import { Crown, Diamond, Handshake, Zap } from "lucide-react";
import { CountdownTimer } from "@/components/CountdownTimer";
import { money } from "@/lib/format";

type AccountCardProps = {
  account: {
    id: string;
    slug: string;
    name: string;
    thumbnailUrl: string;
    sssCount: number;
    collaborationCount: number;
    vipLevel: string;
    priceHourly: number;
    priceNight: number;
    priceDaily: number;
    skinCount: number;
    status: "available" | "renting" | "maintenance" | "hidden";
    currentRentEndsAt: string | null;
  };
  priority?: boolean;
};

export function AccountCard({ account, priority = false }: AccountCardProps) {
  const renting = account.status === "renting";
  const maintenance = account.status === "maintenance";
  const available = account.status === "available";
  const vipText = account.vipLevel.toUpperCase().startsWith("VIP") ? account.vipLevel.toUpperCase() : `VIP ${account.vipLevel}`;
  const imageAlt = `Ảnh ${account.name} Liên Quân ${account.skinCount} skin ${account.sssCount} SSS`;
  return (
    <article className={`overflow-hidden rounded-[22px] border bg-white shadow-[0_18px_42px_rgba(26,10,40,0.16)] transition duration-200 hover:-translate-y-1 hover:shadow-[0_24px_58px_rgba(236,63,150,0.24)] ${renting || maintenance ? "border-[#f6d7e6]" : "border-[#ffc3dc]"}`}>
      <Link href={`/acc/${account.slug}`} className="block">
        <div className="relative aspect-[1.48/1] overflow-hidden bg-[#fff5fb]">
          <Image
            src={account.thumbnailUrl}
            alt={imageAlt}
            fill
            unoptimized={account.thumbnailUrl.startsWith("/")}
            priority={priority}
            sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
            className={`object-cover transition duration-300 ${renting || maintenance ? "grayscale brightness-[0.58]" : ""}`}
          />
          {renting && (
            <span className="absolute right-3 top-3 rounded-full bg-[#ff4d4f] px-4 py-2 text-[12px] font-black uppercase tracking-wide text-white shadow-[0_10px_22px_rgba(255,77,79,0.30)]">
              ĐANG THUÊ
            </span>
          )}
          {maintenance && (
            <span className="absolute right-3 top-3 rounded-full bg-orange-500 px-3 py-1.5 text-[11px] font-black uppercase tracking-wide text-white shadow-md">
              BẢO TRÌ
            </span>
          )}
          {available && (
            <span className="absolute right-3 top-3 rounded-full bg-emerald-500 px-3 py-1.5 text-[11px] font-black uppercase tracking-wide text-white shadow-[0_10px_22px_rgba(16,185,129,0.28)]">
              Sẵn sàng
            </span>
          )}
        </div>
      </Link>
      <div className="space-y-4 p-5">
        <h3 className="line-clamp-1 text-center text-2xl font-black uppercase tracking-tight text-[#111827]">{account.name}</h3>

        <div className="grid grid-cols-3 gap-2">
          <span className="inline-flex items-center justify-center gap-1 rounded-lg border border-[#ffc3dc] bg-[#fff1f7] px-2 py-2 text-center text-[12px] font-black uppercase text-[#ec3f96] shadow-[0_6px_16px_rgba(255,47,159,0.10)]">
            <Diamond className="h-4 w-4 fill-current" />
            SSS {account.sssCount}
          </span>
          <span className="inline-flex items-center justify-center gap-1 rounded-lg border border-[#ffc3dc] bg-[#fff1f7] px-2 py-2 text-center text-[12px] font-black uppercase text-[#ec3f96] shadow-[0_6px_16px_rgba(255,47,159,0.10)]">
            <Handshake className="h-4 w-4" />
            HỢP TÁC {account.collaborationCount}
          </span>
          <span className="inline-flex items-center justify-center gap-1 rounded-lg border border-[#ffc3dc] bg-[#fff1f7] px-2 py-2 text-center text-[12px] font-black uppercase text-[#ec3f96] shadow-[0_6px_16px_rgba(255,47,159,0.10)]">
            <Crown className="h-4 w-4 fill-current" />
            {vipText}
          </span>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {[
            ["GIỜ", account.priceHourly],
            ["ĐÊM", account.priceNight],
            ["NGÀY", account.priceDaily]
          ].map(([label, price]) => (
            <div
              key={String(label)}
              className="min-w-0 rounded-2xl border border-[#ffe08a] bg-gradient-to-b from-[#fff7d6] to-[#ffefb0] px-1.5 py-2 text-center shadow-[0_6px_14px_rgba(236,143,0,0.12)]"
            >
              <div className="text-[11px] font-bold uppercase leading-none text-[#b45309]">{label}</div>
              <div className="mt-1 truncate text-[13px] font-extrabold leading-tight text-[#d9480f] sm:text-[14px]">{money(Number(price))}</div>
            </div>
          ))}
        </div>

        {renting && account.currentRentEndsAt ? (
          <CountdownTimer endAt={account.currentRentEndsAt} variant="bar" />
        ) : maintenance ? (
          <button disabled className="block w-full cursor-not-allowed rounded-2xl bg-slate-200 px-3 py-3.5 text-center text-sm font-black uppercase tracking-wide text-slate-500">
            BẢO TRÌ
          </button>
        ) : (
          <Link
            href={`/accounts/${account.slug}`}
            className="flex h-14 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#f91f7f] via-[#ec3f96] to-[#ff6a57] px-3 text-center text-lg font-black uppercase tracking-wide text-white shadow-[0_14px_26px_rgba(236,63,150,0.30)]"
          >
            <Zap className="h-5 w-5 fill-current" />
            THUÊ NGAY
          </Link>
        )}
      </div>
    </article>
  );
}
