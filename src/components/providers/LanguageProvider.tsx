"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import {
  translations,
  type Language,
  type TranslationKey,
} from "@/lib/i18n/translations";

type LanguageContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: TranslationKey) => string;
  mounted: boolean;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

const STORAGE_KEY = "sales-management-language";

const LANGUAGE_LOCALES: Record<Language, string> = {
  en: "en",
  mr: "mr-IN",
  hi: "hi-IN",
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (saved === "en" || saved === "mr" || saved === "hi") {
      setLanguageState(saved);
    }

    setMounted(true);
  }, []);

  const setLanguage = useCallback((nextLanguage: Language) => {
    setLanguageState(nextLanguage);

    localStorage.setItem(STORAGE_KEY, nextLanguage);
    document.documentElement.lang = LANGUAGE_LOCALES[nextLanguage];
  }, []);

  useEffect(() => {
    if (!mounted) return;

    document.documentElement.lang = LANGUAGE_LOCALES[language];
  }, [language, mounted]);

  const t = useCallback(
    (key: TranslationKey): string => {
      const value = translations[language][key];

      // Translation keys used by t() must resolve to strings.
      // Prevent nested translation objects from being returned.
      return typeof value === "string" ? value : String(key);
    },
    [language],
  );

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t,
        mounted,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error("useLanguage must be used inside LanguageProvider");
  }

  return context;
}
