"use client";

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

  return (
    <div className="relative min-w-0">
      <label
        className="
          group flex h-10 min-w-0 items-center gap-2
          rounded-xl border border-border
          bg-card px-3
          text-sm text-foreground
          shadow-sm transition-colors
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

        <span className="sr-only">Select language</span>

        <select
          value={mounted ? language : "en"}
          onChange={(event) => setLanguage(event.target.value as Language)}
          aria-label="Select language"
          disabled={!mounted}
          className="
            h-full min-w-0 flex-1 cursor-pointer
            appearance-none bg-transparent
            pr-4 text-sm font-medium text-foreground
            outline-none
            disabled:cursor-wait disabled:opacity-70
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
          className="pointer-events-none shrink-0 text-muted-foreground transition-transform group-hover:text-foreground"
        />
      </label>
    </div>
  );
}
