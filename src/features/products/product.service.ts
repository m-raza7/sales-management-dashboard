import type { Product } from "./types";
import { createId, readData, writeData } from "@/lib/storage/local-storage";
import { STORAGE_KEYS } from "@/lib/storage/storage-keys";

export function getProducts(): Product[] {
  return readData<Product>(STORAGE_KEYS.products);
}

export function addProduct(data: Omit<Product, "id" | "createdAt">): Product {
  const product: Product = {
    ...data,
    id: createId(),
    createdAt: new Date().toISOString(),
  };

  writeData(STORAGE_KEYS.products, [product, ...getProducts()]);
  return product;
}

export function updateProduct(
  id: string,
  data: Omit<Product, "id" | "createdAt">,
): void {
  const updated = getProducts().map((product) =>
    product.id === id ? { ...product, ...data } : product,
  );

  writeData(STORAGE_KEYS.products, updated);
}

export function deleteProduct(id: string): void {
  writeData(
    STORAGE_KEYS.products,
    getProducts().filter((product) => product.id !== id),
  );
}
