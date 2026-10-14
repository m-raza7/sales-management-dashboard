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
      {mobileOpen && (
        <button
          type="button"
          aria-label="Close navigation menu"
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-[272px] flex-col border-r border-white/10 bg-[#073B32] text-white transition-transform duration-300 lg:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-[76px] items-center justify-between border-b border-white/10 px-5">
          <Link
            href="/dashboard"
            onClick={onClose}
            className="flex min-w-0 items-center gap-3"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#D8B66A] text-[#073B32] shadow-lg shadow-black/10">
              <Leaf size={22} />
            </span>

            <span className="min-w-0">
              <span className="block truncate text-base font-bold tracking-tight">
                {t("brand")}
              </span>
              <span className="mt-0.5 block text-[10px] font-semibold tracking-[0.2em] text-[#D8B66A]">
                MANAGEMENT
              </span>
            </span>
          </Link>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="rounded-lg p-2 text-white/70 hover:bg-white/10 lg:hidden"
          >
            <X size={19} />
          </button>
        </div>

        <div className="px-5 pb-2 pt-7">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#D8B66A]/90">
            {t("workspace")}
          </p>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-3">
          {links.map(({ href, key, icon: Icon }) => {
            const active = pathname === href || pathname.startsWith(`${href}/`);

            return (
              <Link
                key={href}
                href={href}
                onClick={onClose}
                aria-current={active ? "page" : undefined}
                className={`group relative flex min-h-11 items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition ${
                  active
                    ? "bg-white text-[#073B32] shadow-md shadow-black/10"
                    : "text-white/75 hover:bg-white/10 hover:text-white"
                }`}
              >
                {active && (
                  <span className="absolute bottom-2 left-0 top-2 w-1 rounded-r-full bg-[#D8B66A]" />
                )}
                <Icon
                  size={19}
                  className={
                    active
                      ? "shrink-0 text-[#073B32]"
                      : "shrink-0 text-white/70 group-hover:text-[#D8B66A]"
                  }
                />
                <span>{t(key)}</span>
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-white/10 p-4">
          <Link
            href="/orders/new"
            onClick={onClose}
            className="flex items-center justify-center gap-2 rounded-xl bg-[#D8B66A] px-4 py-3 text-sm font-bold text-[#073B32] transition hover:bg-[#E6CB8C] focus-visible:outline-white"
          >
            <PlusCircle size={18} />
            {t("newOrder")}
          </Link>

          <p className="mt-4 text-center text-[10px] text-white/40">
            SALES WORKSPACE · LOCAL EDITION
          </p>
        </div>
      </aside>
    </>
  );
}
