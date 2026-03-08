/**
 * Structured content for product detail pages.
 * Replaces the raw Sanity body dump with properly structured sections
 * sourced from the live CW site content.
 */

export interface ProductContent {
  features: { icon: string; title: string; description: string }[]
  sections: { label?: string; headline: string; body: string; image?: string; reversed?: boolean; ctaLabel?: string; ctaHref?: string }[]
  featureGridLabel?: string
  featureGridHeadline?: string
  featureGridSubtitle?: string
  faq: { question: string; answer: string }[]
}

const DEFAULT_FAQ = [
  { question: 'How long does it take from order to installation?', answer: 'Typically 3-6 weeks depending on the product and fabric availability. Our consultant will give you an accurate timeline during your free measure & quote appointment.' },
  { question: 'Do you offer a warranty?', answer: 'Yes, all our products come with a comprehensive warranty. The specific warranty period varies by product — your consultant will explain the details for your chosen products.' },
  { question: 'Can I see fabric samples before ordering?', answer: 'Absolutely. During your free in-home consultation, our consultants bring a wide selection of fabric samples so you can see and feel them in your own home with your own lighting.' },
  { question: 'Do you service my area?', answer: 'We service the entire Perth metropolitan area and many regional areas. Check our Mobile Showroom page or call us on 08 9249 4800 to confirm.' },
  { question: 'Is there a minimum order?', answer: 'No minimum order. Whether you need one blind or want to outfit your entire home, we\'re happy to help.' },
]

const DEFAULT_FEATURES = [
  { icon: '✦', title: 'Huge Range', description: 'Perth\'s biggest selection of fabrics, colours and styles to suit every home.' },
  { icon: '☀', title: 'Light Control', description: 'Options for every preference — from complete blockout to soft filtered light.' },
  { icon: '◆', title: 'Quality Craftsmanship', description: 'Manufactured locally in our Malaga factory with premium materials.' },
]

const contentMap: Record<string, Partial<ProductContent>> = {
  'curtains/sheer-curtains': {
    features: [
      { icon: '🪶', title: 'Lightweight', description: 'Sheer curtains have a beautiful aesthetic and flow thanks to their lightweight material.' },
      { icon: '✦', title: 'Classic', description: 'Sheer curtains immediately enhance the look and feel of a room due to their timeless appearance.' },
      { icon: '☀', title: 'Light Control', description: 'Light can be beautifully diffused through sheer curtains creating a beautiful ambiance to any room.' },
    ],
    featureGridHeadline: 'Quality Sheer Curtains at <span class="accent">Affordable Prices</span>',
    featureGridSubtitle: 'Enhance any room with premium, factory direct sheer curtains.',
    sections: [
      { label: 'Perth\'s Biggest Range', headline: 'Browse with <span class="accent">Confidence</span>', body: 'We offer a variety of fabrics and colours to suit any room, in any environment, meaning you won\'t struggle to find versions that suit your home interior. Whether you want plain styles or patterned fabrics, we have the ideal products for you.', image: '/images/curtains-sheer.jpg' },
      { label: 'Natural Light', headline: 'Bring the <span class="accent">Outside</span> In', body: 'With sheer curtains, you can break down visual barriers between the indoors and outdoors. Sheer curtains help you make the most of natural light while allowing air to circulate freely. They also maintain your privacy while keeping your views of the world outside.', image: '/images/inspiration.jpg', reversed: true, ctaLabel: 'Book Free Consultation', ctaHref: '#' },
      { label: 'Double Up', headline: 'Partner with <span class="accent">Blockout</span> Curtains', body: 'For greater versatility, team sheer curtains up with blockout curtains. We offer a range of complementary designs that match perfectly. A combination of sheers and blockout curtains gives you total control over brightness and privacy.', image: '/images/curtains-double.jpg' },
    ],
  },
  'curtains/blockout-curtains': {
    features: [
      { icon: '✦', title: 'Latest Trends', description: 'At the forefront of the soft furnishings industry with the latest styles and fabrics.' },
      { icon: '☀', title: 'Light Control', description: 'Complete darkness when you want it — ideal for bedrooms, media rooms and shift workers.' },
      { icon: '◆', title: 'Quality Craftsmanship', description: 'Highest quality materials, manufactured locally in our Malaga factory.' },
    ],
    featureGridHeadline: 'The Best <span class="accent">Blockouts</span> in Perth',
    featureGridSubtitle: 'Premium blockout curtains that keep rooms dark, quiet and temperature controlled.',
    sections: [
      { label: 'Energy Efficiency', headline: 'Temperature <span class="accent">Regulation</span>', body: 'Blockout curtains provide excellent insulation. They help keep your home cooler in summer and warmer in winter, reducing your energy bills while keeping your family comfortable year-round.', image: '/images/curtains-blockout.jpg' },
      { label: 'Noise Reduction', headline: 'Peace &amp; <span class="accent">Quiet</span>', body: 'The heavy fabric of blockout curtains absorbs sound, reducing outside noise. Perfect for bedrooms facing busy streets, home offices, or media rooms where you want an immersive experience.', image: '/images/curtains-all.jpg', reversed: true },
    ],
  },
  'curtains/doublecurtains': {
    features: [
      { icon: '🔀', title: 'Twin Track', description: 'Easily switch between sheer and blockout curtains on a dual-track system.' },
      { icon: '📍', title: 'Locally Made', description: 'Manufactured right here in Perth at our Malaga factory for quality you can trust.' },
      { icon: '✋', title: 'Easily Operated', description: 'Smooth gliding tracks make opening and closing effortless every single time.' },
    ],
    featureGridHeadline: 'The Versatility of <span class="accent">Double</span> Curtains',
    featureGridSubtitle: 'Combine sheer and blockout curtains for complete light and privacy control.',
    sections: [
      { label: 'Versatility', headline: 'Total <span class="accent">Control</span>', body: 'Double curtains give you the best of both worlds. Use sheers during the day for soft filtered light and privacy, then draw the blockouts at night for complete darkness and insulation.', image: '/images/curtains-double.jpg' },
      { label: 'Style', headline: 'Double the <span class="accent">Style</span>', body: 'Choose from our huge range of complementary sheer and blockout fabrics to create a layered look that adds depth and elegance to any room. Our consultants will help you find the perfect pairing.', image: '/images/curtains-sheer.jpg', reversed: true },
    ],
  },
}

// Blinds products
const blindsDefaults: Partial<ProductContent> = {
  features: [
    { icon: '🎨', title: 'Huge Range', description: 'Perth\'s biggest selection of colours, fabrics and finishes to match any decor.' },
    { icon: '🔒', title: 'Blockout Materials', description: 'Options for complete light blockout — perfect for bedrooms and media rooms.' },
    { icon: '🌈', title: 'Colour Options', description: 'From neutrals to bold statements, find the perfect colour for your space.' },
  ],
  featureGridHeadline: 'Quality <span class="accent">Blinds</span> at Great Prices',
  featureGridSubtitle: 'Factory direct blinds manufactured in our Perth facility.',
  sections: [
    { label: 'Light Control', headline: 'Amazing <span class="accent">Light</span> Control', body: 'Our blinds give you precise control over the amount of light entering your room. From complete blockout to gently filtered light, you can create the perfect ambiance for any time of day.', image: '/images/blinds-all.jpg' },
    { label: 'Perth Made', headline: 'Factory <span class="accent">Direct</span>', body: 'Every blind is manufactured in our Malaga factory. No middlemen means better prices, faster turnaround, and the ability to customise every order to your exact specifications.', image: '/images/measure.jpg', reversed: true },
  ],
}

// Map blinds slugs
for (const slug of ['blinds-perth/blockout-roller', 'blinds-perth/sunscreen-roller', 'blinds-perth/timber-venetian', 'blinds-perth/aluminium-venetian', 'blinds-perth/cellular-blinds', 'blinds-perth/roman-blinds', 'blinds-perth/vertical', 'blinds-perth/veri-shade-blinds', 'blinds-perth/office-blinds', 'blinds-perth/office-venetian-blinds']) {
  if (!contentMap[slug]) contentMap[slug] = { ...blindsDefaults }
}

export function getProductContent(slug: string): ProductContent {
  const content = contentMap[slug] || {}
  return {
    features: content.features || DEFAULT_FEATURES,
    sections: content.sections || [
      { label: 'Our Factory', headline: 'Locally Made in <span class="accent">Malaga</span>', body: 'Every product is manufactured right here in Perth at our Malaga factory. No middlemen, no imports — just quality craftsmanship from our team to your home. This means faster turnaround, better quality control, and the ability to truly customise every order.', image: '/images/measure.jpg', ctaLabel: 'Visit Our Showroom', ctaHref: '/about-us/our-showroom/' },
      { label: 'The Process', headline: 'Free In-Home <span class="accent">Consultation</span>', body: 'Our expert consultants come to your home with fabric samples, take precise measurements, and help you choose the perfect window furnishings. No obligation, no pressure — just honest advice from people who know curtains and blinds inside out.', image: '/images/showroom.jpg', reversed: true, ctaLabel: 'Book Now', ctaHref: '#' },
    ],
    featureGridLabel: content.featureGridLabel || 'Why Choose Us',
    featureGridHeadline: content.featureGridHeadline || 'The Best <span class="accent">Window Furnishings</span> in Perth',
    featureGridSubtitle: content.featureGridSubtitle || 'We\'ve been making curtains and blinds in our own Perth factory since 1974.',
    faq: content.faq || DEFAULT_FAQ,
  }
}
