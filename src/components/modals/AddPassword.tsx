// React imports
import React, { useRef, useState } from 'react'
import { fs } from '@tauri-apps/api'
import * as CryptoJS from 'crypto-js'
import { Textbox } from '../utilities/Textbox';
import { Icon } from '../utilities/Icon';
import { stringGenerator } from '../../scripts/stringGenerator';
import { EditPassword } from './EditPassword';

// Properties: Textbox
export type Props = {
    passwordList: { title: string; username: string; password: string; }[];
    setPasswordList: React.Dispatch<React.SetStateAction<{ title: string; username: string; password: string; }[]>>;
    trayList: { title: string; logo?: string; color?: string; date: string; location: string; }[];
    selectedTray: number|null;
    currentTrayPassword: string;
    setModalState: React.Dispatch<React.SetStateAction<boolean>>;
    t: (key: string) => string;
}

// Component: Textbox
export const AddPassword: React.FC<Props> = (
    {
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
    const [editPasswordInput, setEditPasswordInput] = useState('')
    const [editPasswordVisible, setEditPasswordVisible] = useState(false)

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

    // Generate password
    const generatePassword = () => {
        const pw = stringGenerator(12, { numbers: true, lowerCase: true, upperCase: true, special: true })
        setEditPasswordInput(pw)
        setEditPasswordVisible(true)
    }

    // Change password visibility
    const changePasswordVisibility = () => {
        setEditPasswordVisible(!editPasswordVisible)
    }


    return (
        <div className={`flex flex-col gap-4 items-center`}>
            <div className={"text-center"}>
                <p className={"text-2xl opacity-60 cursor-default"}>{t('accountAdd')}</p>
            </div>
            <div className={"flex flex-col gap-4"}>
                
                <Textbox type={"text"} placeholder={t('title')} onValueChange={setEditTitleInput} />

                <Textbox type={"text"} placeholder={t('username')} onValueChange={setEditUsernameInput} />

                <div className="flex flex-row">
                    <Textbox className={"rounded-r-none"} type={editPasswordVisible ? 'text' : 'password'} placeholder={t('password')} value={editPasswordInput} onValueChange={setEditPasswordInput} />

                    <button onClick={changePasswordVisibility} className={"button px-3 rounded-none hover:translate-y-0 focus:translate-y-0"}><Icon name={"eye"} className={"w-4"} /></button>
                    <button onClick={generatePassword} className={"button px-3 rounded-l-none hover:translate-y-0 focus:translate-y-0"}><Icon name={"sparkles"} className={"w-4"} /></button>
                </div>
        
                <div className={"flex flex-row gap-4"}>
                    <button onClick={addPassword} className={"w-full button btn-ok"}>{t('save')}</button>
                    <button onClick={() => {setModalState(false)}} className={"button"}>{t('cancel')}</button>
                </div>
            </div>
        </div>
    )
}