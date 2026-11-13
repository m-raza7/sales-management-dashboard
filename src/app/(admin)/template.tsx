"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

export default function AdminTemplate({ children }: { children: ReactNode }) {
  return (
    <div className="page-flip-perspective">
      <motion.div
        className="page-flip"
        initial={{
          rotateY: -90,
          opacity: 0,
          scale: 0.92,
        }}
        animate={{
          rotateY: 0,
          opacity: 1,
          scale: 1,
        }}
        transition={{
          duration: 0.65,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
