"use client";

import { useState } from "react";

export function HeroImage({
  src,
  alt,
  className,
  fallbackClassName,
  children
}: {
  src: string;
  alt: string;
  className: string;
  fallbackClassName?: string;
  children?: React.ReactNode;
}) {
  const [failed, setFailed] = useState(false);
  if (failed) {
    return (
      <div className={`${className} ${fallbackClassName || "bg-[radial-gradient(circle_at_35%_28%,rgba(236,63,150,0.35),transparent_34%),linear-gradient(135deg,#20103d,#6d1a70)]"}`}>
        {children}
      </div>
    );
  }
  return <img src={src} alt={alt} onError={() => setFailed(true)} className={className} />;
}
