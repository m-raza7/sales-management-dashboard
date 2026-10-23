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
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#047857",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <CapacitorBackButton />
          <LocalAccessLock>{children}</LocalAccessLock>
        </ThemeProvider>
      </body>
    </html>
  );
}
