// React imports
import React, { useState } from 'react'
import { dialog, fs } from '@tauri-apps/api'
import bcrypt from 'bcryptjs'
import { Textbox } from '../utilities/Textbox';
import { Fileselector } from '../utilities/Fileselector';

// Properties: Textbox
export type Props = {
    trayList: { title: string; logo?: string; color?: string; date: string; location: string; }[];
    setTrayList: React.Dispatch<React.SetStateAction<{ title: string; logo?: string; color?: string; date: string; location: string; }[]>>;
    setModalState: React.Dispatch<React.SetStateAction<boolean>>;
    t: (key: string) => string;
}

// Component: Textbox
export const OpenTray: React.FC<Props> = (
    {
        trayList,
        setTrayList,
        setModalState,
        t
    }
) => {

    // Edit input states
    const [inputPassword, setInputPassword] = useState('')
    const [inputLocation, setInputLocation] = useState('')

    // Add new password to list
    const createTray = async () => {
        
        // Check if all fields are 
        if (inputLocation === '') { dialog.message(t('dialog.locationOpen'), { title: `CatCrypter - ${t('error')}`, type: 'error' }); return }
        if (!inputLocation.endsWith('.ccp')) { dialog.message(t('dialog.validTray'), { title: `CatCrypter - ${t('error')}`, type: 'error' }); return }
        if (inputPassword === '') { dialog.message(t('dialog.enterPasswordOpen'), { title: `CatCrypter - ${t('error')}`, type: 'error' }); return }

        // try to create new file
        try {

            // read tray file
            fs.readTextFile(inputLocation).then((data) => {
                const tray = JSON.parse(data)

                // Check if password is correct
                const password = bcrypt.compareSync(`CatCrypter-TrayPassword:;!${inputPassword}!;:08022002.23w19mah`, tray.password)
                if (!password) {
                    dialog.message(t('dialog.wrongPassword'), { title: `CatCrypter - ${t('error')}`, type: 'error' })
                    return
                }

                // Check if tray is already loaded
                const trayExists = trayList.find((tray) => tray.location === inputLocation)
                if (trayExists) {
                    dialog.message(t('dialog.trayAlreadyOpen'), { title: `CatCrypter - ${t('error')}`, type: 'error' })
                    return
                }

                const newTray = {
                    title: tray.title,
                    logo: tray.logo,
                    color: tray.color,
                    date: tray.date,
                    password: tray.password,
                    location: inputLocation
                }

                // Add new tray to list
                setTrayList([...trayList, newTray])

                // Check if Production or Development mode
                let configFile = "config.txt"
                if (process.env.NODE_ENV === "development") {
                    configFile = "config.debug.txt"
                }

                // Load config file
                fs.readTextFile(configFile, { dir: fs.BaseDirectory.AppLocalData }).then((data) => {
                    const config = JSON.parse(data)
                    
                    // Add new tray to config file
                    config.trayList.push(newTray)

                    // Save config file
                    fs.writeFile({
                        path: configFile,
                        contents: JSON.stringify(config)
                    }, { dir: fs.BaseDirectory.AppLocalData })
                })

            })

        } catch (error) {
            dialog.message(t('dialog.openError'), { title: `CatCrypter - ${t('error')}`, type: 'error' })
            return
        }

        setModalState(false)
    }


    return (
        <div className={`flex flex-col gap-4 items-center`}>
            <div className={"text-center"}>
                <p className={"text-2xl opacity-60 cursor-default"}>{t('openTray')}</p>
            </div>
            <div className={"flex flex-col gap-4 max-w-[228.08px]"}>

                <Fileselector t={t} type={"open"} filters={[{ name: t('CatCrypterTray'), extensions: ['ccp'] }]} placeholder={`${t('location')}*`} onValueChange={setInputLocation} />
                
                <Textbox type={"password"} placeholder={`${t('password')}*`} onValueChange={setInputPassword} />
        
                <div className={"flex flex-row gap-4"}>
                    <button onClick={createTray} className={"w-full button btn-ok"}>{t('open')}</button>
                    <button onClick={() => {setModalState(false)}} className={"button"}>{t('cancel')}</button>
                </div>
            </div>
        </div>
    )
}