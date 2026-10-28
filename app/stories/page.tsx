import type { Metadata } from "next";
import Link from "next/link";
import { getStories } from "@/sanity/lib/data";
import { Reveal } from "@/components/ui/reveal";
import { StoryCard } from "@/components/stories/story-card";

export const metadata: Metadata = {
  title: "Travel Stories | Arun Paul",
  description: "Field notes, wildlife encounters, and travel stories from Arun Paul's journeys.",
};

export default async function StoriesPage() {
  const stories = await getStories();

  return (
    <main className="min-h-screen bg-[#eae6dc] px-5 pb-24 pt-8 sm:px-10 sm:pt-12 lg:px-20">
      <header className="mx-auto max-w-7xl">
        <Link href="/" className="eyebrow text-[#77786d] transition-opacity hover:opacity-60">← ARUN PAUL / HOME</Link>
        <div className="mt-16 grid gap-8 border-b border-black/15 pb-10 sm:mt-24 sm:pb-14 lg:grid-cols-[1fr_320px] lg:items-end">
          <div>
            <p className="eyebrow text-[#77786d]">A FIELD JOURNAL · PLACES & ENCOUNTERS</p>
            <h1 className="display mt-5 text-6xl leading-[.9] sm:text-8xl lg:text-[7.5rem]">Stories<span className="italic text-[#777d68]">.</span></h1>
          </div>
          <p className="max-w-sm text-sm leading-7 text-[#65655d] sm:text-base">Notes from the road, quiet moments in the wild, and the places that stay with you long after the journey ends.</p>
        </div>
        <div className="mt-5 flex items-center justify-between text-[#77786d]">
          <p className="eyebrow">THE JOURNAL</p>
          <p className="text-xs tabular-nums">{String(stories.length).padStart(2, "0")} {stories.length === 1 ? "STORY" : "STORIES"}</p>
        </div>
      </header>

      {stories.length ? (
        <section aria-label="Travel stories" className="mx-auto mt-8 grid max-w-7xl gap-x-8 gap-y-14 sm:gap-y-16 md:grid-cols-2 lg:gap-x-12 lg:gap-y-20">
          {stories.map((story, index) => (
            <Reveal key={story._id} delay={Math.min(index % 2, 1) * 0.08}>
              <StoryCard story={story} index={index} />
            </Reveal>
          ))}
        </section>
      ) : (
        <div className="mx-auto mt-12 max-w-7xl border-t border-black/15 py-8 text-sm leading-7 text-[#65655d]">
          No stories have been published yet. Open <Link className="underline underline-offset-4" href="/studio">Sanity Studio</Link> to create a travel story, add its title, slug, cover image and text, then publish it.
        </div>
      )}
      <div className="mx-auto mt-20 max-w-7xl border-t border-black/15 pt-6 text-xs text-[#77786d] sm:mt-28">
        <p>EVERY PLACE HAS A STORY. THESE ARE SOME OF MINE.</p>
      </div>
    </main>
  );
}
