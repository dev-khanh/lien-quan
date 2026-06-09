"use client";

import { Clock3 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

export function CountdownTimer({ endAt, variant = "pill" }: { endAt: string | Date | null; variant?: "pill" | "bar" }) {
  const target = useMemo(() => (endAt ? new Date(endAt).getTime() : 0), [endAt]);
  const [left, setLeft] = useState(Math.max(0, target - Date.now()));

  useEffect(() => {
    const id = window.setInterval(() => setLeft(Math.max(0, target - Date.now())), 1000);
    return () => window.clearInterval(id);
  }, [target]);

  const hours = Math.floor(left / 3_600_000);
  const minutes = Math.floor((left % 3_600_000) / 60_000);
  const seconds = Math.floor((left % 60_000) / 1000);

  const text = `${hours}h ${minutes}m ${seconds}s`;

  if (variant === "bar") {
    return (
      <div className="flex h-10 w-full items-center justify-center gap-2 rounded-xl bg-cyan-100 px-3 text-sm font-black text-red-600">
        <Clock3 className="h-4 w-4" />
        <span>{text}</span>
      </div>
    );
  }

  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-red-50 px-2 py-1 text-xs font-bold text-red-600">
      <Clock3 className="h-3.5 w-3.5" />
      {text}
    </span>
  );
}
