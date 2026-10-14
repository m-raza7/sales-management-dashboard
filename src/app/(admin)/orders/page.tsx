"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import {
  ShoppingCart,
  Plus,
  Search,
  Trash2,
  X,
  Clock3,
  IndianRupee,
  Package,
  ArrowUpRight,
} from "lucide-react";

import type { Order, OrderStatus } from "@/features/orders/types";
import {
  deleteOrder,
  getOrders,
  updateOrderStatus,
} from "@/features/orders/order.service";

const money = (value: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(value);

const statusStyles: Record<OrderStatus, string> = {
  pending:
    "bg-amber-500/10 text-amber-700 dark:text-amber-300 ring-amber-500/20",
  confirmed: "bg-blue-500/10 text-blue-700 dark:text-blue-300 ring-blue-500/20",
  dispatched:
    "bg-violet-500/10 text-violet-700 dark:text-violet-300 ring-violet-500/20",
  delivered:
    "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 ring-emerald-500/20",
  cancelled: "bg-red-500/10 text-red-700 dark:text-red-300 ring-red-500/20",
};

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [ready, setReady] = useState(false);

  const loadOrders = useCallback(() => {
    setOrders(getOrders());
    setReady(true);
  }, []);

  useEffect(() => {
    loadOrders();
  }, [loadOrders]);

  function handleStatusChange(id: string, status: OrderStatus) {
    updateOrderStatus(id, status);
    loadOrders();
  }

  function handleDelete(order: Order) {
    const confirmed = window.confirm(
      `Are you sure you want to delete order ${order.orderNumber}?`,
    );

    if (!confirmed) return;

    deleteOrder(order.id);
    loadOrders();
  }

  const query = search.trim().toLowerCase();

  const filteredOrders = orders.filter((order) => {
    const matchesSearch = [
      order.orderNumber,
      order.customerName,
      order.paymentMethod,
      ...order.items.map((item) => item.productName),
    ].some((value) => value.toLowerCase().includes(query));

    const matchesStatus =
      statusFilter === "all" || order.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const pendingCount = orders.filter(
    (order) => order.status === "pending",
  ).length;

  const totalOrderValue = orders
    .filter((order) => order.status !== "cancelled")
    .reduce((sum, order) => sum + order.total, 0);

  const stats = [
    {
      label: "Total orders",
      value: ready ? String(orders.length) : "—",
      detail: "All recorded orders",
      icon: ShoppingCart,
      iconClass: "bg-primary/10 text-primary",
    },
    {
      label: "Pending orders",
      value: ready ? String(pendingCount) : "—",
      detail: "Awaiting confirmation",
      icon: Clock3,
      iconClass: "bg-amber-500/10 text-amber-700 dark:text-amber-300",
    },
    {
      label: "Total order value",
      value: ready ? money(totalOrderValue) : "—",
      detail: "Excludes cancelled orders",
      icon: IndianRupee,
      iconClass: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
    },
  ];

  return (
    <div className="min-w-0 space-y-6 text-foreground sm:space-y-8">
      {/* Page heading */}
      <section className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div className="min-w-0">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
            <ShoppingCart size={15} className="text-gold" />
            Sales management
          </div>

          <h1 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
            Orders
          </h1>

          <p className="mt-2 text-sm text-muted-foreground sm:text-base">
            Manage shop orders, track progress and review order totals.
          </p>
        </div>

        <Link
          href="/orders/new"
          className="inline-flex min-h-11 w-fit shrink-0 items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          <Plus size={18} />
          New order
        </Link>
      </section>

      {/* Summary cards */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {stats.map(({ label, value, detail, icon: Icon, iconClass }) => (
          <div
            key={label}
            className="rounded-2xl border border-border bg-card p-5 shadow-sm transition hover:border-ring/50 sm:p-6"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="text-sm font-medium text-muted-foreground">
                  {label}
                </p>

                <p className="mt-3 break-words text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                  {value}
                </p>

                <p className="mt-2 text-xs text-muted-foreground">{detail}</p>
              </div>

              <div className={`shrink-0 rounded-2xl p-3 ${iconClass}`}>
                <Icon size={22} />
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Orders table */}
      <section className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
        {/* Search and filters */}
        <div className="flex flex-col justify-between gap-4 border-b border-border p-4 sm:p-5 lg:flex-row lg:items-center">
          <div>
            <h2 className="text-base font-semibold">Order history</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Search orders and update their status.
            </p>
          </div>

          <div className="flex w-full flex-col gap-3 sm:flex-row lg:max-w-2xl">
            <div className="relative min-w-0 flex-1">
              <Search
                size={18}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              />

              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search order, shop or product..."
                aria-label="Search orders"
                className="h-11 w-full rounded-xl border border-border bg-background pl-10 pr-10 text-sm text-foreground outline-none transition placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring/20"
              />

              {search && (
                <button
                  type="button"
                  aria-label="Clear order search"
                  onClick={() => setSearch("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition hover:text-foreground"
                >
                  <X size={16} />
                </button>
              )}
            </div>

            <select
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
              aria-label="Filter orders by status"
              className="h-11 w-full rounded-xl border border-border bg-background px-3 text-sm text-foreground outline-none transition focus:border-ring focus:ring-2 focus:ring-ring/20 sm:w-44 dark:[color-scheme:dark]"
            >
              <option value="all">All statuses</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="dispatched">Dispatched</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        {!ready ? (
          <div className="p-10 text-center text-sm text-muted-foreground">
            Loading orders...
          </div>
        ) : filteredOrders.length === 0 ? (
          <div className="px-5 py-14 text-center sm:py-16">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              {search || statusFilter !== "all" ? (
                <Search size={25} />
              ) : (
                <ShoppingCart size={25} />
              )}
            </div>

            <h3 className="mt-4 text-base font-semibold">
              {search || statusFilter !== "all"
                ? "No matching orders"
                : "No orders yet"}
            </h3>

            <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-muted-foreground">
              {search || statusFilter !== "all"
                ? "Try changing your search or status filter."
                : "Create your first order to start tracking sales."}
            </p>

            {search || statusFilter !== "all" ? (
              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setStatusFilter("all");
                }}
                className="mt-5 rounded-xl border border-border px-4 py-2.5 text-sm font-medium transition hover:bg-muted"
              >
                Clear filters
              </button>
            ) : (
              <Link
                href="/orders/new"
                className="mt-5 inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
              >
                <Plus size={17} />
                Create first order
              </Link>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[920px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/60">
                  <th className="px-5 py-4 font-semibold text-muted-foreground">
                    Order
                  </th>
                  <th className="px-5 py-4 font-semibold text-muted-foreground">
                    Shop
                  </th>
                  <th className="px-5 py-4 font-semibold text-muted-foreground">
                    Items
                  </th>
                  <th className="px-5 py-4 font-semibold text-muted-foreground">
                    Total
                  </th>
                  <th className="px-5 py-4 font-semibold text-muted-foreground">
                    Date
                  </th>
                  <th className="px-5 py-4 font-semibold text-muted-foreground">
                    Status
                  </th>
                  <th className="px-5 py-4 font-semibold text-muted-foreground">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-border">
                {filteredOrders.map((order) => (
                  <tr
                    key={order.id}
                    className="transition-colors hover:bg-muted/40"
                  >
                    <td className="px-5 py-4">
                      <p className="font-semibold text-foreground">
                        {order.orderNumber}
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {order.paymentMethod.replaceAll("_", " ")}
                      </p>
                    </td>

                    <td className="px-5 py-4">
                      <p className="font-medium text-foreground">
                        {order.customerName}
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {order.items.length} product line
                        {order.items.length === 1 ? "" : "s"}
                      </p>
                    </td>

                    <td className="px-5 py-4">
                      <div className="inline-flex items-center gap-2 text-foreground">
                        <Package size={15} className="text-muted-foreground" />
                        {order.items.reduce(
                          (sum, item) => sum + item.quantity,
                          0,
                        )}
                      </div>
                    </td>

                    <td className="px-5 py-4 font-semibold text-foreground">
                      {money(order.total)}
                    </td>

                    <td className="px-5 py-4 text-muted-foreground">
                      {new Date(order.createdAt).toLocaleDateString("en-IN")}
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex min-w-36 flex-col items-start gap-2">
                        <span
                          className={`inline-flex items-center rounded-full px-3 py-1.5 text-xs font-semibold capitalize ring-1 ring-inset ${statusStyles[order.status]}`}
                        >
                          {order.status}
                        </span>

                        <select
                          value={order.status}
                          onChange={(event) =>
                            handleStatusChange(
                              order.id,
                              event.target.value as OrderStatus,
                            )
                          }
                          aria-label={`Change status for ${order.orderNumber}`}
                          className="h-9 w-full rounded-lg border border-border bg-background px-2 text-xs text-foreground outline-none focus:border-ring focus:ring-2 focus:ring-ring/20 dark:[color-scheme:dark]"
                        >
                          <option value="pending">Pending</option>
                          <option value="confirmed">Confirmed</option>
                          <option value="dispatched">Dispatched</option>
                          <option value="delivered">Delivered</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <button
                        type="button"
                        onClick={() => handleDelete(order)}
                        aria-label={`Delete ${order.orderNumber}`}
                        title="Delete order"
                        className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-background text-muted-foreground transition hover:border-red-500/40 hover:bg-red-500/10 hover:text-red-500"
                      >
                        <Trash2 size={15} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {ready && filteredOrders.length > 0 && (
          <div className="flex flex-col gap-2 border-t border-border bg-muted/30 px-5 py-4 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
            <span>
              Showing {filteredOrders.length} of {orders.length} orders
            </span>
            <Link
              href="/orders/new"
              className="inline-flex items-center gap-1.5 font-semibold text-primary hover:underline"
            >
              Create another order
              <ArrowUpRight size={14} />
            </Link>
          </div>
        )}
      </section>
    </div>
  );
}
