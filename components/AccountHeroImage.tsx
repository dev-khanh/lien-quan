"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { ImageLightbox, type LightboxImage } from "@/components/ImageLightbox";
import { CountdownTimer } from "@/components/CountdownTimer";

type AccountHeroImageProps = {
  thumbnailUrl: string;
  images: Array<{ id: string; url: string; alt?: string | null }>;
  imageAlt: string;
  status: string;
  currentRentEndsAt: string | null;
};

export function AccountHeroImage({ thumbnailUrl, images, imageAlt, status, currentRentEndsAt }: AccountHeroImageProps) {
  const [open, setOpen] = useState(false);
  const lightboxImages = useMemo<LightboxImage[]>(
    () => Array.from(new Map([
      { src: thumbnailUrl, alt: imageAlt },
      ...images.map((image, index) => ({ src: image.url, alt: image.alt || `${imageAlt} ${index + 2}` }))
    ].map((image) => [image.src, image])).values()),
    [thumbnailUrl, images, imageAlt]
  );

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="group relative block h-[min(56vw,520px)] min-h-[260px] w-full cursor-zoom-in overflow-hidden bg-slate-950/5 text-left sm:min-h-[340px]"
        aria-label="Xem ảnh ACC đầy đủ"
      >
        <Image
          src={thumbnailUrl}
          alt={imageAlt}
          fill
          unoptimized={thumbnailUrl.startsWith("/")}
          className="object-contain transition duration-200 group-hover:scale-[1.01]"
          priority
        />
        {status === "renting" && <div className="absolute left-3 top-3"><CountdownTimer endAt={currentRentEndsAt} /></div>}
      </button>
      <ImageLightbox images={lightboxImages} initialIndex={0} open={open} onClose={() => setOpen(false)} />
    </>
  );
}
