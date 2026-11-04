"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

type BentoPhoto = {
  _id: string;
  title: string;
  alt: string;
  imageUrl: string;
  category?: string;
};

type CategoryCard = {
  name: string;
  photos: BentoPhoto[];
};

const CATEGORY_ORDER = ["Wildlife", "Birds", "Insects", "Landscapes", "Trekking", "Travel", "People & Culture"];

function nextRandomIndex(current: number, length: number) {
  if (length < 2) return current;
  let next = current;
  while (next === current) next = Math.floor(Math.random() * length);
  return next;
}

function BentoCard({ category, index }: { category: CategoryCard; index: number }) {
  const reduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(() => Math.floor(Math.random() * category.photos.length));
  const [hasMounted, setHasMounted] = useState(false);
  const photos = category.photos;
  const photo = photos[activeIndex];

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    if (!hasMounted || photos.length < 2 || reduceMotion) return;
  
    const interval = window.setInterval(() => {
      setActiveIndex((current) => {
        let next = current;
  
        // Pick a different image after hydration.
        while (next === current) {
          next = Math.floor(Math.random() * photos.length);
        }
  
        return next;
      });
    }, 4500);
  
    return () => window.clearInterval(interval);
  }, [hasMounted, photos.length, reduceMotion]);

  const sizes = index === 0
    ? "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 50vw"
    : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw";

  return (
    <Link
      href={`/photography?category=${encodeURIComponent(category.name)}`}
      aria-label={`Explore ${category.name} photography`}
      className={`group relative isolate block min-h-[250px] overflow-hidden bg-[#22251f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#777d68] sm:min-h-[300px] ${index === 0 ? "sm:col-span-2 sm:row-span-2 sm:min-h-[620px]" : ""} ${index === 3 ? "lg:col-span-2" : ""}`}
    >
      <AnimatePresence mode="sync">
        <motion.div
          key={photo._id}
          className="absolute inset-0"
          initial={reduceMotion ? false : { opacity: 0, scale: 1.025 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={reduceMotion ? undefined : { opacity: 0 }}
          transition={{ duration: reduceMotion ? 0 : 1.15, ease: "easeInOut" }}
        >
          <Image
            src={photo.imageUrl}
            alt={photo.alt || photo.title}
            fill
            sizes={sizes}
            priority={index < 2}
            className="object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.035]"
          />
        </motion.div>
      </AnimatePresence>
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-black/15 transition-colors duration-500 group-hover:from-black/85" />
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 text-[#f4f1e9] sm:p-7">
        <div>
          <p className="mb-2 text-[10px] uppercase tracking-[0.18em] text-white/65">Explore collection</p>
          <h3 className="display text-3xl leading-none sm:text-4xl">{category.name}</h3>
          <p className="mt-2 text-xs text-white/65">{String(category.photos.length).padStart(2, "0")} photographs</p>
        </div>
        <span className="grid size-10 shrink-0 place-items-center rounded-full border border-white/50 transition-all duration-300 group-hover:border-white group-hover:bg-white group-hover:text-[#20231d]">
          <ArrowUpRight size={18} />
        </span>
      </div>
    </Link>
  );
}

export function CategoryBento({ photographs }: { photographs: BentoPhoto[] }) {
  const categories = useMemo<CategoryCard[]>(() => {
    const grouped = new Map<string, BentoPhoto[]>();
    photographs.forEach((photo) => {
      const name = photo.category?.trim();
      if (!name) return;
      const items = grouped.get(name) ?? [];
      items.push(photo);
      grouped.set(name, items);
    });
    return [...grouped.entries()]
      .map(([name, photos]) => ({ name, photos }))
      .sort((a, b) => {
        const aOrder = CATEGORY_ORDER.indexOf(a.name);
        const bOrder = CATEGORY_ORDER.indexOf(b.name);
        return (aOrder < 0 ? 999 : aOrder) - (bOrder < 0 ? 999 : bOrder) || a.name.localeCompare(b.name);
      });
  }, [photographs]);

  if (!categories.length) return null;

  return (
    <section className="bg-[#f4f1e9] px-6 py-20 sm:px-12 sm:py-28 lg:px-20" aria-labelledby="collections-heading">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 grid gap-5 sm:grid-cols-12 sm:items-end">
          <div className="sm:col-span-7">
            <p className="eyebrow text-[#77786d]">EXPLORE BY SUBJECT</p>
            <h2 id="collections-heading" className="display mt-4 text-5xl leading-[.98] sm:text-7xl">A world of <span className="italic text-[#777d68]">different</span> details.</h2>
          </div>
          <p className="max-w-md text-sm leading-7 text-[#65655d] sm:col-span-5 sm:justify-self-end">Browse the photographs by collection. Each frame offers a glimpse into a different part of the field journal.</p>
        </div>
        <div className="grid auto-rows-[minmax(250px,1fr)] grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
          {categories.map((category, index) => <BentoCard key={category.name} category={category} index={index} />)}
        </div>
      </div>
    </section>
  );
}
