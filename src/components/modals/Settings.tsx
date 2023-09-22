// React imports
import React, { useEffect } from 'react'
import { Icon } from '../utilities/Icon';
import { LanguageSwitch } from '../utilities/LanguageSwitch';
import axios from 'axios';

import { fs } from '@tauri-apps/api';

// Properties: Settings
export type Props = {
    t: (key: string) => string;
    v: string;
    language: string;
    setLanguage: React.Dispatch<React.SetStateAction<string>>;
    setModalContent: React.Dispatch<React.SetStateAction<React.ReactNode>>;
}

// Component: Settings
export const Settings: React.FC<Props> = (
    {
        t,
        v,
        language,
        setLanguage,
        setModalContent
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

        }).catch((error) => {
            console.error(error)
        })
    }, [])

    return (
        <div className={`flex flex-col gap-4 items-center`}>
            <div className={"text-center"}>
                <p className={"text-2xl opacity-60 cursor-default"}>{t('settings')}</p>
            </div>
            <div className={"w-full flex flex-col gap-4 max-w-[30rem]"}>

                {/* Version */}
                <div className="flex gap-2 justify-center items-center">
                    <div className={"flex gap-1.5"}>
                        <p className="cursor-default"><b>{t('version')}:</b></p>
                        <p className={`cursor-default ${update === null ? 'text-emerald-500' : 'text-orange-500'}`}>{v}</p>
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
                <div className="w-[12rem] mx-auto text-center">
                    <p className="cursor-default mb-1">{t('selectLanguage')}</p>

                    <LanguageSwitch t={t} v={v} language={language} setLanguage={setLanguage} setModalContent={setModalContent} />
                </div>
            </div>
        </div>
    )
}