import { defineField, defineType } from "sanity";

export const story = defineType({
  name: "story",
  title: "Travel story",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "title", maxLength: 96 }, validation: (rule) => rule.required() }),
    defineField({ name: "excerpt", title: "Short introduction", type: "text", rows: 3 }),
    defineField({ name: "coverImage", title: "Cover image", type: "image", options: { hotspot: true }, validation: (rule) => rule.required() }),
    defineField({ name: "coverAlt", title: "Cover image alt text", type: "string" }),
    defineField({ name: "location", title: "Location", type: "string" }),
    defineField({ name: "publishedAt", title: "Publication date", type: "datetime" }),
    defineField({ name: "body", title: "Story body", type: "array", of: [{ type: "block" }, { type: "image", options: { hotspot: true } }] }),
    defineField({ name: "featured", title: "Featured story", type: "boolean", initialValue: false })
  ],
  preview: { select: { title: "title", subtitle: "location", media: "coverImage" } }
});
