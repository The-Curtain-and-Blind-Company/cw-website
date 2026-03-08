import type { Metadata } from 'next'
import { Playfair_Display, DM_Sans } from 'next/font/google'
import { ConsultationProvider } from '@/components/ConsultationContext'
import './globals.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'CurtainWorld | Perth Curtains, Blinds & Shutters Since 1974',
    template: '%s | CurtainWorld',
  },
  description: "Perth's leading curtain, blind and shutter company. Family-owned since 1974. Free in-home measure & quote. Visit our Malaga showroom or book online.",
  metadataBase: new URL('https://curtainworld.com.au'),
  openGraph: {
    type: 'website',
    locale: 'en_AU',
    siteName: 'CurtainWorld',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${dmSans.variable}`}>
      <body>
        <ConsultationProvider>{children}</ConsultationProvider>
      </body>
    </html>
  )
}
