'use client'

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { usePathname } from 'next/navigation'

export default function PageTransition({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const prefersReducedMotion = useReducedMotion()

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial={
          prefersReducedMotion
            ? { opacity: 1 }
            : { opacity: 0, scale: 1.01, filter: 'blur(8px)' }
        }
        animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
        exit={
          prefersReducedMotion
            ? { opacity: 0 }
            : { opacity: 0, scale: 0.99, filter: 'blur(6px)' }
        }
        transition={{
          duration: prefersReducedMotion ? 0 : 0.55,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="relative min-h-screen"
      >
        {children}

        {!prefersReducedMotion && (
          <motion.div
            aria-hidden="true"
            className="pointer-events-none fixed inset-y-0 left-0 z-[9999] w-[18%] bg-[linear-gradient(90deg,transparent,rgba(255,239,194,0.16),transparent)] mix-blend-screen"
            initial={{ x: '-180%', opacity: 0 }}
            animate={{ x: '650%', opacity: [0, 0.55, 0] }}
            transition={{
              duration: 0.95,
              ease: 'easeInOut',
            }}
          />
        )}
      </motion.div>
    </AnimatePresence>
  )
}