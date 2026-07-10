'use client';

import { useRef, useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence, useInView } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { useCheckReviewEligibilityQuery, useGetReviewsQuery } from '@/redux/api/reviewApi';
import { FeedbackForm, StarRating } from './FeedBackForm';
import { useSelector } from 'react-redux';
import { selectUser } from '@/redux/features/authSlice';

export default function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });
  const user = useSelector(selectUser);
  const email = user?.email || '';
  const [activeIdx, setActiveIdx] = useState(0);
  const [mode, setMode] = useState<'reviews' | 'feedback'>('reviews');
  const [selectedReview, setSelectedReview] = useState<{
    serviceId: number;
    booking_detail_id: number;
    serviceName: string;
  } | null>(null);

  const scrollLockRef = useRef(false);

  // ====================== API CALLS ======================
  const { data: reviewsData } = useGetReviewsQuery({});
  const { data: eligibilityData } = useCheckReviewEligibilityQuery(undefined, {
    skip: !email,
  });

  const reviews = reviewsData?.data?.data || [];

  // Check if user can give feedback
  const canGiveFeedback = useMemo(() => {
    return eligibilityData?.data?.some((item: any) => !item.is_review) || false;
  }, [eligibilityData]);

  // Get first pending review
  const nextPendingReview = useMemo(() => {
    const pending = eligibilityData?.data?.find((item: any) => !item.is_review);
    if (!pending) return null;

    return {
      serviceId: pending.service_id,
      booking_detail_id: pending.booking_detail_id,
      serviceName: pending.service_name || 'Service',
    };
  }, [eligibilityData]);

  // ====================== SCROLL LOGIC ======================
  const scrollToCard = useCallback((idx: number) => {
    const container = scrollRef.current;
    if (!container) return;

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

    setTimeout(() => {
      scrollLockRef.current = false;
    }, 600);
  }, []);

  const changeActive = useCallback(
    (idx: number) => {
      setActiveIdx(idx);
      setTimeout(() => scrollToCard(idx), 30);
    },
    [scrollToCard]
  );

  const prev = () => changeActive((activeIdx - 1 + reviews.length) % reviews.length);
  const next = () => changeActive((activeIdx + 1) % reviews.length);

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

  // Open feedback
  const openFeedback = () => {
    if (nextPendingReview) {
      setSelectedReview(nextPendingReview);
      setMode('feedback');
    }
  };

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

            <AnimatePresence mode="wait">
              {mode === 'reviews' ? (
                <motion.div
                  key="reviews-nav"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Dot indicators */}
                  <div className="flex items-center gap-2 mb-8">
                    {reviews.map((_: any, i: any) => (
                      <button
                        key={i}
                        onClick={() => changeActive(i)}
                        className={`rounded-full transition-all duration-300 h-1.5 ${
                          i === activeIdx
                            ? 'w-6 bg-[#1a1008]'
                            : 'w-1.5 bg-[#1a1008]/25 hover:bg-[#1a1008]/50'
                        }`}
                      />
                    ))}
                  </div>

                  <div className="flex items-center gap-4">
                    <button
                      onClick={prev}
                      className="w-14 h-14 rounded-full bg-[#1a1008] flex items-center justify-center text-white hover:bg-[#2d1f0e] transition-colors group"
                    >
                      <ChevronLeft
                        size={20}
                        className="group-hover:-translate-x-0.5 transition-transform"
                      />
                    </button>
                    <button
                      onClick={next}
                      className="w-14 h-14 rounded-full border border-[#1a1008]/20 flex items-center justify-center text-[#1a1008] hover:bg-[#1a1008]/5 transition-colors group"
                    >
                      <ChevronRight
                        size={20}
                        className="group-hover:translate-x-0.5 transition-transform"
                      />
                    </button>

                    {canGiveFeedback && (
                      <button
                        onClick={openFeedback}
                        className="h-14 px-6 rounded-full bg-[#1a1008] text-white text-sm font-medium hover:bg-[#2d1f0e] transition-colors"
                      >
                        Give Feedback
                      </button>
                    )}
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="feedback-nav"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center gap-4"
                >
                  <button
                    onClick={() => setMode('reviews')}
                    className="w-14 h-14 rounded-full bg-[#1a1008] flex items-center justify-center text-white hover:bg-[#2d1f0e] transition-colors group"
                  >
                    <ChevronLeft
                      size={20}
                      className="group-hover:-translate-x-0.5 transition-transform"
                    />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* ── Right: Scrollable card list OR feedback form ── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="md:w-[62%] relative"
          >
            <AnimatePresence mode="wait">
              {mode === 'reviews' ? (
                <motion.div key="reviews-panel" className="relative">
                  <div className="pointer-events-none absolute top-0 inset-x-0 h-20 bg-gradient-to-b from-[#f5f0e8] to-transparent z-10" />
                  <div className="pointer-events-none absolute bottom-0 inset-x-0 h-20 bg-gradient-to-t from-[#f5f0e8] to-transparent z-10" />

                  <div
                    ref={scrollRef}
                    onScroll={handleScroll}
                    className="flex flex-col gap-3 overflow-y-auto pr-1"
                    style={{ height: '540px', scrollbarWidth: 'none' }}
                  >
                    <div aria-hidden className="flex-shrink-0 h-[200px]" />

                    {reviews.length > 0 ? (
                      reviews.map((review: any, i: number) => {
                        const isActive = i === activeIdx;
                        const user = review.user;

                        return (
                          <motion.div
                            key={review.id}
                            data-card-index={i}
                            layout
                            onClick={() => changeActive(i)}
                            animate={{ opacity: isActive ? 1 : 0.5, scale: isActive ? 1 : 0.975 }}
                            className={`rounded-2xl cursor-pointer flex-shrink-0 ${
                              isActive
                                ? 'bg-[#1a1008] text-white shadow-2xl'
                                : 'bg-white/80 text-[#1a1008]'
                            }`}
                          >
                            {isActive ? (
                              <div className="p-6 md:p-7">
                                <StarRating filled />
                                <p className="text-white/90 text-base leading-relaxed mt-4 mb-6 font-light">
                                  &quot;{review.comment}&quot;
                                </p>
                                <div className="flex items-center gap-3">
                                  <div className="w-11 h-11 rounded-full overflow-hidden ring-2 ring-white/20">
                                    <Image
                                      src={
                                        user?.avatar
                                          ? `http://103.186.20.110:9999/storage/${user.avatar}`
                                          : '/nouser.png'
                                      }
                                      alt={user?.name || 'User'}
                                      width={100}
                                      height={100}
                                      className="w-full h-full object-cover"
                                    />
                                  </div>
                                  <div>
                                    <p className="font-semibold text-white text-sm">{user?.name}</p>
                                    <p className="text-white/50 text-xs">Wellness Client</p>
                                  </div>
                                </div>
                              </div>
                            ) : (
                              <div className="p-4 flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full overflow-hidden">
                                  <Image
                                    src={
                                      user?.avatar
                                        ? `/storage/${user.avatar}`
                                        : '/default-avatar.png'
                                    }
                                    width={40}
                                    height={40}
                                    alt={user?.name || 'User'}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center justify-between gap-2 mb-1">
                                    <p className="font-medium text-sm truncate">{user?.name}</p>
                                    <StarRating filled={false} />
                                  </div>
                                  <p className="text-xs text-[#1a1008]/45 truncate">
                                    {review.comment}
                                  </p>
                                </div>
                              </div>
                            )}
                          </motion.div>
                        );
                      })
                    ) : (
                      <div className="flex flex-col items-center justify-center !h-[400px]   text-center px-4 md:-mt-[200px]">
                        <motion.div>
                          <div className="text-[90px] mb-6">🌿</div>
                          <h3 className="text-3xl font-semibold text-[#1a1008] mb-3">
                            No Reviews Yet
                          </h3>
                          <p className="text-[#1a1008]/60 max-w-sm mx-auto text-lg">
                            Be the first to share your experience with our wellness services.
                          </p>
                        </motion.div>
                      </div>
                    )}

                    {/* <div aria-hidden className="flex-shrink-0 h-[200px]" /> */}
                  </div>
                </motion.div>
              ) : (
                <motion.div key="feedback-panel">
                  {selectedReview && (
                    <FeedbackForm
                      serviceId={selectedReview.serviceId}
                      bookingId={selectedReview.booking_detail_id}
                      serviceName={selectedReview.serviceName}
                      onDiscard={() => {
                        setMode('reviews');
                        setSelectedReview(null);
                      }}
                    />
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      <style>{`div::-webkit-scrollbar { display: none; }`}</style>
    </section>
  );
}
