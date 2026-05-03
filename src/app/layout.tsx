import type { Metadata } from "next";
import "@/styles/globals.css";
import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";
import { Chatbot } from "@/components/shared/Chatbot";

export const metadata: Metadata = {
  title: {
    default: "Aurum Star Health — Spa & Wellness",
    template: "%s | Aurum Star Health",
  },
  description:
    "A luxury spa and wellness sanctuary where ancient healing traditions meet modern science. Book your transformative experience today.",
  keywords: [
    "luxury spa",
    "wellness",
    "massage",
    "facial",
    "holistic healing",
    "New York spa",
    "Aurum Star",
  ],
  authors: [{ name: "Aurum Star Health" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://vitaluxhealth.com",
    siteName: "Aurum Star Health",
    title: "Aurum Star Health — Spa & Wellness",
    description:
      "A luxury spa and wellness sanctuary where ancient healing traditions meet modern science.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1200&q=80",
        width: 1200,
        height: 630,
        alt: "Aurum Star Health Spa",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aurum Star Health — Spa & Wellness",
    description: "Luxury spa and wellness sanctuary in New York.",
    images: ["https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1200&q=80"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <Chatbot />
      </body>
    </html>
  );
}
