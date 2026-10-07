"use client";

import { MessageCircle, Phone } from "lucide-react";
import { usePathname } from "next/navigation";

const MESSENGER_URL = "https://www.facebook.com/messages/e2ee/t/2615671165560517/";
const PHONE = "0559152153";

const base =
  "inline-flex h-12 w-12 items-center justify-center rounded-full text-sm font-black text-white shadow-lg transition hover:-translate-y-0.5 focus:outline-none focus:ring-4 sm:h-14 sm:w-auto sm:gap-2 sm:px-4";
const icon = "flex h-8 w-8 items-center justify-center rounded-full bg-white";

export function FloatingZaloButton({ zaloHref }: { zaloHref: string }) {
  const pathname = usePathname();
  if (pathname.startsWith("/pt-admin")) return null;

  return (
    <div className="fixed bottom-[calc(env(safe-area-inset-bottom)+1rem)] right-3 z-50 flex flex-col items-end gap-3 sm:right-6">
      <a
        href={`tel:${PHONE}`}
        aria-label={`Gọi ${PHONE}`}
        className={`${base} bg-emerald-500 hover:bg-emerald-600 focus:ring-emerald-200`}
      >
        <span className={`${icon} text-emerald-500`}>
          <Phone className="h-5 w-5" />
        </span>
        <span className="hidden sm:inline">{PHONE}</span>
      </a>
      <a
        href={MESSENGER_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Nhắn tin Messenger"
        className={`${base} bg-[#a033ff] hover:bg-[#8a22e0] focus:ring-purple-200`}
      >
        <span className={`${icon} text-[#a033ff]`}>
          <MessageCircle className="h-5 w-5" />
        </span>
        <span className="hidden sm:inline">Messenger</span>
      </a>
      <a
        href={zaloHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Kết bạn Zalo"
        className={`${base} bg-[#0068ff] hover:bg-[#0057d6] focus:ring-blue-200`}
      >
        <span className={`${icon} text-[#0068ff]`}>
          <MessageCircle className="h-5 w-5" />
        </span>
        <span className="hidden sm:inline">Zalo</span>
      </a>
    </div>
  );
}
