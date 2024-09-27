import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

// Import your translation files
import translationEN from "../content/locales/en/translate.json";
import translationKN from "../content/locales/ko/translate.json";
import translationJN from "../content/locales/ja/translate.json";

const resources = {
  en: {
    translation: translationEN,
  },
  ko: {
    translation: translationKN,
  },
  ja: {
    translation: translationJN,
  },
};

i18n
  .use(Backend)
  .use(LanguageDetector) // Enable language detection
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en", // Fallback language
    detection: {
      order: ["localStorage", "navigator"], // Use localStorage then navigator language detection
      caches: ["localStorage", "cookie"], // Cache the language in localStorage and cookie
    },
    interpolation: {
      escapeValue: false, // React already does escaping
    },
  });

export default i18n;
