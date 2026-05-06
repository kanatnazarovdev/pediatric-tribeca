// schemas/doctorType.ts
import { defineField, defineType } from 'sanity'

export const doctorType = defineType({
  name: 'doctor',
  title: 'Doctors',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'role',
      title: 'Specialty/Title',
      type: 'string',
      description: 'e.g. Board Certified Pediatric Dentist',
    }),
    defineField({
      name: 'image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'bio',
      type: 'array',
      of: [{ type: 'block' }], 
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      initialValue: 0,
    }),
  ],
})