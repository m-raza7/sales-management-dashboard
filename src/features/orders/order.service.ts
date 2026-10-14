import type { Order, OrderStatus } from "./types";
import { createId, readData, writeData } from "@/lib/storage/local-storage";
import { STORAGE_KEYS } from "@/lib/storage/storage-keys";

export function getOrders(): Order[] {
  return readData<Order>(STORAGE_KEYS.orders);
}

export function addOrder(
  data: Omit<Order, "id" | "orderNumber" | "createdAt">,
): Order {
  const orders = getOrders();

  const order: Order = {
    ...data,
    id: createId(),
    orderNumber: `ORD-${Date.now().toString().slice(-8)}`,
    createdAt: new Date().toISOString(),
  };

  writeData(STORAGE_KEYS.orders, [order, ...orders]);
  return order;
}

export function updateOrderStatus(id: string, status: OrderStatus): void {
  const updated = getOrders().map((order) =>
    order.id === id ? { ...order, status } : order,
  );

  writeData(STORAGE_KEYS.orders, updated);
}

export function deleteOrder(id: string): void {
  writeData(
    STORAGE_KEYS.orders,
    getOrders().filter((order) => order.id !== id),
  );
}
