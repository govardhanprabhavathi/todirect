import React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primaryDark" | "primaryBlue" | "outline" | "ghost" | "danger" | "social" | "pure";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primaryDark",
      size = "md",
      isLoading = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium transition-all duration-200 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none disabled:active:scale-100 cursor-pointer select-none";

    const variantStyles = {
      // Solid dark navy/black pill from reference screenshot
      primaryDark:
        "bg-[#0A1629] hover:bg-[#1E293B] text-white rounded-full shadow-xs hover:shadow focus-visible:ring-[#0A1629]",
      // Precision electric blue pill
      primaryBlue:
        "bg-[#2563FF] hover:bg-[#1748D8] text-white rounded-full shadow-xs hover:shadow focus-visible:ring-[#2563FF]",
      // White pill with clean dark border
      outline:
        "bg-white hover:bg-[#FAF8F5] text-[#0A1629] border border-slate-300 rounded-full shadow-2xs focus-visible:ring-[#0A1629]",
      // Ghost button for nav and tertiary actions
      ghost:
        "bg-transparent hover:bg-[#0A1629]/5 text-slate-700 hover:text-[#0A1629] rounded-full",
      // Danger pill
      danger:
        "bg-[#DC2626] hover:bg-[#B91C1C] text-white rounded-full shadow-xs focus-visible:ring-[#DC2626]",
      // Social / Auth pill matching Image 2
      social:
        "bg-[#0A1629] hover:bg-[#1E293B] text-white rounded-full shadow-xs px-5 py-3",
      // Pure white pill
      pure:
        "bg-white hover:bg-slate-50 text-[#0A1629] border border-slate-200/80 rounded-full shadow-xs focus-visible:ring-slate-400",
    };

    const sizeStyles = {
      sm: "text-xs px-4 py-2 gap-1.5 h-9",
      md: "text-sm px-5 py-2.5 gap-2 h-10 sm:h-11",
      lg: "text-sm sm:text-base px-6 sm:px-7 py-3 gap-2.5 h-12",
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)}
        {...props}
      >
        {isLoading && (
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
