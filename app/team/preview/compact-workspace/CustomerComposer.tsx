'use client'

import { useState } from 'react'
import type { KeyboardEvent, ReactNode } from 'react'

const countryCodes = `AD AE AF AG AI AL AM AO AQ AR AS AT AU AW AX AZ BA BB BD BE BF BG BH BI BJ BL BM BN BO BQ BR BS BT BV BW BY BZ CA CC CD CF CG CH CI CK CL CM CN CO CR CU CV CW CX CY CZ DE DJ DK DM DO DZ EC EE EG EH ER ES ET FI FJ FK FM FO FR GA GB GD GE GF GG GH GI GL GM GN GP GQ GR GS GT GU GW GY HK HM HN HR HT HU ID IE IL IM IN IO IQ IR IS IT JE JM JO JP KE KG KH KI KM KN KP KR KW KY KZ LA LB LC LI LK LR LS LT LU LV LY MA MC MD ME MF MG MH MK ML MM MN MO MP MQ MR MS MT MU MV MW MX MY MZ NA NC NE NF NG NI NL NO NP NR NU NZ OM PA PE PF PG PH PK PL PM PN PR PS PT PW PY QA RE RO RS RU RW SA SB SC SD SE SG SH SI SJ SK SL SM SN SO SR SS ST SV SX SY SZ TC TD TF TG TH TJ TK TL TM TN TO TR TT TV TW TZ UA UG UM US UY UZ VA VC VE VG VI VN VU WF WS YE YT ZA ZM ZW XK`

const regionNames = new Intl.DisplayNames(['en'], { type: 'region' })
const countries = [...new Set(
  countryCodes.split(' ').map(code => regionNames.of(code) || code)
)].sort((a, b) => a.localeCompare(b))

const inputStyle =
  'h-11 w-full min-w-0 rounded-xl border border-[#dedfd8] bg-[#fbfcfa] px-2.5 text-[13px] text-[#173d3e] outline-none transition focus:border-[#ad9467] focus:bg-white focus:ring-2 focus:ring-[#ad9467]/15'

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block min-w-0">
      <span className="mb-1 block text-xs text-[#697b78]">{label}</span>
      {children}
    </label>
  )
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="min-w-0 rounded-xl border border-[#ded9ce] bg-white p-4">
      <h2 className="mb-3 border-b border-[#eee9df] pb-2 text-[13px] font-semibold text-[#173d3e]">
        {title}
      </h2>
      {children}
    </section>
  )
}

function toISO(value: string) {
  const match = /^(\\d{2})-(\\d{2})-(\\d{4})$/.exec(value)
  if (!match) return ''
  const [, day, month, year] = match
  const date = new Date(`${year}-${month}-${day}T12:00:00Z`)
  if (
    Number(year) < 1900 ||
    Number(year) > 2100 ||
    Number.isNaN(date.getTime()) ||
    date.getUTCDate() !== Number(day) ||
    date.getUTCMonth() + 1 !== Number(month) ||
    date.getUTCFullYear() !== Number(year)
  ) return ''
  return `${year}-${month}-${day}`
}

export default function CustomerComposer() {
  const [name, setName] = useState('Sample Customer')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [destinations, setDestinations] = useState(['Singapore'])
  const [countryInput, setCountryInput] = useState('')
  const [countryError, setCountryError] = useState('')
  const [travelDate, setTravelDate] = useState('')
  const [departureCity, setDepartureCity] = useState('')
  const [days, setDays] = useState('6')
  const [hotel, setHotel] = useState('4')
  const [adults, setAdults] = useState(2)
  const [children, setChildren] = useState(1)
  const [infants, setInfants] = useState(0)
  const [seniors, setSeniors] = useState(0)
  const [childAges, setChildAges] = useState<number[]>([8])
  const [notes, setNotes] = useState('')

  function addCountry() {
    const match = countries.find(
      item => item.toLowerCase() === countryInput.trim().toLowerCase()
    )
    if (!match) {
      setCountryError('Select a country from the suggestions.')
      return false
    }
    if (destinations.includes(match)) {
      setCountryError('This destination is already selected.')
      return false
    }
    if (destinations.length >= 3) {
      setCountryError('Maximum three destinations.')
      return false
    }
    setDestinations(previous => [...previous, match])
    setCountryInput('')
    setCountryError('')
    return true
  }

  function updateChildren(value: string) {
    const count = Math.max(0, Math.min(30, Number(value) || 0))
    setChildren(count)
    setChildAges(previous =>
      Array.from({ length: count }, (_, index) => previous[index] ?? 2)
    )
  }

  function handleEnter(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key !== 'Enter' || event.nativeEvent.isComposing) return
    const target = event.target
    if (!(target instanceof HTMLInputElement) || target.type === 'date') return

    event.preventDefault()
    if (target.name === 'country' && !addCountry()) return

    const fields = Array.from(
      event.currentTarget.querySelectorAll<HTMLElement>('[data-entry-field]')
    )
    const index = fields.indexOf(target)
    fields[index + 1]?.focus()
  }

  const travellerTotal = adults + children + infants + seniors

  return (
    <div className="flex flex-1 flex-col gap-3" onKeyDown={handleEnter}>
      <div className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-[#dcd5c7] bg-white px-4 py-2">
        <div>
          <p className="text-[11px] uppercase tracking-[0.15em] text-[#a18453]">
            Customer Journey
          </p>
          <h2 className="font-serif text-lg leading-tight">
            {name.trim() || 'New Customer'}
          </h2>
          <p className="text-xs text-[#788580]">
            {destinations.join(' · ') || 'No destination selected'}
            {' · '}{travellerTotal} travellers
          </p>
        </div>
        <span className="rounded-full border border-[#dcd5c7] px-3 py-1 text-xs">
          Draft
        </span>
      </div>

      <div className="grid flex-1 gap-3 xl:grid-cols-3">
        <Section title="Customer Details">
          <div className="space-y-2">
            <Field label="Customer name">
              <input data-entry-field className={inputStyle}
                value={name} onChange={e => setName(e.target.value)}
                placeholder="Full name" />
            </Field>
            <Field label="Mobile number">
              <div className="flex h-11 items-center rounded-xl border border-[#dedfd8] bg-[#fbfcfa] focus-within:border-[#ad9467] focus-within:ring-2 focus-within:ring-[#ad9467]/15">
                <span className="border-r border-[#dedfd8] px-2.5 text-xs font-medium">+91</span>
                <input data-entry-field type="tel" inputMode="numeric"
                  autoComplete="tel-national" maxLength={11}
                  className="h-full min-w-0 flex-1 bg-transparent px-2.5 text-[13px] outline-none"
                  placeholder="XXXXX XXXXX"
                  value={phone.replace(/(\\d{5})(?=\\d)/, '$1 ')}
                  onChange={e => setPhone(e.target.value.replace(/\\D/g, '').slice(0, 10))}
                />
              </div>
              {phone.length > 0 && phone.length !== 10 && (
                <span className="mt-1 block text-[11px] text-[#9b6546]">
                  Enter exactly 10 digits.
                </span>
              )}
            </Field>
            <Field label="Email address (optional)">
              <input data-entry-field type="email" className={inputStyle}
                value={email} onChange={e => setEmail(e.target.value)}
                placeholder="name@example.com" />
            </Field>
          </div>
        </Section>

        <Section title="Journey Details">
          <div className="space-y-2">
            <div>
              <p className="mb-1 text-xs text-[#697b78]">
                Destinations ({destinations.length}/3)
              </p>
              <div className="flex flex-wrap gap-1">
                {destinations.map(country => (
                  <span key={country}
                    className="flex items-center gap-2 rounded-lg bg-[#eef2ee] px-2.5 py-1 text-xs">
                    {country}
                    <button type="button" className="text-[#947c55] underline"
                      onClick={() => setDestinations(previous =>
                        previous.filter(item => item !== country)
                      )}>
                      Remove
                    </button>
                  </span>
                ))}
              </div>
              {destinations.length < 3 && (
                <div className="mt-1.5 flex items-center gap-2">
                  <input data-entry-field name="country"
                    list="mt-countries" className={`${inputStyle} !h-9 flex-1`}
                    value={countryInput}
                    onChange={e => {
                      setCountryInput(e.target.value)
                      setCountryError('')
                    }}
                    placeholder="Type or select a country" />
                  <button type="button" onClick={addCountry}
                    className="inline-flex h-9 min-w-[66px] shrink-0 items-center justify-center rounded-lg bg-[#173d3e] px-3 text-[13px] font-medium text-white transition-colors hover:bg-[#245254]">
                    Add
                  </button>
                  <datalist id="mt-countries">
                    {countries.filter(item => !destinations.includes(item)).map(item => (
                      <option key={item} value={item} />
                    ))}
                  </datalist>
                </div>
              )}
              {countryError && (
                <p className="mt-1 text-[11px] text-[#9b6546]">{countryError}</p>
              )}
            </div>
            <div className="grid grid-cols-2 gap-2">
              <Field label="Travel date">
                <input data-entry-field type="date" lang="en-GB"
                  aria-label="Travel date"
                  className={inputStyle}
                  value={toISO(travelDate)}
                  onChange={e => {
                    const [year, month, day] = e.target.value.split('-')
                    setTravelDate(e.target.value
                      ? `${day}-${month}-${year}` : '')
                  }}
                />
              </Field>
              <Field label="Departure city (optional)">
                <input data-entry-field type="text"
                  className={inputStyle}
                  value={departureCity}
                  onChange={e => setDepartureCity(e.target.value)}
                  placeholder="e.g. Chennai"
                />
              </Field>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <Field label="Number of days">
                <input data-entry-field type="number" min="1"
                  className={inputStyle} value={days}
                  onChange={e => setDays(e.target.value)} />
              </Field>
              <Field label="Hotel preference">
                <select data-entry-field className={inputStyle}
                  value={hotel} onChange={e => setHotel(e.target.value)}>
                  <option value="">Not specified</option>
                  <option value="3">3 Star</option>
                  <option value="4">4 Star</option>
                  <option value="5">5 Star</option>
                </select>
              </Field>
            </div>
          </div>
        </Section>

        <Section title="Travellers">
          <div className="grid grid-cols-2 gap-2">
            {([
              ['Adults (12–59)', adults, setAdults],
              ['Children (2–11)', children, null],
              ['Infants (under 2)', infants, setInfants],
              ['Seniors (60+)', seniors, setSeniors],
            ] as const).map(([label, value, setter]) => (
              <Field key={label} label={label}>
                <input data-entry-field type="number" min="0" max="30"
                  className={inputStyle} value={value}
                  onChange={e => setter
                    ? setter(Math.max(0, Math.min(30, Number(e.target.value) || 0)))
                    : updateChildren(e.target.value)}
                />
              </Field>
            ))}
          </div>
          {children > 0 && (
            <div className="mt-3 border-t border-[#eee9df] pt-2">
              <p className="mb-2 text-xs text-[#697b78]">
                Children's ages
              </p>
              <div className="grid grid-cols-3 gap-2">
                {childAges.map((age, index) => (
                  <Field key={index} label={`Child ${index + 1}`}>
                    <input data-entry-field type="number" min="2" max="11"
                      className={inputStyle} value={age}
                      onChange={e => setChildAges(previous =>
                        previous.map((item, i) =>
                          i === index ? Number(e.target.value) : item
                        )
                      )} />
                  </Field>
                ))}
              </div>
            </div>
          )}
          <div className="mt-3 border-t border-[#eee9df] pt-2">
            <Field label="Special requests (optional)">
              <input data-entry-field type="text"
                className={inputStyle}
                value={notes}
                onChange={e => setNotes(e.target.value)}
                placeholder="Celebrations, room preferences, special needs..."
              />
            </Field>
          </div>
        </Section>
      </div>

    </div>
  )
}
