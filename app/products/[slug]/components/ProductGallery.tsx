"use client";

import type { WooImage } from "@/types/woocommerce";
import Image from "next/image";
import { useState } from "react";
import { FiChevronLeft, FiChevronRight, FiZoomIn } from "react-icons/fi";

interface Props {
  images: WooImage[];
  productName: string;
}

export default function ProductGallery({ images, productName }: Props) {
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const [zoomPos, setZoomPos] = useState<{ x: number; y: number } | null>(null);

  const list = images.length > 0 ? images : [{ id: 0, src: "", name: "", alt: productName }];
  const current = list[active];

  const prev = () => setActive((i) => (i - 1 + list.length) % list.length);
  const next = () => setActive((i) => (i + 1) % list.length);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPos({ x, y });
  };

  return (
    <>
      <div className="flex flex-col gap-3">
        {/* ── Main image with Magnifier hover zoom ── */}
        <div
          className="relative w-full overflow-hidden rounded-2xl bg-slate-800 border border-slate-700 group cursor-crosshair"
          style={{ aspectRatio: "1 / 1" }}
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setZoomPos(null)}
          onClick={() => setLightbox(true)}
        >
          {current.src ? (
            <Image
              src={current.src}
              alt={current.alt || productName}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-contain transition-transform duration-200"
              priority
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-slate-600 text-sm">
              No Image
            </div>
          )}

          {/* Magnifier glass view on hover */}
          {zoomPos && current.src && (
            <div
              className="absolute inset-0 pointer-events-none z-10 bg-no-repeat rounded-2xl"
              style={{
                backgroundImage: `url(${current.src})`,
                backgroundPosition: `${zoomPos.x}% ${zoomPos.y}%`,
                backgroundSize: "220%",
              }}
            />
          )}

          {/* Zoom hint */}
          <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <FiZoomIn className="w-4 h-4 text-white" />
          </div>

          {/* Prev / Next arrows — only when multiple images */}
          {list.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); prev(); }}
                className="absolute left-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 hover:bg-black/70 flex items-center justify-center text-white transition-colors"
                aria-label="Previous image"
              >
                <FiChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); next(); }}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 hover:bg-black/70 flex items-center justify-center text-white transition-colors"
                aria-label="Next image"
              >
                <FiChevronRight className="w-5 h-5" />
              </button>
            </>
          )}

          {/* Dot indicator */}
          {list.length > 1 && (
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
              {list.map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => { e.stopPropagation(); setActive(i); }}
                  className={`rounded-full transition-all duration-200 ${
                    i === active ? "w-5 h-2 bg-primary" : "w-2 h-2 bg-white/50 hover:bg-white/80"
                  }`}
                  aria-label={`Image ${i + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* ── Thumbnails ── */}
        {list.length > 1 && (
          <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
            {list.map((img, i) => (
              <button
                key={img.id || i}
                onClick={() => setActive(i)}
                className={`relative shrink-0 w-16 h-16 rounded-xl overflow-hidden border-2 transition-all duration-150 ${
                  i === active
                    ? "border-primary"
                    : "border-slate-700 opacity-60 hover:opacity-100 hover:border-slate-500"
                }`}
                aria-label={`View image ${i + 1}`}
              >
                {img.src && (
                  <Image
                    src={img.src}
                    alt={img.alt || productName}
                    fill
                    sizes="64px"
                    className="object-cover"
                  />
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* ── Lightbox ── */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4"
          onClick={() => setLightbox(false)}
        >
          <button
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
            onClick={() => setLightbox(false)}
            aria-label="Close lightbox"
          >
            ✕
          </button>

          {list.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); prev(); }}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
                aria-label="Previous"
              >
                <FiChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); next(); }}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
                aria-label="Next"
              >
                <FiChevronRight className="w-6 h-6" />
              </button>
            </>
          )}

          <div
            className="relative w-full max-w-3xl max-h-[85vh]"
            style={{ aspectRatio: "1 / 1" }}
            onClick={(e) => e.stopPropagation()}
          >
            {current.src && (
              <Image
                src={current.src}
                alt={current.alt || productName}
                fill
                sizes="90vw"
                className="object-contain"
              />
            )}
          </div>
        </div>
      )}
    </>
  );
}
