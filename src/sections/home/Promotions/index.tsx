import { SectionHeader } from "@/components/ui/SectionHeader";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { PROMOTIONS } from "@/lib/data/misc";
import Link from "next/link";

export function Promotions() {
  return (
    <section className="section-padding bg-stone-900 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, rgba(201,169,110,0.4) 0%, transparent 50%), 
                            radial-gradient(circle at 80% 50%, rgba(201,169,110,0.2) 0%, transparent 50%)`,
        }}
      />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500/30 to-transparent" />

      <div className="container-luxury relative">
        <SectionHeader
          eyebrow="Exclusive Offers"
          heading="Curated for You"
          subheading="Seasonal offerings and exclusive member benefits designed to make luxury wellness accessible."
          light
          className="mb-16"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PROMOTIONS.map((promo) => (
            <div
              key={promo.id}
              className="group relative border border-stone-700/60 hover:border-gold-500/40 bg-stone-800/40 p-8 transition-all duration-400 hover:bg-stone-800/60"
            >
              {/* Badge */}
              {promo.badge && (
                <div className="absolute top-0 right-0 mt-4 mr-4">
                  <Badge label={promo.badge} variant="gold" />
                </div>
              )}

              {/* Discount */}
              <div className="mb-6">
                <p className="font-serif text-4xl text-gold-400 leading-none">{promo.discount}</p>
              </div>

              <div className="space-y-3 mb-8">
                <h3 className="font-serif text-xl text-cream-50">{promo.title}</h3>
                <p className="font-sans text-sm text-stone-400 font-light leading-relaxed">
                  {promo.description}
                </p>
              </div>

              {/* Code */}
              <div className="mb-6 p-3 border border-dashed border-stone-600 text-center">
                <p className="font-sans text-[9px] tracking-[0.2em] uppercase text-stone-500 mb-1">
                  Promo Code
                </p>
                <p className="font-serif text-gold-400 tracking-[0.2em]">{promo.code}</p>
              </div>

              <div className="space-y-2">
                <Link href="/booking">
                  <Button variant="gold-outline" size="sm" fullWidth>
                    Redeem Offer
                  </Button>
                </Link>
                <p className="font-sans text-[10px] text-stone-600 text-center">
                  Valid until {new Date(promo.validUntil).toLocaleDateString("en-US", { month: "long", year: "numeric" })}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
