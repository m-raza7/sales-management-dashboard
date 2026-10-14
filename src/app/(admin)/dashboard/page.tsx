"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Users,
  Package,
  ShoppingCart,
  Clock3,
  ArrowUpRight,
  Plus,
  Sparkles,
} from "lucide-react";

import { useLanguage } from "@/components/providers/LanguageProvider";
import { getCustomers } from "@/features/customers/customer.service";
import { getProducts } from "@/features/products/product.service";
import { getOrders } from "@/features/orders/order.service";
import type { Order } from "@/features/orders/types";

const money = (value: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(value);

export default function DashboardPage() {
  const { t } = useLanguage();
  const [orders, setOrders] = useState<Order[]>([]);
  const [customerCount, setCustomerCount] = useState(0);
  const [productCount, setProductCount] = useState(0);

  useEffect(() => {
    setCustomerCount(getCustomers().length);
    setProductCount(getProducts().filter((p) => p.active).length);
    setOrders(getOrders());
  }, []);

  const pendingCount = orders.filter(
    (order) => order.status === "pending",
  ).length;

  const orderValue = orders
    .filter((order) => order.status !== "cancelled")
    .reduce((total, order) => total + order.total, 0);

  const stats = [
    {
      label: t("totalCustomers"),
      value: customerCount,
      icon: Users,
      href: "/customers",
      color: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
    },
    {
      label: t("activeProducts"),
      value: productCount,
      icon: Package,
      href: "/products",
      color: "bg-amber-500/10 text-amber-700 dark:text-amber-300",
    },
    {
      label: t("totalOrders"),
      value: orders.length,
      icon: ShoppingCart,
      href: "/orders",
      color: "bg-sky-500/10 text-sky-700 dark:text-sky-300",
    },
    {
      label: t("pendingOrders"),
      value: pendingCount,
      icon: Clock3,
      href: "/orders",
      color: "bg-orange-500/10 text-orange-700 dark:text-orange-300",
    },
  ];

  const recentOrders = [...orders]
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )
    .slice(0, 5);

  return (
    <div className="space-y-8">
      <section className="relative overflow-hidden rounded-2xl bg-[#073B32] p-6 text-white shadow-xl shadow-emerald-950/10 sm:p-8 lg:p-10">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-16 -top-24 h-64 w-64 rounded-full border border-[#D8B66A]/20"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-4 -top-12 h-44 w-44 rounded-full border border-[#D8B66A]/20"
        />

        <div className="relative z-10 max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#D8B66A]/30 bg-white/5 px-3 py-1.5 text-xs font-medium text-[#E8D39D]">
            <Sparkles size={14} />
            {t("workspace")}
          </span>

          <h1 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl">
            {t("welcome")}
          </h1>

          <p className="mt-3 max-w-lg text-sm leading-6 text-white/70 sm:text-base">
            {t("overview")}
          </p>

          <Link
            href="/orders/new"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#D8B66A] px-5 py-3 text-sm font-bold text-[#073B32] transition hover:bg-[#E6CB8C]"
          >
            <Plus size={17} />
            {t("newOrder")}
          </Link>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map(({ label, value, icon: Icon, href, color }) => (
          <Link
            key={label}
            href={href}
            className="group rounded-2xl border border-border bg-card p-5 transition duration-200 hover:-translate-y-0.5 hover:border-[#A5BDA9] hover:shadow-lg hover:shadow-black/[0.03] sm:p-6"
          >
            <div className="flex items-center justify-between gap-3">
              <span className="text-sm font-medium text-muted-foreground">
                {label}
              </span>
              <span className={`rounded-xl p-2.5 ${color}`}>
                <Icon size={20} />
              </span>
            </div>

            <div className="mt-5 flex items-end justify-between">
              <span className="text-3xl font-bold tracking-tight">{value}</span>
              <ArrowUpRight
                size={18}
                className="text-muted-foreground transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary"
              />
            </div>
          </Link>
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.5fr_1fr]">
        <div className="overflow-hidden rounded-2xl border border-border bg-card">
          <div className="flex items-center justify-between gap-3 border-b border-border p-5 sm:p-6">
            <div>
              <h2 className="font-semibold">{t("recentOrders")}</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Your latest shop orders
              </p>
            </div>

            <Link
              href="/orders"
              className="shrink-0 text-sm font-semibold text-primary hover:underline"
            >
              {t("viewAll")}
            </Link>
          </div>

          {recentOrders.length === 0 ? (
            <div className="p-8 text-center sm:p-12">
              <ShoppingCart
                size={30}
                className="mx-auto text-muted-foreground"
              />
              <p className="mt-3 font-medium">{t("noData")}</p>
              <Link
                href="/orders/new"
                className="mt-4 inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground"
              >
                <Plus size={16} />
                {t("newOrder")}
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-border">
              {recentOrders.map((order) => (
                <div
                  key={order.id}
                  className="flex flex-col justify-between gap-3 p-5 transition hover:bg-muted/40 sm:flex-row sm:items-center"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold">
                      {order.customerName}
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {order.orderNumber} ·{" "}
                      {new Date(order.createdAt).toLocaleDateString("en-IN")}
                    </p>
                  </div>

                  <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end sm:gap-1">
                    <span className="font-semibold">{money(order.total)}</span>
                    <span className="rounded-full bg-muted px-2.5 py-1 text-xs capitalize text-muted-foreground">
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="rounded-2xl border border-border bg-card p-5 sm:p-6">
          <h2 className="font-semibold">{t("orderValue")}</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            All non-cancelled orders
          </p>

          <p className="mt-6 break-words text-3xl font-bold tracking-tight sm:text-4xl">
            {money(orderValue)}
          </p>

          <div className="mt-6 rounded-xl border border-[#D8B66A]/30 bg-[#D8B66A]/10 p-4">
            <p className="text-sm font-semibold">{t("pendingOrders")}</p>
            <p className="mt-1 text-sm text-muted-foreground">
              {pendingCount} orders need your attention.
            </p>
          </div>

          <Link
            href="/orders"
            className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
          >
            {t("orderHistory")}
            <ArrowUpRight size={16} />
          </Link>
        </div>
      </section>

      <section>
        <h2 className="mb-4 font-semibold">{t("quickActions")}</h2>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {[
            {
              title: t("addCustomer"),
              href: "/customers/new",
              icon: Users,
            },
            {
              title: t("addProduct"),
              href: "/products/new",
              icon: Package,
            },
            {
              title: t("newOrder"),
              href: "/orders/new",
              icon: ShoppingCart,
            },
          ].map(({ title, href, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-4 rounded-xl border border-border bg-card p-4 transition hover:border-[#A5BDA9] hover:bg-muted/50"
            >
              <span className="rounded-xl bg-accent p-3 text-accent-foreground">
                <Icon size={20} />
              </span>
              <span className="min-w-0 flex-1 text-sm font-semibold">
                {title}
              </span>
              <ArrowUpRight
                size={17}
                className="shrink-0 text-muted-foreground"
              />
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
