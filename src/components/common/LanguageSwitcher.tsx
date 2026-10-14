"use client";

import { useEffect, useId, useRef } from "react";
import { Globe, ChevronDown } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import type { Language } from "@/lib/i18n/translations";

const languages: { value: Language; label: string }[] = [
  { value: "en", label: "English" },
  { value: "mr", label: "मराठी" },
  { value: "hi", label: "हिन्दी" },
];

export default function LanguageSwitcher() {
  const { language, setLanguage, mounted } = useLanguage();

  const selectId = useId();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleOutsideClick(event: PointerEvent) {
      const container = containerRef.current;

      if (!container || container.contains(event.target as Node)) {
        return;
      }

      // Close the parent mobile settings panel, if present.
      const parentDetails = container.closest("details[open]");

      if (parentDetails) {
        parentDetails.removeAttribute("open");
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key !== "Escape") return;

      const container = containerRef.current;
      const parentDetails = container?.closest("details[open]");

      parentDetails?.removeAttribute("open");
    }

    document.addEventListener("pointerdown", handleOutsideClick);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("pointerdown", handleOutsideClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  function handleLanguageChange(nextLanguage: Language) {
    setLanguage(nextLanguage);

    // Close only the surrounding mobile settings panel.
    // Desktop language selectors remain unaffected.
    const container = containerRef.current;
    const parentDetails = container?.closest("details[open]");

    if (parentDetails) {
      parentDetails.removeAttribute("open");
    }
  }

  return (
    <div
      ref={containerRef}
      className="relative inline-flex min-w-0 max-w-full items-center"
    >
      <div
        className="
          group flex h-10 min-w-0 max-w-full items-center gap-2
          rounded-xl border border-border bg-card px-3
          text-foreground shadow-sm transition-colors
          hover:border-ring/60 hover:bg-muted
          focus-within:border-ring
          focus-within:ring-2 focus-within:ring-ring/20
        "
      >
        <Globe
          size={17}
          aria-hidden="true"
          className="shrink-0 text-muted-foreground transition-colors group-hover:text-primary"
        />

        <label className="sr-only" htmlFor={selectId}>
          Select language
        </label>

        <select
          id={selectId}
          value={mounted ? language : "en"}
          disabled={!mounted}
          onChange={(event) =>
            handleLanguageChange(event.target.value as Language)
          }
          aria-label="Select language"
          className="
            h-full min-w-0 max-w-full flex-1 cursor-pointer
            appearance-none bg-transparent pr-4
            text-sm font-medium text-foreground
            outline-none disabled:cursor-wait
            disabled:opacity-70
            dark:[color-scheme:dark]
          "
        >
          {languages.map((item) => (
            <option
              key={item.value}
              value={item.value}
              className="bg-background text-foreground"
            >
              {item.label}
            </option>
          ))}
        </select>

        <ChevronDown
          size={14}
          aria-hidden="true"
          className="pointer-events-none shrink-0 text-muted-foreground transition-colors group-hover:text-foreground"
        />
      </div>
    </div>
  );
}
