import type { Metadata } from "next";
import ThemeProvider from "@/components/providers/ThemeProvider";
import LocalAccessLock from "@/components/auth/LocalAccessLock";
import CapacitorBackButton from "@/components/CapacitorBackButton";
import "./globals.css";

export const metadata: Metadata = {
  title: "Emerald Sales | Sales Management",
  description: "Manage customers, products and orders from one workspace.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <CapacitorBackButton />
        <LocalAccessLock>
          <ThemeProvider>{children}</ThemeProvider>
        </LocalAccessLock>
      </body>
    </html>
  );
}
