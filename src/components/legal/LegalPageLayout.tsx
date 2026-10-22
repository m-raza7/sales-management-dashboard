import Link from "next/link";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import type { ReactNode } from "react";

type LegalPageLayoutProps = {
  title: string;
  description: string;
  lastUpdated?: string;
  children: ReactNode;
};

export default function LegalPageLayout({
  title,
  description,
  lastUpdated = "October 22, 2026",
  children,
}: LegalPageLayoutProps) {
  return (
    <main className="mx-auto w-full">
      {/* <Link
        href="/legal"
        className="mb-6 inline-flex items-center gap-2 text-sm
          text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft size={16} />
        Back to Legal & Security
      </Link> */}

      <header
        className="mb-8 rounded-2xl border border-border
        bg-card p-5 sm:p-8"
      >
        <div
          className="mb-4 flex size-11 items-center justify-center
          rounded-xl border border-emerald-700/20 bg-emerald-700/10
          text-emerald-700 dark:text-emerald-400"
        >
          <ShieldCheck size={24} />
        </div>

        <p
          className="mb-2 text-xs font-bold uppercase tracking-[0.18em]
          text-emerald-700 dark:text-emerald-400"
        >
          NEXORA · Legal & Security
        </p>

        <h1
          className="text-2xl font-bold tracking-tight
          text-foreground sm:text-3xl"
        >
          {title}
        </h1>

        <p
          className="mt-3 max-w-2xl text-sm leading-7
          text-muted-foreground"
        >
          {description}
        </p>

        <p className="mt-4 text-xs text-muted-foreground">
          Last updated: {lastUpdated}
        </p>
      </header>

      <article
        className="space-y-7 rounded-2xl border border-border
        bg-card p-5 text-sm leading-7 text-muted-foreground
        sm:p-8 [&_h2]:mb-2 [&_h2]:text-lg [&_h2]:font-semibold
        [&_h2]:text-foreground [&_ul]:list-disc [&_ul]:space-y-2
        [&_ul]:pl-5"
      >
        {children}
      </article>

      {/* <footer
        className="mt-8 border-t border-border py-5
        text-center text-xs text-muted-foreground"
      >
        © {new Date().getFullYear()} NEXORA · Smarter Sales. Stronger Business.
      </footer> */}
    </main>
  );
}
