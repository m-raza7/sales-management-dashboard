export const NEXT_PUBLIC_ACCESS_CODE =
  process.env.NEXT_PUBLIC_ACCESS_CODE ?? "";

export const NEXT_PUBLIC_STORAGE_KEY =
  process.env.NEXT_PUBLIC_STORAGE_KEY ?? "sales-management-access";

export const NEXT_PUBLIC_ACCESS_DURATION = Number(
  process.env.NEXT_PUBLIC_ACCESS_DURATION ?? 86400000,
);
