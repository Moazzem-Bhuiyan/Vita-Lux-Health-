import type { Metadata } from "next";
import { ServicesPageContent } from "@/sections/services/ServicesPageContent";

export const metadata: Metadata = {
  title: "Treatments & Services",
  description:
    "Explore our full collection of luxury spa treatments — massage, facial, body rituals, and holistic wellness therapies.",
};

export default function ServicesPage() {
  return <ServicesPageContent />;
}
