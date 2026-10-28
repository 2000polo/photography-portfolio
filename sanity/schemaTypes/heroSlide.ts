import { defineField, defineType } from "sanity";

export const heroSlide = defineType({
  name: "heroSlide",
  title: "Homepage slide",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Headline", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "subtitle", title: "Supporting text", type: "text", rows: 2 }),
    defineField({ name: "location", title: "Location label", type: "string" }),
    defineField({ name: "category", title: "Category", type: "string", options: { list: ["WILDLIFE", "LANDSCAPES", "TRAVEL", "FIELD NOTES"] } }),
    defineField({ name: "image", title: "Hero image", type: "image", options: { hotspot: true }, validation: (rule) => rule.required() }),
    defineField({ name: "imageAlt", title: "Image description (alt text)", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "storyHref", title: "Link destination", type: "string", initialValue: "/stories" }),
    defineField({ name: "order", title: "Display order", type: "number", initialValue: 0 }),
    defineField({ name: "published", title: "Show on homepage", type: "boolean", initialValue: true })
  ],
  preview: {
    select: { title: "title", subtitle: "location", media: "image" }
  },
  orderings: [{ title: "Display order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }]
});
