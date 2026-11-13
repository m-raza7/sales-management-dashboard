"use client";

import {
  AnimatePresence,
  motion,
  type Variants,
  useReducedMotion,
} from "motion/react";

import { useContext, useEffect, useRef, useState, type ReactNode } from "react";

import { usePathname } from "next/navigation";

import { LayoutRouterContext } from "next/dist/shared/lib/app-router-context.shared-runtime";

import { useLanguage } from "@/components/providers/LanguageProvider";

/**
 * Keeps the previous route context available during exit animation.
 */
function FrozenRouter({ children }: { children: ReactNode }) {
  const routerContext = useContext(LayoutRouterContext);
  const frozenContext = useRef(routerContext).current;

  return (
    <LayoutRouterContext.Provider value={frozenContext}>
      {children}
    </LayoutRouterContext.Provider>
  );
}

/**
 * Route navigation: 3D flip animation.
 */
const routeVariants: Variants = {
  initial: {
    opacity: 0,
    rotateY: -75,
    scale: 0.94,
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
    rotateY: 75,
    scale: 0.94,
    transformOrigin: "right center",
    transition: {
      duration: 0.45,
      ease: [0.4, 0, 1, 1],
    },
  },
};

/**
 * Language change: smooth fade + slide.
 */
const languageVariants: Variants = {
  initial: {
    opacity: 0,
    y: 12,
    scale: 0.99,
  },

  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.35,
      ease: [0.22, 1, 0.36, 1],
    },
  },

  exit: {
    opacity: 0,
    y: -10,
    scale: 0.99,
    transition: {
      duration: 0.2,
      ease: [0.4, 0, 1, 1],
    },
  },
};

export default function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const { languageTransitionKey } = useLanguage();
  const shouldReduceMotion = useReducedMotion();

  const previousPathname = useRef(pathname);
  const previousLanguageKey = useRef(languageTransitionKey);

  const [transitionType, setTransitionType] = useState<"route" | "language">(
    "route",
  );

  useEffect(() => {
    if (pathname !== previousPathname.current) {
      previousPathname.current = pathname;
      previousLanguageKey.current = languageTransitionKey;
      setTransitionType("route");
    } else if (languageTransitionKey !== previousLanguageKey.current) {
      previousLanguageKey.current = languageTransitionKey;
      setTransitionType("language");
    }
  }, [pathname, languageTransitionKey]);

  const activeVariants = shouldReduceMotion
    ? undefined
    : transitionType === "language"
      ? languageVariants
      : routeVariants;

  return (
    <div className="nexora-page-transition">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={`${pathname}-${languageTransitionKey}`}
          variants={activeVariants}
          initial={shouldReduceMotion ? false : "initial"}
          animate="animate"
          exit={shouldReduceMotion ? undefined : "exit"}
          className="nexora-page-transition-content"
        >
          <FrozenRouter>{children}</FrozenRouter>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
