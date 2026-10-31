"use client";

import Link from "next/link";
import React from "react";
import { cn } from "@/lib/utils";

export interface SkiperLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  children: React.ReactNode;
  href: string;
  className?: string;
  target?: string;
  rel?: string;
}

const ArrowIcon = ({ className }: { className?: string }) => (
  <svg
    className={cn(
      "ml-[0.3em] size-[0.55em] translate-y-0.5 opacity-0 transition-all duration-300 [motion-reduce:transition-none] group-hover:translate-y-0 group-hover:opacity-100",
      className
    )}
    fill="none"
    viewBox="0 0 10 10"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M1.004 9.166 9.337.833m0 0v8.333m0-8.333H1.004"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/**
 * Link000: Clean underline left-to-right on hover
 */
export const Link000 = ({ children, href, className, target, rel, ...props }: SkiperLinkProps) => {
  const isInternal = href.startsWith("/") || href.startsWith("#");
  const commonClasses = cn(
    "group relative inline-flex items-center",
    "before:pointer-events-none before:absolute before:bottom-0 before:left-0 before:h-[0.08em] before:w-full before:bg-current before:content-['']",
    "before:origin-right before:scale-x-0 before:transition-transform before:duration-300 before:ease-[cubic-bezier(0.4,0,0.2,1)]",
    "hover:before:origin-left hover:before:scale-x-100",
    className
  );

  if (isInternal && !target) {
    return (
      <Link href={href} className={commonClasses} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <a href={href} className={commonClasses} target={target} rel={rel} {...props}>
      {children}
    </a>
  );
};

/**
 * Link001: Underline reveal (left-to-right) with floating hover arrow
 */
export const Link001 = ({ children, href, className, target, rel, ...props }: SkiperLinkProps) => {
  const isInternal = href.startsWith("/") || href.startsWith("#");
  const commonClasses = cn(
    "group relative inline-flex items-center",
    "before:pointer-events-none before:absolute before:left-0 before:bottom-0 before:h-[0.08em] before:w-full before:bg-current before:content-['']",
    "before:origin-right before:scale-x-0 before:transition-transform before:duration-300 before:ease-[cubic-bezier(0.4,0,0.2,1)]",
    "hover:before:origin-left hover:before:scale-x-100",
    className
  );

  if (isInternal && !target) {
    return (
      <Link href={href} className={commonClasses} {...props}>
        {children}
        <ArrowIcon />
      </Link>
    );
  }

  return (
    <a href={href} className={commonClasses} target={target} rel={rel} {...props}>
      {children}
      <ArrowIcon />
    </a>
  );
};

/**
 * Link002: Underline reveal (right-to-left) with hover arrow
 */
export const Link002 = ({ children, href, className, target, rel, ...props }: SkiperLinkProps) => {
  const isInternal = href.startsWith("/") || href.startsWith("#");
  const commonClasses = cn(
    "group relative inline-flex items-center",
    "before:pointer-events-none before:absolute before:left-0 before:bottom-0 before:h-[0.08em] before:w-full before:bg-current before:content-['']",
    "before:origin-left before:scale-x-0 before:transition-transform before:duration-300 before:ease-[cubic-bezier(0.4,0,0.2,1)]",
    "hover:before:origin-right hover:before:scale-x-100",
    className
  );

  if (isInternal && !target) {
    return (
      <Link href={href} className={commonClasses} {...props}>
        {children}
        <ArrowIcon />
      </Link>
    );
  }

  return (
    <a href={href} className={commonClasses} target={target} rel={rel} {...props}>
      {children}
      <ArrowIcon />
    </a>
  );
};

/**
 * Link003: Underline expanding from center with hover arrow
 */
export const Link003 = ({ children, href, className, target, rel, ...props }: SkiperLinkProps) => {
  const isInternal = href.startsWith("/") || href.startsWith("#");
  const commonClasses = cn(
    "group relative inline-flex items-center",
    "before:pointer-events-none before:absolute before:left-0 before:bottom-0 before:h-[0.08em] before:w-full before:bg-current before:content-['']",
    "before:origin-center before:scale-x-0 before:transition-transform before:duration-300 before:ease-[cubic-bezier(0.4,0,0.2,1)]",
    "hover:before:scale-x-100",
    className
  );

  if (isInternal && !target) {
    return (
      <Link href={href} className={commonClasses} {...props}>
        {children}
        <ArrowIcon />
      </Link>
    );
  }

  return (
    <a href={href} className={commonClasses} target={target} rel={rel} {...props}>
      {children}
      <ArrowIcon />
    </a>
  );
};

/**
 * Link004: Cursor.com-style vertical height expand with negative difference fill
 */
export const Link004 = ({ children, href, className, target, rel, ...props }: SkiperLinkProps) => {
  const isInternal = href.startsWith("/") || href.startsWith("#");
  const commonClasses = cn(
    "group relative inline-flex items-center px-2 py-0.5 rounded-sm",
    "before:pointer-events-none before:absolute before:left-0 before:bottom-0 before:w-full before:bg-white before:content-['']",
    "before:origin-center before:transition-all before:duration-300 before:ease-[cubic-bezier(0.4,0,0.2,1)]",
    "before:z-0 before:h-0 before:scale-x-100 before:mix-blend-difference hover:before:h-full",
    className
  );

  if (isInternal && !target) {
    return (
      <Link href={href} className={commonClasses} {...props}>
        <span className="relative z-10">{children}</span>
        <ArrowIcon className="z-10 group-hover:rotate-45" />
      </Link>
    );
  }

  return (
    <a href={href} className={commonClasses} target={target} rel={rel} {...props}>
      <span className="relative z-10">{children}</span>
      <ArrowIcon className="z-10 group-hover:rotate-45" />
    </a>
  );
};

/**
 * Link005: Cursor.com-style horizontal width expand with negative difference fill
 */
export const Link005 = ({ children, href, className, target, rel, ...props }: SkiperLinkProps) => {
  const isInternal = href.startsWith("/") || href.startsWith("#");
  const commonClasses = cn(
    "group relative inline-flex items-center px-2 py-0.5 rounded-sm",
    "before:pointer-events-none before:absolute before:left-0 before:top-0 before:w-full before:bg-white before:content-['']",
    "before:origin-left before:transition-all before:duration-300 before:ease-[cubic-bezier(0.4,0,0.2,1)]",
    "before:z-0 before:h-full before:scale-x-0 before:mix-blend-difference hover:before:scale-x-100",
    className
  );

  if (isInternal && !target) {
    return (
      <Link href={href} className={commonClasses} {...props}>
        <span className="relative z-10">{children}</span>
        <ArrowIcon className="z-10 -translate-x-1 rotate-45 group-hover:translate-x-0" />
      </Link>
    );
  }

  return (
    <a href={href} className={commonClasses} target={target} rel={rel} {...props}>
      <span className="relative z-10">{children}</span>
      <ArrowIcon className="z-10 -translate-x-1 rotate-45 group-hover:translate-x-0" />
    </a>
  );
};

export const Skiper40 = () => {
  return (
    <section className="h-full snap-y snap-mandatory overflow-y-scroll p-6">
      <div className="relative flex h-full w-full flex-col items-center justify-center gap-5">
        <Link000 href="#">Link000: Subtle Underline</Link000>
        <Link001 href="#">Link001: Left to Right Arrow</Link001>
        <Link002 href="#">Link002: Right to Left Arrow</Link002>
        <Link003 href="#">Link003: Center Reveal</Link003>
        <Link004 href="#">Link004: Negative Fill Height</Link004>
        <Link005 href="#">Link005: Negative Fill Width</Link005>
      </div>
    </section>
  );
};

export default Skiper40;
