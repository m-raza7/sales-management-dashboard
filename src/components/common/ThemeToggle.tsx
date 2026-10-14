"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Laptop, Moon, Sun } from "lucide-react";

type ThemeOption = {
  value: "light" | "dark" | "system";
  label: string;
  icon: typeof Sun;
};

const themeOptions: ThemeOption[] = [
  {
    value: "light",
    label: "Light mode",
    icon: Sun,
  },
  {
    value: "dark",
    label: "Dark mode",
    icon: Moon,
  },
  {
    value: "system",
    label: "System theme",
    icon: Laptop,
  },
];

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const containerClass =
    "inline-flex shrink-0 items-center gap-1 rounded-xl border border-border bg-card p-1 shadow-sm";

  const buttonBaseClass =
    "flex size-8 shrink-0 items-center justify-center rounded-lg transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card active:scale-95 sm:size-9";

  if (!mounted) {
    return (
      <div aria-hidden="true" className={`${containerClass} h-11`}>
        <div className="size-8 animate-pulse rounded-lg bg-muted sm:size-9" />
        <div className="size-8 animate-pulse rounded-lg bg-muted sm:size-9" />
        <div className="size-8 animate-pulse rounded-lg bg-muted sm:size-9" />
      </div>
    );
  }

  return (
    <div role="group" aria-label="Choose appearance" className={containerClass}>
      {themeOptions.map(({ value, label, icon: Icon }) => {
        const active = theme === value;

        return (
          <button
            key={value}
            type="button"
            onClick={() => setTheme(value)}
            aria-label={label}
            aria-pressed={active}
            title={label}
            className={`${buttonBaseClass} ${
              active
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
          >
            <Icon
              size={17}
              strokeWidth={active ? 2.2 : 1.8}
              aria-hidden="true"
              className="transition-transform duration-200"
            />
          </button>
        );
      })}
    </div>
  );
}
