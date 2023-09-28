import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Localizations
import de from '../assets/locales/de.json'; // German
import dk from '../assets/locales/dk.json'; // Danish
import en from '../assets/locales/en.json'; // English
import es from '../assets/locales/es.json'; // Spanish
import fr from '../assets/locales/fr.json'; // French
import it from '../assets/locales/it.json'; // Italian
import jp from '../assets/locales/jp.json'; // Japanese
import kr from '../assets/locales/kr.json'; // Korean
import nl from '../assets/locales/nl.json'; // Dutch
import no from '../assets/locales/no.json'; // Norwegian
import pl from '../assets/locales/pl.json'; // Polish
import pt from '../assets/locales/pt.json'; // Portuguese
import se from '../assets/locales/se.json'; // Swedish
// Localizations

i18n.use(initReactI18next).init({
    resources: {
        de: { translation: de }, // German
        dk: { translation: dk }, // Danish
        en: { translation: en }, // English
        es: { translation: es }, // Spanish
        fr: { translation: fr }, // French
        it: { translation: it }, // Italian
        jp: { translation: jp }, // Japanese
        kr: { translation: kr }, // Korean
        nl: { translation: nl }, // Dutch
        no: { translation: no }, // Norwegian
        pl: { translation: pl }, // Polish
        pt: { translation: pt }, // Portuguese
        se: { translation: se } // Swedish
    },
    fallbackLng: "en",
    interpolation: { escapeValue: false }
})

export default i18n;