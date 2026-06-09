"use client";

import { MessageCircle } from "lucide-react";
import { usePathname } from "next/navigation";

export function FloatingZaloButton() {
  const pathname = usePathname();
  if (pathname.startsWith("/pt-admin")) return null;

  const zaloUrl = process.env.NEXT_PUBLIC_ZALO_URL || "https://zalo.me";

  return (
    <a
      href={zaloUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Kết bạn Zalo"
      className="fixed bottom-5 right-4 z-50 inline-flex h-14 items-center gap-2 rounded-full bg-[#0068ff] px-4 text-sm font-black text-white shadow-[0_14px_32px_rgba(0,104,255,0.35)] transition hover:-translate-y-0.5 hover:bg-[#0057d6] focus:outline-none focus:ring-4 focus:ring-blue-200 sm:right-6"
    >
      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-[#0068ff]">
        <MessageCircle className="h-5 w-5" />
      </span>
      <span>Zalo</span>
    </a>
  );
}
