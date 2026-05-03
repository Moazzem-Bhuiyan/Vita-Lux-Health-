import { cn } from "@/lib/utils";
import { type InputHTMLAttributes, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, className, id, ...props }, ref) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="space-y-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="block font-sans text-xs font-medium tracking-widest uppercase text-stone-600"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={cn(
            "w-full bg-white border border-stone-200 px-4 py-3",
            "font-sans text-sm text-stone-800 placeholder:text-stone-400",
            "transition-all duration-200",
            "focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500/30",
            error && "border-red-300 focus:border-red-400 focus:ring-red-400/30",
            className
          )}
          {...props}
        />
        {hint && !error && (
          <p className="font-sans text-xs text-stone-400">{hint}</p>
        )}
        {error && (
          <p className="font-sans text-xs text-red-500">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };
