'use client';
import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Facebook, Twitter, Instagram, X } from 'lucide-react';
import contactImage from '@/assets/contact/contact.png';
import Image from 'next/image';
import { useContactUsMutation } from '@/redux/api/contactApi';

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });

  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showSuccess, setShowSuccess] = useState(false);

  const [contactUs, { isLoading }] = useContactUsMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear field error on typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.full_name.trim()) newErrors.full_name = 'Full name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Please enter a valid email';
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.message.trim()) newErrors.message = 'Message is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const response = await contactUs(formData).unwrap();

      if (response?.status === 'success') {
        setShowSuccess(true);
        // Reset form
        setFormData({ full_name: '', email: '', subject: '', message: '' });
        setErrors({});
      }
    } catch (error: any) {
      console.error('Contact form error:', error);

      const errorMessage =
        error?.data?.message || error?.message || 'Failed to send message. Please try again.';

      setErrors({ general: errorMessage });
    }
  };

  const closeSuccessModal = () => {
    setShowSuccess(false);
  };

  const inputClass =
    'w-full bg-transparent border border-white/15 rounded-lg px-5 py-4 text-white placeholder-white/35 text-sm focus:outline-none focus:border-white/40 transition-colors duration-200';

  return (
    <section ref={sectionRef} className="bg-[#140d04] min-h-screen flex items-stretch" id="contact">
      <div className="w-full max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-2">
        {/* Left: Form */}
        <motion.div
          viewport={{ once: true, amount: 0.2 }}
          initial={{ opacity: 0, x: -40 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="flex flex-col justify-center px-8 md:px-14 lg:px-16 py-20"
        >
          <div className="flex items-center gap-4 mb-6">
            <span className="text-[11px] tracking-[0.2em] text-white/50 uppercase font-medium">
              Have a Question or Need Assistance?
            </span>
            <div className="h-px w-12 bg-white/20" />
          </div>

          <motion.h2
            viewport={{ once: false, amount: 0.2 }}
            initial={{ opacity: 0, y: 25 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl md:text-[64px] text-white font-bold leading-[1.05] mb-10"
          >
            Speak With Our
            <br />
            Care Team
          </motion.h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <input
                  type="text"
                  name="full_name"
                  value={formData.full_name}
                  onChange={handleChange}
                  placeholder="Full name"
                  className={inputClass}
                />
                {errors.full_name && (
                  <p className="text-red-400 text-xs mt-1">{errors.full_name}</p>
                )}
              </div>

              <div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email address"
                  className={inputClass}
                />
                {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
              </div>
            </div>

            <div>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="What Can We Help You With?"
                className={inputClass}
              />
              {errors.subject && <p className="text-red-400 text-xs mt-1">{errors.subject}</p>}
            </div>

            <div>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Any special query about us....."
                rows={6}
                className={`${inputClass} resize-none`}
              />
              {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message}</p>}
            </div>

            {errors.general && (
              <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">
                {errors.general}
              </div>
            )}

            <motion.div
              viewport={{ once: false, amount: 0.2 }}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.35 }}
              className="flex items-center justify-between mt-8"
            >
              <button
                type="submit"
                disabled={isLoading}
                className="flex items-center gap-3 border border-white/30 text-white text-sm px-8 py-4 rounded-lg hover:bg-white/10 hover:border-white/50 transition-all duration-300 group disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Sending...' : 'Send Message'}
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>

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
                    <Icon size={18} />
                  </a>
                ))}
              </div>
            </motion.div>
          </form>
        </motion.div>

        {/* Right: Image */}
        <motion.div
          viewport={{ once: false, amount: 0.2 }}
          initial={{ opacity: 0, scale: 1.03 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1, delay: 0.15 }}
          className="hidden lg:flex relative overflow-hidden items-center justify-center"
        >
          <Image
            src={contactImage}
            alt="Contact Wellness"
            className="h-[743px] w-[670px] object-cover"
          />
        </motion.div>
      </div>

      {/* Success Modal */}
      {showSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            viewport={{ once: false, amount: 0.2 }}
            className="bg-[#1a1008] rounded-3xl max-w-md w-full p-10 text-center relative"
          >
            <button
              onClick={closeSuccessModal}
              className="absolute top-6 right-6 text-white/60 hover:text-white"
            >
              <X size={24} />
            </button>

            <div className="mx-auto w-20 h-20 rounded-full bg-emerald-500/10 flex items-center justify-center mb-6">
              <div className="w-12 h-12 rounded-full bg-emerald-500 flex items-center justify-center">
                ✓
              </div>
            </div>

            <h3 className="text-3xl font-bold text-white mb-3">Message Sent!</h3>
            <p className="text-white/70 text-lg">
              Thank you for reaching out. Our care team will get back to you shortly.
            </p>

            <button
              onClick={closeSuccessModal}
              className="mt-8 w-full py-4 bg-white text-[#1a1008] rounded-xl font-medium hover:bg-white/90 transition-colors"
            >
              Done
            </button>
          </motion.div>
        </div>
      )}
    </section>
  );
}
