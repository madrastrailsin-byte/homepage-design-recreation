'use client'

import PlannerControls from './PlannerControls'

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useMemo, useState } from 'react'
import {
  journeyContinueButtonClassName,
  journeyInteractiveContentClassName,
  journeyStepSectionClassName,
} from './layout'

const easing = [0.22, 1, 0.36, 1] as const
const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const monthFormatter = new Intl.DateTimeFormat('en-GB', {
  month: 'long',
  year: 'numeric',
})
const dateFormatter = new Intl.DateTimeFormat('en-GB', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
})

const seasons = [
  { name: 'Spring', icon: '🌸', months: [2, 3, 4] },
  { name: 'Summer', icon: '☀️', months: [5, 6, 7] },
  { name: 'Autumn', icon: '🍂', months: [8, 9, 10] },
  { name: 'Winter', icon: '❄️', months: [11, 0, 1] },
]

function startOfDay(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate())
}

function startOfMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), 1)
}

function addMonths(date: Date, amount: number) {
  return new Date(date.getFullYear(), date.getMonth() + amount, 1)
}

function isSameDay(first?: Date, second?: Date) {
  return Boolean(
    first &&
      second &&
      first.getFullYear() === second.getFullYear() &&
      first.getMonth() === second.getMonth() &&
      first.getDate() === second.getDate(),
  )
}

function getCalendarDays(month: Date) {
  const firstDay = startOfMonth(month)
  const gridStart = new Date(
    firstDay.getFullYear(),
    firstDay.getMonth(),
    1 - firstDay.getDay(),
  )

  return Array.from({ length: 42 }, (_, index) => {
    const date = new Date(gridStart)
    date.setDate(gridStart.getDate() + index)
    return date
  })
}

interface CalendarMonthProps {
  departure?: Date
  month: Date
  onSelect: (date: Date) => void
  returnDate?: Date
  selectingReturn: boolean
  today: Date
}

function CalendarMonth({
  departure,
  month,
  onSelect,
  returnDate,
  selectingReturn,
  today,
}: CalendarMonthProps) {
  const prefersReducedMotion = useReducedMotion()
  const days = useMemo(() => getCalendarDays(month), [month])

  return (
    <section aria-label={monthFormatter.format(month)}>
      <h2 className="mb-4 text-center font-serif text-2xl font-semibold text-white sm:text-[1.7rem] lg:mb-3">
        {monthFormatter.format(month)}
      </h2>
      <div className="grid grid-cols-7 text-center">
        {weekdays.map((weekday) => (
          <span
            key={weekday}
            className="pb-2 text-[9px] font-semibold uppercase tracking-[0.15em] text-[#F5F3EC]/75"
          >
            {weekday}
          </span>
        ))}

        {days.map((date) => {
          const outsideMonth = date.getMonth() !== month.getMonth()
          const isPast = date < today
          const beforeDeparture =
            selectingReturn && departure && date < departure
          const disabled = outsideMonth || isPast || Boolean(beforeDeparture)
          const selectedDeparture =
            !outsideMonth && isSameDay(date, departure)
          const selectedReturn = !outsideMonth && isSameDay(date, returnDate)
          const inRange = Boolean(
            departure &&
              returnDate &&
              date > departure &&
              date < returnDate &&
              !outsideMonth,
          )

          return (
            <button
              key={date.toISOString()}
              type="button"
              disabled={disabled}
              aria-label={dateFormatter.format(date)}
              aria-pressed={selectedDeparture || selectedReturn}
              onClick={() => onSelect(date)}
              className={`group relative isolate grid h-9 place-items-center text-sm outline-none transition sm:h-10 lg:h-9 ${
                disabled
                  ? 'cursor-not-allowed text-white/90'
                  : 'text-white/90 hover:text-white focus-visible:ring-1 focus-visible:ring-[#F5F3EC]'
              } ${inRange ? 'bg-[#F5F3EC]/14 text-[#F5F3EC]' : ''}`}
            >
              {!disabled && !selectedDeparture && !selectedReturn ? (
                <span className="absolute inset-1.5 -z-10 rounded-full border border-transparent transition duration-300 group-hover:border-[#F5F3EC]/35 group-hover:bg-[#F5F3EC]/10 group-hover:shadow-[0_0_18px_rgba(245,243,236,0.12)]" />
              ) : null}

              {(selectedDeparture || selectedReturn) && (
                <span className="absolute inset-1 -z-10 rounded-full bg-[#F5F3EC] shadow-[0_0_22px_rgba(245,243,236,0.34)]" />
              )}

              <AnimatePresence>
                {selectedDeparture || selectedReturn ? (
                  <motion.span
                    key="date-ripple"
                    aria-hidden="true"
                    initial={{ opacity: 0.45, scale: 0.2 }}
                    animate={{ opacity: 0, scale: 1.9 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: prefersReducedMotion ? 0 : 0.65 }}
                    className="absolute inset-1 rounded-full border border-[#F5F3EC] bg-[#F5F3EC]/20"
                  />
                ) : null}
              </AnimatePresence>

              <span
                className={
                  selectedDeparture || selectedReturn
                    ? 'font-bold text-[#03191D]'
                    : ''
                }
              >
                {date.getDate()}
              </span>
            </button>
          )
        })}
      </div>
    </section>
  )
}

interface DateSelectionScreenProps {
  initialDeparture?: Date
  initialReturnDate?: Date
  onBack: () => void
  onContinue: (departure: Date, returnDate: Date) => void
  onDatesChange?: (departure?: Date, returnDate?: Date) => void
}

export default function DateSelectionScreen({
  initialDeparture,
  initialReturnDate,
  onBack,
  onContinue,
  onDatesChange,
}: DateSelectionScreenProps) {
  const today = useMemo(() => startOfDay(new Date()), [])
  const [visibleMonth, setVisibleMonth] = useState(() =>
    startOfMonth(initialDeparture ?? today),
  )
  const [departure, setDeparture] = useState<Date | undefined>(
    initialDeparture,
  )
  const [returnDate, setReturnDate] = useState<Date | undefined>(
    initialReturnDate,
  )
  const prefersReducedMotion = useReducedMotion()

  const duration =
    departure && returnDate
      ? Math.round((returnDate.getTime() - departure.getTime()) / 86_400_000)
      : undefined
  const activeSeason = departure
    ? seasons.find((season) => season.months.includes(departure.getMonth()))
    : undefined

  function selectDate(date: Date) {
    if (!departure || returnDate) {
      setDeparture(date)
      setReturnDate(undefined)
      onDatesChange?.(date, undefined)
      return
    }

    if (date >= departure) {
      setReturnDate(date)
      onDatesChange?.(departure, date)
    }
  }


  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-transparent text-[#FAFAF9]">

      <div className="absolute inset-0 bg-[#021316]/78" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_22%,rgba(20,72,76,0.18),transparent_38%)]" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-[#03191d]/5 to-[#020f12]/12" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.045]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.8'/%3E%3C/svg%3E\")",
        }}
      />

      <section className={journeyStepSectionClassName}>
        <header className="text-center">
          <motion.p
            initial={false}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.9, delay: 0.35, ease: easing }}
            className="mt-eyebrow text-[10px] text-[#F5F3EC] sm:text-[11px]"
          >
            Plan your journey
          </motion.p>
          <motion.h1
            initial={false}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 1.05, delay: 0.55, ease: easing }}
            className="mt-2 font-serif text-[clamp(2.4rem,4.6vw,4.4rem)] font-semibold leading-[0.98] tracking-[-0.035em]"
          >
            When would you like to travel?
          </motion.h1>
          <motion.p
            initial={false}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.9, delay: 0.75, ease: easing }}
            className="mt-2 text-sm font-light tracking-[0.025em] text-white/90 sm:text-base lg:mt-1"
          >
            Every season tells a different story.
          </motion.p>
        </header>

        <div className={journeyInteractiveContentClassName}>
          <motion.div
            initial={
              prefersReducedMotion
                ? {}
                : { opacity: 0, y: 28, filter: 'blur(9px)' }
            }
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 1, delay: 0.9, ease: easing }}
            className="rounded-2xl border border-white/15 bg-white/[0.16] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_18px_60px_rgba(0,0,0,0.3)] backdrop-blur-2xl sm:p-6 lg:p-4"
          >
            <div className="mb-2 flex items-center justify-between lg:mb-0">
              <button
                type="button"
                aria-label="Previous month"
                disabled={
                  visibleMonth.getFullYear() === today.getFullYear() &&
                  visibleMonth.getMonth() === today.getMonth()
                }
                onClick={() =>
                  setVisibleMonth((current) => addMonths(current, -1))
                }
                className="grid h-9 w-9 place-items-center rounded-full border border-white/12 text-white/90 transition hover:border-[#F5F3EC]/55 hover:bg-[#F5F3EC]/10 hover:text-[#F5F3EC] disabled:cursor-not-allowed disabled:opacity-20 lg:h-8 lg:w-8"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <p className="text-[9px] font-semibold uppercase tracking-[0.24em] text-white/90">
                {departure && !returnDate
                  ? 'Now select your return'
                  : 'Select your departure'}
              </p>
              <button
                type="button"
                aria-label="Next month"
                onClick={() =>
                  setVisibleMonth((current) => addMonths(current, 1))
                }
                className="grid h-9 w-9 place-items-center rounded-full border border-white/12 text-white/90 transition hover:border-[#F5F3EC]/55 hover:bg-[#F5F3EC]/10 hover:text-[#F5F3EC] lg:h-8 lg:w-8"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>

            <div className="grid gap-8 md:grid-cols-2 md:gap-10">
              <CalendarMonth
                month={visibleMonth}
                today={today}
                departure={departure}
                returnDate={returnDate}
                selectingReturn={Boolean(departure && !returnDate)}
                onSelect={selectDate}
              />
              <div className="hidden md:block">
                <CalendarMonth
                  month={addMonths(visibleMonth, 1)}
                  today={today}
                  departure={departure}
                  returnDate={returnDate}
                  selectingReturn={Boolean(departure && !returnDate)}
                  onSelect={selectDate}
                />
              </div>
            </div>
          </motion.div>

          <motion.aside
            initial={
              prefersReducedMotion
                ? {}
                : { opacity: 0, x: 22, filter: 'blur(8px)' }
            }
            animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.9, delay: 1.05, ease: easing }}
            className="space-y-4 lg:space-y-3"
          >
            <div className="rounded-2xl border border-white/15 bg-white/[0.16] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_18px_60px_rgba(0,0,0,0.24)] backdrop-blur-2xl lg:p-4">
              <p className="mt-eyebrow text-[9px] text-[#F5F3EC]">
                Season
              </p>
              <div className="mt-4 grid grid-cols-4 gap-2 lg:mt-2 lg:grid-cols-2">
                {seasons.map((season) => {
                  const active = activeSeason?.name === season.name
                  return (
                    <div
                      key={season.name}
                      className={`rounded-xl border px-2 py-3 text-center transition duration-500 lg:py-2 ${
                        active
                          ? 'border-[#F5F3EC]/75 bg-[#F5F3EC]/12 text-[#F5F3EC] shadow-[0_0_24px_rgba(245,243,236,0.18)]'
                          : 'border-white/8 bg-black/10 text-white/90'
                      }`}
                    >
                      <span className="block text-lg">{season.icon}</span>
                      <span className="mt-1 block text-[9px] uppercase tracking-[0.13em]">
                        {season.name}
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>

            <AnimatePresence mode="wait">
              {departure && returnDate && duration !== undefined ? (
                <motion.div
                  key={`${departure.toISOString()}-${returnDate.toISOString()}`}
                  initial={
                    prefersReducedMotion
                      ? {}
                      : { opacity: 0, y: 18, filter: 'blur(7px)' }
                  }
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.7, ease: easing }}
                  className="rounded-2xl border border-[#F5F3EC]/28 bg-white/[0.16] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_0_32px_rgba(245,243,236,0.08)] backdrop-blur-2xl lg:p-4"
                >
                  <p className="mt-eyebrow text-[9px] text-[#F5F3EC]">
                    Journey summary
                  </p>
                  <dl className="mt-4 grid grid-cols-2 gap-4 lg:mt-2 lg:grid-cols-1 lg:gap-2">
                    <div>
                      <dt className="text-[9px] uppercase tracking-[0.18em] text-white/90">
                        Departure
                      </dt>
                      <dd className="mt-1 font-serif text-lg text-white">
                        {dateFormatter.format(departure)}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-[9px] uppercase tracking-[0.18em] text-white/90">
                        Return
                      </dt>
                      <dd className="mt-1 font-serif text-lg text-white">
                        {dateFormatter.format(returnDate)}
                      </dd>
                    </div>
                  </dl>
                  <div className="mt-4 border-t border-[#F5F3EC]/20 pt-4 text-center font-serif text-xl text-[#F5F3EC] lg:mt-2 lg:pt-2">
                    {duration} {duration === 1 ? 'Night' : 'Nights'}{' '}
                    <span className="mx-1 text-white/90">•</span>{' '}
                    {duration + 1} Days
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </motion.aside>
        </div>
      </section>

      <PlannerControls>
        <div className="contents">
          <p className="mt-plan-step" aria-live="polite">Step 2 of 6</p>
          <button
            type="button"
            disabled={!departure || !returnDate}
            onClick={() => {
              if (departure && returnDate) onContinue(departure, returnDate)
            }}
            className={journeyContinueButtonClassName}
          >
            Continue →
          </button>
        </div>
      </PlannerControls>
    </section>
  )
}
