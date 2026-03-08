import type { Metadata } from 'next'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import SupportHubClient from './SupportHubClient'

export const metadata: Metadata = {
  title: 'Support',
  description: 'CurtainWorld support centre — installation guides, product care, warranty info, child safety, motor programming, and more.',
}

export default function SupportPage() {
  return (
    <>
      <Header />
      <SupportHubClient />
      <Footer />
    </>
  )
}
