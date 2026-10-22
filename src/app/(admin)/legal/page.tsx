import { ShieldCheck, FileText, Copyright, LockKeyhole } from "lucide-react";

import LegalCard from "@/components/legal/LegalCard";

const legalItems = [
  {
    title: "Privacy Policy",
    description: "Learn how personal and business information is handled.",
    href: "/legal/privacy-policy",
    icon: ShieldCheck,
  },
  {
    title: "Terms & Conditions",
    description: "Understand the rules for using NEXORA.",
    href: "/legal/terms",
    icon: FileText,
  },
  {
    title: "Copyright & Intellectual Property",
    description: "Review ownership and restrictions on reuse.",
    href: "/legal/copyright",
    icon: Copyright,
  },
  {
    title: "Security & Access Policy",
    description: "Guidance on protecting access and business records.",
    href: "/legal/security",
    icon: LockKeyhole,
  },
];

export default function LegalHomePage() {
  return (
    <main className="mx-auto w-full px-4 sm:px-6 ">
      <p
        className="text-xs font-bold uppercase tracking-[0.18em]
        text-emerald-700 dark:text-emerald-400"
      >
        NEXORA
      </p>

      <h1
        className="mt-2 text-2xl font-bold tracking-tight
        text-foreground sm:text-3xl"
      >
        Legal & Security
      </h1>

      <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground">
        Information about privacy, authorized use, intellectual property, and
        application security.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {legalItems.map((item) => (
          <LegalCard key={item.href} {...item} />
        ))}
      </div>
    </main>
  );
}
