"use client";

import { Star } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { ImageLightbox, type LightboxImage } from "@/components/ImageLightbox";

export function ReviewList({ reviews }: { reviews: { id: string; customerName: string; rating: number; comment: string; images?: { id: string; url: string }[] }[] }) {
  const [lightboxImages, setLightboxImages] = useState<LightboxImage[]>([]);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [open, setOpen] = useState(false);
  if (reviews.length === 0) return <p className="rounded-[18px] border border-[#f3d6e6] bg-white/80 p-4 text-sm font-semibold text-[#111827]">Chưa có đánh giá được duyệt.</p>;
  return (
    <>
      <div className="space-y-3">
        {reviews.map((review) => {
          const images = (review.images || []).map((image, index) => ({ src: image.url, alt: `Ảnh đánh giá ${review.customerName} ${index + 1}` }));
          return (
            <div key={review.id} className="rounded-[18px] border border-[#f3d6e6] bg-white p-4 shadow-[0_12px_32px_rgba(236,63,150,0.10)]">
              <div className="flex items-center justify-between gap-3">
                <strong>{review.customerName}</strong>
                <span className="flex text-amber-500">
                  {Array.from({ length: review.rating }).map((_, index) => <Star key={index} className="h-4 w-4 fill-current" />)}
                </span>
              </div>
              <p className="mt-2 text-sm text-slate-700">{review.comment}</p>
              {images.length > 0 && (
                <div className="mt-3 grid grid-cols-3 gap-2">
                  {images.map((image, index) => (
                    <button key={`${image.src}-${index}`} type="button" onClick={() => { setLightboxImages(images); setLightboxIndex(index); setOpen(true); }} className="relative aspect-square overflow-hidden rounded-lg border border-[#f3d6e6] transition hover:border-[#ec3f96]">
                      <Image src={image.src} alt={image.alt} fill unoptimized={image.src.startsWith("/")} className="object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
      <ImageLightbox images={lightboxImages} initialIndex={lightboxIndex} open={open} onClose={() => setOpen(false)} />
    </>
  );
}
