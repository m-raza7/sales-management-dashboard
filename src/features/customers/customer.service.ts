import type { Customer } from "./types";
import { readData, writeData, createId } from "@/lib/storage/local-storage";
import { STORAGE_KEYS } from "@/lib/storage/storage-keys";

export function getCustomers(): Customer[] {
  return readData<Customer>(STORAGE_KEYS.customers);
}

export function addCustomer(
  data: Omit<Customer, "id" | "createdAt">,
): Customer {
  const customers = getCustomers();

  const customer: Customer = {
    ...data,
    id: createId(),
    createdAt: new Date().toISOString(),
  };

  writeData(STORAGE_KEYS.customers, [customer, ...customers]);

  return customer;
}

export function updateCustomer(
  id: string,
  data: Omit<Customer, "id" | "createdAt">,
): void {
  const customers = getCustomers();

  const updated = customers.map((customer) =>
    customer.id === id ? { ...customer, ...data } : customer,
  );

  writeData(STORAGE_KEYS.customers, updated);
}

export function deleteCustomer(id: string): void {
  const customers = getCustomers();

  writeData(
    STORAGE_KEYS.customers,
    customers.filter((customer) => customer.id !== id),
  );
}
