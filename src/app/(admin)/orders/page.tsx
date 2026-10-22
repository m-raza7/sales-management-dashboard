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
  Download,
} from "lucide-react";

import type { Order, OrderStatus } from "@/features/orders/types";
import {
  deleteOrder,
  getOrders,
  updateOrderStatus,
} from "@/features/orders/order.service";

import { useLanguage } from "@/components/providers/LanguageProvider";
import { translations } from "@/lib/i18n/translations";

const money = (value: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(value);

const statusStyles: Record<OrderStatus, string> = {
  pending:
    "bg-yellow-500/10 text-yellow-700 dark:text-yellow-300 ring-yellow-500/25",
  confirmed: "bg-blue-500/10 text-blue-700 dark:text-blue-300 ring-blue-500/20",
  dispatched:
    "bg-violet-500/10 text-violet-700 dark:text-violet-300 ring-violet-500/20",
  delivered:
    "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 ring-emerald-500/20",
  cancelled: "bg-red-500/10 text-red-700 dark:text-red-300 ring-red-500/20",
};

export default function OrdersPage() {
  const { language, mounted } = useLanguage();
  const t = translations[language];

  const [orders, setOrders] = useState<Order[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [ready, setReady] = useState(false);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

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
      `${t.confirmDelete}: ${order.orderNumber}?`,
    );

    if (!confirmed) return;

    deleteOrder(order.id);
    loadOrders();
  }

  async function handleDownloadPdf(order: Order) {
    if (downloadingId !== null) return;

    setDownloadingId(order.id);

    try {
      const [{ pdf }, { default: OrderPdfDocument }] = await Promise.all([
        import("@react-pdf/renderer"),
        import("@/features/orders/components/OrderPdfDocument"),
      ]);

      const pdfDocument = <OrderPdfDocument order={order} />;
      const blob = await pdf(pdfDocument).toBlob();

      const url = URL.createObjectURL(blob);
      const link = window.document.createElement("a");

      const safeOrderNumber = order.orderNumber.replace(/[^a-zA-Z0-9_-]/g, "_");

      link.href = url;
      link.download = `Sales-Order-${safeOrderNumber}.pdf`;

      window.document.body.appendChild(link);
      link.click();
      link.remove();

      window.setTimeout(() => URL.revokeObjectURL(url), 1000);
    } catch (error) {
      console.error("Failed to generate order PDF:", error);
      window.alert("Unable to generate the PDF. Please try again.");
    } finally {
      setDownloadingId(null);
    }
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

  const statusLabels: Record<OrderStatus, string> = {
    pending: t.pending,
    confirmed: t.confirmed,
    dispatched: t.dispatched,
    delivered: t.delivered,
    cancelled: t.cancelled,
  };

  const stats = [
    {
      label: t.totalOrdersLabel,
      value: ready ? String(orders.length) : "—",
      detail: t.allRecordedOrders,
      icon: ShoppingCart,
      iconClass: "bg-primary/10 text-primary",
    },
    {
      label: t.pendingOrders,
      value: ready ? String(pendingCount) : "—",
      detail: t.awaitingConfirmation,
      icon: Clock3,
      iconClass: "bg-amber-500/10 text-amber-700 dark:text-amber-300",
    },
    {
      label: t.totalOrderValue,
      value: ready ? money(totalOrderValue) : "—",
      detail: t.excludesCancelledOrders,
      icon: IndianRupee,
      iconClass: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
    },
  ];

  if (!mounted) {
    return (
      <div className="min-w-0 space-y-6 text-foreground">
        <div className="h-24 animate-pulse rounded-2xl bg-muted" />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {[1, 2, 3].map((item) => (
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
            <ShoppingCart size={15} className="text-gold" />
            {t.salesManagement}
          </div>

          <h1 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
            {t.orders}
          </h1>

          <p className="mt-2 text-sm text-muted-foreground sm:text-base">
            {t.ordersDescription}
          </p>
        </div>

        <Link
          href="/orders/new"
          className="inline-flex min-h-11 w-fit shrink-0 items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          <Plus size={18} />
          {t.newOrder}
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
            <h2 className="text-base font-semibold">{t.orderHistory}</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {t.searchAndUpdateOrders}
            </p>
          </div>

          <div className="flex w-full flex-col gap-3 sm:flex-row lg:max-w-2xl">
            <div className="relative min-w-0 flex-1">
              <Search
                size={18}
                aria-hidden="true"
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              />

              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder={t.searchOrderPlaceholder}
                aria-label={t.searchOrders}
                className="h-11 w-full rounded-xl border border-border bg-background pl-10 pr-10 text-sm text-foreground outline-none transition placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring/20"
              />

              {search && (
                <button
                  type="button"
                  aria-label={t.clearSearch}
                  title={t.clearSearch}
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
              aria-label={t.filterOrdersByStatus}
              className="h-11 w-full rounded-xl border border-border bg-background px-3 text-sm text-foreground outline-none transition focus:border-ring focus:ring-2 focus:ring-ring/20 sm:w-44 dark:[color-scheme:dark]"
            >
              <option value="all">{t.allStatuses}</option>
              <option value="pending">{t.pending}</option>
              <option value="confirmed">{t.confirmed}</option>
              <option value="dispatched">{t.dispatched}</option>
              <option value="delivered">{t.delivered}</option>
              <option value="cancelled">{t.cancelled}</option>
            </select>
          </div>
        </div>

        {!ready ? (
          <div className="p-10 text-center text-sm text-muted-foreground">
            {t.loadingOrders}
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
                ? t.noMatchingOrders
                : t.noOrdersYet}
            </h3>

            <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-muted-foreground">
              {search || statusFilter !== "all"
                ? t.changeOrderFilters
                : t.createFirstOrderDescription}
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
                {t.clearFilters}
              </button>
            ) : (
              <Link
                href="/orders/new"
                className="mt-5 inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
              >
                <Plus size={17} />
                {t.createFirstOrder}
              </Link>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1000px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/60">
                  <th className="px-5 py-4 font-semibold text-muted-foreground">
                    {t.orderNumber}
                  </th>
                  <th className="px-5 py-4 font-semibold text-muted-foreground">
                    {t.shop}
                  </th>
                  <th className="px-5 py-4 font-semibold text-muted-foreground">
                    {t.items}
                  </th>
                  <th className="px-5 py-4 font-semibold text-muted-foreground">
                    {t.total}
                  </th>
                  <th className="px-5 py-4 font-semibold text-muted-foreground">
                    {t.date}
                  </th>
                  <th className="px-5 py-4 font-semibold text-muted-foreground">
                    {t.status}
                  </th>
                  <th className="px-5 py-4 font-semibold text-muted-foreground">
                    {t.actions}
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
                        {order.items.length}{" "}
                        {order.items.length === 1
                          ? t.productLine
                          : t.productLines}
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
                      {new Date(order.createdAt).toLocaleDateString(
                        language === "mr"
                          ? "mr-IN"
                          : language === "hi"
                            ? "hi-IN"
                            : "en-IN",
                      )}
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex min-w-36 flex-col items-start gap-2">
                        <span
                          className={`inline-flex items-center rounded-full px-3 py-1.5 text-xs font-semibold ring-1 ring-inset ${statusStyles[order.status]}`}
                        >
                          {statusLabels[order.status]}
                        </span>

                        <select
                          value={order.status}
                          onChange={(event) =>
                            handleStatusChange(
                              order.id,
                              event.target.value as OrderStatus,
                            )
                          }
                          aria-label={`${t.updateStatus}: ${order.orderNumber}`}
                          className="h-9 w-full rounded-lg border border-border bg-background px-2 text-xs text-foreground outline-none focus:border-ring focus:ring-2 focus:ring-ring/20 dark:[color-scheme:dark]"
                        >
                          {(
                            [
                              "pending",
                              "confirmed",
                              "dispatched",
                              "delivered",
                              "cancelled",
                            ] as OrderStatus[]
                          ).map((status) => (
                            <option key={status} value={status}>
                              {statusLabels[status]}
                            </option>
                          ))}
                        </select>
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleDownloadPdf(order)}
                          disabled={downloadingId !== null}
                          aria-label={`Download PDF for ${order.orderNumber}`}
                          title="Download order PDF"
                          className="inline-flex h-9 items-center justify-center gap-2 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 text-emerald-700 transition hover:bg-emerald-500/20 disabled:cursor-wait disabled:opacity-50 dark:text-emerald-300"
                        >
                          <Download size={15} />
                          <span className="text-xs font-semibold">
                            {downloadingId === order.id
                              ? "Generating..."
                              : "PDF"}
                          </span>
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDelete(order)}
                          aria-label={`${t.delete}: ${order.orderNumber}`}
                          title={t.deleteOrderAction}
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

        {ready && filteredOrders.length > 0 && (
          <div className="flex flex-col gap-2 border-t border-border bg-muted/30 px-5 py-4 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
            <span>
              {t.showing} {filteredOrders.length} {t.of} {orders.length}{" "}
              {t.orders.toLowerCase()}
            </span>

            <Link
              href="/orders/new"
              className="inline-flex items-center gap-1.5 font-semibold text-primary hover:underline"
            >
              {t.createAnotherOrder}
              <ArrowUpRight size={14} />
            </Link>
          </div>
        )}
      </section>
    </div>
  );
}
