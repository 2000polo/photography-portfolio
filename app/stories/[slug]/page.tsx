import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";
import { getRelatedStories, getStories, getStoryBySlug } from "@/sanity/lib/data";
import { urlForImage } from "@/sanity/lib/image";
import { StoryCard } from "@/components/stories/story-card";

function formatDate(value?: string) {
  if (!value) return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date.toLocaleDateString("en", { year: "numeric", month: "long", day: "numeric" });
}

export async function generateStaticParams() {
  const stories = await getStories();
  return stories.map((story) => ({ slug: story.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const story = await getStoryBySlug(slug);
  if (!story) return { title: "Story not found | Arun Paul" };
  return {
    title: `${story.title} | Arun Paul`,
    description: story.excerpt || `A travel story from ${story.location || "Arun Paul's photographic journal"}.`,
    openGraph: {
      title: `${story.title} | Arun Paul`,
      description: story.excerpt || `A field note from ${story.location || "Arun Paul's photographic journal"}.`,
      images: [{ url: urlForImage(story.coverImage).width(1600).height(900).quality(90).url(), alt: story.coverAlt || story.title }],
      type: "article",
      ...(story.publishedAt ? { publishedTime: story.publishedAt } : {}),
    },
  };
}

export default async function StoryDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const story = await getStoryBySlug(slug);
  if (!story) notFound();
  const relatedStories = await getRelatedStories(slug);
  const publishedDate = formatDate(story.publishedAt);

  return (
    <main className="min-h-screen bg-[#f4f1e9]">
      <header className="px-5 pb-8 pt-8 sm:px-10 sm:pb-12 sm:pt-10 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <Link href="/stories" className="eyebrow inline-flex items-center gap-2 text-[#77786d] transition-colors hover:text-[#191a16] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#777d68]"><ArrowLeft size={13} /> ALL STORIES</Link>
          <div className="mx-auto mt-16 max-w-5xl sm:mt-24">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-[#77786d]">
              <span className="eyebrow">{story.location || "FIELD NOTES"}</span>
              {publishedDate && <><span aria-hidden="true" className="h-3 w-px bg-black/20" /><time className="text-xs" dateTime={story.publishedAt}>{publishedDate}</time></>}
            </div>
            <h1 className="display mt-6 max-w-5xl text-5xl leading-[.94] sm:text-7xl lg:text-[6.5rem]">{story.title}<span className="text-[#777d68]">.</span></h1>
            {story.excerpt && <p className="mt-7 max-w-2xl text-base leading-8 text-[#65655d] sm:text-lg sm:leading-9">{story.excerpt}</p>}
            <p className="eyebrow mt-8 text-[#77786d]">A NOTE FROM THE FIELD</p>
          </div>
        </div>
      </header>

      <figure className="mx-auto max-w-[1800px] px-0 sm:px-6 lg:px-10">
        <div className="relative aspect-[4/3] overflow-hidden bg-[#dedacf] sm:aspect-[16/9] lg:aspect-[2/1]">
          <Image src={urlForImage(story.coverImage).width(2400).quality(92).url()} alt={story.coverAlt || story.title} fill priority sizes="(max-width: 640px) 100vw, (max-width: 1280px) 94vw, 1800px" className="object-cover" />
        </div>
        {story.coverAlt && <figcaption className="px-5 pt-3 text-[11px] text-[#77786d] sm:px-0">{story.coverAlt}</figcaption>}
      </figure>

      <article className="mx-auto max-w-3xl px-5 pb-16 pt-12 text-[#33342d] sm:px-10 sm:pb-24 sm:pt-20">
        {story.body?.length ? (
          <PortableText
            value={story.body as never}
            components={{
              types: {
                image: ({ value }) => (
                  <figure className="my-10 sm:my-14">
                    <Image src={urlForImage(value).width(1800).quality(90).url()} alt={value.alt || story.title} width={1800} height={1200} sizes="(max-width: 768px) 100vw, 768px" className="h-auto w-full" />
                    {value.caption && <figcaption className="mt-3 text-xs leading-5 text-[#77786d]">{value.caption}</figcaption>}
                  </figure>
                ),
              },
              block: {
                normal: ({ children }) => <p className="my-6 text-[16px] leading-[1.95] text-[#55564e] sm:my-7 sm:text-[17px]">{children}</p>,
                h2: ({ children }) => <h2 className="display mb-5 mt-14 text-3xl leading-tight sm:mt-16 sm:text-4xl">{children}</h2>,
                h3: ({ children }) => <h3 className="display mb-4 mt-10 text-2xl leading-tight sm:text-3xl">{children}</h3>,
                blockquote: ({ children }) => <blockquote className="my-10 border-l-2 border-[#9aa783] py-1 pl-5 font-serif text-2xl italic leading-relaxed text-[#65655d] sm:pl-7 sm:text-3xl">{children}</blockquote>,
              },
              list: {
                bullet: ({ children }) => <ul className="my-6 list-disc space-y-2 pl-6 text-base leading-8 text-[#55564e]">{children}</ul>,
                number: ({ children }) => <ol className="my-6 list-decimal space-y-2 pl-6 text-base leading-8 text-[#55564e]">{children}</ol>,
              },
              marks: {
                strong: ({ children }) => <strong className="font-semibold text-[#292a24]">{children}</strong>,
                em: ({ children }) => <em className="italic">{children}</em>,
                link: ({ children, value }) => <a href={value?.href} target={value?.blank ? "_blank" : undefined} rel={value?.blank ? "noreferrer noopener" : undefined} className="underline decoration-[#9aa783] decoration-1 underline-offset-4 transition-colors hover:text-[#777d68]">{children}</a>,
              },
            }}
          />
        ) : (
          <p className="text-base leading-8 text-[#65655d]">This story does not have its full text yet. Add paragraphs and images in Sanity Studio to complete it.</p>
        )}

        <div className="mt-16 flex flex-wrap items-center justify-between gap-5 border-y border-black/15 py-6 sm:mt-20">
          <Link href="/stories" className="eyebrow inline-flex items-center gap-2 text-[#77786d] transition-colors hover:text-black"><ArrowLeft size={13} /> BACK TO THE JOURNAL</Link>
          <Link href="/photography" className="eyebrow inline-flex items-center gap-2 text-[#77786d] transition-colors hover:text-black">EXPLORE PHOTOGRAPHS <ArrowUpRight size={13} /></Link>
        </div>
      </article>

      {relatedStories.length > 0 && (
        <section className="border-t border-black/10 bg-[#eae6dc] px-5 py-14 sm:px-10 sm:py-20 lg:px-20" aria-labelledby="related-stories-heading">
          <div className="mx-auto max-w-7xl">
            <div className="mb-8 flex items-end justify-between gap-4 sm:mb-10">
              <div>
                <p className="eyebrow text-[#77786d]">KEEP EXPLORING</p>
                <h2 id="related-stories-heading" className="display mt-3 text-4xl sm:text-5xl">More field notes<span className="italic text-[#777d68]">.</span></h2>
              </div>
              <Link href="/stories" className="eyebrow hidden border-b border-black/30 pb-2 text-[#65655d] transition-colors hover:text-black sm:inline-flex">ALL STORIES <ArrowUpRight size={13} className="ml-2" /></Link>
            </div>
            <div className="grid gap-x-8 gap-y-12 md:grid-cols-2 lg:gap-x-12">
              {relatedStories.map((related, index) => <StoryCard key={related._id} story={related} index={index + 1} />)}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
