"use client";

import { motion, type Variants } from "motion/react";

import type { ReactNode } from "react";

type AnimatedLayoutProps = {
  children: ReactNode;
  className?: string;
};

const layoutVariants: Variants = {
  initial: {
    opacity: 0,
    rotateY: -60,
    scale: 0.96,
    transformOrigin: "left center",
  },

  animate: {
    opacity: 1,
    rotateY: 0,
    scale: 1,
    transformOrigin: "left center",
    transition: {
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1],
    },
  },

  exit: {
    opacity: 0,
    rotateY: 60,
    scale: 0.96,
    transformOrigin: "right center",
    transition: {
      duration: 0.4,
      ease: [0.4, 0, 1, 1],
    },
  },
};

export default function AnimatedLayout({
  children,
  className = "",
}: AnimatedLayoutProps) {
  return (
    <div className="nexora-animated-layout">
      <motion.div
        variants={layoutVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className={`nexora-animated-layout-content ${className}`}
      >
        {children}
      </motion.div>
    </div>
  );
}
