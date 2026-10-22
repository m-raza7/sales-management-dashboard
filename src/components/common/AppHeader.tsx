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
      <div className="flex h-14 w-full min-w-0 items-center gap-2 px-2.5 min-[400px]:gap-2.5 min-[400px]:px-3 sm:h-[68px] sm:gap-3 sm:px-5 lg:px-6">
        <button
          type="button"
          onClick={onMenuClick}
          aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={mobileOpen}
          aria-controls="app-sidebar"
          className="flex size-9 shrink-0 items-center justify-center rounded-full border border-border bg-card text-foreground transition-colors hover:bg-muted sm:size-10 lg:hidden"
        >
          {mobileOpen ? <X size={19} /> : <Menu size={19} />}
        </button>

        <Link
          href="/dashboard"
          aria-label="NEXORA Sales Management home"
          className="flex min-w-0 flex-1 items-center gap-2 sm:flex-none sm:gap-2.5 lg:w-[220px]"
        >
          <div className="relative hidden size-8 shrink-0 min-[400px]:block sm:size-10">
            <Image
              src="/images/Glossy Emerald and Gold Ribbon N Logo.png"
              alt=""
              fill
              priority
              sizes="40px"
              className="rounded-lg object-contain"
            />
          </div>

          <div className="min-w-0 leading-none max-[400px]:mt-[6px]">
            <span className="nexora-shine block truncate text-base font-extrabold leading-none tracking-[0.06em] min-[376px]:text-sm min-[376px]:tracking-[0.08em] sm:text-xl sm:tracking-[0.12em]">
              NEXORA
            </span>

            <span className="mt-0 hidden truncate text-[9px] font-semibold uppercase leading-none tracking-[0.16em] text-muted-foreground min-[400px]:block">
              Sales Management
            </span>
          </div>
        </Link>

        <div className="ml-auto flex shrink-0 items-center gap-1 min-[400px]:gap-1.5 sm:gap-2">
          <LanguageSwitcher />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
