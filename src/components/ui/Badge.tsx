import React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "pill" | "blue" | "dark" | "purple" | "emerald" | "amber" | "neutral";
  size?: "sm" | "md";
}

export function Badge({
  className,
  variant = "pill",
  size = "md",
  children,
  ...props
}: BadgeProps) {
  const variantStyles = {
    // Standard pill badge with subtle border
    pill: "bg-white text-[#0B132B] border border-[#E2E8F0] shadow-xs font-semibold",
    blue: "bg-[#EAF0FF] text-[#1748D8] border border-[#2563FF]/20 font-bold",
    dark: "bg-[#0B132B] text-white font-bold",
    purple: "bg-[#F3E8FF] text-[#7E22CE] border border-[#7E22CE]/20 font-bold",
    emerald: "bg-[#ECFDF5] text-[#065F46] border border-[#065F46]/20 font-bold",
    amber: "bg-[#FFFBEB] text-[#92400E] border border-[#92400E]/20 font-bold",
    neutral: "bg-[#F4F1EA] text-[#64748B] border border-[#E7E4DC] font-medium",
  };

  const sizeStyles = {
    sm: "px-2.5 py-0.5 text-[11px]",
    md: "px-3.5 py-1 text-xs",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full select-none",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
