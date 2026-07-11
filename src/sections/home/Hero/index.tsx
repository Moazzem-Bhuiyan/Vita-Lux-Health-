import Link from 'next/link';
import { ArrowDown } from 'lucide-react';
import { Button } from '@/components/ui';
import Herobg from '@/assets/hero/herobg.png';
import Icon1 from '@/assets/Stats/icon1.png';
import Icon2 from '@/assets/Stats/icon2.png';
import Icon3 from '@/assets/Stats/icon3.png';
import Image from 'next/image';

export function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${Herobg.src})`,
        }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/55 to-black/20 lg:from-black/50 lg:via-black/40 lg:to-transparent" />

      {/* Content */}
      <div className="relative z-10 flex justify-between pt-24 pb-16 sm:pt-28 sm:pb-20 lg:pt-32 lg:pb-24">
        <div className="w-full max-w-5xl px-5 sm:px-8 md:px-10 lg:p-12">
          {/* Eyebrow */}
          <div
            className="flex items-center gap-3 sm:gap-4 mb-5 sm:mb-8 animate-fade-in"
            style={{ animationDelay: '0.1s' }}
          >
            <div className="w-8 sm:w-12 h-px bg-gold-500" />
            <span className="font-sans text-[9px] sm:text-[10px] tracking-[0.22em] sm:tracking-[0.3em] uppercase text-white font-medium">
              Luxury · Wellness ·
            </span>
          </div>

          {/* Heading */}
          <h1
            className="text-cream-50 leading-[1.05] text-[52px] sm:text-[76px] md:text-[96px] lg:text-[130px] font-bold mb-6 sm:mb-8 animate-fade-up"
            style={{ animationDelay: '0.2s' }}
          >
            Elevate Your
            <br />
            <em className="not-italic font-bold text-gold-400">Wellbeing</em>
          </h1>

          {/* CTA */}
          <div
            className="flex flex-col sm:flex-row items-start sm:items-center gap-4 animate-fade-up"
            style={{ animationDelay: '0.5s' }}
          >
            <Link href="/#services" scroll>
              <Button
                variant="ghost"
                size="lg"
                className="bg-white px-6 py-5 sm:py-6 rounded-none text-black font-medium shadow-luxury-lg transition-all duration-300 hover:bg-stone-900 hover:text-white"
              >
                Our Services
              </Button>
            </Link>
          </div>

          {/* Subheading */}
          <p
            className="font-sans font-light mt-7 sm:mt-10 text-cream-100/80 text-base sm:text-lg leading-relaxed max-w-xl mb-10 sm:mb-12 animate-fade-up"
            style={{ animationDelay: '0.35s' }}
          >
            At AURUM STAR, wellness is more than a treatment — it&apos;s a personalized journey
          </p>

          {/* Stats bar */}
          <div
            className="mt-10 sm:mt-16 lg:mt-20 pt-7 sm:pt-10 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 max-w-2xl animate-fade-up"
            style={{ animationDelay: '0.65s' }}
          >
            {[
              {
                value: Icon1,
                label: 'Tailored treatment plans',
                title: 'Personalized Care',
              },
              {
                value: Icon2,
                label: 'Access licensed providers for you',
                title: 'Expert-Led Wellness',
              },
              {
                value: Icon3,
                label: 'Supporting overall wellbeing',
                title: 'Holistic Approach',
              },
            ].map(({ value, label, title }) => (
              <div key={label} className="flex sm:block items-start gap-4 space-y-0 sm:space-y-2">
                <Image src={value} alt={title} className="w-8 h-8 object-contain shrink-0" />

                <div>
                  <p className="font-sans text-[13px] sm:text-[14px] tracking-[0.13em] sm:tracking-[0.15em] uppercase text-white mt-0 sm:mt-1">
                    {title}
                  </p>
                  <p className="font-sans text-[10px] tracking-[0.15em] uppercase text-cream-100/60 sm:text-cream-100/50 mt-1">
                    {label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="hidden sm:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-2 text-cream-100/40 animate-float">
        <span className="font-sans text-[9px] tracking-[0.25em] uppercase">Scroll</span>
        <ArrowDown size={14} />
      </div>
    </section>
  );
}
