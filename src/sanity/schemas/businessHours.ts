import { defineType, defineField } from 'sanity'
import { ClockIcon } from '@sanity/icons'

const TIME_OPTIONS = [
  '6:00 AM', '6:30 AM', '7:00 AM', '7:30 AM',
  '8:00 AM', '8:30 AM', '9:00 AM', '9:30 AM',
  '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
  '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM',
  '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM',
  '4:00 PM', '4:30 PM', '5:00 PM', '5:30 PM',
  '6:00 PM', '6:30 PM', '7:00 PM', '7:30 PM',
  '8:00 PM', '8:30 PM', '9:00 PM',
]

export default defineType({
  name: 'businessHours',
  title: 'Business Hours',
  type: 'document',
  icon: ClockIcon,
  fields: [
    defineField({
      name: 'regularHours',
      title: '📅 Regular Hours',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'dayHours',
          fields: [
            {
              name: 'day',
              title: 'Day',
              type: 'string',
              options: {
                list: [
                  'Monday', 'Tuesday', 'Wednesday', 'Thursday',
                  'Friday', 'Saturday', 'Sunday',
                ],
              },
              validation: (rule) => rule.required(),
            },
            {
              name: 'isOpen',
              title: 'Open?',
              type: 'boolean',
              initialValue: true,
            },
            {
              name: 'openTime',
              title: 'Opens',
              type: 'string',
              options: { list: TIME_OPTIONS },
              hidden: ({ parent }) => !parent?.isOpen,
            },
            {
              name: 'closeTime',
              title: 'Closes',
              type: 'string',
              options: { list: TIME_OPTIONS },
              hidden: ({ parent }) => !parent?.isOpen,
            },
          ],
          preview: {
            select: {
              day: 'day',
              isOpen: 'isOpen',
              openTime: 'openTime',
              closeTime: 'closeTime',
            },
            prepare({ day, isOpen, openTime, closeTime }) {
              return {
                title: day,
                subtitle: isOpen ? `${openTime} – ${closeTime}` : '❌ Closed',
              }
            },
          },
        },
      ],
      validation: (rule) => rule.max(7),
    }),
    defineField({
      name: 'holidayClosures',
      title: '🎄 Holiday Closures',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'holidayClosure',
          fields: [
            {
              name: 'name',
              title: 'Holiday Name',
              type: 'string',
              validation: (rule) => rule.required(),
            },
            {
              name: 'startDate',
              title: 'Start Date',
              type: 'date',
              validation: (rule) => rule.required(),
            },
            {
              name: 'endDate',
              title: 'End Date',
              type: 'date',
              validation: (rule) => rule.required(),
            },
            {
              name: 'message',
              title: 'Closure Message',
              description: 'Shown on the contact page during this closure',
              type: 'text',
              rows: 2,
            },
          ],
          preview: {
            select: {
              name: 'name',
              startDate: 'startDate',
              endDate: 'endDate',
            },
            prepare({ name, startDate, endDate }) {
              const start = startDate ? new Date(startDate).toLocaleDateString('en-AU', { month: 'short', day: 'numeric' }) : ''
              const end = endDate ? new Date(endDate).toLocaleDateString('en-AU', { month: 'short', day: 'numeric' }) : ''
              return {
                title: `📌 ${name}`,
                subtitle: start === end ? start : `${start} → ${end}`,
              }
            },
          },
        },
      ],
    }),
    defineField({
      name: 'holidayBanner',
      title: '💬 Holiday Banner',
      description: 'Shows a sitewide banner when enabled',
      type: 'object',
      fields: [
        {
          name: 'enabled',
          title: 'Show Banner',
          type: 'boolean',
          initialValue: false,
        },
        {
          name: 'message',
          title: 'Banner Message',
          type: 'text',
          rows: 2,
          hidden: ({ parent }) => !parent?.enabled,
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: '⏰ Business Hours' }
    },
  },
})
