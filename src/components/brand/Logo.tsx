import React from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface LogoProps {
  variant?: "light" | "dark" | "blue";
  size?: "sm" | "md" | "lg";
  showWordmark?: boolean;
  className?: string;
  href?: string;
}

export function Logo({
  variant,
  size = "md",
  showWordmark = true,
  className,
  href = "/",
}: LogoProps) {
  const sizeMap = {
    sm: { icon: 26, textW: 86, textH: 23 },
    md: { icon: 34, textW: 112, textH: 30 },
    lg: { icon: 46, textW: 152, textH: 40 },
  };

  const currentSize = sizeMap[size];

  const content = (
    <div
      className={cn(
        "group inline-flex items-center gap-2.5 select-none transition-transform duration-200 hover:opacity-95",
        className
      )}
    >
      {/* Brand Icon: Blue circle with white disc and blue chevron arrow */}
      <div className="relative shrink-0 flex items-center justify-center transition-transform duration-200 group-hover:scale-105">
        <Image
          src="/images/logo-icon.png"
          alt="TO DIRECT icon"
          width={currentSize.icon}
          height={currentSize.icon}
          className="object-contain rounded-full shadow-2xs"
          priority
        />
      </div>

      {/* Brand Wordmark (todirect) */}
      {showWordmark && (
        <div className="relative flex items-center shrink-0">
          {variant === "dark" ? (
            /* Explicit dark variant */
            <Image
              src="/images/logo-text-dark.png"
              alt="todirect"
              width={currentSize.textW}
              height={currentSize.textH}
              className="object-contain"
              priority
            />
          ) : variant === "light" ? (
            /* Explicit light variant */
            <Image
              src="/images/logo-text.png"
              alt="todirect"
              width={currentSize.textW}
              height={currentSize.textH}
              className="object-contain"
              priority
            />
          ) : (
            /* Theme-responsive wordmark: light mode uses black 'to', dark mode uses white 'to' */
            <>
              <Image
                src="/images/logo-text.png"
                alt="todirect"
                width={currentSize.textW}
                height={currentSize.textH}
                className="dark:hidden object-contain"
                priority
              />
              <Image
                src="/images/logo-text-dark.png"
                alt="todirect"
                width={currentSize.textW}
                height={currentSize.textH}
                className="hidden dark:block object-contain"
                priority
              />
            </>
          )}
        </div>
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
