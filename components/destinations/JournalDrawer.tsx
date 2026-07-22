"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { createPortal } from "react-dom"
import JourneyEnquiry from "./JourneyEnquiry"

type Detail = {
  label: string
  text: string
}

export type JournalFact = {
  title: string
  description: string
  story: string[]
  details: Detail[]
  culturalNote: string
  location: string
  season: string
  related: string[]
}

interface JournalDrawerProps {
  fact: JournalFact
  isOpen: boolean
  onClose: () => void
  destination?: string
}

export default function JournalDrawer({
  fact,
  isOpen,
  onClose,
  destination = "Japan",
}: JournalDrawerProps) {
  const [selectedExperience, setSelectedExperience] = useState<string | null>(
    null,
  )

  useEffect(() => {
    if (!isOpen) {
      setSelectedExperience(null)
      return
    }

    const previousOverflow = document.body.style.overflow

    function handleEscape(event: KeyboardEvent) {
      if (event.key !== "Escape") return

      if (selectedExperience) {
        setSelectedExperience(null)
      } else {
        onClose()
      }
    }

    document.body.style.overflow = "hidden"
    window.addEventListener("keydown", handleEscape)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener("keydown", handleEscape)
    }
  }, [isOpen, onClose, selectedExperience])

  useEffect(() => {
    setSelectedExperience(null)
  }, [fact])

  if (typeof document === "undefined") return null

  return createPortal(
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          className="fixed inset-0 z-[9999] flex justify-end"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.button
            type="button"
            aria-label="Close journal"
            onClick={onClose}
            className="absolute inset-0 cursor-default bg-[#031015]/80 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          />

          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-labelledby="journal-drawer-title"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{
              duration: 0.72,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative z-10 h-dvh w-full overflow-y-auto border-l border-white/10 bg-[#07161D]/98 px-7 py-8 shadow-[-30px_0_100px_rgba(0,0,0,0.48)] backdrop-blur-3xl sm:max-w-[560px] sm:px-12 sm:py-10"
          >
            <header className="sticky top-0 z-20 -mx-1 flex items-center justify-between border-b border-white/10 bg-[#07161D]/95 px-1 pb-7 backdrop-blur-2xl">
              <div>
                <p className="text-[9px] font-medium uppercase tracking-[0.38em] text-[#D6B06E]">
                  MadrasTrails Journal
                </p>
                <p className="mt-2 text-[8px] font-medium uppercase tracking-[0.28em] text-white/25">
                  {destination} · Field Notes
                </p>
              </div>

              <button
                type="button"
                onClick={onClose}
                aria-label="Close journal"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-xl font-light text-white/65 transition-colors duration-300 hover:border-white/30 hover:text-white"
              >
                ×
              </button>
            </header>

            <AnimatePresence mode="wait" initial={false}>
              {selectedExperience ? (
                <JourneyEnquiry
                  key={`enquiry-${selectedExperience}`}
                  experience={selectedExperience}
                  destination={destination}
                  onBack={() => setSelectedExperience(null)}
                />
              ) : (
                <motion.article
                  key={`story-${fact.title}`}
                  id="journal-drawer-title"
                  initial={{ opacity: 0, x: -18 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -18 }}
                  transition={{
                    duration: 0.5,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="pb-10 pt-10"
                >
                  <p className="text-[9px] font-medium uppercase tracking-[0.3em] text-white/35">
                    Cultural insight
                  </p>

                  <h2 className="mt-5 font-serif text-[46px] font-light leading-[0.98] tracking-[-0.04em] text-white sm:text-[54px]">
                    {fact.title}
                  </h2>

                  <div className="mt-8 h-px w-20 bg-[#D6B06E]/75" />

                  <p className="mt-8 font-serif text-[24px] font-light leading-[1.42] text-white/70">
                    {fact.description}
                  </p>

                  <section className="mt-10 space-y-6 text-[15px] font-light leading-8 text-white/52">
                    {fact.story.map((paragraph, index) => (
                      <p key={`${index}-${paragraph}`}>{paragraph}</p>
                    ))}
                  </section>

                  <section className="mt-12">
                    <div className="flex items-center gap-4">
                      <p className="text-[9px] font-medium uppercase tracking-[0.34em] text-[#D6B06E]">
                        Details to notice
                      </p>
                      <span className="h-px flex-1 bg-white/10" />
                    </div>

                    <div className="mt-7 space-y-7">
                      {fact.details.map((detail, index) => (
                        <div
                          key={`${detail.label}-${index}`}
                          className="grid grid-cols-[34px_1fr] gap-4"
                        >
                          <span className="pt-1 font-serif text-lg font-light text-[#D6B06E]/55">
                            {String(index + 1).padStart(2, "0")}
                          </span>

                          <div className="border-l border-white/15 pl-5">
                            <h3 className="font-serif text-[22px] font-light text-white/78">
                              {detail.label}
                            </h3>
                            <p className="mt-2 text-sm font-light leading-6 text-white/48">
                              {detail.text}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>

                  <section className="mt-12 rounded-[26px] border border-white/10 bg-white/[0.025] p-6">
                    <p className="text-[8px] font-medium uppercase tracking-[0.32em] text-[#D6B06E]/85">
                      Cultural note
                    </p>
                    <p className="mt-4 font-serif text-[20px] font-light leading-8 text-white/65">
                      {fact.culturalNote}
                    </p>
                  </section>

                  <section className="mt-12 grid grid-cols-2 gap-6 border-y border-white/10 py-7">
                    <div>
                      <p className="text-[8px] font-medium uppercase tracking-[0.3em] text-white/30">
                        Where
                      </p>
                      <p className="mt-3 text-sm font-light leading-6 text-white/70">
                        {fact.location}
                      </p>
                    </div>

                    <div>
                      <p className="text-[8px] font-medium uppercase tracking-[0.3em] text-white/30">
                        Best experienced
                      </p>
                      <p className="mt-3 text-sm font-light leading-6 text-white/70">
                        {fact.season}
                      </p>
                    </div>
                  </section>

                  <section className="mt-12">
                    <div className="flex items-end justify-between gap-6">
                      <div>
                        <p className="text-[9px] font-medium uppercase tracking-[0.34em] text-[#D6B06E]">
                          Continue the journey
                        </p>

                        <h3 className="mt-3 font-serif text-[30px] font-light leading-tight text-white/85">
                          Experiences that bring
                          <span className="block italic text-white/42">
                            this story to life.
                          </span>
                        </h3>
                      </div>

                      <span className="mb-2 h-px w-12 bg-[#D6B06E]/55" />
                    </div>

                    <div className="mt-7 space-y-3">
                      {fact.related.map((experience, index) => (
                        <button
                          key={`${experience}-${index}`}
                          type="button"
                          onClick={() => setSelectedExperience(experience)}
                          className="group relative w-full overflow-hidden rounded-[22px] border border-white/10 bg-white/[0.025] px-5 py-5 text-left transition-all duration-500 hover:border-[#D6B06E]/30 hover:bg-white/[0.045]"
                        >
                          <div className="absolute inset-y-0 left-0 w-px bg-[#D6B06E]/0 transition-colors duration-500 group-hover:bg-[#D6B06E]/70" />

                          <div className="flex items-center justify-between gap-5">
                            <div className="flex min-w-0 items-center gap-4">
                              <span className="shrink-0 font-serif text-[16px] font-light text-[#D6B06E]/45">
                                {String(index + 1).padStart(2, "0")}
                              </span>

                              <div className="min-w-0">
                                <p className="font-serif text-[22px] font-light leading-tight text-white/72 transition-colors duration-300 group-hover:text-white">
                                  {experience}
                                </p>
                                <p className="mt-2 text-[8px] font-medium uppercase tracking-[0.24em] text-[#D6B06E]/55 transition-colors duration-300 group-hover:text-[#D6B06E]">
                                  Let&apos;s craft your journey
                                </p>
                              </div>
                            </div>

                            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 text-sm text-[#D6B06E]/60 transition-all duration-300 group-hover:translate-x-1 group-hover:border-[#D6B06E]/35 group-hover:text-[#D6B06E]">
                              →
                            </span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </section>

                  <footer className="mt-10 flex items-center justify-between border-t border-white/10 pt-6">
                    <div>
                      <p className="text-[8px] font-medium uppercase tracking-[0.28em] text-white/25">
                        MadrasTrails Edition
                      </p>

                      <p className="mt-2 font-serif text-[17px] font-light italic text-white/38">
                        Selected for the way it reveals {destination}.
                      </p>
                    </div>

                    <span className="h-px w-10 bg-[#D6B06E]/45" />
                  </footer>
                </motion.article>
              )}
            </AnimatePresence>
          </motion.aside>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body,
  )
}
