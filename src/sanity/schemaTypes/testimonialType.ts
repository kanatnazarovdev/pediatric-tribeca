// src/sanity/schemaTypes/testimonialType.ts
import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'testimonial',
  title: 'Child Testimonials',
  type: 'document',
  fields: [
    defineField({
      name: 'childName',
      title: 'Child Name',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Experience Description',
      type: 'text',
      description: 'Describe their visit (e.g., "First visit using Biolase laser technology").'
    }),
    defineField({
      name: 'videoUrl',
      title: 'YouTube Video URL',
      type: 'url',
    }),
    defineField({
      name: 'thumbnail',
      title: 'Gallery Preview Image',
      type: 'image',
      options: { hotspot: true },
    }),
  ]
})