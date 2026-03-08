import { client } from '@/sanity/lib/client'
import { homepageQuery, siteSettingsQuery, featuredTestimonialsQuery, businessHoursQuery } from '@/sanity/lib/queries'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import ClientEffects from '@/components/ClientEffects'
import Hero from '@/components/sections/Hero'
import Categories from '@/components/sections/Categories'
import Statement from '@/components/sections/Statement'
import Heritage from '@/components/sections/Heritage'
import Process from '@/components/sections/Process'
import Showroom from '@/components/sections/Showroom'
import Testimonials from '@/components/sections/Testimonials'
import Inspiration from '@/components/sections/Inspiration'
import Promo from '@/components/sections/Promo'
import type { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  const homepage = await client.fetch(homepageQuery)
  return {
    title: homepage?.seoTitle || 'CurtainWorld | Perth Curtains, Blinds & Shutters Since 1974',
    description: homepage?.seoDescription || "Perth's leading curtain, blind and shutter company.",
  }
}

export default async function HomePage() {
  const [homepage, settings, testimonials, hours] = await Promise.all([
    client.fetch(homepageQuery),
    client.fetch(siteSettingsQuery),
    client.fetch(featuredTestimonialsQuery),
    client.fetch(businessHoursQuery),
  ])

  return (
    <>
      <ClientEffects />
      <Header transparent />
      <main>
        <Hero data={homepage} cta={settings?.primaryCta} />
        <Categories data={homepage} />
        <Statement data={homepage} />
        <Heritage data={homepage} />
        <Process cta={settings?.primaryCta} />
        <Showroom settings={settings} hours={hours} />
        <Testimonials data={testimonials} />
        <Inspiration />
        <Promo cta={settings?.primaryCta} />
      </main>
      <Footer settings={settings} />
    </>
  )
}
