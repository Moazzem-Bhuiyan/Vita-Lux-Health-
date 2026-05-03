import Link from "next/link";
import { ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1800&q=80')`,
        }}
      />

      {/* Dark overlay with gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-stone-900/70 via-stone-900/50 to-stone-900/80" />

      {/* Subtle grain texture */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.15'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Decorative gold lines */}
      <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gold-500/30 to-transparent ml-[8vw] hidden lg:block" />
      <div className="absolute right-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gold-500/20 to-transparent mr-[8vw] hidden lg:block" />

      {/* Content */}
      <div className="container-luxury relative z-10 pt-32 pb-24">
        <div className="max-w-4xl">
          {/* Eyebrow */}
          <div className="flex items-center gap-4 mb-8 animate-fade-in" style={{ animationDelay: "0.1s" }}>
            <div className="w-12 h-px bg-gold-500" />
            <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-gold-400 font-medium">
              Luxury · Wellness · Sanctuary
            </span>
          </div>

          {/* Heading */}
          <h1
            className="font-serif font-light text-cream-50 leading-[1.05] text-display-xl mb-8 animate-fade-up"
            style={{ animationDelay: "0.2s" }}
          >
            The Art of
            <br />
            <em className="not-italic text-gold-400">Total Renewal</em>
          </h1>

          {/* Subheading */}
          <p
            className="font-sans font-light text-cream-100/70 text-lg leading-relaxed max-w-xl mb-12 animate-fade-up"
            style={{ animationDelay: "0.35s" }}
          >
            Where ancient healing traditions and modern science converge — 
            crafting deeply personal wellness experiences for the discerning soul.
          </p>

          {/* CTAs */}
          <div
            className="flex flex-col sm:flex-row items-start sm:items-center gap-4 animate-fade-up"
            style={{ animationDelay: "0.5s" }}
          >
            <Link href="/booking">
              <Button
                size="lg"
                className="bg-gold-500 hover:bg-gold-600 text-stone-900 shadow-gold-lg font-medium"
              >
                Reserve Your Experience
              </Button>
            </Link>
            <Link href="/services">
              <Button
                variant="ghost"
                size="lg"
                className="text-cream-100/70 hover:text-cream-50 hover:bg-white/10"
              >
                Explore Treatments
              </Button>
            </Link>
          </div>

          {/* Stats bar */}
          <div
            className="mt-20 pt-10 border-t border-white/10 grid grid-cols-3 gap-8 max-w-lg animate-fade-up"
            style={{ animationDelay: "0.65s" }}
          >
            {[
              { value: "12+", label: "Years of Excellence" },
              { value: "24k+", label: "Clients Served" },
              { value: "4.9★", label: "Average Rating" },
            ].map(({ value, label }) => (
              <div key={label}>
                <p className=" text-2xl text-gold-400">{value}</p>
                <p className="font-sans text-[10px] tracking-[0.15em] uppercase text-cream-100/50 mt-1">{label}</p>
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
