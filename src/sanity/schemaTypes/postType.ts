import {DocumentTextIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const postType = defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  icon: DocumentTextIcon,
  // Using fieldsets to organize the UI in your Studio
  fieldsets: [
    { name: 'seo', title: 'SEO & Social Media Metadata' }
  ],
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      description: 'The main headline for the article.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'excerpt',
      type: 'text',
      title: 'Excerpt / Meta Description',
      description: 'The 1-2 sentence summary used for blog cards and Google results (Max 160 chars).',
      validation: (Rule) => Rule.max(160).warning('Longer descriptions will be truncated by Google.'),
    }),
    defineField({
      name: 'author',
      type: 'reference',
      to: {type: 'author'},
    }),
    defineField({
      name: 'mainImage',
      type: 'image',
      options: {
        hotspot: true, // Crucial for responsive design
      },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
          description: 'Describe the image for accessibility and SEO.',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'caption',
          type: 'string',
          title: 'Caption',
        })
      ]
    }),
    defineField({
      name: 'categories',
      type: 'array',
      of: [defineArrayMember({type: 'reference', to: {type: 'category'}})],
    }),
    defineField({
      name: 'publishedAt',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'readTime',
      type: 'number',
      title: 'Estimated Reading Time',
      description: 'In minutes (e.g., 5). Great for user engagement.',
    }),
    defineField({
      name: 'body',
      type: 'blockContent',
      description: 'The main content of your post.',
    }),
    // SEO OVERRIDES
    defineField({
      name: 'seoTitle',
      title: 'Custom SEO Title',
      type: 'string',
      fieldset: 'seo',
      description: 'Optional: Overrides the title for search engines.',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'mainImage',
    },
    prepare(selection) {
      const {author} = selection
      return {...selection, subtitle: author ? `by ${author}` : 'No author assigned'}
    },
  },
})