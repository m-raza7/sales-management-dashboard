"use client";

import LegalPageLayout from "@/components/legal/LegalPageLayout";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { translations } from "@/lib/i18n/translations";

export default function SecurityPage() {
  const { language } = useLanguage();
  const t = translations[language].security;

  return (
    <LegalPageLayout title={t.title} description={t.description}>
      <section>
        <h2>1. {t.authorizedAccess}</h2>
        <p>{t.authorizedAccessText}</p>
      </section>

      <section>
        <h2>2. {t.protectDevice}</h2>
        <ul>
          <li>{t.devicePassword}</li>
          <li>{t.lockDevice}</li>
          <li>{t.avoidSharedDevices}</li>
          <li>{t.backups}</li>
        </ul>
      </section>

      <section>
        <h2>3. {t.reporting}</h2>
        <p>{t.reportingText}</p>
      </section>

      <section>
        <h2>4. {t.limitations}</h2>
        <p>{t.limitationsText}</p>
      </section>
    </LegalPageLayout>
  );
}
