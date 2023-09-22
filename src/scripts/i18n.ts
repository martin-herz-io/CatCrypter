import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Localizations
import de from '../assets/locales/de.json'; // German
import dk from '../assets/locales/dk.json'; // Danish
import en from '../assets/locales/en.json'; // English
import es from '../assets/locales/es.json'; // Spanish
import fr from '../assets/locales/fr.json'; // French
import nl from '../assets/locales/nl.json'; // Dutch
import pt from '../assets/locales/pt.json'; // Portuguese
// Localizations

i18n.use(initReactI18next).init({
    resources: {
        de: { translation: de }, // German
        dk: { translation: dk }, // Danish
        en: { translation: en }, // English
        es: { translation: es }, // Spanish
        fr: { translation: fr }, // French
        nl: { translation: nl }, // Dutch
        pt: { translation: pt } // Portuguese
    },
    fallbackLng: "en",
    interpolation: { escapeValue: false }
})

export default i18n;