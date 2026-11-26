import { cookies } from 'next/headers'
import type { Metadata, Viewport } from 'next'
import { Catamaran, Cormorant_Garamond, Satisfy } from 'next/font/google'
import localFont from 'next/font/local'
import './globals.css'
import { ThemeProvider } from '@/components/theme/ThemeProvider'
import { THEME_SWITCHING_ENABLED } from '@/lib/theme-config'

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
  preload: false,
  src: '../public/fonts/CrimesTimesSix.ttf',
  variable: '--font-crimes-times-six',
  display: 'swap',
})

const ruthligos = localFont({
  preload: false,
  src: '../public/fonts/ruthligos.ttf',
  variable: '--font-ruthligos',
  display: 'swap',
})

const amalfiCoast = localFont({
  preload: false,
  src: '../public/fonts/amalfi-coast.ttf',
  variable: '--font-amalfi-coast',
  display: 'swap',
})

const socialImage = {
  url: 'https://www.madrastrails.in/images/madrastrails-og-v4.jpg',
  width: 600,
  height: 315,
  type: 'image/jpeg',
  alt: 'MadrasTrails — Curated journeys for travellers who seek stories, not itineraries.',
}

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
    images: [socialImage],
    locale: 'en_US',
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'MadrasTrails — Beyond Boundaries',
    description:
      'Curated global journeys, crafted personally. Travel like a local with MadrasTrails.',
    images: [socialImage],
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

export default async function RootLayout({

  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const cookieStore = THEME_SWITCHING_ENABLED ? await cookies() : null
const storedTheme = cookieStore?.get('madrastrails-theme')?.value

const initialTheme =
  THEME_SWITCHING_ENABLED && storedTheme === 'classic' ? 'classic' : 'signature'
  return (
  <html
    lang="en"
    data-theme={initialTheme}
    suppressHydrationWarning
    className={`${catamaran.variable} ${cormorantGaramond.variable} ${signature.variable} ${crimesTimesSix.variable} ${ruthligos.variable} ${amalfiCoast.variable} min-h-full w-full max-w-none overflow-x-hidden rounded-none border-0 bg-[#071B24] shadow-none`}
  >
  <body>
    <ThemeProvider initialTheme={initialTheme}>
  {children}
</ThemeProvider>
  </body>
</html>
)
}
