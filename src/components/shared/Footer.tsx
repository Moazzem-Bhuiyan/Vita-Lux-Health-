'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Facebook, Twitter, Instagram, ArrowRight, Phone, Mail, MapPin } from 'lucide-react';
import Logo from '@/assets/Logo/Logo.png';
import Image from 'next/image';
import { useSubscribeMutation } from '@/redux/api/subscribeApi';

const footerLinks = {
  navigation: [
    { label: 'Home', href: '/' },
    { label: 'About Us', href: '/#about' },
    { label: 'Services', href: '/#services' },
    { label: 'Blog', href: '/blog' },
    { label: 'Reviews', href: '/#reviews' },
    { label: 'Contact', href: '/#contact' },
    'Services',
    'Testimonials',
    'Contact us',
  ],
  legal: [
    { label: 'Privacy Policy', href: '/privacy-policy' },
    { label: 'Terms of Service', href: '/terms' },
  ],
};

export default function Footer() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-60px' });
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');
  const [subscribe, { isLoading }] = useSubscribeMutation();

  const handleSubscribe = async () => {
    if (!email.trim()) {
      setError('Please enter your email address');
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setError('');

    try {
      const response = await subscribe({ email }).unwrap();

      if (response?.status === 'success') {
        setSent(true);
        setEmail('');
        setError('');

        // Auto hide success message after 4 seconds
        setTimeout(() => {
          setSent(false);
        }, 4000);
      }
    } catch (err: any) {
      console.error('Subscription failed:', err);
      setError(err?.data?.message || 'Failed to subscribe. Please try again.');
    }
  };

  return (
    <footer ref={sectionRef} className="bg-[#140d04] text-white">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 pt-20 pb-12">
        {/* Top Section - Tagline + Socials */}
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <p className="text-[11px] tracking-[0.25em] text-white/40 uppercase mb-3 flex items-center gap-3">
              Mental Wellness Reimagined
              <span className="block h-px w-14 bg-white/20" />
            </p>
            <h3 className="text-4xl md:text-[54px] font-bold leading-none tracking-tighter">
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
                <Icon size={18} />
              </a>
            ))}
          </motion.div>
        </div>

        {/* Main Content Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="grid grid-cols-1 md:grid-cols-12 gap-x-8 gap-y-12 pb-16 border-b border-white/10"
        >
          {/* Navigation */}
          <div className="md:col-span-3">
            <h4 className="text-xl font-medium mb-6">Navigation</h4>
            <ul className="space-y-3">
              {footerLinks.navigation.map((link: any) => (
                <li key={link?.label}>
                  <a
                    href={link?.href}
                    className="text-white/60 hover:text-white transition-colors duration-200 text-[15px]"
                  >
                    {link?.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div className="md:col-span-3">
            <h4 className="text-xl font-medium mb-6">Legal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link: any) => (
                <li key={link?.label}>
                  <a
                    href={link?.href}
                    className="text-white/60 hover:text-white transition-colors duration-200 text-[15px]"
                  >
                    {link?.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="md:col-span-6 lg:col-span-3">
            <h4 className="text-xl font-medium mb-6">Stay Updated</h4>
            <p className="text-white/60 text-[15px] mb-5">
              Join our community for wellness insights and updates.
            </p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="max-w-md"
            >
              <div className="flex items-stretch gap-0">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError('');
                  }}
                  onKeyDown={(e) => e.key === 'Enter' && handleSubscribe()}
                  placeholder="Your Email Please..."
                  className="flex-1 bg-black/30 border border-white/30 rounded-l-lg px-5 py-3.5 text-white placeholder-white/50 text-sm focus:outline-none focus:border-white/60 backdrop-blur-sm transition-colors"
                  disabled={isLoading || sent}
                />
                <button
                  onClick={handleSubscribe}
                  disabled={isLoading || sent || !email.trim()}
                  className="bg-white text-[#1a1008] text-sm font-medium px-8 py-3.5 rounded-r-lg hover:bg-white/90 transition-colors whitespace-nowrap disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'Subscribing...' : sent ? 'Subscribed!' : 'Subscribe'}
                </button>
              </div>

              {/* Error Message */}
              {error && <p className="text-red-400 text-sm mt-2 pl-1">{error}</p>}

              {/* Success Message */}
              {sent && !error && (
                <p className="text-green-400 text-sm mt-2 pl-1">
                  Thank you! You have successfully subscribed to our newsletter.
                </p>
              )}
            </motion.div>
          </div>

          {/* Logo + Contact Info */}
          <div className="md:col-span-12 lg:col-span-3 flex flex-col items-start lg:items-end">
            <div className="mb-8 lg:mb-6">
              <div className="w-[160px] h-[160px] relative">
                <Image src={Logo} alt="Aurum Health" fill className="object-contain" priority />
              </div>
            </div>

            <div className="space-y-4 text-sm text-white/70">
              <a
                href="tel:8008543453"
                className="flex items-center gap-3 hover:text-white transition-colors"
              >
                <Phone size={17} className="text-white/50" />
                (800) 854-3453
              </a>
              <a
                href="mailto:hello@acmesaw.com"
                className="flex items-center gap-3 hover:text-white transition-colors"
              >
                <Mail size={17} className="text-white/50" />
                hello@acmesaw.com
              </a>
              <div className="flex items-start gap-3">
                <MapPin size={17} className="text-white/50 mt-0.5" />
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
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/40"
        >
          <p>© 2025 Aurum Health. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-white/70 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white/70 transition-colors">
              Terms & Conditions
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
