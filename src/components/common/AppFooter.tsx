"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  Copyright,
  FileText,
  Mail,
  Package,
  ShieldCheck,
  ShoppingCart,
  Users,
} from "lucide-react";

import {
  FaInstagram,
  FaFacebookF,
  FaLinkedinIn,
  FaXTwitter,
} from "react-icons/fa6";

import { useLanguage } from "@/components/providers/LanguageProvider";
import { translations } from "@/lib/i18n/translations";

// Replace these with your verified contact details and profile URLs.
const SUPPORT_EMAIL = "officialnexora@gmail.com";

const SOCIAL_LINKS = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/YOUR_USERNAME/",
    Icon: FaInstagram,
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/YOUR_PAGE/",
    Icon: FaFacebookF,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/YOUR_COMPANY/",
    Icon: FaLinkedinIn,
  },
  {
    label: "X",
    href: "https://x.com/YOUR_USERNAME",
    Icon: FaXTwitter,
  },
];

const X_PROFILE_URL = "https://x.com/YOUR_USERNAME";

export default function AppFooter() {
  const { language } = useLanguage();
  const t = translations[language].footer;

  const exploreLinks = [
    { label: t.dashboard, href: "/dashboard", Icon: ShoppingCart },
    { label: t.customers, href: "/customers", Icon: Users },
    { label: t.products, href: "/products", Icon: Package },
    { label: t.orders, href: "/orders", Icon: ShoppingCart },
  ];

  const legalLinks = [
    {
      label: t.privacyPolicy,
      href: "/legal/privacy-policy",
      Icon: ShieldCheck,
    },
    { label: t.terms, href: "/legal/terms", Icon: FileText },
    { label: t.copyright, href: "/legal/copyright", Icon: Copyright },
    { label: t.security, href: "/legal/security", Icon: ShieldCheck },
  ];

  return (
    <footer className="mt-auto border-t border-border bg-card">
      <div className="mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-9 py-9 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10 lg:py-12">
          {/* Brand */}
          <section className="sm:col-span-2 lg:col-span-1">
            <Link
              href="/dashboard"
              aria-label="NEXORA Sales Management home"
              className="inline-flex min-w-0 items-center gap-2.5 sm:gap-3"
            >
              <div className="relative size-9 shrink-0 sm:size-10">
                <Image
                  src="/images/Glossy Emerald and Gold Ribbon N Logo.png"
                  alt="NEXORA logo"
                  fill
                  priority={false}
                  sizes="40px"
                  className="rounded-lg object-contain"
                />
              </div>

              <div className="min-w-0 leading-none">
                <span className="nexora-shine block truncate text-base font-extrabold tracking-[0.06em] sm:text-xl sm:tracking-[0.12em]">
                  NEXORA
                </span>

                <span className="mt-1 block text-[9px] font-semibold uppercase tracking-[0.12em] text-muted-foreground sm:text-[10px] sm:tracking-[0.16em]">
                  Sales Management
                </span>
              </div>
            </Link>

            <p className="mt-4 max-w-sm text-sm leading-6 text-muted-foreground">
              {t.description}
            </p>

            <p className="mt-4 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
              {t.tagline}
            </p>
          </section>

          {/* Explore */}
          <section>
            <h2 className="text-sm font-bold text-foreground">{t.explore}</h2>

            <ul className="mt-4 space-y-3">
              {exploreLinks.map(({ label, href, Icon }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-emerald-700 dark:hover:text-emerald-400"
                  >
                    <Icon size={15} aria-hidden="true" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          {/* Legal */}
          <section>
            <h2 className="text-sm font-bold text-foreground">
              {t.legalSecurity}
            </h2>

            <ul className="mt-4 space-y-3">
              {legalLinks.map(({ label, href, Icon }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-emerald-700 dark:hover:text-emerald-400"
                  >
                    <Icon size={15} aria-hidden="true" />
                    {label}
                  </Link>
                </li>
              ))}

              <li>
                <Link
                  href="/legal"
                  className="inline-flex items-center gap-1 text-sm font-semibold text-foreground transition-colors hover:text-emerald-700 dark:hover:text-emerald-400"
                >
                  {t.allPolicies}
                  <ArrowUpRight size={14} aria-hidden="true" />
                </Link>
              </li>
            </ul>
          </section>

          {/* Contact and social links */}
          <section>
            <h2 className="text-sm font-bold text-foreground">{t.connect}</h2>

            <p className="mt-4 text-sm leading-6 text-muted-foreground">
              {t.contactText}
            </p>

            <a
              href={`mailto:${SUPPORT_EMAIL}`}
              className="mt-4 inline-flex items-center gap-2 break-all text-sm text-foreground transition-colors hover:text-emerald-700 dark:hover:text-emerald-400"
            >
              <Mail size={16} className="shrink-0" aria-hidden="true" />
              {SUPPORT_EMAIL}
            </a>

            <p className="mt-6 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {t.followUs}
            </p>

            <div className="mt-3 flex flex-wrap items-center gap-3">
              {SOCIAL_LINKS.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  title={label}
                  className="flex size-10 items-center justify-center rounded-xl bordertext-muted-foreground transition-all duration-200 hover:-translate-y-0.5 hover:border-emerald-700/40 hover:text-emerald-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 dark:hover:text-emerald-400"
                >
                  <Icon size={18} aria-hidden="true" />
                </a>
              ))}

              {/* X logo */}
              {/* <a
                href={X_PROFILE_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X"
                title="X"
                className="flex size-10 items-center justify-center rounded-xl border border-border bg-background text-sm font-bold text-muted-foreground transition-all duration-200 hover:-translate-y-0.5 hover:border-emerald-700/40 hover:bg-emerald-700/10 hover:text-emerald-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 dark:hover:text-emerald-400"
              >
                𝕏
              </a> */}
            </div>
          </section>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-3 border-t border-border py-5 text-center sm:flex-row sm:text-left">
          <p className="text-xs leading-5 text-muted-foreground">
            © {new Date().getFullYear()} NEXORA. {t.copyrightNotice}
          </p>

          <p className="text-xs font-medium text-muted-foreground">
            {t.tagline}
          </p>
        </div>
      </div>
    </footer>
  );
}
