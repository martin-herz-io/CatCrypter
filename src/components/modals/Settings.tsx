// React imports
import React, { useEffect } from 'react'
import { Icon } from '../utilities/Icon';
import axios from 'axios';

import en_icon from '../../assets/locales/en.png'
import de_icon from '../../assets/locales/de.png'
import pt_icon from '../../assets/locales/pt.png'
import { fs } from '@tauri-apps/api';

// Properties: Textbox
export type Props = {
    setModalState: React.Dispatch<React.SetStateAction<boolean>>;
    setModalContent: React.Dispatch<React.SetStateAction<React.ReactNode>>;
    t: (key: string) => string;
    v: string;
    language: string;
    setLanguage: React.Dispatch<React.SetStateAction<string>>;
}

// Component: Textbox
export const Settings: React.FC<Props> = (
    {
        setModalState,
        setModalContent,
        t,
        v,
        language,
        setLanguage
    }
) => {
    const [update, setUpdate] = React.useState<string|null>(null)

    // Check github releases for new version
    useEffect(() => {
        axios.get("https://api.github.com/repos/martin-herz-io/CatCrypter/releases").then((response) => {
            
            // Get latest release
            const latestRelease = response.data[0]
            const currentVersion = `v${v}`

            // Check if latest release is newer than current version
            if (latestRelease.tag_name !== currentVersion) {
                setUpdate(latestRelease.html_url)
            }

        })
    }, [])

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
                let config = JSON.parse(data)
                
                // Update language
                config.language = lang

                // Save config file
                fs.writeTextFile(configFile, JSON.stringify(config), { dir: fs.BaseDirectory.AppLocalData })
            })
        }
        })
    }

    return (
        <div className={`flex flex-col gap-4 items-center`}>
            <div className={"text-center"}>
                <p className={"text-2xl opacity-60 cursor-default"}>{t('settings')}</p>
            </div>
            <div className={"w-full flex flex-col gap-4 max-w-[30rem]"}>

                {/* Version */}
                <div className="flex gap-2 justify-center items-center">
                    <div className={"flex gap-1.5"}>
                        <p><b>{t('version')}:</b></p>
                        <p className={`${update === null ? 'text-emerald-500' : 'text-orange-500'}`}>{v}</p>
                    </div>

                    {
                        update !== null && (
                            <a href={update} target={'_blank'} className={"button text-sm px-2.5 py-1.5"}>
                                {t('update')}
                            </a>
                        )
                    }
                </div>



                {/* Language */}
                <div className="w-full">
                    <p>{t('selectLanguage')}</p>

                    <div className="mt-1 w-full grid grid-flow-col justify-stretch items-stretch gap-2">

                        {/* English */}
                        <button
                            onClick={() => {setLang('en')}}
                            className={`button flex justify-center items-center gap-1.5 ${language === 'en' ? 'btn-ok' : ''}}`}
                        >
                            <img src={en_icon} className={"rounded-full w-6"} />
                            English
                        </button>

                        {/* German */}
                        <button
                            onClick={() => {setLang('de')}}
                            className={`button flex justify-center items-center gap-1.5 ${language === 'de' ? 'btn-ok' : ''}}`}
                        >
                            <img src={de_icon} className={"rounded-full w-6"} />
                            Deutsch
                        </button>

                        {/* Portuguese */}
                        <button
                            onClick={() => {setLang('pt')}}
                            className={`button flex justify-center items-center gap-1.5 ${language === 'pt' ? 'btn-ok' : ''}}`}
                        >
                            <img src={pt_icon} className={"rounded-full w-6"} />
                            Português
                        </button>

                    </div>
                </div>
            </div>
        </div>
    )
}