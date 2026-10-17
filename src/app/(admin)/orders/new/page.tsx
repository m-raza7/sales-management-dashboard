"use client";

import Link from "next/link";
import { ArrowLeft, ShoppingCart, Sparkles } from "lucide-react";
import OrderForm from "@/features/orders/OrderForm";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { translations } from "@/lib/i18n/translations";

export default function NewOrderPage() {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <div>
      <section className="mx-auto w-full max-w-5xl space-y-6 text-foreground sm:space-y-8">
        {/* Page heading */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <Link
              href="/orders"
              className="mb-4 hidden items-center gap-2 rounded-lg text-sm font-medium text-muted-foreground transition hover:text-foreground lg:inline-flex"
            >
              <ArrowLeft size={16} />
              {t.backToOrders}
            </Link>

            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              <Sparkles size={15} className="text-gold" />
              {t.salesManagement}
            </div>

            <h1 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
              {t.createOrder}
            </h1>

            <p className="mt-2 text-sm leading-6 text-muted-foreground sm:text-base">
              {t.createOrderDescription}
            </p>
          </div>

          <div className="hidden h-12 w-12 shrink-0 items-center justify-center self-start rounded-2xl border border-border bg-primary/10 text-primary lg:flex lg:h-14 lg:w-14">
            <ShoppingCart size={25} />
          </div>
        </div>

        {/* Order form */}
        <div className="rounded-2xl border border-border bg-card p-4 text-card-foreground shadow-sm sm:p-6 lg:p-8">
          <OrderForm />
        </div>

        {/* Helper note */}
        <div className="flex items-start gap-3 rounded-xl border border-[#D8B66A]/30 bg-[#D8B66A]/10 p-4">
          <ShoppingCart
            size={18}
            className="mt-0.5 shrink-0 text-[#A47D27] dark:text-[#E4C57D]"
          />

          <div>
            <p className="text-sm font-semibold text-foreground">
              {t.beforeSaving}
            </p>

            <p className="mt-1 text-sm leading-6 text-muted-foreground">
              {t.beforeSavingDescription}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
