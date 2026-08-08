import { Analytics } from '@Vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Catamaran, Cormorant_Garamond, Satisfy } from 'next/font/google'
import localFont from 'next/font/local'
import './globals.css'
import { organizationSchema } from './schema'
import { ThemeProvider } from '@/components/theme/ThemeProvider'

const catamaran = Catamaran({
  variable: '--font-catamaran',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
})

const cormorantGaramond = Cormorant_Garamond({
  variable: '--font-cormorant-garamond',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
})

const signature = Satisfy({
  variable: '--font-signature',
  subsets: ['latin'],
  weight: ['400'],
  display: 'swap',
})

const crimesTimesSix = localFont({
  src: '../public/fonts/CrimesTimesSix.ttf',
  variable: '--font-crimes-times-six',
  display: 'swap',
})

const ruthligos = localFont({
  src: '../public/fonts/ruthligos.ttf',
  variable: '--font-ruthligos',
  display: 'swap',
})

const amalfiCoast = localFont({
  src: '../public/fonts/amalfi-coast.ttf',
  variable: '--font-amalfi-coast',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://www.madrastrails.in'),

  alternates: {
    canonical: 'https://www.madrastrails.in',
  },
  title: {
    default: 'MadrasTrails — Beyond Boundaries',
    template: '%s | MadrasTrails',
  },

  description:
    'Curated global journeys, crafted personally. Travel like a local with MadrasTrails.',

  applicationName: 'MadrasTrails',

  openGraph: {
    title: 'MadrasTrails — Beyond Boundaries',
    description:
      'Curated global journeys, crafted personally. Travel like a local with MadrasTrails.',
    url: '/',
    siteName: 'MadrasTrails',
    images: [
  {
    url: 'https://www.madrastrails.in/images/madrastrails-og-v3.jpg',
    width: 1200,
    height: 630,
    alt: 'MadrasTrails — Curated journeys for travellers who seek stories, not itineraries.',
  },
],
    locale: 'en_US',
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'MadrasTrails — Beyond Boundaries',
    description:
      'Curated global journeys, crafted personally. Travel like a local with MadrasTrails.',
    images: [
  'https://www.madrastrails.in/images/madrastrails-og-v3.jpg',
],
  },

  icons: {
    icon: [
      { url: '/icon.png', type: 'image/png' },
      { url: '/favicon.ico' },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#0D4C5C',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
  <html
  lang="en"
  className={`${catamaran.variable} ${cormorantGaramond.variable} ${signature.variable} ${crimesTimesSix.variable} ${ruthligos.variable} ${amalfiCoast.variable} min-h-full w-full max-w-none overflow-x-hidden rounded-none border-0 bg-[#071B24] shadow-none`}
>
  <body>
    <ThemeProvider>
      {children}
    </ThemeProvider>
  </body>
</html>
)
}
