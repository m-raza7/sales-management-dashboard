"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  X,
  ArrowRight,
  LayoutDashboard,
  Users,
  Package,
  ShoppingCart,
} from "lucide-react";

import Sidebar from "./Sidebar";
import AppHeader from "@/components/common/AppHeader";
import AppFooter from "@/components/common/AppFooter";

type SearchItem = {
  label: string;
  description: string;
  href: string;
  icon: typeof LayoutDashboard;
  keywords: string[];
};

type SearchResultsProps = {
  results: SearchItem[];
  onNavigate: (href: string) => void;
  onClose: () => void;
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
  {
    label: "Legal & Security",
    description: "Privacy, terms, copyright, and security policies",
    href: "/legal",
    icon: LayoutDashboard,
    keywords: ["privacy", "terms", "copyright", "security", "policies"],
  },
];

function SearchResults({ results, onNavigate, onClose }: SearchResultsProps) {
  return (
    <div className="absolute left-0 right-0 top-full z-[60] mt-2 overflow-hidden rounded-2xl border border-border bg-popover text-popover-foreground shadow-xl">
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Search results
        </p>

        <button
          type="button"
          onClick={onClose}
          aria-label="Close search results"
          className="rounded-md p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
        >
          <X size={15} />
        </button>
      </div>

      <div className="max-h-80 overflow-y-auto p-2">
        {results.length > 0 ? (
          results.map((item) => {
            const Icon = item.icon;

            return (
              <button
                key={item.href}
                type="button"
                onClick={() => onNavigate(item.href)}
                className="flex w-full items-center gap-3 rounded-xl p-3 text-left transition hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Icon size={18} />
                </span>

                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-semibold">
                    {item.label}
                  </span>
                  <span className="mt-1 block truncate text-xs text-muted-foreground">
                    {item.description}
                  </span>
                </span>

                <ArrowRight
                  size={16}
                  className="shrink-0 text-muted-foreground"
                />
              </button>
            );
          })
        ) : (
          <p className="px-3 py-8 text-center text-sm text-muted-foreground">
            No results found
          </p>
        )}
      </div>

      <div className="border-t border-border px-4 py-2 text-xs text-muted-foreground">
        Press Enter to open the first result
      </div>
    </div>
  );
}

export default function AdminShell({ children }: { children: ReactNode }) {
  const router = useRouter();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);

  const searchContainerRef = useRef<HTMLDivElement>(null);
  const desktopSearchInputRef = useRef<HTMLInputElement>(null);
  const mobileSearchInputRef = useRef<HTMLInputElement>(null);

  const query = search.trim().toLowerCase();

  const filteredResults = useMemo(
    () =>
      searchItems.filter((item) =>
        [item.label, item.description, ...item.keywords].some((value) =>
          value.toLowerCase().includes(query),
        ),
      ),
    [query],
  );

  const closeSearch = useCallback(() => {
    setSearchOpen(false);
  }, []);

  const focusSearch = useCallback(() => {
    setSearchOpen(true);

    window.requestAnimationFrame(() => {
      const isMobile = window.matchMedia("(max-width: 767px)").matches;

      if (isMobile) {
        mobileSearchInputRef.current?.focus();
      } else {
        desktopSearchInputRef.current?.focus();
      }
    });
  }, []);

  const navigateTo = useCallback(
    (href: string) => {
      setSearchOpen(false);
      setSearch("");
      setMobileOpen(false);
      router.push(href);
    },
    [router],
  );

  const handleSearchSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      if (filteredResults.length > 0) {
        navigateTo(filteredResults[0].href);
      }
    },
    [filteredResults, navigateTo],
  );

  useEffect(() => {
    function handleOutsideClick(event: PointerEvent) {
      const target = event.target;

      if (!(target instanceof Node)) return;

      if (!searchContainerRef.current?.contains(target)) {
        setSearchOpen(false);
      }
    }

    function handleKeyboard(event: KeyboardEvent) {
      const target = event.target;

      const isTyping =
        target instanceof HTMLInputElement ||
        target instanceof HTMLTextAreaElement ||
        target instanceof HTMLSelectElement ||
        (target instanceof HTMLElement && target.isContentEditable);

      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        focusSearch();
        return;
      }

      if (event.key === "/" && !isTyping) {
        event.preventDefault();
        focusSearch();
        return;
      }

      if (event.key === "Escape") {
        closeSearch();
        desktopSearchInputRef.current?.blur();
        mobileSearchInputRef.current?.blur();
        setMobileOpen(false);
      }
    }

    document.addEventListener("pointerdown", handleOutsideClick);
    document.addEventListener("keydown", handleKeyboard);

    return () => {
      document.removeEventListener("pointerdown", handleOutsideClick);
      document.removeEventListener("keydown", handleKeyboard);
    };
  }, [closeSearch, focusSearch]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Sidebar mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} />

      <div className="flex min-h-screen min-w-0 flex-col lg:pl-[272px]">
        <AppHeader
          mobileOpen={mobileOpen}
          onMenuClick={() => setMobileOpen((previous) => !previous)}
        />

        {/* Search bar */}
        <div className="border-border bg-background px-4 py-3 sm:px-6 lg:px-8">
          <div
            ref={searchContainerRef}
            className="relative mx-auto w-full max-w-[1600px]"
          >
            <form
              onSubmit={handleSearchSubmit}
              role="search"
              className="relative"
            >
              <Search
                size={18}
                className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground"
              />

              <input
                ref={desktopSearchInputRef}
                type="search"
                value={search}
                onChange={(event) => {
                  setSearch(event.target.value);
                  setSearchOpen(true);
                }}
                onFocus={() => setSearchOpen(true)}
                placeholder="Search customers, products, orders..."
                aria-label="Search the application"
                aria-expanded={searchOpen}
                className="hidden h-11 w-full rounded-xl border border-border bg-card pl-11 pr-11 text-sm text-foreground outline-none transition placeholder:text-muted-foreground focus:border-emerald-700/50 focus:ring-2 focus:ring-emerald-700/10 md:block md:max-w-xl"
              />

              <input
                ref={mobileSearchInputRef}
                type="search"
                value={search}
                onChange={(event) => {
                  setSearch(event.target.value);
                  setSearchOpen(true);
                }}
                onFocus={() => setSearchOpen(true)}
                placeholder="Search..."
                aria-label="Search the application"
                aria-expanded={searchOpen}
                className="h-10 w-full rounded-xl border border-border bg-card pl-10 pr-10 text-sm text-foreground outline-none transition placeholder:text-muted-foreground focus:border-emerald-700/50 focus:ring-2 focus:ring-emerald-700/10 md:hidden"
              />

              {search && (
                <button
                  type="button"
                  onClick={() => {
                    setSearch("");
                    setSearchOpen(true);
                    focusSearch();
                  }}
                  aria-label="Clear search"
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
                >
                  <X size={16} />
                </button>
              )}

              {!search && (
                <span className="pointer-events-none absolute right-3 top-1/2 hidden -translate-y-1/2 rounded-md border border-border px-2 py-1 text-[10px] text-muted-foreground md:block">
                  Ctrl K
                </span>
              )}
            </form>

            {searchOpen && (
              <SearchResults
                results={filteredResults}
                onNavigate={navigateTo}
                onClose={closeSearch}
              />
            )}
          </div>
        </div>

        {/* Main page content */}
        <main className="mx-auto w-full max-w-[1600px] flex-1 p-4 sm:p-6 lg:p-8">
          {children}
        </main>

        {/* Shared footer */}
        <AppFooter />
      </div>
    </div>
  );
}
