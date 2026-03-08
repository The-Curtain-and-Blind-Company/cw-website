import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'r252l6ei',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

async function seed() {
  console.log('🌱 Seeding initial data...')

  // Business Hours
  await client.createOrReplace({
    _id: 'businessHours',
    _type: 'businessHours',
    regularHours: [
      { _key: 'mon', _type: 'dayHours', day: 'Monday', isOpen: true, openTime: '9:00 AM', closeTime: '5:00 PM' },
      { _key: 'tue', _type: 'dayHours', day: 'Tuesday', isOpen: true, openTime: '9:00 AM', closeTime: '5:00 PM' },
      { _key: 'wed', _type: 'dayHours', day: 'Wednesday', isOpen: true, openTime: '9:00 AM', closeTime: '5:00 PM' },
      { _key: 'thu', _type: 'dayHours', day: 'Thursday', isOpen: true, openTime: '9:00 AM', closeTime: '5:00 PM' },
      { _key: 'fri', _type: 'dayHours', day: 'Friday', isOpen: true, openTime: '9:00 AM', closeTime: '5:00 PM' },
      { _key: 'sat', _type: 'dayHours', day: 'Saturday', isOpen: true, openTime: '9:00 AM', closeTime: '1:00 PM' },
      { _key: 'sun', _type: 'dayHours', day: 'Sunday', isOpen: false },
    ],
    holidayClosures: [],
    holidayBanner: { enabled: false, message: '' },
  })
  console.log('✅ Business Hours seeded')

  // Site Settings
  await client.createOrReplace({
    _id: 'siteSettings',
    _type: 'siteSettings',
    companyName: 'CurtainWorld',
    phone: '08 9249 4800',
    email: 'info@curtainworld.com.au',
    address: {
      street: '67 Pavers Circle',
      suburb: 'Malaga',
      state: 'WA',
      postcode: '6090',
    },
    googleMapsUrl: 'https://maps.google.com/?cid=17031766686498756955',
    socialMedia: {
      facebook: 'https://www.facebook.com/CurtainWorld',
      instagram: 'https://www.instagram.com/curtainworld_perth/',
      pinterest: 'https://www.pinterest.com.au/curtainworld/',
      youtube: 'https://www.youtube.com/@CurtainWorld',
    },
    primaryCta: {
      text: 'Book a Free Measure & Quote',
      url: '/book-a-free-measure-and-quote',
    },
    secondaryCta: {
      text: 'Visit Our Showroom',
      url: '/contact',
    },
  })
  console.log('✅ Site Settings seeded')

  // Homepage
  await client.createOrReplace({
    _id: 'homepage',
    _type: 'homepage',
    heroHeadline: 'Making Beautiful [Curtains] & Blinds Since 1974',
    heroSubheadline: "Perth's premier window furnishings company. Family-owned and locally manufactured for over 50 years.",
    productsSectionTitle: 'Our Products',
    productCards: [
      { _key: 'curtains', _type: 'object', title: 'Curtains', description: 'Sheer, blockout, and decorative curtains', url: '/curtains/' },
      { _key: 'blinds', _type: 'object', title: 'Blinds', description: 'Roller, venetian, and honeycomb blinds', url: '/blinds-perth/' },
      { _key: 'shutters', _type: 'object', title: 'Shutters', description: 'Custom plantation shutters', url: '/shutters/' },
      { _key: 'outdoor', _type: 'object', title: 'Outdoor', description: 'Café blinds, awnings, and shade solutions', url: '/outdoor/' },
    ],
    heritageHeadline: '50+ Years of Perth Heritage',
    heritageBody: "Since 1974, CurtainWorld has been making beautiful curtains and blinds right here in Western Australia. From our Malaga factory and showroom, we've helped over 100,000 Perth homes find the perfect window furnishings.",
    heritageStats: [
      { _key: 'years', _type: 'object', number: '50+', label: 'Years in Business' },
      { _key: 'homes', _type: 'object', number: '100K+', label: 'Homes Furnished' },
      { _key: 'team', _type: 'object', number: '120+', label: 'Team Members' },
    ],
    usps: [
      { _key: 'measure', _type: 'object', title: 'Free In-Home Measure', description: "We'll come to you — no obligation, no pressure.", icon: 'tape-measure' },
      { _key: 'local', _type: 'object', title: 'Made in WA', description: 'Manufactured in our Malaga factory by local craftspeople.', icon: 'factory' },
      { _key: 'install', _type: 'object', title: 'Professional Installation', description: 'Our experienced team handles everything.', icon: 'tools' },
      { _key: 'warranty', _type: 'object', title: '5-Year Warranty', description: 'Quality guaranteed on all our products.', icon: 'shield' },
    ],
    seoTitle: 'CurtainWorld | Perth Curtains, Blinds & Shutters Since 1974',
    seoDescription: "Perth's leading curtain, blind and shutter company. Family-owned since 1974. Free in-home measure & quote. Visit our Malaga showroom or book online.",
  })
  console.log('✅ Homepage seeded')

  // Sample testimonials from the live site
  const testimonials = [
    { _id: 'testimonial-mardi', name: 'Mardi', location: 'Perth', quote: "CurtainWorld were amazing from start to finish. The consultant was so helpful and patient with my indecisiveness! The curtains look absolutely stunning.", rating: 5, featured: true },
    { _id: 'testimonial-nana-c', name: 'Nana C', location: 'Perth', quote: "We've used CurtainWorld for three houses now. Wouldn't go anywhere else. Great quality, great service, and the installation team is always professional.", rating: 5, featured: true },
    { _id: 'testimonial-alison', name: 'Alison', location: 'Perth', quote: 'The shutters look incredible. We should have done it years ago! The team made the whole process so easy.', rating: 5, featured: true },
  ]

  for (const t of testimonials) {
    await client.createOrReplace({
      ...t,
      _type: 'testimonial',
    })
  }
  console.log('✅ Testimonials seeded')

  console.log('\n🎉 All initial data seeded successfully!')
}

seed().catch(console.error)
