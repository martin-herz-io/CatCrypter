// React imports
import React, { useState } from 'react'
import { Textbox } from '../utilities/Textbox';

// Properties: Textbox
export type Props = {
    passwordList: { title: string; username: string; password: string; }[];
    setPasswordList: React.Dispatch<React.SetStateAction<{ title: string; username: string; password: string; }[]>>;
    setModalState: React.Dispatch<React.SetStateAction<boolean>>;
}

// Component: Textbox
export const AddPassword: React.FC<Props> = (
    {
        passwordList,
        setPasswordList,
        setModalState
    }
) => {

    // Edit input states
    const [editTitleInput, setEditTitleInput] = useState('')
    const [editUsernameInput, setEditUsernameInput] = useState('')
    const [editPasswordInput, setEditPasswordInput] = useState('')

    // Add new password to list
    const addPassword = () => {
        setPasswordList([...passwordList, {
            "title": editTitleInput,
            "username": editUsernameInput,
            "password": editPasswordInput,
        }])
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