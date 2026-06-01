import { defineField, defineType } from "sanity";

export const contentType = defineType({
  name: 'contentType',
  title: 'Content Type',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string' }),
    defineField({ name: 'slug', type: 'slug', options: { source: 'title' } }),
  ],
});