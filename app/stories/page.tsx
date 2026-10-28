import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getStories } from "@/sanity/lib/data";
import { urlForImage } from "@/sanity/lib/image";
import { Reveal } from "@/components/ui/reveal";

export const metadata: Metadata = {
  title: "Travel Stories | Arun Paul",
  description: "Field notes and travel stories from Arun Paul's journeys.",
};

export default async function StoriesPage() {
  const stories = await getStories();

  return (
    <main className="min-h-screen bg-[#eae6dc] px-6 py-12 sm:px-12 sm:py-16 lg:px-20">
      <header className="mx-auto max-w-7xl">
        <Link href="/" className="eyebrow text-[#77786d] transition-opacity hover:opacity-60">← ARUN PAUL / HOME</Link>
        <p className="eyebrow mt-20 text-[#77786d]">NOTES FROM THE ROAD</p>
        <h1 className="display mt-4 max-w-5xl text-6xl leading-[.95] sm:text-8xl">Travel stories<span className="italic text-[#777d68]">.</span></h1>
        <p className="mt-6 max-w-xl text-sm leading-7 text-[#65655d] sm:text-base">Places, encounters, and the small moments that stay long after the journey ends.</p>
      </header>

      {stories.length ? (
        <div className="mx-auto mt-16 grid max-w-7xl gap-12 md:grid-cols-2">
          {stories.map((story, index) => (
            <Reveal key={story._id} delay={(index % 2) * 0.1}>
              <Link href={`/stories/${story.slug}`} className="group block">
                <div className="relative aspect-[5/4] overflow-hidden bg-[#d8d4ca]">
                  <Image src={urlForImage(story.coverImage).width(1400).quality(85).url()} alt={story.coverAlt || story.title} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.035]" />
                </div>
                <div className="mt-5 flex items-center justify-between gap-4">
                  <p className="eyebrow text-[#77786d]">{story.location || "FIELD NOTES"}</p>
                  <ArrowUpRight size={17} className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
                </div>
                <h2 className="display mt-3 text-4xl sm:text-5xl">{story.title}</h2>
                {story.excerpt && <p className="mt-3 max-w-xl text-sm leading-7 text-[#65655d]">{story.excerpt}</p>}
              </Link>
            </Reveal>
          ))}
        </div>
      ) : (
        <div className="mx-auto mt-16 max-w-7xl border-t border-black/15 py-8 text-sm leading-7 text-[#65655d]">
          No stories have been published yet. Open <Link className="underline underline-offset-4" href="/studio">Sanity Studio</Link>, create a Travel story, add its title, slug, cover image and text, then publish it.
        </div>
      )}
    </main>
  );
}
