import { SectionHeader } from "@/components/ui/SectionHeader";
import { StarRating } from "@/components/ui/StarRating";
import { TESTIMONIALS } from "@/lib/data/misc";
import type { Testimonial } from "@/types";

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <article className="bg-white border border-stone-100 p-8 space-y-6 hover:border-gold-500/20 hover:shadow-luxury transition-all duration-400 group">
      {/* Quote mark */}
      <div className="font-serif text-6xl text-gold-300/50 leading-none select-none">"</div>

      {/* Stars */}
      <StarRating rating={testimonial.rating} size="sm" />

      {/* Text */}
      <p className="font-sans font-light text-stone-600 leading-relaxed text-sm italic">
        {testimonial.text}
      </p>

      {/* Divider */}
      <div className="w-8 h-px bg-gold-500/40" />

      {/* Author */}
      <div className="space-y-1">
        <p className="font-serif text-stone-900">{testimonial.name}</p>
        <div className="flex items-center gap-2">
          <p className="font-sans text-xs text-stone-400">{testimonial.location}</p>
          <span className="text-stone-300">·</span>
          <p className="font-sans text-xs text-gold-600">{testimonial.service}</p>
        </div>
        <p className="font-sans text-[10px] text-stone-300">{testimonial.date}</p>
      </div>
    </article>
  );
}

export function Testimonials() {
  return (
    <section className="section-padding bg-cream-100/50">
      <div className="container-luxury">
        <SectionHeader
          eyebrow="Guest Stories"
          heading="Words of Transformation"
          subheading="The experiences of those who have journeyed with us speak louder than any promise we could make."
          className="mb-16"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TESTIMONIALS.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>

        {/* Trust strip */}
        <div className="mt-16 pt-12 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-center gap-8 text-center">
          {[
            { value: "4.9/5", label: "Overall Rating" },
            { value: "98%", label: "Would Recommend" },
            { value: "24,000+", label: "Happy Guests" },
          ].map(({ value, label }) => (
            <div key={label} className="space-y-1">
              <p className="font-serif text-2xl text-stone-900">{value}</p>
              <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-stone-400">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
