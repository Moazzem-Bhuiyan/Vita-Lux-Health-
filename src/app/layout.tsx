import type { Metadata } from 'next';
import '@/styles/globals.css';
import { Navbar } from '@/components/shared/Navbar';
import { Chatbot } from '@/components/shared/Chatbot';
import Footer from '@/components/shared/Footer';
import NewsletterBanner from '@/sections/home/NewsLetterSection/NewsletterBanner';
import ReduxProviders from '@/redux/lib/ReduxProvider';

import { cn } from '@/lib/utils';
import { BookingProvider } from '@/components/booking/booking-context';

// const geist = Geist({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: {
    default: 'Aurum Star Health — Spa & Wellness',
    template: '%s | Aurum Star Health',
  },
  description:
    'A luxury spa and wellness sanctuary where ancient healing traditions meet modern science. Book your transformative experience today.',
  keywords: [
    'luxury spa',
    'wellness',
    'massage',
    'facial',
    'holistic healing',
    'New York spa',
    'Aurum Star',
  ],
  authors: [{ name: 'Aurum Star Health' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://vitaluxhealth.com',
    siteName: 'Aurum Star Health',
    title: 'Aurum Star Health — Spa & Wellness',
    description:
      'A luxury spa and wellness sanctuary where ancient healing traditions meet modern science.',
    images: [
      {
        url: 'https://www.image2url.com/r2/default/images/1780478119076-2bc1921a-df5f-4783-a486-28a06a96fc7b.png',
        width: 1200,
        height: 630,
        alt: 'Aurum Star Health Spa',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aurum Star Health — Spa & Wellness',
    description: 'Luxury spa and wellness sanctuary in New York.',
    images: [
      'https://www.image2url.com/r2/default/images/1780478119076-2bc1921a-df5f-4783-a486-28a06a96fc7b.png',
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={cn('font-sans')}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="min-h-screen flex flex-col">
        <ReduxProviders>
          <BookingProvider>
            <Navbar />
            <main className="flex-1">{children}</main>
            <NewsletterBanner />
            <Footer />
            <Chatbot />
          </BookingProvider>
        </ReduxProviders>
      </body>
    </html>
  );
}
