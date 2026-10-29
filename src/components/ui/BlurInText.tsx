"use client";

import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";

interface BlurInProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  blurAmount?: string;
  yOffset?: number;
  as?: "div" | "h1" | "h2" | "h3" | "h4" | "p" | "span";
  once?: boolean;
}

export function BlurIn({
  children,
  className = "",
  delay = 0,
  duration = 0.75,
  blurAmount = "10px",
  yOffset = 14,
  as = "div",
  once = true,
  ...props
}: BlurInProps) {
  const Component = (motion as any)[as] || motion.div;

  return (
    <Component
      initial={{
        filter: `blur(${blurAmount})`,
        opacity: 0,
        y: yOffset,
      }}
      whileInView={{
        filter: "blur(0px)",
        opacity: 1,
        y: 0,
      }}
      viewport={{ once, margin: "-40px" }}
      transition={{
        duration,
        delay,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
      style={{ willChange: "filter, opacity, transform" }}
      className={className}
      {...props}
    >
      {children}
    </Component>
  );
}

interface BlurInWordsProps {
  text: string;
  className?: string;
  wordClassName?: string;
  delay?: number;
  stagger?: number;
  duration?: number;
  blurAmount?: string;
  as?: "h1" | "h2" | "h3" | "p" | "span" | "div";
}

export function BlurInWords({
  text,
  className = "",
  wordClassName = "",
  delay = 0,
  stagger = 0.08,
  duration = 0.7,
  blurAmount = "12px",
  as = "h1",
}: BlurInWordsProps) {
  const words = text.split(" ");
  const Component = (motion as any)[as] || motion.h1;

  return (
    <Component className={`inline-flex flex-wrap gap-x-[0.25em] ${className}`}>
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          initial={{
            filter: `blur(${blurAmount})`,
            opacity: 0,
            y: 14,
          }}
          whileInView={{
            filter: "blur(0px)",
            opacity: 1,
            y: 0,
          }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{
            duration,
            delay: delay + i * stagger,
            ease: [0.21, 0.47, 0.32, 0.98],
          }}
          style={{ willChange: "filter, opacity, transform" }}
          className={`inline-block ${wordClassName}`}
        >
          {word}
        </motion.span>
      ))}
    </Component>
  );
}
