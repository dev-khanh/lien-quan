"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, Minus, Plus, RotateCcw, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

export type LightboxImage = {
  src: string;
  alt: string;
};

export function ImageLightbox({
  images,
  initialIndex,
  open,
  onClose
}: {
  images: LightboxImage[];
  initialIndex: number;
  open: boolean;
  onClose: () => void;
}) {
  const [index, setIndex] = useState(initialIndex);
  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const dragRef = useRef({ x: 0, y: 0, dragging: false });
  const touchStartRef = useRef<{ x: number; y: number; distance: number; scale: number } | null>(null);

  const resetZoom = useCallback(() => {
    setScale(1);
    setOffset({ x: 0, y: 0 });
  }, []);

  const goTo = useCallback((nextIndex: number) => {
    setIndex((nextIndex + images.length) % images.length);
    resetZoom();
  }, [images.length, resetZoom]);

  const next = useCallback(() => goTo(index + 1), [goTo, index]);
  const prev = useCallback(() => goTo(index - 1), [goTo, index]);

  useEffect(() => {
    if (!open) return;
    setIndex(initialIndex);
    resetZoom();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [initialIndex, open, resetZoom]);

  useEffect(() => {
    if (!open) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowRight" && images.length > 1) next();
      if (event.key === "ArrowLeft" && images.length > 1) prev();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [images.length, next, onClose, open, prev]);

  if (!open || images.length === 0) return null;
  const current = images[index];
  const hasMany = images.length > 1;

  function zoomBy(delta: number) {
    setScale((value) => Math.min(4, Math.max(1, Number((value + delta).toFixed(2)))));
    if (scale + delta <= 1) setOffset({ x: 0, y: 0 });
  }

  function distance(touches: React.TouchList) {
    if (touches.length < 2) return 0;
    const dx = touches[0].clientX - touches[1].clientX;
    const dy = touches[0].clientY - touches[1].clientY;
    return Math.hypot(dx, dy);
  }

  return (
    <div className="fixed inset-0 z-[100] flex flex-col bg-black/[0.92] text-white" role="dialog" aria-modal="true">
      <div className="flex items-center justify-end gap-2 p-3 sm:p-4">
        <button type="button" onClick={() => zoomBy(0.25)} className="rounded-full bg-white/12 p-3 backdrop-blur hover:bg-white/20" aria-label="Zoom in"><Plus className="h-5 w-5" /></button>
        <button type="button" onClick={() => zoomBy(-0.25)} className="rounded-full bg-white/12 p-3 backdrop-blur hover:bg-white/20" aria-label="Zoom out"><Minus className="h-5 w-5" /></button>
        <button type="button" onClick={resetZoom} className="rounded-full bg-white/12 p-3 backdrop-blur hover:bg-white/20" aria-label="Reset zoom"><RotateCcw className="h-5 w-5" /></button>
        <button type="button" onClick={() => { resetZoom(); onClose(); }} className="rounded-full bg-white/12 p-3 backdrop-blur hover:bg-white/20" aria-label="Đóng"><X className="h-6 w-6" /></button>
      </div>
      <div
        className="relative flex min-h-0 flex-1 items-center justify-center overflow-hidden px-3 pb-3"
        onWheel={(event) => {
          event.preventDefault();
          zoomBy(event.deltaY < 0 ? 0.2 : -0.2);
        }}
        onDoubleClick={() => scale > 1 ? resetZoom() : setScale(2)}
        onMouseDown={(event) => {
          if (scale <= 1) return;
          dragRef.current = { x: event.clientX - offset.x, y: event.clientY - offset.y, dragging: true };
        }}
        onMouseMove={(event) => {
          if (!dragRef.current.dragging || scale <= 1) return;
          setOffset({ x: event.clientX - dragRef.current.x, y: event.clientY - dragRef.current.y });
        }}
        onMouseUp={() => { dragRef.current.dragging = false; }}
        onMouseLeave={() => { dragRef.current.dragging = false; }}
        onTouchStart={(event) => {
          touchStartRef.current = {
            x: event.touches[0].clientX,
            y: event.touches[0].clientY,
            distance: distance(event.touches),
            scale
          };
        }}
        onTouchMove={(event) => {
          if (!touchStartRef.current) return;
          if (event.touches.length >= 2) {
            const nextDistance = distance(event.touches);
            if (touchStartRef.current.distance > 0) {
              setScale(Math.min(4, Math.max(1, touchStartRef.current.scale * (nextDistance / touchStartRef.current.distance))));
            }
            return;
          }
          if (scale > 1) {
            setOffset({
              x: event.touches[0].clientX - touchStartRef.current.x,
              y: event.touches[0].clientY - touchStartRef.current.y
            });
          }
        }}
        onTouchEnd={(event) => {
          const start = touchStartRef.current;
          touchStartRef.current = null;
          if (!start || scale > 1 || event.changedTouches.length === 0 || !hasMany) return;
          const dx = event.changedTouches[0].clientX - start.x;
          if (Math.abs(dx) > 50) dx < 0 ? next() : prev();
        }}
      >
        {hasMany && (
          <button type="button" onClick={prev} className="absolute left-3 top-1/2 z-10 hidden -translate-y-1/2 rounded-full bg-white/12 p-3 backdrop-blur hover:bg-white/20 sm:block" aria-label="Ảnh trước">
            <ChevronLeft className="h-7 w-7" />
          </button>
        )}
        <div className="relative h-full w-full max-w-6xl">
          <Image
            src={current.src}
            alt={current.alt}
            fill
            unoptimized={current.src.startsWith("/")}
            className="select-none object-contain"
            style={{ transform: `translate3d(${offset.x}px, ${offset.y}px, 0) scale(${scale})`, transition: dragRef.current.dragging ? "none" : "transform 120ms ease" }}
            draggable={false}
          />
        </div>
        {hasMany && (
          <button type="button" onClick={next} className="absolute right-3 top-1/2 z-10 hidden -translate-y-1/2 rounded-full bg-white/12 p-3 backdrop-blur hover:bg-white/20 sm:block" aria-label="Ảnh tiếp theo">
            <ChevronRight className="h-7 w-7" />
          </button>
        )}
      </div>
      <div className="pb-[calc(env(safe-area-inset-bottom)+1rem)] text-center text-sm font-black text-white/80">
        {index + 1} / {images.length}
      </div>
    </div>
  );
}
