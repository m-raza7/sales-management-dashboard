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
import { useLanguage } from "@/components/providers/LanguageProvider";
import { translations } from "@/lib/i18n/translations";

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

const unitKeys = [
  { value: "piece", key: "productFormUnitPiece" },
  { value: "box", key: "productFormUnitBox" },
  { value: "bottle", key: "productFormUnitBottle" },
  { value: "can", key: "productFormUnitCan" },
  { value: "litre", key: "productFormUnitLitre" },
  { value: "kg", key: "productFormUnitKilogram" },
  { value: "packet", key: "productFormUnitPacket" },
  { value: "dozen", key: "productFormUnitDozen" },
] as const;

export default function ProductForm({ product }: { product?: Product }) {
  const router = useRouter();
  const { language, mounted } = useLanguage();
  const t = translations[language];

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

    if (error) setError("");
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    const name = form.name.trim();
    const price = Number(form.price);

    if (!name) {
      setError(t.productFormNameRequired);
      return;
    }

    if (!Number.isFinite(price) || price < 0) {
      setError(t.productFormInvalidPrice);
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
      setError(t.productFormSaveError);
      setSaving(false);
    }
  }

  if (!mounted) {
    return (
      <div className="min-h-96 animate-pulse rounded-2xl border border-border bg-card" />
    );
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
              {product ? t.productFormEditProduct : t.productFormDetails}
            </h2>

            <p className="mt-1 text-sm leading-6 text-muted-foreground">
              {product
                ? t.productFormEditDescription
                : t.productFormAddDescription}
            </p>
          </div>
        </div>

        <div className="inline-flex w-fit items-center gap-2 rounded-full border border-border bg-background px-3 py-1.5 text-xs font-medium text-muted-foreground">
          <Sparkles size={14} className="text-[var(--gold)]" />
          {t.productFormCatalogue}
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
          <h3 className="text-sm font-semibold">
            {t.productFormBasicInformation}
          </h3>
        </div>

        <div className="grid min-w-0 grid-cols-1 gap-5 sm:grid-cols-2">
          <label className={labelClass}>
            {t.productFormName}
            <span className="text-[var(--danger)]">*</span>
            <input
              className={inputClass}
              value={form.name}
              onChange={(e) => updateField("name", e.target.value)}
              required
              maxLength={120}
              placeholder={t.productFormNamePlaceholder}
              autoComplete="off"
            />
          </label>

          <label className={labelClass}>
            {t.productFormSku}
            <input
              className={inputClass}
              value={form.sku}
              onChange={(e) => updateField("sku", e.target.value)}
              maxLength={60}
              placeholder={t.productFormSkuPlaceholder}
              autoComplete="off"
            />
          </label>

          <label className={labelClass}>
            {t.productFormCategory}
            <input
              className={inputClass}
              value={form.category}
              onChange={(e) => updateField("category", e.target.value)}
              maxLength={80}
              placeholder={t.productFormCategoryPlaceholder}
            />
          </label>

          <label className={labelClass}>
            <span className="flex items-center gap-2">
              <Building2 size={15} className="text-muted-foreground" />
              {t.productFormBrand}
            </span>

            <input
              className={inputClass}
              value={form.brand}
              onChange={(e) => updateField("brand", e.target.value)}
              maxLength={80}
              placeholder={t.productFormBrandPlaceholder}
            />
          </label>
        </div>
      </section>

      <div className="h-px bg-border" />

      {/* Pricing and packaging */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <IndianRupee size={17} className="text-primary" />
          <h3 className="text-sm font-semibold">
            {t.productFormPricingPackaging}
          </h3>
        </div>

        <div className="grid min-w-0 grid-cols-1 gap-5 sm:grid-cols-2">
          <label className={labelClass}>
            <span className="flex items-center gap-2">
              <Ruler size={15} className="text-muted-foreground" />
              {t.productFormSize}
            </span>

            <input
              className={inputClass}
              value={form.size}
              onChange={(e) => updateField("size", e.target.value)}
              maxLength={80}
              placeholder={t.productFormSizePlaceholder}
            />
          </label>

          <label className={labelClass}>
            {t.productFormUnit}
            <select
              className={`${inputClass} dark:[color-scheme:dark]`}
              value={form.unit}
              onChange={(e) => updateField("unit", e.target.value)}
            >
              {unitKeys.map((unit) => (
                <option key={unit.value} value={unit.value}>
                  {t[unit.key]}
                </option>
              ))}
            </select>
          </label>

          <label className={labelClass}>
            <span>
              {t.productFormSellingPrice}{" "}
              <span className="text-[var(--danger)]">*</span>
            </span>

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
              {t.productFormPriceHint}
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
                  {t.productFormAvailable}
                </span>

                <span className="mt-1 block text-xs leading-5 text-muted-foreground">
                  {form.active
                    ? t.productFormActiveDescription
                    : t.productFormInactiveDescription}
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
          <h3 className="text-sm font-semibold">
            {t.productFormAdditionalDetails}
          </h3>
        </div>

        <label className={labelClass}>
          <span>
            {t.productFormDescription}{" "}
            <span className="font-normal text-muted-foreground">
              ({t.productFormOptional})
            </span>
          </span>

          <textarea
            className={`${inputClass} min-h-28 resize-y`}
            rows={4}
            value={form.description}
            onChange={(e) => updateField("description", e.target.value)}
            maxLength={1000}
            placeholder={t.productFormDescriptionPlaceholder}
          />

          <span className="text-right text-xs font-normal text-muted-foreground">
            {form.description.length}/1000 {t.productFormCharacters}
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
          {t.productFormCancel}
        </button>

        <button
          type="submit"
          disabled={saving}
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
        >
          <Save size={17} />
          {saving
            ? t.productFormSaving
            : product
              ? t.productFormSaveChanges
              : t.productFormSaveProduct}
        </button>
      </div>
    </form>
  );
}
