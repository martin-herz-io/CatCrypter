// React imports
import React, { useEffect, useState } from 'react'
import { fs } from '@tauri-apps/api'
import { Settings } from '../modals/Settings'

// Localizations - Flags
import de_icon from '../../assets/locales/de.png' // German
import dk_icon from '../../assets/locales/dk.png' // Danish
import en_icon from '../../assets/locales/en.png' // English
import es_icon from '../../assets/locales/es.png' // Spanish
import fr_icon from '../../assets/locales/fr.png' // French
import nl_icon from '../../assets/locales/nl.png' // Dutch
import pt_icon from '../../assets/locales/pt.png' // Portuguese
// Localizations - Flags

// Properties: LanguageSwitch
export type Props = {
    t: (key: string) => string;
    v: string;
    language: string;
    setLanguage: React.Dispatch<React.SetStateAction<string>>;
    setModalContent: React.Dispatch<React.SetStateAction<React.ReactNode>>;
}

// Component: LanguageSwitch
export const LanguageSwitch: React.FC<Props> = ({t, v, language, setLanguage, setModalContent}) => {

    // Current language icon and text
    const [currentIcon, setCurrentIcon] = useState<string>(en_icon)
    const [currentLanguage, setCurrentLanguage] = useState<string>('English')

    // Show language selection
    const [showSelection, setShowSelection] = useState<boolean>(false)

    // Languages
    const languages = [
        {
            text: "Deutsch",
            icon: de_icon,
            lang: "de"
        },
        {
            text: "Dansk",
            icon: dk_icon,
            lang: "dk"
        },
        {
            text: "English",
            icon: en_icon,
            lang: "en"
        },
        {
            text: "Español",
            icon: es_icon,
            lang: "es"
        },
        {
            text: "Français",
            icon: fr_icon,
            lang: "fr"
        },
        {
            text: "Nederlands",
            icon: nl_icon,
            lang: "nl"
        },
        {
            text: "Português",
            icon: pt_icon,
            lang: "pt"
        }
    ]

    // Switch current language icon and text
    const switchCurrent = (lang: string) => {
        languages.forEach((i) => {
            if (i.lang === lang) {
                setCurrentIcon(i.icon)
                setCurrentLanguage(i.text)
            }
        })
    }
    
    // Set language
    const setLang = (lang: string) => {
        setLanguage(lang)

        // Check if Production or Development mode
        let configFile = "config.txt"
        if (process.env.NODE_ENV === "development") {
        configFile = "config.debug.txt"
        }

        // Check if config file exists and create it if not
        fs.exists(configFile, { dir: fs.BaseDirectory.AppLocalData }).then((exists) => {
        if (!exists) {

            // Create config file
            fs.writeTextFile(configFile, JSON.stringify({
            "language": lang,
            "trayList": []
            }), { dir: fs.BaseDirectory.AppLocalData })
        } else {

            // Load config file
            fs.readTextFile(configFile, { dir: fs.BaseDirectory.AppLocalData }).then((data) => {
                const config = JSON.parse(data)
                
                // Update language
                config.language = lang

                // Save config file
                fs.writeTextFile(configFile, JSON.stringify(config), { dir: fs.BaseDirectory.AppLocalData })

                // Reload modal content
                setModalContent(<Settings t={t} v={v} language={language} setLanguage={setLanguage} setModalContent={setModalContent} />)
            })
        }
        })
    }

    // Switch current language icon and text on load
    useEffect(() => {
        switchCurrent(language)
    }, [])

    return (
        <div className={"relative"}>
            <button
                onClick={() => {setShowSelection(!showSelection)}}
                className={`w-full button flex justify-center items-center gap-1.5 z-20`}
            >
                <img src={currentIcon} className={"rounded-full w-6"} />
                {currentLanguage}
            </button>

            {
                showSelection && (
                    <div className={"max-h-[210px] overflow-auto absolute w-full top-full left-0 mt-1 bg-zinc-900 rounded-md py-2.5 pl-2.5 pr-1 flex flex-col gap-2.5 z-10"}>
                        
                        {
                            languages.map((i, index) => {
                                return (
                                    <button
                                        key={index}
                                        onClick={() => {setLang(i.lang); switchCurrent(i.lang); setShowSelection(false)}}
                                        className={`w-full button flex justify-center items-center gap-1.5 ${language === i.lang ? 'btn-ok' : ''} hover:translate-y-0 focus:translate-y-0`}
                                    >
                                        <img src={i.icon} className={"rounded-full w-6"} />
                                        {i.text}
                                    </button>
                                )
                            })
                        }

                    </div>
                )
            }
        </div>
    )
}