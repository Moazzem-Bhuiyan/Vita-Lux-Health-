import type { Metadata } from "next";
import { BookingPageContent } from "@/sections/booking/BookingPageContent";

export const metadata: Metadata = {
  title: "Book a Treatment",
  description:
    "Reserve your luxury spa treatment at Vita Lux Health. Choose your service, therapist, and preferred time.",
};

export default function BookingPage() {
  return <BookingPageContent />;
}
