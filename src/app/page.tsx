import { Metadata } from 'next';
import { Hero } from '@/sections/home/Hero';
import AboutUs from '@/sections/home/AboutUs';
import AboutUsSection from '@/sections/home/AboutUsSecond';
import ServicesSection from '@/sections/home/ServiceSection/ServicesSection';
import TestimonialsSection from '@/sections/home/TestomonialSection/TestimonialsSection';
import ContactSection from '@/sections/home/ContactSection/ContactSection';
import NewsletterBanner from '@/sections/home/NewsLetterSection/NewsletterBanner';

export const metadata: Metadata = {
  title: 'Aurum Star Health — Luxury Spa & Wellness',
  description:
    'Experience transformative wellness at Aurum Star Health. Luxury spa treatments, holistic therapies, and personalized wellness programs in New York.',
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <AboutUs />
      <AboutUsSection />
      <ServicesSection />
      <TestimonialsSection />
      <ContactSection />

      {/* <ServicesPreview />
      <BookingWidget />
      <Testimonials />
      <Promotions />
      <SocialMedia /> */}
    </>
  );
}
