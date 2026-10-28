import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { StoryCardDocument } from "@/sanity/lib/types";
import { urlForImage } from "@/sanity/lib/image";

function formatDate(value?: string) {
  if (!value) return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? null
    : date.toLocaleDateString("en", { year: "numeric", month: "short", day: "numeric" });
}

export function StoryCard({ story, index = 0 }: { story: StoryCardDocument; index?: number }) {
  const date = formatDate(story.publishedAt);
  const imageUrl = urlForImage(story.coverImage).width(1200).quality(88).url();

  return (
    <article className={`group ${index === 0 ? "md:col-span-2" : ""}`}>
      <Link href={`/stories/${story.slug}`} className="block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#777d68]">
        <div className={`relative overflow-hidden bg-[#d8d4ca] ${index === 0 ? "aspect-[16/9]" : "aspect-[5/4]"}`}>
          <Image
            src={imageUrl}
            alt={story.coverAlt || story.title}
            fill
            sizes={index === 0 ? "(max-width: 768px) 100vw, 90vw" : "(max-width: 768px) 100vw, 45vw"}
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.025] motion-reduce:transform-none motion-reduce:transition-none"
          />
          <span className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-100" />
          <span className="absolute bottom-4 right-4 grid size-10 place-items-center rounded-full border border-white/60 bg-black/10 text-white backdrop-blur-sm transition-colors group-hover:bg-white group-hover:text-[#191a16] sm:bottom-6 sm:right-6">
            <ArrowUpRight size={18} strokeWidth={1.5} />
          </span>
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2 text-[#77786d]">
          <span className="eyebrow">{story.location || "FIELD NOTES"}</span>
          {date && <><span aria-hidden="true" className="h-3 w-px bg-black/20" /><time className="text-[11px] tracking-wide" dateTime={story.publishedAt}>{date}</time></>}
        </div>
        <h2 className={`display mt-3 max-w-4xl leading-[1.02] transition-colors group-hover:text-[#777d68] ${index === 0 ? "text-4xl sm:text-6xl lg:text-7xl" : "text-3xl sm:text-4xl"}`}>
          {story.title}
        </h2>
        {story.excerpt && <p className={`mt-3 max-w-2xl text-sm leading-7 text-[#65655d] ${index === 0 ? "sm:text-base" : ""}`}>{story.excerpt}</p>}
      </Link>
    </article>
  );
}
