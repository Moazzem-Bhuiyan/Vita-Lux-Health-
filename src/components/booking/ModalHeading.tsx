export function ModalHeading() {
  return (
    <div className="mb-8 text-center">
      <div className="mb-3 flex items-center justify-center gap-3">
        <span className="h-px w-8 bg-[#c9a96e]" />
        <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#a07850]">
          Start Your Journey
        </span>
        <span className="h-px w-8 bg-[#c9a96e]" />
      </div>
      <h2
        className="font-serif text-3xl text-stone-900"
        style={{ fontFamily: "'Playfair Display', serif" }}
      >
        Book Your Consultation
      </h2>
    </div>
  );
}
