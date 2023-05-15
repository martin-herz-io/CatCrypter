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
}

// Component: Textbox
export const CreateTray: React.FC<Props> = (
    {
        trayList,
        setTrayList,
        setModalState
    }
) => {

    // Edit input states
    const [inputName, setInputName] = useState('')
    const [inputLogo, setInputLogo] = useState('')
    const [inputPassword, setInputPassword] = useState('')
    const [inputPassword2, setInputPassword2] = useState('')
    const [inputLocation, setInputLocation] = useState('')

    // Add new password to list
    const createTray = async () => {
        
        // Check if all fields are filled
        if (inputName === '') { dialog.message('Bitte gebe ein Name für die Account-Ablage ein.', { title: 'CatCrypter - Fehler', type: 'error' }); return }
        if (inputPassword === '') { dialog.message('Bitte gebe ein Passwort für die Account-Ablage ein.', { title: 'CatCrypter - Fehler', type: 'error' }); return }
        if (inputPassword !== inputPassword2) { dialog.message('Die beiden Passwörter stimmen nicht überein.', { title: 'CatCrypter - Fehler', type: 'error' }); return }
        if (inputLocation === '') { dialog.message('Bitte wähle ein Speicherort für die Account-Ablage aus.', { title: 'CatCrypter - Fehler', type: 'error' }); return }
        if (!inputLocation.endsWith('.ccp')) { dialog.message('Bitte wähle einen gültigen Speicherort für die Account-Ablage aus.', { title: 'CatCrypter - Fehler', type: 'error' }); return }

        // Select random color from list
        const colors = ['#ef4444', '#f97316', '#f59e0b', '#eab308', '#84cc16', '#22c55e', '#10b981', '#14b8a6', '#06b6d4', '#0ea5e9', '#3b82f6', '#6366f1', '#8b5cf6', '#a855f7', '#d946ef', '#ec4899', '#f43f5e']
        const randomColor = colors[Math.floor(Math.random() * colors.length)]

        // Get current date from local system (timestamp)
        const timestamp = Date.now().toString()

        // Password to bcrypt hash
        const salt = bcrypt.genSaltSync(10)
        const password = bcrypt.hashSync(`CatCrypter-TrayPassword:;!${inputPassword}!;:08022002.23w19mah`, salt)

        // try to create new file
        try {

            // New tray object
            const newTray = {
                title: inputName,
                logo: inputLogo,
                color: randomColor,
                date: timestamp,
                password: password,
                location: inputLocation
            }
                
            // Add new tray to list
            setTrayList([...trayList, newTray])

            // Create new file
            fs.writeFile({
                path: inputLocation,
                contents: JSON.stringify({
                    title: inputName,
                    logo: inputLogo,
                    color: randomColor,
                    date: timestamp,
                    password: password,
                    accounts: null
                })
            })

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

        } catch (error) {
            dialog.message('Die Account-Ablage konnte nicht erstellt werden.', { title: 'CatCrypter - Fehler', type: 'error' })
            return
        }

        setModalState(false)
    }


    return (
        <div className={`flex flex-col gap-4 items-center`}>
            <div className={"text-center"}>
                <p className={"text-2xl opacity-60 cursor-default"}>Ablage hinzufügen</p>
            </div>
            <div className={"flex flex-col gap-4 max-w-[228.08px]"}>
                
                <Textbox type={"text"} placeholder={"Name*"} onValueChange={setInputName} />
                
                <Fileselector type={"open"} placeholder={"Symbol"} onValueChange={setInputLogo} />
                
                <Textbox type={"password"} placeholder={"Passwort*"} onValueChange={setInputPassword} />

                <Textbox type={"password"} placeholder={"Passwort bestätigen*"} onValueChange={setInputPassword2} />

                <Fileselector type={"save"} placeholder={"Speicherort*"} onValueChange={setInputLocation} />
        
                <div className={"flex flex-row gap-4"}>
                    <button onClick={createTray} className={"button btn-ok"}>Speichern</button>
                    <button onClick={() => {setModalState(false)}} className={"button"}>Abbrechen</button>
                </div>
            </div>
        </div>
    )
}