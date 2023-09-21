// React imports
import React, { useState } from 'react'
import { dialog, fs } from '@tauri-apps/api'
import * as CryptoJS from 'crypto-js'
import bcrypt from 'bcryptjs'
import { Textbox } from '../utilities/Textbox';

// Properties: Textbox
export type Props = {
    select: number;
    trayList: { title: string; logo?: string; color?: string; date: string; location: string; }[];
    setSelectedTray: React.Dispatch<React.SetStateAction<number|null>>;
    setCurrentTrayPassword: React.Dispatch<React.SetStateAction<string>>;
    setPasswordList: React.Dispatch<React.SetStateAction<{ title: string; username: string; password: string; }[]>>;
    setModalState: React.Dispatch<React.SetStateAction<boolean>>;
    t: (key: string) => string;
}

// Component: Textbox
export const LoadTray: React.FC<Props> = (
    {
        select,
        trayList,
        setSelectedTray,
        setCurrentTrayPassword,
        setPasswordList,
        setModalState,
        t
    }
) => {

    // Edit input states
    const [inputPassword, setInputPassword] = useState('')

    // Add new password to list
    const createTray = async () => {
        
        // Check if all fields are filled
        if (inputPassword === '') { dialog.message(t('dialog.enterPasswordOpen'), { title: `CatCrypter - ${t('error')}`, type: 'error' }); return }

        // Select tray
        const tray = trayList[select]

        // Format password
        const pw = `CatCrypter-TrayPassword:;!${inputPassword}!;:08022002.23w19mah`

        // Check if tray file exists
        fs.exists(tray.location).then((exists) => {
            if (!exists) { dialog.message(t('dialog.trayDeleted'), { title: `CatCrypter - ${t('error')}`, type: 'error' }); return }
        })

        // Open tray file
        fs.readTextFile(tray.location).then((data) => {
            const trayFile = JSON.parse(data)
            
            // Verify password
            bcrypt.compare(pw, trayFile.password).then((result) => {
                if (!result) { dialog.message(t('dialog.wrongPassword'), { title: `CatCrypter - ${t('error')}`, type: 'error' }); return }

                // Close modal
                setModalState(false)

                // Set selected tray
                setSelectedTray(select)

                // Set current tray password
                setCurrentTrayPassword(pw)

                // Decrypt password list
                const bytes = CryptoJS.AES.decrypt(trayFile.accounts, pw)
                const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8))

                // Set password list
                setPasswordList(decryptedData)
            })
        })
    }


    return (
        <div className={`flex flex-col gap-4 items-center`}>
            <div className={"text-center"}>
                <p className={"text-2xl opacity-60 cursor-default"}>{t('openTray')}</p>
            </div>
            <div className={"flex flex-col gap-4 max-w-[228.08px]"}>
                
                <Textbox type={"password"} placeholder={`${t('password')}*`} onValueChange={setInputPassword} />
        
                <div className={"flex flex-row gap-4"}>
                    <button onClick={createTray} className={"w-full button btn-ok"}>{t('open')}</button>
                    <button onClick={() => {setModalState(false)}} className={"button"}>{t('cancel')}</button>
                </div>
            </div>
        </div>
    )
}