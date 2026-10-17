"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Package,
  ShoppingCart,
  PlusCircle,
  Leaf,
  Orbit,
  X,
} from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";

const links = [
  { href: "/dashboard", key: "dashboard" as const, icon: LayoutDashboard },
  { href: "/customers", key: "customers" as const, icon: Users },
  { href: "/products", key: "products" as const, icon: Package },
  { href: "/orders", key: "orders" as const, icon: ShoppingCart },
];

type SidebarProps = {
  mobileOpen?: boolean;
  onClose?: () => void;
};

export default function Sidebar({ mobileOpen = false, onClose }: SidebarProps) {
  const pathname = usePathname();
  const { t } = useLanguage();

  return (
    <>
      {/* Mobile backdrop */}
      {mobileOpen && (
        <button
          type="button"
          aria-label="Close navigation menu"
          onClick={onClose}
          className="fixed inset-0 z-40 cursor-default bg-black/50 backdrop-blur-[2px] lg:hidden"
        />
      )}

      <aside
        id="app-sidebar"
        aria-label="Main navigation"
        className={`fixed inset-y-0 left-0 z-50 flex w-[min(272px,85vw)] flex-col border-r border-white/10 bg-[#073B32] text-white shadow-2xl shadow-black/10 transition-transform duration-300 ease-in-out lg:translate-x-0 lg:shadow-none ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Brand */}
        <div className="flex h-[76px] shrink-0 items-center justify-between border-b border-white/10 px-5">
          <Link
            href="/dashboard"
            onClick={onClose}
            className="flex min-w-0 items-center gap-3 rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-[#D8B66A]"
          >
            <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#D8B66A] text-[#073B32] shadow-sm">
              <Leaf size={21} strokeWidth={2.2} />
              {/* <Orbit size={23} strokeWidth={2} /> */}
            </span>

            <span className="min-w-0">
              <span className="block truncate text-base font-bold tracking-tight">
                {t("brand")}
              </span>
              <span className="mt-0.5 block text-[10px] font-semibold uppercase tracking-[0.2em] text-[#D8B66A]">
                Management
              </span>
            </span>
          </Link>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close navigation menu"
            className="flex size-9 shrink-0 items-center justify-center rounded-lg text-white/70 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D8B66A] lg:hidden"
          >
            <X size={19} />
          </button>
        </div>

        {/* Section label */}
        <div className="shrink-0 px-5 pb-2 pt-7">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#D8B66A]/90">
            {t("workspace")}
          </p>
        </div>

        {/* Navigation links */}
        <nav className="min-h-0 flex-1 space-y-1 overflow-y-auto overscroll-contain px-3 py-3">
          {links.map(({ href, key, icon: Icon }) => {
            const active = pathname === href || pathname.startsWith(`${href}/`);

            return (
              <Link
                key={href}
                href={href}
                onClick={onClose}
                aria-current={active ? "page" : undefined}
                className={`group relative flex min-h-11 items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D8B66A] ${
                  active
                    ? "bg-white text-[#073B32] shadow-sm"
                    : "text-white/75 hover:bg-white/[0.08] hover:text-white"
                }`}
              >
                {active && (
                  <span className="absolute bottom-2 left-0 top-2 w-1 rounded-r-full bg-[#D8B66A]" />
                )}

                <Icon
                  size={19}
                  strokeWidth={active ? 2.2 : 1.8}
                  className={`shrink-0 transition-colors ${
                    active
                      ? "text-[#073B32]"
                      : "text-white/65 group-hover:text-[#D8B66A]"
                  }`}
                />

                <span className="truncate">{t(key)}</span>
              </Link>
            );
          })}
        </nav>

        {/* Primary action and footer */}
        <div className="shrink-0 border-t border-white/10 p-4">
          <Link
            href="/orders/new"
            onClick={onClose}
            className="flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#D8B66A] px-4 py-3 text-sm font-bold text-[#073B32] transition-colors hover:bg-[#E6CB8C] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#073B32] active:scale-[0.99]"
          >
            <PlusCircle size={18} strokeWidth={2} />
            <span>{t("newOrder")}</span>
          </Link>

          <p className="mt-4 text-center text-[9px] font-medium uppercase tracking-wide text-white/40">
            Sales Workspace · Local Edition
          </p>
        </div>
      </aside>
    </>
  );
}
