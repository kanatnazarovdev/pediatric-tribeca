import { DocumentTextIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

export const postType = defineType({
  name: "post",
  title: "Post",
  type: "document",
  icon: DocumentTextIcon,
  fieldsets: [{ name: "seo", title: "SEO & Social Media Metadata" }],
  fields: [
    // 1. ADD THE LANGUAGE FIELD
    // This allows you to differentiate between 'en' and 'es' documents
    defineField({
      name: "language",
      type: "string",
      title: "Language",
      initialValue: "en",
      options: {
        list: [
          { title: "English", value: "en" },
          { title: "Spanish", value: "es" },
          { title: "Chinese", value: "zh" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "title",
      type: "string",
      description: "The main headline for the article.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "excerpt",
      type: "text",
      title: "Excerpt / Meta Description",
      description:
        "The 1-2 sentence summary used for blog cards and Google results (Max 160 chars).",
      validation: (Rule) =>
        Rule.max(160).warning(
          "Longer descriptions will be truncated by Google.",
        ),
    }),
    // 2. TRANSLATION REFERENCE (Optional but highly recommended)
    // This connects the Spanish version to its English counterpart
    defineField({
      name: "translationOf",
      title: "Translation of",
      type: "reference",
      to: [{ type: "post" }],
      description:
        "If this is a Spanish post, link it to the original English version.",
      // Hide this field if we are on the English version to keep UI clean
      hidden: ({ document }) => document?.language === "en",
    }),
    defineField({
      name: "author",
      type: "reference",
      to: { type: "author" },
    }),
    defineField({
      name: "mainImage",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: "alt",
          type: "string",
          title: "Alternative Text",
          description: "Describe the image for accessibility and SEO.",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "caption",
          type: "string",
          title: "Caption",
        }),
      ],
    }),
    defineField({
      name: "categories",
      type: "array",
      of: [defineArrayMember({ type: "reference", to: { type: "category" } })],
    }),
    defineField({
      name: "publishedAt",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: "readTime",
      type: "number",
      title: "Estimated Reading Time",
    }),
    defineField({
      name: "body",
      type: "blockContent",
      description: "The main content of your post.",
    }),
    defineField({
      name: "seoTitle",
      title: "Custom SEO Title",
      type: "string",
      fieldset: "seo",
      description: "Optional: Overrides the title for search engines.",
    }),
  ],
  preview: {
    select: {
      title: "title",
      author: "author.name",
      media: "mainImage",
      lang: "language",
    },
    prepare(selection) {
      const { author, lang, title } = selection;
      const flags: Record<string, string> = {
        en: "🇺🇸",
        es: "🇪🇸",
        zh: "🇨🇳",
      };
      const flag = flags[lang as string] || "🌐";

      return {
        ...selection,
        title: `${flag} ${title}`,
        subtitle: author ? `by ${author}` : "No author assigned",
      };
    },
  },
});
