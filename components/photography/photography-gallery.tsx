"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, X, ZoomIn } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";

type GalleryPhoto = {
  id: string;
  title: string;
  alt: string;
  caption?: string;
  location?: string;
  dateTaken?: string;
  category?: string;
  licensingAvailable?: boolean;
  previewUrl: string;
  fullUrl: string;
};

type PhotographyGalleryProps = {
  photographs: GalleryPhoto[];
};

export function PhotographyGallery({ photographs }: PhotographyGalleryProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const activePhoto = activeIndex === null ? null : photographs[activeIndex];

  const closeViewer = useCallback(() => setActiveIndex(null), []);
  const showPrevious = useCallback(() => {
    setActiveIndex((current) =>
      current === null || photographs.length === 0
        ? current
        : (current - 1 + photographs.length) % photographs.length,
    );
  }, [photographs.length]);
  const showNext = useCallback(() => {
    setActiveIndex((current) =>
      current === null || photographs.length === 0
        ? current
        : (current + 1) % photographs.length,
    );
  }, [photographs.length]);

  useEffect(() => {
    if (activeIndex === null) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeViewer();
      if (event.key === "ArrowLeft") showPrevious();
      if (event.key === "ArrowRight") showNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeIndex, closeViewer, showNext, showPrevious]);

  return (
    <>
      <div className="mx-auto mt-16 grid max-w-7xl grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {photographs.map((photo, index) => (
          <Reveal key={photo.id} delay={(index % 3) * 0.06}>
            <article>
              <button
                type="button"
                onClick={() => setActiveIndex(index)}
                aria-label={`View full photograph: ${photo.title}`}
                className="group relative block aspect-[4/5] w-full cursor-zoom-in overflow-hidden bg-[#dedacf] text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#777d68]"
              >
                <Image
                  src={photo.previewUrl}
                  alt={photo.alt || photo.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  quality={90}
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.025]"
                />
                <span className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/10" />
                <span className="absolute bottom-4 right-4 grid size-10 place-items-center rounded-full border border-white/70 bg-black/25 text-white opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
                  <ZoomIn size={18} aria-hidden="true" />
                </span>
                <span className="sr-only">Open full-screen image viewer</span>
              </button>

              <div className="mt-4 flex items-start justify-between gap-4">
                <div>
                  <h2 className="display text-2xl sm:text-3xl">{photo.title}</h2>
                  <p className="mt-2 text-xs text-[#77786d]">
                    {[photo.location, photo.category, photo.dateTaken].filter(Boolean).join(" · ")}
                  </p>
                  {photo.caption && (
                    <p className="mt-3 max-w-sm text-sm leading-6 text-[#65655d]">{photo.caption}</p>
                  )}
                </div>
                {photo.licensingAvailable && (
                  <a
                    href={`mailto:hello@arunpaul.photo?subject=${encodeURIComponent(`Photo licensing enquiry: ${photo.title}`)}`}
                    aria-label={`Ask about licensing ${photo.title}`}
                    className="mt-1 shrink-0 text-[#77786d] hover:text-black"
                  >
                    <ArrowUpRight size={18} />
                  </a>
                )}
              </div>
            </article>
          </Reveal>
        ))}
      </div>

      {activePhoto && activeIndex !== null && (
        <div
          className="fixed inset-0 z-[100] flex flex-col bg-[#080a09]/[0.98] text-white backdrop-blur-xl"
          role="dialog"
          aria-modal="true"
          aria-label={`Full-screen photograph: ${activePhoto.title}`}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeViewer();
          }}
        >
          <div className="flex shrink-0 items-center justify-between gap-4 px-4 py-4 sm:px-8">
            <div className="min-w-0">
              <p className="truncate text-sm tracking-wide">{activePhoto.title}</p>
              <p className="mt-1 truncate text-xs text-white/55">
                {[activePhoto.location, activePhoto.dateTaken].filter(Boolean).join(" · ")}
              </p>
            </div>
            <div className="flex shrink-0 items-center gap-4">
              <span className="text-xs tabular-nums text-white/55">
                {String(activeIndex + 1).padStart(2, "0")} / {String(photographs.length).padStart(2, "0")}
              </span>
              <button
                type="button"
                onClick={closeViewer}
                aria-label="Close full-screen viewer"
                className="grid size-10 place-items-center rounded-full border border-white/20 transition-colors hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          <div className="relative min-h-0 flex-1 px-14 pb-4 sm:px-20 sm:pb-6">
            <div className="absolute inset-0 mx-3 sm:mx-8">
              <Image
                key={activePhoto.id}
                src={activePhoto.fullUrl}
                alt={activePhoto.alt || activePhoto.title}
                fill
                priority
                quality={95}
                sizes="100vw"
                className="object-contain"
              />
            </div>
            {photographs.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={showPrevious}
                  aria-label="Previous photograph"
                  className="absolute left-1 top-1/2 grid size-10 -translate-y-1/2 place-items-center rounded-full border border-white/20 bg-black/25 transition-colors hover:bg-white/10 sm:left-3 sm:size-12"
                >
                  <ArrowLeft size={20} />
                </button>
                <button
                  type="button"
                  onClick={showNext}
                  aria-label="Next photograph"
                  className="absolute right-1 top-1/2 grid size-10 -translate-y-1/2 place-items-center rounded-full border border-white/20 bg-black/25 transition-colors hover:bg-white/10 sm:right-3 sm:size-12"
                >
                  <ArrowRight size={20} />
                </button>
              </>
            )}
          </div>

          <div className="flex shrink-0 items-center justify-between gap-4 px-4 py-3 text-xs text-white/50 sm:px-8">
            <p className="max-w-[70%] truncate">{activePhoto.caption || activePhoto.category || "Photography archive"}</p>
            <p className="hidden sm:block">ESC to close · ← → to navigate</p>
          </div>
        </div>
      )}
    </>
  );
}
