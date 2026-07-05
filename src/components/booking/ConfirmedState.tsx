import { CheckCircle2 } from 'lucide-react';
import { Button } from '../ui';

export function ConfirmedState({ onClose }: { onClose: () => void }) {
  return (
    <div className="flex flex-col items-center gap-3 py-10 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50">
        <CheckCircle2 className="h-7 w-7 text-emerald-600" />
      </div>
      <h3
        className="font-serif text-2xl text-stone-900"
        style={{ fontFamily: "'Playfair Display', serif" }}
      >
        Consultation booked
      </h3>
      <p className="text-sm text-stone-500">
        We&apos;ve sent a confirmation to your email. Our team will reach out shortly to confirm the
        details.
      </p>
      <Button
        className="mt-4 rounded-md bg-stone-900 text-white hover:bg-stone-800"
        onClick={onClose}
      >
        Done
      </Button>
    </div>
  );
}
