"use client";

import { Clock3 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

export function CountdownTimer({ endAt, variant = "pill" }: { endAt: string | Date | null; variant?: "pill" | "bar" }) {
  const target = useMemo(() => (endAt ? new Date(endAt).getTime() : 0), [endAt]);
  const [mounted, setMounted] = useState(false);
  const [left, setLeft] = useState(0);

  useEffect(() => {
    setMounted(true);
    setLeft(Math.max(0, target - Date.now()));
    const id = window.setInterval(() => setLeft(Math.max(0, target - Date.now())), 1000);
    return () => window.clearInterval(id);
  }, [target]);

  const hours = Math.floor(left / 3_600_000);
  const minutes = Math.floor((left % 3_600_000) / 60_000);
  const seconds = Math.floor((left % 60_000) / 1000);

  const pad = (value: number) => String(value).padStart(2, "0");
  const text = mounted ? `CÒN ${pad(hours)} GIỜ ${pad(minutes)} PHÚT ${pad(seconds)} GIÂY` : "CÒN -- GIỜ -- PHÚT -- GIÂY";

  if (variant === "bar") {
    return (
      <div className="flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-[#eef7ff] px-3 text-center text-[12px] font-black uppercase text-[#e53935] shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] sm:text-sm">
        <Clock3 className="h-4 w-4" />
        <span>{text}</span>
      </div>
    );
  }

  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-[#eef7ff] px-2 py-1 text-xs font-bold text-[#e53935]">
      <Clock3 className="h-3.5 w-3.5" />
      {text}
    </span>
  );
}
