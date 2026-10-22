"use client";

import LegalPageLayout from "@/components/legal/LegalPageLayout";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { translations } from "@/lib/i18n/translations";

export default function PrivacyPolicyPage() {
  const { language } = useLanguage();
  const t = translations[language].privacyPolicy;

  return (
    <LegalPageLayout title={t.title} description={t.description}>
      <section>
        <h2>1. {t.introduction}</h2>
        <p>{t.introductionText}</p>
      </section>

      <section>
        <h2>2. {t.information}</h2>
        <p>{t.informationText}</p>
        <ul>
          <li>{t.customerData}</li>
          <li>{t.productData}</li>
          <li>{t.orderData}</li>
          <li>{t.applicationData}</li>
        </ul>
      </section>

      <section>
        <h2>3. {t.usage}</h2>
        <p>{t.usageText}</p>
      </section>

      <section>
        <h2>4. {t.security}</h2>
        <p>{t.securityText}</p>
      </section>

      <section>
        <h2>5. {t.sharing}</h2>
        <p>{t.sharingText}</p>
      </section>

      <section>
        <h2>6. {t.retention}</h2>
        <p>{t.retentionText}</p>
      </section>

      <section>
        <h2>7. {t.contact}</h2>
        <p>{t.contactText}</p>
      </section>
    </LegalPageLayout>
  );
}
