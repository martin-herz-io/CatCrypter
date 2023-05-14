// React imports
import React, { useState } from 'react'
import { Textbox } from '../utilities/Textbox';

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
    setModalState: React.Dispatch<React.SetStateAction<boolean>>;
}

// Component: Textbox
export const EditPassword: React.FC<Props> = (
    {
        i,
        index,
        passwordList,
        setPasswordList,
        setModalState
    }
) => {

    // Edit input states
    const [editTitleInput, setEditTitleInput] = useState('')
    const [editUsernameInput, setEditUsernameInput] = useState('')
    const [editPasswordInput, setEditPasswordInput] = useState('')

    // Edit current password from list and set new list
    const editPassword = () => {
        const newList = [...passwordList]
        newList[index] = {
            title: editTitleInput,
            username: editUsernameInput,
            password: editPasswordInput
        }
        setPasswordList(newList)
        setModalState(false)
    }

    return (
        <div className={`flex flex-col gap-4 items-center`}>
            <div className={"text-center"}>
                <p className={"text-2xl opacity-60 cursor-default"}>Account bearbeiten</p>
            </div>
            <div className={"flex flex-col gap-4"}>
                
                <Textbox type={"text"} value={i.title} placeholder={"Titel"} onValueChange={setEditTitleInput} />

                <Textbox type={"text"} value={i.username} placeholder={"Anmelde-ID"} onValueChange={setEditUsernameInput} />

                <Textbox type={"password"} value={i.password} placeholder={"Passwort"} onValueChange={setEditPasswordInput} />
        
                <div className={"flex flex-row gap-4"}>
                    <button onClick={editPassword} className={"button btn-ok"}>Speichern</button>
                    <button onClick={() => {setModalState(false)}} className={"button"}>Abbrechen</button>
                </div>
            </div>
        </div>
    )
}