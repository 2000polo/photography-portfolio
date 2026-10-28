import type { Metadata } from "next";
import Link from "next/link";
import { getPhotographs } from "@/sanity/lib/data";
import { urlForImage } from "@/sanity/lib/image";
import { PhotographyGallery } from "@/components/photography/photography-gallery";

export const metadata: Metadata = {
  title: "Photography | Arun Paul",
  description: "Wildlife, landscapes, and travel photography by Arun Paul.",
};

export default async function PhotographyPage() {
  const photographs = await getPhotographs();
  const galleryPhotos = photographs.map((photo) => ({
    id: photo._id,
    title: photo.title,
    alt: photo.alt || photo.title,
    caption: photo.caption,
    location: photo.location,
    dateTaken: photo.dateTaken,
    category: photo.category,
    licensingAvailable: photo.licensingAvailable,
    // Gallery previews are sized for their display area; the viewer uses a larger source.
    previewUrl: urlForImage(photo.image).width(1400).quality(90).url(),
    fullUrl: urlForImage(photo.image).width(2400).quality(95).fit("max").url(),
  }));

  return (
    <main className="min-h-screen bg-[#f4f1e9] px-6 py-12 sm:px-12 sm:py-16 lg:px-20">
      <header className="mx-auto max-w-7xl">
        <Link href="/" className="eyebrow text-[#77786d] transition-opacity hover:opacity-60">← ARUN PAUL / HOME</Link>
        <p className="eyebrow mt-20 text-[#77786d]">THE VISUAL ARCHIVE</p>
        <h1 className="display mt-4 max-w-5xl text-6xl leading-[.95] sm:text-8xl">Photography<span className="italic text-[#777d68]">.</span></h1>
        <p className="mt-6 max-w-xl text-sm leading-7 text-[#65655d] sm:text-base">Wildlife encounters, open landscapes, and the details that make a place unforgettable.</p>
      </header>

      {galleryPhotos.length ? (
        <PhotographyGallery photographs={galleryPhotos} />
      ) : (
        <div className="mx-auto mt-16 max-w-7xl border-t border-black/15 py-8 text-sm leading-7 text-[#65655d]">
          No photographs have been published yet. Open <Link className="underline underline-offset-4" href="/studio">Sanity Studio</Link> and add a Photograph. To feature an existing photograph on the homepage, add it to Homepage Slider—there is no need to upload it again.
        </div>
      )}
    </main>
  );
}
