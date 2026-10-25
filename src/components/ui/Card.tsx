import React from "react";
import { cn } from "@/lib/utils";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverEffect?: boolean;
  variant?: "pure" | "cream" | "meshSky" | "meshAurora" | "meshTwilight" | "frost";
}

export function Card({
  className,
  children,
  hoverEffect = false,
  variant = "pure",
  ...props
}: CardProps) {
  const variantStyles = {
    pure: "bg-white border border-[#E7E4DC] shadow-card",
    cream: "bg-[#F4F1EA] border border-[#E7E4DC] shadow-subtle",
    meshSky: "bg-gradient-to-br from-[#74B9FF] via-[#A0C4FF] to-[#CADEFC] text-[#0B132B] border border-white/60 shadow-float",
    meshAurora: "bg-gradient-to-br from-[#70C5E8] via-[#7ED8B6] to-[#E9E493] text-[#0B132B] border border-white/60 shadow-float",
    meshTwilight: "bg-gradient-to-br from-[#1E3A8A] via-[#3B82F6] to-[#818CF8] text-white border border-white/20 shadow-float",
    frost: "bg-white/90 backdrop-blur-md border border-white/70 shadow-frost",
  };

  return (
    <div
      className={cn(
        "rounded-3xl p-6 sm:p-8 transition-all duration-200",
        variantStyles[variant],
        hoverEffect && "hover:-translate-y-1 hover:shadow-float",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
