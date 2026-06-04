'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface ServiceCard {
  id: number;
  title: string;
  image: string;
  alt: string;
}

const services: ServiceCard[] = [
  {
    id: 1,
    title: 'Red Light Therapy',
    image: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=500&q=80',
    alt: 'Red Light Therapy',
  },
  {
    id: 2,
    title: 'Anti Aging',
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=500&q=80',
    alt: 'Anti Aging',
  },
  {
    id: 3,
    title: 'Weight Loss',
    image: 'https://images.unsplash.com/photo-1549060279-7e168fcee0c2?w=500&q=80',
    alt: 'Weight Loss',
  },
  {
    id: 4,
    title: 'Hormone Optimization',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&q=80',
    alt: 'Hormone Optimization',
  },
  {
    id: 5,
    title: 'Hyperbaric Therapy',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=500&q=80',
    alt: 'Hyperbaric Therapy',
  },
  {
    id: 6,
    title: 'Energy Boost',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500&q=80',
    alt: 'Energy Boost',
  },
];

export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const visibleCount = 3;
  const totalSlides = services.length;

  const clampedIndex = (idx: number) => ((idx % totalSlides) + totalSlides) % totalSlides;

  const goNext = useCallback(() => {
    setCurrentIndex((prev) => clampedIndex(prev + 1));
  }, [totalSlides]);

  const goPrev = useCallback(() => {
    setCurrentIndex((prev) => clampedIndex(prev - 1));
  }, [totalSlides]);

  const startAutoPlay = useCallback(() => {
    autoPlayRef.current = setInterval(goNext, 4000);
  }, [goNext]);

  const stopAutoPlay = useCallback(() => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
      autoPlayRef.current = null;
    }
  }, []);

  useEffect(() => {
    startAutoPlay();
    return stopAutoPlay;
  }, [startAutoPlay, stopAutoPlay]);

  // Build visible items (3 at a time, looping)
  const visibleItems = Array.from(
    { length: visibleCount },
    (_, i) => services[clampedIndex(currentIndex + i)]
  );

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStartX(e.clientX);
    stopAutoPlay();
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setDragOffset(e.clientX - dragStartX);
  };

  const handleMouseUp = () => {
    if (isDragging) {
      if (dragOffset < -50) goNext();
      else if (dragOffset > 50) goPrev();
      setIsDragging(false);
      setDragOffset(0);
      startAutoPlay();
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setDragStartX(e.touches[0].clientX);
    stopAutoPlay();
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = e.changedTouches[0].clientX - dragStartX;
    if (diff < -50) goNext();
    else if (diff > 50) goPrev();
    startAutoPlay();
  };

  return (
    <section
      ref={sectionRef}
      className="bg-[#1a1008] py-20 md:py-28 overflow-hidden"
      onMouseLeave={() => {
        if (isDragging) handleMouseUp();
      }}
      id="services"
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        {/* Header Row */}
        <div className="flex items-start justify-between mb-14">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-4 mb-4"
            >
              <span className="text-[11px] tracking-[0.2em] text-[#c9a96e] uppercase font-medium">
                Thoughtfully Crafted Treatments
              </span>
              <div className="h-px w-16 bg-[#c9a96e]/40" />
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="text-4xl md:text-5xl lg:text-[75px] text-white font-bold leading-[1.05]"
            >
              Curated Wellness
              <br />
              Experiences
            </motion.h2>
          </div>

          {/* Navigation Arrows */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hidden md:flex items-center gap-3 mt-2"
          >
            <button
              onClick={() => {
                goPrev();
                stopAutoPlay();
                startAutoPlay();
              }}
              className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/10 hover:border-white/40 transition-all duration-300 group"
              aria-label="Previous"
            >
              <ChevronLeft
                size={20}
                className="group-hover:-translate-x-0.5 transition-transform"
              />
            </button>
            <button
              onClick={() => {
                goNext();
                stopAutoPlay();
                startAutoPlay();
              }}
              className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/10 hover:border-white/40 transition-all duration-300 group"
              aria-label="Next"
            >
              <ChevronRight
                size={20}
                className="group-hover:translate-x-0.5 transition-transform"
              />
            </button>
          </motion.div>
        </div>

        {/* Carousel */}
        <div
          ref={trackRef}
          className="cursor-grab active:cursor-grabbing select-none"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onMouseEnter={stopAutoPlay}
          onMouseLeave={startAutoPlay}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            <AnimatePresence mode="popLayout">
              {visibleItems.map((service, i) => (
                <motion.div
                  key={`${service.id}-${currentIndex}`}
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -20 }}
                  transition={{
                    duration: 0.5,
                    delay: i * 0.08,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                  className="group relative"
                  onClick={() => router.push(`/service/serviceDetails`)}
                >
                  <div className="relative overflow-hidden rounded-[8px] aspect-[3/4] w-[439px] h-[479px]">
                    <Image
                      src={service.image}
                      width={2000}
                      height={2000}
                      alt={service.alt}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      draggable={false}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  </div>
                  <motion.p
                    className="mt-4 text-center text-white text-[35px]  tracking-wide"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 + i * 0.08 }}
                  >
                    {service.title}
                  </motion.p>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Mobile Nav */}
        <div className="flex md:hidden items-center justify-center gap-4 mt-10">
          <button
            onClick={goPrev}
            className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/10 transition-all"
          >
            <ChevronLeft size={18} />
          </button>
          <div className="flex gap-2">
            {services.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`w-1.5 h-1.5 rounded-full transition-all ${
                  i === currentIndex ? 'bg-[#c9a96e] w-4' : 'bg-white/30'
                }`}
              />
            ))}
          </div>
          <button
            onClick={goNext}
            className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/10 transition-all"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}
