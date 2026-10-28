import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";
import { getStories, getStoryBySlug } from "@/sanity/lib/data";
import { urlForImage } from "@/sanity/lib/image";

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
  };
}

export default async function StoryDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const story = await getStoryBySlug(slug);
  if (!story) notFound();

  return (
    <main className="min-h-screen bg-[#f4f1e9]">
      <header className="px-6 py-8 sm:px-12 lg:px-20">
        <div className="mx-auto max-w-5xl">
          <Link href="/stories" className="eyebrow text-[#77786d] transition-opacity hover:opacity-60">← ALL STORIES</Link>
          <p className="eyebrow mt-20 text-[#77786d]">{story.location || "FIELD NOTES"}</p>
          <h1 className="display mt-5 max-w-5xl text-5xl leading-[.98] sm:text-7xl">{story.title}</h1>
          {story.excerpt && <p className="mt-6 max-w-2xl text-base leading-7 text-[#65655d]">{story.excerpt}</p>}
          {story.publishedAt && <p className="mt-5 text-xs text-[#77786d]">{new Date(story.publishedAt).toLocaleDateString("en", { year: "numeric", month: "long", day: "numeric" })}</p>}
        </div>
      </header>

      <div className="relative mx-auto mt-6 aspect-[16/9] w-full max-w-[1600px] bg-[#dedacf]">
        <Image src={urlForImage(story.coverImage).width(2000).quality(88).url()} alt={story.coverAlt || story.title} fill priority sizes="100vw" className="object-cover" />
      </div>

      <article className="prose prose-lg mx-auto max-w-3xl px-6 py-16 text-[#33342d] sm:px-10 sm:py-24">
        {story.body?.length ? (
          <PortableText
            value={story.body as never}
            components={{
              types: {
                image: ({ value }) => (
                  <figure className="my-12">
                    <Image src={urlForImage(value).width(1400).quality(85).url()} alt={value.alt || story.title} width={1400} height={1000} className="h-auto w-full object-cover" />
                    {value.caption && <figcaption className="mt-3 text-xs text-[#77786d]">{value.caption}</figcaption>}
                  </figure>
                ),
              },
              block: {
                normal: ({ children }) => <p className="my-6 text-base leading-8 text-[#55564e]">{children}</p>,
                h2: ({ children }) => <h2 className="display mt-12 text-4xl">{children}</h2>,
                h3: ({ children }) => <h3 className="display mt-10 text-3xl">{children}</h3>,
                blockquote: ({ children }) => <blockquote className="my-8 border-l border-[#9aa783] pl-5 font-serif text-2xl italic text-[#65655d]">{children}</blockquote>,
              },
              marks: {
                link: ({ children, value }) => <a href={value?.href} target={value?.blank ? "_blank" : undefined} rel={value?.blank ? "noreferrer" : undefined} className="underline underline-offset-4">{children}</a>,
              },
            }}
          />
        ) : (
          <p className="text-base leading-8 text-[#65655d]">This story does not have its full text yet. Add paragraphs and images in Sanity Studio to complete it.</p>
        )}
        <div className="mt-16 border-t border-black/15 pt-8">
          <Link href="/stories" className="eyebrow text-[#77786d] hover:text-black">← BACK TO ALL STORIES</Link>
        </div>
      </article>
    </main>
  );
}
