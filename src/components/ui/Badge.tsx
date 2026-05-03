import { cn } from "@/lib/utils";

interface BadgeProps {
  label: string;
  variant?: "gold" | "stone" | "sage" | "cream";
  className?: string;
}

export function Badge({ label, variant = "gold", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-block text-[9px] font-sans font-medium tracking-[0.2em] uppercase px-3 py-1",
        variant === "gold" && "bg-gold-500/10 text-gold-700 border border-gold-500/30",
        variant === "stone" && "bg-stone-100 text-stone-600 border border-stone-200",
        variant === "sage" && "bg-sage-100 text-sage-700 border border-sage-200",
        variant === "cream" && "bg-cream-200 text-stone-700 border border-cream-300",
        className
      )}
    >
      {label}
    </span>
  );
}
