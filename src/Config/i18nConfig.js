import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import translation from "../translate/translation"

i18n.use(initReactI18next).init({
    lng: localStorage.getItem('language') || 'en',
    resources: translation,
    fallbackLng: "en",
  });

export default i18n;