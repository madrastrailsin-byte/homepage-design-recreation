import { notFound } from 'next/navigation'
import DemoDashboardContent from './DemoDashboardContent'

const queries = [
  { ref: 'MT-2027-0001', client: 'Sample Client A', destination: 'Singapore & Malaysia', owner: 'sree', status: 'Draft' },
  { ref: 'MT-2027-0002', client: 'Sample Client B', destination: 'Japan', owner: 'subi', status: 'Shared' },
  { ref: 'MT-2027-0003', client: 'Sample Client C', destination: 'Switzerland', owner: 'admin', status: 'Confirmed' },
]

export default function DashboardPreview() {
  if (process.env.NODE_ENV !== 'development') notFound()

  return (
    <main className="flex min-h-screen bg-[#f6f3eb] text-[#173d3e]">
      <aside className="w-64 shrink-0 bg-[#103638] p-8 text-[#f7f1e4]">
        <p className="text-xs tracking-[0.25em] text-[#d5b780]">MADRASTRAILS</p>
        <h1 className="mt-3 font-serif text-3xl">Team Dashboard</h1>
        <div className="mt-12 space-y-7 text-sm">
          <p className="rounded-lg bg-white/10 px-4 py-3">Overview</p>
          <p className="px-4">Customer Queries</p>
          <p className="px-4">Itineraries</p>
          <p className="px-4">Pricing Calculator</p>
          <p className="px-4">Team Management</p>
        </div>
        <p className="mt-20 text-xs text-white/50">Private Workspace</p>
      </aside>

      <section className="min-w-0 flex-1 p-10">
        <header className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-[#a18453]">
              Private Workspace
            </p>
            <h2 className="mt-2 font-serif text-4xl">Welcome to MadrasTrails</h2>
            <p className="mt-2 text-sm text-[#657575]">
              Your journeys, enquiries and itineraries in one place.
            </p>
          </div>
          <span className="rounded-full border border-[#c9b58d] px-4 py-2 text-xs">
            Design Preview
          </span>
        </header>

        <DemoDashboardContent />
      </section>
    </main>
  )
}
