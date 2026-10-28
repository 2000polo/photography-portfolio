import { defineArrayMember, defineField, defineType } from "sanity";

export const homepageSlider = defineType({
  name: "homepageSlider",
  title: "Homepage Slider",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Internal title",
      type: "string",
      initialValue: "Homepage Slider",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slides",
      title: "Slides",
      description: "Choose existing Photograph entries and drag them to set the display order. Images are not uploaded again.",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "homepageSliderItem",
          title: "Slider item",
          fields: [
            defineField({
              name: "photograph",
              title: "Photograph",
              type: "reference",
              to: [{ type: "photograph" }],
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "subtitle",
              title: "Optional supporting text",
              type: "text",
              rows: 2,
              description: "Leave empty to use the photograph caption or the homepage default.",
            }),
            defineField({
              name: "storyHref",
              title: "Link destination",
              type: "string",
              initialValue: "/photography",
              description: "For example, /photography or /stories/your-story-slug.",
            }),
          ],
          preview: {
            select: {
              title: "photograph.title",
              subtitle: "photograph.location",
              media: "photograph.image",
            },
            prepare({ title, subtitle, media }) {
              return { title: title || "Select a photograph", subtitle, media };
            },
          },
        }),
      ],
    }),
  ],
  preview: {
    select: { title: "title" },
    prepare({ title }) {
      return { title: title || "Homepage Slider", subtitle: "Curate existing photographs for the homepage" };
    },
  },
});
