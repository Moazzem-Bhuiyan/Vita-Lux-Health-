'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Facebook, Twitter, Instagram } from 'lucide-react';
import contactImage from '@/assets/contact/contact.png';
import Image from 'next/image';

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    topic: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  const inputClass =
    'w-full bg-transparent border border-white/15 rounded-lg px-5 py-4 text-white placeholder-white/35 text-sm focus:outline-none focus:border-white/40 transition-colors duration-200';

  return (
    <section ref={sectionRef} className="bg-[#140d04] min-h-screen flex items-stretch" id="contact">
      <div className="w-full max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-2">
        {/* Left: Form */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="flex flex-col justify-center px-8 md:px-14 lg:px-16 py-20"
        >
          {/* Label */}
          <div className="flex items-center gap-4 mb-6">
            <span className="text-[11px] tracking-[0.2em] text-white/50 uppercase font-medium">
              Have a Question or Need Assistance?
            </span>
            <div className="h-px w-12 bg-white/20" />
          </div>

          {/* Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 25 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl md:text-[64px] text-white font-bold leading-[1.05] mb-10"
          >
            Speak With Our
            <br />
            Care Team
          </motion.h2>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-4"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Full name"
                className={inputClass}
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email address"
                className={inputClass}
              />
            </div>
            <input
              type="text"
              name="topic"
              value={formData.topic}
              onChange={handleChange}
              placeholder="What Can We Help You With?"
              className={inputClass}
            />
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Any special query about us....."
              rows={6}
              className={`${inputClass} resize-none`}
            />
          </motion.div>

          {/* Bottom row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="flex items-center justify-between mt-8"
          >
            <div className="flex items-center gap-3">
              <button
                onClick={handleSubmit}
                className="flex items-center gap-3 border border-white/30 text-white text-sm px-6 py-3.5 rounded-lg hover:bg-white/10 hover:border-white/50 transition-all duration-300 group"
              >
                {submitted ? 'Sent!' : 'Our Services'}
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            <div className="flex items-center gap-3">
              {[
                { Icon: Facebook, href: '#' },
                { Icon: Twitter, href: '#' },
                { Icon: Instagram, href: '#' },
              ].map(({ Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-white/50 hover:bg-white/10 transition-all duration-300"
                  aria-label="Social link"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Right: Image */}
        <motion.div
          initial={{ opacity: 0, scale: 1.03 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1, delay: 0.15 }}
          className="hidden lg:flex relative overflow-hidden   !items-center md:flex justify-center "
        >
          <Image src={contactImage} alt="Wellness" className="h-[743px] w-[670px] object-cover" />
          {/* <div className="absolute inset-0 bg-gradient-to-r from-[#140d04]/60 to-transparent" /> */}
        </motion.div>
      </div>
    </section>
  );
}
