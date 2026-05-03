import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ServiceCard } from "./ServiceCard";
import { getFeaturedServices } from "@/lib/data/services";

export function ServicesPreview() {
  const services = getFeaturedServices().slice(0, 3);

  return (
    <section className="section-padding bg-cream-50">
      <div className="container-luxury">
        {/* Header */}
        <SectionHeader
          eyebrow="Our Treatments"
          heading="A Journey of Renewal"
          subheading="Each treatment is a bespoke experience, thoughtfully crafted by our master therapists to address your unique wellness needs."
          className="mb-16"
        />

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <Link
            href="/services"
            className="inline-flex items-center gap-3 font-sans text-sm tracking-[0.15em] uppercase text-stone-700 hover:text-gold-600 transition-colors duration-300 group"
          >
            <span>View All Treatments</span>
            <div className="w-8 h-px bg-current transition-all duration-300 group-hover:w-12" />
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
