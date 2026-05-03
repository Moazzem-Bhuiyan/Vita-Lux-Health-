import Image from "next/image";
import { Check, Star } from "lucide-react";
import { THERAPISTS } from "@/lib/data/misc";
import { cn } from "@/lib/utils";

interface Props {
  selectedTherapistId: string;
  onSelect: (id: string) => void;
}

export function TherapistStep({ selectedTherapistId, onSelect }: Props) {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-serif text-2xl text-stone-900 mb-1">Choose Your Therapist</h2>
        <p className="font-sans text-sm text-stone-400 font-light">
          Select a specialist or let us match you with the perfect therapist.
        </p>
      </div>

      {/* Any available option */}
      <button
        onClick={() => onSelect("any")}
        className={cn(
          "w-full flex items-center gap-4 p-5 border text-left transition-all duration-200",
          selectedTherapistId === "any"
            ? "border-gold-500 bg-gold-500/5"
            : "border-stone-200 hover:border-stone-300 bg-white"
        )}
      >
        <div className="w-14 h-14 bg-stone-100 flex items-center justify-center flex-shrink-0">
          <Star size={18} className="text-gold-500" />
        </div>
        <div className="flex-1">
          <p className="font-serif text-stone-900">Best Available Therapist</p>
          <p className="font-sans text-xs text-stone-400 mt-1">
            We&apos;ll match you with the highest-rated available specialist for your chosen treatment.
          </p>
        </div>
        <div
          className={cn(
            "w-5 h-5 flex items-center justify-center border flex-shrink-0 transition-all duration-200",
            selectedTherapistId === "any" ? "bg-gold-500 border-gold-500" : "border-stone-300"
          )}
        >
          {selectedTherapistId === "any" && <Check size={11} className="text-white" />}
        </div>
      </button>

      {/* Therapist cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {THERAPISTS.map((therapist) => {
          const isSelected = therapist.id === selectedTherapistId;

          return (
            <button
              key={therapist.id}
              onClick={() => therapist.available && onSelect(therapist.id)}
              disabled={!therapist.available}
              className={cn(
                "flex items-start gap-4 p-5 border text-left transition-all duration-200 w-full",
                !therapist.available && "opacity-50 cursor-not-allowed bg-stone-50",
                therapist.available && isSelected && "border-gold-500 bg-gold-500/5",
                therapist.available && !isSelected && "border-stone-200 hover:border-stone-300 bg-white"
              )}
            >
              {/* Photo */}
              <div className="relative w-16 h-16 flex-shrink-0 overflow-hidden rounded-full bg-stone-100">
                <Image
                  src={therapist.image}
                  alt={therapist.name}
                  fill
                  className="object-cover"
                  sizes="64px"
                />
                {!therapist.available && (
                  <div className="absolute inset-0 bg-stone-200/70 flex items-center justify-center">
                    <span className="font-sans text-[8px] text-stone-600 uppercase tracking-wide text-center leading-tight px-1">
                      Not<br />Available
                    </span>
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <p className="font-serif text-stone-900">{therapist.name}</p>
                <p className="font-sans text-[10px] text-gold-600 tracking-wide">{therapist.title}</p>
                <div className="flex items-center gap-1 mt-1.5">
                  <Star size={10} className="text-gold-500 fill-gold-500" />
                  <span className="font-sans text-xs text-stone-600">{therapist.rating}</span>
                  <span className="font-sans text-[10px] text-stone-400">({therapist.reviewCount} reviews)</span>
                </div>
                <div className="flex flex-wrap gap-1 mt-2">
                  {therapist.specialties.slice(0, 2).map((s) => (
                    <span
                      key={s}
                      className="font-sans text-[9px] tracking-wide text-stone-500 bg-stone-100 px-2 py-0.5"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* Selected */}
              <div
                className={cn(
                  "w-5 h-5 flex items-center justify-center border flex-shrink-0 transition-all duration-200 mt-0.5",
                  isSelected ? "bg-gold-500 border-gold-500" : "border-stone-300"
                )}
              >
                {isSelected && <Check size={11} className="text-white" />}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
