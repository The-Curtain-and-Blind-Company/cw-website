import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './src/sanity/schemas'
import { projectId, dataset } from './src/sanity/env'

// Custom desk structure — singletons at top, content types below
const deskStructure = (S: any) =>
  S.list()
    .title('CurtainWorld')
    .items([
      // Singletons
      S.listItem()
        .title('🏠 Homepage')
        .child(S.document().schemaType('homepage').documentId('homepage')),
      S.divider(),

      // Site Settings group
      S.listItem()
        .title('⚙️ Site Settings')
        .child(
          S.list()
            .title('Settings')
            .items([
              S.listItem()
                .title('General')
                .child(S.document().schemaType('siteSettings').documentId('siteSettings')),
              S.listItem()
                .title('⏰ Business Hours')
                .child(S.document().schemaType('businessHours').documentId('businessHours')),
              S.listItem()
                .title('🔗 Navigation')
                .child(S.documentTypeList('navigation').title('Navigation Menus')),
            ])
        ),
      S.divider(),

      // Content types
      S.listItem()
        .title('📄 Pages')
        .child(S.documentTypeList('page').title('Pages')),
      S.listItem()
        .title('🪟 Products')
        .child(S.documentTypeList('product').title('Products')),
      S.listItem()
        .title('📍 Mobile Showroom')
        .child(S.documentTypeList('suburb').title('Suburb Pages')),
      S.listItem()
        .title('✍️ Blog & Inspiration')
        .child(S.documentTypeList('blogPost').title('Blog Posts')),
      S.listItem()
        .title('⭐ Testimonials')
        .child(S.documentTypeList('testimonial').title('Testimonials')),
    ])

export default defineConfig({
  name: 'curtainworld',
  title: 'CurtainWorld',
  projectId,
  dataset,
  plugins: [
    structureTool({ structure: deskStructure }),
    visionTool(),
  ],
  schema: {
    types: schemaTypes,
  },
})
