import Image from "next/image";
import Link from "next/link";
import { Check, Clock, ArrowLeft, ArrowRight } from "lucide-react";
import type { Service } from "@/types";
import { formatCurrency, formatDuration } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { SERVICES } from "@/lib/data/services";

interface Props {
  service: Service;
}

export function ServiceDetailContent({ service }: Props) {
  // Related services from same category
  const related = SERVICES.filter(
    (s) => s.category === service.category && s.id !== service.id
  ).slice(0, 3);

  return (
    <>
      {/* Hero */}
      <div className="relative pt-24">
        <div className="relative h-[60vh] min-h-[420px] overflow-hidden bg-stone-200">
          <Image
            src={service.image}
            alt={service.name}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 via-stone-900/30 to-transparent" />

          {/* Back link */}
          <div className="absolute top-8 left-0 container-luxury">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-cream-100/70 hover:text-cream-50 font-sans text-xs tracking-widest uppercase transition-colors"
            >
              <ArrowLeft size={12} />
              All Treatments
            </Link>
          </div>

          {/* Title */}
          <div className="absolute bottom-0 left-0 right-0 container-luxury pb-12">
            <p className="eyebrow text-gold-400 mb-3">{service.category}</p>
            <h1 className="font-serif text-display-lg text-cream-50 font-light mb-2">
              {service.name}
            </h1>
            <p className="font-sans text-stone-300 font-light italic">{service.tagline}</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="section-padding bg-cream-50">
        <div className="container-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            {/* Main content */}
            <div className="lg:col-span-7 space-y-10">
              <div className="space-y-5">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-px bg-gold-500" />
                  <p className="eyebrow text-gold-600">About This Treatment</p>
                </div>
                <p className="font-sans text-stone-600 font-light leading-relaxed text-base">
                  {service.longDescription}
                </p>
              </div>

              {/* Benefits */}
              <div className="space-y-5">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-px bg-gold-500" />
                  <p className="eyebrow text-gold-600">Treatment Benefits</p>
                </div>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {service.benefits.map((benefit) => (
                    <li key={benefit} className="flex items-start gap-3">
                      <div className="w-5 h-5 bg-gold-500/10 border border-gold-500/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check size={10} className="text-gold-600" />
                      </div>
                      <p className="font-sans text-sm text-stone-600 font-light leading-relaxed">
                        {benefit}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Preparation note */}
              <div className="p-6 border-l-2 border-gold-500 bg-cream-100">
                <p className="font-sans text-xs tracking-widest uppercase text-gold-600 mb-2">
                  Before Your Visit
                </p>
                <p className="font-sans text-sm text-stone-600 font-light leading-relaxed">
                  We recommend arriving 15 minutes before your treatment to complete 
                  your wellness consultation and begin your relaxation journey. Please 
                  avoid heavy meals within 2 hours of your appointment.
                </p>
              </div>
            </div>

            {/* Sidebar: booking card */}
            <div className="lg:col-span-5">
              <div className="sticky top-28 border border-stone-200 bg-white p-8 space-y-6 shadow-luxury">
                {/* Price & duration */}
                <div className="text-center pb-6 border-b border-stone-100">
                  <p className="font-serif text-5xl text-stone-900 mb-1">
                    {formatCurrency(service.price)}
                  </p>
                  <div className="flex items-center justify-center gap-2 text-stone-400">
                    <Clock size={13} />
                    <p className="font-sans text-sm">{formatDuration(service.duration)}</p>
                  </div>
                </div>

                {/* Quick select time */}
                <div className="space-y-3">
                  <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-stone-500">
                    Quick Book
                  </p>
                  <div className="grid grid-cols-3 gap-2">
                    {["10:00 AM", "2:00 PM", "4:30 PM"].map((time) => (
                      <button
                        key={time}
                        className="border border-stone-200 py-2.5 font-sans text-xs text-stone-700 hover:border-gold-500 hover:text-gold-700 transition-all duration-200 focus:outline-none focus:border-gold-500"
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>

                <Link href={`/booking?service=${service.id}`}>
                  <Button fullWidth size="lg" className="bg-stone-900 text-cream-50 hover:bg-stone-800">
                    Reserve This Experience
                    <ArrowRight size={14} />
                  </Button>
                </Link>

                <Link href="/booking">
                  <Button variant="secondary" fullWidth size="sm">
                    View Full Availability
                  </Button>
                </Link>

                {/* Extras */}
                <div className="pt-4 border-t border-stone-100 space-y-2">
                  {[
                    "Complimentary welcome tea",
                    "Personalized aftercare advice",
                    "Luxury amenity access",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-2">
                      <Check size={11} className="text-gold-500" />
                      <p className="font-sans text-xs text-stone-500">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Related services */}
          {related.length > 0 && (
            <div className="mt-24 pt-16 border-t border-stone-200">
              <div className="flex items-center gap-4 mb-10">
                <div className="w-12 h-px bg-gold-500" />
                <p className="eyebrow text-gold-600">You May Also Enjoy</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {related.map((s) => (
                  <Link key={s.id} href={`/services/${s.slug}`} className="group block">
                    <div className="luxury-card overflow-hidden">
                      <div className="relative h-40 overflow-hidden">
                        <Image
                          src={s.image}
                          alt={s.name}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                      </div>
                      <div className="p-5 space-y-2">
                        <h3 className="font-serif text-lg text-stone-900 group-hover:text-gold-700 transition-colors">
                          {s.name}
                        </h3>
                        <div className="flex items-center justify-between">
                          <span className="font-serif text-lg text-stone-700">
                            {formatCurrency(s.price)}
                          </span>
                          <span className="flex items-center gap-1 font-sans text-[10px] tracking-wide uppercase text-gold-600">
                            <Clock size={9} /> {formatDuration(s.duration)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
