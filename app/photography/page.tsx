import type { Metadata } from "next";
import Link from "next/link";
import { getPhotographs } from "@/sanity/lib/data";
import { urlForImage } from "@/sanity/lib/image";
import { Reveal } from "@/components/ui/reveal";
import { PhotographyGallery } from "@/components/photography/photography-gallery";
import { CreativeServicesNote } from "@/components/home/creative-services-note";

export const metadata: Metadata = {
  title: "Photography | Arun Paul",
  description: "Wildlife, landscapes, and travel photography by Arun Paul.",
};

export default async function PhotographyPage() {
  const documents = await getPhotographs();
  const photographs = documents.map((photo) => ({
    _id: photo._id,
    title: photo.title,
    alt: photo.alt || photo.title,
    imageUrl: urlForImage(photo.image).width(1400).quality(90).url(),
    fullImageUrl: urlForImage(photo.image).width(2600).quality(95).fit("max").url(),
    caption: photo.caption,
    location: photo.location,
    dateTaken: photo.dateTaken,
    category: photo.category,
    licensingAvailable: photo.licensingAvailable,
  }));

  return (
    <main className="min-h-screen bg-[#f4f1e9] pt-10 sm:pt-14 lg:pt-16">
      <header className="mx-auto max-w-7xl px-5 sm:px-10 lg:px-20">
        <Link href="/" className="eyebrow text-[#77786d] transition-opacity hover:opacity-60">← ARUN PAUL / HOME</Link>
        <div className="mt-16 grid gap-8 sm:mt-20 sm:grid-cols-12 sm:items-end">
          <div className="sm:col-span-8">
            <p className="eyebrow text-[#77786d]">THE VISUAL ARCHIVE · {String(photographs.length).padStart(2, "0")} FRAMES</p>
            <h1 className="display mt-4 text-6xl leading-[.92] sm:text-8xl lg:text-9xl">Photography<span className="italic text-[#777d68]">.</span></h1>
          </div>
          <p className="max-w-md text-sm leading-7 text-[#65655d] sm:col-span-4 sm:justify-self-end sm:text-base">Wildlife encounters, open landscapes, and the details that make a place unforgettable. A growing archive of moments observed along the way.</p>
        </div>
      </header>

      {photographs.length ? (
        <PhotographyGallery photographs={photographs} />
      ) : (
        <div className="mx-auto mt-16 max-w-7xl border-y border-black/15 py-12 text-sm leading-7 text-[#65655d]">
          <p className="display text-3xl text-[#25261f]">The archive is waiting for its first frames.</p>
          <p className="mt-3">Open <Link className="underline underline-offset-4" href="/studio">Sanity Studio</Link>, add a Photograph, and publish it to display it here.</p>
        </div>
      )}
      <CreativeServicesNote />
      <Reveal className="bg-[#171815]">
        <footer className="mx-auto flex max-w-7xl justify-between gap-4 border-t border-black/15 py-6 text-xs text-[#77786d] sm:flex-row sm:items-center sm:justify-between">
          <p className="eyebrow">OBSERVED, NOT ARRANGED</p>
          <Link href="/stories" className="eyebrow transition-colors hover:text-black">READ THE FIELD JOURNAL ↗</Link>
        </footer>
      </Reveal>
    </main>
  );
}
