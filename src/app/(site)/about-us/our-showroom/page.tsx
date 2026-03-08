import type { Metadata } from 'next'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import ShowroomClient from './ShowroomClient'

export const metadata: Metadata = {
  title: 'Visit Our Showroom',
  description: 'Visit the CurtainWorld showroom in Malaga, Perth. See our full range of curtains, blinds, shutters, and outdoor products in person.',
}

export default function ShowroomPage() {
  return (
    <>
      <Header />
      <ShowroomClient />
      <Footer />
    </>
  )
}
