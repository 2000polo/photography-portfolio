import imageUrlBuilder from "@sanity/image-url";
import type { Image } from "sanity";
import { sanityClient } from "@/sanity/lib/client";

const builder = imageUrlBuilder(sanityClient);

export function urlForImage(source: Image | unknown) {
  return builder.image(source as Image).auto("format").fit("max");
}
