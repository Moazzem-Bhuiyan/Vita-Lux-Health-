'use client';

import { useRef, useState, useEffect, useCallback, useMemo } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useGetServicesQuery } from '@/redux/api/serviceApi';

export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);

  const router = useRouter();

  // Fetch services
  const { data: servicesData, isLoading, isError } = useGetServicesQuery({});

  const allServices = servicesData?.data?.data || [];

  // Extract unique categories
  const categories = useMemo(() => {
    const cats = new Set(['All']);
    allServices.forEach((service: any) => {
      if (service.category?.name) cats.add(service.category.name);
    });
    return Array.from(cats);
  }, [allServices]);

  // Filter services by category
  const filteredServices = useMemo(() => {
    if (activeCategory === 'All') return allServices;
    return allServices.filter((service: any) => service.category?.name === activeCategory);
  }, [allServices, activeCategory]);

  const visibleCount = 3;
  const totalSlides = filteredServices.length;

  const clampedIndex = (idx: number) => {
    if (totalSlides === 0) return 0;
    return ((idx % totalSlides) + totalSlides) % totalSlides;
  };

  const goNext = useCallback(() => {
    if (totalSlides <= visibleCount) return;
    setCurrentIndex((prev) => clampedIndex(prev + 1));
  }, [totalSlides, visibleCount]);

  const goPrev = useCallback(() => {
    if (totalSlides <= visibleCount) return;
    setCurrentIndex((prev) => clampedIndex(prev - 1));
  }, [totalSlides, visibleCount]);

  // Auto-play
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  const startAutoPlay = useCallback(() => {
    if (totalSlides > visibleCount) {
      autoPlayRef.current = setInterval(goNext, 4000);
    }
  }, [goNext, totalSlides, visibleCount]);

  const stopAutoPlay = useCallback(() => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
      autoPlayRef.current = null;
    }
  }, []);

  useEffect(() => {
    startAutoPlay();
    return stopAutoPlay;
  }, [startAutoPlay, stopAutoPlay, activeCategory]);

  // Visible items
  const visibleItems = useMemo(() => {
    if (totalSlides === 0) return [];
    return Array.from(
      { length: visibleCount },
      (_, i) => filteredServices[clampedIndex(currentIndex + i)]
    );
  }, [filteredServices, currentIndex, totalSlides, visibleCount]);

  const handleServiceClick = (service: any) => {
    router.push(`/service/serviceDetails?slug=${service.slug}`);
  };

  // Drag Handlers
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
      if (dragOffset < -60 && totalSlides > visibleCount) goNext();
      else if (dragOffset > 60 && totalSlides > visibleCount) goPrev();
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
    if (diff < -60 && totalSlides > visibleCount) goNext();
    else if (diff > 60 && totalSlides > visibleCount) goPrev();
    startAutoPlay();
  };

  // ==================== LOADING STATE WITH SPINNER ====================
  if (isLoading) {
    return (
      <section className="bg-[#1a1008] py-20 md:py-28 text-white" id="services">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 flex flex-col items-center justify-center min-h-[500px]">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
          >
            <Loader2 size={48} className="text-[#c9a96e]" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-6 text-[#c9a96e] text-xl tracking-wide"
          >
            Curating wellness experiences...
          </motion.p>
        </div>
      </section>
    );
  }

  // Empty State
  if (isError || allServices.length === 0) {
    return (
      <section className="bg-[#1a1008] py-20 md:py-28 text-white" id="services">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-md mx-auto"
          >
            <div className="text-6xl mb-6">🌿</div>
            <h3 className="text-3xl font-semibold mb-4">No Services Available</h3>
            <p className="text-white/70 text-lg">
              We are currently updating our wellness offerings.
              <br />
              Please check back soon.
            </p>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section ref={sectionRef} className="bg-[#1a1008] py-20 md:py-28 overflow-hidden" id="services">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="flex items-center gap-4 mb-4"
              transition={{ duration: 0.6 }}
            >
              <span className="text-[11px] tracking-[0.2em] text-[#c9a96e] uppercase font-medium">
                Thoughtfully Crafted Treatments
              </span>
              <div className="h-px w-16 bg-[#c9a96e]/40" />
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="text-4xl md:text-5xl lg:text-[75px] text-white font-bold leading-[1.05]"
              transition={{ duration: 0.6 }}
            >
              Curated Wellness
              <br /> Experiences
            </motion.h2>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-3 mb-10">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => {
                setActiveCategory(category);
                setCurrentIndex(0);
              }}
              className={`px-6 py-2.5 text-sm rounded-full transition-all ${
                activeCategory === category
                  ? 'bg-[#c9a96e] text-[#1a1008] font-medium'
                  : 'bg-white/5 text-white/70 hover:bg-white/10 border border-white/10'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Carousel */}
        <div
          className="cursor-grab active:cursor-grabbing select-none"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onMouseEnter={stopAutoPlay}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {visibleItems.map((service, i) => (
                <motion.div
                  key={`${service.id}-${currentIndex}-${i}`}
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -30, scale: 0.95 }}
                  transition={{ duration: 0.5, delay: i * 0.07 }}
                  className="group relative cursor-pointer"
                  onClick={() => handleServiceClick(service)}
                  onContextMenu={(e) => e.preventDefault()}
                >
                  <div className="relative overflow-hidden rounded-2xl aspect-[4/4.8] shadow-xl">
                    <Image
                      src={
                        service.media_library?.file_path
                          ? `http://103.186.20.110:9999/storage/${service.media_library.file_path}`
                          : '/placeholder-service.jpg'
                      }
                      width={800}
                      height={900}
                      alt={service.service_name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                  </div>

                  <div className="mt-5 text-center">
                    <h3 className="text-white text-2xl md:text-3xl font-medium tracking-wide font-sans">
                      {service.service_name}
                    </h3>
                    <p className="text-[#c9a96e] mt-2 text-sm">
                      ${parseFloat(service.price).toFixed(0)} • {service.duration} min
                    </p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Navigation Buttons */}
        {totalSlides > visibleCount && (
          <div className="flex items-center justify-center gap-6 mt-12">
            <button
              onClick={goPrev}
              className="nav-btn p-4 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-all active:scale-95"
              aria-label="Previous service"
            >
              <ChevronLeft size={28} />
            </button>
            <button
              onClick={goNext}
              className="nav-btn p-4 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-all active:scale-95"
              aria-label="Next service"
            >
              <ChevronRight size={28} />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
