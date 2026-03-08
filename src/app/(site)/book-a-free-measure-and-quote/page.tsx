import type { Metadata } from 'next'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import BookingPageClient from './BookingPageClient'

export const metadata: Metadata = {
  title: 'Book a Free Measure & Quote',
  description: 'Book your free in-home measure and quote with CurtainWorld. Our expert consultants bring fabric samples to your home — no obligation.',
}

export default function BookingPage() {
  return (
    <>
      <Header />
      <BookingPageClient />
      <Footer />
    </>
  )
}
