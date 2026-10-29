"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  Users,
  Plus,
  Search,
  Pencil,
  Trash2,
  MapPin,
  Phone,
  Store,
  X,
  CheckCircle2,
} from "lucide-react";

import type { Customer } from "@/features/customers/types";
import {
  deleteCustomer,
  getCustomers,
} from "@/features/customers/customer.service";

import { useLanguage } from "@/components/providers/LanguageProvider";
import { translations } from "@/lib/i18n/translations";

export default function CustomersPage() {
  const { language, mounted } = useLanguage();
  const t = translations[language];
  const searchParams = useSearchParams();

  const highlightId = searchParams.get("highlight");

  const [customers, setCustomers] = useState<Customer[]>([]);
  const [search, setSearch] = useState("");
  const [ready, setReady] = useState(false);
  const [highlightedId, setHighlightedId] = useState<string | null>(null);

  const rowRefs = useRef<Map<string, HTMLTableRowElement>>(new Map());

  const loadCustomers = useCallback(() => {
    try {
      setCustomers(getCustomers());
    } catch (error) {
      console.error("Failed to load customers:", error);
      setCustomers([]);
    } finally {
      setReady(true);
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;
    loadCustomers();
  }, [mounted, loadCustomers]);

  // Find, scroll to, and highlight the customer selected from global search.
  useEffect(() => {
    if (!ready || !highlightId) {
      setHighlightedId(null);
      return;
    }

    const matchingCustomer = customers.find(
      (customer) => String(customer.id) === highlightId,
    );

    if (!matchingCustomer) {
      setHighlightedId(null);
      return;
    }

    setHighlightedId(highlightId);
    setSearch("");

    const frame = window.requestAnimationFrame(() => {
      const row = rowRefs.current.get(highlightId);

      row?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    });

    // Remove the visual highlight after a short time.
    const timeout = window.setTimeout(() => {
      setHighlightedId((current) => (current === highlightId ? null : current));
    }, 5000);

    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(timeout);
    };
  }, [ready, highlightId, customers]);

  function handleDelete(customer: Customer) {
    const confirmed = window.confirm(
      `${t.confirmDelete}: "${customer.shopName}"?`,
    );

    if (!confirmed) return;

    try {
      deleteCustomer(customer.id);
      loadCustomers();
    } catch (error) {
      console.error("Failed to delete customer:", error);
    }
  }

  const query = search.trim().toLowerCase();

  const filteredCustomers = customers.filter((customer) =>
    [
      customer.shopName,
      customer.ownerName,
      customer.phone,
      customer.city,
      customer.state,
      customer.email,
    ].some((value) =>
      String(value ?? "")
        .toLowerCase()
        .includes(query),
    ),
  );

  if (!mounted) {
    return (
      <div className="min-w-0 space-y-6 text-foreground">
        <div className="h-24 animate-pulse rounded-2xl bg-muted" />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {[1, 2].map((item) => (
            <div
              key={item}
              className="h-28 animate-pulse rounded-2xl bg-muted"
            />
          ))}
        </div>

        <div className="h-72 animate-pulse rounded-2xl bg-muted" />
      </div>
    );
  }

  return (
    <div className="min-w-0 space-y-6 text-foreground sm:space-y-8">
      {/* Page heading */}
      <section className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div className="min-w-0">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
            <Users size={15} className="text-gold" />
            {t.salesManagement}
          </div>

          <h1 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
            {t.customers}
          </h1>

          <p className="mt-2 text-sm text-muted-foreground sm:text-base">
            {t.customersDescription}
          </p>
        </div>

        <Link
          href="/customers/new"
          className="inline-flex min-h-11 w-fit shrink-0 items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          <Plus size={18} />
          {t.addCustomer}
        </Link>
      </section>

      {/* Highlight notification */}
      {highlightedId && (
        <div
          role="status"
          className="flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3 text-sm text-emerald-800 dark:text-emerald-300"
        >
          <CheckCircle2 size={18} />
          Matching customer found and highlighted.
        </div>
      )}

      {/* Summary cards */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                {t.totalCustomersLabel}
              </p>

              <p className="mt-3 text-3xl font-bold tracking-tight">
                {ready ? customers.length : "—"}
              </p>

              <p className="mt-1 text-xs text-muted-foreground">
                {t.allRegisteredShops}
              </p>
            </div>

            <div className="rounded-2xl bg-primary/10 p-3 text-primary">
              <Store size={23} />
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                {t.searchResults}
              </p>

              <p className="mt-3 text-3xl font-bold tracking-tight">
                {ready ? filteredCustomers.length : "—"}
              </p>

              <p className="mt-1 text-xs text-muted-foreground">
                {t.shopsMatchingSearch}
              </p>
            </div>

            <div className="rounded-2xl bg-[#D8B66A]/15 p-3 text-[#A47D27] dark:text-[#E4C57D]">
              <Search size={23} />
            </div>
          </div>
        </div>
      </section>

      {/* Customer directory */}
      <section className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
        {/* Search toolbar */}
        <div className="flex flex-col justify-between gap-4 border-b border-border p-4 sm:flex-row sm:items-center sm:p-5">
          <div>
            <h2 className="text-base font-semibold">{t.shopDirectory}</h2>

            <p className="mt-1 text-sm text-muted-foreground">
              {t.customerDirectoryDescription}
            </p>
          </div>

          <div className="relative w-full sm:max-w-sm">
            <Search
              size={18}
              aria-hidden="true"
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            />

            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder={t.searchCustomerPlaceholder}
              aria-label={t.searchCustomers}
              className="h-11 w-full rounded-xl border border-border bg-background pl-10 pr-10 text-sm text-foreground outline-none transition placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring/20"
            />

            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                aria-label={t.clearSearch}
                title={t.clearSearch}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition hover:text-foreground"
              >
                <X size={16} />
              </button>
            )}
          </div>
        </div>

        {/* Table content */}
        {!ready ? (
          <div className="p-10 text-center text-sm text-muted-foreground">
            {t.loadingCustomers}
          </div>
        ) : filteredCustomers.length === 0 ? (
          <div className="px-5 py-14 text-center sm:py-16">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              {search ? <Search size={25} /> : <Users size={25} />}
            </div>

            <h3 className="mt-4 text-base font-semibold">
              {search ? t.noCustomersFound : t.noCustomersYet}
            </h3>

            <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-muted-foreground">
              {search ? t.tryAnotherCustomer : t.addFirstCustomerDescription}
            </p>

            {search ? (
              <button
                type="button"
                onClick={() => setSearch("")}
                className="mt-5 rounded-xl border border-border px-4 py-2.5 text-sm font-medium transition hover:bg-muted"
              >
                {t.clearSearch}
              </button>
            ) : (
              <Link
                href="/customers/new"
                className="mt-5 inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
              >
                <Plus size={17} />
                {t.addFirstCustomer}
              </Link>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/60">
                  <th className="px-5 py-4 font-semibold text-muted-foreground">
                    {t.shopName}
                  </th>

                  <th className="px-5 py-4 font-semibold text-muted-foreground">
                    {t.ownerName}
                  </th>

                  <th className="px-5 py-4 font-semibold text-muted-foreground">
                    {t.phone}
                  </th>

                  <th className="px-5 py-4 font-semibold text-muted-foreground">
                    {t.location}
                  </th>

                  <th className="px-5 py-4 font-semibold text-muted-foreground">
                    {t.actions}
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-border">
                {filteredCustomers.map((customer) => {
                  const customerId = String(customer.id);
                  const isHighlighted = highlightedId === customerId;

                  return (
                    <tr
                      key={customerId}
                      data-customer-id={customerId}
                      ref={(element) => {
                        if (element) {
                          rowRefs.current.set(customerId, element);
                        } else {
                          rowRefs.current.delete(customerId);
                        }
                      }}
                      className={
                        isHighlighted
                          ? "search-result-highlight"
                          : "transition-colors hover:bg-muted/40"
                      }
                    >
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div
                            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl font-semibold ${
                              isHighlighted
                                ? "bg-emerald-500 text-white"
                                : "bg-primary/10 text-primary"
                            }`}
                          >
                            {customer.shopName.trim().charAt(0).toUpperCase() ||
                              "S"}
                          </div>

                          <div className="min-w-0">
                            <p
                              className={`max-w-[220px] truncate font-semibold ${
                                isHighlighted
                                  ? "text-emerald-700 dark:text-emerald-300"
                                  : "text-foreground"
                              }`}
                            >
                              {customer.shopName}
                            </p>

                            <p className="mt-1 max-w-[220px] truncate text-xs text-muted-foreground">
                              {customer.email || t.noEmailProvided}
                            </p>

                            {isHighlighted && (
                              <span className="mt-1 inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 dark:text-emerald-300">
                                <CheckCircle2 size={12} />
                                Search match
                              </span>
                            )}
                          </div>
                        </div>
                      </td>

                      <td className="px-5 py-4 font-medium text-foreground">
                        {customer.ownerName}
                      </td>

                      <td className="px-5 py-4">
                        <span className="inline-flex items-center gap-2 text-muted-foreground">
                          <Phone size={14} className="shrink-0" />
                          <span className="text-foreground">
                            {customer.phone}
                          </span>
                        </span>
                      </td>

                      <td className="px-5 py-4">
                        <span className="inline-flex items-center gap-2 text-muted-foreground">
                          <MapPin size={14} className="shrink-0" />
                          <span className="text-foreground">
                            {customer.city || t.notSpecified}
                          </span>
                        </span>
                      </td>

                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2">
                          <Link
                            href={`/customers/${encodeURIComponent(customerId)}`}
                            aria-label={`${t.edit} ${customer.shopName}`}
                            title={t.editCustomerAction}
                            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-background text-muted-foreground transition hover:border-ring hover:bg-primary/10 hover:text-primary"
                          >
                            <Pencil size={15} />
                          </Link>

                          <button
                            type="button"
                            onClick={() => handleDelete(customer)}
                            aria-label={`${t.delete} ${customer.shopName}`}
                            title={t.deleteCustomerAction}
                            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-background text-muted-foreground transition hover:border-red-500/40 hover:bg-red-500/10 hover:text-red-500"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* Table footer */}
        {ready && filteredCustomers.length > 0 && (
          <div className="flex flex-col gap-2 border-t border-border bg-muted/30 px-5 py-4 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
            <span>
              {t.showing} {filteredCustomers.length} {t.of} {customers.length}{" "}
              {t.customers.toLowerCase()}
            </span>

            <span>{t.customerStorageNotice}</span>
          </div>
        )}
      </section>
    </div>
  );
}
