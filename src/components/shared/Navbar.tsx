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
import { useGetUserQuery } from '@/redux/api/userApi';
import { Profile } from '@/app/(private)/(userDashboard)/profile/_Component/UserProfile';

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

  const { data: profileData } = useGetUserQuery(undefined, { skip: !user });

  const profile = profileData?.data as Profile | undefined;

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

  // Lock body scroll when mobile drawer is open (prevents background scroll + layout shift)
  useEffect(() => {
    if (isMobileOpen) {
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
    } else {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    }
    return () => {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    };
  }, [isMobileOpen]);

  const avatarUrl = profile?.avatar ? `http://103.186.20.110:9999/${profile.avatar}` : null;

  const isHome = pathname === '/' || pathname === '/service/serviceDetails' || pathname === '/blog';
  const isTransparent = isHome && !isScrolled;
  const hasAvatar = Boolean(user?.avatar);

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-40 w-full max-w-[100vw] transition-all duration-500',
          isTransparent
            ? 'bg-transparent py-4 md:py-6'
            : 'bg-stone-900 backdrop-blur-md border-b border-stone-100/80 shadow-luxury py-3 md:py-4'
        )}
      >
        <div className="max-w-8xl mx-auto flex w-full items-center justify-between gap-3 px-4 sm:px-6 md:px-10 lg:px-16">
          {/* Left: Logo + Desktop Nav */}
          <div className="flex min-w-0 flex-1 items-center gap-6 md:gap-10 lg:gap-16">
            <Link href="/" className="flex shrink-0 flex-col leading-none">
              {isTransparent ? (
                <Image
                  src={Logo}
                  alt="Logo"
                  width={100}
                  height={100}
                  priority
                  className="h-9 w-auto sm:h-10 md:h-12 object-contain"
                />
              ) : (
                <Image
                  src={TextLogo}
                  alt="Logo"
                  width={100}
                  height={100}
                  priority
                  className="h-9 w-auto sm:h-10 md:h-12 object-contain"
                />
              )}
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-6 lg:gap-8">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'font-sans text-[11px] tracking-[0.18em] uppercase transition-all duration-300 whitespace-nowrap',
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

          {/* Right: CTA / Auth / Mobile Toggle */}
          <div className="flex shrink-0 items-center gap-2 sm:gap-4">
            {/* CTA & Auth — desktop only */}
            <div className="hidden md:flex items-center gap-4">
              {user?.email ? (
                <button
                  type="button"
                  onClick={() => router.push('/profile')}
                  className="shrink-0"
                  aria-label="Go to profile"
                >
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center overflow-hidden shrink-0 cursor-pointer transition-all duration-300 hover:scale-105"
                    style={{
                      background: 'rgba(255,255,255,0.18)',
                      border: `1px solid ${isTransparent ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.1)'}`,
                    }}
                  >
                    {avatarUrl ? (
                      <Image
                        src={avatarUrl}
                        alt={user?.first_name || 'User'}
                        width={40}
                        height={40}
                        className="rounded-full aspect-square object-cover w-10 h-10"
                      />
                    ) : (
                      <span
                        className="text-sm font-semibold"
                        style={{
                          color: isTransparent ? '#fff' : '#000',
                          fontFamily: "'Playfair Display', serif",
                        }}
                      >
                        {initials(user?.first_name, user?.last_name)}
                      </span>
                    )}
                  </div>
                </button>
              ) : (
                <Link href="/login" className="shrink-0">
                  <Button
                    size="sm"
                    variant="ghost"
                    className={cn(
                      'whitespace-nowrap',
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

              <BookButton>Book Now</BookButton>
            </div>

            {/* Mobile Toggle */}
            <button
              className={cn(
                'md:hidden shrink-0 p-2 -mr-2 transition-colors duration-300',
                isTransparent ? 'text-cream-50' : 'text-stone-800'
              )}
              onClick={() => setIsMobileOpen((v) => !v)}
              aria-label="Toggle navigation menu"
              aria-expanded={isMobileOpen}
            >
              {isMobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {/* overflow-hidden here is the key fix: without it, the drawer's
          pre-transform layout box still contributes to page scrollWidth
          even while translated off-screen, causing horizontal scroll
          and the toggle button visually shifting on mobile. */}
      <div
        className={cn(
          'fixed inset-0 z-30 md:hidden overflow-hidden transition-opacity duration-500',
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
            'absolute right-0 top-0 bottom-0 w-[80vw] max-w-72 bg-cream-50',
            'flex flex-col overflow-y-auto overflow-x-hidden pt-24 pb-10 px-6 sm:px-8 transition-transform duration-500',
            isMobileOpen ? 'translate-x-0' : 'translate-x-full'
          )}
        >
          <nav className="space-y-1 flex-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'block font-serif text-xl sm:text-2xl py-3 border-b border-stone-100 transition-colors',
                  pathname === link.href ? 'text-gold-600' : 'text-stone-800 hover:text-gold-600'
                )}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/booking"
              className={cn(
                'block font-serif text-xl sm:text-2xl py-3 border-b border-stone-100 transition-colors',
                pathname === '/booking' ? 'text-gold-600' : 'text-stone-800 hover:text-gold-600'
              )}
            >
              Book Now
            </Link>
          </nav>

          <div className="space-y-3 pt-6">
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
