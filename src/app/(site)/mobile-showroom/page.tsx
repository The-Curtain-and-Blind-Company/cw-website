import { client } from '@/sanity/lib/client'
import { suburbsQuery } from '@/sanity/lib/queries'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import MobileShowroomClient from './MobileShowroomClient'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Mobile Showroom | CurtainWorld Comes to You',
  description: "Can't visit our showroom? We'll come to you. Free in-home consultations across Perth metro and surrounds.",
}

export default async function MobileShowroomPage() {
  const suburbs = await client.fetch(suburbsQuery)

  return (
    <>
      <Header />
      <MobileShowroomClient suburbs={suburbs || []} />
      <Footer />
    </>
  )
}
