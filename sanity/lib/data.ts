import { hasSanityConfig } from "@/sanity/env";
import { sanityClient } from "@/sanity/lib/client";
import {
  featuredPhotographsQuery,
  featuredStoriesQuery,
  heroSlidesQuery,
  photographsQuery,
  relatedStoriesQuery,
  storiesQuery,
  storyBySlugQuery,
} from "@/sanity/lib/queries";
import type { HeroSlideDocument, PhotographDocument, StoryCardDocument, StoryDocument } from "@/sanity/lib/types";

export async function getHeroSlides(): Promise<HeroSlideDocument[]> {
  if (!hasSanityConfig) return [];
  const slides = await sanityClient.fetch<HeroSlideDocument[] | null>(heroSlidesQuery, {}, { next: { revalidate: 60 } });
  return slides ?? [];
}

export async function getFeaturedPhotographs(): Promise<PhotographDocument[]> {
  if (!hasSanityConfig) return [];
  return sanityClient.fetch(featuredPhotographsQuery, {}, { next: { revalidate: 60 } });
}

export async function getPhotographs(): Promise<PhotographDocument[]> {
  if (!hasSanityConfig) return [];
  return sanityClient.fetch(photographsQuery, {}, { next: { revalidate: 60 } });
}

export async function getFeaturedStories(): Promise<StoryCardDocument[]> {
  if (!hasSanityConfig) return [];
  return sanityClient.fetch(featuredStoriesQuery, {}, { next: { revalidate: 60 } });
}

export async function getStories(): Promise<StoryCardDocument[]> {
  if (!hasSanityConfig) return [];
  return sanityClient.fetch(storiesQuery, {}, { next: { revalidate: 60 } });
}

export async function getStoryBySlug(slug: string): Promise<StoryDocument | null> {
  if (!hasSanityConfig) return null;
  return sanityClient.fetch(storyBySlugQuery, { slug }, { next: { revalidate: 60 } });
}


export async function getRelatedStories(slug: string): Promise<StoryCardDocument[]> {
  if (!hasSanityConfig) return [];
  return sanityClient.fetch(relatedStoriesQuery, { slug }, { next: { revalidate: 60 } });
}
