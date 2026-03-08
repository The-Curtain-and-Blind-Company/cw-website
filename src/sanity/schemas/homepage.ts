import { defineType, defineField } from 'sanity'
import { HomeIcon } from '@sanity/icons'

export default defineType({
  name: 'homepage',
  title: 'Homepage',
  type: 'document',
  icon: HomeIcon,
  groups: [
    { name: 'hero', title: 'Hero' },
    { name: 'products', title: 'Products' },
    { name: 'heritage', title: 'Heritage' },
    { name: 'usps', title: 'Why Choose Us' },
    { name: 'video', title: 'Video' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    // Hero section
    defineField({
      name: 'heroHeadline',
      title: 'Hero Headline',
      description: 'Main heading — use [brackets] for accented words',
      type: 'string',
      initialValue: 'Making Beautiful [Curtains] & Blinds Since 1974',
      group: 'hero',
    }),
    defineField({
      name: 'heroSubheadline',
      title: 'Hero Subheadline',
      type: 'text',
      rows: 2,
      group: 'hero',
    }),
    defineField({
      name: 'heroVideo',
      title: 'Hero Background Video',
      type: 'file',
      options: { accept: 'video/mp4' },
      group: 'hero',
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Fallback Image',
      description: 'Shown while video loads or on mobile',
      type: 'image',
      options: { hotspot: true },
      group: 'hero',
    }),
    // Product cards
    defineField({
      name: 'productsSectionTitle',
      title: 'Section Title',
      type: 'string',
      initialValue: 'Our Products',
      group: 'products',
    }),
    defineField({
      name: 'productCards',
      title: 'Product Cards',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', title: 'Title', type: 'string' },
            { name: 'image', title: 'Image', type: 'image', options: { hotspot: true } },
            { name: 'url', title: 'Link URL', type: 'string' },
            { name: 'description', title: 'Short Description', type: 'string' },
          ],
          preview: {
            select: { title: 'title', media: 'image' },
          },
        },
      ],
      group: 'products',
    }),
    // Heritage section
    defineField({
      name: 'heritageHeadline',
      title: 'Heritage Headline',
      type: 'string',
      group: 'heritage',
    }),
    defineField({
      name: 'heritageBody',
      title: 'Heritage Text',
      type: 'text',
      rows: 4,
      group: 'heritage',
    }),
    defineField({
      name: 'heritageImage',
      title: 'Heritage Image',
      type: 'image',
      options: { hotspot: true },
      group: 'heritage',
    }),
    defineField({
      name: 'heritageStats',
      title: 'Stats',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'number', title: 'Number', type: 'string' },
            { name: 'label', title: 'Label', type: 'string' },
          ],
          preview: {
            select: { title: 'number', subtitle: 'label' },
          },
        },
      ],
      group: 'heritage',
    }),
    // USPs
    defineField({
      name: 'usps',
      title: 'Why Choose Us',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', title: 'Title', type: 'string' },
            { name: 'description', title: 'Description', type: 'text', rows: 2 },
            { name: 'icon', title: 'Icon Name', type: 'string', description: 'e.g. "tape-measure", "factory", "truck"' },
          ],
          preview: {
            select: { title: 'title', subtitle: 'description' },
          },
        },
      ],
      group: 'usps',
    }),
    // Video section
    defineField({
      name: 'showcaseVideoUrl',
      title: 'Showcase Video URL',
      description: 'YouTube or Vimeo embed URL',
      type: 'url',
      group: 'video',
    }),
    defineField({
      name: 'showcaseVideoThumbnail',
      title: 'Video Thumbnail',
      type: 'image',
      options: { hotspot: true },
      group: 'video',
    }),
    // SEO
    defineField({
      name: 'seoTitle',
      title: 'SEO Title',
      type: 'string',
      validation: (rule) => rule.max(60).warning('Keep under 60 characters'),
      group: 'seo',
    }),
    defineField({
      name: 'seoDescription',
      title: 'Meta Description',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.max(160).warning('Keep under 160 characters'),
      group: 'seo',
    }),
  ],
  preview: {
    prepare() {
      return { title: '🏠 Homepage' }
    },
  },
})
