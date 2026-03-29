"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

interface ScrollRevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  direction?: "up" | "left" | "right" | "none";
  distance?: number;
}

export default function ScrollReveal({
  children,
  delay = 0,
  className = "",
  direction = "up",
  distance = 40,
}: ScrollRevealProps) {
  const initial: Record<string, number | string> = { opacity: 0 };
  const animate: Record<string, number | string> = { opacity: 1 };

  if (direction === "up") {
    initial.y = distance;
    animate.y = 0;
  } else if (direction === "left") {
    initial.x = -distance;
    animate.x = 0;
  } else if (direction === "right") {
    initial.x = distance;
    animate.x = 0;
  }

  return (
    <motion.div
      initial={initial}
      whileInView={animate}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.7,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
