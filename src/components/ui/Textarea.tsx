import { cn } from "@/lib/utils";
import { type TextareaHTMLAttributes, forwardRef } from "react";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, className, id, ...props }, ref) => {
    const textareaId = id ?? label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="space-y-1.5">
        {label && (
          <label
            htmlFor={textareaId}
            className="block font-sans text-xs font-medium tracking-widest uppercase text-stone-600"
          >
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          className={cn(
            "w-full bg-white border border-stone-200 px-4 py-3 resize-none",
            "font-sans text-sm text-stone-800 placeholder:text-stone-400",
            "transition-all duration-200",
            "focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500/30",
            error && "border-red-300 focus:border-red-400",
            className
          )}
          rows={4}
          {...props}
        />
        {error && <p className="font-sans text-xs text-red-500">{error}</p>}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";

export { Textarea };
