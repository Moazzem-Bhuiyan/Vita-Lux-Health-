'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import newsletter from '@/assets/newsletter/newsletter.png';
import Image from 'next/image';
export default function NewsletterBanner() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-60px' });
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubscribe = () => {
    if (email.trim()) {
      setSent(true);
      setEmail('');
      setTimeout(() => setSent(false), 3000);
    }
  };

  return (
    <section ref={sectionRef} className="relative overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image src={newsletter} alt="Wellness background" className="w-full h-full object-cover" />
        {/* <div className="absolute inset-0 bg-black/55" /> */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-[1440px] mx-auto px-8 md:px-14 py-20 md:py-28">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4 mb-5"
        >
          <span className="text-[11px] tracking-[0.2em] text-white/60 uppercase font-medium">
            Have a Question or Need Assistance?
          </span>
          <div className="h-px w-16 bg-white/30" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-4xl md:text-5xl lg:text-6xl text-white font-serif leading-[1.05] mb-10 max-w-2xl"
        >
          Your Journey to Better Health Starts Here
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="flex items-stretch gap-0 max-w-sm"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSubscribe()}
            placeholder="Your Email Please..."
            className="flex-1 bg-black/30 border border-white/30 rounded-l-lg px-5 py-3.5 text-white placeholder-white/50 text-sm focus:outline-none focus:border-white/60 backdrop-blur-sm transition-colors"
          />
          <button
            onClick={handleSubscribe}
            className="bg-white text-[#1a1008] text-sm font-medium px-6 py-3.5 rounded-r-lg hover:bg-white/90 transition-colors whitespace-nowrap"
          >
            {sent ? 'Subscribed!' : 'Subscribe'}
          </button>
        </motion.div>
      </div>
    </section>
  );
}
