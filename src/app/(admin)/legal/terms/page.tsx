"use client";

import LegalPageLayout from "@/components/legal/LegalPageLayout";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { translations } from "@/lib/i18n/translations";

export default function TermsPage() {
  const { language } = useLanguage();
  const t = translations[language].terms;

  return (
    <LegalPageLayout title={t.title} description={t.description}>
      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-foreground">
          1. {t.acceptance}
        </h2>
        <p className="leading-7 text-muted-foreground">{t.acceptanceText}</p>
      </section>

      <section>
        <h2>2. {t.authorizedUse}</h2>
        <ul>
          <li>{t.lawfulUse}</li>
          <li>{t.accurateRecords}</li>
          <li>{t.credentials}</li>
          <li>{t.securityControls}</li>
        </ul>
      </section>

      <section>
        <h2>3. {t.intellectualProperty}</h2>
        <p>{t.intellectualPropertyText}</p>
        <p>{t.intellectualPropertyText2}</p>
      </section>

      <section>
        <h2>4. {t.dataResponsibility}</h2>
        <p>{t.dataResponsibilityText}</p>
        <p>{t.backupText}</p>
      </section>

      <section>
        <h2>5. {t.prohibitedActivities}</h2>
        <ul>
          <li>{t.unauthorizedCopying}</li>
          <li>{t.reverseEngineering}</li>
          <li>{t.unauthorizedAccess}</li>
          <li>{t.unlawfulActivities}</li>
        </ul>
      </section>

      <section>
        <h2>6. {t.availability}</h2>
        <p>{t.availabilityText}</p>
      </section>

      <section>
        <h2>7. {t.termination}</h2>
        <p>{t.terminationText}</p>
      </section>

      <section>
        <h2>8. {t.changesContact}</h2>
        <p>{t.changesContactText}</p>
      </section>
    </LegalPageLayout>
  );
}
