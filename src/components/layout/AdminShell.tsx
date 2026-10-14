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
  Settings2,
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
        {/* Header */}
        <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur-xl">
          <div className="flex h-[68px] min-w-0 items-center gap-2 px-3 sm:gap-3 sm:px-5 lg:px-6">
            {/* Mobile menu */}
            <button
              type="button"
              onClick={() => setMobileOpen((previous) => !previous)}
              aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
              aria-expanded={mobileOpen}
              className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-border bg-card text-foreground transition hover:bg-muted lg:hidden"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

            {/* Workspace title */}
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-bold text-foreground sm:text-base">
                Sales Workspace
              </p>
              <p className="hidden truncate text-xs text-muted-foreground sm:block">
                Manage your business
              </p>
            </div>

            {/* Desktop/tablet search: keep your existing search component here */}
            <div className="hidden shrink-0 md:block">
              {/* Move your existing searchContainerRef div here.
          Keep the form, input, results, and handlers unchanged. */}
            </div>

            {/* Mobile settings menu */}
            <details className="group relative shrink-0 md:hidden">
              <summary
                aria-label="Open search, language and appearance settings"
                title="Search and settings"
                className="flex size-10 cursor-pointer list-none items-center justify-center rounded-xl border border-border bg-card text-foreground transition hover:bg-muted [&::-webkit-details-marker]:hidden"
              >
                <Settings2 size={19} />
              </summary>

              <div className="absolute right-0 top-12 z-50 w-[min(19rem,calc(100vw-1.5rem))] space-y-4 rounded-2xl border border-border bg-popover p-4 text-popover-foreground shadow-xl">
                {/* Search on mobile */}
                <div className="space-y-2">
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Search pages
                  </p>

                  {/* Use your existing search form and results here.
              Remove its desktop-only wrapper for this copy. */}
                </div>

                <div className="h-px bg-border" />

                {/* Language */}
                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm font-medium">Language</span>
                  <LanguageSwitcher />
                </div>

                <div className="h-px bg-border" />

                {/* Theme */}
                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm font-medium">Appearance</span>
                  <ThemeToggle />
                </div>
              </div>
            </details>

            {/* Desktop/tablet language and theme */}
            <div className="hidden shrink-0 items-center gap-2 md:flex">
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
