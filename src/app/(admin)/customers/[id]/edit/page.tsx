"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import CustomerForm from "@/features/customers/CustomerForm";
import type { Customer } from "@/features/customers/types";
import { getCustomers } from "@/features/customers/customer.service";

export default function EditCustomerPage() {
  const params = useParams<{ id: string }>();
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const found = getCustomers().find((item) => item.id === params.id);
    setCustomer(found ?? null);
    setReady(true);
  }, [params.id]);

  if (!ready) {
    return <p className="text-sm text-gray-500">Loading customer...</p>;
  }

  if (!customer) {
    return (
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">Customer not found</h1>
        <Link href="/customers" className="text-blue-600 hover:underline">
          Back to customers
        </Link>
      </div>
    );
  }

  return (
    <section className="mx-auto max-w-3xl space-y-6">
      <div>
        <Link
          href="/customers"
          className="text-sm text-blue-600 hover:underline"
        >
          ← Back to customers
        </Link>
        <h1 className="mt-3 text-2xl font-bold">Edit customer</h1>
      </div>

      <CustomerForm customer={customer} />
    </section>
  );
}
