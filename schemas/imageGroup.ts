// schemas/imageGroup.ts

import {defineType, defineField} from 'sanity'

export const imageGroup = defineType({
  name: 'imageGroup',
  title: 'Image Group',
  type: 'object',
  fields: [
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {hotspot: true},
          fields: [
            defineField({
              name: 'alt',
              title: 'Alt text',
              type: 'string',
            }),
          ],
        },
      ],
      validation: (Rule) => Rule.min(2).max(6).error('Add 2 to 6 images.'),
    }),
  ],
})
