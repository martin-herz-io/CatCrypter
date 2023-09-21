// React imports
import React from 'react'
import { fs } from '@tauri-apps/api'
import * as CryptoJS from 'crypto-js'

// Properties: Textbox
export type Props = {
    title: string;
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
export const DeletePassword: React.FC<Props> = (
    {
        title,
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

    // Delete current password from list and set new list
    const deletePassword = () => {
        const newList = [...passwordList]
        newList.splice(index, 1)
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
            
            // Remove password from list
            decryptedData.splice(index, 1)

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
        
        setModalState(false)
    }

    return (
        <div className={`flex flex-col gap-4 items-center`}>
            <div className={"text-center"}>
                <p className={"text-2xl opacity-60 cursor-default"}>{`"${title}" ${t('delete').toLowerCase()}?`}</p>
                <p className={"opacity-60 cursor-default"}>{t('operationCannotBeUndone')}</p>
            </div>
            <div className={"flex flex-row gap-4"}>
                <button onClick={deletePassword} className={"w-full button btn-critical"}>{t('delete')}</button>
                <button onClick={() => {setModalState(false)}} className={"button"}>{t('cancel')}</button>
            </div>
        </div>
    )
}