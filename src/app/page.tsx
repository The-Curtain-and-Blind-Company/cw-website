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

export default function HomePage() {
  return (
    <>
      <ClientEffects />
      <Header />
      <main>
        <Hero />
        <Categories />
        <Statement />
        <Heritage />
        <Process />
        <Showroom />
        <Testimonials />
        <Inspiration />
        <Promo />
      </main>
      <Footer />
    </>
  )
}
