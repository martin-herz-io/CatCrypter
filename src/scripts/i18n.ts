import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Localizations
import en from '../assets/locales/en.json';
import de from '../assets/locales/de.json';
import pt from '../assets/locales/pt.json';
// Localizations

i18n.use(initReactI18next).init({
    resources: {
        en: { translation: en },
        de: { translation: de },
        pt: { translation: pt }
    },
    fallbackLng: "en",
    interpolation: { escapeValue: false }
})

export default i18n;