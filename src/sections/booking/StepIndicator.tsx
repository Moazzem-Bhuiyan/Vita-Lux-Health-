import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

const STEPS = [
  { id: 1, label: "Service" },
  { id: 2, label: "Date & Time" },
  { id: 3, label: "Therapist" },
  { id: 4, label: "Details" },
  { id: 5, label: "Confirm" },
];

interface StepIndicatorProps {
  currentStep: number;
}

export function StepIndicator({ currentStep }: StepIndicatorProps) {
  return (
    <div className="flex items-center justify-center gap-0">
      {STEPS.map((step, index) => {
        const isCompleted = step.id < currentStep;
        const isActive = step.id === currentStep;

        return (
          <div key={step.id} className="flex items-center">
            {/* Step circle */}
            <div className="flex flex-col items-center gap-2">
              <div
                className={cn(
                  "w-9 h-9 flex items-center justify-center transition-all duration-300",
                  isCompleted && "bg-gold-500 text-stone-900",
                  isActive && "bg-stone-900 text-cream-50",
                  !isCompleted && !isActive && "bg-stone-100 text-stone-400"
                )}
              >
                {isCompleted ? (
                  <Check size={14} />
                ) : (
                  <span className="font-sans text-xs font-medium">{step.id}</span>
                )}
              </div>
              <span
                className={cn(
                  "font-sans text-[9px] tracking-[0.15em] uppercase hidden sm:block",
                  isActive ? "text-stone-900 font-medium" : "text-stone-400"
                )}
              >
                {step.label}
              </span>
            </div>

            {/* Connector line */}
            {index < STEPS.length - 1 && (
              <div
                className={cn(
                  "w-12 md:w-20 h-px mx-1 mt-[-18px] sm:mt-[-26px] transition-all duration-500",
                  step.id < currentStep ? "bg-gold-500" : "bg-stone-200"
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
