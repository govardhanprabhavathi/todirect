import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  variant?: "light" | "dark" | "blue";
  size?: "sm" | "md" | "lg";
  showWordmark?: boolean;
  className?: string;
  href?: string;
}

export function Logo({
  variant = "light",
  size = "md",
  showWordmark = true,
  className,
  href = "/",
}: LogoProps) {
  const iconSizes = {
    sm: "w-7 h-7",
    md: "w-9 h-9",
    lg: "w-11 h-11",
  };

  const textSizes = {
    sm: "text-base tracking-tight font-semibold",
    md: "text-lg tracking-tight font-semibold",
    lg: "text-2xl tracking-tighter font-semibold",
  };

  const symbol = (
    <div
      className={cn(
        "relative flex items-center justify-center rounded-full transition-transform duration-200 group-hover:scale-105 shadow-sm",
        iconSizes[size],
        variant === "dark"
          ? "bg-white text-[#2563FF]"
          : "bg-[#2563FF] text-white"
      )}
    >
      {/* Modern spiral / compass direction mark (inspired by Calendly swirl + TO DIRECT forward beacon) */}
      <svg
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-5/6 h-5/6 p-1"
      >
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="38 12" />
        <path d="M10 8L15 12L10 16V8Z" fill="currentColor" />
      </svg>
    </div>
  );

  const content = (
    <div className={cn("group inline-flex items-center gap-2.5 select-none", className)}>
      {symbol}
      {showWordmark && (
        <span className={cn(textSizes[size], variant === "dark" ? "text-white" : "text-[#0B132B]")}>
          TO <span className="text-[#2563FF]">DIRECT</span>
        </span>
      )}
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="inline-flex items-center">
        {content}
      </Link>
    );
  }

  return content;
}
