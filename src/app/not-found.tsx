import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-cream-50 text-center px-6">
      {/* Decorative */}
      <div className="w-px h-24 bg-gradient-to-b from-transparent to-gold-500 mx-auto mb-8" />

      <p className="eyebrow text-gold-600 mb-4">404 · Page Not Found</p>

      <h1 className="font-serif text-display-lg text-stone-900 font-light mb-6 max-w-lg">
        This page seems to have wandered off
      </h1>

      <p className="font-sans text-stone-500 font-light mb-10 max-w-md leading-relaxed">
        Perhaps it took a moment of rest. Let us guide you back to your wellness journey.
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        <Link href="/">
          <Button size="lg">Return Home</Button>
        </Link>
        <Link href="/services">
          <Button variant="secondary" size="lg">
            Explore Treatments
          </Button>
        </Link>
      </div>

      <div className="w-px h-24 bg-gradient-to-t from-transparent to-gold-500 mx-auto mt-8" />
    </div>
  );
}
