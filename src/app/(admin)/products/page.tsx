"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
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

const money = (value: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(value);

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [ready, setReady] = useState(false);

  const loadProducts = useCallback(() => {
    setProducts(getProducts());
    setReady(true);
  }, []);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  function handleDelete(product: Product) {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${product.name}"?`,
    );

    if (!confirmed) return;

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
    ].some((value) => value.toLowerCase().includes(query)),
  );

  const activeCount = products.filter((product) => product.active).length;
  const inactiveCount = products.length - activeCount;

  return (
    <div className="min-w-0 space-y-6 text-foreground sm:space-y-8">
      {/* Page heading */}
      <section className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div className="min-w-0">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
            <Package size={15} className="text-gold" />
            Sales management
          </div>

          <h1 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
            Products
          </h1>

          <p className="mt-2 text-sm text-muted-foreground sm:text-base">
            Manage products, packaging and selling prices.
          </p>
        </div>

        <Link
          href="/products/new"
          className="inline-flex min-h-11 w-fit shrink-0 items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          <Plus size={18} />
          Add product
        </Link>
      </section>

      {/* Summary cards */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Total products
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
                Active products
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
                Inactive products
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
            <h2 className="text-base font-semibold">Product catalogue</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Manage product information and selling prices.
            </p>
          </div>

          <div className="relative w-full sm:max-w-sm">
            <Search
              size={18}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            />

            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search product, SKU, brand or category..."
              aria-label="Search products"
              className="h-11 w-full rounded-xl border border-border bg-background pl-10 pr-10 text-sm text-foreground outline-none transition placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring/20"
            />

            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                aria-label="Clear product search"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition hover:text-foreground"
              >
                <X size={16} />
              </button>
            )}
          </div>
        </div>

        {!ready ? (
          <div className="p-10 text-center text-sm text-muted-foreground">
            Loading products...
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="px-5 py-14 text-center sm:py-16">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              {search ? <Search size={25} /> : <Package size={25} />}
            </div>

            <h3 className="mt-4 text-base font-semibold">
              {search ? "No products found" : "No products yet"}
            </h3>

            <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-muted-foreground">
              {search
                ? "Try another product name, SKU, brand or category."
                : "Add your first product to start building your catalogue."}
            </p>

            {search ? (
              <button
                type="button"
                onClick={() => setSearch("")}
                className="mt-5 rounded-xl border border-border px-4 py-2.5 text-sm font-medium transition hover:bg-muted"
              >
                Clear search
              </button>
            ) : (
              <Link
                href="/products/new"
                className="mt-5 inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
              >
                <Plus size={17} />
                Add your first product
              </Link>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[850px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/60">
                  <th className="px-5 py-4 font-semibold text-muted-foreground">
                    Product
                  </th>
                  <th className="px-5 py-4 font-semibold text-muted-foreground">
                    SKU
                  </th>
                  <th className="px-5 py-4 font-semibold text-muted-foreground">
                    Category
                  </th>
                  <th className="px-5 py-4 font-semibold text-muted-foreground">
                    Size / Unit
                  </th>
                  <th className="px-5 py-4 font-semibold text-muted-foreground">
                    Price
                  </th>
                  <th className="px-5 py-4 font-semibold text-muted-foreground">
                    Status
                  </th>
                  <th className="px-5 py-4 font-semibold text-muted-foreground">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-border">
                {filteredProducts.map((product) => (
                  <tr
                    key={product.id}
                    className="transition-colors hover:bg-muted/40"
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 font-semibold text-primary">
                          {product.name.trim().charAt(0).toUpperCase() || "P"}
                        </div>

                        <div className="min-w-0">
                          <p className="max-w-[220px] truncate font-semibold text-foreground">
                            {product.name}
                          </p>
                          <p className="mt-1 max-w-[220px] truncate text-xs text-muted-foreground">
                            {product.brand || "No brand specified"}
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
                        {product.active ? "Active" : "Inactive"}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/products/${product.id}/edit`}
                          aria-label={`Edit ${product.name}`}
                          title="Edit product"
                          className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-background text-muted-foreground transition hover:border-ring hover:bg-primary/10 hover:text-primary"
                        >
                          <Pencil size={15} />
                        </Link>

                        <button
                          type="button"
                          onClick={() => handleDelete(product)}
                          aria-label={`Delete ${product.name}`}
                          title="Delete product"
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

        {ready && filteredProducts.length > 0 && (
          <div className="flex flex-col gap-2 border-t border-border bg-muted/30 px-5 py-4 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
            <span>
              Showing {filteredProducts.length} of {products.length} products
            </span>
            <span>Product information is saved in this browser.</span>
          </div>
        )}
      </section>
    </div>
  );
}
