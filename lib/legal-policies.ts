// MadrasTrails legal policies — approved content, effective 2 January 2027.
// Source: three supplied policy drafts. Contact details approved by the business.
export type LegalBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'list'; items: string[] }

export type LegalSection = {
  number: number
  title: string
  blocks: LegalBlock[]
}

export type LegalPolicy = {
  slug: string
  title: string
  kicker: string
  subtitle: string
  lead: string
  preamble: string[]
  sections: LegalSection[]
}

export const legalPolicies: Record<'terms' | 'privacy' | 'refund', LegalPolicy> = {
  "terms": {
    "slug": "terms-and-conditions",
    "title": "Terms & Conditions",
    "kicker": "The Journey Agreement",
    "subtitle": "Every memorable journey begins with clarity.",
    "lead": "Every memorable journey begins with a clear understanding.",
    "preamble": [
      "Operated by: Geetha Devsingh, trading as MadrasTrails (\"MadrasTrails\", \"MT\", \"we\", \"our\" or \"us\")."
    ],
    "sections": [
      {
        "number": 1,
        "title": "Before the Journey Begins",
        "blocks": [
          {
            "type": "paragraph",
            "text": "These Terms & Conditions explain the relationship between MadrasTrails and individuals or organisations enquiring about, purchasing or using our travel services (\"you\", \"guest\" or \"traveller\")."
          },
          {
            "type": "paragraph",
            "text": "They apply to enquiries and bookings made through our website, email, telephone, WhatsApp, authorised representatives or other official channels."
          },
          {
            "type": "paragraph",
            "text": "By confirming a booking after receiving these terms and the relevant travel proposal, you acknowledge the conditions applicable to your arrangements. Merely browsing our website does not create a travel booking contract."
          }
        ]
      },
      {
        "number": 2,
        "title": "What We Arrange",
        "blocks": [
          {
            "type": "paragraph",
            "text": "MadrasTrails specialises in personalised journeys and travel-related assistance. Depending on the services requested, we may arrange domestic or international holidays, accommodation, flights, ground transportation, sightseeing, experiences, cruises, travel insurance, visa assistance and foreign-exchange facilitation through authorised partners."
          },
          {
            "type": "paragraph",
            "text": "Our precise role may differ between bookings. We may act as a travel organiser, booking intermediary or facilitator, as identified in your confirmed proposal."
          },
          {
            "type": "paragraph",
            "text": "Airlines, hotels, cruise companies, transport operators, activity providers and other independent suppliers may impose their own conditions. We will communicate material supplier restrictions relevant to your booking before confirmation, wherever available."
          }
        ]
      },
      {
        "number": 3,
        "title": "Your Travel Proposal",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Each proposal is prepared around your stated requirements and may contain the itinerary, travel dates, accommodation category, inclusions, exclusions, pricing, payment schedule and special booking conditions."
          },
          {
            "type": "paragraph",
            "text": "Unless expressly confirmed, a quotation does not guarantee availability or reserve any service."
          },
          {
            "type": "paragraph",
            "text": "Rates may change before booking confirmation because of supplier inventory, airfares, exchange rates, government charges or other factors outside our control."
          },
          {
            "type": "paragraph",
            "text": "A booking becomes confirmed when MadrasTrails issues written confirmation of the agreed arrangements following acceptance of the applicable terms and receipt of the required payment."
          },
          {
            "type": "paragraph",
            "text": "Any service-specific condition must be disclosed before the relevant booking is accepted. Where an agreed booking-specific condition differs from these general terms, that specific condition will apply to the relevant service to the extent permitted by law."
          }
        ]
      },
      {
        "number": 4,
        "title": "Understanding Your Price",
        "blocks": [
          {
            "type": "paragraph",
            "text": "The confirmed proposal will identify what is included and excluded from the quoted price."
          },
          {
            "type": "paragraph",
            "text": "Unless otherwise specified, personal expenditure, optional activities, additional baggage, gratuities, early check-in, late check-out, visa charges, insurance, local tourism taxes and other excluded services remain payable by the traveller."
          },
          {
            "type": "paragraph",
            "text": "GST, TCS and other applicable statutory charges will be disclosed and treated according to prevailing law."
          },
          {
            "type": "paragraph",
            "text": "For international arrangements, foreign-currency costs may be converted into Indian Rupees using the exchange-rate methodology disclosed in the proposal. Indicative exchange rates displayed on our website are not guaranteed transaction rates."
          },
          {
            "type": "paragraph",
            "text": "Any material change to a confirmed booking price will be handled in accordance with the agreed booking terms and applicable consumer law. We will explain the reason and obtain the required agreement before imposing additional charges."
          }
        ]
      },
      {
        "number": 5,
        "title": "Payments and Booking Deadlines",
        "blocks": [
          {
            "type": "paragraph",
            "text": "A deposit or full payment may be required to secure arrangements. The amount and due dates will be communicated in writing."
          },
          {
            "type": "paragraph",
            "text": "Some suppliers require immediate payment or issue non-refundable tickets and reservations. We will identify material payment restrictions before committing the corresponding booking."
          },
          {
            "type": "paragraph",
            "text": "Payments must be made only through payment channels officially communicated by MadrasTrails. Please retain your receipts and payment confirmations."
          },
          {
            "type": "paragraph",
            "text": "If a scheduled payment is missed, we will attempt to notify you and explain any resulting supplier deadlines. A booking may be affected or cancelled where payment is not received in time, subject to the applicable cancellation conditions."
          }
        ]
      },
      {
        "number": 6,
        "title": "Traveller Information and Documents",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Travellers are responsible for providing accurate names, dates of birth, contact information and other details required for their bookings."
          },
          {
            "type": "paragraph",
            "text": "Names must correspond with the relevant travel documents. Corrections may attract supplier charges, especially after tickets have been issued."
          },
          {
            "type": "paragraph",
            "text": "Each traveller must hold the passports, visas, permits, health documentation and other entry or transit documents required for the journey."
          },
          {
            "type": "paragraph",
            "text": "Passport-validity and visa requirements differ by nationality, destination and transit route. We may assist with guidance, but travellers must verify their individual eligibility and comply with applicable immigration requirements."
          },
          {
            "type": "paragraph",
            "text": "Parents or lawful guardians are responsible for documentation and authorisations required for minors."
          }
        ]
      },
      {
        "number": 7,
        "title": "Visas, Insurance and Foreign Exchange",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Where MadrasTrails assists with visa applications, our role is to facilitate preparation or submission as agreed. Decisions regarding visa issuance, validity and entry remain with the relevant authorities."
          },
          {
            "type": "paragraph",
            "text": "We cannot guarantee visa approval or immigration clearance."
          },
          {
            "type": "paragraph",
            "text": "Travel insurance is strongly recommended, particularly for medical emergencies, trip interruptions, baggage loss and unexpected cancellations. Coverage, exclusions and claims are governed by the insurer's policy."
          },
          {
            "type": "paragraph",
            "text": "Any foreign-exchange service will be arranged only through appropriately authorised entities and subject to applicable RBI, FEMA, KYC and other regulatory requirements. MadrasTrails will not represent itself as an authorised foreign-exchange dealer unless it holds the necessary authorisation."
          }
        ]
      },
      {
        "number": 8,
        "title": "Adjustments Before Departure",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Requests to change travel dates, passenger details, hotels, flights or other confirmed services should be submitted through our official communication channels."
          },
          {
            "type": "paragraph",
            "text": "We will assess availability, supplier rules and any price difference before requesting your approval."
          },
          {
            "type": "paragraph",
            "text": "Some arrangements cannot be changed once confirmed. Others may require cancellation and a fresh booking."
          },
          {
            "type": "paragraph",
            "text": "Where a material change is initiated by MadrasTrails or a supplier, we will communicate the available alternatives, including any applicable refund or cancellation rights, rather than automatically treating the change as accepted."
          }
        ]
      },
      {
        "number": 9,
        "title": "During Your Journey",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Travellers are expected to follow reasonable safety instructions, local laws, immigration requirements and the operating rules of hotels, airlines, attractions and other service providers."
          },
          {
            "type": "paragraph",
            "text": "Please inform us before booking about material accessibility requirements, mobility assistance, dietary needs or other arrangements necessary to deliver the requested services. We will discuss what can reasonably be accommodated and seek appropriate supplier confirmation."
          },
          {
            "type": "paragraph",
            "text": "Changes arising from weather, transport disruption, local restrictions, safety concerns or other unexpected events may affect the itinerary. Where practical, we will assist in arranging suitable alternatives and communicate material differences."
          }
        ]
      },
      {
        "number": 10,
        "title": "Our Responsibility and Our Partners",
        "blocks": [
          {
            "type": "paragraph",
            "text": "MadrasTrails will exercise reasonable care in arranging the services we undertake to provide."
          },
          {
            "type": "paragraph",
            "text": "Independent suppliers remain responsible for operating their respective services. Their booking and carriage conditions may apply."
          },
          {
            "type": "paragraph",
            "text": "Where a supplier problem occurs, we will provide reasonable assistance with communication, alternatives and claims relating to services booked through us."
          },
          {
            "type": "paragraph",
            "text": "Nothing in these terms excludes or restricts liability or consumer remedies that cannot lawfully be excluded under applicable law, including liability arising from our own negligence, misrepresentation or deficient services."
          }
        ]
      },
      {
        "number": 11,
        "title": "When Plans Change or End",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Cancellations, amendments, missed departures, early returns and unused services are governed by our separate Cancellation & Refund Policy, together with any clearly disclosed booking-specific conditions."
          },
          {
            "type": "paragraph",
            "text": "Refund eligibility may depend on the nature of the service, the timing of cancellation and the amount recoverable from suppliers."
          },
          {
            "type": "paragraph",
            "text": "We will not impose undisclosed cancellation charges or deduct the same cost twice."
          }
        ]
      },
      {
        "number": 12,
        "title": "Circumstances Beyond Reasonable Control",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Events such as natural disasters, severe weather, public-health restrictions, civil disturbances, government action, strikes or major transport disruptions may prevent travel arrangements from proceeding as planned."
          },
          {
            "type": "paragraph",
            "text": "In such situations, we will communicate known developments, explain available options and make reasonable efforts to obtain recoveries or alternatives from suppliers."
          },
          {
            "type": "paragraph",
            "text": "Refunds and other remedies will depend on the circumstances, supplier commitments, agreed terms and applicable law. This provision does not remove statutory consumer rights."
          }
        ]
      },
      {
        "number": 13,
        "title": "Our Website and Creative Work",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Our website, brand identity, original written material, itineraries, visual designs and other proprietary content are protected by applicable intellectual-property laws."
          },
          {
            "type": "paragraph",
            "text": "You may use our website and proposals for genuine personal travel enquiries. Commercial reproduction, unauthorised redistribution, scraping or misuse of our materials is prohibited."
          },
          {
            "type": "paragraph",
            "text": "Third-party links are provided for convenience. Their own terms and privacy practices may apply."
          }
        ]
      },
      {
        "number": 14,
        "title": "Your Stories and Photographs",
        "blocks": [
          {
            "type": "paragraph",
            "text": "We value the experiences our guests share."
          },
          {
            "type": "paragraph",
            "text": "Submitting a review or photograph to us does not automatically give MadrasTrails unlimited permission to use it in advertising. We will seek appropriate permission before using identifiable guest photographs, testimonials or personal travel stories for promotional purposes."
          }
        ]
      },
      {
        "number": 15,
        "title": "Questions, Concerns and Resolution",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Please report any service concern as soon as reasonably possible so that we have an opportunity to assist."
          },
          {
            "type": "paragraph",
            "text": "Guest support: info@madrastrails.in"
          },
          {
            "type": "paragraph",
            "text": "Grievance contact: Geetha Devsingh, Proprietor — info@madrastrails.in"
          },
          {
            "type": "paragraph",
            "text": "We aim to acknowledge complaints within two working days and provide a substantive response or progress update within 30 calendar days, subject to any stricter legal requirement."
          },
          {
            "type": "paragraph",
            "text": "Travellers retain their rights to approach appropriate consumer authorities or other lawful dispute-resolution forums."
          }
        ]
      },
      {
        "number": 16,
        "title": "Applicable Law and Updates",
        "blocks": [
          {
            "type": "paragraph",
            "text": "These terms are governed by the applicable laws of India, without restricting any mandatory consumer protection or statutory jurisdiction rights."
          },
          {
            "type": "paragraph",
            "text": "We may revise these terms for future enquiries and bookings. Changes will not retrospectively remove rights under an already confirmed booking without a lawful basis and any required agreement."
          }
        ]
      }
    ]
  },
  "privacy": {
    "slug": "privacy-policy",
    "title": "Privacy Policy",
    "kicker": "Your Information, Handled With Care",
    "subtitle": "A thoughtful approach to your personal information.",
    "lead": "Travel is personal. The information entrusted to MadrasTrails deserves thoughtful and responsible handling.",
    "preamble": [],
    "sections": [
      {
        "number": 1,
        "title": "A Personal Approach to Privacy",
        "blocks": [
          {
            "type": "paragraph",
            "text": "This policy explains how Geetha Devsingh, proprietor, operating as MadrasTrails, collects, uses, shares, safeguards and retains personal information when you interact with us or request travel services."
          },
          {
            "type": "paragraph",
            "text": "It covers our website, enquiry forms, email, telephone, WhatsApp and other official communication channels."
          }
        ]
      },
      {
        "number": 2,
        "title": "Information We May Receive",
        "blocks": [
          {
            "type": "paragraph",
            "text": "The information we collect depends on the service you request."
          },
          {
            "type": "paragraph",
            "text": "Enquiry and contact details: Name, telephone number, email address, city and the content of your enquiry."
          },
          {
            "type": "paragraph",
            "text": "Travel preferences: Destinations, proposed dates, budget, accommodation preferences, interests, group composition and other details needed to design your journey."
          },
          {
            "type": "paragraph",
            "text": "Traveller identification: Names, dates of birth, nationality, passport information and other identity details required for confirmed travel arrangements."
          },
          {
            "type": "paragraph",
            "text": "Visa-related documents: Where visa assistance is requested, relevant photographs, application forms, financial documents, employment information and supporting records required by the destination authority."
          },
          {
            "type": "paragraph",
            "text": "Payment and transaction information: Amounts paid, payment status, billing details, invoices, refunds and transaction references. Please use authorised payment channels for card payments and do not send complete card details through informal channels."
          },
          {
            "type": "paragraph",
            "text": "Special assistance requirements: Information you voluntarily share about accessibility, dietary requirements or health-related travel assistance, where necessary to arrange the requested service."
          },
          {
            "type": "paragraph",
            "text": "Website information: Technical and usage information, such as device characteristics, IP address, pages visited and cookie-related information, to the extent collected by the technologies actually deployed on our website."
          },
          {
            "type": "paragraph",
            "text": "We aim to request only information reasonably necessary for a defined purpose."
          }
        ]
      },
      {
        "number": 3,
        "title": "Why We Use This Information",
        "blocks": [
          {
            "type": "paragraph",
            "text": "We use personal information for legitimate and lawful travel-related purposes, including:"
          },
          {
            "type": "list",
            "items": [
              "Responding to enquiries and preparing personalised proposals.",
              "Confirming reservations and coordinating with suppliers.",
              "Assisting with visa, insurance or other requested travel services.",
              "Processing payments, invoices, refunds and accounting records.",
              "Communicating itinerary updates and essential travel information.",
              "Providing customer support and handling complaints.",
              "Maintaining website functionality, security and service quality.",
              "Meeting applicable legal, tax and regulatory obligations."
            ]
          },
          {
            "type": "paragraph",
            "text": "Where required, we obtain consent or rely on another basis expressly permitted by applicable law."
          },
          {
            "type": "paragraph",
            "text": "Information collected for one purpose will not automatically be used for an unrelated purpose."
          }
        ]
      },
      {
        "number": 4,
        "title": "Travel Updates and Promotional Messages",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Operational communications about an enquiry or booking are different from marketing messages."
          },
          {
            "type": "paragraph",
            "text": "We may contact you with travel inspiration, announcements or offers where you have provided the required consent or another lawful basis applies."
          },
          {
            "type": "paragraph",
            "text": "You may withdraw marketing consent or request that promotional communications stop by contacting us at info@madrastrails.in or using an unsubscribe facility where provided."
          },
          {
            "type": "paragraph",
            "text": "Withdrawing marketing consent will not prevent us from sending necessary communications about an active booking or fulfilling legal obligations."
          }
        ]
      },
      {
        "number": 5,
        "title": "Sharing Information to Make Travel Possible",
        "blocks": [
          {
            "type": "paragraph",
            "text": "International travel often requires coordination across several independent organisations."
          },
          {
            "type": "paragraph",
            "text": "Depending on your booking, necessary information may be shared with airlines, hotels, transport operators, cruise companies, experience providers, insurers, visa-processing partners, embassies, authorised foreign-exchange providers, payment processors and technology vendors."
          },
          {
            "type": "paragraph",
            "text": "We may also disclose information to government or regulatory authorities where legally required."
          },
          {
            "type": "paragraph",
            "text": "We will seek to limit disclosure to information reasonably needed for the relevant service."
          },
          {
            "type": "paragraph",
            "text": "We do not intend to sell or rent identifiable traveller information as a standalone commercial product."
          },
          {
            "type": "paragraph",
            "text": "Independent service providers may have their own privacy notices and legal responsibilities."
          }
        ]
      },
      {
        "number": 6,
        "title": "International Information Transfers",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Arranging travel abroad may require information to be transferred to organisations or authorities outside India."
          },
          {
            "type": "paragraph",
            "text": "For example, an overseas hotel may require guest identification, or an embassy may require application documents."
          },
          {
            "type": "paragraph",
            "text": "We will make such transfers for appropriate purposes and in accordance with applicable legal requirements and restrictions."
          }
        ]
      },
      {
        "number": 7,
        "title": "Children's Information",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Family travel may require details relating to children."
          },
          {
            "type": "paragraph",
            "text": "Where a child’s personal information is needed, we will seek the involvement and authorisation of the parent or lawful guardian and apply legally required consent and safeguarding measures."
          },
          {
            "type": "paragraph",
            "text": "We will not knowingly use children's personal information for behavioural advertising or other prohibited purposes."
          }
        ]
      },
      {
        "number": 8,
        "title": "Cookies and Website Technology",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Our website may use cookies or similar technologies for essential functionality, performance measurement and other disclosed purposes."
          },
          {
            "type": "paragraph",
            "text": "Where non-essential analytics, advertising or tracking technologies are deployed, we will provide appropriate information and consent choices as required by applicable law."
          },
          {
            "type": "paragraph",
            "text": "Visitors may also control certain cookies through their browser settings."
          }
        ]
      },
      {
        "number": 9,
        "title": "Protecting Your Information",
        "blocks": [
          {
            "type": "paragraph",
            "text": "We aim to maintain reasonable administrative, technical and organisational safeguards appropriate to the information we handle."
          },
          {
            "type": "paragraph",
            "text": "These may include restricted access, secure communication and storage arrangements, supplier confidentiality obligations and procedures for responding to suspected security incidents."
          },
          {
            "type": "paragraph",
            "text": "No internet-based system can guarantee absolute security. We will address security incidents and provide notifications where required by applicable law."
          },
          {
            "type": "paragraph",
            "text": "Please avoid sending complete payment-card credentials, passwords or unnecessary sensitive documents through unsecured communication channels."
          }
        ]
      },
      {
        "number": 10,
        "title": "How Long Information Is Kept",
        "blocks": [
          {
            "type": "paragraph",
            "text": "We retain personal information only for as long as reasonably necessary for the purposes for which it was collected, including service delivery, customer support, statutory recordkeeping, accounting, dispute resolution and legitimate legal obligations."
          },
          {
            "type": "paragraph",
            "text": "Different records may require different retention periods."
          },
          {
            "type": "paragraph",
            "text": "When information is no longer required, we will arrange for appropriate deletion, anonymisation or other lawful disposal, subject to applicable retention requirements."
          }
        ]
      },
      {
        "number": 11,
        "title": "Your Choices and Rights",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Subject to applicable law and its commencement provisions, you may have rights to request information about the processing of your personal data, correction of inaccurate details, erasure where legally appropriate, withdrawal of consent and grievance redressal."
          },
          {
            "type": "paragraph",
            "text": "We will provide an accessible process for making such requests."
          },
          {
            "type": "paragraph",
            "text": "Withdrawal of consent may affect services that cannot be delivered without the necessary information. We will explain relevant consequences where applicable."
          },
          {
            "type": "paragraph",
            "text": "We may need to verify your identity before acting on a request to protect your information against unauthorised disclosure."
          }
        ]
      },
      {
        "number": 12,
        "title": "External Websites and Partners",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Our website may contain links to airlines, hotels, payment providers, government websites or other third-party services."
          },
          {
            "type": "paragraph",
            "text": "Their information-handling practices may differ from ours. We encourage you to review their notices before providing personal information directly."
          }
        ]
      },
      {
        "number": 13,
        "title": "Changes to This Policy",
        "blocks": [
          {
            "type": "paragraph",
            "text": "We may update this policy to reflect changes in our services, technologies or applicable law."
          },
          {
            "type": "paragraph",
            "text": "Material changes will be communicated through an appropriate notice. The updated version and effective date will be displayed on our website."
          }
        ]
      },
      {
        "number": 14,
        "title": "Contact and Grievance Redressal",
        "blocks": [
          {
            "type": "paragraph",
            "text": "For privacy questions, consent withdrawal, correction requests or concerns about personal information, please contact:"
          },
          {
            "type": "paragraph",
            "text": "MadrasTrails Privacy Contact"
          },
          {
            "type": "paragraph",
            "text": "Geetha Devsingh, Proprietor and Privacy/Grievance Contact"
          },
          {
            "type": "paragraph",
            "text": "info@madrastrails.in"
          },
          {
            "type": "paragraph",
            "text": "No. 362/F1, Eden Avenue, Panchayat Street, Golden George Nagar, Chennai, Tamil Nadu 600037"
          },
          {
            "type": "paragraph",
            "text": "We will address requests and complaints within the periods required by applicable law."
          },
          {
            "type": "paragraph",
            "text": "Where legally available, individuals may pursue further remedies through the appropriate data-protection or other competent authority."
          }
        ]
      }
    ]
  },
  "refund": {
    "slug": "cancellation-and-refund-policy",
    "title": "Cancellation & Refund Policy",
    "kicker": "When Plans Change",
    "subtitle": "Fairness and transparency when plans change.",
    "lead": "A journey may be planned months in advance, yet circumstances sometimes change unexpectedly.",
    "preamble": [],
    "sections": [
      {
        "number": 1,
        "title": "Travel Plans Can Change",
        "blocks": [
          {
            "type": "paragraph",
            "text": "This policy explains how MadrasTrails handles cancellations, amendments, supplier recoveries and eligible refunds."
          },
          {
            "type": "paragraph",
            "text": "Our aim is to provide a fair and understandable process while recognising that airlines, hotels and other travel suppliers may have different financial commitments and cancellation rules."
          }
        ]
      },
      {
        "number": 2,
        "title": "Every Booking Has Its Own Conditions",
        "blocks": [
          {
            "type": "paragraph",
            "text": "MadrasTrails arranges personalised travel services, so cancellation terms may differ according to destination, season, departure date, supplier and type of booking."
          },
          {
            "type": "paragraph",
            "text": "Before payment, we will disclose material non-refundable items and any applicable cancellation schedule or MadrasTrails service charges."
          },
          {
            "type": "paragraph",
            "text": "Where a specific booking has an agreed cancellation schedule, that schedule applies to the relevant services, subject to applicable law."
          },
          {
            "type": "paragraph",
            "text": "Where no separate schedule has been agreed, refunds will be assessed using the actual unrecoverable supplier costs and any previously disclosed, reasonable MadrasTrails service or planning fees."
          },
          {
            "type": "paragraph",
            "text": "No undisclosed percentage-based cancellation penalty will be imposed."
          }
        ]
      },
      {
        "number": 3,
        "title": "How to Request Cancellation",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Please submit your cancellation request in writing through info@madrastrails.in or another official written channel identified in your booking confirmation."
          },
          {
            "type": "paragraph",
            "text": "Include your booking reference, lead traveller's name, travel dates and the services you wish to cancel."
          },
          {
            "type": "paragraph",
            "text": "A request will be treated as received when it reaches the designated official channel. We may verify the identity and authority of the person requesting cancellation before acting on a booking involving multiple travellers."
          },
          {
            "type": "paragraph",
            "text": "We will acknowledge the request and explain the next steps."
          },
          {
            "type": "paragraph",
            "text": "The effective cancellation date is important because supplier charges may increase as departure approaches."
          }
        ]
      },
      {
        "number": 4,
        "title": "How an Eligible Refund Is Calculated",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Where a refund is payable, the calculation will consider:"
          },
          {
            "type": "list",
            "items": [
              "The amount received by MadrasTrails for the cancelled services.",
              "Supplier cancellation charges and payments that cannot reasonably be recovered.",
              "Services already delivered or used.",
              "Any clearly disclosed and applicable planning, booking or cancellation fees.",
              "Refundable supplier credits or amounts subsequently recovered.",
              "Taxes, statutory collections and payment-processing adjustments as permitted by law."
            ]
          },
          {
            "type": "paragraph",
            "text": "We will not deduct the same supplier charge twice or apply a charge that was not properly disclosed and agreed where such disclosure is required."
          },
          {
            "type": "paragraph",
            "text": "A breakdown will be provided when communicating the refund determination."
          }
        ]
      },
      {
        "number": 5,
        "title": "Flights and Air Tickets",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Airline cancellation rules depend on the carrier, fare category, route and ticket conditions."
          },
          {
            "type": "paragraph",
            "text": "Some tickets permit partial refunds, while others may be non-refundable."
          },
          {
            "type": "paragraph",
            "text": "Refundable airport taxes or other amounts recoverable under applicable airline rules and law will be considered even where the base fare is non-refundable."
          },
          {
            "type": "paragraph",
            "text": "Once a ticket has been issued, name changes, date changes, cancellations and no-shows may attract airline charges."
          },
          {
            "type": "paragraph",
            "text": "Where an airline cancels a flight, the applicable airline policy and legal passenger rights will be considered separately from a voluntary cancellation initiated by the traveller."
          }
        ]
      },
      {
        "number": 6,
        "title": "Hotels, Resorts and Accommodation",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Accommodation providers may apply different cancellation rules depending on the property, travel dates, promotional rate and season."
          },
          {
            "type": "paragraph",
            "text": "Certain reservations, including some peak-season, event-based or promotional bookings, may require advance non-refundable payments."
          },
          {
            "type": "paragraph",
            "text": "Where a hotel approves a refund or waiver, the recoverable amount will be passed on in accordance with the agreed booking terms."
          },
          {
            "type": "paragraph",
            "text": "A request for early check-in, late check-out, room upgrade or a particular view is not guaranteed unless specifically confirmed."
          }
        ]
      },
      {
        "number": 7,
        "title": "Transfers, Activities and Experiences",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Private transfers, guided activities, cruises, attraction tickets, special events and exclusive experiences may have individual cancellation deadlines."
          },
          {
            "type": "paragraph",
            "text": "Services booked for a particular date or reserved exclusively for a traveller may have limited refund eligibility."
          },
          {
            "type": "paragraph",
            "text": "We will disclose material restrictions before confirming such arrangements."
          }
        ]
      },
      {
        "number": 8,
        "title": "Visa Assistance and Travel Insurance",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Government visa fees, application-centre charges and completed processing services may be non-refundable once incurred."
          },
          {
            "type": "paragraph",
            "text": "Visa rejection, delayed processing or a change in immigration requirements does not automatically make other confirmed travel services refundable. We will assess the cancellation rules applicable to each affected service."
          },
          {
            "type": "paragraph",
            "text": "Travel-insurance premiums and cancellation rights are governed by the insurer's policy and applicable law."
          },
          {
            "type": "paragraph",
            "text": "If an application or policy has not yet been submitted or activated, we will assess whether the corresponding payment remains recoverable."
          }
        ]
      },
      {
        "number": 9,
        "title": "Changes Rather Than Cancellations",
        "blocks": [
          {
            "type": "paragraph",
            "text": "We understand that travellers may prefer to postpone or modify their journey."
          },
          {
            "type": "paragraph",
            "text": "Where requested, we will explore alternative dates, accommodation, routes or other arrangements."
          },
          {
            "type": "paragraph",
            "text": "Changes remain subject to availability, fare differences, supplier restrictions and any applicable service fees."
          },
          {
            "type": "paragraph",
            "text": "We will communicate the proposed cost and conditions before proceeding."
          },
          {
            "type": "paragraph",
            "text": "A booking credit or postponement will be offered only on clearly explained terms and will not be treated as an automatic substitute for a cash refund where a cash refund is legally due."
          }
        ]
      },
      {
        "number": 10,
        "title": "Missed Departures and Unused Services",
        "blocks": [
          {
            "type": "paragraph",
            "text": "A traveller who does not arrive for a scheduled flight, hotel stay, transfer or activity may be treated as a no-show under the relevant supplier conditions."
          },
          {
            "type": "paragraph",
            "text": "If a journey is shortened or a service is voluntarily not used, any refund will depend on what remains recoverable from the supplier and any applicable legal entitlement."
          },
          {
            "type": "paragraph",
            "text": "We will assist with reasonable recovery requests where possible."
          }
        ]
      },
      {
        "number": 11,
        "title": "If MadrasTrails Cannot Deliver an Arrangement",
        "blocks": [
          {
            "type": "paragraph",
            "text": "If MadrasTrails cannot confirm a requested booking after receiving payment, we will explain the situation and offer available alternatives or refund amounts for services that were not confirmed, subject to any separately agreed and already delivered planning service."
          },
          {
            "type": "paragraph",
            "text": "If MadrasTrails cancels a confirmed arrangement or a material part of it, we will explain the reason and the options available."
          },
          {
            "type": "paragraph",
            "text": "Where a refund is legally due because of non-delivery or deficient service attributable to MadrasTrails, we will not rely on a blanket non-refundable clause to deny that remedy."
          }
        ]
      },
      {
        "number": 12,
        "title": "Unexpected Events and Travel Disruption",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Natural disasters, severe weather, government restrictions, major transport interruptions and similar circumstances may affect travel."
          },
          {
            "type": "paragraph",
            "text": "In these situations, we will seek information from suppliers, communicate alternatives and pursue available refunds, waivers or credits."
          },
          {
            "type": "paragraph",
            "text": "The amount recoverable may differ between flights, accommodation and other components."
          },
          {
            "type": "paragraph",
            "text": "We will not promise a full refund where the legal or contractual entitlement has not been established, nor will we automatically refuse a refund solely because an event was beyond our control."
          }
        ]
      },
      {
        "number": 13,
        "title": "Refund Processing and Communication",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Once the refundable amount is determined and the relevant funds are available for disbursement, MadrasTrails aims to initiate the approved refund within 10 working days, subject to any shorter period required by law."
          },
          {
            "type": "paragraph",
            "text": "Where supplier reimbursement remains outstanding, we will communicate that dependency and provide periodic progress updates."
          },
          {
            "type": "paragraph",
            "text": "Banking or payment-provider settlement may require additional time after a refund is initiated."
          },
          {
            "type": "paragraph",
            "text": "Refunds will ordinarily be made to the original payer and payment method, unless another lawful arrangement is verified and agreed."
          }
        ]
      },
      {
        "number": 14,
        "title": "International Payments, Exchange Rates and Taxes",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Foreign-currency supplier refunds may be affected by exchange-rate differences and actual bank conversion charges."
          },
          {
            "type": "paragraph",
            "text": "Where a refund involves GST, TCS or other statutory amounts, the treatment will follow applicable tax law and the relevant accounting or tax-credit process."
          },
          {
            "type": "paragraph",
            "text": "We will explain the calculation rather than assume that every tax or statutory collection is automatically refundable in cash."
          }
        ]
      },
      {
        "number": 15,
        "title": "Reviewing a Refund Decision",
        "blocks": [
          {
            "type": "paragraph",
            "text": "If you believe a cancellation charge or refund calculation is incorrect, please contact us with your booking reference and supporting details."
          },
          {
            "type": "paragraph",
            "text": "Refund support: info@madrastrails.in"
          },
          {
            "type": "paragraph",
            "text": "Grievance contact: Geetha Devsingh, Proprietor — info@madrastrails.in"
          },
          {
            "type": "paragraph",
            "text": "We will review the applicable supplier conditions, payments, recoveries and agreed terms and provide an explanation."
          },
          {
            "type": "paragraph",
            "text": "This policy does not restrict any statutory right to seek a refund, compensation or other remedy through the appropriate consumer or legal forum."
          }
        ]
      },
      {
        "number": 16,
        "title": "Our Commitment",
        "blocks": [
          {
            "type": "paragraph",
            "text": "We believe a travel relationship should remain respectful even when a journey cannot proceed."
          },
          {
            "type": "paragraph",
            "text": "We will strive to communicate promptly, explain charges transparently, pursue legitimate supplier recoveries and treat refund requests with care."
          }
        ]
      }
    ]
  }
}
