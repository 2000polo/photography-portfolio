import Link from "next/link";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import Image from "next/image";
import type { StoryCardDocument } from "@/sanity/lib/types";
import { urlForImage } from "@/sanity/lib/image";

export function IntroSection() {
  return (
    <section id="discover" className="bg-[#f4f1e9] px-6 py-24 sm:px-12 sm:py-36 lg:px-20">
      <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-12 md:items-end">
        <Reveal className="md:col-span-7">
          <p className="eyebrow mb-6 text-[#77786d]">A PHOTOGRAPHIC JOURNAL</p>
          <h2 className="display max-w-3xl text-6xl leading-[.98] sm:text-7xl lg:text-8xl">
            The world is vast.
            <br />
            <span className="italic text-[#777d68]">Stay curious.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.12} className="md:col-span-5 md:pb-2">
          <p className="max-w-lg text-sm leading-7 text-[#65655d] sm:text-base">
            A growing collection of journeys, wildlife encounters, distant landscapes,
            and the quiet moments in between. Stories told through photographs,
            one journey at a time.
          </p>
          <Link href="/photography" className="editorial-link mt-8">
            Discover the photographs <ArrowDownRight size={16} />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

export function FeaturedStories({ stories }: { stories: StoryCardDocument[] }) {
  return (
    <section className="bg-[#eae6dc] px-6 py-24 sm:px-12 sm:py-32 lg:px-20">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <p className="eyebrow text-[#77786d]">NOTES FROM THE ROAD</p>
              <h2 className="display mt-4 text-5xl sm:text-6xl">Every image has a story.</h2>
            </div>
            <Link href="/stories" className="editorial-link w-fit">All stories <ArrowUpRight size={15} /></Link>
          </div>
        </Reveal>
        {stories.length ? (
          <div className="mt-12 grid gap-10 md:grid-cols-2 md:gap-8">
            {stories.map((story, index) => (
              <Reveal key={story._id} delay={index * 0.12}>
                <Link href={`/stories/${story.slug}`} className="group block">
                  <div className="relative aspect-[5/4] overflow-hidden bg-[#d8d4ca]">
                    <Image
                      src={urlForImage(story.coverImage).width(1300).quality(85).url()}
                      alt={story.coverAlt || story.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.035]"
                    />
                    <span className="absolute left-4 top-4 border border-white/60 px-3 py-2 text-[9px] tracking-[.18em] text-white">{String(index + 1).padStart(2, "0")}</span>
                  </div>
                  <div className="mt-5 flex items-center justify-between gap-4">
                    <p className="eyebrow text-[#77786d]">{story.location || "TRAVEL JOURNAL"}</p>
                    <ArrowUpRight size={16} className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
                  </div>
                  <h3 className="display mt-3 text-4xl sm:text-5xl">{story.title}</h3>
                  {story.excerpt && <p className="mt-3 max-w-md text-sm leading-6 text-[#65655d]">{story.excerpt}</p>}
                </Link>
              </Reveal>
            ))}
          </div>
        ) : (
          <p className="mt-10 max-w-xl text-sm leading-7 text-[#65655d]">Your travel stories will appear here once you publish them in Sanity Studio and mark them as featured.</p>
        )}
      </div>
    </section>
  );
}
