import type { Metadata, Viewport } from "next";

import ThemeProvider from "@/components/providers/ThemeProvider";
import LocalAccessLock from "@/components/auth/LocalAccessLock";
import CapacitorBackButton from "@/components/CapacitorBackButton";

import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "NEXORA | Sales Management",
    template: "%s | NEXORA",
  },

  description:
    "Manage customers, products, and orders from one professional business workspace.",

  applicationName: "NEXORA",

  keywords: [
    "NEXORA",
    "Sales Management",
    "Customer Management",
    "Product Management",
    "Order Management",
    "Business Management",
  ],

  authors: [
    {
      name: "NEXORA",
    },
  ],

  robots: {
    index: true,
    follow: true,
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#047857",
  colorScheme: "light dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-background text-foreground antialiased">
        <ThemeProvider>
          <CapacitorBackButton />

          <LocalAccessLock>{children}</LocalAccessLock>
        </ThemeProvider>
      </body>
    </html>
  );
}
