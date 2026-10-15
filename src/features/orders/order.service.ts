import type { Order, OrderStatus } from "./types";
import { createId, readData, writeData } from "@/lib/storage/local-storage";
import { STORAGE_KEYS } from "@/lib/storage/storage-keys";

// Get all orders
export function getOrders(): Order[] {
  try {
    return readData<Order>(STORAGE_KEYS.orders);
  } catch (error) {
    console.error("Failed to load orders:", error);
    return [];
  }
}

// Get a single order by ID
export function getOrderById(id: string): Order | undefined {
  return getOrders().find((order) => order.id === id);
}

// Create a new order
export function addOrder(
  data: Omit<Order, "id" | "orderNumber" | "createdAt">,
): Order {
  const orders = getOrders();

  const order: Order = {
    ...data,
    id: createId(),
    orderNumber: generateOrderNumber(orders),
    createdAt: new Date().toISOString(),
  };

  writeData(STORAGE_KEYS.orders, [order, ...orders]);

  return order;
}

// Generate a unique order number
function generateOrderNumber(orders: Order[]): string {
  let orderNumber: string;

  do {
    const timestamp = Date.now().toString().slice(-8);
    const randomNumber = Math.floor(1000 + Math.random() * 9000);

    orderNumber = `ORD-${timestamp}-${randomNumber}`;
  } while (orders.some((order) => order.orderNumber === orderNumber));

  return orderNumber;
}

// Update order status
export function updateOrderStatus(id: string, status: OrderStatus): void {
  const orders = getOrders();
  const orderExists = orders.some((order) => order.id === id);

  if (!orderExists) {
    throw new Error(`Order with ID "${id}" was not found.`);
  }

  const updatedOrders = orders.map((order) =>
    order.id === id ? { ...order, status } : order,
  );

  writeData(STORAGE_KEYS.orders, updatedOrders);
}

// Update an entire order
export function updateOrder(
  id: string,
  data: Partial<Omit<Order, "id" | "orderNumber" | "createdAt">>,
): Order {
  const orders = getOrders();
  const existingOrder = orders.find((order) => order.id === id);

  if (!existingOrder) {
    throw new Error(`Order with ID "${id}" was not found.`);
  }

  const updatedOrder: Order = {
    ...existingOrder,
    ...data,
    id: existingOrder.id,
    orderNumber: existingOrder.orderNumber,
    createdAt: existingOrder.createdAt,
  };

  const updatedOrders = orders.map((order) =>
    order.id === id ? updatedOrder : order,
  );

  writeData(STORAGE_KEYS.orders, updatedOrders);

  return updatedOrder;
}

// Delete an order
export function deleteOrder(id: string): void {
  const orders = getOrders();
  const orderExists = orders.some((order) => order.id === id);

  if (!orderExists) {
    throw new Error(`Order with ID "${id}" was not found.`);
  }

  const updatedOrders = orders.filter((order) => order.id !== id);

  writeData(STORAGE_KEYS.orders, updatedOrders);
}
