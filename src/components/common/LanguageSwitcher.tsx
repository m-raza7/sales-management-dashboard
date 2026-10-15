"use client";

import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown, Globe } from "lucide-react";

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
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    document.addEventListener("pointerdown", handleOutsideClick);
    document.addEventListener("keydown", handleKeyboard);

    return () => {
      document.removeEventListener("pointerdown", handleOutsideClick);
      document.removeEventListener("keydown", handleKeyboard);
    };
  }, []);

  function handleLanguageChange(value: Language) {
    setLanguage(value);
    setIsOpen(false);
  }

  return (
    <div ref={containerRef} className="relative inline-flex min-w-0 shrink-0">
      {/* Language selector button */}
      <button
        type="button"
        disabled={!mounted}
        onClick={() => setIsOpen((previous) => !previous)}
        aria-label="Select language"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        className="
          flex h-10 min-w-0 items-center gap-2
          rounded-full border border-border
          bg-card px-3 text-sm font-medium text-foreground
          shadow-sm transition-all duration-200
          hover:border-emerald-500/50 hover:bg-muted
          focus-visible:outline-none focus-visible:ring-2
          focus-visible:ring-emerald-500/30
          active:scale-[0.98]
          disabled:cursor-wait disabled:opacity-70
        "
      >
        <Globe
          size={16}
          aria-hidden="true"
          className="shrink-0 text-emerald-600 dark:text-emerald-400"
        />

        <span className="max-w-20 truncate">{selectedLanguage.label}</span>

        <ChevronDown
          size={15}
          aria-hidden="true"
          className={`shrink-0 text-muted-foreground transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Animated dropdown */}
      <div
        className={`
          absolute right-0 top-full z-[100] mt-2
          w-48 origin-top-right overflow-hidden
          rounded-2xl border border-border
          bg-popover p-1.5 text-popover-foreground
          shadow-xl shadow-black/10
          transition-[opacity,transform,visibility]
          duration-200 ease-out
          ${
            isOpen
              ? "visible translate-y-0 scale-100 opacity-100"
              : "invisible -translate-y-2 scale-95 opacity-0"
          }
        `}
        aria-hidden={!isOpen}
      >
        <p className="px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
          Choose language
        </p>

        <div role="listbox" aria-label="Available languages">
          {languages.map((item) => {
            const selected = language === item.value;

            return (
              <button
                key={item.value}
                type="button"
                role="option"
                aria-selected={selected}
                tabIndex={isOpen ? 0 : -1}
                disabled={!mounted}
                onClick={() => handleLanguageChange(item.value)}
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

                {selected && (
                  <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-white dark:bg-emerald-500">
                    <Check size={12} strokeWidth={2.5} />
                  </span>
                )}
              </button>
            );
          })}
        </div>

        <div className="mt-1 border-t border-border px-3 py-2">
          <p className="text-[10px] text-muted-foreground">
            Select your preferred language
          </p>
        </div>
      </div>
    </div>
  );
}
