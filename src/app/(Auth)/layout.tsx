'use client';

import { motion, AnimatePresence } from 'motion/react';
import Image from 'next/image';
import logo from '@/assets/Logo/Logo.png';
import { useState, useEffect } from 'react';

const slides = [
  {
    image: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=900&q=85',
    label: 'Premium Wellness Management',
    heading: 'Elevate Your\nWellbeing',
    sub: 'Manage bookings, staff, memberships, and revenue from one elegant command center built for luxury wellness businesses.',
  },
  {
    image: 'https://images.unsplash.com/photo-1552693673-1bf958298935?w=900&q=85',
    label: 'Science-Backed Therapies',
    heading: 'Restore.\nRejuvenate.\nRenew.',
    sub: 'Your journey to optimal wellness begins with a single step. Our experts are ready to guide you.',
  },
  {
    image: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=900&q=85',
    label: 'Holistic Care Platform',
    heading: 'Wellness\nBeyond\nTreatment',
    sub: 'A deeply personalized experience designed around your mind, body, and lifestyle goals.',
  },
];

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);
  return (
    <div className="min-h-screen flex overflow-hidden bg-[#0a0602]">
      {/* ── Left Panel — fixed image ── */}
      <div className="hidden lg:flex lg:w-[55%] relative flex-shrink-0 overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, scale: 1.08, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.03, y: -50 }}
              transition={{
                duration: 1.2,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              className="absolute inset-0"
            >
              <Image
                src={slides[currentSlide].image}
                alt="Wellness"
                fill
                priority
                className="object-cover"
              />
            </motion.div>
          </AnimatePresence>

          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/10" />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/40" />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-between h-full p-12 w-full">
          {/* Top: Logo mark */}
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full border border-[#c9a96e]/60 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-[#c9a96e]" />
              </div>
              <span className="text-[#c9a96e] text-xs tracking-[0.25em] uppercase font-medium">
                Aurum Star
              </span>
            </div>
          </motion.div>

          {/* Bottom: Text */}
          <div>
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex items-center gap-3 text-[11px] tracking-[0.22em] text-white/55 uppercase mb-5"
            >
              {slides[currentSlide].label}
              <span className="block h-px w-14 bg-white/30" />
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="text-white font-serif text-[3.8rem] lg:text-[4.5rem] leading-[0.98] font-bold mb-6 whitespace-pre-line"
            >
              {slides[currentSlide].heading}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.55 }}
              className="text-white/60 text-base leading-relaxed max-w-md font-light"
            >
              {slides[currentSlide].sub}
            </motion.p>

            {/* Slide dots */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="flex gap-2 mt-10"
            >
              {slides.map((_, i) => (
                <div
                  key={i}
                  className={`h-0.5 rounded-full transition-all ${
                    i === 0 ? 'w-8 bg-[#c9a96e]' : 'w-2 bg-white/25'
                  }`}
                />
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* ── Right Panel — scrollable form area ── */}
      <div className="flex-1 flex flex-col bg-[#0d0905] overflow-y-auto">
        <div className="flex-1 flex flex-col items-center justify-center min-h-full py-12 px-6 md:px-10">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center justify-center"
          >
            {/* Decorative logo ring */}

            <Image src={logo} alt={'Logo'} width={200} height={200} className="object-cover" />
          </motion.div>

          {/* Form children */}
          <div className="w-full max-w-lg">
            <AnimatePresence mode="wait">{children}</AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
