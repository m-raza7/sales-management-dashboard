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

// import "./PageTransition.css";

type TransitionType = "route" | "language";

type AnimationName = "puzzle" | "flip" | "curtain" | "slide" | "blur" | "zoom";

/* =========================================
   FROZEN ROUTER
========================================= */

function FrozenRouter({ children }: { children: ReactNode }) {
  const routerContext = useContext(LayoutRouterContext);
  const frozenContext = useRef(routerContext).current;

  return (
    <LayoutRouterContext.Provider value={frozenContext}>
      {children}
    </LayoutRouterContext.Provider>
  );
}

/* =========================================
   PUZZLE ANIMATION
========================================= */

const puzzleVariants: Variants = {
  initial: {
    opacity: 0,
    scale: 0.9,
  },

  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.76, 0, 0.24, 1],
    },
  },

  exit: {
    opacity: 0,
    scale: 0.9,
    transition: {
      duration: 0.4,
      ease: [0.76, 0, 0.24, 1],
    },
  },
};

/* =========================================
   3D FLIP ANIMATION
========================================= */

const flipVariants: Variants = {
  initial: {
    opacity: 0,
    rotateY: -90,
    scale: 0.85,
    transformOrigin: "left center",
  },

  animate: {
    opacity: 1,
    rotateY: 0,
    scale: 1,
    transformOrigin: "left center",
    transition: {
      duration: 0.7,
      ease: [0.76, 0, 0.24, 1],
    },
  },

  exit: {
    opacity: 0,
    rotateY: 90,
    scale: 0.85,
    transformOrigin: "right center",
    transition: {
      duration: 0.5,
      ease: [0.4, 0, 1, 1],
    },
  },
};

/* =========================================
   CURTAIN ANIMATION
========================================= */

const curtainVariants: Variants = {
  initial: {
    opacity: 0,
    x: 60,
  },

  animate: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: [0.76, 0, 0.24, 1],
    },
  },

  exit: {
    opacity: 0,
    x: -60,
    transition: {
      duration: 0.5,
      ease: [0.4, 0, 1, 1],
    },
  },
};

/* =========================================
   SLIDE FROM RIGHT
========================================= */

const slideVariants: Variants = {
  initial: {
    opacity: 0,
    x: 100,
  },

  animate: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1],
    },
  },

  exit: {
    opacity: 0,
    x: -100,
    transition: {
      duration: 0.4,
      ease: [0.4, 0, 1, 1],
    },
  },
};

/* =========================================
   BLUR + FADE
========================================= */

const blurVariants: Variants = {
  initial: {
    opacity: 0,
    filter: "blur(15px)",
    scale: 1.03,
  },

  animate: {
    opacity: 1,
    filter: "blur(0px)",
    scale: 1,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },

  exit: {
    opacity: 0,
    filter: "blur(15px)",
    scale: 0.97,
    transition: {
      duration: 0.35,
      ease: [0.4, 0, 1, 1],
    },
  },
};

/* =========================================
   ZOOM ANIMATION
========================================= */

const zoomVariants: Variants = {
  initial: {
    opacity: 0,
    scale: 0.75,
  },

  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.65,
      ease: [0.16, 1, 0.3, 1],
    },
  },

  exit: {
    opacity: 0,
    scale: 1.15,
    transition: {
      duration: 0.35,
      ease: [0.4, 0, 1, 1],
    },
  },
};

/* =========================================
   LANGUAGE CHANGE ANIMATION
========================================= */

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

/* =========================================
   ANIMATION CONFIGURATION
========================================= */

const animationMap: Record<AnimationName, Variants> = {
  puzzle: puzzleVariants,
  flip: flipVariants,
  curtain: curtainVariants,
  slide: slideVariants,
  blur: blurVariants,
  zoom: zoomVariants,
};

/**
 * Choose animation according to pathname.
 *
 * Add or change paths here whenever you add new pages.
 */
function getAnimationName(pathname: string): AnimationName {
  const path = pathname.replace(/\/$/, "") || "/";

  const routeAnimations: Record<string, AnimationName> = {
    "/": "puzzle",
    "/about": "flip",
    "/contact": "curtain",
    "/products": "slide",
    "/services": "blur",
    "/dashboard": "zoom",
  };

  // Exact route match
  if (routeAnimations[path]) {
    return routeAnimations[path];
  }

  // Dynamic route match examples
  if (path.startsWith("/products/")) {
    return "slide";
  }

  if (path.startsWith("/services/")) {
    return "blur";
  }

  if (path.startsWith("/dashboard/")) {
    return "zoom";
  }

  // Default animation for other routes
  return "flip";
}

/* =========================================
   PUZZLE TILES
========================================= */

const puzzleTiles = Array.from({ length: 12 }, (_, index) => index);

/* =========================================
   PAGE TRANSITION COMPONENT
========================================= */

export default function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  const { languageTransitionKey } = useLanguage();

  const shouldReduceMotion = useReducedMotion();

  const previousPathname = useRef(pathname);

  const previousLanguageKey = useRef(languageTransitionKey);

  const [transitionType, setTransitionType] = useState<TransitionType>("route");

  /* Detect route navigation or language change */
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

  /* Select route animation */
  const animationName = getAnimationName(pathname);

  const routeVariants = animationMap[animationName];

  /* Language transition overrides route animation */
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
          className={`nexora-page-transition-content ${animationName}-container`}
        >
          {/* HOME: PUZZLE TILE OVERLAY */}
          {animationName === "puzzle" &&
            transitionType === "route" &&
            !shouldReduceMotion && (
              <motion.div className="nexora-puzzle-grid" aria-hidden="true">
                {puzzleTiles.map((tile) => (
                  <motion.div
                    key={tile}
                    className="nexora-puzzle-tile"
                    initial={{
                      opacity: 1,
                      scale: 1,
                    }}
                    animate={{
                      opacity: 0,
                      scale: 0,
                    }}
                    transition={{
                      duration: 0.45,
                      ease: [0.76, 0, 0.24, 1],
                      delay: (tile % 4) * 0.04 + Math.floor(tile / 4) * 0.05,
                    }}
                  />
                ))}
              </motion.div>
            )}

          {/* CONTACT: CURTAIN OVERLAY */}
          {animationName === "curtain" &&
            transitionType === "route" &&
            !shouldReduceMotion && (
              <motion.div
                className="nexora-curtain-overlay"
                initial={{
                  scaleY: 1,
                }}
                animate={{
                  scaleY: 0,
                }}
                transition={{
                  duration: 0.7,
                  ease: [0.76, 0, 0.24, 1],
                }}
                aria-hidden="true"
              />
            )}

          {/* PAGE CONTENT */}
          <div className="nexora-route-content">
            <FrozenRouter>{children}</FrozenRouter>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
