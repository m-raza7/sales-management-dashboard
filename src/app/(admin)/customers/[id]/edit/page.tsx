"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, Store, Sparkles } from "lucide-react";

import CustomerForm from "@/features/customers/CustomerForm";
import type { Customer } from "@/features/customers/types";
import { getCustomers } from "@/features/customers/customer.service";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { translations } from "@/lib/i18n/translations";

export default function EditCustomerPage() {
  const params = useParams<{ id: string }>();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;

  const { language, mounted } = useLanguage();
  const t = translations[language];

  const [customer, setCustomer] = useState<Customer | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!mounted || !id) return;

    setReady(false);

    try {
      // Read the latest customer data from localStorage through the service.
      const customers = getCustomers();

      const found = customers.find((item) => String(item.id) === String(id));

      setCustomer(found ?? null);
    } catch (error) {
      console.error("Failed to load customer:", error);
      setCustomer(null);
    } finally {
      setReady(true);
    }
  }, [id, mounted]);

  if (!mounted || !ready) {
    return (
      <section className="mx-auto w-full max-w-3xl space-y-6">
        <div className="h-8 w-48 animate-pulse rounded-lg bg-muted" />
        <div className="h-64 animate-pulse rounded-2xl bg-muted" />
      </section>
    );
  }

  if (!customer) {
    return (
      <section className="mx-auto w-full max-w-3xl space-y-4 text-foreground">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <Store size={24} />
        </div>

        <h1 className="text-2xl font-bold tracking-tight">
          {t.customerNotFound}
        </h1>

        <p className="text-sm text-muted-foreground">
          The customer may have been deleted, or the link may contain an
          incorrect ID.
        </p>

        <Link
          href="/customers"
          className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
        >
          <ArrowLeft size={16} />
          {t.backToCustomers}
        </Link>
      </section>
    );
  }

  return (
    <section className="mx-auto w-full max-w-3xl space-y-6 text-foreground sm:space-y-8">
      <div>
        <Link
          href="/customers"
          className="mb-4 inline-flex items-center gap-2 rounded-lg text-sm font-medium text-muted-foreground transition hover:text-foreground"
        >
          <ArrowLeft size={16} />
          {t.backToCustomers}
        </Link>

        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
          <Sparkles size={15} className="text-gold" />
          {t.salesManagement}
        </div>

        <h1 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
          {t.editCustomer}
        </h1>

        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          {t.editCustomerDescription}
        </p>
      </div>

      <div className="rounded-2xl border border-border bg-card p-4 text-card-foreground shadow-sm sm:p-6 lg:p-8">
        <CustomerForm customer={customer} />
      </div>
    </section>
  );
}
