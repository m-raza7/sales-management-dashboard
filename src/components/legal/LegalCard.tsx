import Link from "next/link";
import { ArrowUpRight, type LucideIcon } from "lucide-react";

type LegalCardProps = {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
};

export default function LegalCard({
  title,
  description,
  href,
  icon: Icon,
}: LegalCardProps) {
  return (
    <Link
      href={href}
      className="group flex h-full items-start gap-4 rounded-2xl
        border border-border bg-card p-5 transition-all duration-200
        hover:-translate-y-0.5 hover:border-emerald-700/40
        hover:shadow-md focus-visible:outline-none
        focus-visible:ring-2 focus-visible:ring-emerald-600"
    >
      <span
        className="flex size-11 shrink-0 items-center justify-center
          rounded-xl border border-emerald-700/15 bg-emerald-700/10
          text-emerald-700 dark:text-emerald-400"
      >
        <Icon size={21} />
      </span>

      <span className="min-w-0 flex-1">
        <span className="block text-sm font-semibold text-foreground">
          {title}
        </span>

        <span className="mt-1 block text-sm leading-6 text-muted-foreground">
          {description}
        </span>
      </span>

      <ArrowUpRight
        size={17}
        className="shrink-0 text-muted-foreground transition-colors
          group-hover:text-emerald-700 dark:group-hover:text-emerald-400"
      />
    </Link>
  );
}
