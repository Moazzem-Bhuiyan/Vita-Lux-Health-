import { Instagram } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";

const SOCIAL_IMAGES = [
  "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&q=80",
  "https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=400&q=80",
  "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=400&q=80",
  "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=400&q=80",
  "https://images.unsplash.com/photo-1563865436874-9aef32095fad?w=400&q=80",
  "https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=400&q=80",
];

export function SocialMedia() {
  return (
    <section className="section-padding bg-cream-50">
      <div className="container-luxury">
        <SectionHeader
          eyebrow="@vitaluxhealth"
          heading="Life at the Sanctuary"
          subheading="Follow our journey and join a community devoted to the art of living well."
          className="mb-12"
        />

        {/* Instagram grid */}
        <div className="grid grid-cols-3 md:grid-cols-6 gap-2 md:gap-3 mb-10">
          {SOCIAL_IMAGES.map((src, i) => (
            <a
              key={i}
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square overflow-hidden bg-stone-100 block"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt={`Instagram post ${i + 1}`}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-stone-900/0 group-hover:bg-stone-900/50 transition-all duration-300 flex items-center justify-center">
                <Instagram
                  size={20}
                  className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
              </div>
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 font-sans text-sm tracking-[0.15em] uppercase text-stone-700 hover:text-gold-600 transition-colors group"
          >
            <Instagram size={14} />
            <span>Follow @vitaluxhealth</span>
            <div className="w-8 h-px bg-current transition-all duration-300 group-hover:w-12" />
          </a>
        </div>
      </div>
    </section>
  );
}
