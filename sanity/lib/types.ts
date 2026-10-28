export type SanityImage = {
  _type?: "image";
  asset?: { _ref?: string; _id?: string; url?: string };
  crop?: unknown;
  hotspot?: unknown;
};

export type HeroSlideDocument = {
  id: string;
  title: string;
  subtitle?: string;
  location?: string;
  category?: string;
  image: SanityImage;
  imageAlt: string;
  storyHref?: string;
};

export type PhotographDocument = {
  _id: string;
  title: string;
  slug: string;
  image: SanityImage;
  alt: string;
  caption?: string;
  location?: string;
  dateTaken?: string;
  category?: string;
  licensingAvailable?: boolean;
};

export type StoryCardDocument = {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  coverImage: SanityImage;
  coverAlt?: string;
  location?: string;
  publishedAt?: string;
};

export type StoryDocument = StoryCardDocument & {
  body?: unknown[];
};
