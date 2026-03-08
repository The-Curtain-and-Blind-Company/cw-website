import { groq } from 'next-sanity'

// Homepage
export const homepageQuery = groq`*[_type == "homepage"][0]{
  heroHeadline,
  heroSubheadline,
  heroVideo,
  heroImage,
  productsSectionTitle,
  productCards[]{
    _key,
    title,
    description,
    url,
    image
  },
  heritageHeadline,
  heritageBody,
  heritageImage,
  heritageStats[]{
    _key,
    number,
    label
  },
  usps[]{
    _key,
    title,
    description,
    icon
  },
  showcaseVideoUrl,
  showcaseVideoThumbnail,
  seoTitle,
  seoDescription
}`

// Site Settings
export const siteSettingsQuery = groq`*[_type == "siteSettings"][0]{
  companyName,
  phone,
  email,
  address,
  googleMapsUrl,
  socialMedia,
  primaryCta,
  secondaryCta
}`

// Business Hours
export const businessHoursQuery = groq`*[_type == "businessHours"][0]{
  regularHours[]{
    _key,
    day,
    isOpen,
    openTime,
    closeTime
  },
  holidayClosures[]{
    _key,
    name,
    startDate,
    endDate,
    message
  },
  holidayBanner
}`

// Testimonials (featured)
export const featuredTestimonialsQuery = groq`*[_type == "testimonial" && featured == true]{
  _id,
  name,
  location,
  quote,
  rating,
  image
}`

// Navigation
export const navigationQuery = groq`*[_type == "navigation" && title == "Main Menu"][0]{
  items[]{
    _key,
    label,
    url,
    children[]{
      _key,
      label,
      url,
      description
    }
  }
}`

// All products by category
export const productsByCategoryQuery = groq`*[_type == "product" && category == $category] | order(title asc){
  _id,
  title,
  slug,
  category,
  heroImage,
  shortDescription,
  seoTitle,
  seoDescription
}`

// Single product
export const productQuery = groq`*[_type == "product" && slug.current == $slug][0]{
  title,
  slug,
  category,
  heroImage,
  gallery[]{
    _key,
    asset,
    alt
  },
  shortDescription,
  body,
  features,
  specifications[]{
    _key,
    label,
    value
  },
  seoTitle,
  seoDescription,
  ogImage
}`

// Blog posts
export const blogPostsQuery = groq`*[_type == "blogPost"] | order(publishedAt desc){
  _id,
  title,
  slug,
  publishedAt,
  featuredImage,
  excerpt,
  category
}`

// Single blog post
export const blogPostQuery = groq`*[_type == "blogPost" && slug.current == $slug][0]{
  title,
  slug,
  publishedAt,
  featuredImage,
  excerpt,
  category,
  body,
  seoTitle,
  seoDescription
}`

// Suburb pages
export const suburbsQuery = groq`*[_type == "suburb"] | order(name asc){
  _id,
  name,
  slug,
  heroImage,
  seoTitle,
  seoDescription
}`

// Single suburb
export const suburbQuery = groq`*[_type == "suburb" && slug.current == $slug][0]{
  name,
  slug,
  heroImage,
  description,
  nearbySuburbs[]->{
    name,
    slug
  },
  seoTitle,
  seoDescription
}`

// Generic page
export const pageQuery = groq`*[_type == "page" && slug.current == $slug][0]{
  title,
  slug,
  heroImage,
  heroHeadline,
  heroSubheadline,
  body,
  seoTitle,
  seoDescription,
  seoH1,
  ogImage,
  noIndex
}`
