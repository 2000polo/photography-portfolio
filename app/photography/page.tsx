import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getPhotographs } from "@/sanity/lib/data";
import { urlForImage } from "@/sanity/lib/image";
import { Reveal } from "@/components/ui/reveal";

export const metadata: Metadata = {
  title: "Photography | Arun Paul",
  description: "Wildlife, landscapes, and travel photography by Arun Paul.",
};

export default async function PhotographyPage() {
  const photographs = await getPhotographs();

  return (
    <main className="min-h-screen bg-[#f4f1e9] px-6 py-12 sm:px-12 sm:py-16 lg:px-20">
      <header className="mx-auto max-w-7xl">
        <Link href="/" className="eyebrow text-[#77786d] transition-opacity hover:opacity-60">← ARUN PAUL / HOME</Link>
        <p className="eyebrow mt-20 text-[#77786d]">THE VISUAL ARCHIVE</p>
        <h1 className="display mt-4 max-w-5xl text-6xl leading-[.95] sm:text-8xl">Photography<span className="italic text-[#777d68]">.</span></h1>
        <p className="mt-6 max-w-xl text-sm leading-7 text-[#65655d] sm:text-base">Wildlife encounters, open landscapes, and the details that make a place unforgettable.</p>
      </header>

      {photographs.length ? (
        <div className="mx-auto mt-16 grid max-w-7xl grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {photographs.map((photo, index) => (
            <Reveal key={photo._id} delay={(index % 3) * 0.06}>
              <article>
                <div className="relative aspect-[4/5] overflow-hidden bg-[#dedacf]">
                  <Image src={urlForImage(photo.image).width(1000).quality(85).url()} alt={photo.alt || photo.title} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover transition-transform duration-700 hover:scale-[1.025]" />
                </div>
                <div className="mt-4 flex items-start justify-between gap-4">
                  <div>
                    <h2 className="display text-2xl sm:text-3xl">{photo.title}</h2>
                    <p className="mt-2 text-xs text-[#77786d]">{[photo.location, photo.category, photo.dateTaken].filter(Boolean).join(" · ")}</p>
                    {photo.caption && <p className="mt-3 max-w-sm text-sm leading-6 text-[#65655d]">{photo.caption}</p>}
                  </div>
                  {photo.licensingAvailable && <a href="mailto:hello@arunpaul.photo?subject=Photo%20licensing%20enquiry" aria-label={`Ask about licensing ${photo.title}`} className="mt-1 shrink-0 text-[#77786d] hover:text-black"><ArrowUpRight size={18} /></a>}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      ) : (
        <div className="mx-auto mt-16 max-w-7xl border-t border-black/15 py-8 text-sm leading-7 text-[#65655d]">
          No photographs have been published yet. Open <Link className="underline underline-offset-4" href="/studio">Sanity Studio</Link>, add a Photograph, and publish it to display it here.
        </div>
      )}
    </main>
  );
}
