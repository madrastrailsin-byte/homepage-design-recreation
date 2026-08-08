import type { Metadata } from 'next'
import ContactHero from "@/components/contact/ContactHero";

export const metadata: Metadata = {
  title: 'Contact MadrasTrails | Plan Your Luxury Journey',
  description:
    'Get in touch with MadrasTrails to create a personalised luxury journey. Share your travel dreams and let our experts craft your next unforgettable experience.',
}

export default function ContactPage() {
  return <ContactHero />;
}