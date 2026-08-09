"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  Check,
  Compass,
  Plane,
  Sparkles,
  X,
} from "lucide-react";
import type { TravelService } from "@/lib/services-data";

interface ServicesFieldProps {
  services: TravelService[];
}

interface BoardPiece {
  left: number;
  top: number;
  width: number;
  height: number;
  rotate: number;
  z: number;
  tone: string;
  shadow: string;
  shape: string;
}

interface ArchiveFragment {
  left: number;
  top: number;
  width: number;
  height: number;
  rotate: number;
  z: number;
  variant: "paper" | "photo" | "note" | "stamp" | "ticket" | "map";
  label: string;
  image?: string;
}

const ease = [0.22, 1, 0.36, 1] as const;
type LightPhase = "off" | "flickering" | "on";

type ServiceGuide = {
  idealFor: string
  promise: string
  destinations: string[]
  arrangements: string[]
}

const serviceGuides: ServiceGuide[] = [
  {
    idealFor: "Complex routes, premium cabins and travellers who want every connection handled.",
    promise:
      "We compare sensible flight paths—not only the cheapest fare—then coordinate timings, baggage, seats and airport assistance around the wider journey.",
    destinations: ["Japan via Singapore", "Maldives", "Europe multi-city", "East Africa"],
    arrangements: [
      "Premium cabin and fare guidance",
      "Multi-city and open-jaw routing",
      "Seat, baggage and meal requests",
      "Airport assistance and transfers",
    ],
  },
  {
    idealFor: "First-time international travellers, families and multi-country itineraries.",
    promise:
      "We turn visa preparation into a clear checklist, review the travel sequence and help organise the documents required for each application.",
    destinations: ["Schengen Europe", "Japan", "United Kingdom", "United Arab Emirates"],
    arrangements: [
      "Country-specific document checklist",
      "Appointment and timeline guidance",
      "Application review support",
      "Travel-document coordination",
    ],
  },
  {
    idealFor: "Couples, families and slow travellers who want to unpack once and explore several places.",
    promise:
      "We match the ship, cabin and sailing style to you, then build the pre-cruise and post-cruise journey so the voyage feels complete.",
    destinations: ["Mediterranean", "Norwegian Fjords", "Alaska", "French Polynesia"],
    arrangements: [
      "Cruise line and cabin selection",
      "Private shore experiences",
      "Port transfers and hotel stays",
      "Pre- and post-cruise extensions",
    ],
  },
  {
    idealFor: "International journeys, adventure travel, senior travellers and family holidays.",
    promise:
      "We help you understand suitable protection for the actual itinerary—from medical cover and cancellations to activities and baggage.",
    destinations: ["Schengen Europe", "Japan", "New Zealand", "African safaris"],
    arrangements: [
      "Policy comparison and guidance",
      "Medical and cancellation cover",
      "Adventure-activity review",
      "Claims-document support",
    ],
  },
  {
    idealFor: "Honeymoons, anniversaries, proposals and private celebrations.",
    promise:
      "We design the trip around how you want to feel—quiet, adventurous, indulgent or culturally immersive—rather than offering one standard romance package.",
    destinations: ["Maldives", "Seychelles", "Mauritius", "Italy & Greece"],
    arrangements: [
      "Private villas and romantic stays",
      "Sunset cruises and private dining",
      "Couple-led cultural experiences",
      "Surprises, proposals and celebrations",
    ],
  },
  {
    idealFor: "Founders, executives, incentive groups and teams travelling on tight schedules.",
    promise:
      "We coordinate the practical details behind business travel so guests can focus on the purpose of the trip, not the logistics.",
    destinations: ["Dubai", "Singapore", "London", "Europe multi-city"],
    arrangements: [
      "Time-efficient flight planning",
      "Executive hotels and meeting access",
      "Airport and city transfers",
      "Group movements and contingency plans",
    ],
  },
  {
    idealFor: "Families, friends, clubs and private groups who want shared experiences without rigid touring.",
    promise:
      "We balance group coordination with personal freedom, using private guides, comfortable transport and a pace that suits everyone.",
    destinations: ["Japan", "Vietnam & Cambodia", "Central Europe", "Kenya & Tanzania"],
    arrangements: [
      "Private guides and group transport",
      "Age-friendly daily pacing",
      "Rooming and dining coordination",
      "Optional activities within the group",
    ],
  },
  {
    idealFor: "Travellers seeking private access, local insight and memorable moments beyond standard sightseeing.",
    promise:
      "We connect the itinerary with trusted local hosts, specialists and guides who can make a destination feel personal.",
    destinations: ["Kyoto", "Rome", "Marrakech", "Cape Town"],
    arrangements: [
      "Private cultural encounters",
      "Local hosts and specialist guides",
      "Restaurant and event access",
      "Celebrations and special requests",
    ],
  },
  {
    idealFor: "Travellers who want one complete, personalised journey designed from the ground up.",
    promise:
      "We bring flights, stays, experiences, transfers and pacing into one coherent plan built around your interests and comfort.",
    destinations: ["New Zealand", "Iceland", "Bhutan", "Portugal"],
    arrangements: [
      "End-to-end itinerary design",
      "Handpicked stays and experiences",
      "Daily pacing and route planning",
      "One point of contact throughout",
    ],
  },
]


const boardPieces: BoardPiece[] = [
  {
    left: 5,
    top: 8,
    width: 37,
    height: 20,
    rotate: -3.2,
    z: 42,
    tone: "bg-[#f6ead4] text-[#241910]",
    shadow: "0 18px 36px rgba(0,0,0,.34)",
    shape: "polygon(0 4%,100% 0,98% 100%,2% 96%)",
  },
  {
    left: 41,
    top: 2,
    width: 15,
    height: 36,
    rotate: 2.8,
    z: 38,
    tone: "bg-[#f5ead6] text-[#21170f]",
    shadow: "0 18px 36px rgba(0,0,0,.34)",
    shape: "polygon(4% 0,100% 3%,96% 100%,0 95%)",
  },
  {
    left: 67,
    top: 4,
    width: 27,
    height: 39,
    rotate: -3.4,
    z: 46,
    tone: "bg-[#101827] text-[#faf3e2]",
    shadow: "0 18px 36px rgba(0,0,0,.34)",
    shape: "polygon(0 0,96% 3%,100% 96%,4% 100%)",
  },
  {
    left: 5,
    top: 36,
    width: 20,
    height: 42,
    rotate: 3.1,
    z: 35,
    tone: "bg-[#f4ead7] text-[#21170f]",
    shadow: "0 18px 36px rgba(0,0,0,.34)",
    shape: "polygon(3% 0,100% 2%,95% 96%,0 100%)",
  },
  {
    left: 29,
    top: 37,
    width: 28,
    height: 25,
    rotate: -3.5,
    z: 45,
    tone: "bg-[#f6ead5] text-[#21170f]",
    shadow: "0 18px 36px rgba(0,0,0,.34)",
    shape: "polygon(0 6%,96% 0,100% 92%,5% 100%)",
  },
  {
    left: 61,
    top: 42,
    width: 34,
    height: 22,
    rotate: 2.1,
    z: 40,
    tone: "bg-[#f0e6d4] text-[#21170f]",
    shadow: "0 18px 36px rgba(0,0,0,.34)",
    shape: "polygon(0 2%,100% 0,97% 100%,3% 96%)",
  },
  {
    left: 6,
    top: 65,
    width: 31,
    height: 25,
    rotate: -2.8,
    z: 39,
    tone: "bg-[#eadfc9] text-[#21170f]",
    shadow: "0 18px 36px rgba(0,0,0,.34)",
    shape: "polygon(2% 0,100% 4%,96% 100%,0 94%)",
  },
  {
    left: 40,
    top: 66,
    width: 29,
    height: 28,
    rotate: 2.7,
    z: 43,
    tone: "bg-[#f2e7d2] text-[#21170f]",
    shadow: "0 18px 36px rgba(0,0,0,.34)",
    shape: "polygon(0 0,100% 3%,97% 95%,8% 100%,0 88%)",
  },
  {
    left: 73,
    top: 70,
    width: 22,
    height: 25,
    rotate: -2.4,
    z: 41,
    tone: "bg-[#f4e8d2] text-[#21170f]",
    shadow: "0 18px 36px rgba(0,0,0,.34)",
    shape: "polygon(0 0,94% 0,100% 12%,97% 100%,4% 97%)",
  },
];

const deskScraps = [
  { left: 0, top: 1, width: 17, height: 14, rotate: -8, z: 8, src: "/images/services/torn-paper-1.webp" },
  { left: 20, top: 0, width: 14, height: 19, rotate: 7, z: 7, src: "/images/services/torn-paper-3.webp" },
  { left: 55, top: 1, width: 16, height: 13, rotate: 9, z: 7, src: "/images/services/torn-paper-4.webp" },
  { left: 88, top: 16, width: 14, height: 20, rotate: -10, z: 9, src: "/images/services/torn-paper-6.webp" },
  { left: -2, top: 52, width: 16, height: 18, rotate: 11, z: 8, src: "/images/services/torn-paper-7.webp" },
  { left: 22, top: 55, width: 15, height: 13, rotate: 6, z: 19, src: "/images/services/handwritten-note-1.webp" },
  { left: 51, top: 55, width: 13, height: 16, rotate: -9, z: 18, src: "/images/services/handwritten-note-2.webp" },
  { left: 84, top: 58, width: 15, height: 13, rotate: 8, z: 8, src: "/images/services/torn-paper-8.webp" },
  { left: 3, top: 86, width: 10, height: 10, rotate: -5, z: 20, src: "/images/services/postage-stamp-1.webp" },
  { left: 34, top: 86, width: 8, height: 9, rotate: 9, z: 20, src: "/images/services/postage-stamp-4.webp" },
  { left: 94, top: 80, width: 7, height: 9, rotate: -7, z: 20, src: "/images/services/postage-stamp-5.webp" },
  { left: 14, top: 28, width: 12, height: 12, rotate: 14, z: 12, src: "/images/services/torn-paper-5.webp" },
  { left: 37, top: 28, width: 10, height: 10, rotate: -12, z: 12, src: "/images/services/postage-stamp-3.webp" },
  { left: 58, top: 27, width: 11, height: 12, rotate: 10, z: 11, src: "/images/services/torn-paper-1.webp" },
  { left: 76, top: 35, width: 15, height: 10, rotate: -8, z: 19, src: "/images/services/masking-tape-1.webp" },
  { left: 16, top: 77, width: 12, height: 9, rotate: 8, z: 18, src: "/images/services/masking-tape-2.webp" },
] as const;

const archiveFragments: ArchiveFragment[] = [
  { left: -4, top: 18, width: 23, height: 34, rotate: 3, z: 3, variant: "map", label: "terminal plan" },
  { left: -1, top: 4, width: 15, height: 22, rotate: -7, z: 5, variant: "paper", label: "old fare list" },
  { left: 9, top: 0, width: 13, height: 15, rotate: 5, z: 10, variant: "photo", label: "runway", image: "/images/services/luxury-flight.jpg" },
  { left: 18, top: 18, width: 9, height: 18, rotate: -4, z: 12, variant: "ticket", label: "private transfer" },
  { left: 19, top: -3, width: 17, height: 22, rotate: -3, z: 4, variant: "paper", label: "airline timetable" },
  { left: 31, top: 0, width: 13, height: 24, rotate: -8, z: 6, variant: "map", label: "coastal route" },
  { left: 36, top: 17, width: 9, height: 13, rotate: 12, z: 14, variant: "stamp", label: "entry" },
  { left: 49, top: -2, width: 12, height: 16, rotate: 6, z: 9, variant: "paper", label: "customs copy" },
  { left: 58, top: 10, width: 9, height: 18, rotate: -11, z: 12, variant: "note", label: "We handle the paperwork." },
  { left: 64, top: 1, width: 11, height: 17, rotate: 9, z: 7, variant: "ticket", label: "deck access" },
  { left: 79, top: 0, width: 14, height: 17, rotate: 5, z: 9, variant: "photo", label: "deck light", image: "/images/services/luxury-resort.webp" },
  { left: 92, top: 3, width: 11, height: 22, rotate: -9, z: 6, variant: "paper", label: "cabin brief" },
  { left: 0, top: 30, width: 11, height: 24, rotate: 8, z: 10, variant: "map", label: "region map" },
  { left: 17, top: 30, width: 16, height: 20, rotate: -6, z: 13, variant: "paper", label: "travel notes" },
  { left: 23, top: 43, width: 9, height: 14, rotate: 9, z: 22, variant: "note", label: "Coverage that travels with you." },
  { left: 34, top: 33, width: 9, height: 16, rotate: -13, z: 11, variant: "paper", label: "hotel brief" },
  { left: 44, top: 28, width: 14, height: 19, rotate: 7, z: 10, variant: "paper", label: "romance is not rushed" },
  { left: 52, top: 38, width: 8, height: 13, rotate: -14, z: 23, variant: "stamp", label: "mailed" },
  { left: 56, top: 48, width: 12, height: 23, rotate: 5, z: 13, variant: "ticket", label: "meeting pass" },
  { left: 72, top: 29, width: 12, height: 16, rotate: -8, z: 12, variant: "note", label: "On time. Every time. Everywhere." },
  { left: 84, top: 43, width: 14, height: 18, rotate: 7, z: 12, variant: "photo", label: "airport lounge", image: "/images/services/accommodation/family-airport.jpg" },
  { left: 96, top: 39, width: 9, height: 20, rotate: -12, z: 7, variant: "paper", label: "flight brief" },
  { left: 93, top: 25, width: 9, height: 15, rotate: 7, z: 14, variant: "note", label: "From oceans to rivers." },
  { left: 0, top: 74, width: 14, height: 22, rotate: -5, z: 7, variant: "map", label: "regional map" },
  { left: -3, top: 62, width: 17, height: 23, rotate: 7, z: 4, variant: "paper", label: "railway guide" },
  { left: 24, top: 85, width: 12, height: 14, rotate: 8, z: 22, variant: "photo", label: "group walk", image: "/images/services/concierge/local-guide-tour-2.jpg" },
  { left: 32, top: 65, width: 11, height: 20, rotate: -9, z: 12, variant: "paper", label: "local ledger" },
  { left: 51, top: 72, width: 10, height: 20, rotate: 10, z: 13, variant: "paper", label: "event copy" },
  { left: 62, top: 60, width: 9, height: 14, rotate: -6, z: 18, variant: "ticket", label: "guest wave" },
  { left: 70, top: 83, width: 12, height: 15, rotate: -12, z: 20, variant: "note", label: "Details make legends." },
  { left: 76, top: 58, width: 8, height: 20, rotate: 4, z: 11, variant: "paper", label: "currency sheet" },
  { left: 85, top: 64, width: 11, height: 25, rotate: 8, z: 18, variant: "paper", label: "wander list" },
  { left: 91, top: 76, width: 12, height: 18, rotate: -5, z: 23, variant: "photo", label: "island stay", image: "/images/services/accommodation/maldives-overwater-villa.jpg" },
  { left: 41, top: 90, width: 16, height: 12, rotate: 3, z: 8, variant: "ticket", label: "restaurant clipping" },
];

function Monogram({ compact = false }: { compact?: boolean }) {
  return (
    <div
      className={`relative grid place-items-center border border-[#c99a39]/70 text-[#d8af58] ${compact ? "h-9 w-9" : "h-14 w-14"}`}
    >
      <span className="absolute inset-[18%] rotate-45 border border-[#c99a39]/55" />
      <Compass size={compact ? 17 : 25} strokeWidth={1.15} />
    </div>
  );
}

function Tape({ className = "" }: { className?: string }) {
  return (
    <span
      className={`pointer-events-none absolute h-5 w-24 bg-[#d8c39b]/70 shadow-[0_7px_15px_rgba(0,0,0,.16)] backdrop-blur-[1px] ${className}`}
    />
  );
}

function Pin({ className = "" }: { className?: string }) {
  return (
    <span
      className={`pointer-events-none absolute h-3 w-3 rounded-full bg-[#bb8c31] shadow-[0_3px_8px_rgba(0,0,0,.28)] ${className}`}
    />
  );
}

function ServiceDocument({ service, index }: { service: TravelService; index: number }) {
  switch (index) {
    case 0:
      return (
        <div className="relative z-10 flex h-full flex-col justify-center gap-8">
          <div className="absolute bottom-3 right-6 flex h-10 w-28 items-end gap-[3px]" aria-hidden="true">
            {Array.from({ length: 18 }).map((_, line) => (
              <span key={line} className={`${line % 3 === 0 ? "h-9" : line % 2 === 0 ? "h-7" : "h-5"} w-px bg-[#241910]/42`} />
            ))}
          </div>
          <div className="flex items-start justify-between gap-5">
            <div>
              <p className="mt-ui text-[.52rem] tracking-[.28em] text-[#8a6323]">BOARDING PASS</p>
              <p className="mt-ui mt-1 text-[.46rem] tracking-[.2em] text-[#25190f]/48">{service.number} / FLIGHT BOOKINGS</p>
              <h3 className="mt-display mt-2 text-[clamp(1.45rem,2.25vw,2.85rem)] leading-[.84] tracking-[-.035em]">
                {service.title}
              </h3>
              <div className="mt-2 h-px w-16 bg-gradient-to-r from-[#b7893e]/60 to-transparent" />
            </div>
            <Plane size={20} strokeWidth={1.15} className="text-[#8a6323]" />
          </div>
          <div className="grid grid-cols-[1fr_auto_1fr] items-end gap-5 border-t border-[#25190f]/15 pt-3">
            <div>
              <p className="mt-ui text-[.48rem] tracking-[.22em] text-[#25190f]/44">FROM</p>
              <p className="mt-display-soft text-2xl">MAA</p>
              <p className="mt-ui mt-1 text-[.45rem] tracking-[.16em] text-[#25190f]/42">14 MAY</p>
            </div>
            <div className="mb-6 h-px w-20 bg-[#8a6323]/42" />
            <div className="text-right">
              <p className="mt-ui text-[.48rem] tracking-[.22em] text-[#25190f]/44">TO</p>
              <p className="mt-display-soft text-2xl">ANY</p>
              <p className="mt-ui mt-1 text-[.45rem] tracking-[.16em] text-[#25190f]/42">GATE 06 / 2A</p>
            </div>
          </div>
        </div>
      );

    case 1:
      return (
        <div className="relative z-10 flex h-full flex-col justify-between">
          <div>
            <p className="mt-ui text-[.5rem] tracking-[.25em] text-[#8a6323]">{service.number} / VISA ASSISTANCE</p>
            <p className="mt-ui mt-1 text-[.46rem] tracking-[.22em] text-[#25190f]/42">VISA / ENTRY</p>
          </div>
          <div className="relative mx-auto h-24 w-20 border border-[#25190f]/15 bg-[#8a6323]/10">
            <span className="absolute inset-4 rounded-full border border-[#8a6323]/35" />
            <span className="absolute bottom-4 left-3 right-3 rounded-sm border border-[#8a6323]/35 py-1 text-center text-[.45rem] tracking-[.18em] text-[#8a6323] rotate-[-8deg]">
              APPROVED
            </span>
          </div>
          <div className="space-y-1.5">
            <span className="block h-px bg-[#25190f]/16" />
            <span className="block h-px w-4/5 bg-[#25190f]/12" />
            <span className="block h-px w-2/3 bg-[#25190f]/10" />
          </div>
          <h3 className="mt-display text-[clamp(1.35rem,2.15vw,2.5rem)] leading-[.88] tracking-[-.03em]">
            {service.title}
          </h3>
        </div>
      );

    case 2:
      return (
        <div className="relative z-10 h-full">
          <Image
  src="/images/services/luxury-cruise.jpg"
  alt=""
  fill
  sizes="(max-width: 767px) min(544px, calc(100vw - 32px)), (min-width: 1536px) 405px, 27vw"
  className="object-cover"
/>
          <div className="absolute inset-0 opacity-30 [background-image:repeating-linear-gradient(0deg,rgba(255,255,255,.035)_0,rgba(255,255,255,.035)_1px,transparent_1px,transparent_5px)]" />
          <svg className="absolute inset-0 h-full w-full opacity-20" viewBox="0 0 420 520" fill="none" aria-hidden="true">
            <path d="M-20 370 C70 292 138 410 222 302 C285 220 350 242 444 160" stroke="#d8af58" strokeWidth="1.2" />
            <path d="M24 210 C92 175 138 205 178 154 C230 88 315 96 378 42" stroke="#f8f3e8" strokeWidth=".8" opacity=".6" />
            <path d="M72 72 L118 440 M238 18 L210 510 M340 60 L306 480" stroke="#f8f3e8" strokeWidth=".7" opacity=".35" />
            <path d="M316 124 l30 12 -30 12 8 -12 -8 -12Z" fill="#d8af58" opacity=".55" />
          </svg>
          <div className="absolute inset-0 border border-white/10" />
          <div className="absolute inset-x-5 top-5 flex justify-between">
            <p className="mt-ui text-[.52rem] tracking-[.27em] text-[#f8f3e8]">VOYAGE</p>
            <p className="mt-ui text-[.52rem] tracking-[.22em] text-[#d8af58]">{service.number}</p>
          </div>
    
          <h3 className="mt-display absolute bottom-5 left-5 right-5 text-[clamp(2.1rem,4vw,4.8rem)] leading-[.78] tracking-[-.05em] text-[#faf7f0]">
            {service.title}
          </h3>
        </div>
      );

    case 3:
      return (
        <div className="relative z-10 flex h-full flex-col gap-3">
          <div className="relative h-[34%] overflow-hidden bg-[#160f0a]">
            <Image
              src="/images/services/accommodation/traveller-sunset.jpg"
              alt=""
              fill
              sizes="(min-width: 1024px) 18vw, 80vw"
              className="object-cover saturate-[.75]"
              style={{ objectPosition: "center 45%" }}
            />
          </div>
          <div className="grid flex-1 grid-cols-[.8fr_1fr] gap-3">
            <div className="border-r border-[#25190f]/12 pr-2">
              <p className="mt-ui mb-4 text-[.48rem] tracking-[.22em] text-[#8a6323]">{service.number} / INSURANCE</p>
              <div className="space-y-2">
                {Array.from({ length: 12 }).map((_, line) => (
                  <span key={line} className="block h-px bg-[#25190f]/14" />
                ))}
              </div>
            </div>
            <div className="flex flex-1 flex-col justify-between">
              <p className="mt-ui text-[.48rem] tracking-[.22em] text-[#8a6323]">TRAVEL PROTECTION</p>
              <h3 className="mt-display text-[clamp(1.28rem,2vw,2.25rem)] leading-[.9] tracking-[-.03em]">
                {service.title}
              </h3>
              <p className="mt-body-copy text-[.62rem] leading-relaxed text-[#25190f]/56">{service.shortDescription}</p>
            </div>
          </div>
        </div>
      );

    case 4:
      return (
        <div className="relative z-10 flex h-full gap-5">
          <div className="relative h-full w-[48%] overflow-hidden bg-[#160f0a]">
            <Image
              src="/images/services/beach-sunset.webp"
              alt=""
              fill
              sizes="(min-width: 1024px) 13vw, 70vw"
              className="object-cover saturate-[.9]"
              style={{ objectPosition: "center 50%" }}
            />
          </div>
          <div className="flex flex-1 flex-col justify-between">
            <p className="mt-ui text-[.48rem] tracking-[.22em] text-[#8a6323]">{service.number} / HONEYMOONS</p>
            <p className="font-[var(--font-signature)] text-[clamp(1.25rem,1.65vw,1.8rem)] leading-none text-[#25190f]/58">To the beginning of forever.</p>
            <h3 className="mt-display text-[clamp(1.75rem,2.55vw,2.9rem)] leading-[.84] tracking-[-.04em]">
              {service.title}
            </h3>
            <p className="mt-body-copy text-[.6rem] leading-snug text-[#25190f]/55">Curated escapes. Timeless memories.</p>
          </div>
        </div>
      );

    case 5:
      return (
        <div className="relative z-10 flex h-full flex-col justify-between">
          <div className="flex items-start justify-between border-b border-[#25190f]/12 pb-3">
            <p className="mt-ui text-[.5rem] tracking-[.25em] text-[#8a6323]">{service.number} / EXECUTIVE ITINERARY</p>
            <span className="h-8 w-8 rounded-full border border-[#8a6323]/35" />
          </div>
          <h3
  className="mt-display text-[clamp(1.7rem,2.8vw,3.35rem)] leading-[.86] tracking-[-.035em]"
  style={{ transform: "translate(10px, -10px)" }}
>
  {service.title}
</h3>
          <div className="space-y-2 text-[.52rem] text-[#25190f]/54">
            <div className="grid grid-cols-[3.5rem_1fr_auto] gap-3">
              <span>08:10</span>
              <span>Airport meet</span>
              <span>OK</span>
            </div>
            <div className="grid grid-cols-[3.5rem_1fr_auto] gap-3">
              <span>12:40</span>
              <span>Boardroom transfer</span>
              <span>VIP</span>
            </div>
          </div>
        </div>
      );

    case 6:
      return (
        <div className="relative z-10 h-full overflow-hidden">
          <div className="absolute right-4 top-4 h-24 w-32 overflow-hidden bg-[#160f0a]">
            <Image
              src="/images/services/concierge/local-guide-tour.webp"
              alt=""
              fill
              sizes="12vw"
              className="object-cover saturate-[.76]"
              style={{ objectPosition: "center" }}
            />
          </div>
          <svg className="absolute inset-0 h-full w-full opacity-70" viewBox="0 0 420 250" fill="none" aria-hidden="true">
            <path d="M28 206 C95 103 145 178 201 78 C246 0 318 50 392 24" stroke="#8a6323" strokeWidth="1.4" strokeLinecap="round" />
            <path d="M58 18 L102 234 M192 8 L213 238 M312 19 L268 238" stroke="#25190f" strokeWidth=".8" opacity=".14" />
            <circle cx="28" cy="206" r="6" fill="#8a6323" />
            <circle cx="201" cy="78" r="5" fill="#8a6323" opacity=".75" />
            <circle cx="392" cy="24" r="6" fill="#8a6323" />
          </svg>
          <div className="relative flex h-full flex-col justify-between">
            <p className="mt-ui text-[.5rem] tracking-[.25em] text-[#8a6323]">{service.number} / GROUP TOURS</p>
            <h3
  className="mt-display max-w-[12rem] text-[clamp(1.55rem,2.45vw,2.9rem)] leading-[.86] tracking-[-.04em]"
  style={{ transform: "translateY(-14px)" }}
>
  {service.title}
</h3>
          </div>
        </div>
      );

    case 7:
      return (
        <div className="relative z-10 flex h-full gap-4">
          <div className="relative h-full w-[56%] overflow-hidden bg-[#160f0a]">
            <Image
              src="/images/services/concierge/italian-outdoor-dinner.webp"
              alt=""
              fill
              sizes="(min-width: 1024px) 15vw, 80vw"
              className="object-cover saturate-[.82]"
              style={{ objectPosition: "center 50%" }}
            />
          </div>
          <div className="flex flex-1 flex-col justify-between border-l border-[#25190f]/12 pl-3">
            <p className="mt-ui text-[.48rem] tracking-[.22em] text-[#8a6323]">{service.number} / PHOTO FEATURE</p>
            <h3 className="mt-display text-[clamp(1.18rem,1.9vw,2.15rem)] leading-[.9] tracking-[-.035em]">
              {service.title}
            </h3>
          </div>
        </div>
      );

    default:
      return (
        <div className="relative z-10 flex h-full flex-col justify-between">
          <div className="absolute inset-0 -z-10 translate-x-2 translate-y-2 bg-[#dbc9aa] opacity-85" />
          <div className="flex items-center justify-between">
            <p className="mt-ui text-[.5rem] tracking-[.25em] text-[#8a6323]">{service.number}</p>
            <p className="mt-ui text-[.48rem] tracking-[.2em] text-[#25190f]/46">PLANNING FOLDER</p>
          </div>
          <div className="-mx-1 h-12 border-y border-[#25190f]/12 bg-[#8a6323]/9">
            <div className="grid h-full grid-cols-4">
              <span className="border-r border-[#25190f]/10" />
              <span className="border-r border-[#25190f]/10" />
              <span className="border-r border-[#25190f]/10" />
              <span />
            </div>
          </div>
          <h3 className="mt-display text-[clamp(1.7rem,2.75vw,3.15rem)] leading-[.84] tracking-[-.04em]">
            {service.title}
          </h3>
          <div className="space-y-1.5 text-[.55rem] text-[#25190f]/56">
            <p>Day pace / private</p>
            <p>Stay style / considered</p>
            <p>Access / arranged</p>
          </div>
        </div>
      );
  }
}

function BoardServicePiece({
  service,
  index,
  onOpen,
}: {
  service: TravelService;
  index: number;
  onOpen: () => void;
}) {
  const prefersReducedMotion = useReducedMotion();
  const piece = boardPieces[index];

  return (
    <>
      {index === 5 ? (
        <motion.div
          aria-hidden="true"
          className="absolute bg-[#172015] shadow-[0_28px_58px_rgba(0,0,0,.42)]"
          style={{
            left: `${piece.left + 1.2}%`,
            top: `${piece.top + 1.8}%`,
            width: `${piece.width}%`,
            height: `${piece.height}%`,
            zIndex: piece.z - 1,
            clipPath: "polygon(0 2%,100% 0,97% 100%,3% 96%)",
            transformOrigin: "center",
          }}
          initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 16, rotate: piece.rotate + 1.4 }}
          whileInView={prefersReducedMotion ? { opacity: 0.9 } : { opacity: 0.9, y: 0, rotate: piece.rotate + 1.4 }}
          transition={{
  opacity: {
    duration: 0.55,
    delay: index * 0.04,
    ease,
  },
  y: {
    type: "spring",
    stiffness: 620,
    damping: 30,
    mass: 0.38,
  },
  rotate: {
    type: "spring",
    stiffness: 560,
    damping: 28,
    mass: 0.4,
  },
  boxShadow: {
    duration: 0.14,
    ease: "easeOut",
  },
}}
          viewport={{ once: true, amount: 0.2 }}
        />
      ) : null}
      <motion.button
  type="button"
  onClick={onOpen}
        aria-label={`Open ${service.title}`}
        className={`group absolute flex min-w-0 flex-col overflow-hidden text-left outline-none focus-visible:ring-2 focus-visible:ring-[#d4af37]/70 ${
  index === 2 ? "p-1.5 md:p-2" : "p-4 md:p-5"
} ${piece.tone}`}
        style={{
          left: `${piece.left}%`,
          top: `${piece.top}%`,
          width: `${piece.width}%`,
          height: `${piece.height}%`,
          zIndex: piece.z,
          clipPath: piece.shape,
          boxShadow: piece.shadow,
          transformOrigin: "center",
        }}
        initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 18, rotate: piece.rotate }}
        whileInView={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0, rotate: piece.rotate }}
        whileHover={
  prefersReducedMotion
    ? undefined
    : {
        y: -10,
        scale: 1.018,
        rotate: Math.max(-2, Math.min(2, piece.rotate * 0.22)),
        boxShadow:
          "0 28px 54px rgba(0,0,0,.42), 0 0 0 1px rgba(212,175,55,.22)",
        transition: {
          type: "spring",
          stiffness: 620,
          damping: 30,
          mass: 0.38,
        },
      }
}
        transition={{ duration: 0.72, delay: index * 0.055, ease }}
        viewport={{ once: true, amount: 0.2 }}
      >
        {index === 0 ? <Tape className="left-10 top-2 rotate-[-4deg]" /> : null}
        {index === 1 ? <Pin className="right-5 top-5" /> : null}
        {index === 2 ? <Tape className="right-8 top-2 rotate-[5deg]" /> : null}
        {index === 3 ? <Tape className="right-1 top-8 rotate-[82deg]" /> : null}
        {index === 4 ? <Image src="/images/services/postage-stamp-3.webp" alt="" width={44} height={52} unoptimized className="pointer-events-none absolute right-4 top-4 z-20 rotate-[8deg] opacity-80" /> : null}
        {index === 5 ? <span className="pointer-events-none absolute right-0 top-0 z-20 h-10 w-10 bg-[linear-gradient(135deg,rgba(36,25,16,.18),rgba(255,255,255,.48)_48%,transparent_50%)]" /> : null}
        {index === 6 ? <Image src="/images/services/paper-clip-1.webp" alt="" width={36} height={58} unoptimized className="pointer-events-none absolute right-5 top-3 z-20 rotate-[12deg] opacity-80" /> : null}
        {index === 7 ? <Tape className="left-2 top-8 rotate-[-80deg]" /> : null}
        {index === 8 ? <Image src="/images/services/push-pin-3.webp" alt="" width={26} height={26} unoptimized className="pointer-events-none absolute right-7 top-5 z-20 opacity-80" /> : null}
        <span className="pointer-events-none absolute inset-x-5 top-0 z-20 h-px bg-gradient-to-r from-transparent via-white/70 to-transparent opacity-70" />
        <ServiceDocument service={service} index={index} />
      </motion.button>
    </>
  );
}

function DeskScrap({ scrap }: { scrap: (typeof deskScraps)[number] }) {
  return (
    <div
      aria-hidden="true"
      className="absolute opacity-42 blur-[.25px]"
      style={{
        left: `${scrap.left}%`,
        top: `${scrap.top}%`,
        width: `${scrap.width}%`,
        height: `${scrap.height}%`,
        zIndex: scrap.z,
        transform: `rotate(${scrap.rotate}deg)`,
      }}
    >
      <Image
        src={scrap.src}
        alt=""
        fill
        unoptimized
        sizes="18vw"
        className="object-contain drop-shadow-[0_18px_24px_rgba(0,0,0,.32)]"
      />
    </div>
  );
}

function ArchiveFragmentPiece({
  fragment,
}: {
  fragment: ArchiveFragment;
}) {
  const isBackground = fragment.z <= 10;
  const shadowOpacity = isBackground ? ".18" : ".28";
  const baseStyle = {
    left: `${fragment.left}%`,
    top: `${fragment.top}%`,
    width: `${fragment.width}%`,
    height: `${fragment.height}%`,
    zIndex: fragment.z,
  };

  if (fragment.variant === "photo" && fragment.image) {
    return (
      <div
        aria-hidden="true"
        className="absolute overflow-hidden border-[6px] border-[#d8c8a8] bg-[#120c08] blur-[.2px]"
        style={baseStyle}
  
      >
        <Image
  src={fragment.image}
  alt=""
  fill
  sizes="18vw"
  loading="lazy"
  quality={70}
  className="object-cover saturate-[.58] brightness-[.68]"
/>
      </div>
    );
  }

  return (
    <div
      aria-hidden="true"
      className={`absolute overflow-hidden p-3 text-[#2b2117] ${
        fragment.variant === "note"
          ? "bg-[#c59b54] blur-[.15px]"
          : fragment.variant === "stamp"
            ? "border border-[#a77d33]/35 bg-[#d9c59a] blur-[.2px]"
            : fragment.variant === "map"
              ? "bg-[#d7ccb7] blur-[.3px]"
              : fragment.variant === "ticket"
                ? "bg-[#eadcc3] blur-[.15px]"
                : "bg-[#d8c8ad] blur-[.25px]"
      }`}
      style={{
        ...baseStyle,
        boxShadow: `0 18px 36px rgba(0,0,0,${shadowOpacity})`,
        clipPath:
          fragment.variant === "stamp"
            ? "polygon(5% 0,95% 0,100% 8%,95% 16%,100% 24%,95% 32%,100% 40%,95% 48%,100% 56%,95% 64%,100% 72%,95% 80%,100% 88%,95% 100%,5% 100%,0 92%,5% 84%,0 76%,5% 68%,0 60%,5% 52%,0 44%,5% 36%,0 28%,5% 20%,0 12%)"
            : "polygon(0 3%,98% 0,100% 94%,4% 100%)",
      }}
  
    >
      {fragment.variant === "note" ? (
        <p className="font-[var(--font-signature)] text-[clamp(.9rem,1.25vw,1.45rem)] leading-[.95] text-[#2b2117]/54">
          {fragment.label}
        </p>
      ) : fragment.variant === "map" ? (
        <>
          <svg className="absolute inset-0 h-full w-full opacity-55" viewBox="0 0 220 160" fill="none">
            <path d="M22 128 C58 70 92 104 118 48 C140 4 184 35 204 18" stroke="#8a6323" strokeWidth="1.4" />
            <path d="M42 8 L64 150 M130 4 L104 156 M184 18 L164 150" stroke="#2b2117" strokeWidth=".7" opacity=".22" />
            <circle cx="22" cy="128" r="4" fill="#8a6323" />
            <circle cx="118" cy="48" r="4" fill="#8a6323" />
          </svg>
          <p className="relative mt-ui text-[.42rem] tracking-[.18em] text-[#8a6323]">{fragment.label}</p>
        </>
      ) : (
        <>
          <p className="mt-ui text-[.42rem] tracking-[.2em] text-[#8a6323]">{fragment.label}</p>
          <div className="mt-3 space-y-1.5">
            <span className="block h-px bg-[#2b2117]/14" />
            <span className="block h-px w-5/6 bg-[#2b2117]/12" />
            <span className="block h-px w-2/3 bg-[#2b2117]/10" />
          </div>
        </>
      )}
    </div>
  );
}

function SecondaryEphemera() {
  return (
    <>
      <div className="absolute left-[27%] top-[25%] z-[18] h-[10%] w-[15%] rotate-[5deg] bg-[#eadcc3] p-3 text-[#241910] opacity-64 shadow-[0_20px_42px_rgba(0,0,0,.24)]">
        <p className="mt-ui text-[.42rem] tracking-[.2em] text-[#8a6323]">ROOM HOLD</p>
        <div className="mt-3 space-y-1.5">
          <span className="block h-px bg-[#241910]/14" />
          <span className="block h-px w-4/5 bg-[#241910]/12" />
          <span className="block h-px w-2/3 bg-[#241910]/10" />
        </div>
      </div>
      <div className="absolute left-[82%] top-[31%] z-[17] h-[11%] w-[9%] rotate-[8deg] bg-[#f0e5cf] p-3 text-[#241910] opacity-58 shadow-[0_18px_38px_rgba(0,0,0,.24)]">
        <p className="font-[var(--font-signature)] text-[clamp(.9rem,1.2vw,1.3rem)] leading-none text-[#241910]/54">call concierge</p>
        <span className="mt-4 block h-px w-3/4 bg-[#8a6323]/28" />
      </div>
      <div className="absolute left-[25%] top-[67%] z-[16] h-[11%] w-[14%] rotate-[8deg] bg-[#dbc7a7] p-3 text-[#241910] opacity-56 shadow-[0_17px_34px_rgba(0,0,0,.22)]">
        <p className="mt-ui text-[.42rem] tracking-[.2em] text-[#8a6323]">BAG TAG</p>
        <p className="mt-display-soft mt-3 text-2xl leading-none">MT</p>
      </div>
      <div className="absolute left-[57%] top-[82%] z-[22] h-[8%] w-[12%] rotate-[-5deg] border border-[#8a6323]/28 bg-[#eadcc3] p-2 text-[#241910] opacity-62 shadow-[0_16px_32px_rgba(0,0,0,.24)]">
        <p className="mt-ui text-[.4rem] tracking-[.18em] text-[#8a6323]">DINNER / 20:30</p>
        <span className="mt-2 block h-px bg-[#241910]/14" />
      </div>
      <svg className="absolute left-[19%] top-[31%] z-[15] h-[10%] w-[17%] rotate-[-9deg] opacity-55" viewBox="0 0 220 90" fill="none" aria-hidden="true">
        <path d="M8 72 C55 16 101 103 150 26 C169 -4 196 10 213 22" stroke="#c99a39" strokeWidth="2" strokeLinecap="round" />
        <circle cx="8" cy="72" r="5" fill="#c99a39" />
        <circle cx="150" cy="26" r="4" fill="#c99a39" />
        <circle cx="213" cy="22" r="5" fill="#c99a39" />
      </svg>
    </>
  );
}

function StorytellingProps() {
  return (
    <>
      <div className="pointer-events-none absolute left-[45%] top-[50%] z-[25] h-16 w-16 rounded-full border-[10px] border-[#1d120b]/18 opacity-45" />
      <svg className="pointer-events-none absolute inset-0 z-[27] h-full w-full opacity-45" viewBox="0 0 1000 620" fill="none" aria-hidden="true">
        <path d="M175 325 C205 303 248 303 274 332 C241 357 197 354 175 325Z" stroke="#9f2f22" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M742 207 C778 178 830 185 858 224" stroke="#1e4f7a" strokeWidth="2" strokeLinecap="round" />
        <path d="M374 197 L407 184 L398 214" stroke="#9f2f22" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M646 514 C670 495 707 500 725 522" stroke="#1e4f7a" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M518 312 l18 -4 m-11 -8 l4 18" stroke="#9f2f22" strokeWidth="2" strokeLinecap="round" />
      </svg>
      <div className="pointer-events-none absolute left-[46%] top-[49%] z-[28] rotate-[-8deg] font-[var(--font-signature)] text-[1rem] leading-none text-[#1e120c]/38">
        Hidden Gem?
      </div>
      <div className="pointer-events-none absolute right-[16%] bottom-[5%] z-[28] rotate-[7deg] font-[var(--font-signature)] text-[.95rem] leading-none text-[#1e120c]/34">
        Confirmed
      </div>
    </>
  );
}

function DetectiveConnections() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0"
    >
      {/* red strings and pins go here */}
    </div>
  );
}

function DetectiveScrapbookLayer() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 hidden md:block">
      {/*<div className="absolute -left-[7%] top-[2%] z-[4] h-[43%] w-[29%] rotate-[-7deg] opacity-48">
        <Image src="/images/scrapbook/optimized/old-map-fragment.webp" alt="" fill sizes="29vw" loading="lazy" quality={55} className="object-contain" />
      </div>*/}
      {/*<div className="absolute left-[16%] top-[-8%] z-[9] h-[31%] w-[19%] rotate-[5deg] opacity-55">
        <Image src="/images/scrapbook/optimized/news-article-1.webp" alt="" fill sizes="19vw" loading="lazy" quality={55} className="object-contain" />
      </div>*/}
      {/*<div className="absolute right-[17%] top-[-10%] z-[8] h-[32%] w-[16%] rotate-[-68deg] opacity-52">
        <Image src="/images/scrapbook/optimized/news-article-2.webp" alt="" fill sizes="16vw" loading="lazy" quality={55} className="object-contain" />
      </div>*/}
      {/*<div className="absolute right-[-5%] top-[23%] z-[6] h-[34%] w-[20%] rotate-[7deg] opacity-46">
        <Image src="/images/scrapbook/optimized/news-article-3.webp" alt="" fill sizes="20vw" loading="lazy" quality={55} className="object-contain" />
      </div>*/}
      {/*<div className="absolute bottom-[-11%] left-[8%] z-[5] h-[35%] w-[23%] rotate-[4deg] opacity-48">
        <Image src="/images/scrapbook/optimized/news-article-4.webp" alt="" fill sizes="23vw" loading="lazy" quality={55} className="object-contain" />
      </div>*/}
      {/*<div className="absolute left-[2%] top-[45%] z-[26] h-[17%] w-[13%] rotate-[-10deg] opacity-76">
        <Image src="/images/scrapbook/optimized/magnifying-glass.webp" alt="" fill sizes="13vw" loading="lazy" quality={55} className="object-contain" />
      </div>*/}
      {/*<div className="absolute bottom-[4%] left-[35%] z-[24] h-[11%] w-[18%] rotate-[-8deg] opacity-68">
        <Image src="/images/scrapbook/optimized/pencil.webp" alt="" fill sizes="18vw" loading="lazy" quality={55} className="object-contain" />
      </div>*/}
      {/*<div className="absolute left-[31%] top-[1%] z-[20] h-[9%] w-[14%] rotate-[-5deg] opacity-66">
        <Image src="/images/scrapbook/optimized/vecteezy_beige-washi-tape_67165582.webp" alt="" fill sizes="14vw" loading="lazy" quality={55} className="object-contain" />
      </div>*/}
      {/*<div className="absolute right-[7%] top-[14%] z-[25] h-[14%] w-[8%] rotate-[12deg] opacity-72">
        <Image src="/images/scrapbook/optimized/vecteezy_silver-paperclip-perfect-for-office-and-stationery-designs_66969764.webp" alt="" fill sizes="8vw" loading="lazy" quality={55} className="object-contain" />
      </div>*/}
      {/*<div className="absolute bottom-[17%] left-[1%] z-[23] h-[12%] w-[8%] rotate-[-8deg] opacity-70">
        <Image src="/images/scrapbook/optimized/vecteezy_yellow-binder-clip-isolated-design-element_70808748.webp" alt="" fill sizes="8vw" loading="lazy" quality={55} className="object-contain" />
      </div>*/}
      {/*<div className="absolute bottom-[10%] right-[43%] z-[26] h-[12%] w-[8%] rotate-[7deg] opacity-72">
        <Image src="/images/scrapbook/optimized/vecteezy_3d-black-metal-binder-clip_73076346.webp" alt="" fill sizes="8vw" loading="lazy" quality={55} className="object-contain" />
      </div>*/}
    </div>
  );
}

export default function ServicesField({ services }: ServicesFieldProps) {
  const [isPulling, setIsPulling] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const [openService, setOpenService] = useState<TravelService | null>(null);
  const [lightPhase, setLightPhase] = useState<LightPhase>("off");
const [lightLevel, setLightLevel] = useState(0);
const lightTimersRef = useRef<number[]>([]);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const visibleServices = services.slice(0, 9);
  const openServiceIndex = openService
    ? Math.max(
        0,
        visibleServices.findIndex(
          (service) => service.number === openService.number,
        ),
      )
    : 0;
  const openServiceGuide = serviceGuides[openServiceIndex] ?? serviceGuides[8];
  const clearLightTimers = () => {
  lightTimersRef.current.forEach((timer) => window.clearTimeout(timer));
  lightTimersRef.current = [];
};
const startLightSequence = () => {
  if (lightPhase !== "off") return;

  clearLightTimers();

  if (prefersReducedMotion) {
    setLightPhase("on");
    setLightLevel(1);
    return;
  }

  setLightPhase("flickering");
  setLightLevel(0);

  const sequence = [
    { delay: 110, level: 0.82 },
    { delay: 70, level: 0 },
    { delay: 45, level: 0.38 },
    { delay: 135, level: 0 },
    { delay: 35, level: 0.94 },
    { delay: 55, level: 0.08 },
    { delay: 180, level: 0 },
    { delay: 28, level: 0.7 },
    { delay: 42, level: 0 },
    { delay: 95, level: 0.5 },
    { delay: 38, level: 0.12 },
    { delay: 220, level: 0 },
    { delay: 55, level: 0.88 },
    { delay: 80, level: 0.22 },
    { delay: 34, level: 1 },
    { delay: 65, level: 0 },
    { delay: 145, level: 0.76 },
    { delay: 48, level: 0.18 },
    { delay: 90, level: 1 },
  ];

  let elapsed = 0;

  sequence.forEach(({ delay, level }, index) => {
    elapsed += delay;

    const timer = window.setTimeout(() => {
      setLightLevel(level);

      if (index === sequence.length - 1) {
        setLightPhase("on");
        setLightLevel(1);
      }
    }, elapsed);

    lightTimersRef.current.push(timer);
  });
};
useEffect(() => {
  if (!openService) return;

  const onKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      setOpenService(null);
    }
  };

  const scrollY = window.scrollY;

  document.documentElement.style.overflow = "hidden";
  document.body.style.overflow = "hidden";
  document.body.style.position = "fixed";
  document.body.style.top = `-${scrollY}px`;
  document.body.style.width = "100%";

  window.addEventListener("keydown", onKeyDown);
  closeButtonRef.current?.focus();

  return () => {
    document.documentElement.style.overflow = "";
    document.body.style.overflow = "";
    document.body.style.position = "";
    document.body.style.top = "";
    document.body.style.width = "";

    window.scrollTo(0, scrollY);
    window.removeEventListener("keydown", onKeyDown);
  };
}, [openService]);
const toggleLight = () => {
  if (lightPhase === "flickering" || isPulling) return;

  setIsPulling(true);

  window.setTimeout(() => {
    if (lightPhase === "on") {
      lightTimersRef.current.forEach((timer) => window.clearTimeout(timer));
      lightTimersRef.current = [];

      setLightLevel(0);
      setLightPhase("off");
    } else {
      startLightSequence();
    }
  }, 220);

  window.setTimeout(() => {
    setIsPulling(false);
  }, 650);
};


  return (
    <>
      <section
        id="madras-diary"
        aria-labelledby="services-board-title"
        className="relative isolate h-auto overflow-hidden bg-[#170d08] text-[#f8f3e8] md:[--header-height:92px] md:h-[96svh] lg:[--header-height:96px]"
      >
        <div className="absolute inset-0 z-0 bg-[#2a170d] bg-[linear-gradient(rgba(32,16,8,.18),rgba(12,7,4,.5)),url('/images/services/walnut-desk.jpg')] bg-cover bg-center saturate-[.78]" />
        {/* Complete room darkness */}
<div
  aria-hidden="true"
  className="pointer-events-none absolute inset-0 z-[65] bg-black"
  style={{
    opacity: 0.92 - lightLevel * 0.72,
    transition:
      lightPhase === "on"
        ? "opacity 700ms cubic-bezier(0.22, 1, 0.36, 1)"
        : "none",
  }}
/>

{/* Overhead room illumination */}
<div
  aria-hidden="true"
  className="pointer-events-none absolute inset-0 z-[66]"
  style={{
    opacity: lightLevel,
    transition:
      lightPhase === "on"
        ? "opacity 650ms cubic-bezier(0.22, 1, 0.36, 1)"
        : "none",
  }}
>
  <div
    className="absolute inset-[-8%]"
    style={{
      background: `
        radial-gradient(
          ellipse 55% 74% at 50% 35%,
          rgba(255, 232, 190, 0.28) 0%,
          rgba(240, 190, 122, 0.18) 34%,
          rgba(192, 119, 57, 0.08) 66%,
          transparent 82%
        )
      `,
      filter: "blur(26px)",
      mixBlendMode: "screen",
    }}
  />

  <div
    className="absolute inset-0"
    style={{
      background: `
        linear-gradient(
          90deg,
          rgba(0, 0, 0, 0.82) 0%,
          rgba(0, 0, 0, 0.48) 12%,
          rgba(0, 0, 0, 0.08) 32%,
          transparent 44%,
          transparent 56%,
          rgba(0, 0, 0, 0.08) 68%,
          rgba(0, 0, 0, 0.48) 88%,
          rgba(0, 0, 0, 0.82) 100%
        ),
        linear-gradient(
          180deg,
          transparent 46%,
          rgba(0, 0, 0, 0.12) 72%,
          rgba(0, 0, 0, 0.52) 100%
        )
      `,
    }}
  />
</div>

{/* Hanging lantern control */}
<button
  type="button"
  onClick={toggleLight}
  disabled={lightPhase === "flickering" || isPulling}
  aria-label={
    lightPhase === "on"
      ? "Turn off MadrasTrails experience light"
      : "Turn on MadrasTrails experience light"
  }
  className="absolute right-4 top-0 z-[70] disabled:pointer-events-none md:-right-6"
>
  <motion.div
  animate={
  isPulling
    ? {
        rotate: [0, -7.5, 5.8, -4.4, 3.1, -2.1, 1.3, -0.7, 0],
      }
    : {
        rotate: [-5.2, 5.2, -5.2],
      }
}
transition={
  isPulling
    ? {
        duration: 5.2,
        times: [0, 0.12, 0.27, 0.41, 0.55, 0.68, 0.8, 0.91, 1],
        ease: "easeInOut",
      }
    : {
        duration: 8.5,
        repeat: Infinity,
        ease: "easeInOut",
      }
}
  style={{
    transformOrigin: "50% 0%",
  }}
  className="flex flex-col items-center"
>
    {/* Hanging connector */}
    <div className="h-10 w-[3px] rounded-full bg-gradient-to-b from-[#5a4027] via-[#8a6843] to-[#3e2a18] shadow-[0_0_5px_rgba(0,0,0,.5)]" />

    <img
      src="/images/services/services-lantern.png"
      alt="Antique hanging lantern"
      draggable={false}
      className="h-52 w-auto object-contain drop-shadow-[0_14px_22px_rgba(0,0,0,.55)]"
    />
  </motion.div>
</button>
        <h2 id="services-board-title" className="sr-only">
          MadrasTrails services inspiration board
        </h2>

        <div className="relative z-10 mx-auto h-auto min-h-[42rem] w-full max-w-[1500px] px-4 py-5 sm:px-6 md:h-full md:min-h-0 md:px-8 md:py-6 lg:px-10">
          <div className="absolute inset-x-4 top-4 z-[60] flex items-start justify-between gap-6 text-[#f8f3e8]/62 md:inset-x-8 lg:inset-x-10">
            <div>
              <p className="mt-eyebrow text-[.58rem] text-[#f2c85b]">
  THE ART OF THE JOURNEY
</p>

<p className="mt-body-copy mt-1 max-w-xs text-xs leading-relaxed text-[#f8f3e8]/85">
  Nine ways we shape extraordinary travel.
</p>
            </div>
          </div>

          <div className="relative mx-auto mt-12 hidden h-[calc(100%_-_3.25rem)] w-full md:block">
            <DetectiveScrapbookLayer />
            {archiveFragments.map((fragment, index) => (
              <ArchiveFragmentPiece
  key={`${fragment.label}-${index}`}
  fragment={fragment}
/>
            ))}
            {deskScraps.map((scrap, index) => (
              <DeskScrap
  key={`${scrap.src}-${index}`}
  scrap={scrap}
/>
            ))}
            <SecondaryEphemera />
            <Image src="/images/services/paper-clip-2.webp" alt="" width={54} height={72} unoptimized className="pointer-events-none absolute left-[60%] top-[31%] z-[24] rotate-[-13deg] opacity-70 drop-shadow-[0_14px_18px_rgba(0,0,0,.34)]" />
            <Image src="/images/services/masking-tape-1.webp" alt="" width={128} height={34} unoptimized className="pointer-events-none absolute left-[24%] top-[28%] z-[21] rotate-[7deg] opacity-75" />
            <Image src="/images/services/masking-tape-2.webp" alt="" width={118} height={34} unoptimized className="pointer-events-none absolute left-[80%] top-[64%] z-[21] rotate-[-5deg] opacity-75" />
            <Image src="/images/services/passport-stamp-1.webp" alt="" width={84} height={84} unoptimized className="pointer-events-none absolute left-[56%] top-[14%] z-[23] rotate-[13deg] opacity-55" />
            <StorytellingProps />
            <DetectiveConnections />

            {visibleServices.map((service, index) => (
              <BoardServicePiece
                key={service.number}
                service={service}
                index={index}
                onOpen={() => {
  if (lightPhase === "on") setOpenService(service)
}}
              />
            ))}
          </div>

          <div className="relative mx-auto mt-16 grid max-w-md gap-5 pb-12 md:hidden">
  <div className="absolute inset-0 rounded-[1.8rem] border-[10px] border-[#5b321d] bg-[#6f452b] shadow-[inset_0_0_45px_rgba(0,0,0,0.45),0_30px_80px_rgba(0,0,0,0.4)]" />

  <div className="relative space-y-4 p-5">
    {visibleServices.map((service, index) => (
  <motion.button
    key={service.number}
    type="button"
    onClick={() => {
  if (lightPhase === "on") setOpenService(service)
}}
    aria-label={`Open ${service.title}`}
    className={`relative w-full overflow-hidden rounded-sm border border-[#d7c29d]/45 p-5 text-left shadow-[0_14px_28px_rgba(0,0,0,0.28)] ${
      index === 2
        ? "bg-[#101827] text-[#faf3e2]"
        : "bg-[#f4ead7] text-[#21170f]"
    }`}
    style={{
      transform: `rotate(${index % 3 === 0 ? -0.7 : index % 3 === 1 ? 0.8 : -0.25}deg)`,
    }}
    initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.45, delay: index * 0.035, ease }}
    viewport={{ once: true, amount: 0.18 }}
  >
    {index % 3 === 0 ? (
      <span className="absolute left-1/2 top-0 h-5 w-20 -translate-x-1/2 -translate-y-1/2 rotate-[-2deg] bg-[#d8c39b]/75 shadow-sm" />
    ) : null}

    {index % 3 === 1 ? (
      <span className="absolute right-5 top-4 h-3 w-3 rounded-full bg-[#b98b3a] shadow-[0_3px_8px_rgba(0,0,0,0.35)]" />
    ) : null}

    {index % 3 === 2 ? (
      <span className="absolute left-5 top-4 h-3 w-3 rounded-full bg-[#8f2f2b] shadow-[0_3px_8px_rgba(0,0,0,0.35)]" />
    ) : null}

    {index % 4 === 3 ? (
      <span className="absolute right-[-0.15rem] top-7 h-5 w-16 rotate-[82deg] bg-[#d8c39b]/70 shadow-sm" />
    ) : null}

    <p className="mt-ui text-[0.55rem] tracking-[0.2em] text-[#b7893e]">
      {service.number}
    </p>

    <h3 className="mt-display mt-2 text-[2rem] leading-none">
      {service.title}
    </h3>

    <p className="mt-body-copy mt-4 text-[0.92rem] leading-[1.65] opacity-72">
      {service.description}
    </p>

    <span className="mt-ui mt-5 inline-flex items-center gap-2 text-[0.58rem] tracking-[0.16em] text-[#b7893e]">
      LEARN MORE <ArrowRight size={12} />
    </span>
  </motion.button>
))}
  </div>
</div>
        </div>
      </section>

      <style>{`
  @media (max-width: 393px) and (max-height: 860px) {
    .mt-iphone-service-overlay {
      overflow-x: hidden !important;
      overscroll-behavior-x: none;
      touch-action: pan-y;
    }
  }
`}</style>

<AnimatePresence>
  {openService ? (
          <motion.div
            className="mt-iphone-service-overlay fixed inset-0 z-[100] h-[100svh] overflow-y-auto overflow-x-hidden overscroll-contain bg-[#02080B] text-[#F8F3E8] lg:overflow-hidden"
            role="dialog"
            aria-modal="true"
            aria-labelledby="service-overlay-title"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.45 }}
          >
            <motion.div
              aria-hidden="true"
              className="absolute inset-0"
              initial={prefersReducedMotion ? false : { scale: 1.07, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.03, opacity: 0 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.9, ease }}
            >
              <Image
                src={openService.image}
                alt=""
                fill
                sizes="100vw"
                className="object-cover brightness-[0.48] saturate-[0.62]"
                style={{ objectPosition: openService.objectPosition }}
                priority
              />
            </motion.div>

            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(2,8,11,0.985)_0%,rgba(2,8,11,0.94)_43%,rgba(2,8,11,0.58)_72%,rgba(2,8,11,0.84)_100%)]" />
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(2,8,11,0.36),transparent_36%,rgba(2,8,11,0.94)_100%)]" />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_77%_18%,rgba(212,175,55,0.16),transparent_30%)]" />

            <motion.div
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 z-10 w-[14%] bg-[linear-gradient(90deg,transparent,rgba(255,245,215,0.15),transparent)] mix-blend-screen"
              initial={prefersReducedMotion ? false : { x: "-160%", opacity: 0 }}
              animate={
                prefersReducedMotion
                  ? { opacity: 0 }
                  : { x: "720%", opacity: [0, 0.6, 0] }
              }
              transition={{
                duration: prefersReducedMotion ? 0 : 1.15,
                ease: "easeInOut",
              }}
            />

            <button
              ref={closeButtonRef}
              type="button"
              onClick={() => setOpenService(null)}
              className="mt-ui fixed right-5 top-5 z-30 grid h-11 w-11 place-items-center rounded-full border border-white/15 bg-black/35 text-[#F8F3E8] shadow-[0_12px_40px_rgba(0,0,0,0.32)] backdrop-blur-xl transition-all duration-300 hover:rotate-90 hover:border-[#D4AF37]/65 hover:bg-[#D4AF37] hover:text-[#07141A] md:right-7 md:top-7"
              aria-label="Close service details"
            >
              <X size={17} />
            </button>

            <motion.div
              className="relative z-20 mx-auto flex min-h-[100svh] w-full max-w-[1500px] items-start px-5 pb-12 pt-24 md:items-center md:px-8 md:py-20 lg:h-[100svh] lg:px-12 lg:py-8"
              initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 16 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.72, ease }}
            >
              <div className="grid w-full items-start gap-7 lg:grid-cols-[0.98fr_1.02fr] lg:items-center lg:gap-10">
                <motion.div
                  initial={
                    prefersReducedMotion
                      ? false
                      : { opacity: 0, x: -34 }
                  }
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: prefersReducedMotion ? 0 : 0.72,
                    delay: 0.08,
                    ease,
                  }}
                  className="min-w-0 lg:pl-2"
                >
                  <div className="flex items-center gap-4">
                    <Monogram compact />
                    <p className="mt-eyebrow text-[0.55rem] text-[#D4AF37]">
                      {openService.number} / PRIVATE TRAVEL SERVICE
                    </p>
                  </div>

                  <h2
                    id="service-overlay-title"
                    className="mt-display mt-4 max-w-3xl text-[clamp(2.7rem,12vw,4.2rem)] leading-[0.9] tracking-[-0.045em] text-white md:text-[clamp(3.15rem,5.7vw,6.3rem)] md:leading-[0.82]"
                  >
                    {openService.title}
                  </h2>

                  <p className="mt-body-copy mt-4 max-w-2xl text-sm leading-[1.65] text-white/68 md:text-base">
                    {openService.description}
                  </p>

                  <div className="mt-5 max-w-2xl rounded-[1.35rem] border border-white/12 bg-[linear-gradient(180deg,rgba(10,18,21,0.72),rgba(2,9,12,0.82))] p-4 shadow-[0_26px_84px_rgba(0,0,0,0.36),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-2xl md:rounded-[1.45rem] md:p-5">
                    <div className="grid gap-4 sm:grid-cols-[0.9fr_1.1fr]">
                      <div>
                        <p className="mt-ui text-[0.5rem] tracking-[0.2em] text-[#D4AF37]">
                          WHO THIS IS FOR
                        </p>
                        <p className="mt-body-copy mt-2 text-xs leading-5 text-white/64">
                          {openServiceGuide.idealFor}
                        </p>
                      </div>

                      <div className="border-white/10 sm:border-l sm:pl-4">
                        <p className="mt-ui text-[0.5rem] tracking-[0.2em] text-[#D4AF37]">
                          HOW WE HELP
                        </p>
                        <p className="mt-body-copy mt-2 text-xs leading-5 text-white/64">
                          {openServiceGuide.promise}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 border-t border-white/10 pt-4">
                      <p className="mt-ui text-[0.5rem] tracking-[0.2em] text-white/40">
                        WHAT WE CAN ARRANGE
                      </p>

                      <div className="mt-3 grid gap-2 sm:grid-cols-2">
                        {openServiceGuide.arrangements.map((item, index) => (
                          <motion.div
                            key={item}
                            initial={
                              prefersReducedMotion
                                ? false
                                : { opacity: 0, y: 10 }
                            }
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                              duration: prefersReducedMotion ? 0 : 0.38,
                              delay: 0.18 + index * 0.045,
                              ease,
                            }}
                            className="flex items-center gap-2.5 rounded-full border border-white/9 bg-white/[0.04] px-3 py-1.5 text-[0.72rem] leading-5 text-white/72"
                          >
                            <span className="grid h-4 w-4 shrink-0 place-items-center rounded-full border border-[#D4AF37]/42 text-[#D4AF37]">
                              <Check size={9} />
                            </span>
                            <span>{item}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-4 border-t border-white/10 pt-4">
                      <p className="mt-ui text-[0.5rem] tracking-[0.2em] text-white/40">
                        DESTINATION IDEAS
                      </p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {openServiceGuide.destinations.map((destination) => (
                          <span
                            key={destination}
                            className="rounded-full border border-[#D4AF37]/22 bg-[#D4AF37]/[0.055] px-3 py-1.5 text-[0.62rem] tracking-[0.08em] text-[#F2E7CC]/76"
                          >
                            {destination}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 flex flex-col items-start gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                    <Link
                      href="/plan"
                      onClick={() => setOpenService(null)}
                      className="mt-ui group relative inline-flex items-center gap-5 overflow-hidden rounded-full border border-[#D4AF37]/60 bg-[#D4AF37] px-6 py-3 text-[0.62rem] tracking-[0.18em] text-[#07141A] shadow-[0_16px_42px_rgba(212,175,55,0.22)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#E2C46F] hover:shadow-[0_22px_52px_rgba(212,175,55,0.3)]"
                    >
                      <span className="relative z-10">PLAN YOUR JOURNEY</span>
                      <ArrowRight
                        size={16}
                        className="relative z-10 transition-transform duration-300 group-hover:translate-x-1"
                      />
                      <span className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 skew-x-[-18deg] bg-white/34 opacity-0 blur-sm transition-all duration-700 group-hover:left-[115%] group-hover:opacity-100" />
                    </Link>

                    <p className="mt-body-copy text-xs text-white/38">
                      Share your dates, travellers and preferences in a few steps.
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  initial={
                    prefersReducedMotion
                      ? false
                      : { opacity: 0, x: 38, scale: 0.97 }
                  }
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  transition={{
                    duration: prefersReducedMotion ? 0 : 0.78,
                    delay: 0.12,
                    ease,
                  }}
                  className="relative min-h-[22rem] overflow-hidden rounded-[2rem] border border-white/12 bg-black/20 shadow-[0_42px_130px_rgba(0,0,0,0.48),inset_0_1px_0_rgba(255,255,255,0.06)] md:min-h-[30rem] lg:h-[82svh] lg:max-h-[48rem]"
                >
                  <Image
                    src={openService.image}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 52vw, 100vw"
                    className="object-cover saturate-[0.86] brightness-[0.9]"
                    style={{ objectPosition: openService.objectPosition }}
                    priority
                  />

                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,8,11,0.02),rgba(2,8,11,0.18)_48%,rgba(2,8,11,0.88)_100%)]" />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_76%_20%,rgba(212,175,55,0.15),transparent_34%)]" />

                  <div className="absolute inset-x-5 bottom-5 rounded-[1.35rem] border border-white/12 bg-black/34 px-5 py-4 shadow-[0_18px_54px_rgba(0,0,0,0.34),inset_0_1px_0_rgba(255,255,255,0.07)] backdrop-blur-2xl md:inset-x-7 md:bottom-7">
                    <div className="flex items-center justify-between gap-6">
                      <div>
                        <p className="mt-ui text-[0.5rem] tracking-[0.22em] text-[#D4AF37]">
                          MADRAS TRAILS APPROACH
                        </p>
                        <p className="mt-body-copy mt-2 max-w-md text-sm leading-6 text-white/66">
                          {openService.overview}
                        </p>
                      </div>
                      <Sparkles
                        size={17}
                        className="shrink-0 text-[#D4AF37]"
                      />
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
