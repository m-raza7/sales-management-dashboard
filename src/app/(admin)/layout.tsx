import type { ReactNode } from "react";

import AdminShell from "@/components/layout/AdminShell";
import PageTransition from "@/components/common/PageTransition";

export default function AdminLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <AdminShell>
      <PageTransition>{children}</PageTransition>
    </AdminShell>
  );
}
