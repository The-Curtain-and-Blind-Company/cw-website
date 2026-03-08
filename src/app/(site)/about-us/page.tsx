import type { Metadata } from 'next'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import AboutClient from './AboutClient'

export const metadata: Metadata = {
  title: 'About Us — Since 1974',
  description: 'CurtainWorld has been making beautiful curtains, blinds, and shutters in Perth since 1974. Family-owned, locally manufactured, and trusted by thousands of Perth homes.',
}

export default function AboutPage() {
  return (
    <>
      <Header />
      <AboutClient />
      <Footer />
    </>
  )
}
