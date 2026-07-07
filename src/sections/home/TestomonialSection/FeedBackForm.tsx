import { useState } from 'react';
import { useCreateReviewMutation } from '@/redux/api/reviewApi';
import { toast } from 'sonner';

export function FeedbackForm({
  serviceId,
  bookingId,
  serviceName,
  onDiscard,
}: {
  serviceId: number;
  bookingId: number;
  serviceName: string;
  onDiscard: () => void;
}) {
  const [rating, setRating] = useState(0);
  const [text, setText] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const [createReview, { isLoading }] = useCreateReviewMutation();

  const handleSubmit = async () => {
    if (rating === 0) return;

    try {
      await createReview({
        service_id: serviceId,
        booking_detail_id: bookingId,
        rating,
        comment: text.trim(),
      }).unwrap();

      setSubmitted(true);
      setTimeout(() => {
        onDiscard();
      }, 1800);
    } catch (error: any) {
      toast.error(error?.data?.message || 'Failed to submit review. Please try again.');
    }
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center h-[540px] text-center">
        <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mb-5">
          <span className="text-4xl">✅</span>
        </div>
        <h3 className="text-2xl font-bold text-[#1a1008] mb-2">Thank You!</h3>
        <p className="text-[#1a1008]/60">Your feedback has been submitted successfully.</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Service Name Display */}
      <div className="text-center mb-6">
        <p className="text-sm text-stone-500 mb-1">You are reviewing</p>
        <p className="font-semibold text-xl text-[#1a1008]">{serviceName}</p>
      </div>

      <RatingInput value={rating} onChange={setRating} />

      <h3 className="text-center text-3xl font-bold text-[#1a1008] mt-4 mb-6">Rate Our Service</h3>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Share your experience with this service..."
        className="w-full h-[300px] rounded-2xl border border-[#1a1008]/10 bg-white p-5 text-sm placeholder:text-[#1a1008]/40 focus:outline-none focus:ring-2 focus:ring-[#1a1008]/15 resize-none"
      />

      <div className="flex items-center gap-4 mt-6">
        <button
          onClick={onDiscard}
          className="flex-1 h-14 rounded-2xl bg-[#1a1008]/8 text-[#1a1008] font-medium hover:bg-[#1a1008]/12 transition-colors"
        >
          Discard
        </button>
        <button
          onClick={handleSubmit}
          disabled={rating === 0 || isLoading}
          className="flex-1 h-14 rounded-2xl bg-[#1a1008] text-white font-medium hover:bg-[#2d1f0e] disabled:opacity-50 transition-colors"
        >
          {isLoading ? 'Submitting...' : 'Submit Review'}
        </button>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────── */
/* Reusable Components (unchanged) */
export function StarIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 20 20">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );
}

export function StarRating({ filled }: { filled: boolean }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <StarIcon key={i} className={`w-4 h-4 ${filled ? 'text-[#f5a623]' : 'text-[#d1c4a8]'}`} />
      ))}
    </div>
  );
}

export function RatingInput({ value, onChange }: { value: number; onChange: (n: number) => void }) {
  const [hovered, setHovered] = useState(0);
  const display = hovered || value;

  return (
    <div className="flex justify-center gap-2" onMouseLeave={() => setHovered(0)}>
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          onClick={() => onChange(n)}
          onMouseEnter={() => setHovered(n)}
          aria-label={`Rate ${n} star${n > 1 ? 's' : ''}`}
          className="p-1 transition-transform hover:scale-110"
        >
          <StarIcon className={`w-7 h-7 ${n <= display ? 'text-[#f5a623]' : 'text-[#d1c4a8]'}`} />
        </button>
      ))}
    </div>
  );
}
