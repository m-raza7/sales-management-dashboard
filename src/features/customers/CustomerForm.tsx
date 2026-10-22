"use client";

import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import {
  Store,
  UserRound,
  Phone,
  Mail,
  MapPin,
  FileText,
  Save,
  ArrowLeft,
  AlertCircle,
} from "lucide-react";

import type { Customer } from "./types";
import { addCustomer, updateCustomer } from "./customer.service";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { translations } from "@/lib/i18n/translations";

type CustomerFormProps = {
  customer?: Customer;
};

type CustomerFields = Omit<Customer, "id" | "createdAt">;

const emptyForm: CustomerFields = {
  shopName: "",
  ownerName: "",
  phone: "",
  email: "",
  address: "",
  city: "",
  state: "",
  pincode: "",
  gstin: "",
  notes: "",
};

const inputClass =
  "w-full min-w-0 rounded-xl border border-border bg-background px-3.5 py-3 text-sm text-foreground outline-none transition placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring/20";

const labelClass = "block space-y-2 text-sm font-medium text-foreground";

export default function CustomerForm({ customer }: CustomerFormProps) {
  const router = useRouter();
  const { language, mounted } = useLanguage();
  const t = translations[language];

  const [form, setForm] = useState<CustomerFields>(emptyForm);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!customer) return;

    const { id: _id, createdAt: _createdAt, ...customerFields } = customer;

    setForm(customerFields);
  }, [customer]);

  function handleChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));

    if (error) setError("");
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    const cleanedForm: CustomerFields = {
      ...form,
      shopName: form.shopName.trim(),
      ownerName: form.ownerName.trim(),
      phone: form.phone.trim(),
      email: form.email.trim(),
      address: form.address.trim(),
      city: form.city.trim(),
      state: form.state.trim(),
      pincode: form.pincode.trim(),
      gstin: form.gstin.trim().toUpperCase(),
      notes: form.notes.trim(),
    };

    if (!cleanedForm.shopName) {
      setError(t.shopNameRequired);
      return;
    }

    if (!cleanedForm.ownerName) {
      setError(t.ownerNameRequired);
      return;
    }

    if (!cleanedForm.phone) {
      setError(t.phoneRequired);
      return;
    }

    if (!/^[+\d\s()-]{7,20}$/.test(cleanedForm.phone)) {
      setError(t.validPhoneRequired);
      return;
    }

    if (
      cleanedForm.pincode &&
      !/^[a-zA-Z0-9 -]{3,12}$/.test(cleanedForm.pincode)
    ) {
      setError(t.validPincodeRequired);
      return;
    }

    if (customer) {
      updateCustomer(customer.id, cleanedForm);
    } else {
      addCustomer(cleanedForm);
    }

    router.push("/customers");
    router.refresh();
  }

  if (!mounted) {
    return (
      <div className="min-h-96 animate-pulse rounded-2xl border border-border bg-card" />
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="min-w-0 space-y-6 rounded-2xl border border-border bg-card p-4 text-card-foreground shadow-sm sm:p-6 md:p-8"
    >
      {/* Form heading */}
      <div className="flex items-start gap-3 border-b border-border pb-5">
        <div className="shrink-0 rounded-xl bg-primary/10 p-3 text-primary">
          <Store size={22} />
        </div>

        <div className="min-w-0">
          <h2 className="text-lg font-semibold">
            {customer ? t.editCustomer : t.shopDetails}
          </h2>

          <p className="mt-1 text-sm leading-6 text-muted-foreground">
            {t.customerFormDescription}
          </p>
        </div>
      </div>

      {/* Validation error */}
      {error && (
        <div
          role="alert"
          className="flex items-start gap-3 rounded-xl border border-red-500/25 bg-red-500/10 p-4 text-sm text-red-700 dark:text-red-300"
        >
          <AlertCircle size={18} className="mt-0.5 shrink-0" />
          <p>{error}</p>
        </div>
      )}

      {/* Customer fields */}
      <div className="grid min-w-0 grid-cols-1 gap-5 sm:grid-cols-2">
        <label className={labelClass}>
          <span className="flex items-center gap-2">
            <Store size={15} className="text-muted-foreground" />
            {t.shopName}
            <span className="text-[var(--danger)]">*</span>
          </span>

          <input
            name="shopName"
            value={form.shopName}
            onChange={handleChange}
            required
            maxLength={120}
            autoComplete="organization"
            className={inputClass}
            placeholder={t.shopNamePlaceholder}
          />
        </label>

        <label className={labelClass}>
          <span className="flex items-center gap-2">
            <UserRound size={15} className="text-muted-foreground" />
            {t.ownerName}
            <span className="text-[var(--danger)]">*</span>
          </span>

          <input
            name="ownerName"
            value={form.ownerName}
            onChange={handleChange}
            required
            maxLength={120}
            autoComplete="name"
            className={inputClass}
            placeholder={t.ownerNamePlaceholder}
          />
        </label>

        <label className={labelClass}>
          <span className="flex items-center gap-2">
            <Phone size={15} className="text-muted-foreground" />
            {t.phone}
            <span className="text-[var(--danger)]">*</span>
          </span>

          <input
            name="phone"
            type="tel"
            value={form.phone}
            onChange={handleChange}
            required
            maxLength={20}
            autoComplete="tel"
            className={inputClass}
            placeholder={t.phonePlaceholder}
          />
        </label>

        <label className={labelClass}>
          <span className="flex items-center gap-2">
            <Mail size={15} className="text-muted-foreground" />
            {t.emailAddress}
          </span>

          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            maxLength={254}
            autoComplete="email"
            className={inputClass}
            placeholder={t.emailPlaceholder}
          />
        </label>

        <label className={`${labelClass} sm:col-span-2`}>
          <span className="flex items-center gap-2">
            <MapPin size={15} className="text-muted-foreground" />
            {t.shopAddress}
          </span>

          <input
            name="address"
            value={form.address}
            onChange={handleChange}
            maxLength={250}
            autoComplete="street-address"
            className={inputClass}
            placeholder={t.shopAddressPlaceholder}
          />
        </label>

        <label className={labelClass}>
          {t.city}
          <input
            name="city"
            value={form.city}
            onChange={handleChange}
            maxLength={100}
            autoComplete="address-level2"
            className={inputClass}
            placeholder={t.cityPlaceholder}
          />
        </label>

        <label className={labelClass}>
          {t.state}
          <input
            name="state"
            value={form.state}
            onChange={handleChange}
            maxLength={100}
            autoComplete="address-level1"
            className={inputClass}
            placeholder={t.statePlaceholder}
          />
        </label>

        <label className={labelClass}>
          {t.pinCode}
          <input
            name="pincode"
            value={form.pincode}
            onChange={handleChange}
            maxLength={12}
            autoComplete="postal-code"
            className={inputClass}
            placeholder={t.postalCodePlaceholder}
          />
        </label>

        <label className={labelClass}>
          {t.gstin}
          <input
            name="gstin"
            value={form.gstin}
            onChange={handleChange}
            maxLength={15}
            className={inputClass}
            placeholder={t.optionalGstinPlaceholder}
          />
        </label>

        <label className={`${labelClass} sm:col-span-2`}>
          <span className="flex items-center gap-2">
            <FileText size={15} className="text-muted-foreground" />
            {t.notes}
          </span>

          <textarea
            name="notes"
            value={form.notes}
            onChange={handleChange}
            rows={4}
            maxLength={1000}
            className={`${inputClass} resize-y`}
            placeholder={t.notesPlaceholder}
          />

          <span className="text-xs font-normal text-muted-foreground">
            {form.notes.length}/1000 {t.characters}
          </span>
        </label>
      </div>

      {/* Actions */}
      <div className="flex flex-col-reverse gap-3 border-t border-border pt-5 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={() => router.push("/customers")}
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-border bg-background px-5 py-3 text-sm font-medium text-foreground transition hover:bg-muted"
        >
          <ArrowLeft size={16} />
          {t.cancel}
        </button>

        <button
          type="submit"
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          <Save size={17} />
          {customer ? t.saveChanges : t.saveCustomer}
        </button>
      </div>
    </form>
  );
}
