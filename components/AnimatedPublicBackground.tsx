"use client";

import { usePathname } from "next/navigation";

export function AnimatedPublicBackground() {
  const pathname = usePathname();
  if (pathname.startsWith("/pt-admin")) return null;

  return (
    <div aria-hidden="true" className="public-bg">
      <div className="public-bg__image" />
      <div className="public-bg__veil" />
      <div className="public-bg__sparks public-bg__sparks--one" />
      <div className="public-bg__sparks public-bg__sparks--two" />
    </div>
  );
}
