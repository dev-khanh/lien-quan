"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import type { TouchEvent } from "react";
import { ChevronLeft, ChevronRight, X, Minus, Plus, RotateCcw } from "lucide-react";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";

type AccountImageGalleryProps = {
  thumbnailUrl: string;
  images: Array<{ id: string; url: string; alt?: string | null }>;
  imageAlt: string;
};

type GalleryImage = {
  url: string;
  alt: string;
  key: string;
};

const SWIPE_THRESHOLD = 50;
const DOUBLE_CLICK_ZOOM = 2.5;
const MIN_SCALE = 1;
const MAX_SCALE = 5;

export default function AccountImageGallery({ thumbnailUrl, images, imageAlt }: AccountImageGalleryProps) {
  const galleryImages = useMemo<GalleryImage[]>(
    () => [
      { url: thumbnailUrl, alt: imageAlt, key: "thumbnail" },
      ...images.map((image) => ({ url: image.url, alt: image.alt || imageAlt, key: image.id }))
    ],
    [thumbnailUrl, images, imageAlt]
  );

  const [isOpen, setIsOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [scale, setScale] = useState(1);
  const touchStartX = useRef<number | null>(null);
  const resetTransformRef = useRef<() => void>(() => {});

  const currentImage = galleryImages[currentImageIndex];

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setIsOpen(true);
  };

  const closeLightbox = () => {
    setIsOpen(false);
    setScale(1);
    resetTransformRef.current();
  };

  const goToImage = (index: number) => {
    setCurrentImageIndex(index);
    setScale(1);
    resetTransformRef.current();
  };

  const nextImage = () => goToImage((currentImageIndex + 1) % galleryImages.length);
  const prevImage = () => goToImage((currentImageIndex - 1 + galleryImages.length) % galleryImages.length);

  const handleKeyDown = (event: KeyboardEvent) => {
    if (!isOpen) return;
    if (event.key === "Escape") closeLightbox();
    if (event.key === "ArrowRight") nextImage();
    if (event.key === "ArrowLeft") prevImage();
  };

  useEffect(() => {
    if (!isOpen) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen]);

  const handleTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    if (scale > 1) return; // when zoomed, don't start swipe
    touchStartX.current = event.touches[0]?.clientX ?? null;
  };

  const handleTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    if (scale > 1) {
      touchStartX.current = null;
      return; // when zoomed, do not change image
    }
    if (touchStartX.current === null) return;
    const touchEndX = event.changedTouches[0]?.clientX ?? 0;
    const deltaX = touchStartX.current - touchEndX;
    if (deltaX > SWIPE_THRESHOLD) nextImage();
    else if (deltaX < -SWIPE_THRESHOLD) prevImage();
    touchStartX.current = null;
  };

  const handleDoubleClick = (resetTransform: () => void, setTransform: (x: number, y: number, scale: number) => void) => {
    if (scale > 1) {
      resetTransform();
      setScale(1);
    } else {
      setTransform(0, 0, DOUBLE_CLICK_ZOOM);
      setScale(DOUBLE_CLICK_ZOOM);
    }
  };

  return (
    <section>
      <h2 className="mb-3 text-xl font-black text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.45)]">Hình ảnh skin ACC</h2>
      <div className="space-y-4">
        <div className="overflow-hidden rounded-[24px] border border-[#f3d6e6] bg-white shadow-[0_12px_32px_rgba(236,63,150,0.12)]">
          <button
            type="button"
            onClick={() => openLightbox(0)}
            className="group relative block w-full overflow-hidden bg-slate-950/5 px-0 py-0 text-left"
          >
            <div className="relative aspect-video cursor-zoom-in transition duration-200 ease-out group-hover:scale-[1.01]">
              <Image src={thumbnailUrl} alt={imageAlt} fill unoptimized={thumbnailUrl.startsWith("/")} className="object-cover" />
            </div>
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {galleryImages.map((image, index) => (
            <button
              key={image.key}
              type="button"
              onClick={() => openLightbox(index)}
              className="relative aspect-video overflow-hidden rounded-[20px] border border-transparent bg-white shadow-[0_12px_32px_rgba(236,63,150,0.10)] transition hover:border-pink-500 focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-500"
            >
              <Image src={image.url} alt={image.alt} fill unoptimized={image.url.startsWith("/")} className="object-cover" />
            </button>
          ))}
        </div>
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.92)] p-4">
          <TransformWrapper
            initialScale={1}
            minScale={MIN_SCALE}
            maxScale={MAX_SCALE}
            wheel={{ step: 0.2 }}
            pinch={{ step: 5, disabled: false }}
            doubleClick={{ disabled: true }}
            panning={{ disabled: scale === 1 }}
            limitToBounds={false}
            onZoomStop={({ state }) => setScale(state.scale)}
          >
            {({ zoomIn, zoomOut, resetTransform, setTransform }) => (
              <>
                {/* toolbar */}
                <div className="absolute right-4 top-4 z-50 flex items-center gap-2 rounded-full bg-black/30 p-2 shadow-lg">
                  <button
                    type="button"
                    onClick={() => zoomOut()}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
                    aria-label="Zoom out"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => zoomIn()}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
                    aria-label="Zoom in"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      resetTransform();
                      setScale(1);
                    }}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
                    aria-label="Reset zoom"
                  >
                    <RotateCcw className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={closeLightbox}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
                    aria-label="Đóng ảnh"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                {/* expose resetTransform for external usage */}
                {(() => {
                  resetTransformRef.current = resetTransform;
                })()}

                <div className="flex w-full max-w-[1000px] flex-col items-center justify-center gap-4">
                  <div className="relative w-full touch-pan-y" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
                    <div className="relative h-[min(75vh,calc(100vh-180px))] w-full overflow-hidden rounded-[20px] bg-slate-900">
                      <div className={`relative h-full w-full ${scale > 1 ? "cursor-grab" : "cursor-default"}`} onDoubleClick={() => handleDoubleClick(resetTransform, setTransform)}>
                        <TransformComponent wrapperStyle={{ width: "100%", height: "100%" }}>
                          <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <img
                              src={currentImage.url}
                              alt={currentImage.alt}
                              className="object-contain max-w-full max-h-full"
                              style={{ width: 'auto', height: '100%' }}
                            />
                          </div>
                        </TransformComponent>
                      </div>
                    </div>
                  </div>

                  <div className="text-center text-sm font-semibold text-white">{currentImageIndex + 1} / {galleryImages.length}</div>
                </div>
              </>
            )}
          </TransformWrapper>

          <button type="button" onClick={prevImage} className="hidden items-center justify-center rounded-full bg-white/10 p-3 text-white transition hover:bg-white/20 sm:flex sm:absolute sm:left-4 sm:top-1/2 sm:-translate-y-1/2" aria-label="Ảnh trước">
            <ChevronLeft className="h-6 w-6" />
          </button>

          <button type="button" onClick={nextImage} className="hidden items-center justify-center rounded-full bg-white/10 p-3 text-white transition hover:bg-white/20 sm:flex sm:absolute sm:right-4 sm:top-1/2 sm:-translate-y-1/2" aria-label="Ảnh tiếp theo">
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>
      )}
    </section>
  );
}
