import Image from "next/image";
import Link from "next/link";
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
    status: "available" | "renting" | "hidden";
    currentRentEndsAt: Date | string | null;
  };
  priority?: boolean;
};

export function AccountCard({ account, priority = false }: AccountCardProps) {
  const renting = account.status === "renting";
  const vipText = account.vipLevel.toUpperCase().startsWith("VIP") ? account.vipLevel.toUpperCase() : `VIP ${account.vipLevel}`;
  return (
    <article className="overflow-hidden rounded-[24px] border border-[#f3d6e6] bg-white shadow-[0_12px_32px_rgba(236,63,150,0.12)] transition duration-200 hover:-translate-y-1 hover:shadow-[0_18px_42px_rgba(236,63,150,0.18)]">
      <Link href={`/accounts/${account.slug}`} className="block">
        <div className="relative aspect-[1.18/1] overflow-hidden bg-[#fff5fb]">
          <Image
            src={account.thumbnailUrl}
            alt={account.name}
            fill
            unoptimized={account.thumbnailUrl.startsWith("/")}
            priority={priority}
            sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
            className={`object-cover transition duration-300 ${renting ? "grayscale brightness-[0.58]" : ""}`}
          />
          {renting && (
            <span className="absolute right-3 top-3 rounded-full bg-[#ff4d4f] px-3 py-1.5 text-[11px] font-black uppercase tracking-wide text-white shadow-md">
              ĐANG THUÊ
            </span>
          )}
        </div>
      </Link>
      <div className="space-y-4 p-4 sm:p-5">
        <h3 className="line-clamp-1 text-center text-xl font-black uppercase tracking-tight text-[#111827]">{account.name}</h3>

        <div className="grid grid-cols-3 gap-2">
          <span className="rounded-full bg-[#ff2f9f] px-2 py-2 text-center text-[11px] font-black text-white shadow-[0_6px_16px_rgba(255,47,159,0.25)]">
            SSS {account.sssCount}
          </span>
          <span className="rounded-full bg-[#ff2f9f] px-2 py-2 text-center text-[11px] font-black text-white shadow-[0_6px_16px_rgba(255,47,159,0.25)]">
            HỢP TÁC {account.collaborationCount}
          </span>
          <span className="rounded-full bg-[#ff2f9f] px-2 py-2 text-center text-[11px] font-black text-white shadow-[0_6px_16px_rgba(255,47,159,0.25)]">
            {vipText}
          </span>
        </div>

        <div className="grid grid-cols-3 gap-2">
          <span className="rounded-full bg-[#fff2c6] px-2 py-2 text-center text-[11px] font-black text-[#c45a00] shadow-[0_5px_12px_rgba(196,90,0,0.08)]">
            GIỜ {money(account.priceHourly)}
          </span>
          <span className="rounded-full bg-[#fff2c6] px-2 py-2 text-center text-[11px] font-black text-[#c45a00] shadow-[0_5px_12px_rgba(196,90,0,0.08)]">
            ĐÊM {money(account.priceNight)}
          </span>
          <span className="rounded-full bg-[#fff2c6] px-2 py-2 text-center text-[11px] font-black text-[#c45a00] shadow-[0_5px_12px_rgba(196,90,0,0.08)]">
            NGÀY {money(account.priceDaily)}
          </span>
        </div>

        {renting && account.currentRentEndsAt ? (
          <CountdownTimer endAt={account.currentRentEndsAt} variant="bar" />
        ) : (
          <Link
            href={`/accounts/${account.slug}`}
            className="block rounded-2xl bg-gradient-to-r from-[#ff67b5] to-[#ec3f96] px-3 py-3.5 text-center text-sm font-black uppercase tracking-wide text-white shadow-[0_10px_22px_rgba(236,63,150,0.24)]"
          >
            THUÊ NGAY
          </Link>
        )}
      </div>
    </article>
  );
}
