// React imports
import React, { useState } from 'react'
import { fs } from '@tauri-apps/api'
import * as CryptoJS from 'crypto-js'
import { Textbox } from '../utilities/Textbox';
import { stringGenerator } from '../../scripts/stringGenerator';
import { Icon } from '../utilities/Icon';

// Properties: Textbox
export type Props = {
    i: {
        title: string;
        username: string;
        password: string;
    }
    index: number;
    passwordList: { title: string; username: string; password: string; }[];
    setPasswordList: React.Dispatch<React.SetStateAction<{ title: string; username: string; password: string; }[]>>;
    trayList: { title: string; logo?: string; color?: string; date: string; location: string; }[];
    selectedTray: number|null;
    currentTrayPassword: string;
    setModalState: React.Dispatch<React.SetStateAction<boolean>>;
    t: (key: string) => string;
}

// Component: Textbox
export const EditPassword: React.FC<Props> = (
    {
        i,
        index,
        passwordList,
        setPasswordList,
        trayList,
        selectedTray,
        currentTrayPassword,
        setModalState,
        t
    }
) => {

    // Edit input states
    const [editTitleInput, setEditTitleInput] = useState('')
    const [editUsernameInput, setEditUsernameInput] = useState('')
    const [editPasswordInput, setEditPasswordInput] = useState(i.password)
    const [editPasswordVisible, setEditPasswordVisible] = useState(false)

    // Edit current password from list and set new list
    const editPassword = () => {

        // Edit password
        const newList = [...passwordList]
        newList[index] = {
            title: editTitleInput,
            username: editUsernameInput,
            password: editPasswordInput
        }
        setPasswordList(newList)

        // Save password list to file
        const trayPath = trayList[selectedTray!].location
        fs.readTextFile(trayPath).then((data) => {
            const trayFile = JSON.parse(data)
            
            // Check if account list exists
            let decryptedData
            if (trayFile.accounts === null) {

                // Create accounts list
                decryptedData = []
            } else {

                // Decrypt password list
                const bytes = CryptoJS.AES.decrypt(trayFile.accounts, currentTrayPassword)
                decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
            }
            
            // Edit password
            decryptedData[index] = {
                title: editTitleInput,
                username: editUsernameInput,
                password: editPasswordInput
            }

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

    // Generate password
    const generatePassword = () => {
        const pw = stringGenerator(12, { numbers: true, lowerCase: true, upperCase: true, special: true })
        setEditPasswordInput(pw)
        setEditPasswordVisible(true)
    }

    // Password visibility
    const changePasswordVisibility = () => {
        setEditPasswordVisible(!editPasswordVisible)
    }

    return (
        <div className={`flex flex-col gap-4 items-center`}>
            <div className={"text-center"}>
                <p className={"text-2xl opacity-60 cursor-default"}>{t('accountEdit')}</p>
            </div>
            <div className={"flex flex-col gap-4"}>
                
                <Textbox type={"text"} value={i.title} placeholder={t('title')} onValueChange={setEditTitleInput} />

                <Textbox type={"text"} value={i.username} placeholder={t('username')} onValueChange={setEditUsernameInput} />

                <div className="flex flex-row">
                    <Textbox className={"rounded-r-none"} type={editPasswordVisible ? 'text' : 'password'} placeholder={t('password')} value={editPasswordInput} onValueChange={setEditPasswordInput} />

                    <button onClick={changePasswordVisibility} className={"button px-3 rounded-none hover:translate-y-0 focus:translate-y-0"}><Icon name={"eye"} className={"w-4"} /></button>
                    <button onClick={generatePassword} className={"button px-3 rounded-l-none hover:translate-y-0 focus:translate-y-0"}><Icon name={"sparkles"} className={"w-4"} /></button>
                </div>
        
                <div className={"flex flex-row gap-4"}>
                    <button onClick={editPassword} className={"w-full button btn-ok"}>{t('save')}</button>
                    <button onClick={() => {setModalState(false)}} className={"button"}>{t(t('cancel'))}</button>
                </div>
            </div>
        </div>
    )
}