"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  Package,
  Pencil,
  AlertCircle,
  LoaderCircle,
  Sparkles,
} from "lucide-react";

import ProductForm from "@/features/products/ProductForm";
import type { Product } from "@/features/products/types";
import { getProducts } from "@/features/products/product.service";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { translations } from "@/lib/i18n/translations";

export default function EditProductPage() {
  const { id } = useParams<{ id: string }>();
  const { language, mounted } = useLanguage();
  const t = translations[language];

  const [product, setProduct] = useState<Product | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!mounted) return;

    setReady(false);

    try {
      const foundProduct = getProducts().find((item) => item.id === id) ?? null;

      setProduct(foundProduct);
    } catch {
      setProduct(null);
    } finally {
      setReady(true);
    }
  }, [id, mounted]);

  const backLinkClass =
    "inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition hover:text-foreground";

  if (!mounted || !ready) {
    return (
      <section className="mx-auto w-full max-w-4xl space-y-6">
        <div className="flex items-center gap-3">
          <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Package size={21} />
          </div>

          <div>
            <div className="h-5 w-36 animate-pulse rounded bg-muted" />
            <div className="mt-2 h-3 w-52 max-w-full animate-pulse rounded bg-muted" />
          </div>
        </div>

        <div className="flex min-h-52 flex-col items-center justify-center gap-3 rounded-2xl border border-border bg-card p-6 text-center">
          <LoaderCircle size={28} className="animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">
            {t.loadingProductDetails}
          </p>
        </div>
      </section>
    );
  }

  if (!product) {
    return (
      <section className="mx-auto w-full max-w-3xl space-y-6">
        <Link href="/products" className={backLinkClass}>
          <ArrowLeft size={16} />
          {t.backToProducts}
        </Link>

        <div className="rounded-2xl border border-border bg-card p-6 text-center shadow-sm sm:p-10">
          <div className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-[var(--danger)]/10 text-[var(--danger)]">
            <AlertCircle size={30} />
          </div>

          <h1 className="mt-5 text-xl font-bold tracking-tight text-foreground sm:text-2xl">
            {t.productNotFound}
          </h1>

          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted-foreground">
            {t.productNotFoundDescription}
          </p>

          <Link
            href="/products"
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90 sm:w-auto"
          >
            <Package size={17} />
            {t.viewProducts}
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto w-full max-w-4xl min-w-0 space-y-6 text-foreground sm:space-y-8">
      {/* Page heading */}
      <div className="space-y-4">
        <Link href="/products" className={backLinkClass}>
          <ArrowLeft size={16} />
          {t.backToProducts}
        </Link>

        <div className="flex min-w-0 flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex min-w-0 items-start gap-3">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <Pencil size={22} />
            </div>

            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                  {t.editProduct}
                </h1>

                <span className="inline-flex items-center gap-1 rounded-full border border-border bg-background px-2.5 py-1 text-xs font-medium text-muted-foreground">
                  <Sparkles size={12} className="text-[var(--gold)]" />
                  {t.catalogue}
                </span>
              </div>

              <p className="mt-2 text-sm leading-6 text-muted-foreground sm:text-base">
                {t.editProductDescription}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Product summary */}
      <div className="flex min-w-0 items-center gap-3 rounded-2xl border border-border bg-card p-4 shadow-sm sm:p-5">
        <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-muted text-primary">
          <Package size={21} />
        </div>

        <div className="min-w-0 flex-1">
          <p className="truncate font-semibold text-card-foreground">
            {product.name}
          </p>

          <p className="mt-1 truncate text-xs text-muted-foreground sm:text-sm">
            {product.sku
              ? `${t.skuLabel}: ${product.sku}`
              : t.noProductCodeAssigned}
            {product.category ? ` · ${product.category}` : ""}
          </p>
        </div>

        <span
          className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold ${
            product.active
              ? "bg-[var(--success)]/10 text-[var(--success)]"
              : "bg-muted text-muted-foreground"
          }`}
        >
          {product.active ? t.active : t.inactive}
        </span>
      </div>

      {/* Reusable form */}
      <ProductForm product={product} />
    </section>
  );
}
