'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import { motion } from 'motion/react';
import Image from 'next/image';

interface CarouselSlide {
  id: number;
  type: 'image' | 'stat';
  image?: string;
  label?: string;
  statNumber?: string;
  statTitle?: string;
  statDesc?: string;
}

const slides: CarouselSlide[] = [
  {
    id: 1,
    type: 'stat',
    statNumber: '10+',
    statTitle: 'Years of Excellence',
    statDesc: 'Pioneering holistic wellness and advanced medical care.',
  },
  {
    id: 2,
    type: 'image',
    image: 'https://images.unsplash.com/photo-1552693673-1bf958298935?w=600&q=80',
    label: 'Wellness',
  },
  {
    id: 3,
    type: 'stat',
    statNumber: '200+',
    statTitle: 'Verified Specialists',
    statDesc:
      'Experienced providers focused on mental wellness, longevity, recovery, and optimized health.',
  },
  {
    id: 4,
    type: 'image',
    image: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=600&q=80',
    label: 'Relaxation',
  },
  {
    id: 5,
    type: 'stat',
    statNumber: '2500+',
    statTitle: 'Happy Patients',
    statDesc: 'Transforming lives through personalized care and science-backed solutions.',
  },
  {
    id: 6,
    type: 'image',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&q=80',
    label: 'Rejuvenation',
  },
];

export default function AboutUsSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);

  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  const totalSlides = slides.length;

  const goNext = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const goPrev = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  const startAutoPlay = useCallback(() => {
    autoPlayRef.current = setInterval(goNext, 3500);
  }, [goNext]);

  const stopAutoPlay = useCallback(() => {
    if (autoPlayRef.current) clearInterval(autoPlayRef.current);
  }, []);

  useEffect(() => {
    startAutoPlay();
    return stopAutoPlay;
  }, [startAutoPlay, stopAutoPlay]);

  const visibleSlides = Array.from(
    { length: 4 },
    (_, i) => slides[(currentSlide + i) % totalSlides]
  );

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStartX(e.clientX);
    stopAutoPlay();
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (!isDragging) return;

    const diff = e.clientX - dragStartX;

    if (diff < -40) goNext();
    else if (diff > 40) goPrev();

    setIsDragging(false);
    startAutoPlay();
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setDragStartX(e.touches[0].clientX);
    stopAutoPlay();
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = e.changedTouches[0].clientX - dragStartX;

    if (diff < -40) goNext();
    else if (diff > 40) goPrev();

    startAutoPlay();
  };

  return (
    <section id="about" className="bg-[#f5f0e8] py-20 md:py-28 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        {/* Heading */}
        <motion.div
          className="mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
        >
          {/* Top label - left to right */}
          <motion.span
            className="text-[11px] tracking-[0.2em] text-[#c9623a] uppercase block"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            Mental Wellness Reimagined
          </motion.span>

          {/* Heading - right to left */}
          <motion.h2
            className="text-4xl md:text-5xl lg:text-[72px] font-bold text-[#1a1008] leading-[1.05] mt-4"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            Wellness Goes
            <br />
            Beyond Treatment
          </motion.h2>
        </motion.div>

        {/* Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8 }}
          className="mb-16 cursor-grab active:cursor-grabbing perspective-[1200px]"
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={() => setIsDragging(false)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onMouseEnter={stopAutoPlay}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {visibleSlides.map((slide, i) => {
              const centerIndex = 1.5; // middle focus point
              const distance = i - centerIndex;

              return (
                <motion.div
                  key={`${slide.id}-${i}`}
                  initial={{ opacity: 0, scale: 0.8, rotateY: 25 }}
                  whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    duration: 0.6,
                    delay: i * 0.08,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                  animate={{
                    scale: 1 - Math.abs(distance) * 0.08,
                    rotateY: distance * 12,
                    z: Math.abs(distance) * -80,
                  }}
                  style={{
                    transformStyle: 'preserve-3d',
                  }}
                  className="rounded-xl overflow-hidden shadow-xl"
                >
                  {slide.type === 'image' ? (
                    <div className="relative h-[320px]">
                      <Image src={slide.image!} alt={slide.label!} fill className="object-cover" />
                      <div className="absolute inset-0 bg-black/30" />
                      <span className="absolute bottom-4 left-4 text-white text-sm">
                        {slide.label}
                      </span>
                    </div>
                  ) : (
                    <div className="h-[320px] bg-[#1a1008] text-white flex flex-col justify-center p-6">
                      <h3 className="text-5xl font-bold mb-3 fon">{slide.statNumber}</h3>
                      <p className="font-semibold mb-2">{slide.statTitle}</p>
                      <p className="text-white/60 text-sm">{slide.statDesc}</p>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </motion.div>
        {/* Bottom */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="flex flex-col md:flex-row justify-between gap-8"
        >
          <div className="flex gap-4 items-center">
            <div className="flex -space-x-3">
              {[
                'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80',
                'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80',
              ].map((src, i) => (
                <Image
                  width={40}
                  height={40}
                  alt="Images"
                  key={i}
                  src={src}
                  className="w-10 h-10 rounded-full border-2 border-[#f5f0e8]"
                />
              ))}
            </div>

            <div>
              <p className="text-[#c9623a]">★★★★★</p>
              <p className="text-sm text-black/60">2500+ Happy Customers</p>
            </div>
          </div>

          <p className="max-w-xl text-black/70 text-right">
            At <span className="font-semibold text-black">AURUM STAR</span>, wellness becomes a
            deeply personalized journey with advanced care and science-backed healing.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
