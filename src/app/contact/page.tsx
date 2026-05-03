import type { Metadata } from "next";
import { ContactPageContent } from "@/sections/contact/ContactPageContent";

export const metadata: Metadata = {
  title: "Contact & Locations",
  description:
    "Find a Aurum Star location near you or reach our concierge team. We are here to assist with bookings, inquiries, and anything you need.",
};

export default function ContactPage() {
  return <ContactPageContent />;
}
