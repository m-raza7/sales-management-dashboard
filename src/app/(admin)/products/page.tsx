"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  Package,
  Plus,
  Search,
  Pencil,
  Trash2,
  X,
  Tag,
  Boxes,
} from "lucide-react";

import type { Product } from "@/features/products/types";
import {
  deleteProduct,
  getProducts,
} from "@/features/products/product.service";

import { useLanguage } from "@/components/providers/LanguageProvider";
import { translations } from "@/lib/i18n/translations";

export default function ProductsPage() {
  const { language, mounted } = useLanguage();
  const t = translations[language];

  const searchParams = useSearchParams();
  const highlightId = searchParams.get("highlight");

  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [ready, setReady] = useState(false);
  const [highlightedId, setHighlightedId] = useState<string | null>(null);

  const rowRefs = useRef<Map<string, HTMLTableRowElement>>(new Map());
  const highlightTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Format currency according to the selected language.
  const money = useCallback(
    (value: number) =>
      new Intl.NumberFormat(
        language === "mr" ? "mr-IN" : language === "hi" ? "hi-IN" : "en-IN",
        {
          style: "currency",
          currency: "INR",
          maximumFractionDigits: 2,
        },
      ).format(value),
    [language],
  );

  const loadProducts = useCallback(() => {
    setProducts(getProducts());
    setReady(true);
  }, []);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  // Find the requested product and highlight its row.
  useEffect(() => {
    if (!ready || !highlightId) {
      setHighlightedId(null);
      return;
    }

    const exists = products.some(
      (product) => String(product.id) === String(highlightId),
    );

    if (!exists) {
      setHighlightedId(null);
      return;
    }

    setSearch("");
    setHighlightedId(String(highlightId));

    // Wait for the matching table row to render.
    const frame = requestAnimationFrame(() => {
      const row = rowRefs.current.get(String(highlightId));

      row?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    });

    if (highlightTimer.current) {
      clearTimeout(highlightTimer.current);
    }

    highlightTimer.current = setTimeout(() => {
      setHighlightedId(null);
      highlightTimer.current = null;
    }, 5000);

    return () => {
      cancelAnimationFrame(frame);

      if (highlightTimer.current) {
        clearTimeout(highlightTimer.current);
        highlightTimer.current = null;
      }
    };
  }, [ready, highlightId, products]);

  useEffect(() => {
    return () => {
      if (highlightTimer.current) {
        clearTimeout(highlightTimer.current);
      }
    };
  }, []);

  function handleDelete(product: Product) {
    const confirmMessage = t.deleteProductConfirm.replace(
      "{name}",
      product.name,
    );

    if (!window.confirm(confirmMessage)) return;

    deleteProduct(product.id);
    loadProducts();
  }

  const query = search.trim().toLowerCase();

  const filteredProducts = products.filter((product) =>
    [
      product.name,
      product.sku,
      product.category,
      product.brand,
      product.size,
      product.unit,
    ].some((value) =>
      String(value ?? "")
        .toLowerCase()
        .includes(query),
    ),
  );

  const activeCount = products.filter((product) => product.active).length;
  const inactiveCount = products.length - activeCount;

  // Prevent displaying the wrong language before the provider mounts.
  if (!mounted) {
    return (
      <div className="min-w-0 space-y-6 text-foreground">
        <div className="h-24 animate-pulse rounded-2xl bg-muted" />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
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
            <Package size={15} className="text-gold" />
            {t.salesManagement}
          </div>

          <h1 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
            {t.products}
          </h1>

          <p className="mt-2 text-sm text-muted-foreground sm:text-base">
            {t.productsDescription}
          </p>
        </div>

        <Link
          href="/products/new"
          className="inline-flex min-h-11 w-fit shrink-0 items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          <Plus size={18} />
          {t.addProduct}
        </Link>
      </section>

      {/* Summary cards */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                {t.totalProducts}
              </p>
              <p className="mt-3 text-3xl font-bold">
                {ready ? products.length : "—"}
              </p>
            </div>

            <div className="rounded-2xl bg-primary/10 p-3 text-primary">
              <Package size={23} />
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                {t.activeProducts}
              </p>
              <p className="mt-3 text-3xl font-bold">
                {ready ? activeCount : "—"}
              </p>
            </div>

            <div className="rounded-2xl bg-emerald-500/10 p-3 text-emerald-700 dark:text-emerald-300">
              <Boxes size={23} />
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                {t.inactiveProducts}
              </p>
              <p className="mt-3 text-3xl font-bold">
                {ready ? inactiveCount : "—"}
              </p>
            </div>

            <div className="rounded-2xl bg-[#D8B66A]/15 p-3 text-[#A47D27] dark:text-[#E4C57D]">
              <Tag size={23} />
            </div>
          </div>
        </div>
      </section>

      {/* Product catalogue */}
      <section className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
        <div className="flex flex-col justify-between gap-4 border-b border-border p-4 sm:flex-row sm:items-center sm:p-5">
          <div>
            <h2 className="text-base font-semibold">{t.productCatalogue}</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {t.catalogueDescription}
            </p>
          </div>

          <div className="relative w-full sm:max-w-sm">
            <Search
              size={18}
              aria-hidden="true"
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            />

            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder={t.searchProductPlaceholder}
              aria-label={t.searchProducts}
              className="h-11 w-full rounded-xl border border-border bg-background pl-10 pr-10 text-sm text-foreground outline-none transition placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring/20"
            />

            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                aria-label={t.clearSearch}
                title={t.clearSearch}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition hover:text-foreground"
              >
                <X size={16} />
              </button>
            )}
          </div>
        </div>

        {!ready ? (
          <div className="p-10 text-center text-sm text-muted-foreground">
            {t.loadingProducts}
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="px-5 py-14 text-center sm:py-16">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              {search ? <Search size={25} /> : <Package size={25} />}
            </div>

            <h3 className="mt-4 text-base font-semibold">
              {search ? t.noProductsFound : t.noProductsYet}
            </h3>

            <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-muted-foreground">
              {search ? t.tryAnotherProduct : t.addFirstProductDescription}
            </p>

            {search ? (
              <button
                type="button"
                onClick={() => setSearch("")}
                className="mt-5 rounded-xl border border-border px-4 py-2.5 text-sm font-medium transition hover:bg-muted"
              >
                {t.clearSearch}
              </button>
            ) : (
              <Link
                href="/products/new"
                className="mt-5 inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
              >
                <Plus size={17} />
                {t.addFirstProduct}
              </Link>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[850px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/60">
                  <th className="px-5 py-4 font-semibold text-muted-foreground">
                    {t.product}
                  </th>
                  <th className="px-5 py-4 font-semibold text-muted-foreground">
                    {t.sku}
                  </th>
                  <th className="px-5 py-4 font-semibold text-muted-foreground">
                    {t.category}
                  </th>
                  <th className="px-5 py-4 font-semibold text-muted-foreground">
                    {t.sizeUnit}
                  </th>
                  <th className="px-5 py-4 font-semibold text-muted-foreground">
                    {t.price}
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
                {filteredProducts.map((product) => {
                  const productId = String(product.id);
                  const isHighlighted = highlightedId === productId;

                  return (
                    <tr
                      key={productId}
                      ref={(node) => {
                        if (node) {
                          rowRefs.current.set(productId, node);
                        } else {
                          rowRefs.current.delete(productId);
                        }
                      }}
                      className={
                        isHighlighted
                          ? "search-result-highlight"
                          : "transition-colors hover:bg-muted/40"
                      }
                    >
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 font-semibold text-primary">
                            {product.name.trim().charAt(0).toUpperCase() || "P"}
                          </div>

                          <div className="min-w-0">
                            <p
                              className={`max-w-[220px] truncate font-semibold ${
                                isHighlighted
                                  ? "text-amber-700 dark:text-amber-300"
                                  : "text-foreground"
                              }`}
                            >
                              {product.name}
                            </p>
                            <p className="mt-1 max-w-[220px] truncate text-xs text-muted-foreground">
                              {product.brand || t.noBrand}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-5 py-4 text-foreground">
                        {product.sku || "—"}
                      </td>

                      <td className="px-5 py-4 text-foreground">
                        {product.category || "—"}
                      </td>

                      <td className="px-5 py-4 text-foreground">
                        {[product.size, product.unit]
                          .filter(Boolean)
                          .join(" / ") || "—"}
                      </td>

                      <td className="px-5 py-4 font-semibold text-foreground">
                        {money(product.price)}
                      </td>

                      <td className="px-5 py-4">
                        <span
                          className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold ${
                            product.active
                              ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
                              : "bg-muted text-muted-foreground"
                          }`}
                        >
                          <span
                            className={`h-1.5 w-1.5 rounded-full ${
                              product.active ? "bg-emerald-500" : "bg-gray-400"
                            }`}
                          />
                          {product.active ? t.active : t.inactive}
                        </span>
                      </td>

                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2">
                          <Link
                            href={`/products/${encodeURIComponent(productId)}`}
                            aria-label={`${t.edit} ${product.name}`}
                            title={t.editProductAction}
                            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-background text-muted-foreground transition hover:border-ring hover:bg-primary/10 hover:text-primary"
                          >
                            <Pencil size={15} />
                          </Link>

                          <button
                            type="button"
                            onClick={() => handleDelete(product)}
                            aria-label={`${t.delete} ${product.name}`}
                            title={t.deleteProductAction}
                            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-background text-muted-foreground transition hover:border-red-500/40 hover:bg-red-500/10 hover:text-red-500"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {ready && filteredProducts.length > 0 && (
          <div className="flex flex-col gap-2 border-t border-border bg-muted/30 px-5 py-4 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
            <span>
              {t.showing} {filteredProducts.length} {t.of} {products.length}{" "}
              {t.productsCount}
            </span>
            <span>{t.localStorageNotice}</span>
          </div>
        )}
      </section>
    </div>
  );
}
