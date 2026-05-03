"use client";

import { cn } from "@/lib/utils";
import { type ButtonHTMLAttributes, forwardRef } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "gold-outline";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { variant = "primary", size = "md", fullWidth = false, className, children, ...props },
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={cn(
          // Base styles
          "inline-flex items-center justify-center gap-2 font-sans font-medium tracking-widest uppercase text-xs",
          "transition-all duration-300 ease-in-out",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          "relative overflow-hidden",

          // Size variants
          size === "sm" && "px-6 py-2.5 text-[10px]",
          size === "md" && "px-8 py-3.5",
          size === "lg" && "px-10 py-4 text-[11px]",

          // Variant styles
          variant === "primary" && [
            "bg-stone-900 text-cream-50",
            "hover:bg-stone-800",
            "after:content-[''] after:absolute after:inset-0",
            "after:bg-gold-500/10 after:opacity-0 hover:after:opacity-100",
            "after:transition-opacity after:duration-300",
          ],

          variant === "secondary" && [
            "bg-cream-200 text-stone-900",
            "hover:bg-cream-300",
          ],

          variant === "ghost" && [
            "text-stone-700",
            "hover:text-stone-900 hover:bg-stone-100",
          ],

          variant === "gold-outline" && [
            "border border-gold-500 text-gold-600 bg-transparent",
            "hover:bg-gold-500 hover:text-cream-50",
          ],

          fullWidth && "w-full",
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };
