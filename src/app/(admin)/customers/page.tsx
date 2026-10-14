"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
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
} from "lucide-react";

import type { Customer } from "@/features/customers/types";
import {
  deleteCustomer,
  getCustomers,
} from "@/features/customers/customer.service";

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [search, setSearch] = useState("");
  const [ready, setReady] = useState(false);

  const loadCustomers = useCallback(() => {
    setCustomers(getCustomers());
    setReady(true);
  }, []);

  useEffect(() => {
    loadCustomers();
  }, [loadCustomers]);

  function handleDelete(customer: Customer) {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${customer.shopName}"?`,
    );

    if (!confirmed) return;

    deleteCustomer(customer.id);
    loadCustomers();
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
    ].some((value) => value.toLowerCase().includes(query)),
  );

  return (
    <div className="min-w-0 space-y-6 text-foreground sm:space-y-8">
      {/* Page heading */}
      <section className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div className="min-w-0">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
            <Users size={15} className="text-gold" />
            Sales management
          </div>

          <h1 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
            Customers
          </h1>

          <p className="mt-2 text-sm text-muted-foreground sm:text-base">
            Manage your shops, shopkeepers and customer information.
          </p>
        </div>

        <Link
          href="/customers/new"
          className="inline-flex min-h-11 w-fit shrink-0 items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          <Plus size={18} />
          Add customer
        </Link>
      </section>

      {/* Summary cards */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Total customers
              </p>

              <p className="mt-3 text-3xl font-bold tracking-tight">
                {ready ? customers.length : "—"}
              </p>

              <p className="mt-1 text-xs text-muted-foreground">
                All registered shops
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
                Search results
              </p>

              <p className="mt-3 text-3xl font-bold tracking-tight">
                {ready ? filteredCustomers.length : "—"}
              </p>

              <p className="mt-1 text-xs text-muted-foreground">
                Shops matching your search
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
            <h2 className="text-base font-semibold">Shop directory</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              View and manage your registered customers.
            </p>
          </div>

          <div className="relative w-full sm:max-w-sm">
            <Search
              size={18}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            />

            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search shop, owner, phone or city..."
              aria-label="Search customers"
              className="h-11 w-full rounded-xl border border-border bg-background pl-10 pr-10 text-sm text-foreground outline-none transition placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring/20"
            />

            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                aria-label="Clear customer search"
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
            Loading customers...
          </div>
        ) : filteredCustomers.length === 0 ? (
          <div className="px-5 py-14 text-center sm:py-16">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              {search ? <Search size={25} /> : <Users size={25} />}
            </div>

            <h3 className="mt-4 text-base font-semibold">
              {search ? "No customers found" : "No customers yet"}
            </h3>

            <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-muted-foreground">
              {search
                ? "Try another shop name, owner name, phone number or city."
                : "Add your first shop to start building your customer directory."}
            </p>

            {search ? (
              <button
                type="button"
                onClick={() => setSearch("")}
                className="mt-5 rounded-xl border border-border px-4 py-2.5 text-sm font-medium transition hover:bg-muted"
              >
                Clear search
              </button>
            ) : (
              <Link
                href="/customers/new"
                className="mt-5 inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
              >
                <Plus size={17} />
                Add your first customer
              </Link>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/60">
                  <th className="px-5 py-4 font-semibold text-muted-foreground">
                    Shop
                  </th>
                  <th className="px-5 py-4 font-semibold text-muted-foreground">
                    Owner
                  </th>
                  <th className="px-5 py-4 font-semibold text-muted-foreground">
                    Phone
                  </th>
                  <th className="px-5 py-4 font-semibold text-muted-foreground">
                    Location
                  </th>
                  <th className="px-5 py-4 font-semibold text-muted-foreground">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-border">
                {filteredCustomers.map((customer) => (
                  <tr
                    key={customer.id}
                    className="transition-colors hover:bg-muted/40"
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 font-semibold text-primary">
                          {customer.shopName.trim().charAt(0).toUpperCase() ||
                            "S"}
                        </div>

                        <div className="min-w-0">
                          <p className="max-w-[220px] truncate font-semibold text-foreground">
                            {customer.shopName}
                          </p>
                          <p className="mt-1 max-w-[220px] truncate text-xs text-muted-foreground">
                            {customer.email || "No email provided"}
                          </p>
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
                          {customer.city || "Not specified"}
                        </span>
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/customers/${customer.id}/edit`}
                          aria-label={`Edit ${customer.shopName}`}
                          title="Edit customer"
                          className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-background text-muted-foreground transition hover:border-ring hover:bg-primary/10 hover:text-primary"
                        >
                          <Pencil size={15} />
                        </Link>

                        <button
                          type="button"
                          onClick={() => handleDelete(customer)}
                          aria-label={`Delete ${customer.shopName}`}
                          title="Delete customer"
                          className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-background text-muted-foreground transition hover:border-red-500/40 hover:bg-red-500/10 hover:text-red-500"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Table footer */}
        {ready && filteredCustomers.length > 0 && (
          <div className="flex flex-col gap-2 border-t border-border bg-muted/30 px-5 py-4 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
            <span>
              Showing {filteredCustomers.length} of {customers.length} customers
            </span>
            <span>Customer information is saved in this browser.</span>
          </div>
        )}
      </section>
    </div>
  );
}
