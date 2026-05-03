import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Clock } from "lucide-react";
import { formatCurrency, formatDuration } from "@/lib/utils";
import type { Service } from "@/types";

interface ServiceCardProps {
  service: Service;
}

export function ServiceCard({ service }: ServiceCardProps) {
  return (
    <Link href={`/services/${service.slug}`} className="group block">
      <article className="luxury-card overflow-hidden">
        {/* Image */}
        <div className="relative h-64 overflow-hidden bg-stone-100">
          <Image
            src={service.image}
            alt={service.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {/* Category tag */}
          <div className="absolute top-4 left-4">
            <span className="bg-stone-900/80 backdrop-blur-sm text-cream-100 font-sans text-[9px] tracking-[0.2em] uppercase px-3 py-1.5">
              {service.category}
            </span>
          </div>
          {/* Duration overlay */}
          <div className="absolute bottom-4 right-4 flex items-center gap-1.5 bg-white/90 backdrop-blur-sm px-2.5 py-1.5">
            <Clock size={10} className="text-gold-600" />
            <span className="font-sans text-[10px] text-stone-700">{formatDuration(service.duration)}</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-3">
          <div className="w-8 h-px bg-gold-500" />
          <h3 className="font-serif text-xl text-stone-900 leading-tight group-hover:text-gold-700 transition-colors duration-300">
            {service.name}
          </h3>
          <p className="font-sans text-sm text-stone-500 font-light leading-relaxed line-clamp-2">
            {service.description}
          </p>

          {/* Footer */}
          <div className="flex items-center justify-between pt-2">
            <p className="font-serif text-xl text-stone-900">
              {formatCurrency(service.price)}
            </p>
            <span className="flex items-center gap-1.5 font-sans text-[10px] tracking-[0.15em] uppercase text-gold-600 group-hover:gap-2.5 transition-all duration-300">
              Details <ArrowRight size={12} />
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
