"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import {
  ShoppingCart,
  Users,
  Package,
  Plus,
  Trash2,
  MapPin,
  CreditCard,
  Save,
  AlertCircle,
} from "lucide-react";

import type { Customer } from "@/features/customers/types";
import { getCustomers } from "@/features/customers/customer.service";
import type { Product } from "@/features/products/types";
import { getProducts } from "@/features/products/product.service";
import { addOrder } from "./order.service";
import type { OrderItem } from "./types";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { translations } from "@/lib/i18n/translations";

type DraftItem = {
  productId: string;
  quantity: number;
  discount: number;
};

const money = (value: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(value);

const inputClass =
  "w-full min-w-0 rounded-xl border border-border bg-background px-3.5 py-3 text-sm text-foreground outline-none transition placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring/20";

const labelClass = "block space-y-2 text-sm font-medium text-foreground";

const cardClass =
  "min-w-0 space-y-5 rounded-2xl border border-border bg-card p-4 text-card-foreground shadow-sm sm:p-6";

export default function OrderForm() {
  const router = useRouter();
  const { language, mounted } = useLanguage();
  const t = translations[language];

  const [customers, setCustomers] = useState<Customer[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [customerId, setCustomerId] = useState("");
  const [items, setItems] = useState<DraftItem[]>([
    { productId: "", quantity: 1, discount: 0 },
  ]);
  const [orderDiscount, setOrderDiscount] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("unpaid");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState("");
  const [dataReady, setDataReady] = useState(false);

  useEffect(() => {
    if (!mounted) return;

    setCustomers(getCustomers());
    setProducts(getProducts().filter((product) => product.active));
    setDataReady(true);
  }, [mounted]);

  const selectedCustomer = customers.find(
    (customer) => customer.id === customerId,
  );

  const preparedItems = items.map((item) => {
    const product = products.find((entry) => entry.id === item.productId);
    const quantity = Math.max(0, Number(item.quantity) || 0);
    const discount = Math.max(0, Number(item.discount) || 0);
    const unitPrice = product?.price ?? 0;
    const lineTotal = Math.max(0, quantity * unitPrice - discount);

    return {
      ...item,
      product,
      quantity,
      discount,
      unitPrice,
      lineTotal,
    };
  });

  const subtotal = preparedItems.reduce(
    (sum, item) => sum + item.quantity * item.unitPrice,
    0,
  );

  const itemDiscount = preparedItems.reduce(
    (sum, item) => sum + item.discount,
    0,
  );

  const safeOrderDiscount = Math.max(0, Number(orderDiscount) || 0);
  const total = Math.max(0, subtotal - itemDiscount - safeOrderDiscount);

  function updateItem(
    index: number,
    field: keyof DraftItem,
    value: string | number,
  ) {
    setItems((previous) =>
      previous.map((item, itemIndex) =>
        itemIndex === index ? { ...item, [field]: value } : item,
      ),
    );
  }

  function addItemRow() {
    setItems((previous) => [
      ...previous,
      { productId: "", quantity: 1, discount: 0 },
    ]);
  }

  function removeItemRow(index: number) {
    setItems((previous) =>
      previous.filter((_, itemIndex) => itemIndex !== index),
    );
  }

  function handleCustomerChange(id: string) {
    setCustomerId(id);

    const customer = customers.find((item) => item.id === id);

    if (customer) {
      setDeliveryAddress(
        [customer.address, customer.city, customer.state, customer.pincode]
          .filter(Boolean)
          .join(", "),
      );
    } else {
      setDeliveryAddress("");
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (!selectedCustomer) {
      setError(t.orderSelectCustomerError);
      return;
    }

    if (
      preparedItems.length === 0 ||
      preparedItems.some((item) => !item.product)
    ) {
      setError(t.orderSelectProductError);
      return;
    }

    if (
      preparedItems.some(
        (item) =>
          !Number.isFinite(item.quantity) ||
          item.quantity <= 0 ||
          !Number.isInteger(item.quantity),
      )
    ) {
      setError(t.orderQuantityError);
      return;
    }

    if (
      preparedItems.some(
        (item) =>
          !Number.isFinite(item.discount) ||
          item.discount < 0 ||
          item.discount > item.quantity * item.unitPrice,
      )
    ) {
      setError(t.orderItemDiscountError);
      return;
    }

    const maximumOrderDiscount = Math.max(0, subtotal - itemDiscount);

    if (
      !Number.isFinite(orderDiscount) ||
      orderDiscount < 0 ||
      orderDiscount > maximumOrderDiscount
    ) {
      setError(t.orderDiscountError);
      return;
    }

    const orderItems: OrderItem[] = preparedItems.map((item) => ({
      productId: item.product!.id,
      productName: item.product!.name,
      sku: item.product!.sku,
      quantity: item.quantity,
      unitPrice: item.unitPrice,
      discount: item.discount,
      lineTotal: item.lineTotal,
    }));

    addOrder({
      customerId: selectedCustomer.id,
      customerName: selectedCustomer.shopName,
      items: orderItems,
      subtotal,
      discount: itemDiscount + safeOrderDiscount,
      total,
      status: "pending",
      paymentMethod,
      deliveryAddress: deliveryAddress.trim(),
      notes: notes.trim(),
    });

    router.push("/orders");
  }

  if (!mounted || !dataReady) {
    return (
      <div className="min-h-64 animate-pulse rounded-2xl border border-border bg-card" />
    );
  }

  if (customers.length === 0) {
    return (
      <div className="rounded-2xl border border-border bg-card p-6 text-card-foreground shadow-sm sm:p-8">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <Users size={24} />
        </div>

        <h2 className="mt-4 text-lg font-semibold">
          {t.orderAddCustomerFirst}
        </h2>

        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          {t.orderCustomerRequiredDescription}
        </p>

        <button
          type="button"
          onClick={() => router.push("/customers/new")}
          className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
        >
          <Plus size={17} />
          {t.orderAddCustomer}
        </button>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="rounded-2xl border border-border bg-card p-6 text-card-foreground shadow-sm sm:p-8">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <Package size={24} />
        </div>

        <h2 className="mt-4 text-lg font-semibold">
          {t.orderAddActiveProductFirst}
        </h2>

        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          {t.orderActiveProductRequiredDescription}
        </p>

        <button
          type="button"
          onClick={() => router.push("/products/new")}
          className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
        >
          <Plus size={17} />
          {t.orderAddProduct}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="min-w-0 space-y-6">
      {error && (
        <div
          role="alert"
          className="flex items-start gap-3 rounded-xl border border-red-500/25 bg-red-500/10 p-4 text-sm text-red-700 dark:text-red-300"
        >
          <AlertCircle size={19} className="mt-0.5 shrink-0" />
          <p>{error}</p>
        </div>
      )}

      {/* Customer details */}
      <section className={cardClass}>
        <div className="flex items-center gap-3 border-b border-border pb-4">
          <div className="rounded-xl bg-primary/10 p-3 text-primary">
            <Users size={21} />
          </div>
          <div>
            <h2 className="font-semibold">{t.orderCustomerDetails}</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {t.orderSelectShopDescription}
            </p>
          </div>
        </div>

        <label className={labelClass}>
          {t.orderSelectShop} <span className="text-[var(--danger)]">*</span>
          <select
            className={`${inputClass} dark:[color-scheme:dark]`}
            value={customerId}
            onChange={(event) => handleCustomerChange(event.target.value)}
            required
          >
            <option value="">{t.orderChooseShop}</option>
            {customers.map((customer) => (
              <option key={customer.id} value={customer.id}>
                {customer.shopName} — {customer.ownerName}
              </option>
            ))}
          </select>
        </label>

        {selectedCustomer && (
          <div className="grid gap-3 rounded-xl border border-border bg-muted/40 p-4 text-sm sm:grid-cols-2">
            <div>
              <p className="text-xs font-medium text-muted-foreground">
                {t.orderShopOwner}
              </p>
              <p className="mt-1 font-medium text-foreground">
                {selectedCustomer.ownerName}
              </p>
            </div>

            <div>
              <p className="text-xs font-medium text-muted-foreground">
                {t.phone}
              </p>
              <p className="mt-1 font-medium text-foreground">
                {selectedCustomer.phone}
              </p>
            </div>
          </div>
        )}
      </section>

      {/* Order items */}
      <section className={cardClass}>
        <div className="flex flex-col justify-between gap-3 border-b border-border pb-4 sm:flex-row sm:items-center">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-primary/10 p-3 text-primary">
              <ShoppingCart size={21} />
            </div>
            <div>
              <h2 className="font-semibold">{t.orderItems}</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                {t.orderItemsDescription}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={addItemRow}
            className="inline-flex min-h-10 items-center justify-center gap-2 self-start rounded-xl border border-border bg-background px-4 py-2 text-sm font-semibold text-foreground transition hover:bg-muted sm:self-auto"
          >
            <Plus size={16} />
            {t.orderAddProduct}
          </button>
        </div>

        <div className="space-y-4">
          {items.map((item, index) => {
            const row = preparedItems[index];

            return (
              <div
                key={index}
                className="min-w-0 space-y-4 rounded-xl border border-border bg-background/50 p-4 sm:p-5"
              >
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-sm font-semibold">
                    {t.orderItem} {index + 1}
                  </h3>

                  {items.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeItemRow(index)}
                      className="inline-flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-xs font-medium text-red-600 transition hover:bg-red-500/10 dark:text-red-300"
                    >
                      <Trash2 size={14} />
                      {t.orderRemove}
                    </button>
                  )}
                </div>

                <label className={labelClass}>
                  {t.orderProduct}{" "}
                  <span className="text-[var(--danger)]">*</span>
                  <select
                    className={`${inputClass} dark:[color-scheme:dark]`}
                    value={item.productId}
                    onChange={(event) =>
                      updateItem(index, "productId", event.target.value)
                    }
                    required
                  >
                    <option value="">{t.orderSelectProduct}</option>
                    {products.map((product) => (
                      <option key={product.id} value={product.id}>
                        {product.name} — {money(product.price)}
                      </option>
                    ))}
                  </select>
                </label>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <label className={labelClass}>
                    {t.orderQuantity}
                    <input
                      className={inputClass}
                      type="number"
                      min="1"
                      step="1"
                      value={item.quantity}
                      onChange={(event) =>
                        updateItem(
                          index,
                          "quantity",
                          Number(event.target.value),
                        )
                      }
                      required
                    />
                  </label>

                  <label className={labelClass}>
                    {t.orderItemDiscount} (₹)
                    <input
                      className={inputClass}
                      type="number"
                      min="0"
                      step="0.01"
                      value={item.discount}
                      onChange={(event) =>
                        updateItem(
                          index,
                          "discount",
                          Number(event.target.value),
                        )
                      }
                    />
                  </label>

                  <div className="min-w-0 space-y-2 text-sm font-medium">
                    <p>{t.orderLineTotal}</p>
                    <div className="flex min-h-11 items-center rounded-xl border border-border bg-muted/50 px-3.5 py-3 font-semibold text-foreground">
                      <span className="break-words">
                        {money(row.lineTotal)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Delivery and payment */}
      <div className="grid min-w-0 gap-6 lg:grid-cols-2 lg:items-start">
        <section className={cardClass}>
          <div className="flex items-center gap-3 border-b border-border pb-4">
            <div className="rounded-xl bg-primary/10 p-3 text-primary">
              <MapPin size={21} />
            </div>
            <div>
              <h2 className="font-semibold">{t.orderDeliveryAndPayment}</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                {t.orderDeliveryDescription}
              </p>
            </div>
          </div>

          <label className={labelClass}>
            {/* {t.orderDeliveryAddress} */}
            {t.deliveryAddress}
            <textarea
              className={inputClass}
              rows={3}
              value={deliveryAddress}
              onChange={(event) => setDeliveryAddress(event.target.value)}
              placeholder={t.orderDeliveryAddressPlaceholder}
            />
          </label>

          <label className={labelClass}>
            <span className="flex items-center gap-2">
              <CreditCard size={16} className="text-muted-foreground" />
              {t.orderPaymentMethod}
            </span>
            <select
              className={`${inputClass} dark:[color-scheme:dark]`}
              value={paymentMethod}
              onChange={(event) => setPaymentMethod(event.target.value)}
            >
              <option value="unpaid">{t.orderUnpaid}</option>
              <option value="cash">{t.orderCash}</option>
              <option value="upi">{t.orderUpi}</option>
              <option value="bank_transfer">{t.orderBankTransfer}</option>
              <option value="credit">{t.orderCredit}</option>
            </select>
          </label>

          <label className={labelClass}>
            {t.orderNotes}
            <textarea
              className={inputClass}
              rows={3}
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
              placeholder={t.orderNotesPlaceholder}
            />
          </label>
        </section>

        {/* Order summary */}
        <section className={`${cardClass} lg:sticky lg:top-24`}>
          <div className="flex items-center gap-3 border-b border-border pb-4">
            <div className="rounded-xl bg-[#D8B66A]/15 p-3 text-[#A47D27] dark:text-[#E4C57D]">
              <ShoppingCart size={21} />
            </div>
            <div>
              <h2 className="font-semibold">{t.orderSummary}</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                {t.orderSummaryDescription}
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between gap-3 text-sm">
              <span className="text-muted-foreground">{t.orderSubtotal}</span>
              <span className="font-medium">{money(subtotal)}</span>
            </div>

            <div className="flex items-center justify-between gap-3 text-sm">
              <span className="text-muted-foreground">
                {t.orderItemDiscounts}
              </span>
              <span className="font-medium text-emerald-700 dark:text-emerald-300">
                −{money(itemDiscount)}
              </span>
            </div>

            <label className={labelClass}>
              {t.orderAdditionalDiscount} (₹)
              <input
                className={inputClass}
                type="number"
                min="0"
                step="0.01"
                value={orderDiscount}
                onChange={(event) =>
                  setOrderDiscount(Number(event.target.value))
                }
              />
            </label>

            <div className="flex items-center justify-between gap-3 border-t border-border pt-4">
              <span className="text-base font-semibold">{t.orderTotal}</span>
              <span className="break-words text-xl font-bold tracking-tight text-primary sm:text-2xl">
                {money(total)}
              </span>
            </div>
          </div>

          <div className="space-y-3 border-t border-border pt-5">
            <button
              type="submit"
              className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <Save size={17} />
              {t.orderSaveOrder}
            </button>

            <button
              type="button"
              onClick={() => router.push("/orders")}
              className="min-h-11 w-full rounded-xl border border-border bg-card px-5 py-3 text-sm font-medium text-foreground transition hover:bg-muted"
            >
              {t.cancel}
            </button>
          </div>

          <p className="text-xs leading-5 text-muted-foreground">
            {t.orderStorageNotice}
          </p>
        </section>
      </div>
    </form>
  );
}
