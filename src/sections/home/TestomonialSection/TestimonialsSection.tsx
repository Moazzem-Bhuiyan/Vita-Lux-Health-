'use client';

import { useRef, useState, useCallback } from 'react';
import { motion, useInView } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';

interface Testimonial {
  id: number;
  name: string;
  company: string;
  avatar: string;
  rating: number;
  text: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Leslie Alexander',
    company: 'Wellness Client',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80',
    rating: 5,
    text: 'The team at Aurum Star completely transformed my approach to health. Their personalized care and cutting-edge therapies helped me feel stronger and more vibrant than ever.',
  },
  {
    id: 2,
    name: 'Jenny Wilson',
    company: 'Regular Patient',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80',
    rating: 5,
    text: 'We love the experience at Aurum Star! The specialists were incredibly knowledgeable, and the environment made me feel relaxed and cared for throughout every visit.',
  },
  {
    id: 3,
    name: 'Sarah Mitchell',
    company: 'Wellness Client',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&q=80',
    rating: 5,
    text: "Exceptional service and results. The red light therapy and hormone optimization programs have been life-changing. I've never felt better in my life.",
  },
  {
    id: 4,
    name: 'Michael Chen',
    company: 'Long-term Patient',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80',
    rating: 5,
    text: 'From the moment I walked in, I knew this was different. The level of expertise and personalized attention is unmatched. My health journey has never been this rewarding.',
  },
  {
    id: 5,
    name: 'Aisha Patel',
    company: 'Wellness Client',
    avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=100&q=80',
    rating: 5,
    text: 'Aurum Star redefined what wellness means to me. Every session left me feeling renewed, and the team genuinely cares about long-term results, not just quick fixes.',
  },
  {
    id: 6,
    name: 'David Okonkwo',
    company: 'Long-term Patient',
    avatar: 'https://images.unsplash.com/photo-1489980557514-251d61e3eeb6?w=100&q=80',
    rating: 5,
    text: 'I came in skeptical and left a believer. The hyperbaric therapy alone changed my recovery time dramatically. The entire staff made me feel like a priority.',
  },
];

function StarRating({ filled }: { filled: boolean }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className={`w-4 h-4 ${filled ? 'text-[#f5a623]' : 'text-[#d1c4a8]'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });
  const [activeIdx, setActiveIdx] = useState(0);
  const scrollLockRef = useRef(false);

  // Scroll the container so activeIdx card sits centered
  const scrollToCard = useCallback((idx: number) => {
    const container = scrollRef.current;
    if (!container) return;
    // Each item has a data-index attr; we query it directly
    const card = container.querySelector<HTMLElement>(`[data-card-index="${idx}"]`);
    if (!card) return;

    scrollLockRef.current = true;
    const containerTop = container.getBoundingClientRect().top;
    const cardTop = card.getBoundingClientRect().top;
    const cardHeight = card.offsetHeight;
    const containerHeight = container.clientHeight;
    const currentScroll = container.scrollTop;

    const targetScrollTop =
      currentScroll + (cardTop - containerTop) - containerHeight / 2 + cardHeight / 2;

    container.scrollTo({ top: Math.max(0, targetScrollTop), behavior: 'smooth' });

    // Release lock after scroll settles
    setTimeout(() => {
      scrollLockRef.current = false;
    }, 600);
  }, []);

  const changeActive = useCallback(
    (idx: number) => {
      setActiveIdx(idx);
      // slight delay so layout animation starts before we measure
      setTimeout(() => scrollToCard(idx), 30);
    },
    [scrollToCard]
  );

  const prev = () => changeActive((activeIdx - 1 + testimonials.length) % testimonials.length);
  const next = () => changeActive((activeIdx + 1) % testimonials.length);

  // On manual scroll: snap to nearest card
  const handleScroll = useCallback(() => {
    if (scrollLockRef.current) return;
    const container = scrollRef.current;
    if (!container) return;

    const containerCenter = container.scrollTop + container.clientHeight / 2;
    let closest = 0;
    let closestDist = Infinity;

    container.querySelectorAll<HTMLElement>('[data-card-index]').forEach((card) => {
      const idx = Number(card.dataset.cardIndex);
      const cardCenter = card.offsetTop + card.offsetHeight / 2;
      const dist = Math.abs(cardCenter - containerCenter);
      if (dist < closestDist) {
        closestDist = dist;
        closest = idx;
      }
    });

    if (closest !== activeIdx) setActiveIdx(closest);
  }, [activeIdx]);

  return (
    <section ref={sectionRef} className="bg-[#f5f0e8] py-20 md:py-28 overflow-hidden" id="reviews">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row gap-12 md:gap-16 items-start">
          {/* ── Left: Heading + Nav ── */}
          <div className="md:w-[38%] flex-shrink-0 md:sticky md:top-28">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-4 mb-5"
            >
              <span className="text-[11px] tracking-[0.2em] text-[#c9623a] uppercase font-medium">
                Mental Wellness Reimagined
              </span>
              <div className="h-px w-14 bg-[#c9623a]/50" />
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="text-4xl md:text-[64px] text-[#1a1008] font-bold leading-[1.08] mb-6"
            >
              Trusted By Patients Focused On Better Health
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-[#1a1008]/60 text-base leading-relaxed mb-10 font-light"
            >
              See how personalized care and science-backed wellness solutions are helping our
              patients feel healthier, stronger, and more confident every day.
            </motion.p>

            {/* Dot indicators */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="flex items-center gap-2 mb-8"
            >
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => changeActive(i)}
                  aria-label={`Testimonial ${i + 1}`}
                  className={`rounded-full transition-all duration-300 h-1.5 ${
                    i === activeIdx
                      ? 'w-6 bg-[#1a1008]'
                      : 'w-1.5 bg-[#1a1008]/25 hover:bg-[#1a1008]/50'
                  }`}
                />
              ))}
            </motion.div>

            {/* Arrow nav */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex items-center gap-4"
            >
              <button
                onClick={prev}
                className="w-14 h-14 rounded-full bg-[#1a1008] flex items-center justify-center text-white hover:bg-[#2d1f0e] transition-colors group"
                aria-label="Previous"
              >
                <ChevronLeft
                  size={20}
                  className="group-hover:-translate-x-0.5 transition-transform"
                />
              </button>
              <button
                onClick={next}
                className="w-14 h-14 rounded-full border border-[#1a1008]/20 flex items-center justify-center text-[#1a1008] hover:bg-[#1a1008]/5 transition-colors group"
                aria-label="Next"
              >
                <ChevronRight
                  size={20}
                  className="group-hover:translate-x-0.5 transition-transform"
                />
              </button>
            </motion.div>
          </div>

          {/* ── Right: Scrollable card list ── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="md:w-[62%] relative"
          >
            {/* Fade overlays */}
            <div className="pointer-events-none absolute top-0 inset-x-0 h-20 bg-gradient-to-b from-[#f5f0e8] to-transparent z-10" />
            <div className="pointer-events-none absolute bottom-0 inset-x-0 h-20 bg-gradient-to-t from-[#f5f0e8] to-transparent z-10" />

            <div
              ref={scrollRef}
              onScroll={handleScroll}
              className="flex flex-col gap-3 overflow-y-auto pr-1"
              style={{ height: '540px', scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {/* top spacer — lets first card scroll to center */}
              <div aria-hidden className="flex-shrink-0 h-[200px]" />

              {testimonials.map((t, i) => {
                const isActive = i === activeIdx;
                return (
                  <motion.div
                    key={t.id}
                    data-card-index={i}
                    layout
                    onClick={() => changeActive(i)}
                    animate={{
                      opacity: isActive ? 1 : 0.5,
                      scale: isActive ? 1 : 0.975,
                    }}
                    transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className={`rounded-2xl cursor-pointer flex-shrink-0 ${
                      isActive
                        ? 'bg-[#1a1008] text-white shadow-2xl'
                        : 'bg-white/80 text-[#1a1008] hover:opacity-70'
                    }`}
                  >
                    {/* ── Expanded active card ── */}
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3, delay: 0.12 }}
                        className="p-6 md:p-7"
                      >
                        <StarRating filled />
                        <p className="text-white/90 text-base leading-relaxed mt-4 mb-6 font-light">
                          &quot;{t.text}&quot;
                        </p>
                        <div className="flex items-center gap-3">
                          <div className="w-11 h-11 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-white/20">
                            <Image
                              src={t.avatar}
                              alt={t.name}
                              width={4000}
                              height={4000}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <p className="font-semibold text-white text-sm">{t.name}</p>
                            <p className="text-white/50 text-xs">{t.company}</p>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* ── Collapsed inactive card ── */}
                    {!isActive && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.25 }}
                        className="p-4 flex items-center gap-4"
                      >
                        <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                          <Image
                            src={t.avatar}
                            width={40}
                            height={40}
                            alt={t.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2 mb-1">
                            <p className="font-medium text-[#1a1008] text-sm truncate">{t.name}</p>
                            <StarRating filled={false} />
                          </div>
                          <p className="text-[#1a1008]/45 text-xs truncate">{t.text}</p>
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                );
              })}

              {/* bottom spacer */}
              <div aria-hidden className="flex-shrink-0 h-[200px]" />
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`div::-webkit-scrollbar { display: none; }`}</style>
    </section>
  );
}
