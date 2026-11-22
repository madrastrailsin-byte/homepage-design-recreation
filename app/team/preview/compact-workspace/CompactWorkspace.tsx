'use client'

import { useState } from 'react'
import CustomerComposer from './CustomerComposer'

type Tab = 'Customer' | 'Package' | 'Itinerary' | 'Share'
const tabs: Tab[] = ['Customer', 'Package', 'Itinerary', 'Share']

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-[105px_minmax(0,1fr)] items-center gap-2 border-b border-[#e6e0d4] px-2 py-1.5 text-xs">
      <span className="text-[#77827c]">{label}</span>
      <span className="truncate font-medium">{value}</span>
    </div>
  )
}

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="min-w-0 rounded-md border border-[#dcd5c7] bg-white">
      <h2 className="border-b border-[#e6e0d4] bg-[#f1ede4] px-3 py-2 text-xs font-semibold uppercase tracking-[0.12em]">
        {title}
      </h2>
      <div className="p-2">{children}</div>
    </section>
  )
}

export default function CompactWorkspace() {
  const [tab, setTab] = useState<Tab>('Customer')
  const next = () => setTab(tabs[Math.min(tabs.indexOf(tab) + 1, 3)])

  return (
    <main className="min-h-[100dvh] bg-[#f6f3eb] px-5 pb-6 pt-3 text-[#173d3e]">
      <div className="mx-auto flex min-h-[calc(100dvh-2.25rem)] max-w-[1440px] flex-col gap-2.5">
        <header className="flex items-center justify-between gap-4 border-b border-[#dcd5c7] pb-3">
          <div>
            <p className="text-[11px] uppercase tracking-[0.2em] text-[#a18453]">
              MadrasTrails · Team Workspace
            </p>
            <h1 className="font-serif text-xl leading-tight">Customer Workspace</h1>
            <p className="text-xs text-[#72817d]">
              DEMO · Sample Customer · Singapore · 5 Nights
            </p>
          </div>
          <span className="rounded border border-[#c8b895] px-3 py-1 text-xs">
            Draft · Visual Preview
          </span>
        </header>

        <nav className="grid grid-cols-4 gap-1" aria-label="Workspace tabs">
          {tabs.map((item, index) => (
            <button
              key={item}
              type="button"
              onClick={() => setTab(item)}
              className={`rounded-xl border px-3 py-2.5 text-left text-[13px] font-semibold transition ${
                tab === item
                  ? 'border-[#173d3e] bg-[#173d3e] text-white'
                  : 'border-[#dcd5c7] bg-white text-[#173d3e]'
              }`}
            >
              <span className="mr-2 opacity-60">0{index + 1}</span>{item}
            </button>
          ))}
        </nav>

        {tab === 'Customer' && <CustomerComposer />}

        {tab === 'Package' && (
          <div className="grid grid-cols-1 gap-3 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <Panel title="Quotation Import">
                <p className="mb-2 text-xs text-[#72817d]">
                  ChatGPT JSON or manual entry. One vendor by default.
                </p>
                <div className="min-h-24 rounded border border-dashed border-[#cbbfa9] bg-[#faf8f3] p-3 text-xs text-[#72817d]">
                  Paste structured quotation JSON here...
                </div>
                <p className="mt-2 text-xs text-[#96794c]">
                  + Add another vendor only when required
                </p>
              </Panel>
            </div>
            <div className="lg:col-span-8">
              <Panel title="Hotel / Package Options">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#f7f4ee] text-[#72817d]">
                      <tr>
                        {['Option', 'Hotel', 'City', 'Nights', 'Final INR'].map(h => (
                          <th key={h} className="px-2 py-2 font-medium">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#eee8dc]">
                      <tr>
                        <td className="px-2 py-2">Option A</td>
                        <td className="px-2 py-2">Hotel A · 4★</td>
                        <td className="px-2 py-2">Singapore</td>
                        <td className="px-2 py-2">5</td>
                        <td className="px-2 py-2">₹ —</td>
                      </tr>
                      <tr>
                        <td className="px-2 py-2">Option B</td>
                        <td className="px-2 py-2">Hotel B · 5★</td>
                        <td className="px-2 py-2">Singapore</td>
                        <td className="px-2 py-2">5</td>
                        <td className="px-2 py-2">₹ —</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </Panel>
            </div>
            <div className="lg:col-span-12">
              <Panel title="Costing & Selling Price">
                <div className="grid grid-cols-2 gap-x-4 lg:grid-cols-4">
                  <Field label="Land" value="Supplier cost" />
                  <Field label="Visa" value="Separate" />
                  <Field label="Insurance" value="Separate" />
                  <Field label="Flights" value="No margin" />
                  <Field label="Currency" value="Editable" />
                  <Field label="FX Rate" value="Editable" />
                  <Field label="Margin" value="Editable %" />
                  <Field label="GST / TCS" value="Editable / applicable" />
                </div>
              </Panel>
            </div>
          </div>
        )}

        {tab === 'Itinerary' && (
          <div className="grid grid-cols-1 gap-3 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <Panel title="Day-wise Itinerary">
                {[
                  ['Day 1', 'Arrival · Hotel transfer · Leisure'],
                  ['Day 2', 'City experience · Attractions'],
                  ['Day 3', 'Signature experience · Leisure'],
                  ['Day 4', 'Optional activities'],
                  ['Day 5', 'Free day · Shopping'],
                  ['Day 6', 'Departure transfer'],
                ].map(([day, activity]) => (
                  <Field key={day} label={day} value={activity} />
                ))}
              </Panel>
            </div>
            <div className="space-y-3 lg:col-span-4">
              <Panel title="Itinerary Details">
                <Field label="Hotels" value="From selected package" />
                <Field label="Photos" value="Replaceable" />
                <Field label="Inclusions" value="Editable" />
                <Field label="Exclusions" value="Editable" />
              </Panel>
              <Panel title="Revisions">
                <Field label="Changes Made" value="Customer-facing notes" />
                <Field label="Review Flags" value="Must resolve" />
              </Panel>
            </div>
          </div>
        )}

        {tab === 'Share' && (
          <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
            <Panel title="Final Review">
              <Field label="Validity" value="Staff editable" />
              <Field label="Per Person" value="₹ —" />
              <Field label="Total Price" value="₹ —" />
              <Field label="Review Flags" value="Resolve before publishing" />
              <Field label="Preview" value="Customer-facing view" />
            </Panel>
            <Panel title="Publish & Manage">
              <Field label="Share URL" value="Stable customer link" />
              <Field label="WhatsApp" value="Assigned consultant" />
              <Field label="PDF" value="Staff-only download" />
              <Field label="Status" value="Draft / Shared / Confirmed" />
              <Field label="Availability" value="Unpublish / Republish" />
            </Panel>
          </div>
        )}

        <footer className="mt-auto flex items-center justify-between border-t border-[#dcd5c7] pb-2 pt-2">
          <p className="text-xs text-[#72817d]">
            Visual prototype only · Sample data · No database changes
          </p>
          <button
            type="button"
            onClick={next}
            disabled={tab === 'Share'}
            className="inline-flex h-9 min-w-[112px] items-center justify-center rounded-lg bg-[#173d3e] px-4 text-[13px] font-medium text-white transition-colors hover:bg-[#245254] disabled:opacity-40"
          >
            Continue
          </button>
        </footer>
      </div>
    </main>
  )
}
