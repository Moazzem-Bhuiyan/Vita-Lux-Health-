'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Facebook, Twitter, Instagram, ArrowRight, Phone, Mail, MapPin } from 'lucide-react';
import Logo from '@/assets/Logo/Logo.png';
import Image from 'next/image';

const footerLinks = {
  services: [
    'Weightloss',
    'Anti-aging',
    'Depression and Anxiety',
    'Hormone Optimization',
    'Energy Boost',
    'Red Light Therapy',
    'Hyperbaric Therapy',
  ],
  navigation: ['Home', 'Join us', 'Contact us', 'About us', 'Services', 'Testimonials'],
  legal: ['Blog', 'FAQ', 'Help Center', 'Privacy Policy', 'Terms of Service'],
};

export default function Footer() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-60px' });
  const [email, setEmail] = useState('');

  return (
    <footer ref={sectionRef} className="bg-[#140d04]">
      {/* Main footer body */}
      <div className="max-w-[1440px] mx-auto px-8 md:px-12 pt-20 pb-10">
        {/* Top: tagline + socials */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <p className="text-[11px] tracking-[0.25em] text-white/40 uppercase mb-3 flex items-center gap-3">
              Mental Wellness Reimagined
              <span className="block h-px w-14 bg-white/20" />
            </p>
            <h3 className="text-3xl md:text-[54px] text-white font-bold leading-tight">
              Wellness goes
              <br />
              beyond treatment
            </h3>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex items-center gap-3"
          >
            {[
              { Icon: Facebook, href: '#' },
              { Icon: Twitter, href: '#' },
              { Icon: Instagram, href: '#' },
            ].map(({ Icon, href }, i) => (
              <a
                key={i}
                href={href}
                className="w-11 h-11 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-white/50 hover:bg-white/10 transition-all duration-300"
              >
                <Icon size={17} />
              </a>
            ))}
          </motion.div>
        </div>

        {/* Grid: Links + Contact */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="grid grid-cols-2 md:grid-cols-5 gap-10 pb-14 border-b border-white/8"
        >
          {/* Services */}
          <div>
            <h4 className="text-white text-[24px] font-medium mb-5">Services</h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-white/45 text-sm hover:text-white/80 transition-colors duration-200"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-white text-[24px] font-medium mb-5">Navigation</h4>
            <ul className="space-y-3">
              {footerLinks.navigation.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-white/45 text-sm hover:text-white/80 transition-colors duration-200"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-white text-[24px] font-medium mb-5">Legal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-white/45 text-sm hover:text-white/80 transition-colors duration-200"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact + Logo */}
          <div className="col-span-2 md:col-span-2 flex flex-col gap-8">
            {/* Email input */}
            <div className="flex items-stretch">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your Email address"
                className="flex-1 bg-white/8 border border-white/12 rounded-l-lg px-4 py-3   focus:outline-none focus:border-white/30 transition-colors"
              />
              <button className="bg-white/15 border border-white/12 border-l-0 px-4 rounded-r-lg text-white hover:bg-white/25 transition-colors">
                <ArrowRight size={16} />
              </button>
            </div>

            {/* Logo + Contact */}
            <div className="flex flex-col md:flex-row gap-6 items-start">
              {/* Logo */}
              <div className="flex-shrink-0 w-[197px] h-[198px]">
                <div className="w-full h-ful">
                  <Image src={Logo} alt="Aurum Health" className=" object-contain " />
                </div>
              </div>

              {/* Contact details */}
              <div className="space-y-3">
                <a
                  href="tel:8008543453"
                  className="flex items-center gap-2.5 text-white/60 text-sm hover:text-white/90 transition-colors group"
                >
                  <Phone size={14} className="text-white/40 group-hover:text-white/70" />
                  (800) 854-3453
                </a>
                <a
                  href="mailto:hello@acmesaw.com"
                  className="flex items-center gap-2.5 text-white/60 text-sm hover:text-white/90 transition-colors group"
                >
                  <Mail size={14} className="text-white/40 group-hover:text-white/70" />
                  hello@acmesaw.com
                </a>
                <div className="flex items-start gap-2.5 text-white/60 text-sm">
                  <MapPin size={14} className="text-white/40 mt-0.5 flex-shrink-0" />
                  <span>
                    Acme Saw Delivery Center
                    <br />
                    121 Rimmons Road, Suite 124
                    <br />
                    Bridgeport, CT 06477, USA
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bottom bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8"
        >
          <p className="text-white/35 text-sm">© 2025 Aurum Health. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-white/35 text-sm hover:text-white/70 transition-colors">
              Privacy & Policy
            </a>
            <a href="#" className="text-white/35 text-sm hover:text-white/70 transition-colors">
              Terms & Conditions
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
