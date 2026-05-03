import Link from "next/link";
import { Instagram, Facebook, Youtube } from "lucide-react";

const FOOTER_LINKS = {
  Services: [
    { label: "Massage", href: "/services?category=massage" },
    { label: "Facial", href: "/services?category=facial" },
    { label: "Body Rituals", href: "/services?category=body" },
    { label: "Therapy", href: "/services?category=therapy" },
    { label: "Wellness", href: "/services?category=wellness" },
  ],
  Discover: [
    { label: "Our Story", href: "/#about" },
    { label: "Journal", href: "/blog" },
    { label: "Memberships", href: "/#memberships" },
    { label: "Gift Cards", href: "/#gift" },
  ],
  Visit: [
    { label: "Midtown Location", href: "/contact" },
    { label: "Tribeca Location", href: "/contact" },
    { label: "The Hamptons", href: "/contact" },
    { label: "Concierge", href: "/contact" },
  ],
};

const SOCIAL_LINKS = [
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Youtube, href: "#", label: "Youtube" },
];

export function Footer() {
  return (
    <footer className="bg-stone-900 text-cream-100 relative overflow-hidden">
      {/* Subtle texture */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="container-luxury relative py-20">
        {/* Top row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 pb-16 border-b border-stone-800">
          {/* Brand */}
          <div className="md:col-span-4 space-y-6">
            <div>
              <p className="font-serif text-3xl text-cream-50 tracking-wide">Aurum Star</p>
              <p className="font-sans text-[9px] tracking-[0.3em] uppercase text-gold-500 mt-1">
                Health & Wellness
              </p>
            </div>
            <p className="font-sans text-sm text-stone-400 leading-relaxed font-light max-w-xs">
              A sanctuary of refined wellness, where ancient healing traditions 
              meet modern luxury. We invite you to discover the art of true renewal.
            </p>
            <div className="flex items-center gap-4">
              {SOCIAL_LINKS.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 border border-stone-700 flex items-center justify-center text-stone-500 hover:text-gold-500 hover:border-gold-500/50 transition-all duration-300"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="md:col-span-8 grid grid-cols-3 gap-8">
            {Object.entries(FOOTER_LINKS).map(([heading, links]) => (
              <div key={heading} className="space-y-4">
                <p className="font-sans text-[9px] tracking-[0.25em] uppercase text-gold-500 font-medium">
                  {heading}
                </p>
                <ul className="space-y-3">
                  {links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="font-sans text-sm text-stone-400 hover:text-cream-100 transition-colors duration-200 font-light"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Awards / Certification strip */}
        <div className="py-10 border-b border-stone-800 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            "Spa of the Year 2025",
            "Top 10 Luxury Spas — Condé Nast",
            "5-Star Wellness Certified",
            "Organic & Sustainable Practices",
          ].map((award) => (
            <div key={award} className="flex items-center gap-2.5">
              <div className="w-5 h-5 rounded-full border border-gold-600/50 flex items-center justify-center flex-shrink-0">
                <div className="w-1.5 h-1.5 bg-gold-500 rounded-full" />
              </div>
              <p className="font-sans text-[11px] text-stone-500 leading-tight">{award}</p>
            </div>
          ))}
        </div>

        {/* Bottom row */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-sans text-xs text-stone-600">
            © {new Date().getFullYear()} Aurum Star Health. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {["Privacy Policy", "Terms of Use", "Accessibility"].map((item) => (
              <Link
                key={item}
                href="#"
                className="font-sans text-xs text-stone-600 hover:text-stone-400 transition-colors"
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
