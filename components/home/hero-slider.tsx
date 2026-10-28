"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, Menu, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { demoSlides, type HeroSlide } from "./hero-slide-data";

const AUTOPLAY_DELAY = 6500;

export default function HeroSlider({ slides = demoSlides }: { slides?: HeroSlide[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const reduceMotion = useReducedMotion();
  const safeSlides = slides.length ? slides : demoSlides;
  const activeSlide = safeSlides[activeIndex % safeSlides.length];

  const goTo = useCallback((index: number) => {
    setActiveIndex((index + safeSlides.length) % safeSlides.length);
  }, [safeSlides.length]);

  const next = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo]);
  const previous = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo]);

  useEffect(() => {
    const update = () => setVisible(!document.hidden);
    update();
    document.addEventListener("visibilitychange", update);
    return () => document.removeEventListener("visibilitychange", update);
  }, []);

  useEffect(() => {
    if (paused || !visible || reduceMotion || menuOpen) return;
    const timer = window.setTimeout(next, AUTOPLAY_DELAY);
    return () => window.clearTimeout(timer);
  }, [activeIndex, paused, visible, reduceMotion, menuOpen, next]);

  const pauseForFocus = () => setPaused(true);
  const resumeAfterFocus = (event: React.FocusEvent<HTMLElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setPaused(false);
  };

  return (
    <section
      aria-label="Featured photography"
      className="relative isolate h-[100svh] min-h-[620px] w-full overflow-hidden bg-[#11120f] text-[#f4f1e9]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={pauseForFocus}
      onBlurCapture={resumeAfterFocus}
    >
      <AnimatePresence initial={false} mode="sync">
        <motion.div
          key={activeSlide.id}
          className="absolute inset-0 -z-30"
          initial={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 1.055 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            opacity: { duration: reduceMotion ? 0.15 : 1.1 },
            scale: { duration: 7, ease: "linear" }
          }}
        >
          <Image
            src={activeSlide.image}
            alt={activeSlide.imageAlt}
            fill
            priority={activeIndex === 0}
            sizes="100vw"
            quality={88}
            className="object-cover object-center"
          />
        </motion.div>
      </AnimatePresence>

      <div className="hero-vignette absolute inset-0 -z-20" />
      <div className="grain -z-10" />

      <header className="site-header absolute inset-x-0 top-0 z-30 flex items-center justify-between px-5 py-6 sm:px-10 lg:px-16">
        <Link href="/" className="flex flex-col gap-1" aria-label="Arun Paul homepage">
          <span className="display text-2xl tracking-[.09em]">ARUN PAUL</span>
          <span className="text-[9px] tracking-[.28em] text-white/65">WILDLIFE & TRAVEL</span>
        </Link>

        <nav className="hidden items-center gap-8 text-xs md:flex" aria-label="Main navigation">
          <Link className="transition-opacity hover:opacity-60" href="/photography">Photography</Link>
          <Link className="transition-opacity hover:opacity-60" href="/stories">Stories</Link>
          <Link className="transition-opacity hover:opacity-60" href="/about">About</Link>
          <Link href="/contact" className="flex items-center gap-2 border border-white/45 px-4 py-3 transition-colors hover:bg-white hover:text-black">
            Work with me <ArrowUpRight size={14} />
          </Link>
        </nav>

        <button
          type="button"
          className="flex size-10 items-center justify-center border border-white/40 md:hidden"
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((value) => !value)}
        >
          {menuOpen ? <X size={19} /> : <Menu size={19} />}
        </button>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="absolute inset-0 z-20 flex flex-col justify-center gap-6 bg-[#11120f] px-8 pt-20 md:hidden"
            aria-label="Mobile navigation"
          >
            {[
              ["Photography", "/photography"],
              ["Stories", "/stories"],
              ["About", "/about"],
              ["Contact", "/contact"]
            ].map(([label, href]) => (
              <Link key={href} href={href} onClick={() => setMenuOpen(false)} className="display text-5xl">
                {label}
              </Link>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>

      <div className="absolute inset-x-0 top-[28%] z-10 px-6 sm:top-[30%] sm:px-10 lg:px-16">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={activeSlide.id}
            initial={{ opacity: 0, y: reduceMotion ? 0 : 22 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: reduceMotion ? 0.15 : 0.65 }}
            className="max-w-5xl"
          >
            <div className="eyebrow mb-5 flex items-center gap-3 text-white/80">
              <span className="h-px w-8 bg-[#b7c69a]" />
              {activeSlide.category}
              <span className="text-white/45">/</span>
              {activeSlide.location}
            </div>
            <h1 className="tracking-normal! display max-w-5xl text-6xl leading-[.94] sm:text-6xl md:text-7xl">
              {activeSlide.title}
            </h1>
            <p className="mt-6 max-w-md text-sm leading-6 text-white/75 sm:text-base">
              {activeSlide.subtitle}
            </p>
            <Link href={activeSlide.storyHref} className="mt-8 inline-flex items-center gap-3 border-b border-white/55 pb-2 text-xs transition-opacity hover:opacity-65">
              Explore the stories <ArrowUpRight size={15} />
            </Link>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="absolute inset-x-0 bottom-0 z-10 px-5 pb-6 sm:px-10 sm:pb-8 lg:px-16">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-3 text-xs tracking-widest" aria-live="polite" aria-atomic="true">
            <span>{String(activeIndex + 1).padStart(2, "0")}</span>
            <span className="text-white/40">/</span>
            <span className="text-white/55">{String(safeSlides.length).padStart(2, "0")}</span>
          </div>
          <div className="flex gap-2">
            <button type="button" onClick={previous} aria-label="Previous photograph" className="flex size-10 items-center justify-center rounded-full border border-white/40 transition-colors hover:bg-white hover:text-black">
              <ArrowLeft size={16} />
            </button>
            <button type="button" onClick={next} aria-label="Next photograph" className="flex size-10 items-center justify-center rounded-full border border-white/40 transition-colors hover:bg-white hover:text-black">
              <ArrowRight size={16} />
            </button>
          </div>
        </div>

        <div className="grid gap-2 sm:gap-3"
          style={{
            gridTemplateColumns: `repeat(${safeSlides.length}, minmax(0, 1fr))`,
          }}
          role="group" aria-label="Choose a featured photograph"
        >
          {safeSlides.map((slide, index) => {
            const isActive = index === activeIndex;
            return (
              <button
                key={slide.id}
                type="button"
                onClick={() => goTo(index)}
                aria-label={`Show photograph ${index + 1}: ${slide.title}`}
                aria-pressed={isActive}
                className={`group relative h-[64px] overflow-hidden border text-left transition-all duration-300 sm:h-[82px] md:h-[92px] ${
                  isActive ? "border-white" : "border-white/25 opacity-65 hover:border-white/80 hover:opacity-100"
                }`}
              >
                <Image src={slide.image} alt="" fill sizes="(max-width: 640px) 25vw, 22vw" className={`object-cover transition-transform duration-700 ${isActive ? "scale-100" : "scale-105 group-hover:scale-100"}`} />
                <span className="absolute inset-0 bg-black/25" />
                {isActive && <motion.span layoutId="active-thumbnail" className="absolute inset-x-0 top-0 h-[2px] bg-[#d7e0c5]" />}
                <span className="absolute inset-x-2 bottom-2 truncate text-[8px] tracking-wider sm:inset-x-3 sm:bottom-3 sm:text-[10px]">
                  {slide.location.toUpperCase()}
                </span>
              </button>
            );
          })}
        </div>

        <div className="mt-5 hidden items-center justify-between text-[10px] tracking-[.2em] text-white/60 sm:flex">
          <span>DOCUMENTING THE WILD & THE WAY THERE</span>
          <a href="#discover" className="flex items-center gap-2 transition-colors hover:text-white">
            SCROLL TO EXPLORE <ArrowDown size={13} />
          </a>
        </div>
      </div>
    </section>
  );
}
