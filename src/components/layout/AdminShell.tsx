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
  Mic,
  MicOff,
} from "lucide-react";

import Sidebar from "./Sidebar";
import AppHeader from "@/components/common/AppHeader";
import AppFooter from "@/components/common/AppFooter";

// Update these import paths if your service files are stored elsewhere.
import { searchCustomers } from "@/features/customers/customer.service";
import { searchProducts } from "@/features/products/product.service";
import { searchOrders } from "@/features/orders/order.service";

// --------------------------------------------------
// Speech recognition types
// --------------------------------------------------

type SpeechRecognitionResultLike = ArrayLike<{
  transcript: string;
}>;

type SpeechRecognitionEventLike = {
  results: ArrayLike<SpeechRecognitionResultLike>;
};

type SpeechRecognitionErrorLike = {
  error: string;
};

type SpeechRecognitionLike = {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  onstart: (() => void) | null;
  onresult: ((event: SpeechRecognitionEventLike) => void) | null;
  onerror: ((event: SpeechRecognitionErrorLike) => void) | null;
  onend: (() => void) | null;
  start: () => void;
  abort: () => void;
};

type SpeechRecognitionConstructor = new () => SpeechRecognitionLike;

type SpeechRecognitionWindow = Window & {
  SpeechRecognition?: SpeechRecognitionConstructor;
  webkitSpeechRecognition?: SpeechRecognitionConstructor;
};

// --------------------------------------------------
// Search item types
// --------------------------------------------------

type SearchItem = {
  key: string;
  label: string;
  description: string;
  href: string;
  icon: typeof LayoutDashboard;
  keywords: string[];
  category: "page" | "customer" | "product" | "order";
};

type SearchResultsProps = {
  results: SearchItem[];
  onNavigate: (href: string) => void;
  onClose: () => void;
};

// --------------------------------------------------
// Navigation search items
// --------------------------------------------------

const searchItems: SearchItem[] = [
  {
    key: "dashboard",
    label: "Dashboard",
    description: "Business overview and summary",
    href: "/dashboard",
    icon: LayoutDashboard,
    keywords: ["home", "overview", "stats", "summary"],
    category: "page",
  },
  {
    key: "customers",
    label: "Customers",
    description: "View and manage customers",
    href: "/customers",
    icon: Users,
    keywords: ["shops", "shopkeepers", "clients", "customer list"],
    category: "page",
  },
  {
    key: "add-customer",
    label: "Add customer",
    description: "Register a new customer",
    href: "/customers/new",
    icon: Users,
    keywords: ["create customer", "new shop", "add shop"],
    category: "page",
  },
  {
    key: "products",
    label: "Products",
    description: "Manage your product catalogue",
    href: "/products",
    icon: Package,
    keywords: ["catalogue", "inventory", "items", "goods"],
    category: "page",
  },
  {
    key: "add-product",
    label: "Add product",
    description: "Create a product",
    href: "/products/new",
    icon: Package,
    keywords: ["new product", "create product"],
    category: "page",
  },
  {
    key: "orders",
    label: "Orders",
    description: "View and manage orders",
    href: "/orders",
    icon: ShoppingCart,
    keywords: ["sales", "order history", "pending orders"],
    category: "page",
  },
  {
    key: "new-order",
    label: "New order",
    description: "Create an order",
    href: "/orders/new",
    icon: ShoppingCart,
    keywords: ["create order", "place order", "sales order"],
    category: "page",
  },
  {
    key: "legal",
    label: "Legal & Security",
    description: "Privacy, terms, and security policies",
    href: "/legal",
    icon: LayoutDashboard,
    keywords: ["privacy", "terms", "copyright", "security", "policies"],
    category: "page",
  },
];

// --------------------------------------------------
// Helpers for dynamic records
// --------------------------------------------------

type SearchRecord = Record<string, unknown>;

function asRecord(value: unknown): SearchRecord {
  if (typeof value === "object" && value !== null) {
    return value as SearchRecord;
  }

  return {};
}

function getField(record: SearchRecord, fields: string[]): string {
  for (const field of fields) {
    const value = record[field];

    if (typeof value === "string" || typeof value === "number") {
      if (String(value).trim()) {
        return String(value);
      }
    }
  }

  return "";
}

function getCustomerLabel(customer: SearchRecord): string {
  return (
    getField(customer, [
      "name",
      "customerName",
      "shopName",
      "companyName",
      "fullName",
    ]) ||
    getField(customer, ["phone", "email", "id"]) ||
    "Unnamed customer"
  );
}

function getProductLabel(product: SearchRecord): string {
  return (
    getField(product, ["name", "productName", "title", "sku"]) ||
    getField(product, ["id"]) ||
    "Unnamed product"
  );
}

function getOrderLabel(order: SearchRecord): string {
  return getField(order, ["orderNumber", "reference", "id"]) || "Order";
}

function getRecordDescription(
  record: SearchRecord,
  fields: string[],
  fallback: string,
): string {
  const value = getField(record, fields);
  return value || fallback;
}

// --------------------------------------------------
// Search results dropdown
// --------------------------------------------------

function SearchResults({ results, onNavigate, onClose }: SearchResultsProps) {
  return (
    <div
      className="absolute left-0 right-0 top-full z-[60] mt-2
      overflow-hidden rounded-2xl border border-border
      bg-popover text-popover-foreground shadow-xl"
    >
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Search results ({results.length})
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

      <div className="max-h-96 overflow-y-auto p-2">
        {results.length > 0 ? (
          results.map((item) => {
            const Icon = item.icon;

            return (
              <button
                key={item.key}
                type="button"
                onClick={() => onNavigate(item.href)}
                className="flex w-full items-center gap-3 rounded-xl p-3
                text-left transition hover:bg-muted
                focus-visible:outline-none focus-visible:ring-2
                focus-visible:ring-ring"
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

                  <span className="mt-1 inline-block rounded-md bg-muted px-2 py-0.5 text-[10px] capitalize text-muted-foreground">
                    {item.category}
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
            No matching pages, customers, products, or orders found.
          </p>
        )}
      </div>

      <div className="border-t border-border px-4 py-2 text-xs text-muted-foreground">
        Press Enter to open the first result.
      </div>
    </div>
  );
}

// --------------------------------------------------
// Admin shell with global text and voice search
// --------------------------------------------------

export default function AdminShell({ children }: { children: ReactNode }) {
  const router = useRouter();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [listening, setListening] = useState(false);
  const [voiceMessage, setVoiceMessage] = useState("");
  const [voiceError, setVoiceError] = useState("");
  const [isMounted, setIsMounted] = useState(false);

  const searchContainerRef = useRef<HTMLDivElement>(null);
  const desktopSearchInputRef = useRef<HTMLInputElement>(null);
  const mobileSearchInputRef = useRef<HTMLInputElement>(null);

  const recognitionRef = useRef<SpeechRecognitionLike | null>(null);

  // Use en-IN for English, hi-IN for Hindi, or mr-IN for Marathi.
  const voiceLanguage = "en-IN";

  const query = search.trim().toLowerCase();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Search navigation pages and live localStorage records.
  // Data services are called only in the browser.
  const filteredResults = useMemo<SearchItem[]>(() => {
    if (!query) {
      return [];
    }

    const pageResults = searchItems.filter((item) =>
      [item.label, item.description, ...item.keywords].some((value) =>
        value.toLowerCase().includes(query),
      ),
    );

    if (!isMounted || typeof window === "undefined") {
      return pageResults;
    }

    const customerResults: SearchItem[] = searchCustomers(query).map(
      (customer) => {
        const record = asRecord(customer);
        const id = getField(record, ["id"]);

        return {
          key: `customer-${id}`,
          label: getCustomerLabel(record),
          description: getRecordDescription(
            record,
            ["phone", "email", "address"],
            "Customer record",
          ),
          href: `/customers/${encodeURIComponent(id)}`,
          icon: Users,
          keywords: [],
          category: "customer",
        };
      },
    );

    const productResults: SearchItem[] = searchProducts(query).map(
      (product) => {
        const record = asRecord(product);
        const id = getField(record, ["id"]);

        return {
          key: `product-${id}`,
          label: getProductLabel(record),
          description: getRecordDescription(
            record,
            ["category", "sku", "price", "description"],
            "Product record",
          ),
          href: `/products/${encodeURIComponent(id)}`,
          icon: Package,
          keywords: [],
          category: "product",
        };
      },
    );

    const orderResults: SearchItem[] = searchOrders(query).map((order) => {
      const record = asRecord(order);
      const id = getField(record, ["id"]);
      const status = getField(record, ["status"]);
      const total = getField(record, [
        "total",
        "totalAmount",
        "grandTotal",
        "amount",
      ]);

      const details = [
        status ? `Status: ${status}` : "",
        total ? `Total: ${total}` : "",
      ].filter(Boolean);

      return {
        key: `order-${id}`,
        label: getOrderLabel(record),
        description: details.join(" · ") || "Order record",
        href: `/orders/${encodeURIComponent(id)}`,
        icon: ShoppingCart,
        keywords: [],
        category: "order",
      };
    });

    return [
      ...pageResults,
      ...customerResults,
      ...productResults,
      ...orderResults,
    ].slice(0, 50);
  }, [query, isMounted]);

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
      setVoiceMessage("");
      setVoiceError("");

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

  // --------------------------------------------------
  // Voice search
  // --------------------------------------------------

  const startVoiceSearch = useCallback(() => {
    if (recognitionRef.current) {
      return;
    }

    setVoiceError("");
    setVoiceMessage("");

    const speechWindow = window as SpeechRecognitionWindow;

    const SpeechRecognitionAPI =
      speechWindow.SpeechRecognition ?? speechWindow.webkitSpeechRecognition;

    if (!SpeechRecognitionAPI) {
      setVoiceError(
        "Voice search is not supported in this browser. Try Chrome and allow microphone access.",
      );
      return;
    }

    const recognition = new SpeechRecognitionAPI();

    recognition.lang = voiceLanguage;
    recognition.continuous = false;
    recognition.interimResults = false;

    recognitionRef.current = recognition;

    recognition.onstart = () => {
      setListening(true);
      setSearchOpen(true);
      setVoiceMessage("Listening... Speak your search.");
    };

    recognition.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map((result) => result[0]?.transcript ?? "")
        .join("")
        .trim();

      if (transcript) {
        setSearch(transcript);
        setSearchOpen(true);
        setVoiceError("");
        setVoiceMessage(`Recognized: "${transcript}"`);
      }
    };

    recognition.onerror = (event) => {
      const messages: Record<string, string> = {
        "not-allowed":
          "Microphone permission denied. Please allow microphone access.",
        "service-not-allowed":
          "The browser's speech recognition service is not allowed.",
        "no-speech": "No speech detected. Please try again.",
        "audio-capture":
          "No microphone was detected. Check your microphone connection.",
        network: "Voice recognition failed because of a network issue.",
        aborted: "Voice recognition was stopped.",
      };

      if (event.error !== "aborted") {
        setVoiceError(
          messages[event.error] ?? `Voice recognition failed: ${event.error}.`,
        );
        setVoiceMessage("");
      }
    };

    recognition.onend = () => {
      setListening(false);
      recognitionRef.current = null;
    };

    try {
      recognition.start();
    } catch {
      recognitionRef.current = null;
      setListening(false);
      setVoiceError("Unable to start voice recognition. Please try again.");
    }
  }, [voiceLanguage]);

  const stopVoiceSearch = useCallback(() => {
    const recognition = recognitionRef.current;

    if (recognition) {
      recognition.abort();
      recognitionRef.current = null;
    }

    setListening(false);
    setVoiceMessage("");
  }, []);

  // Clean up the microphone when the shell unmounts.
  useEffect(() => {
    return () => {
      const recognition = recognitionRef.current;

      if (recognition) {
        recognition.onstart = null;
        recognition.onresult = null;
        recognition.onerror = null;
        recognition.onend = null;

        try {
          recognition.abort();
        } catch {
          // The recognition session may already have ended.
        }

        recognitionRef.current = null;
      }
    };
  }, []);

  // --------------------------------------------------
  // Outside click and keyboard shortcuts
  // --------------------------------------------------

  useEffect(() => {
    function handleOutsideClick(event: PointerEvent) {
      const target = event.target;

      if (!(target instanceof Node)) {
        return;
      }

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

  // --------------------------------------------------
  // Render
  // --------------------------------------------------

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Sidebar mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} />

      <div className="flex min-h-screen min-w-0 flex-col lg:pl-[272px]">
        <AppHeader
          mobileOpen={mobileOpen}
          onMenuClick={() => setMobileOpen((previous) => !previous)}
        />

        <div className="border-b border-border bg-background px-4 py-3 sm:px-6 lg:px-8">
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

              {/* Desktop search */}
              <input
                ref={desktopSearchInputRef}
                type="search"
                value={search}
                onChange={(event) => {
                  setSearch(event.target.value);
                  setSearchOpen(true);
                  setVoiceError("");
                  setVoiceMessage("");
                }}
                onFocus={() => setSearchOpen(true)}
                placeholder="Search customers, products, orders..."
                aria-label="Search the application"
                aria-expanded={searchOpen}
                className="hidden h-11 w-full rounded-xl border border-border bg-card pl-11 pr-28 text-sm text-foreground outline-none transition placeholder:text-muted-foreground focus:border-emerald-700/50 focus:ring-2 focus:ring-emerald-700/10 md:block md:max-w-xl"
              />

              {/* Mobile search */}
              <input
                ref={mobileSearchInputRef}
                type="search"
                value={search}
                onChange={(event) => {
                  setSearch(event.target.value);
                  setSearchOpen(true);
                  setVoiceError("");
                  setVoiceMessage("");
                }}
                onFocus={() => setSearchOpen(true)}
                placeholder="Search customers, products, orders..."
                aria-label="Search the application"
                aria-expanded={searchOpen}
                className="h-10 w-full rounded-xl border border-border bg-card pl-10 pr-24 text-sm text-foreground outline-none transition placeholder:text-muted-foreground focus:border-emerald-700/50 focus:ring-2 focus:ring-emerald-700/10 md:hidden"
              />

              {/* Clear search: desktop */}
              {search && (
                <button
                  type="button"
                  onClick={() => {
                    setSearch("");
                    setVoiceError("");
                    setVoiceMessage("");
                    setSearchOpen(true);
                    focusSearch();
                  }}
                  aria-label="Clear search"
                  className="absolute right-[4.25rem] top-1/2 hidden -translate-y-1/2 rounded-md p-1 text-muted-foreground hover:bg-muted hover:text-foreground md:flex"
                >
                  <X size={16} />
                </button>
              )}

              {/* Clear search: mobile */}
              {search && (
                <button
                  type="button"
                  onClick={() => {
                    setSearch("");
                    setVoiceError("");
                    setVoiceMessage("");
                    setSearchOpen(true);
                    focusSearch();
                  }}
                  aria-label="Clear search"
                  className="absolute right-12 top-1/2 -translate-y-1/2 rounded-md p-1 text-muted-foreground hover:bg-muted hover:text-foreground md:hidden"
                >
                  <X size={16} />
                </button>
              )}

              {/* Keyboard shortcut */}
              {!search && (
                <span className="pointer-events-none absolute right-[4.25rem] top-1/2 hidden -translate-y-1/2 rounded-md border border-border px-2 py-1 text-[10px] text-muted-foreground md:block">
                  Ctrl K
                </span>
              )}

              {/* Desktop microphone */}
              <button
                type="button"
                onClick={listening ? stopVoiceSearch : startVoiceSearch}
                aria-label={
                  listening ? "Stop voice search" : "Start voice search"
                }
                aria-pressed={listening}
                title={listening ? "Stop voice search" : "Speak to search"}
                className={`absolute right-2 top-1/2 hidden size-8 -translate-y-1/2 items-center justify-center rounded-lg transition md:flex ${
                  listening
                    ? "bg-red-500 text-white"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                {listening ? <MicOff size={17} /> : <Mic size={17} />}
              </button>

              {/* Mobile microphone */}
              <button
                type="button"
                onClick={listening ? stopVoiceSearch : startVoiceSearch}
                aria-label={
                  listening ? "Stop voice search" : "Start voice search"
                }
                aria-pressed={listening}
                title={listening ? "Stop voice search" : "Speak to search"}
                className={`absolute right-2 top-1/2 flex size-8 -translate-y-1/2 items-center justify-center rounded-lg transition md:hidden ${
                  listening
                    ? "bg-red-500 text-white"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                {listening ? <MicOff size={17} /> : <Mic size={17} />}
              </button>
            </form>

            {/* Voice messages */}
            {listening && (
              <p
                className="mt-2 flex items-center gap-2 text-xs text-emerald-700 dark:text-emerald-400"
                role="status"
              >
                <span className="size-2 animate-pulse rounded-full bg-emerald-500" />
                Listening... Speak your search.
              </p>
            )}

            {!listening && voiceMessage && (
              <p className="mt-2 text-xs text-muted-foreground" role="status">
                {voiceMessage}
              </p>
            )}

            {voiceError && (
              <p className="mt-2 text-xs text-destructive" role="alert">
                {voiceError}
              </p>
            )}

            {/* Dynamic search results */}
            {searchOpen && query && (
              <SearchResults
                results={filteredResults}
                onNavigate={navigateTo}
                onClose={closeSearch}
              />
            )}
          </div>
        </div>

        <main className="mx-auto w-full max-w-[1600px] flex-1 p-4 sm:p-6 lg:p-8">
          {children}
        </main>

        <AppFooter />
      </div>
    </div>
  );
}
