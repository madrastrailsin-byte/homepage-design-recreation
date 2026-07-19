"use client";

import { motion } from "framer-motion";
import { Phone, Mail, MessageCircle } from "lucide-react";

const reveal = {
  hidden: { opacity: 0, y: 28, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
  },
};

export default function ContactHero() {
  return (
    <section className="relative h-[100svh] overflow-hidden bg-black text-white">
      {/* Cinematic video */}
      <motion.video
        initial={{ opacity: 0, scale: 1.08 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2.4, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      >
        <source src="/videos/contact/hero.mp4" type="video/mp4" />
      </motion.video>

      {/* Cinematic grading */}
      <div className="absolute inset-0 bg-black/10" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/45 via-transparent to-black/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/20" />

      {/* Fine film texture */}
      <div
        className="pointer-events-none absolute inset-0 z-[2] opacity-[0.045]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.8'/%3E%3C/svg%3E\")",
        }}
      />

      {/* Main copy */}
      <div className="relative z-10 flex h-full items-end px-6 pb-20 sm:px-10 sm:pb-24 lg:px-16 lg:pb-28">
        <div className="w-full max-w-7xl">
          <motion.p
            variants={reveal}
            initial="hidden"
            animate="visible"
            transition={{ duration: 1, delay: 0.8 }}
            className="mb-4 text-[10px] uppercase tracking-[0.48em] text-white/85 sm:text-xs"
          >
            MadrasTrails · Private Travel Curators
          </motion.p>

          <motion.h1
            variants={reveal}
            initial="hidden"
            animate="visible"
            transition={{ duration: 1.2, delay: 1.15 }}
            className="max-w-4xl font-display text-[clamp(3rem,7vw,7rem)] leading-[0.92] tracking-[-0.035em]"
          >
            Let the journey
            <br />
            come to you.
          </motion.h1>

          <motion.div
            variants={reveal}
            initial="hidden"
            animate="visible"
            transition={{ duration: 1, delay: 2 }}
            className="mt-8 flex flex-wrap items-center gap-x-12 lg:gap-x-16 gap-y-4 border-t border-white/20 pt-6"
          >
            <a href="tel:+917891876918"
              className="group flex flex-col items-center text-xs uppercase tracking-[0.28em] text-white/75 transition hover:text-[#D4AF37]"
            >
              <Phone className="mb-3 h-4 w-4 text-white/50 transition-colors group-hover:text-[#D4AF37]" />
              Speak With Us
            </a>

            <a href="mailto:info@madrastrails.in"
              className="group flex flex-col items-center text-xs uppercase tracking-[0.28em] text-white/75 transition hover:text-[#D4AF37]"
            >
              <Mail className="mb-3 h-4 w-4 text-white/50 transition-colors group-hover:text-[#D4AF37]" />
              Write To Us
            </a>

            <a href="https://wa.me/917891876918?text=Hi%20MadrasTrails,%20I'd%20like%20to%20plan%20a%20trip."
              className="group flex flex-col items-center text-xs uppercase tracking-[0.28em] text-white/75 transition hover:text-[#D4AF37]"
            >
              <MessageCircle className="mb-3 h-4 w-4 text-white/50 transition-colors group-hover:text-[#D4AF37]" />
              Let's Chat
            </a>

            <a
              href="/plan"
              className="ml-0 border border-white/35 px-6 py-3 text-xs uppercase tracking-[0.24em] transition-all duration-700 hover:-translate-y-0.5 hover:scale-[1.02] hover:border-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#03191D] lg:ml-auto"
            >
              Begin the conversation
            </a>
          </motion.div>
        </div>
      </div>

      {/* Scene marker */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.8, duration: 1 }}
        className="absolute right-6 top-1/2 z-10 hidden -translate-y-1/2 flex-col items-center gap-3 lg:flex"
      >
        <span className="h-20 w-px bg-gradient-to-b from-transparent via-white/50 to-transparent" />
        <span className="[writing-mode:vertical-rl] text-[9px] uppercase tracking-[0.4em] text-white/45">
          Chennai · India
        </span>
      </motion.div>
    </section>
  );
}