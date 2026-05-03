"use client";

import Link from "next/link";
import { Calendar, User, Scissors, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { SERVICE_CATEGORIES } from "@/lib/data/services";

export function BookingWidget() {
  return (
    <section className="bg-stone-900 py-0 relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500/40 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500/20 to-transparent" />

      <div className="container-luxury py-16 md:py-20">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Left: heading */}
          <div className="lg:w-2/5 text-center lg:text-left space-y-4">
            <p className="eyebrow text-gold-500">Reserve Your Visit</p>
            <h2 className="font-serif text-display-md text-cream-50 font-light">
              Begin Your
              <br />
              <em className="not-italic text-gold-400">Transformation</em>
            </h2>
            <p className="font-sans text-sm text-stone-400 font-light leading-relaxed">
              Select your preferred treatment, date, and therapist. Our concierge 
              team is also available to assist you personally.
            </p>
          </div>

          {/* Right: Widget */}
          <div className="lg:w-3/5 w-full">
            <div className="bg-stone-800/50 border border-stone-700/50 p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Service selector */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 font-sans text-[10px] tracking-[0.2em] uppercase text-stone-400">
                    <Scissors size={11} className="text-gold-500" />
                    Treatment
                  </label>
                  <select className="w-full bg-stone-900 border border-stone-700 text-cream-100 font-sans text-sm py-3 px-3 focus:outline-none focus:border-gold-500 transition-colors appearance-none cursor-pointer">
                    <option value="">Select a service</option>
                    {SERVICE_CATEGORIES.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Date */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 font-sans text-[10px] tracking-[0.2em] uppercase text-stone-400">
                    <Calendar size={11} className="text-gold-500" />
                    Date
                  </label>
                  <input
                    type="date"
                    className="w-full bg-stone-900 border border-stone-700 text-cream-100 font-sans text-sm py-3 px-3 focus:outline-none focus:border-gold-500 transition-colors cursor-pointer"
                    min={new Date().toISOString().split("T")[0]}
                  />
                </div>

                {/* Therapist */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 font-sans text-[10px] tracking-[0.2em] uppercase text-stone-400">
                    <User size={11} className="text-gold-500" />
                    Therapist
                  </label>
                  <select className="w-full bg-stone-900 border border-stone-700 text-cream-100 font-sans text-sm py-3 px-3 focus:outline-none focus:border-gold-500 transition-colors appearance-none cursor-pointer">
                    <option value="">Any available</option>
                    <option value="maya">Maya Chen</option>
                    <option value="antoine">Antoine Rousseau</option>
                    <option value="leila">Leila Nouri</option>
                    <option value="sofia">Sofia Marchetti</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 items-center pt-2">
                <Link href="/booking" className="w-full sm:w-auto">
                  <Button
                    size="lg"
                    fullWidth
                    className="bg-gold-500 hover:bg-gold-600 text-stone-900 font-medium shadow-gold"
                  >
                    Check Availability
                    <ArrowRight size={14} />
                  </Button>
                </Link>
                <p className="font-sans text-xs text-stone-500 text-center">
                  Or call{" "}
                  <a
                    href="tel:+12125550192"
                    className="text-gold-500 hover:text-gold-400 transition-colors"
                  >
                    +1 (212) 555-0192
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
