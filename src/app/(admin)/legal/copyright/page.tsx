"use client";

import LegalPageLayout from "@/components/legal/LegalPageLayout";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { translations } from "@/lib/i18n/translations";

export default function CopyrightPage() {
  const { language } = useLanguage();
  const t = translations[language].copyright;

  return (
    <LegalPageLayout title={t.title} description={t.description}>
      <section>
        <h2>{t.ownership}</h2>
        <p>{t.ownershipText}</p>
      </section>

      <section>
        <h2>{t.restrictions}</h2>
        <p>{t.restrictionsText}</p>
      </section>

      <section>
        <h2>{t.permission}</h2>
        <p>{t.permissionText}</p>
      </section>

      <section>
        <h2>{t.infringement}</h2>
        <p>{t.infringementText}</p>
      </section>
    </LegalPageLayout>
  );
}
