"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { useRef } from "react";

export type ScrollStoryPhoto = {
  id: string;
  title: string;
  image: string;
  alt: string;
  caption?: string;
  location?: string;
  category?: string;
  dateTaken?: string;
};

type Props = { photos: ScrollStoryPhoto[] };

function RevealPhoto({ photo, index, wide = false }: { photo: ScrollStoryPhoto; index: number; wide?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [28, -28]);

  return (
    <motion.figure
      initial={reduceMotion ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: reduceMotion ? 0.01 : 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`group min-w-0 ${wide ? "md:col-span-8" : "md:col-span-5"}`}
    >
      <div ref={ref} className={`relative overflow-hidden bg-[#1a1d18] ${wide ? "aspect-[5/4] md:aspect-[16/10]" : "aspect-[4/5]"}`}>
        <motion.div style={{ y }} className="absolute -inset-y-8 inset-x-0">
          <Image
            src={photo.image}
            alt={photo.alt || photo.title}
            fill
            sizes={wide ? "(max-width: 768px) 100vw, 66vw" : "(max-width: 768px) 100vw, 42vw"}
            className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.025]"
          />
        </motion.div>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
        {photo.category && (
          <span className="absolute left-4 top-4 text-[9px] tracking-[.2em] text-white/85 sm:left-6 sm:top-6">
            {photo.category.toUpperCase()}
          </span>
        )}
      </div>
      <figcaption className="flex items-start justify-between gap-4 border-b border-black/15 py-4">
        <div className="min-w-0">
          <h3 className="display text-2xl leading-tight sm:text-3xl">{photo.title}</h3>
          {(photo.caption || photo.location) && (
            <p className="mt-2 max-w-lg text-xs leading-5 text-[#77786d]">
              {photo.caption || photo.location}
              {photo.caption && photo.location ? ` · ${photo.location}` : ""}
            </p>
          )}
        </div>
        <span className="shrink-0 pt-1 text-[10px] tracking-[.16em] text-[#77786d]">{String(index + 1).padStart(2, "0")}</span>
      </figcaption>
    </motion.figure>
  );
}

export default function ScrollStory({ photos }: Props) {
  const validPhotos = photos.filter((photo) => photo.image);
  if (!validPhotos.length) return null;

  const detailPhoto = validPhotos.find((photo) => /macro|insect|wildlife|bird/i.test(photo.category || "")) || validPhotos[0];
  const landscapePhoto = validPhotos.find((photo) => photo.id !== detailPhoto.id && /landscape|travel|trekking/i.test(photo.category || "")) || validPhotos.find((photo) => photo.id !== detailPhoto.id) || detailPhoto;
  const remainingPhotos = validPhotos.filter((photo) => photo.id !== detailPhoto.id && photo.id !== landscapePhoto.id);
  const collectionPhotos = (remainingPhotos.length ? remainingPhotos : validPhotos).slice(0, 4);

  return (
    <section id="discover" className="overflow-hidden bg-[#f4f1e9] text-[#191a16]">
      <div className="mx-auto max-w-[1600px] px-5 pb-24 pt-24 sm:px-10 sm:pb-32 sm:pt-32 lg:px-16">
        <div className="grid gap-8 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <p className="eyebrow text-[#77786d]">FIELD NOTES / 01</p>
            <h2 className="display mt-5 max-w-3xl text-5xl leading-[.98] sm:text-7xl">
              Look <span className="italic text-[#777d68]">closer.</span>
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-7 text-[#65655d] md:col-span-4 md:col-start-9">
            Not every encounter announces itself. Some of the wildest stories begin in the smallest details.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 items-start gap-x-8 gap-y-16 md:mt-20 md:grid-cols-12 md:gap-y-28">
          <div className="md:col-span-7 md:col-start-2">
            <RevealPhoto photo={detailPhoto} index={0} wide />
          </div>
          {landscapePhoto && landscapePhoto.id !== detailPhoto.id && (
            <div className="md:col-span-5 md:col-start-8 md:mt-12">
              <p className="eyebrow mb-5 text-[#77786d]">A CHANGE OF PERSPECTIVE</p>
              <RevealPhoto photo={landscapePhoto} index={1} />
            </div>
          )}
        </div>

        <div className="mt-24 border-t border-black/15 pt-8 sm:mt-36">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="eyebrow text-[#77786d]">SELECTED WORK</p>
              <h2 className="display mt-4 max-w-3xl text-4xl leading-tight sm:text-6xl">
                A world worth <span className="italic text-[#777d68]">noticing.</span>
              </h2>
            </div>
            <Link href="/photography" className="editorial-link w-fit">Explore all photographs <ArrowUpRight size={14} /></Link>
          </div>
          <div className="mt-10 grid grid-cols-1 items-start gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {collectionPhotos.map((photo, index) => (
              <div key={`${photo.id}-${index}`}>
                <RevealPhoto photo={photo} index={index} />
              </div>
            ))}
          </div>
          <Link href="/stories" className="mt-16 inline-flex items-center gap-3 text-xs tracking-[.12em] text-[#55584d] transition-colors hover:text-black">
            CONTINUE INTO THE FIELD JOURNAL <ArrowDownRight size={15} />
          </Link>
        </div>
      </div>
    </section>
  );
}
