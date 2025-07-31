// schemas/blogPost.ts

import {defineType, defineField} from 'sanity'
import {imageGroup} from './imageGroup'

export const blogPost = defineType({
  name: 'blogPost',
  title: 'Blog Post',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'title', maxLength: 96},
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{type: 'category'}],
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
      options: {hotspot: true},
      fields: [
        {name: 'alt', type: 'string', title: 'Alt text'},
        {name: 'width', type: 'number', title: 'Width (px, optional)'},
        {name: 'height', type: 'number', title: 'Height (px, optional)'},
        {
          name: 'alignment',
          type: 'string',
          title: 'Alignment',
          options: {
            list: [
              {title: 'Left', value: 'left'},
              {title: 'Center', value: 'center'},
              {title: 'Right', value: 'right'},
            ],
            layout: 'radio',
          },
          initialValue: 'center',
        },
      ],
    }),

    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [
        {
          type: 'block',
          marks: {
            decorators: [
              {title: 'Strong', value: 'strong'},
              {title: 'Emphasis', value: 'em'},
              {title: 'Color', value: 'color'},
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'URL',
                fields: [
                  {
                    name: 'href',
                    type: 'url',
                    title: 'URL',
                    validation: (Rule) =>
                      Rule.uri({
                        scheme: ['http', 'https', 'mailto', 'tel'],
                      }),
                  },
                  {
                    name: 'blank',
                    title: 'Open in new tab',
                    type: 'boolean',
                  },
                ],
              },
            ],
          },
          styles: [
            {title: 'Left Align', value: 'normal'},
            {title: 'Center Align', value: 'center'},
            {title: 'Right Align', value: 'right'},
            {title: 'Justify Align', value: 'justify'},
            {title: 'Heading 1', value: 'h1'},
            {title: 'Heading 2', value: 'h2'},
            {title: 'Quote', value: 'blockquote'},
          ],
        },
        {
          type: 'image',
          options: {hotspot: true},
          fields: [
            {name: 'alt', type: 'string', title: 'Alt text'},
            {name: 'width', type: 'number', title: 'Width (px, optional)'},
            {name: 'height', type: 'number', title: 'Height (px, optional)'},
            {
              name: 'alignment',
              type: 'string',
              title: 'Alignment',
              options: {
                list: [
                  {title: 'Left', value: 'left'},
                  {title: 'Center', value: 'center'},
                  {title: 'Right', value: 'right'},
                ],
                layout: 'radio',
              },
              initialValue: 'center',
            },
          ],
        },
        {type: 'imageGroup'}, // ✅ Allows multiple images inline
      ],
    }),

    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{type: 'string'}],
    }),

    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
    }),

    defineField({
      name: 'seoTitle',
      title: 'SEO Title',
      type: 'string',
    }),

    defineField({
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
    }),

    defineField({
      name: 'theme',
      title: 'Theme',
      type: 'object',
      fields: [
        defineField({
          name: 'font',
          title: 'Font',
          type: 'string',
          description: 'Font family for this post (e.g., Arial, Times New Roman)',
        }),
        defineField({
          name: 'fontSize',
          title: 'Font Size',
          type: 'string',
          description: 'Font size for this post, e.g., "16px", "1.2rem"',
        }),
        defineField({
          name: 'color',
          title: 'Text Color',
          type: 'string',
          description: 'Text color in any CSS color format, e.g., #333333 or rgb(0,0,0)',
        }),
        defineField({
          name: 'bgColor',
          title: 'Background Color',
          type: 'string',
          description: 'Background color in CSS format',
        }),
      ],
    }),

    // ✅ NEW: Homepage Sections Selector
    defineField({
      name: 'homepageSections',
      title: 'Homepage Sections',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        list: [
          {title: 'Featured', value: 'featured'},
          {title: 'Slides', value: 'slides'},
          {title: 'Main Titles', value: 'maintitles'},
          {title: 'World News', value: 'worldnews'},
          {title: 'Popular News', value: 'popularnews'},
          {title: 'Editor Choice', value: 'editorchoice'},
          {title: 'Latest News', value: 'latestnews'},
        ],
        layout: 'tags',
      },
      description: 'Select homepage sections where this post will appear',
    }),

    // ✅ NEW: Optional Section Priority
    defineField({
      name: 'sectionPriority',
      title: 'Section Priority',
      type: 'number',
      description: 'Lower number means higher priority in homepage sections',
    }),
  ],
})
