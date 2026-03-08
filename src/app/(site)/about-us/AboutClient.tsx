'use client'

import { useConsultation } from '@/components/ConsultationContext'
import PageHero from '@/components/sections/PageHero'
import TrustBar from '@/components/sections/TrustBar'
import ImageTextSplit from '@/components/sections/ImageTextSplit'
import FeatureGrid from '@/components/sections/FeatureGrid'
import CTABanner from '@/components/sections/CTABanner'

export default function AboutClient() {
  const { open: openConsultation } = useConsultation()

  return (
    <main>
      <PageHero
        title="Beautiful Curtains, Blinds & Shutters Since 1974"
        subtitle="Family-owned, locally manufactured, and trusted by thousands of Perth homes for over 50 years."
        backgroundImage="/images/mobile-showroom.jpg"
      />

      <TrustBar />

      <ImageTextSplit
        image="/images/measure.jpg"
        label="Our Story"
        headline="Over 50 Years of <span class='accent'>Perth</span> Heritage"
        body="CurtainWorld has been a part of Perth's story since 1974. What started as a small family business has grown into one of Western Australia's most trusted window furnishing companies. Through five decades, our commitment to quality craftsmanship and personal service has never wavered. We still make every product right here in our Malaga factory, using the same care and attention to detail that built our reputation."
        cta={{ label: 'Visit Our Showroom', href: '/about-us/our-showroom/' }}
      />

      <ImageTextSplit
        image="/images/showroom.jpg"
        label="Our Factory"
        headline="Made in <span class='accent'>Malaga</span>, Made for Perth"
        body="Every curtain, blind, and shutter we sell is manufactured in our own factory in Malaga. No middlemen, no imports — just quality craftsmanship from our team to your home. This means faster turnaround, better quality control, and the ability to truly customise every order to your exact specifications. When you buy from CurtainWorld, you're supporting local manufacturing and local jobs."
        reversed
      />

      <FeatureGrid
        label="Why CurtainWorld"
        headline="What Sets Us <span class='accent'>Apart</span>"
        subtitle="We've been doing this for over 50 years. Here's why Perth trusts us."
        features={[
          { icon: '🏭', title: 'Locally Manufactured', description: 'Every product made in our Malaga factory — supporting WA jobs and ensuring quality.' },
          { icon: '📐', title: 'Free Measure & Quote', description: 'Our expert consultants come to your home — no obligation, no pressure, no cost.' },
          { icon: '🎨', title: 'Biggest Range in Perth', description: 'Hundreds of fabrics, colours and styles. If we don\'t have it, it probably doesn\'t exist.' },
          { icon: '💰', title: 'Factory Direct Pricing', description: 'No middlemen means you get better quality at better prices. Simple as that.' },
          { icon: '🔧', title: 'Professional Installation', description: 'Our trained installers handle everything, ensuring a perfect finish every time.' },
          { icon: '⭐', title: '50+ Years Experience', description: 'Five decades of making Perth homes beautiful. That\'s a lot of windows.' },
        ]}
      />

      <ImageTextSplit
        image="/images/inspiration.jpg"
        label="Our People"
        headline="A Team That <span class='accent'>Cares</span>"
        body="From our factory floor to your front door, every member of the CurtainWorld team takes pride in what they do. Our consultants aren't salespeople — they're experienced designers who genuinely love helping people transform their homes. Our installers are craftspeople who won't leave until the job is perfect. And our factory team? They've been making curtains and blinds so long, they could do it with their eyes closed (but they don't)."
        cta={{ label: 'Contact Our Team', href: '/contact/' }}
      />

      <CTABanner
        headline="Ready to Transform <span class='accent'>Your Home</span>?"
        subtitle="Book your free in-home consultation and let our experts help you find the perfect window furnishings."
        primaryCTA={{ label: 'Book Free Consultation', onClick: openConsultation }}
        secondaryCTA={{ label: 'Call 08 9249 4800', href: 'tel:+61892494800' }}
      />
    </main>
  )
}
