// React imports
import React, { useState } from 'react'
import { fs } from '@tauri-apps/api'
import * as CryptoJS from 'crypto-js'
import { Textbox } from '../utilities/Textbox';

// Properties: Textbox
export type Props = {
    passwordList: { title: string; username: string; password: string; }[];
    setPasswordList: React.Dispatch<React.SetStateAction<{ title: string; username: string; password: string; }[]>>;
    trayList: { title: string; logo?: string; color?: string; date: string; location: string; }[];
    selectedTray: number|null;
    currentTrayPassword: string;
    setModalState: React.Dispatch<React.SetStateAction<boolean>>;
}

// Component: Textbox
export const AddPassword: React.FC<Props> = (
    {
        passwordList,
        setPasswordList,
        trayList,
        selectedTray,
        currentTrayPassword,
        setModalState
    }
) => {

    // Edit input states
    const [editTitleInput, setEditTitleInput] = useState('')
    const [editUsernameInput, setEditUsernameInput] = useState('')
    const [editPasswordInput, setEditPasswordInput] = useState('')

    // Add new password to list
    const addPassword = () => {

        // Add new password to list
        setPasswordList([...passwordList, {
            "title": editTitleInput,
            "username": editUsernameInput,
            "password": editPasswordInput,
        }])

        // Save password list to file
        const trayPath = trayList[selectedTray!].location
        fs.readTextFile(trayPath).then((data) => {
            const trayFile = JSON.parse(data)
            
            // Check if accounts list exists
            let decryptedData
            if (trayFile.accounts === null) {

                // Create accounts list
                decryptedData = []
            } else {

                // Decrypt password list
                const bytes = CryptoJS.AES.decrypt(trayFile.accounts, currentTrayPassword)
                decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
            }
            
            // Add new password to list
            decryptedData.push({
                "title": editTitleInput,
                "username": editUsernameInput,
                "password": editPasswordInput,
            })

            // Encrypt password list
            const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(decryptedData), currentTrayPassword).toString()

            // Save password list to file
            fs.writeTextFile(trayPath, JSON.stringify({
                "title": trayFile.title,
                "logo": trayFile.logo,
                "color": trayFile.color,
                "date": trayFile.date,
                "password": trayFile.password,
                "accounts": encryptedData
            }))
        })

        // Close modal
        setModalState(false)
    }


    return (
        <div className={`flex flex-col gap-4 items-center`}>
            <div className={"text-center"}>
                <p className={"text-2xl opacity-60 cursor-default"}>Account hinzufügen</p>
            </div>
            <div className={"flex flex-col gap-4"}>
                
                <Textbox type={"text"} placeholder={"Titel"} onValueChange={setEditTitleInput} />

                <Textbox type={"text"} placeholder={"Anmelde-ID"} onValueChange={setEditUsernameInput} />

                <Textbox type={"password"} placeholder={"Passwort"} onValueChange={setEditPasswordInput} />
        
                <div className={"flex flex-row gap-4"}>
                    <button onClick={addPassword} className={"button btn-ok"}>Speichern</button>
                    <button onClick={() => {setModalState(false)}} className={"button"}>Abbrechen</button>
                </div>
            </div>
        </div>
    )
}