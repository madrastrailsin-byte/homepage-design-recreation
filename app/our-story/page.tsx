import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import OurStoryPage from '@/components/OurStoryPage'

export default function OurStory() {
  return (
    <main className="min-h-screen w-full max-w-none overflow-x-hidden rounded-none border-0 bg-[#03191D] p-0 m-0 shadow-none">
      <Navigation />
      <OurStoryPage />
      <Footer />
    </main>
  )
}
