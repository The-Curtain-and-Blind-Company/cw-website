import { defineType, defineField } from 'sanity'
import { MenuIcon } from '@sanity/icons'

export default defineType({
  name: 'navigation',
  title: 'Navigation Menu',
  type: 'document',
  icon: MenuIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Menu Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'items',
      title: 'Menu Items',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'navItem',
          fields: [
            { name: 'label', title: 'Label', type: 'string', validation: (rule) => rule.required() },
            { name: 'url', title: 'URL', type: 'string', validation: (rule) => rule.required() },
            {
              name: 'children',
              title: 'Dropdown Items',
              type: 'array',
              of: [
                {
                  type: 'object',
                  name: 'navChild',
                  fields: [
                    { name: 'label', title: 'Label', type: 'string', validation: (rule) => rule.required() },
                    { name: 'url', title: 'URL', type: 'string', validation: (rule) => rule.required() },
                    { name: 'description', title: 'Description', type: 'string' },
                    { name: 'image', title: 'Image', type: 'image' },
                  ],
                  preview: {
                    select: { title: 'label', subtitle: 'url' },
                  },
                },
              ],
            },
          ],
          preview: {
            select: { title: 'label', subtitle: 'url', children: 'children' },
            prepare({ title, subtitle, children }) {
              return {
                title,
                subtitle: children?.length ? `${subtitle} (${children.length} items)` : subtitle,
              }
            },
          },
        },
      ],
    }),
  ],
})
