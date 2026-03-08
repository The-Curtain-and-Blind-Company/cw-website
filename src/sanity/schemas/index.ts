import siteSettings from './siteSettings'
import businessHours from './businessHours'
import navigation from './navigation'
import homepage from './homepage'
import page from './page'
import product from './product'
import blogPost from './blogPost'
import suburb from './suburb'
import testimonial from './testimonial'

export const schemaTypes = [
  // Singletons (one instance)
  siteSettings,
  businessHours,
  homepage,

  // Settings
  navigation,

  // Content
  page,
  product,
  blogPost,
  suburb,
  testimonial,
]
