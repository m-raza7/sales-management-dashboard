import Link from "next/link";
import { ArrowLeft, Store, Sparkles, ShieldCheck } from "lucide-react";

import CustomerForm from "@/features/customers/CustomerForm";

export default function NewCustomerPage() {
  return (
    <section className="mx-auto w-full max-w-4xl space-y-6 text-foreground sm:space-y-8">
      {/* Page heading */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
        <div className="min-w-0">
          <Link
            href="/customers"
            className="mb-4 inline-flex items-center gap-2 rounded-lg text-sm font-medium text-muted-foreground transition hover:text-foreground"
          >
            <ArrowLeft size={16} />
            Back to customers
          </Link>

          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
            <Sparkles size={15} className="text-gold" />
            Sales management
          </div>

          <h1 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
            Add customer
          </h1>

          <p className="mt-2 max-w-xl text-sm leading-6 text-muted-foreground sm:text-base">
            Register a new shop, save the shopkeeper's details, and make the
            customer available when creating orders.
          </p>
        </div>

        <div className="flex h-12 w-12 shrink-0 items-center justify-center self-start rounded-2xl border border-border bg-primary/10 text-primary sm:h-14 sm:w-14">
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
            Customer information
          </p>

          <p className="mt-1 text-sm leading-6 text-muted-foreground">
            Enter accurate shop and contact details. Customer records are
            currently saved in this browser's local storage and are not
            automatically synced to other devices.
          </p>
        </div>
      </div>
    </section>
  );
}
