"use client";

import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";

import ThemeToggle from "@/components/common/ThemeToggle";
import LanguageSwitcher from "@/components/common/LanguageSwitcher";

type AppHeaderProps = {
  mobileOpen: boolean;
  onMenuClick: () => void;
};

export default function AppHeader({ mobileOpen, onMenuClick }: AppHeaderProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur-xl">
      <div className="flex h-16 w-full items-center gap-3 px-3 sm:h-[72px] sm:px-5 lg:px-6">
        {/* Brand on the left */}
        <Link
          href="/dashboard"
          aria-label="NEXORA Sales Management home"
          className="flex min-w-0 shrink-0 items-center gap-2.5"
        >
          <div className="relative size-9 shrink-0 sm:size-11">
            <Image
              src="/images/Glossy Emerald and Gold Ribbon N Logo.png"
              alt="NEXORA logo"
              fill
              priority
              sizes="44px"
              className="object-contain"
            />
          </div>

          <div className="min-w-0">
            <span className="nexora-shine block text-base font-extrabold leading-tight tracking-[0.06em] sm:text-xl sm:tracking-[0.1em]">
              NEXORA
            </span>
            <span className="mt-0.5 block whitespace-nowrap text-[8px] font-bold uppercase tracking-[0.13em] text-muted-foreground sm:text-[9px]">
              Sales Management
            </span>
          </div>
        </Link>

        {/* Controls aligned to the right */}
        <div className="ml-auto flex shrink-0 items-center gap-2 sm:gap-2.5">
          <LanguageSwitcher />
          <ThemeToggle />
          {/* Menu immediately after the brand */}
          <button
            type="button"
            onClick={onMenuClick}
            aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={mobileOpen}
            aria-controls="app-sidebar"
            className="ml-1 flex size-9 shrink-0 items-center justify-center rounded-full border border-border bg-card text-foreground shadow-sm transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/40 sm:size-10 lg:hidden"
          >
            {mobileOpen ? <X size={19} /> : <Menu size={19} />}
          </button>
        </div>
      </div>
    </header>
  );
}
