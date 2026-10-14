"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import {
  Package,
  Tag,
  Building2,
  Ruler,
  IndianRupee,
  FileText,
  CheckCircle2,
  ArrowLeft,
  Save,
  Sparkles,
} from "lucide-react";

import type { Product } from "./types";
import { addProduct, updateProduct } from "./product.service";

type ProductFields = Omit<Product, "id" | "createdAt">;

const initialForm: ProductFields = {
  name: "",
  sku: "",
  category: "",
  brand: "",
  size: "",
  unit: "piece",
  price: 0,
  description: "",
  active: true,
};

const inputClass =
  "w-full min-w-0 rounded-xl border border-border bg-background px-3.5 py-3 text-sm text-foreground outline-none transition placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring/20";

const labelClass =
  "block min-w-0 space-y-2 text-sm font-medium text-foreground";

const units = [
  { value: "piece", label: "Piece" },
  { value: "box", label: "Box" },
  { value: "bottle", label: "Bottle" },
  { value: "can", label: "Can" },
  { value: "litre", label: "Litre" },
  { value: "kg", label: "Kilogram" },
  { value: "packet", label: "Packet" },
  { value: "dozen", label: "Dozen" },
];

export default function ProductForm({ product }: { product?: Product }) {
  const router = useRouter();

  const [form, setForm] = useState<ProductFields>(initialForm);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!product) return;

    const { id: _id, createdAt: _createdAt, ...fields } = product;

    setForm(fields);
  }, [product]);

  function updateField<K extends keyof ProductFields>(
    field: K,
    value: ProductFields[K],
  ) {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    const name = form.name.trim();
    const price = Number(form.price);

    if (!name) {
      setError("Product name is required.");
      return;
    }

    if (!Number.isFinite(price) || price < 0) {
      setError("Please enter a valid, non-negative selling price.");
      return;
    }

    const data: ProductFields = {
      ...form,
      name,
      sku: form.sku.trim(),
      category: form.category.trim(),
      brand: form.brand.trim(),
      size: form.size.trim(),
      description: form.description.trim(),
      price,
    };

    try {
      setSaving(true);

      if (product) {
        updateProduct(product.id, data);
      } else {
        addProduct(data);
      }

      router.push("/products");
      router.refresh();
    } catch {
      setError("Unable to save the product. Please try again.");
      setSaving(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="min-w-0 space-y-6 rounded-2xl border border-border bg-card p-4 text-card-foreground shadow-sm sm:p-6 lg:p-8"
    >
      {/* Form heading */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex min-w-0 items-start gap-3">
          <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <Package size={23} />
          </div>

          <div className="min-w-0">
            <h2 className="text-lg font-bold tracking-tight sm:text-xl">
              {product ? "Edit product" : "Product details"}
            </h2>

            <p className="mt-1 text-sm leading-6 text-muted-foreground">
              {product
                ? "Update your product information and catalogue settings."
                : "Add a new product with its pricing, packaging, and availability."}
            </p>
          </div>
        </div>

        <div className="inline-flex w-fit items-center gap-2 rounded-full border border-border bg-background px-3 py-1.5 text-xs font-medium text-muted-foreground">
          <Sparkles size={14} className="text-[var(--gold)]" />
          Product catalogue
        </div>
      </div>

      <div className="h-px bg-border" />

      {/* Error message */}
      {error && (
        <div
          role="alert"
          className="flex items-start gap-3 rounded-xl border border-[var(--danger)]/30 bg-[var(--danger)]/10 p-4 text-sm text-[var(--danger)]"
        >
          <span className="font-semibold">!</span>
          <p>{error}</p>
        </div>
      )}

      {/* Basic information */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <Tag size={17} className="text-primary" />
          <h3 className="text-sm font-semibold">Basic information</h3>
        </div>

        <div className="grid min-w-0 grid-cols-1 gap-5 sm:grid-cols-2">
          <label className={labelClass}>
            Product name <span className="text-[var(--danger)]">*</span>
            <input
              className={inputClass}
              value={form.name}
              onChange={(e) => updateField("name", e.target.value)}
              required
              maxLength={120}
              placeholder="Interior Wall Paint"
              autoComplete="off"
            />
          </label>

          <label className={labelClass}>
            SKU / Product code
            <input
              className={inputClass}
              value={form.sku}
              onChange={(e) => updateField("sku", e.target.value)}
              maxLength={60}
              placeholder="PAINT-001"
              autoComplete="off"
            />
          </label>

          <label className={labelClass}>
            Category
            <input
              className={inputClass}
              value={form.category}
              onChange={(e) => updateField("category", e.target.value)}
              maxLength={80}
              placeholder="Paint, beverages, hardware..."
            />
          </label>

          <label className={labelClass}>
            <span className="flex items-center gap-2">
              <Building2 size={15} className="text-muted-foreground" />
              Brand
            </span>

            <input
              className={inputClass}
              value={form.brand}
              onChange={(e) => updateField("brand", e.target.value)}
              maxLength={80}
              placeholder="Brand name"
            />
          </label>
        </div>
      </section>

      <div className="h-px bg-border" />

      {/* Pricing and packaging */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <IndianRupee size={17} className="text-primary" />
          <h3 className="text-sm font-semibold">Pricing and packaging</h3>
        </div>

        <div className="grid min-w-0 grid-cols-1 gap-5 sm:grid-cols-2">
          <label className={labelClass}>
            <span className="flex items-center gap-2">
              <Ruler size={15} className="text-muted-foreground" />
              Size / packaging
            </span>

            <input
              className={inputClass}
              value={form.size}
              onChange={(e) => updateField("size", e.target.value)}
              maxLength={80}
              placeholder="1 litre, 20 litre, 250 ml..."
            />
          </label>

          <label className={labelClass}>
            Unit
            <select
              className={`${inputClass} dark:[color-scheme:dark]`}
              value={form.unit}
              onChange={(e) => updateField("unit", e.target.value)}
            >
              {units.map((unit) => (
                <option key={unit.value} value={unit.value}>
                  {unit.label}
                </option>
              ))}
            </select>
          </label>

          <label className={labelClass}>
            Selling price (₹) <span className="text-[var(--danger)]">*</span>
            <div className="relative">
              <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-sm font-semibold text-muted-foreground">
                ₹
              </span>

              <input
                className={`${inputClass} pl-8`}
                type="number"
                min="0"
                step="0.01"
                inputMode="decimal"
                value={form.price}
                onChange={(e) =>
                  updateField(
                    "price",
                    e.target.value === "" ? 0 : Number(e.target.value),
                  )
                }
                required
                placeholder="0.00"
              />
            </div>
            <span className="text-xs font-normal text-muted-foreground">
              Enter the selling price per selected unit.
            </span>
          </label>

          <div className="flex min-w-0 items-start sm:items-end">
            <label className="flex w-full cursor-pointer items-start gap-3 rounded-xl border border-border bg-background p-4 transition hover:border-ring/60">
              <input
                type="checkbox"
                checked={form.active}
                onChange={(e) => updateField("active", e.target.checked)}
                className="mt-0.5 size-4 shrink-0 accent-[var(--success)]"
              />

              <span className="min-w-0">
                <span className="flex items-center gap-2 text-sm font-semibold">
                  <CheckCircle2
                    size={16}
                    className={
                      form.active
                        ? "text-[var(--success)]"
                        : "text-muted-foreground"
                    }
                  />
                  Available for orders
                </span>

                <span className="mt-1 block text-xs leading-5 text-muted-foreground">
                  {form.active
                    ? "Customers can order this product."
                    : "This product will be unavailable for new orders."}
                </span>
              </span>
            </label>
          </div>
        </div>
      </section>

      <div className="h-px bg-border" />

      {/* Description */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <FileText size={17} className="text-primary" />
          <h3 className="text-sm font-semibold">Additional details</h3>
        </div>

        <label className={labelClass}>
          Description{" "}
          <span className="font-normal text-muted-foreground">(optional)</span>
          <textarea
            className={`${inputClass} min-h-28 resize-y`}
            rows={4}
            value={form.description}
            onChange={(e) => updateField("description", e.target.value)}
            maxLength={1000}
            placeholder="Describe the product, its features, or other useful details..."
          />
          <span className="text-right text-xs font-normal text-muted-foreground">
            {form.description.length}/1000 characters
          </span>
        </label>
      </section>

      {/* Actions */}
      <div className="flex flex-col-reverse gap-3 border-t border-border pt-5 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="button"
          onClick={() => router.push("/products")}
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-background px-5 py-3 text-sm font-semibold text-foreground transition hover:bg-muted sm:w-auto"
        >
          <ArrowLeft size={16} />
          Cancel
        </button>

        <button
          type="submit"
          disabled={saving}
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
        >
          <Save size={17} />
          {saving ? "Saving..." : product ? "Save changes" : "Save product"}
        </button>
      </div>
    </form>
  );
}
