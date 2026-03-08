import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import ContactPageClient from './ContactPageClient'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact Us | CurtainWorld Perth',
  description: 'Get in touch with CurtainWorld. Visit our Malaga showroom, call 08 9249 4800, or send us a message online.',
}

export default function ContactPage() {
  return (
    <>
      <Header />
      <ContactPageClient />
      <Footer />
    </>
  )
}
