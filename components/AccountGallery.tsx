"use client";

import Image from "next/image";
import { useState } from "react";
import { ImageLightbox, type LightboxImage } from "@/components/ImageLightbox";

export function AccountGallery({ images }: { images: LightboxImage[] }) {
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const main = images[0];
  if (!main) return null;

  function openAt(nextIndex: number) {
    setIndex(nextIndex);
    setOpen(true);
  }

  return (
    <>
      <div className="overflow-hidden rounded-[24px] border border-[#f3d6e6] bg-white shadow-[0_12px_32px_rgba(236,63,150,0.12)]">
        <button type="button" onClick={() => openAt(0)} className="relative block aspect-video w-full cursor-zoom-in overflow-hidden">
          <Image src={main.src} alt={main.alt} fill unoptimized={main.src.startsWith("/")} className="object-cover" priority />
        </button>
      </div>
      {images.length > 1 && (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {images.slice(1).map((image, imageIndex) => (
            <button key={`${image.src}-${imageIndex}`} type="button" onClick={() => openAt(imageIndex + 1)} className="relative aspect-video cursor-zoom-in overflow-hidden rounded-[20px] border border-[#f3d6e6] bg-white shadow-[0_12px_32px_rgba(236,63,150,0.10)] transition hover:border-[#ec3f96] hover:shadow-[0_16px_36px_rgba(236,63,150,0.20)]">
              <Image src={image.src} alt={image.alt} fill unoptimized={image.src.startsWith("/")} className="object-cover" />
            </button>
          ))}
        </div>
      )}
      <ImageLightbox images={images} initialIndex={index} open={open} onClose={() => setOpen(false)} />
    </>
  );
}
