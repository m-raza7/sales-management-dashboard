import Link from "next/link";
import { ArrowLeft, ShoppingCart, Sparkles } from "lucide-react";
import OrderForm from "@/features/orders/OrderForm";

export default function NewOrderPage() {
  return (
    <section className="mx-auto w-full max-w-5xl space-y-6 text-foreground sm:space-y-8">
      {/* Page heading */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <Link
            href="/orders"
            className="mb-4 inline-flex items-center gap-2 rounded-lg text-sm font-medium text-muted-foreground transition hover:text-foreground"
          >
            <ArrowLeft size={16} />
            Back to orders
          </Link>

          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
            <Sparkles size={15} className="text-gold" />
            Sales management
          </div>

          <h1 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
            Create order
          </h1>

          <p className="mt-2 text-sm leading-6 text-muted-foreground sm:text-base">
            Select a shop, add products, review pricing, and save the order.
          </p>
        </div>

        <div className="flex h-12 w-12 shrink-0 items-center justify-center self-start rounded-2xl border border-border bg-primary/10 text-primary sm:h-14 sm:w-14">
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
          <p className="text-sm font-semibold text-foreground">Before saving</p>
          <p className="mt-1 text-sm leading-6 text-muted-foreground">
            Review the selected shop, product quantities, discounts, and final
            amount. Your order is stored locally in this browser.
          </p>
        </div>
      </div>
    </section>
  );
}
