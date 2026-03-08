import { defineType, defineField } from 'sanity'
import { CogIcon } from '@sanity/icons'

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  icon: CogIcon,
  groups: [
    { name: 'contact', title: 'Contact Info' },
    { name: 'social', title: 'Social Media' },
    { name: 'ctas', title: 'Global CTAs' },
  ],
  fields: [
    defineField({
      name: 'companyName',
      title: 'Company Name',
      type: 'string',
      initialValue: 'CurtainWorld',
      group: 'contact',
    }),
    defineField({
      name: 'phone',
      title: 'Phone Number',
      type: 'string',
      initialValue: '08 9249 4800',
      group: 'contact',
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      group: 'contact',
    }),
    defineField({
      name: 'address',
      title: 'Address',
      type: 'object',
      group: 'contact',
      fields: [
        { name: 'street', title: 'Street', type: 'string', initialValue: '67 Pavers Circle' },
        { name: 'suburb', title: 'Suburb', type: 'string', initialValue: 'Malaga' },
        { name: 'state', title: 'State', type: 'string', initialValue: 'WA' },
        { name: 'postcode', title: 'Postcode', type: 'string', initialValue: '6090' },
      ],
    }),
    defineField({
      name: 'googleMapsUrl',
      title: 'Google Maps URL',
      type: 'url',
      group: 'contact',
    }),
    defineField({
      name: 'socialMedia',
      title: 'Social Media Links',
      type: 'object',
      group: 'social',
      fields: [
        { name: 'facebook', title: 'Facebook', type: 'url' },
        { name: 'instagram', title: 'Instagram', type: 'url' },
        { name: 'pinterest', title: 'Pinterest', type: 'url' },
        { name: 'youtube', title: 'YouTube', type: 'url' },
      ],
    }),
    defineField({
      name: 'primaryCta',
      title: 'Primary CTA',
      description: 'The main call-to-action button across the site',
      type: 'object',
      group: 'ctas',
      fields: [
        { name: 'text', title: 'Button Text', type: 'string', initialValue: 'Book a Free Measure & Quote' },
        { name: 'url', title: 'Link URL', type: 'string', initialValue: '/book-a-free-measure-and-quote' },
      ],
    }),
    defineField({
      name: 'secondaryCta',
      title: 'Secondary CTA',
      type: 'object',
      group: 'ctas',
      fields: [
        { name: 'text', title: 'Button Text', type: 'string', initialValue: 'Visit Our Showroom' },
        { name: 'url', title: 'Link URL', type: 'string' },
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Site Settings' }
    },
  },
})
