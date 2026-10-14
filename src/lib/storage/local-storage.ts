export function readData<T>(key: string): T[] {
  if (typeof window === "undefined") return [];

  try {
    const saved = localStorage.getItem(key);

    if (!saved) return [];

    const data: unknown = JSON.parse(saved);

    return Array.isArray(data) ? (data as T[]) : [];
  } catch {
    console.error(`Could not read local data: ${key}`);
    return [];
  }
}

export function writeData<T>(key: string, data: T[]): void {
  if (typeof window === "undefined") return;

  localStorage.setItem(key, JSON.stringify(data));
}

export function createId(): string {
  return crypto.randomUUID();
}
