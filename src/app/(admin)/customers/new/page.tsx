"use client";

import Link from "next/link";
import { ArrowLeft, Store, Sparkles, ShieldCheck } from "lucide-react";

import CustomerForm from "@/features/customers/CustomerForm";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { translations } from "@/lib/i18n/translations";

export default function NewCustomerPage() {
  const { language, mounted } = useLanguage();
  const t = translations[language];

  if (!mounted) {
    return (
      <section className="mx-auto w-full max-w-4xl space-y-6">
        <div className="h-24 animate-pulse rounded-2xl bg-muted" />
        <div className="h-96 animate-pulse rounded-2xl bg-muted" />
      </section>
    );
  }

  return (
    <section className="mx-auto w-full space-y-6 text-foreground sm:space-y-8">
      {/* Page heading */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
        <div className="min-w-0">
          <Link
            href="/customers"
            className="mb-4 hidden items-center gap-2 rounded-lg text-sm font-medium text-muted-foreground transition hover:text-foreground sm:inline-flex"
          >
            <ArrowLeft size={16} />
            {t.backToCustomers}
          </Link>

          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
            <Sparkles size={15} className="text-gold" />
            {t.salesManagement}
          </div>

          <h1 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
            {t.addCustomer}
          </h1>

          <p className="mt-2 max-w-xl text-sm leading-6 text-muted-foreground sm:text-base">
            {t.addCustomerDescription}
          </p>
        </div>

        <div className="hidden h-12 w-12 shrink-0 items-center justify-center self-start rounded-2xl border border-border bg-primary/10 text-primary lg:flex lg:h-14 lg:w-14">
          <Store size={25} />
        </div>
      </div>

      {/* Customer form */}
      <div className="rounded-2xl border border-border bg-card p-4 text-card-foreground shadow-sm sm:p-6 lg:p-8">
        <CustomerForm />
      </div>

      {/* Information note */}
      <div className="flex items-start gap-3 rounded-xl border border-[#D8B66A]/30 bg-[#D8B66A]/10 p-4">
        <ShieldCheck
          size={19}
          className="mt-0.5 shrink-0 text-[#A47D27] dark:text-[#E4C57D]"
        />

        <div>
          <p className="text-sm font-semibold text-foreground">
            {t.customerInformation}
          </p>

          <p className="mt-1 text-sm leading-6 text-muted-foreground">
            {t.customerInformationDescription}
          </p>
        </div>
      </div>
    </section>
  );
}
