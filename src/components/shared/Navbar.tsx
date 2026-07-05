'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Menu, X, Phone, User } from 'lucide-react';
import { cn } from '@/lib/utils';

import Logo from '@/assets/Logo/Logo.png';
import TextLogo from '@/assets/Logo/Logotext.png';
import Image from 'next/image';
import { selectUser } from '@/redux/features/authSlice';
import { useSelector } from 'react-redux';
import { Button } from '../ui';
import { BookButton } from '../booking/book-button';

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/#about' },
  { label: 'Services', href: '/#services' },
  { label: 'Blog', href: '/blog' },
  { label: 'Reviews', href: '/#reviews' },
  { label: 'Contact', href: '/#contact' },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const pathname = usePathname();
  const user = useSelector(selectUser);
  const router = useRouter();
  function initials(first?: string, last?: string): string {
    return `${first?.[0] ?? ''}${last?.[0] ?? ''}`.toUpperCase();
  }
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  const isHome = pathname === '/' || pathname === '/service/serviceDetails' || pathname === '/blog';
  const isTransparent = isHome && !isScrolled;

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-40 transition-all duration-500',
          isTransparent
            ? 'bg-transparent py-6'
            : 'bg-stone-900 backdrop-blur-md border-b border-stone-100/80 shadow-luxury py-4'
        )}
      >
        <div className="max-w-8xl mx-auto px-6 md:px-10 lg:px-16 flex items-center justify-between">
          <div className="flex flex-1 items-center gap-10 md:gap-16 ">
            {/* Logo */}
            <Link href="/" className="flex flex-col leading-none group">
              {isTransparent ? (
                <Image src={Logo} alt="Logo" width={100} height={100} />
              ) : (
                <Image src={TextLogo} alt="Logo" width={100} height={100} />
              )}
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'font-sans text-[11px] tracking-[0.18em] uppercase transition-all duration-300',
                    'relative after:absolute after:bottom-0 after:left-0 after:h-px after:bg-gold-500',
                    'after:transition-all after:duration-300',
                    pathname === link.href ? 'after:w-full' : 'after:w-0 hover:after:w-full',
                    isTransparent
                      ? 'text-cream-100/80 hover:text-cream-50'
                      : 'text-white hover:text-gold-500'
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex-1 justify-end flex">
            {/* CTA & Phone */}
            <div className="hidden md:flex items-center gap-4">
              {user?.email ? (
                <span
                  className={cn(
                    'font-sans text-[11px] tracking-wide',
                    isTransparent ? 'text-cream-200/70' : 'text-stone-500'
                  )}
                  onClick={() => router.push('/profile')}
                >
                  <div
                    className="w-10 h-10 md:w-10 md:h-10 rounded-full flex items-center justify-center shrink-0 cursor-pointer transition-all duration-300 hover:scale-105"
                    style={{
                      background: 'rgba(255,255,255,0.18)',
                      border: `1px solid ${isTransparent ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.1)'}`,
                    }}
                  >
                    <span
                      className="text-lg md:text-xl"
                      style={{
                        color: isTransparent ? '#fff' : '#000',
                        fontFamily: "'Playfair Display', serif",
                      }}
                    >
                      {initials(user?.first_name, user?.last_name)}
                    </span>
                  </div>
                </span>
              ) : (
                <Link href="/login">
                  <Button
                    size="sm"
                    variant="ghost"
                    className={cn(
                      isTransparent
                        ? 'text-cream-200/70 hover:text-cream-50'
                        : 'text-stone-500 hover:text-stone-800'
                    )}
                  >
                    <User className="mr-1 h-4 w-4" />
                    Login
                  </Button>
                </Link>
              )}

              <>
                <BookButton>Book Now</BookButton>
              </>
            </div>

            {/* Mobile Toggle */}
            <button
              className={cn(
                'md:hidden p-2 transition-colors duration-300',
                isTransparent ? 'text-cream-50' : 'text-stone-800'
              )}
              onClick={() => setIsMobileOpen((v) => !v)}
              aria-label="Toggle navigation menu"
            >
              {isMobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <div
        className={cn(
          'fixed inset-0 z-30 md:hidden transition-all duration-500',
          isMobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
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
            'absolute right-0 top-0 bottom-0 w-72 bg-cream-50',
            'flex flex-col pt-24 pb-10 px-8 transition-transform duration-500',
            isMobileOpen ? 'translate-x-0' : 'translate-x-full'
          )}
        >
          <nav className="space-y-1 flex-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'block font-serif text-2xl py-3 border-b border-stone-100 transition-colors',
                  pathname === link.href ? 'text-gold-600' : 'text-stone-800 hover:text-gold-600'
                )}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/booking"
              className={cn(
                'block font-serif text-2xl py-3 border-b border-stone-100 transition-colors',
                pathname === '/booking' ? 'text-gold-600' : 'text-stone-800 hover:text-gold-600'
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
