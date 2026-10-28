import { defineField, defineType } from "sanity";

export const photograph = defineType({
  name: "photograph",
  title: "Photograph",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "title", maxLength: 96 }, validation: (rule) => rule.required() }),
    defineField({ name: "image", title: "Image", type: "image", options: { hotspot: true }, validation: (rule) => rule.required() }),
    defineField({ name: "alt", title: "Alt text", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "caption", title: "Caption", type: "text", rows: 3 }),
    defineField({ name: "location", title: "Location", type: "string" }),
    defineField({ name: "dateTaken", title: "Date taken", type: "date" }),
    defineField({ name: "category", title: "Category", type: "string", options: { list: ["Wildlife", "Birds", "Insects", "Landscapes", "Travel", "Trekking", "People & Culture"] } }),
    defineField({ name: "featured", title: "Featured on homepage", type: "boolean", initialValue: false }),
    defineField({ name: "licensingAvailable", title: "Available for licensing", type: "boolean", initialValue: true })
  ],
  preview: { select: { title: "title", subtitle: "location", media: "image" } }
});
