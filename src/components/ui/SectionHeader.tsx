import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  eyebrow?: string;
  heading: string;
  subheading?: string;
  align?: "left" | "center";
  light?: boolean;
  className?: string;
}

export function SectionHeader({
  eyebrow,
  heading,
  subheading,
  align = "center",
  light = false,
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "space-y-4",
        align === "center" && "text-center",
        align === "left" && "text-left",
        className
      )}
    >
      {eyebrow && (
        <p
          className={cn(
            "eyebrow",
            light ? "text-gold-300" : "text-gold-600"
          )}
        >
          {eyebrow}
        </p>
      )}

      <div
        className={cn(
          "flex items-center gap-4",
          align === "center" && "justify-center"
        )}
      >
        {align === "left" && (
          <div className={cn("w-12 h-px flex-shrink-0", light ? "bg-gold-400/50" : "bg-gold-500")} />
        )}
        <h2
          className={cn(
            "font-serif font-light leading-tight",
            "text-display-md",
            light ? "text-cream-50" : "text-stone-900"
          )}
        >
          {heading}
        </h2>
      </div>

      {align === "center" && (
        <div className={cn("w-12 h-px mx-auto", light ? "bg-gold-400/50" : "bg-gold-500")} />
      )}

      {subheading && (
        <p
          className={cn(
            "font-sans font-light leading-relaxed max-w-2xl",
            align === "center" && "mx-auto",
            light ? "text-cream-300/80" : "text-stone-500",
          )}
        >
          {subheading}
        </p>
      )}
    </div>
  );
}
