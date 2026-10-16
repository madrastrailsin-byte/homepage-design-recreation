import { additionalVisaAliases, additionalVisaDestinations } from './visa-expansion'

export const visaCategories = ['Schengen', 'UK', 'Asia', 'Other Countries'] as const
export type VisaCategory = typeof visaCategories[number]
export type VisaSource = { label: string; url: string }
export type VisaGuidance = {
  verifiedOn: string
  overview: string
  scope?: string
  visaTypes: string[]
  eligibility: string[]
  documents: string[]
  processing: string[]
  validity: string[]
  steps: string[]
  requirements: string[]
  faqs: { question: string; answer: string }[]
  gaps?: Partial<Record<'visaTypes' | 'documents' | 'processing' | 'validity' | 'steps' | 'requirements' | 'faqs', string>>
  sources: VisaSource[]
}
export type VisaDestination = {
  id: string
  name: string
  category: VisaCategory
  reference?: VisaSource
  guidance?: VisaGuidance
}

const schengenReference = {
  label: 'European Commission · Schengen overview',
  url: 'https://home-affairs.ec.europa.eu/policies/schengen/visa-policy/applying-schengen-visa_en',
}

// A reference link does not mean that country-specific guidance has been reviewed.
export const visaDestinations: VisaDestination[] = [
  ...['Austria', 'France', 'Germany', 'Greece', 'Italy', 'Netherlands', 'Spain', 'Switzerland'].map(name => ({
    id: name.toLowerCase(), name, category: 'Schengen' as const, reference: schengenReference,
  })),
  { id: 'united-kingdom', name: 'United Kingdom', category: 'UK', reference: { label: 'GOV.UK · Visitor guidance', url: 'https://www.gov.uk/standard-visitor' } },
  { id: 'singapore', name: 'Singapore', category: 'Asia', reference: { label: 'Singapore Government · Visa information', url: 'https://chennai.mfa.gov.sg/consular-services/visa-information/' } },
  { id: 'japan', name: 'Japan', category: 'Asia', reference: { label: 'Japan Ministry of Foreign Affairs · Visas', url: 'https://www.mofa.go.jp/j_info/visit/visa/index.html' } },
  { id: 'thailand', name: 'Thailand', category: 'Asia', reference: { label: 'Thailand Ministry of Foreign Affairs · eVisa', url: 'https://www.thaievisa.go.th/' } },
  { id: 'australia', name: 'Australia', category: 'Other Countries', reference: { label: 'Australian Home Affairs · Visa finder', url: 'https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-finder/visit' } },
  ...additionalVisaDestinations,
]

const destinationAliases: Record<string, string[]> = {
  ...additionalVisaAliases,
  austria: ['Vienna', 'Wien', 'Salzburg', 'Innsbruck', 'Österreich'],
  france: ['Paris', 'Nice', 'Lyon'],
  germany: ['Berlin', 'Munich', 'München', 'Frankfurt', 'Deutschland'],
  greece: ['Athens', 'Santorini', 'Mykonos'],
  italy: ['Rome', 'Roma', 'Venice', 'Venezia', 'Florence', 'Firenze', 'Milan', 'Milano', 'Italia'],
  netherlands: ['Amsterdam', 'Holland'],
  spain: ['Madrid', 'Barcelona', 'España'],
  switzerland: ['Zurich', 'Zürich', 'Geneva', 'Interlaken', 'Lucerne', 'Schweiz'],
  'united-kingdom': ['UK', 'U.K.', 'Britain', 'Great Britain', 'England', 'Scotland', 'Wales', 'Northern Ireland', 'London', 'Edinburgh'],
  singapore: ['Singapore City'],
  japan: ['Tokyo', 'Kyoto', 'Osaka'],
  thailand: ['Bangkok', 'Phuket', 'Pattaya', 'Chiang Mai'],
  australia: ['Sydney', 'Melbourne', 'Brisbane', 'Perth'],
}

function normalizeSearch(value: string) {
  return value.normalize('NFD').replace(/\p{M}/gu, '').toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, ' ').trim().replace(/\s+/g, ' ')
}

export function searchVisaDestinations(query: string) {
  const normalized = normalizeSearch(query)
  const matches = (names: string[]) => names.some(name => {
    const candidate = normalizeSearch(name)
    // Short abbreviations should match a word prefix, not the middle of a city.
    return candidate === normalized || (normalized.length <= 3
      ? candidate.split(' ').some(word => word.startsWith(normalized))
      : candidate.includes(normalized))
  })
  const destinations = visaDestinations.filter(destination => matches([
    destination.name, ...(destinationAliases[destination.id] ?? []),
  ])).sort((a, b) => a.name.localeCompare(b.name))
  return { destinations }
}

// Editorial review performed on 2026-10-16. These dates record actual source
// checks, not page visits. Gaps are deliberately retained where sources could
// not establish a complete India-specific checklist or a current timeline.
const reviewedOn = '2026-10-16'
const euSource: VisaSource = { label: 'European Commission · Short-stay guidance', url: schengenReference.url }
const netherlandsSource: VisaSource = { label: 'Netherlands Government · Applying in India', url: 'https://www.netherlandsworldwide.nl/visa-the-netherlands/schengen-visa/apply-india' }
const austriaSource: VisaSource = { label: 'Austrian Foreign Ministry · Visa rules', url: 'https://www.bmeia.gv.at/en/travel-stay/entrance-and-residence-in-austria/visa/' }

// The eight partial guides were checked again on 2026-10-16. Their existing
// verification date is already that date; unrelated records retain their dates.
// Conflicting or personalised requirements remain explicitly marked as gaps.

// Shared Schengen rules are sourced separately from each national application
// route. They do not imply that national document checklists are interchangeable.
const schengenCore = {
  visaTypes: ['Short-stay Schengen visa (type C) for tourism. National long-stay and airport-transit routes are outside this tourism guide.'],
  eligibility: ['Apply through your main destination; for equal stays, use the first country of entry. Apply in your country of legal residence.'],
  documents: ['Passport, application form, compliant photo and medical insurance.', 'Evidence of itinerary, accommodation, funding and intention to return. Additional documents may be requested.'],
  processing: ['The EU publishes 15 days as the normal decision period, potentially extending to 45. Appointment and transport time are additional.'],
  validity: ['Validity: follow the dates printed on your issued visa.', 'Stay: no more than the authorised days and 90 days in any 180 across Schengen.', 'Entries: follow the single/multiple entry permission granted; a long validity does not allow continuous residence.'],
  steps: ['Identify the responsible country and consular jurisdiction.', 'Complete its form and tourism checklist.', 'Book the designated submission appointment; supply biometrics where required.', 'After the decision, check the visa dates, entry permission and authorised stay.'],
  requirements: ['Passport generally needs 3 months of validity after departure. Check national checklist requirements.', 'Show credible tourism plans, funding and return intentions; approval is assessed individually.'],
  faqs: [
    { question: 'When should I start?', answer: 'EU guidance permits lodging up to 6 months before travel. Allow enough time for an appointment and processing; national submission instructions may differ.' },
    { question: 'Does a multiple-entry visa reset my stay allowance?', answer: 'No. Stay limits apply across the Schengen area, not separately to each country.' },
  ],
}

const schengenCountries: Record<string, { source: VisaSource; overview: string; steps?: string[]; documents?: string[]; processing?: string[]; requirements?: string[]; gap?: string; processingGap?: string; extraSources?: VisaSource[] }> = {
  austria: {
    source: austriaSource,
    overview: 'Austria uses the Schengen C route for tourism without employment.',
    documents: ['Completed, signed application in English or German and one compliant photograph.', 'Passport issued within 10 years, with two blank pages and validity extending 3 months beyond departure; copies of data and previous visa pages, plus previous passports or proof of loss.', 'Round-trip and onward travel reservations, accommodation or tour confirmation, and Schengen medical insurance.', 'Employed applicants: 3 months of salary certificates, employment contract and employer leave approval. Self-employed applicants: business registration evidence. Students: enrolment proof. Retirees: pension or regular-income evidence.', 'Original bank statements for 3 months and income-tax returns with barcode for 3 years.', 'For minors travelling with one parent or alone: the applicable notarised parental consent and parent identity copies.', 'Current contact details; follow the embassy checklist for circumstances requiring further evidence.'],
    steps: ['Prepare the Austrian Embassy New Delhi tourism checklist and signed application.', 'Arrange submission through the designated VFS Austrian desk; allow time before travel.', 'Submit the documents and provide biometrics where required; the embassy may request an interview or further evidence.', 'Await the decision and check visa dates, entries and permitted stay.'],
    processingGap: 'The embassy-hosted November 2024 checklist uses timing and extension wording that differs from current EU guidance. A reconciled current India-specific turnaround is not yet verified; the EU decision period below is not an end-to-end promise.',
    extraSources: [{ label: 'Austrian Embassy New Delhi · Tourism checklist (November 2024 PDF)', url: 'https://www.bmeia.gv.at/fileadmin/user_upload/Vertretungen/New_Delhi/Dokumente/Tourism_Checklist_2024.pdf' }],
  },
  france: {
    source: { label: 'France-Visas · India applications', url: 'https://www.france-visas.gouv.fr/en/inde' },
    overview: 'This guide covers metropolitan France. French overseas destinations can have different entry rules.',
    documents: [...schengenCore.documents, 'Use the personalised France-Visas assistant list for an Indian national residing in India; required supporting evidence depends on your situation.', 'Show resources for the intended stay and return journey. Tourism visits require valid travel medical insurance.', 'Print the completed application and registration receipt, and take the supporting documents requested by your application.'],
    steps: ['Use the France-Visas assistant for your nationality, residence and tourism itinerary.', 'Complete the France-Visas application and its personalised supporting-document list.', 'Book the designated India submission appointment. A French consulate or embassy decides the application.', 'Check the issued visa before travelling.'],
    gap: 'The official assistant produces a personalised document list. A complete India-specific pack for every employment, sponsorship and family situation has not been verified here; follow your generated checklist.',
    extraSources: [{ label: 'France-Visas · Short tourist stays', url: 'https://www.france-visas.gouv.fr/en/web/france-visas/sejour-touristique-de-moins-de-3-mois' }, { label: 'France-Visas · Application steps', url: 'https://www.france-visas.gouv.fr/en/web/france-visas' }, { label: 'France-Visas · FAQs', url: 'https://www.france-visas.gouv.fr/en/faq' }],
  },
  germany: {
    source: { label: 'German Missions in India · Tourism checklist', url: 'https://india.diplo.de/in-en/2674158-2674158' },
    overview: 'Germany publishes a tourism checklist with separate evidence for employment, sponsorship and minors.',
    documents: ['Printed, signed VIDEX application including barcodes, and both required declarations.', 'Passport and biodata/address copies, compliant biometric photo, covering letter and itinerary.', 'Accommodation for the itinerary, flight reservation and Schengen travel medical insurance from an accepted insurer.', 'Financial and occupational evidence appropriate to your circumstances, plus civil-status documents where applicable.', 'For employed applicants: 3 months of payslips and bank statements, employment contract, approved leave, and the specified tax evidence.', 'Sponsored trips and minors need the additional checklist evidence; sponsorship does not replace the applicant’s economic-status evidence.'],
    steps: ['Complete VIDEX and assemble the German tourism checklist.', 'Arrange submission through the authorised India application centre.', 'Provide biometrics or the permitted representative documents where applicable.', 'Await the decision and check your passport and visa before travel.'],
  },
  greece: {
    source: { label: 'Greek Embassy in India · Visa guidance', url: 'https://www.mfa.gr/missionsabroad/en/india-en/visas' },
    overview: 'The Greek Embassy in India identifies its authorised visa application centres; application delivery takes additional time.',
    processing: ['The embassy timing page uses working-day wording and separate delivery estimates that differ from current EU guidance. A reconciled current Greece-specific turnaround is not yet verified.', ...schengenCore.processing],
    steps: ['Use the Greek Embassy India page to identify its authorised Global Visa Center World submission route.', 'Prepare the tourism application and current local checklist; the complete local document pack is not verified in this guide.', 'Arrange submission through the designated centre and provide biometrics where required.', 'Allow additional time for application and passport delivery; check the issued visa before travelling.'],
    gap: 'The current Greece tourism document pack has not been fully verified against a government-hosted checklist.',
    processingGap: 'Current national turnaround not yet verified; conflicting embassy and general EU timing guidance are distinguished below.',
    extraSources: [{ label: 'Greek Embassy India · Processing and delivery guidance', url: 'https://www.mfa.gr/missionsabroad/en/india-en/visas/processing-time-of-applications-for-schengen-visa.html' }],
  },
  italy: {
    source: { label: 'Italian Embassy in India · Visas', url: 'https://ambnewdelhi.esteri.it/en/servizi-consolari-e-visti/servizi-per-il-cittadino-straniero/visti/' },
    overview: 'Italy assigns applications by consular jurisdiction in India. Tamil Nadu falls under its Bengaluru consulate in the embassy’s published guidance.',
    documents: [...schengenCore.documents, 'Bengaluru guidance: passport issued within 10 years, valid for 3 months after the intended stay, with two blank pages.', 'Confirm residence within the responsible consular jurisdiction; Bengaluru normally requires 6 months of legal residence there. Follow the tourism checklist for that jurisdiction.'],
    processing: ['Bengaluru publishes a normal Schengen decision period of up to 15 days, extendable to 45 in individual cases. Appointment and delivery time are additional; allow more time during peak demand.'],
    steps: ['Identify the Italian consulate responsible for your Indian residence.', 'Use its tourism document checklist and designated application-centre route.', 'Complete the application and attend the requested appointment and biometrics.', 'Check the consular decision and issued visa details before travelling.'],
    gap: 'A complete current tourism checklist for every Italian consular jurisdiction in India is not yet verified; the confirmed passport and residence rules do not replace that checklist.',
    extraSources: [{ label: 'Italian Consulate Bengaluru · Jurisdiction, submission and processing', url: 'https://consbangalore.esteri.it/it/servizi-consolari-e-visti/servizi-per-il-cittadino-straniero/visti/' }],
  },
  netherlands: {
    source: netherlandsSource,
    overview: 'The Netherlands publishes an India-specific application procedure and a separate tourism checklist.',
    documents: ['Your own completed and signed online Schengen application with its unique code.', 'Passport, photo, medical insurance and evidence covering itinerary, accommodation and finances.', 'The completed tourism checklist and any evidence applicable to employment, sponsorship or a minor.'],
    steps: ['Complete your own application online; do not reuse another person’s coded form.', 'Gather the tourism checklist and supporting documents.', 'Book an individual appointment at VFS Global in India and attend in person.', 'Submit documents, answer trip questions and supply fingerprints unless exempt.', 'Use the reference number to track the application; collect the passport and check the visa.'],
    requirements: ['An in-person appointment is required, including for children; fingerprint exemptions are separate.', 'False documents may be reported to the Indian authorities.'],
  },
  spain: {
    source: { label: 'Spanish Embassy in New Delhi · Schengen visas', url: 'https://www.exteriores.gob.es/Embajadas/nuevadelhi/en/ServiciosConsulares/Paginas/Consular/Visados-Schengen.aspx' },
    overview: 'Spain’s embassy identifies Schengen short-stay visas for tourism. Local consular instructions must match your Indian residence.',
    documents: ['Completed computer-filled application, signed in blue ink; recent compliant colour photograph.', 'Current passport with two blank pages, issued within 10 years, and copies of biographical pages, previous visas and immigration stamps. Confirm the required remaining validity because the official sources differ.', 'Cover letter, round-trip flight reservations and accommodation covering the stay; a private visit uses the specified Spanish police invitation.', 'Travel medical insurance covering the Schengen stay, including emergency treatment and repatriation; the embassy webpage requests the policy front page.', 'Stamped, signed bank statements for the applicant and any sponsor; confirm the statement period because the webpage and downloadable checklist differ.', 'Two years of income-tax evidence, 3 months of salary slips where available, PAN copy, and sponsor letter and relationship evidence where applicable.', 'Minors need the applicable parental signatures, consent and parent identity evidence; follow the responsible consular checklist.'],
    steps: ['Confirm Spain is your main destination and identify the consular office responsible for your residence.', 'Complete and sign the form; prepare the embassy tourism checklist and resolve any conflicting document requirements before submission.', 'Follow the embassy-designated BLS submission instructions and provide biometrics where required.', 'Respond to any further evidence or interview request; follow the notified passport-return instructions and check the issued visa.'],
    gap: 'The embassy webpage and its downloadable tourism checklist conflict on passport validity and the bank-statement period. Confirm the applicable current requirements with your responsible consular office before submitting; these details remain unverified.',
    extraSources: [{ label: 'Spanish Embassy New Delhi · Tourism documentation (PDF; differs from webpage)', url: 'https://www.exteriores.gob.es/Embajadas/nuevadelhi/en/ServiciosConsulares/Documents/1%20LIST%20SPECIFIC%20DOCUMENTATION%20REQUESTED.%20SCHENGEN%20VISAS.pdf' }],
  },
  switzerland: {
    source: { label: 'Swiss Government · Applications in India', url: 'https://www.schweiz-indien.eda.admin.ch/en/application-schengen-visa-procedure' },
    overview: 'Switzerland participates in Schengen and publishes a tourist checklist and India application procedure.',
    documents: ['Signed application and a recent compliant photograph; passport issued within 10 years, valid 3 months beyond scheduled return, with two blank pages.', 'Employer introduction and no-objection letter giving position, service duration, travel dates and purpose, where applicable.', 'Schengen travel medical insurance, flight reservations with traveller names, onward travel arrangements and accommodation or package-tour confirmations.', 'Employed applicants: 3 months of payslips and salary-account statements, plus income-tax acknowledgements for two assessment years.', 'Self-employed applicants: business-registration evidence, 3 months of personal bank statements and two assessment years of tax acknowledgements. Retirees: 3 months of pension statements and regular-income evidence.', 'Students over 16: college ID and school or college introduction letter. Minors travelling alone or without both parents: notarised consent as applicable and parent identity copies.', 'Follow the checklist’s family-submission arrangements and document order; further documents or an interview may be requested.'],
    steps: ['Prepare the signed application and Swiss India tourist checklist in the specified order.', 'Arrange submission at the designated VFS application centre.', 'Provide fingerprints unless the published exemption applies; the representation may still request attendance or an interview.', 'Track the application and check the visa dates, permitted stay and entries after return of the passport.'],
    processing: ['The Swiss India page publishes 7–10 calendar days after submission at a VFS centre. This is guidance, not a guaranteed deadline; additional examination can take longer.'],
    extraSources: [{ label: 'Swiss Embassy India · Tourist checklist (PDF)', url: 'https://www.schweiz-indien.eda.admin.ch/dam/en/eda-cms/Ge-fqqWRnxrs/Checklist_Tourist-EN.pdf' }],
  },
}

const countryQuestions: Record<string, { question: string; answer: string }> = {
  austria: { question: 'Can I work on an Austrian tourist visa?', answer: 'The Austrian ministry describes the tourism C route as excluding gainful employment.' },
  france: { question: 'Does this cover French overseas territories?', answer: 'No. Use the France-Visas assistant for the exact territory; this summary concerns metropolitan France.' },
  germany: { question: 'Does sponsorship remove my own financial-document requirements?', answer: 'No. The German tourism checklist also requests evidence of the traveller’s economic status, including when the trip is sponsored.' },
  greece: { question: 'Does the decision period include transporting my passport?', answer: 'The embassy distinguishes decision time from application delivery. Its older timing page is not a verified current end-to-end turnaround.' },
  italy: { question: 'Can any Italian consulate in India handle my application?', answer: 'Use the consulate assigned to your residence. The embassy publishes separate jurisdictions; Tamil Nadu is listed under Bengaluru.' },
  netherlands: { question: 'Can I reuse someone else’s application form?', answer: 'No. Complete your own online form so it receives its own unique code; the Dutch India page warns that reuse can cause processing issues.' },
  spain: { question: 'Why must I confirm the document checklist?', answer: 'The official embassy webpage and downloadable checklist give different passport-validity and bank-statement periods. This guide marks those details as unresolved; confirm the current instructions for your jurisdiction.' },
  switzerland: { question: 'Can I rely on the published 7–10 days as a deadline?', answer: 'No. It is the Swiss India page’s published guidance, not a guarantee for an individual application.' },
}

const reviewedGuidance: Record<string, VisaGuidance> = {}
for (const [id, country] of Object.entries(schengenCountries)) {
  reviewedGuidance[id] = {
    ...schengenCore,
    faqs: [...schengenCore.faqs, countryQuestions[id]],
    verifiedOn: reviewedOn,
    overview: country.overview,
    scope: 'Shared Schengen rules plus individually reviewed national guidance. Any incomplete local details are marked below.',
    sources: [country.source, euSource, austriaSource, netherlandsSource, ...(country.extraSources ?? [])].filter((source, index, all) => all.findIndex(item => item.url === source.url) === index),
    ...(country.documents ? { documents: country.documents } : {}),
    ...(country.steps ? { steps: country.steps } : {}),
    ...(country.processing ? { processing: country.processing } : {}),
    ...(id === 'netherlands' ? { requirements: [...schengenCore.requirements, ...country.requirements!] } : {}),
    gaps: {
      ...(country.gap ? { documents: country.gap } : {}),
      ...(country.processingGap ? { processing: country.processingGap } : {}),
    },
  }
}

reviewedGuidance['united-kingdom'] = {
  verifiedOn: reviewedOn,
  overview: 'The Standard Visitor route covers a temporary tourism visit. Visa validity and the permitted length of each visit are different.',
  visaTypes: ['Standard Visitor for a usual visit of up to 6 months.', 'Frequent visitors may apply for 2-, 5- or 10-year long-term Standard Visitor permission; a shorter grant is possible.'],
  eligibility: ['Indian nationals generally need permission before travel.', 'Demonstrate your plans to leave, ability to fund the trip and return journey, and genuine visitor purpose.'],
  documents: ['Passport valid throughout the visit.', 'Application information covering dates, accommodation, travel history and personal circumstances.', 'Evidence of finances and genuine circumstances; sponsor evidence if another person supports the visit.', 'Certified translations for documents not in English or Welsh. Follow the individual application checklist.'],
  processing: ['Usually 3 weeks after online application, identity checks and document submission. Appointment waiting time is additional; more checks can delay a decision.'],
  validity: ['Validity: the dates in your grant govern travel; long-term options do not permit living in the UK.', 'Stay: normally no more than 6 months per visit for tourism.', 'Entries: normally repeat visits during validity unless permission is limited to single or dual entry.'],
  steps: ['Check the tourism route and eligibility.', 'Complete the online application from outside the UK; applications can start 3 months before travel.', 'Book the visa application centre appointment and provide identity, biometrics and supporting evidence as instructed.', 'Await the decision and follow the instructions to access your immigration permission.'],
  requirements: ['No employment or making the UK your main home through repeated visits.', 'Children can require extra consent and travel arrangements; this adult tourism summary is not their complete checklist.'],
  faqs: [
    { question: 'Can I stay for 2 years with a 2-year visitor visa?', answer: 'No. Long-term validity allows visits during that period; the usual tourism stay limit is 6 months on each visit.' },
    { question: 'Does completing the checklist guarantee approval?', answer: 'No. You must satisfy the visitor rules and the decision depends on your individual evidence.' },
    { question: 'Can I work during a tourist visit?', answer: 'Ordinary employment is not allowed on a tourism visit; only activities expressly permitted by the visitor rules are allowed.' },
  ],
  sources: [
    { label: 'GOV.UK · Visitor overview', url: 'https://www.gov.uk/standard-visitor' },
    { label: 'GOV.UK · Application procedure', url: 'https://www.gov.uk/standard-visitor/apply-standard-visitor-visa' },
    { label: 'GOV.UK · Supporting evidence', url: 'https://www.gov.uk/government/publications/visitor-visa-guide-to-supporting-documents/guide-to-supporting-documents-visiting-the-uk' },
    { label: 'GOV.UK · Visitor rules', url: 'https://www.gov.uk/guidance/immigration-rules/immigration-rules-appendix-v-visitor' },
    { label: 'GOV.UK · Nationality requirements', url: 'https://www.gov.uk/guidance/immigration-rules/immigration-rules-appendix-visitor-visa-national-list' },
  ],
}

reviewedGuidance.singapore = {
  verifiedOn: reviewedOn,
  overview: 'An entry visa lets you travel to seek admission. Your visit pass determines the stay, independently of visa validity.',
  scope: 'Submission and processing notes follow the Chennai consulate. Confirm the mission responsible for your Indian residence.',
  visaTypes: ['Social-visit entry visa, issued electronically after approval.'],
  eligibility: ['Ordinary Indian passport holders need a visa before visiting; admission is decided by ICA.'],
  documents: ['Signed Form 14A.', 'Passport-size colour photograph from the last 3 months.', 'Copies of the passport biodata and last page; at least 6 months of passport validity on entry.', 'Additional case-specific supporting evidence if requested.'],
  processing: ['Chennai guidance: 3–5 working days after submission to an authorised visa agent, excluding submission day, weekends and public holidays. Some cases take longer.'],
  validity: ['Validity: individually granted; use the dates on your e-Visa, including the expiry date.', 'Stay: the visit pass issued on admission determines the number of days, not the visa validity.', 'Entries: a single-journey visa can be used once; a multiple-journey visa permits repeat use within validity. Check your grant.'],
  steps: ['Prepare the application and supporting documents.', 'Submit through an authorised visa agent or an eligible Singapore local sponsor using the official system.', 'Keep the application reference and obtain the e-Visa after approval.', 'Check visa details and the applicable arrival requirements before departure.'],
  requirements: ['A valid visa does not guarantee admission.', 'Visa validity cannot be extended or amended; a fresh application may be needed.'],
  faqs: [
    { question: 'When should I apply?', answer: 'The Chennai consulate advises applying within 30 days before arrival; allow sufficient processing time and a larger buffer during peak periods.' },
    { question: 'Can I stay until the visa expiry date?', answer: 'Not necessarily. Your visit pass sets the permitted stay; it is separate from your visa expiry.' },
    { question: 'Can I change the validity after issue?', answer: 'No. The consulate states that validity cannot be amended; a fresh application is assessed separately.' },
  ],
  sources: [
    { label: 'Singapore Government · India application guidance', url: 'https://chennai.mfa.gov.sg/consular-services/visa-information/' },
    { label: 'Singapore Government · Visa FAQs', url: 'https://chennai.mfa.gov.sg/consular-services/visa-information/frequently-asked-questions-on-visa/' },
    { label: 'ICA · Visa requirements', url: 'https://www.ica.gov.sg/enter-transit-depart/entering-singapore/visa_requirements' },
  ],
}

reviewedGuidance.japan = {
  verifiedOn: reviewedOn,
  overview: 'Japan’s India eVisa route is a single-entry short-term tourism visa, submitted through its designated visa application centres.',
  visaTypes: ['Single-entry short-stay tourism eVisa for eligible residents of India.', 'Other multiple-entry routes exist, but their individual eligibility is not covered by this single-entry guide.'],
  eligibility: ['The India embassy identifies Indian and foreign nationals resident in India as eligible to apply for the tourism eVisa. Approval remains case-specific.'],
  documents: ['Valid passport, application form and photo.', 'Flight itinerary, schedule in Japan and accommodation details.', 'Evidence of ability to fund the trip, such as income/tax evidence or bank documents.', 'Follow the jurisdiction’s local checklist and any further evidence requested.'],
  processing: ['The India embassy warns that processing varies with application volume and cannot be expedited to match travel dates. No guaranteed India turnaround is stated here.'],
  validity: ['Validity: single-entry visas are generally valid for entry for 3 months; check the issued notice.', 'Stay: tourism eVisas cover short stays up to 90 days, subject to the actual permission granted.', 'Entries: one entry on this eVisa route; it cannot be reused after entry.'],
  steps: ['Identify the Japanese mission responsible for your Indian residence and prepare its checklist.', 'Submit through the designated Japan visa application centre; India applications may be accepted from 3 months before travel.', 'Await the decision and obtain the electronic issuance notice.', 'Display the issuance notice live on a mobile device at the airport; internet access is required.'],
  requirements: ['A screenshot, PDF, photo or printed eVisa issuance notice is not accepted in place of the required live display.', 'This tourism permission does not authorise paid work.'],
  faqs: [
    { question: 'Can I carry only a printed eVisa?', answer: 'No. The India embassy requires the visa issuance notice to be displayed on a mobile device with internet access.' },
    { question: 'Can an agent guarantee express processing?', answer: 'The embassy states that processing cannot be expedited or prioritised to suit an applicant’s schedule.' },
    { question: 'Is a multiple-entry visa automatic?', answer: 'No. This tourism eVisa is single-entry. Other routes have their own eligibility and supporting evidence.' },
  ],
  sources: [
    { label: 'Japan Embassy in India · Visa notices', url: 'https://www.in.emb-japan.go.jp/itpr_en/Visa.html' },
    { label: 'Japan Embassy · India eVisa', url: 'https://www.in.emb-japan.go.jp/itpr_ja/11_000001_01148.html' },
    { label: 'Japan MOFA · Tourism checklist (PDF)', url: 'https://www.mofa.go.jp/files/000121327.pdf' },
    { label: 'Japan MOFA · Visa validity', url: 'https://www.mofa.go.jp/j_info/visit/visa/procedure/validity.html' },
  ],
}

reviewedGuidance.thailand = {
  verifiedOn: reviewedOn,
  overview: 'The Thai Embassy in New Delhi publishes a 30-day tourism exemption for Indian ordinary passport holders, effective from 15 September 2026 until further announcement.',
  visaTypes: ['Visa exemption for qualifying short tourism visits.', 'For a visa-required itinerary, the TR tourist route has single- and multiple-entry options.'],
  eligibility: ['The published exemption covers Indian ordinary passport holders visiting for tourism. Other purposes and longer itineraries need the appropriate route.'],
  documents: ['Prepare passport and trip details for entry checks.', 'TDAC submission uses passport, travel, accommodation and the health-declaration information requested by Immigration.', 'A complete current exemption-entry document checklist has not yet been verified here.'],
  processing: ['No pre-travel visa decision is needed for a qualifying exemption visit; admission is decided at the border.', 'The embassy’s December 2024 eVisa rollout notice estimated approximately 14 working days after the application payment receipt was issued. A current 2026 turnaround has not been confirmed; this historical estimate is not a deadline.'],
  validity: ['Exemption: the embassy currently publishes a stay of up to 30 days; comply with the permission actually granted.', 'Single-entry TR visa: published validity 3 months, stay up to 60 days per entry.', 'Multiple-entry TR visa: published validity 6 months, stay up to 60 days per entry. Admission and conditions still apply.'],
  steps: ['Check whether the exemption covers the purpose and length of your visit.', 'If a visa is required, use the Thai eVisa system and its relevant checklist.', 'Complete the Thailand Digital Arrival Card within the 3 days before arrival, where required.', 'Present your travel evidence at the border and check the authorised departure date.'],
  requirements: ['TDAC is an arrival declaration, not a visa or an approval of admission.', 'Visa exemptions can change; recheck the dated embassy announcement before travel.'],
  faqs: [
    { question: 'Is the exemption still 60 days?', answer: 'The embassy page reviewed for this guide states 30 days from 15 September 2026. Do not apply an older stay limit.' },
    { question: 'Does TDAC replace my visa?', answer: 'No. It is a separate arrival declaration; any visa requirement still applies.' },
    { question: 'Can I use the exemption for any purpose?', answer: 'This guide addresses tourism only. Check the appropriate permission for other activities.' },
  ],
  gaps: { documents: 'Full current entry-document checklist not yet verified; only the confirmed preparation items are shown.', processing: 'Current visa application turnaround not yet verified; exemption and visa routes are distinguished below.' },
  sources: [
    { label: 'Thai Embassy in India · Current visa routes', url: 'https://newdelhi.thaiembassy.org/en/page/visa' },
    { label: 'Thai Immigration · TDAC instructions', url: 'https://tdac.immigration.go.th/manual/en/' },
    { label: 'Thai Embassy New Delhi · December 2024 eVisa rollout notice (historical timing)', url: 'https://newdelhi.thaiembassy.org/en/content/announcement-on-the-implementation-of-the-electron?menu=614493e28d99e8319f20bc93' },
  ],
}

reviewedGuidance.australia = {
  verifiedOn: reviewedOn,
  overview: 'Visitor visa subclass 600, Tourist stream outside Australia, is the relevant visitor route to assess for a holiday application from India.',
  visaTypes: ['Visitor visa (subclass 600), Tourist stream — apply outside Australia.'],
  eligibility: ['The route is for a temporary tourism visit. You must meet the individual Home Affairs criteria.'],
  documents: ['Passport identity and issue/expiry pages; national identity card and name-change evidence if applicable.', 'Evidence of funds for the stay and departure: Home Affairs gives examples including 3 months of itemised personal bank statements, payslips, tax records or audited accounts.', 'Tourism plans; host invitation and host financial evidence if someone in Australia supports the visit.', 'Evidence of reasons to return home, such as employment, study, immediate family or assets.', 'For children: identity and guardianship evidence, consent from any non-travelling person with parental responsibility, and additional care-arrangement forms where applicable.', 'English translations alongside originals for non-English documents; clear colour scans. Follow the evidence requested in ImmiAccount for your circumstances.'],
  processing: ['Home Affairs directs applicants to its processing-time guide. No current numerical estimate was verified during this review; appointment or additional-check time must not be guessed.'],
  validity: ['Validity: the individual grant letter sets your travel period.', 'Stay: generally 3 months; up to 12 months may be granted in certain circumstances. Your grant controls.', 'Entries: single or multiple entry may be granted; do not assume multiple entry.'],
  steps: ['Check the offshore Tourist stream and prepare identity, financial and genuine-visitor evidence.', 'Create or sign in to ImmiAccount, complete the application and attach clear supporting documents.', 'Submit a separate application for each family member; related family applications can be submitted together.', 'Monitor ImmiAccount and provide further documents, biometrics or health examinations if requested.', 'Remain outside Australia when the decision is made. Wait for written approval before arranging travel; check the grant letter’s dates, entries and conditions.'],
  requirements: ['Do not treat the maximum stay advertised for the route as the period you will receive.', 'Each family member needs a separate application.'],
  faqs: [
    { question: 'Does everyone receive 12 months?', answer: 'No. Home Affairs assesses the stay individually and generally grants 3 months on this stream.' },
    { question: 'Can my family share my application?', answer: 'No. Each family member submits a separate application.' },
  ],
  gaps: { processing: 'A current numerical processing estimate has not been verified. Home Affairs uses a changing processing-time tool; it is not a deadline for an individual application.' },
  sources: [{ label: 'Australian Home Affairs · Offshore Tourist stream and application steps', url: 'https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/visitor-600/tourist-stream-overseas?bk=Eligibility' }, { label: 'Australian Home Affairs · Processing-time guide', url: 'https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-processing-times/global-visa-processing-times' }],
}

for (const destination of visaDestinations) {
  if (reviewedGuidance[destination.id]) destination.guidance = reviewedGuidance[destination.id]
}
