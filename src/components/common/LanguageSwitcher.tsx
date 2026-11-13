"use client";

import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown, Globe } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

import { useLanguage } from "@/components/providers/LanguageProvider";

type Language = "en" | "mr" | "hi";

const languages: { value: Language; label: string }[] = [
  { value: "en", label: "English" },
  { value: "mr", label: "मराठी" },
  { value: "hi", label: "हिन्दी" },
];

export default function LanguageSwitcher() {
  const { language, setLanguage, mounted } = useLanguage();

  const [isOpen, setIsOpen] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedLanguage =
    languages.find((item) => item.value === language) ?? languages[0];

  useEffect(() => {
    function handleOutsideClick(event: PointerEvent) {
      const target = event.target;

      if (
        target instanceof Node &&
        containerRef.current &&
        !containerRef.current.contains(target)
      ) {
        setIsOpen(false);
      }
    }

    function handleKeyboard(event: KeyboardEvent) {
      if (event.key === "Escape" && isOpen) {
        event.preventDefault();
        setIsOpen(false);
        triggerRef.current?.focus();
      }
    }

    document.addEventListener("pointerdown", handleOutsideClick);
    document.addEventListener("keydown", handleKeyboard);

    return () => {
      document.removeEventListener("pointerdown", handleOutsideClick);
      document.removeEventListener("keydown", handleKeyboard);
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen && dropdownRef.current?.contains(document.activeElement)) {
      triggerRef.current?.focus();
    }
  }, [isOpen]);

  function handleLanguageChange(value: Language) {
    if (value === language) {
      setIsOpen(false);
      return;
    }

    setLanguage(value);
    setIsOpen(false);
    triggerRef.current?.focus();
  }

  function toggleDropdown() {
    setIsOpen((previous) => !previous);
  }

  return (
    <div ref={containerRef} className="relative inline-flex min-w-0 shrink-0">
      {/* Language selector button */}
      <button
        ref={triggerRef}
        type="button"
        disabled={!mounted}
        onClick={toggleDropdown}
        aria-label={`Select language. Current language: ${selectedLanguage.label}`}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        className="
          flex size-10 shrink-0 items-center justify-center gap-2
          rounded-full border border-border
          bg-card px-2 text-sm font-medium text-foreground
          shadow-sm transition-all duration-200
          hover:border-emerald-500/50 hover:bg-muted
          focus-visible:outline-none focus-visible:ring-2
          focus-visible:ring-emerald-500/30
          active:scale-[0.98]
          disabled:cursor-wait disabled:opacity-70
          sm:w-auto sm:px-3
        "
      >
        <motion.span
          animate={{
            rotate: isOpen ? 15 : 0,
            scale: isOpen ? 1.08 : 1,
          }}
          transition={{
            duration: 0.25,
            ease: "easeInOut",
          }}
          className="flex shrink-0 items-center"
        >
          <Globe
            size={16}
            aria-hidden="true"
            className="text-emerald-600 dark:text-emerald-400"
          />
        </motion.span>

        <span className="hidden max-w-20 truncate sm:inline">
          {selectedLanguage.label}
        </span>

        <ChevronDown
          size={15}
          aria-hidden="true"
          className={`hidden shrink-0 text-muted-foreground transition-transform duration-200 sm:block ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Animated dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={dropdownRef}
            key="language-dropdown"
            role="presentation"
            initial={{
              opacity: 0,
              y: -8,
              scale: 0.94,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: -8,
              scale: 0.94,
            }}
            transition={{
              duration: 0.2,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="
              absolute right-0 top-full z-[100] mt-2
              w-48 origin-top-right overflow-hidden
              rounded-2xl border border-border
              bg-popover p-1.5 text-popover-foreground
              shadow-xl shadow-black/10
            "
          >
            <p className="px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              Choose language
            </p>

            <div role="listbox" aria-label="Available languages">
              {languages.map((item, index) => {
                const selected = language === item.value;

                return (
                  <motion.button
                    key={item.value}
                    type="button"
                    role="option"
                    aria-selected={selected}
                    tabIndex={0}
                    disabled={!mounted}
                    onClick={() => handleLanguageChange(item.value)}
                    initial={{
                      opacity: 0,
                      x: 8,
                    }}
                    animate={{
                      opacity: 1,
                      x: 0,
                    }}
                    transition={{
                      duration: 0.18,
                      delay: index * 0.04,
                    }}
                    className={`
                      flex w-full items-center justify-between
                      gap-3 rounded-xl px-3 py-2.5
                      text-left text-sm
                      transition-colors duration-150
                      focus-visible:outline-none focus-visible:ring-2
                      focus-visible:ring-inset focus-visible:ring-emerald-500/40
                      disabled:cursor-wait
                      ${
                        selected
                          ? "bg-emerald-500/10 font-semibold text-emerald-700 dark:text-emerald-300"
                          : "text-foreground hover:bg-muted"
                      }
                    `}
                  >
                    <span>{item.label}</span>

                    <AnimatePresence mode="wait">
                      {selected && (
                        <motion.span
                          key="selected-check"
                          initial={{
                            opacity: 0,
                            scale: 0.5,
                            rotate: -45,
                          }}
                          animate={{
                            opacity: 1,
                            scale: 1,
                            rotate: 0,
                          }}
                          exit={{
                            opacity: 0,
                            scale: 0.5,
                            rotate: 45,
                          }}
                          transition={{
                            duration: 0.2,
                          }}
                          className="flex size-5 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-white dark:bg-emerald-500"
                        >
                          <Check
                            size={12}
                            strokeWidth={2.5}
                            aria-hidden="true"
                          />
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </motion.button>
                );
              })}
            </div>

            <div className="mt-1 border-t border-border px-3 py-2">
              <p className="text-[10px] text-muted-foreground">
                Select your preferred language
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
