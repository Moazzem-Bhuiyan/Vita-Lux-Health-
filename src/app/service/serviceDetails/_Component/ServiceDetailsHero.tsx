import { ArrowDown } from 'lucide-react';
import Icon1 from '@/assets/Stats/icon1.png';
import Icon2 from '@/assets/Stats/icon2.png';
import Icon3 from '@/assets/Stats/icon3.png';
import Image from 'next/image';
import { BookButton } from '@/components/booking/book-button';

export function ServiceDetailsHero({
  serviceDetails,
  isLoading,
}: {
  serviceDetails: any;
  isLoading: boolean;
}) {
  if (isLoading || !serviceDetails) {
    return <div className="py-20 text-center">Loading</div>;
  }
  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover object-contain bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(http://103.186.20.110:9999/storage/${serviceDetails?.media_library?.file_path})`,
        }}
      />
      {/* Dark overlay with gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/40 to-transparent" />
      {/* Subtle grain texture */}
      <div
        className="absolute inset-0 opacity-30"
        style={
          {
            // backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.15'/%3E%3C/svg%3E")`,
          }
        }
      />
      {/* Decorative gold lines */}
      {/* <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gold-500/30 to-transparent ml-[8vw] hidden lg:block" />
      <div className="absolute right-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gold-500/20 to-transparent mr-[8vw] hidden lg:block" /> */}
      {/* Content */}
      <div className="relative flex justify-between z-10 pt-32 pb-24">
        <div className="max-w-5xl p-12  ">
          {/* Eyebrow */}
          <div
            className="flex items-center gap-4 mb-8 animate-fade-in"
            style={{ animationDelay: '0.1s' }}
          >
            <div className="w-12 h-px bg-gold-500" />
            <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-white font-medium">
              {serviceDetails?.category?.name || 'Mental Health'}
            </span>
          </div>

          {/* Heading */}
          <h1
            className="font- text-cream-50 leading-[1.05] text-display-xl lg:text-[72px] font-bold mb-8 animate-fade-up"
            style={{ animationDelay: '0.2s' }}
          >
            {serviceDetails?.service_name}
            <br />
            {/* <em className="not-italic font-bold text-gold-400"> Depression & Anxiety</em> */}
          </h1>

          {/* CTAs */}
          <div
            className="flex flex-col sm:flex-row items-start sm:items-center gap-4 animate-fade-up"
            style={{ animationDelay: '0.5s' }}
          >
            <BookButton
              serviceId={String(serviceDetails?.id)}
              className="rounded-md bg-white text-black hover:bg-stone-800"
            >
              Book Now
            </BookButton>
          </div>

          {/* Subheading */}
          <p
            className="font-sans font-light mt-10 text-cream-100/70 text-lg leading-relaxed max-w-xl mb-12 animate-fade-up"
            style={{ animationDelay: '0.35s' }}
          >
            <div
              className="prose prose-lg max-w-none text-[#ffffff]/70 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: serviceDetails?.service_details.slice(0, 200) }}
            />
          </p>

          {/* Stats bar */}
          <div
            className="mt-20 pt-10 border-t border-white/10 grid grid-cols-3 gap-8 max-w-2xl animate-fade-up"
            style={{ animationDelay: '0.65s' }}
          >
            {[
              { value: Icon1, label: 'Tailored treatment plans', title: 'Personalized Care' },
              {
                value: Icon2,
                label: 'Access licensed providers for you',
                title: 'Expert-Led Wellness',
              },
              { value: Icon3, label: 'Supporting overall wellbeing', title: 'Holistic Approach' },
            ].map(({ value, label, title }) => (
              <div key={label} className="space-y-2">
                <p className=" text-2xl text-gold-400">
                  <Image src={value} alt={title} className="w-8 h-8 object-contain" />
                </p>
                <p className="font-sans text-[14px] tracking-[0.15em] uppercase text-white mt-1">
                  {title}
                </p>
                <p className="font-sans text-[10px] tracking-[0.15em] uppercase text-cream-100/50 mt-1">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-cream-100/40 animate-float">
        <span className="font-sans text-[9px] tracking-[0.25em] uppercase">Scroll</span>
        <ArrowDown size={14} />
      </div>
    </section>
  );
}
