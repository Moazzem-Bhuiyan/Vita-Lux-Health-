"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import Logo from "@/assets/Logo/Logo.png";
import Image from "next/image";

const NAV_LINKS = [
  { label: "Services", href: "/services" },
  { label: "Journal", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  const isHome = pathname === "/";
  const isTransparent = isHome && !isScrolled;

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-40 transition-all duration-500",
          isTransparent
            ? "bg-transparent py-6"
            : "bg-cream-50/95 backdrop-blur-md border-b border-stone-100/80 shadow-luxury py-4"
        )}
      >
        <div className="container-luxury flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex flex-col leading-none group">
            {/* <span
              className={cn(
                "font-serif text-xl md:text-2xl tracking-wide transition-colors duration-300",
                isTransparent ? "text-cream-50" : "text-stone-900"
              )}
            >
              Aurum Star
            </span>
            <span
              className={cn(
                "font-sans text-[9px] tracking-[0.3em] uppercase transition-colors duration-300",
                isTransparent ? "text-gold-300" : "text-gold-600"
              )}
            >
              Health & Wellness
            </span> */}
            {/*  */}
            <Image src={Logo} alt="Logo" width={100} height={100} />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "font-sans text-[11px] tracking-[0.18em] uppercase transition-all duration-300",
                  "relative after:absolute after:bottom-0 after:left-0 after:h-px after:bg-gold-500",
                  "after:transition-all after:duration-300",
                  pathname === link.href
                    ? "after:w-full"
                    : "after:w-0 hover:after:w-full",
                  isTransparent
                    ? "text-cream-100/80 hover:text-cream-50"
                    : "text-stone-600 hover:text-stone-900"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA & Phone */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="tel:+12125550192"
              className={cn(
                "flex items-center gap-1.5 font-sans text-[11px] tracking-wide transition-colors duration-300",
                isTransparent ? "text-cream-200/70 hover:text-cream-50" : "text-stone-500 hover:text-stone-800"
              )}
            >
              <Phone size={12} />
              <span>+1 (212) 555-0192</span>
            </a>
            <Link href="/booking">
              <Button
                variant="primary"
                size="sm"
                className={cn(
                  isTransparent && "bg-white/10 backdrop-blur-sm text-cream-50 border border-white/20 hover:bg-white/20"
                )}
              >
                Book Now
              </Button>
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            className={cn(
              "md:hidden p-2 transition-colors duration-300",
              isTransparent ? "text-cream-50" : "text-stone-800"
            )}
            onClick={() => setIsMobileOpen((v) => !v)}
            aria-label="Toggle navigation menu"
          >
            {isMobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <div
        className={cn(
          "fixed inset-0 z-30 md:hidden transition-all duration-500",
          isMobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-stone-900/50 backdrop-blur-sm"
          onClick={() => setIsMobileOpen(false)}
        />

        {/* Drawer */}
        <div
          className={cn(
            "absolute right-0 top-0 bottom-0 w-72 bg-cream-50",
            "flex flex-col pt-24 pb-10 px-8 transition-transform duration-500",
            isMobileOpen ? "translate-x-0" : "translate-x-full"
          )}
        >
          <nav className="space-y-1 flex-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "block font-serif text-2xl py-3 border-b border-stone-100 transition-colors",
                  pathname === link.href
                    ? "text-gold-600"
                    : "text-stone-800 hover:text-gold-600"
                )}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/booking"
              className={cn(
                "block font-serif text-2xl py-3 border-b border-stone-100 transition-colors",
                pathname === "/booking"
                  ? "text-gold-600"
                  : "text-stone-800 hover:text-gold-600"
              )}
            >
              Book Now
            </Link>
          </nav>

          <div className="space-y-3">
            <a
              href="tel:+12125550192"
              className="flex items-center gap-2 text-stone-500 font-sans text-sm"
            >
              <Phone size={14} />
              +1 (212) 555-0192
            </a>
            <p className="font-sans text-xs text-stone-400 tracking-wide">
              Mon–Fri: 9am – 9pm
              <br />
              Sat: 8am – 8pm · Sun: 10am – 7pm
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
