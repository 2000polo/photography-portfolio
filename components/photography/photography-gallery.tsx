"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, X, RotateCcw, Maximize2 } from "lucide-react";

type Photograph = {
  _id: string;
  title: string;
  alt: string;
  imageUrl: string;
  fullImageUrl: string;
  caption?: string;
  location?: string;
  dateTaken?: string;
  category?: string;
  licensingAvailable?: boolean;
};

function formatDate(value?: string) {
  if (!value) return null;
  const date = new Date(`${value}T00:00:00`);
  return Number.isNaN(date.getTime())
    ? null
    : date.toLocaleDateString("en", { year: "numeric", month: "short", day: "numeric" });
}

export function PhotographyGallery({ photographs }: { photographs: Photograph[] }) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [zoomed, setZoomed] = useState(false);

  const categories = useMemo(
    () => [
      "All",
      ...Array.from(
        new Set(
          photographs
            .map((photo) => photo.category?.trim())
            .filter((category): category is string => Boolean(category)),
        ),
      ).sort((a, b) => a.localeCompare(b)),
    ],
    [photographs],
  );

  // Read the category from the URL on entry and keep browser back/forward in sync.
  useEffect(() => {
    const syncCategoryFromUrl = () => {
      const requested = new URLSearchParams(window.location.search).get("category");
      const match = categories.find((category) => category.toLowerCase() === requested?.toLowerCase());
      setActiveCategory(match ?? "All");
    };
    syncCategoryFromUrl();
    window.addEventListener("popstate", syncCategoryFromUrl);
    return () => window.removeEventListener("popstate", syncCategoryFromUrl);
  }, [categories]);

  const selectCategory = (category: string) => {
    setActiveCategory(category);
    setActiveIndex(null);
    const url = new URL(window.location.href);
    if (category === "All") url.searchParams.delete("category");
    else url.searchParams.set("category", category);
    window.history.pushState({}, "", `${url.pathname}${url.search}${url.hash}`);
  };

  const filteredPhotographs = useMemo(
    () => activeCategory === "All" ? photographs : photographs.filter((photo) => photo.category === activeCategory),
    [activeCategory, photographs],
  );
  const activePhoto = activeIndex === null ? null : filteredPhotographs[activeIndex] ?? null;

  const closeViewer = useCallback(() => {
    setActiveIndex(null);
    setZoomed(false);
  }, []);

  const moveViewer = useCallback((direction: -1 | 1) => {
    setActiveIndex((current) => {
      if (current === null || filteredPhotographs.length === 0) return current;
      return (current + direction + filteredPhotographs.length) % filteredPhotographs.length;
    });
    setZoomed(false);
  }, [filteredPhotographs.length]);

  useEffect(() => {
    if (!activePhoto) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeViewer();
      if (event.key === "ArrowLeft") moveViewer(-1);
      if (event.key === "ArrowRight") moveViewer(1);
      if (event.key === " ") {
        event.preventDefault();
        setZoomed((current) => !current);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activePhoto, closeViewer, moveViewer]);

  return (
    <>
      <section className="mx-auto my-12 max-w-7xl px-5 sm:px-10 lg:px-20" aria-label="Photography collection">
        <div className="mb-8 flex flex-col gap-5 border-y border-black/15 py-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-2" role="group" aria-label="Filter photographs by category">
            {categories.map((category) => {
              const selected = category === activeCategory;
              const count = category === "All" ? photographs.length : photographs.filter((photo) => photo.category === category).length;
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => selectCategory(category)}
                  aria-pressed={selected}
                  className={`inline-flex min-h-10 items-center gap-2 border px-4 py-2 text-xs transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#777d68] ${selected ? "border-[#25261f] bg-[#25261f] text-[#f4f1e9]" : "border-black/15 text-[#65655d] hover:border-black/50 hover:text-black"}`}
                >
                  {category}<span className={selected ? "text-white/60" : "text-[#99998e]"}>{String(count).padStart(2, "0")}</span>
                </button>
              );
            })}
          </div>
          <p className="eyebrow shrink-0 text-[#77786d]">{String(filteredPhotographs.length).padStart(2, "0")} PHOTOGRAPHS</p>
        </div>

        {filteredPhotographs.length ? (
          <div className="columns-1 gap-x-5 sm:columns-2 lg:columns-3 lg:gap-x-7 xl:columns-4">
            {filteredPhotographs.map((photo, index) => {
              const prominent = index % 7 === 0 || index % 7 === 4;
              const landscape = index % 7 === 2 || index % 7 === 5;
              return (
                <article key={photo._id} className="pb-3 mb-5 min-w-0 break-inside-avoid [page-break-inside:avoid] border-b border-black/15">
                  <button
                    type="button"
                    onClick={() => { setActiveIndex(index); setZoomed(false); }}
                    className="group block w-full text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#777d68]"
                    aria-label={`Open photograph: ${photo.title}`}
                  >
                    <div className={`relative overflow-hidden bg-[#dedacf] ${landscape ? "aspect-[5/3]" : prominent ? "aspect-[4/3]" : "aspect-[4/5]"}`}>
                      <Image
                        src={photo.imageUrl}
                        alt={photo.alt || photo.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.025] motion-reduce:transform-none motion-reduce:transition-none"
                      />
                      <span className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/10" />
                      <span className="absolute bottom-3 right-3 grid size-10 translate-y-2 place-items-center rounded-full border border-white/70 bg-black/20 text-white opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100" aria-hidden="true">
                        <Maximize2 size={16} />
                      </span>
                    </div>
                  </button>
                  <div className="mt-4 flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <h2 className="display text-2xl leading-tight sm:text-3xl">{photo.title}</h2>
                      
                    </div>
                    {photo.licensingAvailable && <a href={`mailto:hello@arunpaul.photo?subject=${encodeURIComponent(`Photo licensing enquiry: ${photo.title}`)}`} aria-label={`Ask about licensing ${photo.title}`} className="mt-1 shrink-0 text-sm text-[#77786d] underline decoration-black/20 underline-offset-4 transition-colors hover:text-black">License</a>}
                  </div>
                  <p className="mt-2 text-[11px] uppercase tracking-[0.12em] text-[#77786d]">{[photo.location, photo.category, formatDate(photo.dateTaken)].filter(Boolean).join(" · ") || "FIELD NOTES"}</p>
                    {photo.caption && <p className="mt-3 max-w-xl text-sm leading-6 text-[#65655d]">{photo.caption}</p>}
                </article>
              );
            })}
          </div>
        ) : (
          <div className="border-y border-black/15 py-16 text-center">
            <p className="display text-3xl sm:text-4xl">No photographs in this collection yet.</p>
            <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-[#65655d]">Try another category to explore the archive.</p>
            <button type="button" onClick={() => setActiveCategory("All")} className="mt-5 inline-flex items-center gap-2 border-b border-black/30 pb-1 text-xs uppercase tracking-widest hover:border-black">Show all photographs <RotateCcw size={13} /></button>
          </div>
        )}
      </section>

      {activePhoto && (
        <div className="fixed inset-0 z-[100] flex flex-col bg-[#10110f]/[.98] text-[#f4f1e9]" role="dialog" aria-modal="true" aria-label={`Photograph viewer: ${activePhoto.title}`} onMouseDown={(event) => { if (event.target === event.currentTarget) closeViewer(); }}>
          <div className="flex min-h-16 items-center justify-between gap-4 px-4 py-3 sm:px-8">
            <div className="min-w-0">
              <p className="truncate text-sm">{activePhoto.title}</p>
              <p className="mt-1 truncate text-[10px] uppercase tracking-[0.14em] text-white/55">{[activePhoto.location, activePhoto.category].filter(Boolean).join(" · ")}</p>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <span className="mr-2 hidden text-xs tabular-nums text-white/55 sm:inline">{String((activeIndex ?? 0) + 1).padStart(2, "0")} / {String(filteredPhotographs.length).padStart(2, "0")}</span>
              <button type="button" onClick={() => setZoomed((value) => !value)} aria-label={zoomed ? "Fit image to screen" : "Zoom image"} className="grid size-10 place-items-center border border-white/20 transition-colors hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"><Maximize2 size={17} /></button>
              <button type="button" onClick={closeViewer} aria-label="Close photograph viewer" className="grid size-10 place-items-center border border-white/20 transition-colors hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"><X size={19} /></button>
            </div>
          </div>
          <div className="relative flex min-h-0 flex-1 items-center justify-center overflow-hidden px-2 pb-4 sm:px-16">
            <button type="button" onClick={() => moveViewer(-1)} aria-label="Previous photograph" className="absolute left-2 top-1/2 z-10 grid size-10 -translate-y-1/2 place-items-center border border-white/25 bg-black/20 transition-colors hover:bg-white/15 sm:left-5 sm:size-12"><ArrowLeft size={19} /></button>
            <div className={`relative h-full w-full transition-transform duration-200 motion-reduce:transition-none ${zoomed ? "cursor-zoom-out overflow-auto" : "cursor-zoom-in"}`} onClick={() => setZoomed((value) => !value)}>
              {zoomed ? (
                // A native image permits scrolling around the original-resolution rendition while zoomed.
                // eslint-disable-next-line @next/next/no-img-element
                <img src={activePhoto.fullImageUrl} alt={activePhoto.alt || activePhoto.title} className="mx-auto h-auto min-h-full w-auto max-w-none object-contain" />
              ) : (
                <Image src={activePhoto.fullImageUrl} alt={activePhoto.alt || activePhoto.title} fill priority sizes="100vw" className="object-contain" />
              )}
            </div>
            <button type="button" onClick={() => moveViewer(1)} aria-label="Next photograph" className="absolute right-2 top-1/2 z-10 grid size-10 -translate-y-1/2 place-items-center border border-white/25 bg-black/20 transition-colors hover:bg-white/15 sm:right-5 sm:size-12"><ArrowRight size={19} /></button>
          </div>
          <div className="flex min-h-12 items-center justify-between gap-4 px-4 pb-4 text-xs text-white/55 sm:px-8">
            <p className="max-w-2xl truncate">{activePhoto.caption || activePhoto.alt}</p>
            <p className="hidden shrink-0 sm:block">← → navigate · Esc close · Space zoom</p>
          </div>
        </div>
      )}
    </>
  );
}
