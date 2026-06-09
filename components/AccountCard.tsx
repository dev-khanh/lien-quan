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
};

export function AccountCard({ account }: AccountCardProps) {
  const renting = account.status === "renting";
  return (
    <article className="overflow-hidden rounded-3xl bg-white shadow-[0_10px_26px_rgba(84,24,101,0.18)] ring-1 ring-white/70">
      <Link href={`/accounts/${account.slug}`} className="block">
        <div className="relative aspect-[16/10] overflow-hidden bg-purple-100">
          <Image
            src={account.thumbnailUrl}
            alt={account.name}
            fill
            sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
            className={`object-cover transition duration-300 ${renting ? "grayscale brightness-50" : ""}`}
          />
          {renting && (
            <span className="absolute right-3 top-3 rounded-full bg-red-600 px-3 py-1 text-[11px] font-black uppercase tracking-wide text-white shadow-md">
              ĐANG THUÊ
            </span>
          )}
        </div>
      </Link>
      <div className="space-y-4 p-4">
        <h3 className="line-clamp-1 text-center text-lg font-black uppercase text-slate-950">{account.name}</h3>

        <div className="grid grid-cols-3 gap-2">
          <span className="rounded-full bg-pink-500 px-2 py-1.5 text-center text-[11px] font-black text-white shadow-[0_0_14px_rgba(236,72,153,0.45)]">
            SSS {account.sssCount}
          </span>
          <span className="rounded-full bg-pink-500 px-2 py-1.5 text-center text-[11px] font-black text-white shadow-[0_0_14px_rgba(236,72,153,0.45)]">
            HỢP TÁC {account.collaborationCount}
          </span>
          <span className="rounded-full bg-pink-500 px-2 py-1.5 text-center text-[11px] font-black text-white shadow-[0_0_14px_rgba(236,72,153,0.45)]">
            {account.vipLevel}
          </span>
        </div>

        <div className="grid grid-cols-3 gap-2">
          <span className="rounded-full bg-amber-100 px-2 py-2 text-center text-[11px] font-black text-orange-700">
            GIỜ {money(account.priceHourly)}
          </span>
          <span className="rounded-full bg-amber-100 px-2 py-2 text-center text-[11px] font-black text-orange-700">
            ĐÊM {money(account.priceNight)}
          </span>
          <span className="rounded-full bg-amber-100 px-2 py-2 text-center text-[11px] font-black text-orange-700">
            NGÀY {money(account.priceDaily)}
          </span>
        </div>

        {renting && account.currentRentEndsAt ? (
          <CountdownTimer endAt={account.currentRentEndsAt} variant="bar" />
        ) : (
          <Link
            href={`/accounts/${account.slug}`}
            className="block rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 px-3 py-3 text-center text-sm font-black uppercase tracking-wide text-white shadow-[0_8px_18px_rgba(168,85,247,0.32)]"
          >
            THUÊ NGAY
          </Link>
        )}
      </div>
    </article>
  );
}
