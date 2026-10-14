"use client";

import {
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import {
  Menu,
  Search,
  Sparkles,
  X,
  ArrowRight,
  LayoutDashboard,
  Users,
  Package,
  ShoppingCart,
} from "lucide-react";

import Sidebar from "./Sidebar";
import ThemeToggle from "@/components/common/ThemeToggle";
import LanguageSwitcher from "@/components/common/LanguageSwitcher";
import { useLanguage } from "@/components/providers/LanguageProvider";

type SearchItem = {
  label: string;
  description: string;
  href: string;
  icon: typeof LayoutDashboard;
  keywords: string[];
};

const searchItems: SearchItem[] = [
  {
    label: "Dashboard",
    description: "Business overview and summary",
    href: "/dashboard",
    icon: LayoutDashboard,
    keywords: ["home", "overview", "stats", "summary"],
  },
  {
    label: "Customers",
    description: "View and manage shops",
    href: "/customers",
    icon: Users,
    keywords: ["shops", "shopkeepers", "clients", "customer list"],
  },
  {
    label: "Add customer",
    description: "Register a new shop",
    href: "/customers/new",
    icon: Users,
    keywords: ["create customer", "new shop", "add shop"],
  },
  {
    label: "Products",
    description: "Manage your product catalogue",
    href: "/products",
    icon: Package,
    keywords: ["catalogue", "inventory", "items", "goods"],
  },
  {
    label: "Add product",
    description: "Create a product",
    href: "/products/new",
    icon: Package,
    keywords: ["new product", "create product"],
  },
  {
    label: "Orders",
    description: "View and manage orders",
    href: "/orders",
    icon: ShoppingCart,
    keywords: ["sales", "order history", "pending orders"],
  },
  {
    label: "New order",
    description: "Create an order for a shop",
    href: "/orders/new",
    icon: ShoppingCart,
    keywords: ["create order", "place order", "sales order"],
  },
];

export default function AdminShell({ children }: { children: ReactNode }) {
  const router = useRouter();
  const { t } = useLanguage();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);

  const searchContainerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const filteredResults = searchItems.filter((item) => {
    const query = search.trim().toLowerCase();

    if (!query) return true;

    return [item.label, item.description, ...item.keywords].some((value) =>
      value.toLowerCase().includes(query),
    );
  });

  function navigateTo(href: string) {
    setSearchOpen(false);
    setSearch("");
    setMobileOpen(false);
    router.push(href);
  }

  function handleSearchSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (filteredResults.length > 0) {
      navigateTo(filteredResults[0].href);
    }
  }

  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setSearchOpen(false);
      }
    }

    function handleKeyboard(event: KeyboardEvent) {
      const target = event.target as HTMLElement | null;
      const isTyping =
        target?.tagName === "INPUT" ||
        target?.tagName === "TEXTAREA" ||
        target?.isContentEditable;

      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setSearchOpen(true);
        searchInputRef.current?.focus();
      }

      if (event.key === "/" && !isTyping) {
        event.preventDefault();
        setSearchOpen(true);
        searchInputRef.current?.focus();
      }

      if (event.key === "Escape") {
        setSearchOpen(false);
        searchInputRef.current?.blur();
      }
    }

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("keydown", handleKeyboard);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleKeyboard);
    };
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Sidebar mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} />

      <div className="min-h-screen min-w-0 lg:pl-[272px]">
        <header className="sticky top-0 z-30 border-b border-border bg-background/90 backdrop-blur-xl">
          <div className="flex min-h-[76px] items-center gap-2 px-3 py-3 sm:gap-3 sm:px-6 lg:px-8">
            {/* Mobile menu */}
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-label="Open navigation menu"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-border bg-card transition hover:bg-muted lg:hidden"
            >
              <Menu size={20} />
            </button>

            {/* Header title */}
            <div className="min-w-0 flex-1">
              <div className="hidden items-center gap-2 text-xs text-muted-foreground sm:flex">
                <Sparkles size={14} className="text-[#B18A37]" />
                <span>YOUR BUSINESS, BEAUTIFULLY ORGANIZED</span>
              </div>

              <div className="mt-1 text-sm font-semibold sm:text-base">
                <span className="truncate">{t("workspace")}</span>
              </div>
            </div>

            {/* Search */}
            <div ref={searchContainerRef} className="relative shrink-0">
              <form
                onSubmit={handleSearchSubmit}
                role="search"
                className={`flex h-10 items-center gap-2 rounded-xl border border-border bg-card px-3 text-card-foreground shadow-sm transition-all duration-200 focus-within:border-ring focus-within:ring-2 focus-within:ring-ring/20 ${
                  searchOpen
                    ? "fixed left-3 right-3 top-[82px] z-50 sm:absolute sm:left-auto sm:right-0 sm:top-12 sm:w-80"
                    : "w-10 justify-center md:w-64 lg:w-72"
                }`}
              >
                <button
                  type="button"
                  aria-label="Open search"
                  onClick={() => {
                    setSearchOpen(true);
                    requestAnimationFrame(() => {
                      searchInputRef.current?.focus();
                    });
                  }}
                  className="shrink-0 text-muted-foreground transition hover:text-primary"
                >
                  <Search size={17} aria-hidden="true" />
                </button>

                <input
                  ref={searchInputRef}
                  value={search}
                  onChange={(event) => {
                    setSearch(event.target.value);
                    setSearchOpen(true);
                  }}
                  onFocus={() => setSearchOpen(true)}
                  placeholder={t("search")}
                  aria-label="Search pages"
                  aria-expanded={searchOpen}
                  aria-controls="admin-search-results"
                  className={`min-w-0 flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground ${
                    searchOpen ? "block" : "hidden md:block"
                  }`}
                />

                {searchOpen && search.length > 0 && (
                  <button
                    type="button"
                    aria-label="Clear search"
                    onClick={() => {
                      setSearch("");
                      searchInputRef.current?.focus();
                    }}
                    className="shrink-0 rounded-md p-1 text-muted-foreground transition hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <X size={15} aria-hidden="true" />
                  </button>
                )}

                {!searchOpen && (
                  <kbd className="hidden shrink-0 rounded-md border border-border bg-background px-1.5 py-0.5 text-[10px] text-muted-foreground lg:block">
                    Ctrl K
                  </kbd>
                )}
              </form>

              {/* Search results */}
              {searchOpen && (
                <div
                  id="admin-search-results"
                  className="fixed left-3 right-3 top-[130px] z-50 max-h-[65vh] overflow-y-auto overscroll-contain rounded-xl border border-border bg-popover p-2 text-popover-foreground shadow-xl sm:absolute sm:left-auto sm:right-0 sm:top-[52px] sm:w-80"
                >
                  <p className="px-3 py-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                    {search.trim() ? "Search results" : "Quick navigation"}
                  </p>

                  {filteredResults.length === 0 ? (
                    <div className="px-3 py-6 text-center">
                      <Search
                        size={22}
                        aria-hidden="true"
                        className="mx-auto text-muted-foreground"
                      />

                      <p className="mt-2 text-sm font-medium text-popover-foreground">
                        No results found
                      </p>

                      <p className="mt-1 text-xs leading-5 text-muted-foreground">
                        Try customers, products, or orders.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-1">
                      {filteredResults.map((item) => {
                        const Icon = item.icon;

                        return (
                          <button
                            key={item.href}
                            type="button"
                            onClick={() => navigateTo(item.href)}
                            className="flex w-full min-w-0 items-center gap-3 rounded-lg px-3 py-3 text-left transition-colors hover:bg-muted focus-visible:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                          >
                            <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                              <Icon size={17} aria-hidden="true" />
                            </span>

                            <span className="min-w-0 flex-1">
                              <span className="block truncate text-sm font-medium text-popover-foreground">
                                {item.label}
                              </span>

                              <span className="mt-0.5 block truncate text-xs text-muted-foreground">
                                {item.description}
                              </span>
                            </span>

                            <ArrowRight
                              size={15}
                              aria-hidden="true"
                              className="shrink-0 text-muted-foreground"
                            />
                          </button>
                        );
                      })}
                    </div>
                  )}

                  <div className="mt-2 flex items-center justify-between border-t border-border px-3 py-2 text-[10px] text-muted-foreground">
                    <span>Navigate to a page</span>
                    <span>Press Esc to close</span>
                  </div>
                </div>
              )}
            </div>
            {/* Language and theme controls */}
            <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
              <LanguageSwitcher />
              <ThemeToggle />
            </div>
          </div>
        </header>

        <main className="mx-auto w-full max-w-[1600px] p-4 sm:p-6 lg:p-8">
          {children}

          <footer className="mt-10 border-t border-border py-5 text-center text-xs text-muted-foreground">
            © {new Date().getFullYear()} {t("brand")} · Made for better
            business.
          </footer>
        </main>
      </div>
    </div>
  );
}
