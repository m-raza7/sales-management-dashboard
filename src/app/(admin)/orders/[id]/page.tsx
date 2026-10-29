"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  ShoppingCart,
  Receipt,
  CalendarDays,
  UserRound,
  LoaderCircle,
  AlertCircle,
  Package,
} from "lucide-react";

import { getOrders } from "@/features/orders/order.service";
import { useLanguage } from "@/components/providers/LanguageProvider";

type OrderRecord = ReturnType<typeof getOrders>[number];

function formatLabel(value: string): string {
  return value
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/[_-]/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function formatValue(value: unknown): string {
  if (value === null || value === undefined || value === "") {
    return "—";
  }

  if (typeof value === "boolean") {
    return value ? "Yes" : "No";
  }

  if (typeof value === "object") {
    return JSON.stringify(value, null, 2) ?? "—";
  }

  return String(value);
}

export default function OrderDetailsPage() {
  const params = useParams<{ id: string | string[] }>();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;

  const { mounted } = useLanguage();

  const [order, setOrder] = useState<OrderRecord | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!mounted || !id) return;

    setReady(false);

    try {
      const orders = getOrders();

      const foundOrder =
        orders.find((item) => String(item.id) === String(id)) ?? null;

      setOrder(foundOrder);
    } catch (error) {
      console.error("Failed to load order:", error);
      setOrder(null);
    } finally {
      setReady(true);
    }
  }, [id, mounted]);

  const backLinkClass =
    "inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition hover:text-foreground";

  if (!mounted || !ready) {
    return (
      <section className="mx-auto w-full max-w-5xl space-y-6">
        <div className="h-8 w-48 animate-pulse rounded-lg bg-muted" />

        <div className="flex min-h-52 items-center justify-center rounded-2xl border border-border bg-card">
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <LoaderCircle size={22} className="animate-spin text-primary" />
            Loading order details...
          </div>
        </div>
      </section>
    );
  }

  if (!order) {
    return (
      <section className="mx-auto w-full max-w-3xl space-y-6 text-foreground">
        <Link href="/orders" className={backLinkClass}>
          <ArrowLeft size={16} />
          Back to Orders
        </Link>

        <div className="rounded-2xl border border-border bg-card p-6 text-center shadow-sm sm:p-10">
          <div className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-destructive/10 text-destructive">
            <AlertCircle size={30} />
          </div>

          <h1 className="mt-5 text-xl font-bold tracking-tight sm:text-2xl">
            Order Not Found
          </h1>

          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted-foreground">
            This order could not be found. It may have been deleted, or the link
            may contain an incorrect order ID.
          </p>

          <Link
            href="/orders"
            className="mt-6 inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
          >
            <ShoppingCart size={17} />
            View All Orders
          </Link>
        </div>
      </section>
    );
  }

  //   const orderData = order as Record<string, unknown>;
  const orderData = order as unknown as Record<string, unknown>;

  const orderEntries = Object.entries(orderData).filter(
    ([key]) => !["id", "items"].includes(key),
  );

  const items = Array.isArray(orderData.items) ? orderData.items : [];

  const orderDate =
    orderData.createdAt ?? orderData.orderDate ?? orderData.date;

  const customerName =
    orderData.customerName ??
    (typeof orderData.customer === "object" &&
    orderData.customer !== null &&
    "name" in orderData.customer
      ? orderData.customer.name
      : orderData.customer);

  return (
    <section className="mx-auto w-full max-w-5xl min-w-0 space-y-6 text-foreground sm:space-y-8">
      {/* Page heading */}
      <div className="space-y-4">
        <Link href="/orders" className={backLinkClass}>
          <ArrowLeft size={16} />
          Back to Orders
        </Link>

        <div className="flex items-start gap-3">
          <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <Receipt size={23} />
          </div>

          <div className="min-w-0">
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Order Details
            </h1>

            <p className="mt-2 break-all text-sm text-muted-foreground">
              Order ID: {String(order.id)}
            </p>
          </div>
        </div>
      </div>

      {/* Order summary */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <ShoppingCart size={17} />
            Order ID
          </div>

          <p className="mt-3 break-all text-lg font-bold">{String(order.id)}</p>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <CalendarDays size={17} />
            Order Date
          </div>

          <p className="mt-3 break-words text-lg font-bold">
            {formatValue(orderDate)}
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <UserRound size={17} />
            Customer
          </div>

          <p className="mt-3 break-words text-lg font-bold">
            {formatValue(customerName)}
          </p>
        </div>
      </div>

      {/* Order information */}
      <div className="rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-7">
        <div className="mb-5 flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Receipt size={20} />
          </div>

          <div>
            <h2 className="font-semibold">Order Information</h2>
            <p className="text-sm text-muted-foreground">
              Saved information for this order
            </p>
          </div>
        </div>

        {orderEntries.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {orderEntries.map(([key, value]) => (
              <div
                key={key}
                className="min-w-0 rounded-xl border border-border p-4"
              >
                <p className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  {formatLabel(key)}
                </p>

                <p className="break-words text-sm font-medium">
                  {formatValue(value)}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">
            No additional order information is available.
          </p>
        )}
      </div>

      {/* Order items */}
      <div className="rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-7">
        <div className="mb-5 flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Package size={20} />
          </div>

          <div>
            <h2 className="font-semibold">Order Items</h2>
            <p className="text-sm text-muted-foreground">
              Products included in this order
            </p>
          </div>
        </div>

        {items.length > 0 ? (
          <div className="space-y-3">
            {items.map((item, index) => (
              <div key={index} className="rounded-xl border border-border p-4">
                <p className="mb-2 text-sm font-semibold">Item {index + 1}</p>

                <pre className="overflow-x-auto whitespace-pre-wrap break-words text-xs leading-6 text-muted-foreground">
                  {formatValue(item)}
                </pre>
              </div>
            ))}
          </div>
        ) : (
          <p className="rounded-xl border border-dashed border-border p-5 text-center text-sm text-muted-foreground">
            No individual product items were found for this order.
          </p>
        )}
      </div>

      <Link
        href="/orders"
        className="inline-flex items-center gap-2 rounded-xl border border-border px-4 py-2.5 text-sm font-medium transition hover:bg-muted"
      >
        <ArrowLeft size={16} />
        Back to Orders
      </Link>
    </section>
  );
}
