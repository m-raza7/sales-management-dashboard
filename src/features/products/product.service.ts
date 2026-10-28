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

/**
 * Search saved products by name, ID, category, price,
 * description, or any other stored product field.
 */
export function searchProducts(query: string): Product[] {
  const normalizedQuery = query.trim().toLowerCase();

  if (!normalizedQuery) {
    return [];
  }

  return getProducts().filter((product) =>
    Object.values(product).some((value) => {
      if (value === null || value === undefined) {
        return false;
      }

      if (typeof value === "object") {
        return JSON.stringify(value).toLowerCase().includes(normalizedQuery);
      }

      return String(value).toLowerCase().includes(normalizedQuery);
    }),
  );
}
