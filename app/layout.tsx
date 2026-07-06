import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Catamaran, Dancing_Script, Fraunces } from 'next/font/google'
import './globals.css'

const catamaran = Catamaran({
  variable: '--font-catamaran',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
})

const fraunces = Fraunces({
  variable: '--font-fraunces',
  subsets: ['latin'],
  weight: ['600', '700'],
  display: 'swap',
})

const dancingScript = Dancing_Script({
  variable: '--font-signature',
  subsets: ['latin'],
  weight: ['400', '500'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'MadrasTrails - Beyond Boundaries',
  description: 'Curated global journeys, crafted personally. Travel like a local with MadrasTrails.',
  generator: 'v0.app',
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
    <html lang="en" className={`${catamaran.variable} ${fraunces.variable} ${dancingScript.variable} bg-[#0D1117]`}>
      <body className="font-sans antialiased bg-[#0D1117]">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
