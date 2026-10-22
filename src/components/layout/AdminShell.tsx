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
  Menu,
  Search,
  X,
  ArrowRight,
  LayoutDashboard,
  Users,
  Package,
  ShoppingCart,
  Settings2,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

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
  const { t } = useLanguage();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  const searchContainerRef = useRef<HTMLDivElement>(null);
  const mobileSettingsRef = useRef<HTMLDetailsElement>(null);
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

  const closeSettings = useCallback(() => {
    setSettingsOpen(false);
    setSearchOpen(false);
  }, []);

  const closeSearch = useCallback(() => {
    setSearchOpen(false);
  }, []);

  const focusSearch = useCallback(() => {
    const isMobile = window.matchMedia("(max-width: 767px)").matches;

    if (isMobile) {
      setSettingsOpen(true);
    }

    setSearchOpen(true);

    window.requestAnimationFrame(() => {
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
      setSettingsOpen(false);
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
    // Keep the native details element synchronized with React state.
    if (mobileSettingsRef.current) {
      mobileSettingsRef.current.open = settingsOpen;
    }
  }, [settingsOpen]);

  useEffect(() => {
    function handleOutsideClick(event: PointerEvent) {
      const target = event.target;

      if (!(target instanceof Node)) {
        return;
      }

      const insideMobileSettings =
        mobileSettingsRef.current?.contains(target) ?? false;

      const insideDesktopSearch =
        searchContainerRef.current?.contains(target) ?? false;

      if (!insideMobileSettings) {
        setSettingsOpen(false);
      }

      if (!insideDesktopSearch && !insideMobileSettings) {
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
        closeSettings();
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
  }, [closeSettings, focusSearch]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Sidebar mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} />

      <div className="min-h-screen min-w-0 lg:pl-[272px]">
        <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur-xl">
          <div className="flex h-14 w-full min-w-0 items-center gap-2 px-2.5 min-[400px]:gap-2.5 min-[400px]:px-3 sm:h-[68px] sm:gap-3 sm:px-5 lg:px-6">
            {/* Mobile and tablet menu */}
            <button
              type="button"
              onClick={() => setMobileOpen((previous) => !previous)}
              aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
              aria-expanded={mobileOpen}
              aria-controls="app-sidebar"
              className="flex size-9 shrink-0 items-center justify-center rounded-full border border-border bg-card text-foreground transition-colors hover:bg-muted sm:size-10 lg:hidden"
            >
              {mobileOpen ? <X size={19} /> : <Menu size={19} />}
            </button>

            {/* Responsive Nexora branding */}

            <Link
              href="/dashboard"
              aria-label="Nexora Sales Management home"
              className="flex min-w-0 flex-1 items-center gap-2 sm:flex-none sm:gap-2.5 lg:w-[220px]"
            >
              {/* Logo: hidden on narrow mobile screens */}
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

              {/* Brand text */}
              <div className="min-w-0 leading-tight max-[400px]:mt-[6px]">
                <p className="nexora-shine truncate text-base font-extrabold tracking-[0.06em] min-[376px]:text-sm min-[376px]:tracking-[0.08em] sm:text-base sm:tracking-[0.12em]">
                  NEXORA
                </p>

                {/* Subtitle: hidden on narrow mobile screens */}
                <p className="hidden truncate text-[9px] font-semibold uppercase tracking-[0.16em] text-muted-foreground min-[400px]:block">
                  Sales Management
                </p>
              </div>
            </Link>

            {/* Language and theme controls */}
            <div className="ml-auto flex shrink-0 items-center gap-1 min-[400px]:gap-1.5 sm:gap-2">
              <LanguageSwitcher />
              <ThemeToggle />
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="mx-auto w-full max-w-[1600px] p-4 sm:p-6 lg:p-8">
          {children}

          <footer className="mt-10 border-t border-border py-5 text-center text-xs text-muted-foreground">
            © {new Date().getFullYear()} {t("brand")} · {t("footerTagline")}
          </footer>
        </main>
      </div>
    </div>
  );
}
