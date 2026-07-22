"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"

export type Fact = {
  title: string
  description: string
  story: string
  location: string
  season: string
}

interface DidYouKnowProps {
  facts: Fact[]
}

export default function DidYouKnow({ facts }: DidYouKnowProps) {
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    if (facts.length <= 1) return

    const timer = window.setTimeout(() => {
      setActiveIndex((currentIndex) => {
        return (currentIndex + 1) % facts.length
      })
    }, 5000)

    return () => {
      window.clearTimeout(timer)
    }
  }, [activeIndex, facts.length])

  if (facts.length === 0) {
    return null
  }

  const activeFact = facts[activeIndex]

  const handleFactChange = (index: number) => {
    setActiveIndex(index)
  }

  return (
    <div className="mt-10 max-w-[430px] border-t border-white/10 pt-6">
      <div className="flex items-center gap-4">
        <p className="text-[9px] font-medium uppercase tracking-[0.34em] text-[#D6B06E]">
          Did You Know?
        </p>

        <span className="h-px flex-1 bg-white/10" />
      </div>

      <div className="relative min-h-[190px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{
              duration: 0.55,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <h4 className="mt-5 font-serif text-[28px] font-light leading-[1.2] tracking-[-0.02em] text-white">
              {activeFact.title}
            </h4>

            <p className="mt-4 text-sm font-light leading-7 text-white/55">
              {activeFact.description}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-6 flex items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          {facts.map((fact, index) => (
            <button
              key={fact.title}
              type="button"
              onClick={() => handleFactChange(index)}
              aria-label={`Show fact ${index + 1}`}
              aria-current={index === activeIndex ? "true" : undefined}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === activeIndex
                  ? "w-6 bg-[#D6B06E]"
                  : "w-2 bg-white/25 hover:bg-white/45"
              }`}
            />
          ))}
        </div>

        <button
          type="button"
          className="shrink-0 text-[10px] font-medium uppercase tracking-[0.24em] text-[#D6B06E] transition-colors duration-300 hover:text-white"
        >
          Read the story →
        </button>
      </div>
    </div>
  )
}