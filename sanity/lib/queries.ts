import { groq } from "next-sanity";

export const heroSlidesQuery = groq`*[_type == "heroSlide" && published == true] | order(order asc) {
  _id,
  title,
  subtitle,
  location,
  category,
  image,
  imageAlt,
  storyHref
}`;

export const featuredPhotographsQuery = groq`*[_type == "photograph" && featured == true] | order(dateTaken desc) [0...8] {
  _id,
  title,
  "slug": slug.current,
  image,
  alt,
  caption,
  location,
  dateTaken,
  category,
  licensingAvailable
}`;

export const photographsQuery = groq`*[_type == "photograph"] | order(dateTaken desc) {
  _id,
  title,
  "slug": slug.current,
  image,
  alt,
  caption,
  location,
  dateTaken,
  category,
  licensingAvailable
}`;

export const featuredStoriesQuery = groq`*[_type == "story" && featured == true && defined(slug.current)] | order(publishedAt desc) [0...4] {
  _id,
  title,
  "slug": slug.current,
  excerpt,
  coverImage,
  coverAlt,
  location,
  publishedAt
}`;

export const storiesQuery = groq`*[_type == "story" && defined(slug.current)] | order(publishedAt desc) {
  _id,
  title,
  "slug": slug.current,
  excerpt,
  coverImage,
  coverAlt,
  location,
  publishedAt
}`;

export const storyBySlugQuery = groq`*[_type == "story" && slug.current == $slug][0] {
  _id,
  title,
  "slug": slug.current,
  excerpt,
  coverImage,
  coverAlt,
  location,
  publishedAt,
  body
}`;
