import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./locales/en.json";
import pj from "./locales/pj.json";
import hn from "./locales/hn.json";
import gj from "./locales/gj.json";

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    pj: { translation: pj },
    hn: { translation: hn },
    gj: { translation: gj },
  },
  lng: "en", // default language
  fallbackLng: "en", // fallback language
  interpolation: { escapeValue: false },
});

export default i18n;
