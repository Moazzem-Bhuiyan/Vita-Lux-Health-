import { Metadata } from "next";
import { Hero } from "@/sections/home/Hero";
import { ServicesPreview } from "@/sections/home/ServicesPreview";
import { BookingWidget } from "@/sections/home/BookingWidget";
import { Testimonials } from "@/sections/home/Testimonials";
import { Promotions } from "@/sections/home/Promotions";
import { SocialMedia } from "@/sections/home/SocialMedia";

export const metadata: Metadata = {
  title: "Vita Lux Health — Luxury Spa & Wellness",
  description:
    "Experience transformative wellness at Vita Lux Health. Luxury spa treatments, holistic therapies, and personalized wellness programs in New York.",
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServicesPreview />
      <BookingWidget />
      <Testimonials />
      <Promotions />
      <SocialMedia />
    </>
  );
}
