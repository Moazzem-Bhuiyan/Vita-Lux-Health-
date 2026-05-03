"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { SERVICE_CATEGORIES, SERVICES } from "@/lib/data/services";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { formatCurrency, formatDuration, cn } from "@/lib/utils";
import type { ServiceCategory } from "@/types";

export function ServicesPageContent() {
  const [activeCategory, setActiveCategory] = useState<ServiceCategory | "all">("all");

  const filtered =
    activeCategory === "all"
      ? SERVICES
      : SERVICES.filter((s) => s.category === activeCategory);

  return (
    <>
      {/* Hero */}
      <div className="relative bg-stone-900 pt-40 pb-24 text-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=1600&q=80')` }}
        />
        <div className="container-luxury relative space-y-6">
          <p className="eyebrow text-gold-500">Our Treatments</p>
          <h1 className="font-serif text-display-lg text-cream-50 font-light">
            Curated Wellness Experiences
          </h1>
          <div className="w-12 h-px bg-gold-500 mx-auto" />
          <p className="font-sans font-light text-stone-400 max-w-xl mx-auto leading-relaxed">
            Each treatment is a carefully crafted journey—combining clinical expertise 
            with the art of touch and the power of nature&apos;s finest ingredients.
          </p>
        </div>
      </div>

      {/* Category filter */}
      <div className="sticky top-16 bg-cream-50/95 backdrop-blur-sm border-b border-stone-100 z-20">
        <div className="container-luxury">
          <div className="flex items-center gap-1 overflow-x-auto py-4 scrollbar-hide">
            <button
              onClick={() => setActiveCategory("all")}
              className={cn(
                "flex-shrink-0 font-sans text-[10px] tracking-[0.2em] uppercase px-5 py-2.5 transition-all duration-200",
                activeCategory === "all"
                  ? "bg-stone-900 text-cream-50"
                  : "text-stone-500 hover:text-stone-800 hover:bg-stone-100"
              )}
            >
              All Treatments
            </button>
            {SERVICE_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={cn(
                  "flex-shrink-0 font-sans text-[10px] tracking-[0.2em] uppercase px-5 py-2.5 transition-all duration-200",
                  activeCategory === cat.id
                    ? "bg-stone-900 text-cream-50"
                    : "text-stone-500 hover:text-stone-800 hover:bg-stone-100"
                )}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Services grid */}
      <section className="section-padding bg-cream-50">
        <div className="container-luxury">
          {/* Category description */}
          {activeCategory !== "all" && (
            <div className="mb-12 max-w-2xl">
              <p className="font-sans text-stone-500 leading-relaxed">
                {SERVICE_CATEGORIES.find((c) => c.id === activeCategory)?.description}
              </p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {filtered.map((service) => (
              <Link
                key={service.id}
                href={`/services/${service.slug}`}
                className="group block"
              >
                <article className="luxury-card overflow-hidden h-full">
                  <div className="relative h-56 overflow-hidden bg-stone-100">
                    <Image
                      src={service.image}
                      alt={service.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-900/20 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                      <span className="bg-white/90 backdrop-blur-sm text-stone-700 font-sans text-[9px] tracking-[0.15em] uppercase px-2.5 py-1">
                        {service.category}
                      </span>
                      <span className="bg-white/90 backdrop-blur-sm flex items-center gap-1 px-2.5 py-1">
                        <Clock size={9} className="text-gold-600" />
                        <span className="font-sans text-[9px] text-stone-700">{formatDuration(service.duration)}</span>
                      </span>
                    </div>
                  </div>

                  <div className="p-6 space-y-3 flex flex-col flex-1">
                    <div className="w-6 h-px bg-gold-500" />
                    <h2 className="font-serif text-xl text-stone-900 group-hover:text-gold-700 transition-colors duration-300">
                      {service.name}
                    </h2>
                    <p className="font-sans text-sm text-stone-500 font-light leading-relaxed flex-1 line-clamp-3">
                      {service.description}
                    </p>
                    <div className="flex items-center justify-between pt-3 border-t border-stone-100">
                      <span className="text-2xl text-stone-900">
                        {formatCurrency(service.price)}
                      </span>
                      <span className="flex items-center gap-1 font-sans text-[10px] tracking-widest uppercase text-gold-600 group-hover:gap-2 transition-all">
                        View <ArrowRight size={11} />
                      </span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20 text-stone-400">
              <p className="font-serif text-xl">No treatments found in this category.</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
